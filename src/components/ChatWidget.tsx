"use client"

import { useState, useRef, useEffect } from "react"
import { MessageCircle, X, Send, Loader2 } from "lucide-react"

interface Message {
  role: "user" | "assistant"
  content: string
}

const WELCOME: Message = {
  role: "assistant",
  content:
    "Hi! I'm Kara, Karagateway's trade assistant. Ask me anything about Africa market entry, our services, or how we can help your business — I'm here to help.",
}

export function ChatWidget() {
  const [open, setOpen]           = useState(false)
  const [messages, setMessages]   = useState<Message[]>([WELCOME])
  const [input, setInput]         = useState("")
  const [loading, setLoading]     = useState(false)
  const [error, setError]         = useState("")
  const bottomRef                 = useRef<HTMLDivElement>(null)
  const inputRef                  = useRef<HTMLInputElement>(null)
  const calLink                   = "https://cal.com/karagateway-ufveeu/30min?overlayCalendar=true"

  // Scroll to bottom whenever messages change
  useEffect(() => {
    if (open) {
      bottomRef.current?.scrollIntoView({ behavior: "smooth" })
    }
  }, [messages, open])

  // Focus input when panel opens
  useEffect(() => {
    if (open) {
      setTimeout(() => inputRef.current?.focus(), 100)
    }
  }, [open])

  const send = async () => {
    const text = input.trim()
    if (!text || loading) return

    const userMsg: Message = { role: "user", content: text }
    const next = [...messages, userMsg]
    setMessages(next)
    setInput("")
    setLoading(true)
    setError("")

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: next }),
      })
      const json = await res.json()

      if (res.status === 429) {
        setError("You've sent a lot of messages! Give it a few minutes or email us at info@karagateway.com.")
        setLoading(false)
        return
      }

      const reply = json.reply || "Something went wrong. Please try again."
      setMessages((m) => [...m, { role: "assistant", content: reply }])
    } catch {
      setMessages((m) => [
        ...m,
        {
          role: "assistant",
          content:
            "Something went wrong on my end. Please try again or email us at info@karagateway.com.",
        },
      ])
    }
    setLoading(false)
  }

  const handleKey = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      send()
    }
  }

  return (
    <>
      {/* ── Chat panel ───────────────────────────────────────────────────── */}
      {open && (
        <div
          className="fixed z-50 flex flex-col shadow-2xl"
          style={{
            bottom: "80px",
            right: "16px",
            width: "min(360px, calc(100vw - 32px))",
            maxHeight: "min(520px, calc(100vh - 120px))",
            borderRadius: "16px",
            overflow: "hidden",
            border: "1px solid rgba(135,110,75,0.18)",
            backgroundColor: "white",
          }}
        >
          {/* Header */}
          <div
            className="flex items-center justify-between px-4 py-3 flex-shrink-0"
            style={{
              background: "linear-gradient(135deg, var(--color-navy) 0%, #1a2a3a 100%)",
            }}
          >
            <div className="flex items-center gap-2.5">
              <div
                className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0"
                style={{ backgroundColor: "var(--color-brand-orange)" }}
              >
                <MessageCircle size={15} color="white" />
              </div>
              <div>
                <p className="text-sm font-semibold" style={{ color: "var(--color-cream)", lineHeight: 1.2 }}>
                  Kara
                </p>
                <p className="text-xs" style={{ color: "rgba(255,255,255,0.55)" }}>
                  Karagateway trade assistant
                </p>
              </div>
            </div>
            <button
              onClick={() => setOpen(false)}
              className="p-1 rounded-full transition-colors hover:bg-white/10"
              aria-label="Close chat"
            >
              <X size={16} color="rgba(255,255,255,0.7)" />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3" style={{ minHeight: 0 }}>
            {messages.map((msg, i) => (
              <div key={i} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
                <div
                  className="max-w-[82%] px-3.5 py-2.5 rounded-2xl text-sm leading-relaxed"
                  style={
                    msg.role === "user"
                      ? {
                          backgroundColor: "var(--color-brand-orange)",
                          color: "white",
                          borderBottomRightRadius: "4px",
                        }
                      : {
                          backgroundColor: "var(--color-surface-warm)",
                          color: "var(--color-charcoal)",
                          border: "1px solid rgba(135,110,75,0.12)",
                          borderBottomLeftRadius: "4px",
                        }
                  }
                >
                  {msg.content}
                </div>
              </div>
            ))}

            {loading && (
              <div className="flex justify-start">
                <div
                  className="flex items-center gap-1.5 px-3.5 py-2.5 rounded-2xl"
                  style={{
                    backgroundColor: "var(--color-surface-warm)",
                    border: "1px solid rgba(135,110,75,0.12)",
                    borderBottomLeftRadius: "4px",
                  }}
                >
                  <Loader2 size={14} className="animate-spin" style={{ color: "var(--color-slate)" }} />
                  <span className="text-xs" style={{ color: "var(--color-slate)" }}>Kara is typing…</span>
                </div>
              </div>
            )}

            {error && (
              <p className="text-xs text-center px-2" style={{ color: "#c0392b" }}>{error}</p>
            )}

            <div ref={bottomRef} />
          </div>

          {/* Booking CTA */}
          <div className="flex-shrink-0 px-4 pt-2 pb-1">
            <a
              href={calLink}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-1.5 w-full py-2 rounded-xl text-xs font-semibold transition-all hover:brightness-110"
              style={{
                backgroundColor: "rgba(224,90,34,0.10)",
                color: "var(--color-brand-orange)",
                border: "1px solid rgba(224,90,34,0.20)",
              }}
            >
              Book a free consultation →
            </a>
          </div>

          {/* Input */}
          <div
            className="flex-shrink-0 flex items-center gap-2 p-3"
            style={{ borderTop: "1px solid rgba(135,110,75,0.12)" }}
          >
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKey}
              placeholder="Ask about Africa market entry…"
              maxLength={2000}
              disabled={loading}
              className="flex-1 text-sm rounded-full px-4 py-2 outline-none transition-colors disabled:opacity-50"
              style={{
                border: "1px solid rgba(74,90,107,0.25)",
                backgroundColor: "var(--color-surface-warm)",
                color: "var(--color-charcoal)",
              }}
            />
            <button
              onClick={send}
              disabled={!input.trim() || loading}
              className="flex-shrink-0 w-9 h-9 rounded-full flex items-center justify-center transition-all disabled:opacity-40 hover:brightness-110"
              style={{ backgroundColor: "var(--color-brand-orange)" }}
              aria-label="Send message"
            >
              <Send size={15} color="white" />
            </button>
          </div>

          {/* AI disclaimer */}
          <p
            className="flex-shrink-0 text-center text-xs px-4 pb-2.5"
            style={{ color: "var(--color-slate-light)" }}
          >
            Powered by AI — general guidance only, not legal or financial advice.
          </p>
        </div>
      )}

      {/* ── Launcher button ───────────────────────────────────────────────── */}
      <button
        onClick={() => setOpen((o) => !o)}
        className="fixed z-50 w-14 h-14 rounded-full flex items-center justify-center shadow-lg transition-all hover:brightness-110 hover:scale-105 active:scale-95"
        style={{
          bottom: "16px",
          right: "16px",
          backgroundColor: open ? "var(--color-navy)" : "var(--color-brand-orange)",
        }}
        aria-label={open ? "Close chat" : "Chat with Kara"}
      >
        {open ? (
          <X size={22} color="white" />
        ) : (
          <MessageCircle size={22} color="white" />
        )}
      </button>
    </>
  )
}
