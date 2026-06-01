/**
 * Provider-agnostic AI adapter.
 *
 * Exposes a single `generate()` function that dispatches to Claude, Gemini,
 * or OpenRouter based on the `provider` argument (defaulting from env vars).
 * Switching providers = one env var change — no feature rewrite.
 *
 * Claude adapter: uses prompt caching on the system message (~90% cost
 * reduction on system-prompt tokens when multiple calls arrive within 5 min).
 * Gemini adapter: uses the free tier (no cost, no credit card).
 * OpenRouter adapter: OpenAI-compatible, model configurable via OPENROUTER_MODEL.
 *   Default model: meta-llama/llama-3.1-70b-instruct
 *   Data policy: OpenRouter does not train on API requests (see openrouter.ai/privacy).
 *   Suitable for EU business leads — no training opt-out required.
 *
 * All adapters return { text: string }. Callers never know which provider ran.
 */

import Anthropic from "@anthropic-ai/sdk"
import { GoogleGenerativeAI } from "@google/generative-ai"

export type Provider = "claude" | "gemini" | "openrouter"

export interface Message {
  role: "user" | "assistant"
  content: string
}

export interface GenerateParams {
  system: string
  messages: Message[]
  maxTokens?: number
  json?: boolean
  provider?: Provider
}

export interface GenerateResult {
  text: string
  provider: Provider
}

/* ─── Model IDs ──────────────────────────────────────────────────────────── */
// Confirm these at build time from official docs before hard-coding in memory.
const CLAUDE_MODEL  = "claude-haiku-4-5-20251001"  // cheapest Claude; escalate to claude-sonnet-4-6 if quality requires
const GEMINI_MODEL  = "gemini-2.0-flash"            // free tier; widely available on AI Studio keys
// OpenRouter model is read from OPENROUTER_MODEL env var at call time; see callOpenRouter below.

/* ─── Exponential backoff retry (handles provider 429 rate-limit responses) ─ */
async function withRetry<T>(fn: () => Promise<T>, maxAttempts = 4): Promise<T> {
  for (let attempt = 0; attempt < maxAttempts; attempt++) {
    try {
      return await fn()
    } catch (err: unknown) {
      const status = (err as { status?: number })?.status
      const isRateLimit = status === 429
      if (!isRateLimit || attempt === maxAttempts - 1) throw err
      // 1s → 2s → 4s → 8s
      await new Promise((r) => setTimeout(r, Math.pow(2, attempt) * 1000))
    }
  }
  throw new Error("Max retry attempts exceeded")
}

/* ─── Claude adapter ─────────────────────────────────────────────────────── */
async function callClaude(params: GenerateParams): Promise<string> {
  if (!process.env.ANTHROPIC_API_KEY) {
    throw new Error("ANTHROPIC_API_KEY is not set. Add it to .env.local and Vercel env vars.")
  }

  const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY })

  return withRetry(async () => {
    const response = await client.messages.create({
      model: CLAUDE_MODEL,
      max_tokens: params.maxTokens ?? 1000,
      // Prompt caching: system prompt is cached for 5 min — dramatically cuts
      // input-token cost when multiple users hit the assessment in the same window.
      system: [
        {
          type: "text",
          text: params.system,
          cache_control: { type: "ephemeral" },
        },
      ] as Parameters<typeof client.messages.create>[0]["system"],
      messages: params.messages.map((m) => ({
        role: m.role,
        content: m.content,
      })),
    })

    const block = response.content.find((b) => b.type === "text")
    return block?.type === "text" ? block.text : ""
  })
}

/* ─── Gemini adapter ─────────────────────────────────────────────────────── */
async function callGemini(params: GenerateParams): Promise<string> {
  if (!process.env.GEMINI_API_KEY) {
    throw new Error("GEMINI_API_KEY is not set. Add it to .env.local — it's FREE at aistudio.google.com.")
  }

  const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY)
  const model = genAI.getGenerativeModel({
    model: GEMINI_MODEL,
    systemInstruction: params.system,
  })

  // Convert messages to Gemini's history + current-message format
  const history = params.messages.slice(0, -1).map((m) => ({
    role: m.role === "assistant" ? "model" : "user",
    parts: [{ text: m.content }],
  }))
  const lastMessage = params.messages[params.messages.length - 1]

  return withRetry(async () => {
    const chat = model.startChat({ history })
    const result = await chat.sendMessage(lastMessage.content)
    return result.response.text()
  })
}

/* ─── OpenRouter adapter ─────────────────────────────────────────────────── */
async function callOpenRouter(params: GenerateParams): Promise<string> {
  if (!process.env.OPENROUTER_API_KEY) {
    throw new Error("OPENROUTER_API_KEY is not set. Add it to .env.local and Vercel env vars.")
  }

  // Model is fully configurable — no hard-coded string shipped to clients.
  // Default: meta-llama/llama-3.1-70b-instruct (capable, cheap, no training on requests).
  const model = process.env.OPENROUTER_MODEL ?? "meta-llama/llama-3.1-70b-instruct"

  const messages = [
    { role: "system", content: params.system },
    ...params.messages.map((m) => ({ role: m.role, content: m.content })),
  ]

  return withRetry(async () => {
    const res = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${process.env.OPENROUTER_API_KEY}`,
        // Optional headers OpenRouter uses for analytics / abuse detection.
        "HTTP-Referer": process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.karagateway.com",
        "X-Title": "Karagateway Assessment",
      },
      body: JSON.stringify({
        model,
        messages,
        max_tokens: params.maxTokens ?? 1000,
      }),
    })

    // Surface 429 as a typed error so withRetry can back off correctly.
    if (res.status === 429) {
      const err = new Error("OpenRouter rate limit") as Error & { status: number }
      err.status = 429
      throw err
    }

    if (!res.ok) {
      throw new Error(`OpenRouter error: ${res.status} ${res.statusText}`)
    }

    const json = await res.json() as { choices?: Array<{ message?: { content?: string } }> }
    return json.choices?.[0]?.message?.content ?? ""
  })
}

/* ─── Public API ─────────────────────────────────────────────────────────── */
export async function generate(params: GenerateParams): Promise<GenerateResult> {
  const provider: Provider =
    params.provider ??
    (process.env.AI_PROVIDER_ASSESSMENT as Provider | undefined) ??
    "openrouter"

  let text: string
  if (provider === "gemini") {
    text = await callGemini(params)
  } else if (provider === "openrouter") {
    text = await callOpenRouter(params)
  } else {
    text = await callClaude(params)
  }

  return { text, provider }
}
