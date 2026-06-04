export interface Translations {
  nav: {
    home: string
    services: string
    sectors: string
    model: string
    about: string
    careers: string
    contact: string
  }
  hero: {
    eyebrow: string
    heading: string
    headingAccent: string
    tagline: string
    cta1: string
    cta2: string
  }
  footer: {
    tagline: string
    offering: string
    company: string
    resources: string
    rights: string
    country: string
  }
  languageSwitcher: {
    en: string
    fr: string
    et: string
  }
}

const en: Translations = {
  nav: {
    home:     "Home",
    services: "Services",
    sectors:  "Sectors",
    model:    "Our Model",
    about:    "About",
    careers:  "Careers",
    contact:  "Contact",
  },
  hero: {
    eyebrow:       "Africa ↔ Global Market Entry",
    heading:       "Where Global Innovations and Opportunities Meet",
    headingAccent: "African Excellence",
    tagline:       "We help businesses across continents discover new markets, forge partnerships, and grow sustainably.",
    cta1:          "Start Your Trade Journey",
    cta2:          "Partner with Us",
  },
  footer: {
    tagline:   "Connecting Africa and the world through trade, opportunity, and innovation.",
    offering:  "Offering",
    company:   "Company",
    resources: "Resources",
    rights:    "All rights reserved.",
    country:   "Estonia",
  },
  languageSwitcher: {
    en: "English",
    fr: "Français",
    et: "Eesti",
  },
}

export default en
