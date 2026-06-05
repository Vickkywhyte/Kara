export interface Translations {
  nav: {
    home: string; services: string; sectors: string; model: string
    about: string; careers: string; contact: string
  }
  hero: {
    eyebrow: string; heading: string; headingAccent: string; tagline: string; cta1: string; cta2: string
  }
  footer: {
    tagline: string; offering: string; company: string; resources: string; rights: string; country: string
  }
  languageSwitcher: { en: string; fr: string; et: string }

  // ── Pages ────────────────────────────────────────────────────────────────
  about: {
    eyebrow: string; heading: string; quote: string; body1: string; body2: string
    team: { heading: string; body: string }
    vision: { label: string; quote: string }
    mission: { label: string; quote: string }
    values: {
      heading: string
      trust: { title: string; desc: string }
      inclusivity: { title: string; desc: string }
      impact: { title: string; desc: string }
      excellence: { title: string; desc: string }
    }
    impactSection: { heading: string; body: string; cta: string }
  }

  services: {
    eyebrow: string; heading: string; subheading: string
    flagshipLabel: string; flagshipSub: string
    countryManager: { title: string; blurb: string; detail: string; photoAlt: string }
    channelPartner: { title: string; blurb: string; detail: string; photoAlt: string }
    softLanding: { title: string; blurb: string; detail: string; photoAlt: string }
    localization: { title: string; blurb: string; detail: string; photoAlt: string }
    discuss: string
    supportingLabel: string
    tradeFacilitation: { title: string; desc: string; photoAlt: string }
    logistics: { title: string; desc: string; photoAlt: string }
    compliance: { title: string; desc: string; photoAlt: string }
    marketAccess: { title: string; desc: string; photoAlt: string }
    tradeAdvisory: { title: string; desc: string; photoAlt: string }
    investment: { title: string; desc: string; photoAlt: string }
    ctaHeading: string; ctaBody: string; ctaButton: string
  }

  sectors: {
    eyebrow: string; heading: string; subheading: string
    agriculture: { title: string; desc: string; photoAlt: string }
    manufacturing: { title: string; desc: string; photoAlt: string }
    consumer: { title: string; desc: string; photoAlt: string }
    technology: { title: string; desc: string; photoAlt: string }
    healthcare: { title: string; desc: string; photoAlt: string }
    energy: { title: string; desc: string; photoAlt: string }
    ctaPrompt: string; ctaLink: string
  }

  model: {
    eyebrow: string; heading: string; intro: string
    phase1: { title: string; tagline: string; body: string; example: string }
    phase2: { title: string; tagline: string; body: string; example: string }
    phase3: { title: string; tagline: string; body: string; example: string }
    phase4: { title: string; tagline: string; body: string; example: string }
    exampleLabel: string; loop: string; cta: string
  }

  careers: {
    eyebrow: string; heading: string; intro: string
    responsibilitiesLabel: string; lookingForLabel: string; expressInterest: string
    closingBody: string; closingCta: string
    bd: {
      title: string; location: string; locationNote: string; summary: string
      r1: string; r2: string; r3: string; r4: string; r5: string
      l1: string; l2: string; l3: string; l4: string; l5: string
    }
    compliance: {
      title: string; location: string; locationNote: string; summary: string
      r1: string; r2: string; r3: string; r4: string; r5: string
      l1: string; l2: string; l3: string; l4: string; l5: string
    }
    operations: {
      title: string; location: string; locationNote: string; summary: string
      r1: string; r2: string; r3: string; r4: string; r5: string
      l1: string; l2: string; l3: string; l4: string; l5: string
    }
  }

  apply: {
    backLink: string; eyebrow: string; heading: string; subheading: string
    form: {
      nameLabel: string; namePlaceholder: string
      emailLabel: string; emailPlaceholder: string
      roleLabel: string; locationLabel: string; locationPlaceholder: string
      linkedinLabel: string; linkedinOptional: string; linkedinPlaceholder: string
      messageLabel: string; messagePlaceholder: string; messageHint: string
      cvLabel: string; cvOptional: string; cvPlaceholder: string; cvRemove: string; cvHint: string
      errorMsg: string; sending: string; submit: string; generalInterest: string
    }
    success: { heading: string; body: string; backLink: string }
  }

  contact: {
    eyebrow: string; heading: string; formHeading: string
    fields: {
      name: string; namePlaceholder: string; company: string; companyPlaceholder: string
      region: string; regionPlaceholder: string; interest: string; interestPlaceholder: string
      email: string; emailPlaceholder: string
    }
    errorMsg: string; sending: string; submit: string
    successHeading: string; successBody: string
    detailsHeading: string; callHeading: string; callBody: string; callButton: string
    followHeading: string
  }

  partner: {
    eyebrow: string; heading: string; intro: string
    whoHeading: string
    producers: { title: string; desc: string }
    buyers: { title: string; desc: string }
    logisticsType: { title: string; desc: string }
    investors: { title: string; desc: string }
    whyHeading: string
    benefit1: string; benefit2: string; benefit3: string; benefit4: string
    waysHeading: string
    form: {
      nameLabel: string; namePlaceholder: string
      companyLabel: string; companyPlaceholder: string
      emailLabel: string; emailPlaceholder: string
      typeLabel: string; typePlaceholder: string
      typeProducer: string; typeBuyer: string; typeLogistics: string; typeInvestor: string; typeOther: string
      messageLabel: string; messagePlaceholder: string
      errorMsg: string; sending: string; submit: string
    }
    successHeading: string; successBody: string
    scheduleHeading: string; scheduleBody: string; scheduleButton: string
    emailHeading: string; emailBody: string
  }

  insights: {
    eyebrow: string; heading: string; body: string
    empty: string; read: string
    ctaHeading: string; ctaBody: string; ctaButton: string
    backLink: string; articleCtaHeading: string; articleCtaBody: string; articleCtaButton: string; articleBackLink: string
  }

  // ── Components ───────────────────────────────────────────────────────────
  assessment: {
    badge: string; heading: string; subheading: string; resultHeading: string
  }

  stats: {
    continents: string; products: string; trusted: string
  }

  modelTeaser: {
    eyebrow: string; heading: string; seeMore: string; loop: string
    phase1: { title: string; tagline: string }
    phase2: { title: string; tagline: string }
    phase3: { title: string; tagline: string }
    phase4: { title: string; tagline: string }
  }

  premiumServices: {
    heading: string; body: string; discuss: string
    countryManager: { title: string; blurb: string; photoAlt: string }
    channelPartner: { title: string; blurb: string; photoAlt: string }
    softLanding: { title: string; blurb: string; photoAlt: string }
    localization: { title: string; blurb: string; photoAlt: string }
  }

  servicesTeaser: {
    heading: string; subheading: string; viewAll: string
    tradeFacilitation: string; logistics: string; compliance: string
    marketAccess: string; tradeAdvisory: string; investment: string
  }

  partners: {
    eyebrow: string; heading: string; intro: string
  }

  cookie: {
    bannerHeading: string; bannerBody: string
    essential: string; essentialDesc: string; alwaysOn: string
    analytics: string; analyticsDesc: string
    marketing: string; marketingDesc: string
    acceptAll: string; essentialOnly: string; managePrefs: string; savePrefs: string
    settingsLabel: string; openSettings: string
  }
}

const en: Translations = {
  nav: {
    home: "Home", services: "Services", sectors: "Sectors",
    model: "Our Model", about: "About", careers: "Careers", contact: "Contact",
  },
  hero: {
    eyebrow: "Africa ↔ Global Market Entry",
    heading: "Where Global Innovations and Opportunities Meet",
    headingAccent: "African Excellence",
    tagline: "We help businesses across continents discover new markets, forge partnerships, and grow sustainably.",
    cta1: "Start Your Trade Journey", cta2: "Partner with Us",
  },
  footer: {
    tagline: "Connecting Africa and the world through trade, opportunity, and innovation.",
    offering: "Offering", company: "Company", resources: "Resources",
    rights: "All rights reserved.", country: "Estonia",
  },
  languageSwitcher: { en: "English", fr: "Français", et: "Eesti" },

  about: {
    eyebrow: "About Us",
    heading: "Connecting Africa and the World",
    quote: "Karagateway simplifies international trade, helping African producers reach global markets while enabling international businesses to access opportunities across Africa.",
    body1: "Expert guidance, streamlined cross-border operations, support on both sides to grow confidently.",
    body2: "We bridge complex trade processes with real opportunities so businesses can focus on growth and innovation — through expertise, networks, and advisory support that create seamless connections benefiting African producers and global partners alike.",
    team: {
      heading: "Our Team",
      body: "Hands-on experience with deep cultural and market insight, backed by a network of advisors and specialists across compliance, logistics, and trade. The team leverages knowledge of global and African markets, trade regulations, and business culture across every stage — sourcing, logistics, partnerships, compliance, market expansion.",
    },
    vision: {
      label: "Our Vision",
      quote: "Connecting Africa and the world through trade, opportunity, and innovation that empowers communities and showcases excellence.",
    },
    mission: {
      label: "Our Mission",
      quote: "We help African producers reach global markets and bring global innovations to Africa, guiding partnerships from opportunity to impact.",
    },
    values: {
      heading: "Our Values",
      trust: { title: "Trust", desc: "Transparent, reliable partnerships built on honest communication and integrity." },
      inclusivity: { title: "Inclusivity", desc: "Creating opportunity for African businesses and global partners alike." },
      impact: { title: "Impact", desc: "Driving growth, innovation, and sustainable development across markets." },
      excellence: { title: "Excellence", desc: "Professional, high-quality service at every stage of the trade journey." },
    },
    impactSection: {
      heading: "Our Impact",
      body: "Karagateway empowers African producers to access global markets while connecting international businesses to African opportunities. Our partnerships foster growth, knowledge exchange, and innovation that makes trade more equitable, sustainable, and impactful for all sides.",
      cta: "Get in Touch",
    },
  },

  services: {
    eyebrow: "What We Do", heading: "Trade is just the beginning.",
    subheading: "Our end-to-end services ensure your products move smoothly, globally.",
    flagshipLabel: "Flagship Services", flagshipSub: "Our highest-value, on-the-ground offerings",
    countryManager: {
      title: "Country Manager-as-a-Service",
      blurb: "Your on-the-ground representative in Lagos — taking meetings, chasing leads, and reporting weekly, for a fraction of a local hire.",
      detail: "Retainer + commission model. We attend meetings on your behalf, follow up with leads, handle regulatory legwork, and send weekly updates. You get the coverage of a Lagos office without the fixed overhead.",
      photoAlt: "Business meeting in Africa office",
    },
    channelPartner: {
      title: "Channel-Partner & Distributor Sourcing",
      blurb: "We shortlist, reference-check in person, and manage the partners who'll actually move your volume.",
      detail: "Finder's fee + management retainer. We do the on-the-ground vetting your desk search can't — site visits, reference calls, capacity checks — then stay on to manage the relationship through first shipments.",
      photoAlt: "Handshake in warehouse distribution",
    },
    softLanding: {
      title: "Soft-Landing Package",
      blurb: "Incorporation, banking, virtual office, and your first hires — your African entity, set up and running.",
      detail: "One-off setup fee + ongoing admin retainer. Covers CAC registration, tax registration, corporate bank account setup, and virtual office. Employment/payroll is partnered to a licensed EoR provider.",
      photoAlt: "Modern office building",
    },
    localization: {
      title: "Localization & Go-to-Market",
      blurb: "Local pricing, local payment rails, local onboarding — your product adapted to how Africa buys.",
      detail: "Project-based per market-launch sprint. We adapt your pricing, integrate local payment methods (Paystack, Flutterwave, OPay, M-Pesa, MTN MoMo), localize your KYC flows, and align your product with how African buyers make decisions.",
      photoAlt: "Mobile payment on phone",
    },
    discuss: "Discuss this →",
    supportingLabel: "Full-spectrum trade support",
    tradeFacilitation: { title: "Trade Facilitation", desc: "End-to-end support across the full trade process — from sourcing and vetting to first shipment and beyond.", photoAlt: "Business team collaboration around table" },
    logistics: { title: "Logistics & Supply Chain", desc: "Connecting you to vetted freight, customs, and logistics partners for seamless movement of goods.", photoAlt: "Freight logistics trucks" },
    compliance: { title: "Compliance & Regulatory Guidance", desc: "Navigating the regulatory landscape so your products meet requirements on both sides of the trade.", photoAlt: "Business documents signing" },
    marketAccess: { title: "Market Access & Business Development", desc: "Opening doors to new markets through our networks and on-the-ground intelligence.", photoAlt: "Business growth meeting" },
    tradeAdvisory: { title: "Trade Advisory & Strategy", desc: "Strategic guidance for businesses entering or expanding in African and global markets.", photoAlt: "Strategy consulting team" },
    investment: { title: "Investment & Partnership Facilitation", desc: "Connecting investors, strategic partners, and businesses to forge relationships that unlock growth.", photoAlt: "Investment partnership handshake" },
    ctaHeading: "Not sure which service fits?",
    ctaBody: "Book a free 30-minute consultation and we'll map your situation to the right engagement.",
    ctaButton: "Book a Consultation",
  },

  sectors: {
    eyebrow: "Where We Operate", heading: "Industries We Support",
    subheading: "Connecting businesses across diverse sectors for global trade opportunities.",
    agriculture: { title: "Agriculture & Agro-Processing", desc: "From export-ready African produce to global agri-food supply chains. We connect growers, processors, and international buyers.", photoAlt: "African agriculture farm" },
    manufacturing: { title: "Manufacturing & Industrial Goods", desc: "Facilitating the movement of manufactured goods between African factories and global industrial buyers.", photoAlt: "Factory manufacturing" },
    consumer: { title: "Consumer Goods & Retail", desc: "Helping consumer brands enter African retail channels and connecting African consumer products with global markets.", photoAlt: "Retail products store" },
    technology: { title: "Technology & Innovation", desc: "Bridging global tech solutions with African markets, and helping African tech innovators reach global partners.", photoAlt: "Technology innovation office" },
    healthcare: { title: "Healthcare & Pharmaceuticals", desc: "Navigating the complex regulatory environment for health and pharma products on both sides of the trade.", photoAlt: "Healthcare pharmaceutical" },
    energy: { title: "Energy & Natural Resources", desc: "Supporting energy transition projects, resource trade, and investment flows between Africa and global markets.", photoAlt: "Solar renewable energy" },
    ctaPrompt: "Don't see your business category?", ctaLink: "Get in Touch",
  },

  model: {
    eyebrow: "How We Work", heading: "The Karagateway Trade Loop",
    intro: "We designed our model to be practical, partnership-driven, and adaptable across multiple sectors. It's a 4-phase system that helps African and international businesses trade smarter, faster, and more ethically.",
    phase1: {
      title: "Discover Opportunities", tagline: "The right trade starts with the right insight.",
      body: "Research high-demand products both ways; use market data and on-ground intelligence; identify gaps and trends; curate export-ready producers and credible buyers.",
      example: "Ghanaian cocoa co-ops ready for ethical sourcing deals in Europe.",
    },
    phase2: {
      title: "Match & Verify Partners", tagline: "Trade needs trust. We help build it.",
      body: "Screen and vet; ensure export readiness (quality, volume, documentation); use trusted networks, site visits, and compliance tools; match on product, capacity, and values.",
      example: "A Baltic dairy producer matched with a licensed African food distributor.",
    },
    phase3: {
      title: "Facilitate the Trade Process", tagline: "We simplify the hard stuff.",
      body: "Guide export/import requirements; support logistics, customs, certificates, and licenses; advise on packaging, labeling, and cultural standards; link to trade-finance partners.",
      example: "Nigerian textile exporters guided through EU customs paperwork and shipping routes.",
    },
    phase4: {
      title: "Grow & Scale", tagline: "We don't stop at the first shipment.",
      body: "Monitor outcomes; offer insights to improve deals; help expand to new regions and categories; build long-term relationships that compound over time.",
      example: "A Lithuanian solar firm expanding from East Africa to Francophone West Africa.",
    },
    exampleLabel: "Example: ", loop: "Our loop never ends — each cycle strengthens knowledge, trust, and growth.", cta: "Get Started",
  },

  careers: {
    eyebrow: "Join Us", heading: "Careers at Karagateway",
    intro: "Karagateway is building the trusted bridge between European and African trade. We're growing a small team in Lagos and Tallinn — people who care about doing trade properly, who hold high standards, and who want to help build something that lasts. Below are the roles we're building toward. We welcome expressions of interest at any time.",
    responsibilitiesLabel: "Key responsibilities", lookingForLabel: "What we're looking for", expressInterest: "Express interest",
    closingBody: "We're a compliance-first firm. We facilitate, verify and coordinate; we never hold funds or own goods. We hold our partners and ourselves to a high bar. If that sounds like the kind of place you'd want to work, we'd love to hear from you.",
    closingCta: "Send a general expression of interest →",
    bd: {
      title: "Business Development & Market Access Lead", location: "Lagos or Tallinn", locationNote: "Some travel",
      summary: "Owns the top of the funnel — identifying, qualifying and engaging European exporters and African buyers in our priority corridors, and bringing them through the Trade Loop discovery stage.",
      r1: "Build and work a target list of named accounts across the Europe ↔ Africa corridor (priority: agro-processing equipment into Nigeria)",
      r2: "Run outreach sequences and book discovery calls with qualified prospects",
      r3: "Conduct discovery calls using the Karagateway Discovery Script, qualify the opportunity, and complete the Client Intake Form",
      r4: "Maintain a clean, current Pipeline and Outreach Tracker in the operating system",
      r5: "Work closely with the founder on positioning, messaging, and corridor strategy",
      l1: "Track record in B2B sales, business development, or trade-related advisory — ideally cross-border",
      l2: "Strong written and verbal communication; comfortable in first conversations with senior executives",
      l3: "Self-directed; organised; runs a structured pipeline without being managed daily",
      l4: "Genuine interest in Europe ↔ Africa trade",
      l5: "Comfort with compliance-first selling — no shortcuts, no overpromising",
    },
    compliance: {
      title: "Compliance & Due Diligence Specialist", location: "Lagos or Tallinn", locationNote: "Remote considered",
      summary: "Runs the gate — Karagateway's most important function. Conducts verification of counterparties, partners and clients before any introduction or engagement is made, and maintains the integrity of our trust standard.",
      r1: "Run end-to-end counterparty verifications using the Karagateway Verification & Due-Diligence Playbook",
      r2: "Maintain the Compliance Log with full evidence: registry, sanctions, PEP, adverse-media, and capability checks",
      r3: "Issue Due-Diligence Summary Reports to clients in sourcing engagements",
      r4: "Hold the gate — escalate red flags promptly and document Pass / Decline / Clarify decisions with reasoning",
      r5: "Set and manage re-check schedules on cleared counterparties",
      l1: "Background in compliance, KYC, due diligence, AML, or investigative research",
      l2: "Comfort with free public-source tooling (OpenSanctions, Sanction Scanner, business registries) and structured open-source intelligence",
      l3: "Meticulous documentation habits; understands that 'Cleared' requires evidence, not opinion",
      l4: "Discretion and judgement; a temperament that holds standards under revenue pressure",
      l5: "Familiarity with Europe ↔ Africa trade regulations is a strong plus",
    },
    operations: {
      title: "Trade Operations & Transaction Coordinator", location: "Lagos preferred", locationNote: "Remote considered for the right candidate",
      summary: "Owns delivery. Manages live engagements from signed proposal to completion, coordinating partners, milestones, and client communication so trade actually moves on schedule.",
      r1: "Manage the engagement timeline for each Live Engagement, from kick-off through to delivery and sign-off",
      r2: "Coordinate Karagateway's partner network — logistics, customs, inspection (SONCAP), legal — on each engagement",
      r3: "Run the weekly client update rhythm; flag risks and blockers early",
      r4: "Maintain the Live Engagements database with accurate, up-to-date status",
      r5: "Support transaction milestones (Form M, SONCAP, shipment coordination) without taking ownership of regulated work",
      l1: "Experience in trade operations, freight forwarding, supply chain coordination, or international project management",
      l2: "Strong organisational habits; thrives on managing multiple workstreams and deadlines",
      l3: "Comfort coordinating third-party providers without micromanaging them",
      l4: "Understanding of cross-border trade documentation (Form M, SONCAP, Bills of Lading, Letters of Credit) is a strong plus",
      l5: "Calm under pressure; client-facing professionalism",
    },
  },

  apply: {
    backLink: "Back to Careers", eyebrow: "Join Us", heading: "Express Interest",
    subheading: "Keep it brief. We read every submission.",
    form: {
      nameLabel: "Full name", namePlaceholder: "Jane Smith",
      emailLabel: "Email", emailPlaceholder: "jane@example.com",
      roleLabel: "Which role are you interested in?",
      locationLabel: "Current location", locationPlaceholder: "e.g. Lagos, Nigeria",
      linkedinLabel: "LinkedIn profile", linkedinOptional: "(optional)", linkedinPlaceholder: "https://www.linkedin.com/in/yourname",
      messageLabel: "Tell us briefly why this role and Karagateway interest you",
      messagePlaceholder: "A short note — no need for a cover letter. Just tell us who you are and why this.",
      messageHint: "Max 500 words.",
      cvLabel: "CV / résumé", cvOptional: "(optional, PDF only)", cvPlaceholder: "Choose PDF file…", cvRemove: "Remove",
      cvHint: "If you'd prefer, you can also email your CV directly to info@karagateway.com.",
      errorMsg: "Something went wrong — please try again or email us at info@karagateway.com.",
      sending: "Sending…", submit: "Send", generalInterest: "General interest",
    },
    success: {
      heading: "Thanks for your interest.",
      body: "We review every submission and will be in touch when there's a strong fit. Karagateway is in active development — interviews begin as we are ready to hire each role.",
      backLink: "← Back to Careers",
    },
  },

  contact: {
    eyebrow: "Reach Out", heading: "Get Started", formHeading: "Send us a message",
    fields: {
      name: "Name", namePlaceholder: "Jane Smith",
      company: "Company", companyPlaceholder: "Your company",
      region: "Region / Country", regionPlaceholder: "e.g. Germany, Nigeria",
      interest: "Trade interest", interestPlaceholder: "e.g. Market entry into Nigeria",
      email: "Email", emailPlaceholder: "jane@company.com",
    },
    errorMsg: "Something went wrong. Email us directly at info@karagateway.com",
    sending: "Sending…", submit: "Send",
    successHeading: "Message received.",
    successBody: "Thanks for providing your information — a member of our team will get in touch within 24 hours.",
    detailsHeading: "Contact details", callHeading: "Prefer a call?",
    callBody: "Book a free 30-minute consultation directly.", callButton: "Book a Call",
    followHeading: "Follow us",
  },

  partner: {
    eyebrow: "Join Our Network", heading: "Partner With Us",
    intro: "Karagateway partners with producers, exporters, importers, and service providers to create seamless trade opportunities across Africa and the world. By joining our network you gain access to verified partners, market insights, compliance expertise, and end-to-end support.",
    whoHeading: "Who can partner with us?",
    producers: { title: "Producers & Suppliers", desc: "African producers and exporters ready to reach global buyers." },
    buyers: { title: "Buyers & Distributors", desc: "International and African buyers seeking vetted, reliable supply." },
    logisticsType: { title: "Logistics & Service Providers", desc: "Freight, customs, compliance, and trade-finance specialists." },
    investors: { title: "Investors & Strategic Partners", desc: "Those looking to invest in or partner with the growing Africa trade ecosystem." },
    whyHeading: "Why partner with Karagateway?",
    benefit1: "Access to verified, vetted trade partners on both sides",
    benefit2: "Simplified, end-to-end trade processes",
    benefit3: "Market insights and growth opportunities",
    benefit4: "Ethical and transparent collaboration at every stage",
    waysHeading: "Three ways to get started",
    form: {
      nameLabel: "Your name", namePlaceholder: "Jane Smith",
      companyLabel: "Company / organisation", companyPlaceholder: "Acme Ltd",
      emailLabel: "Email", emailPlaceholder: "jane@company.com",
      typeLabel: "Partner type", typePlaceholder: "Select…",
      typeProducer: "Producer / Supplier", typeBuyer: "Buyer / Distributor",
      typeLogistics: "Logistics / Service Provider", typeInvestor: "Investor / Strategic Partner", typeOther: "Other",
      messageLabel: "How can we partner?", messagePlaceholder: "Tell us about your business and what you're looking for…",
      errorMsg: "Something went wrong. Email us directly at info@karagateway.com",
      sending: "Sending…", submit: "Submit",
    },
    successHeading: "Application received.",
    successBody: "Thanks for providing your information — a member of our team will get in touch within 24 hours.",
    scheduleHeading: "Schedule a call", scheduleBody: "Book a free 30-minute consultation directly in our calendar.", scheduleButton: "Book a Call",
    emailHeading: "Email us directly", emailBody: "For quick questions or if you prefer direct email.",
  },

  insights: {
    eyebrow: "Insights & Resources", heading: "Trade intelligence for a connected world",
    body: "Market-entry guides, compliance essentials, and practical insights from Karagateway's team — so you can trade smarter across Africa and beyond.",
    empty: "Posts coming soon — check back shortly.", read: "Read",
    ctaHeading: "Ready to move from reading to doing?",
    ctaBody: "Our team works directly with businesses at every stage of their Africa trade journey. Book a free 30-minute conversation and let's discuss your specific situation.",
    ctaButton: "Book a Free Consultation",
    backLink: "All Insights", articleCtaHeading: "Ready to discuss your situation?",
    articleCtaBody: "This article is general guidance. For advice specific to your product, market, and stage, book a free 30-minute call with our team.",
    articleCtaButton: "Book a Free Consultation", articleBackLink: "Back to all insights",
  },

  assessment: {
    badge: "Free · Takes 2 minutes",
    heading: "Get Your Market-Entry Snapshot",
    subheading: "Answer 7 questions. Receive a personalised, expert analysis of your Africa market-entry situation — instantly.",
    resultHeading: "Your Market-Entry Snapshot",
  },

  stats: {
    continents: "Continents Connected",
    products: "Products Sourced",
    trusted: "Trusted by SMEs, Govts & Trade Groups",
  },

  modelTeaser: {
    eyebrow: "How We Work", heading: "The Karagateway Trade Loop", seeMore: "See the full model →",
    loop: "Our loop never ends — each cycle strengthens knowledge, trust, and growth.",
    phase1: { title: "Discover Opportunities", tagline: "The right trade starts with the right insight." },
    phase2: { title: "Match & Verify Partners", tagline: "Trade needs trust. We help build it." },
    phase3: { title: "Facilitate the Trade Process", tagline: "We simplify the hard stuff." },
    phase4: { title: "Grow & Scale", tagline: "We don't stop at the first shipment." },
  },

  premiumServices: {
    heading: "Your team on the ground in Africa.",
    body: "Most firms hand you a report and wish you luck. We become your local presence — taking meetings in Lagos, vetting your distributors in person, handling incorporation and your first hires, and adapting your product to how Africa actually buys. Market entry, executed.",
    discuss: "Discuss this →",
    countryManager: { title: "Country Manager-as-a-Service", blurb: "Your on-the-ground representative in Lagos — taking meetings, chasing leads, and reporting weekly, for a fraction of a local hire.", photoAlt: "Business meeting in Africa office" },
    channelPartner: { title: "Channel-Partner & Distributor Sourcing", blurb: "We shortlist, reference-check in person, and manage the partners who'll actually move your volume.", photoAlt: "Handshake in warehouse distribution" },
    softLanding: { title: "Soft-Landing Package", blurb: "Incorporation, banking, virtual office, and your first hires — your African entity, set up and running.", photoAlt: "Modern office building" },
    localization: { title: "Localization & Go-to-Market", blurb: "Local pricing, local payment rails, local onboarding — your product adapted to how Africa buys.", photoAlt: "Mobile payment on phone" },
  },

  servicesTeaser: {
    heading: "Trade is just the beginning.", subheading: "Our end-to-end services ensure your products move smoothly, globally.", viewAll: "View all services →",
    tradeFacilitation: "Trade Facilitation", logistics: "Logistics & Supply Chain",
    compliance: "Compliance & Regulatory Guidance", marketAccess: "Market Access & Business Development",
    tradeAdvisory: "Trade Advisory & Strategy", investment: "Investment & Partnership Facilitation",
  },

  partners: {
    eyebrow: "Trusted Network", heading: "Our Partners",
    intro: "Working alongside trusted partners across legal, logistics, and trade compliance.",
  },

  cookie: {
    bannerHeading: "We value your privacy",
    bannerBody: "We use essential cookies to make our site work. With your consent, we also use analytics and marketing cookies to improve your experience.",
    essential: "Essential", essentialDesc: "Required for the site to function. Cannot be switched off.", alwaysOn: "Always on",
    analytics: "Analytics", analyticsDesc: "Help us understand how visitors use the site so we can improve it.",
    marketing: "Marketing", marketingDesc: "Allow personalised content and ads relevant to you.",
    acceptAll: "Accept all", essentialOnly: "Essential only", managePrefs: "Manage preferences", savePrefs: "Save preferences",
    settingsLabel: "Cookie settings", openSettings: "Open cookie settings",
  },
}

export default en
