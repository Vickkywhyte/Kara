import { Resend } from "resend"

export interface LeadPayload {
  name: string
  email: string
  message?: string
  source: string
  timestamp: string
}

export async function sendLeadNotification(lead: LeadPayload): Promise<void> {
  const notifyEmail = process.env.LEADS_NOTIFY_EMAIL || "info@karagateway.com"

  if (!process.env.RESEND_API_KEY) {
    // Dev mode: log instead of sending; form still succeeds
    console.log("[lead captured — no RESEND_API_KEY set]", lead)
    return
  }

  // Instantiate lazily so build succeeds without a key set
  const resend = new Resend(process.env.RESEND_API_KEY)
  await resend.emails.send({
    from:    "Karagateway Leads <onboarding@resend.dev>",
    to:      notifyEmail,
    subject: `New lead from ${lead.source}: ${lead.name}`,
    text: [
      `Source: ${lead.source}`,
      `Timestamp: ${lead.timestamp}`,
      ``,
      `Name:  ${lead.name}`,
      `Email: ${lead.email}`,
      ``,
      lead.message ? `Message:\n${lead.message}` : "",
    ].join("\n"),
  })
}
