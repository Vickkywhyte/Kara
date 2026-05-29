import { Resend } from "resend"

export interface LeadPayload {
  name: string
  email: string
  message?: string
  source: string
  timestamp: string
  cvFilename?: string
  cvBase64?: string
}

function subjectLine(payload: LeadPayload): string {
  switch (payload.source) {
    case "careers-apply":
      // message starts with "Role: <role title>"
      const roleLine = payload.message?.split("\n")[0] ?? ""
      const role = roleLine.replace(/^Role:\s*/i, "").trim() || "Application"
      return `[Karagateway Careers] ${role} — ${payload.name}`
    case "contact-page":
      return `[Karagateway Contact] New enquiry from ${payload.name}`
    case "partner-form":
      return `[Karagateway Partner] New partner enquiry from ${payload.name}`
    default:
      return `[Karagateway] New submission from ${payload.name}`
  }
}

function bodyText(payload: LeadPayload): string {
  const lines = [
    `Source: ${payload.source}`,
    `Timestamp: ${payload.timestamp}`,
    ``,
    `Name:  ${payload.name}`,
    `Email: ${payload.email}`,
    ``,
  ]
  if (payload.message) {
    lines.push("Details:", payload.message)
  }
  if (payload.cvFilename) {
    lines.push(``, `CV: ${payload.cvFilename} (attached)`)
  }
  return lines.join("\n")
}

export async function sendLeadNotification(lead: LeadPayload): Promise<void> {
  const notifyEmail = process.env.LEADS_NOTIFY_EMAIL || "info@karagateway.com"
  const fromEmail = process.env.RESEND_FROM_EMAIL || "onboarding@resend.dev"

  if (!process.env.RESEND_API_KEY) {
    // Dev mode: log instead of sending; form still succeeds
    console.log("[lead captured — no RESEND_API_KEY set]", lead)
    return
  }

  const resend = new Resend(process.env.RESEND_API_KEY)

  const emailPayload: Parameters<typeof resend.emails.send>[0] = {
    from:    `Karagateway Leads <${fromEmail}>`,
    to:      notifyEmail,
    replyTo: lead.email,
    subject: subjectLine(lead),
    text:    bodyText(lead),
  }

  // Attach CV if provided (base64-encoded PDF from the careers form)
  if (lead.cvBase64 && lead.cvFilename) {
    emailPayload.attachments = [
      {
        filename: lead.cvFilename,
        content:  lead.cvBase64,
      },
    ]
  }

  await resend.emails.send(emailPayload)
}
