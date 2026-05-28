export interface Partner {
  name: string
  /** Path relative to /public — e.g. "/brand/partners/njunkim-legal.png" */
  logo: string
  /** Optional — if present the logo becomes a clickable link */
  url?: string
  /** Grouping label shown nowhere by default, useful for future filtering */
  category: "Legal" | "Logistics" | "Inspection" | "Strategic" | "Financial" | "Technology"
  /** One-line description shown as a tooltip / aria-label supplement */
  description?: string
}

export const partners: Partner[] = [
  {
    name: "Njunkim Legal",
    logo: "/brand/partners/njunkim-legal.png",
    // url: "https://njunkimlegal.com",   // uncomment when you have the URL
    category: "Legal",
    description: "Nigerian legal partner — corporate, trade, and regulatory counsel.",
  },
  // Add more partners by appending objects here, e.g.:
  // {
  //   name: "Example Logistics Co",
  //   logo: "/brand/partners/example-logistics.png",
  //   url: "https://example.com",
  //   category: "Logistics",
  //   description: "Freight and customs clearance across West Africa.",
  // },
]
