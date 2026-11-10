// All the company details and page content live here, so they can be edited in one place.

export const company = {
  name: "PT Integra Daya Solusi",
  tagline: "Insurance, Risk and Engineering Consultant",
  phones: [
    { label: "021-8378 9544", href: "tel:+622183789544" },
    { label: "021-5060 6090", href: "tel:+622150606090" },
  ],
  addressLines: [
    "Menara MTH, Lantai 15, Suite 1508",
    "Jl. Letjen M.T. Haryono Kav. 23, RT 08/RW 09",
    "Tebet Timur, Jakarta Selatan",
    "Indonesia",
  ],
  // Put the company email here once the client provides it. The contact form will then open an email draft.
  email: "",
};

export const mapUrl =
  "https://www.google.com/maps?q=Menara+MTH+Jl.+Letjen+M.T.+Haryono+Kav.+23+Tebet+Timur+Jakarta+Selatan&output=embed";

export const services = [
  {
    slug: "insurance-risk-assessor",
    icon: "shield",
    title: "Insurance Risk Assessor",
    short: "Independent surveys and risk grading that show where your assets are exposed.",
    intro:
      "We inspect properties, plants and operations, then explain in plain terms what could go wrong, how likely it is and what it could cost.",
    offerings: [
      "Property and industrial risk surveys",
      "Risk grading and loss-prevention recommendations",
      "Review of sum insured and coverage adequacy",
      "Risk improvement plans with clear priorities",
      "Support with underwriting information and surveys",
    ],
  },
  {
    slug: "insurance-agent",
    icon: "umbrella",
    title: "Insurance Agent",
    short: "Coverage that fits your business, placed with the right insurer and managed over time.",
    intro:
      "We help companies and individuals understand their options, compare coverage and keep policies aligned with how the business actually runs.",
    offerings: [
      "Coverage needs analysis",
      "Policy comparison and placement",
      "Renewal reviews and policy administration",
      "Guidance through the claims process",
      "Employee benefits and general insurance programmes",
    ],
  },
  {
    slug: "retirement-fund-consultant",
    icon: "clock",
    title: "Retirement Fund Consultant",
    short: "Pension and retirement programmes designed to be sustainable for the company and its people.",
    intro:
      "We advise employers on setting up and reviewing retirement programmes so that promises to employees can be kept.",
    offerings: [
      "Retirement programme design and benchmarking",
      "Review of existing pension arrangements",
      "Support with regulatory requirements and reporting",
      "Employee communication and education",
      "Advice on programme governance",
    ],
  },
  {
    slug: "law-consultant",
    icon: "scales",
    title: "Law Consultant",
    short: "Practical legal advice on contracts, compliance and corporate matters.",
    intro:
      "We help businesses stay on the right side of regulations and put agreements in writing that protect their interests.",
    offerings: [
      "Contract drafting and review",
      "Corporate and commercial legal advice",
      "Regulatory and licensing support",
      "Legal due diligence",
      "Legal aspects of insurance and employee benefits",
    ],
  },
  {
    slug: "accounting-and-tax-consultant",
    icon: "calculator",
    title: "Accounting and Tax Consultant",
    short: "Accurate books, timely reporting and tax planning you can rely on.",
    intro:
      "We keep financial records in order and help you meet tax obligations with confidence, while looking for lawful ways to plan ahead.",
    offerings: [
      "Bookkeeping and financial statement preparation",
      "Tax planning and compliance",
      "Periodic and annual tax reporting",
      "Accounting system review",
      "Financial analysis for management decisions",
    ],
  },
  {
    slug: "industrial-management-consultant",
    icon: "factory",
    title: "Industrial Management Consultant",
    short: "Better processes, safer operations and stronger organisations for industrial companies.",
    intro:
      "We work with plant and operations teams to improve how things are done, from safety practices to day-to-day efficiency.",
    offerings: [
      "Operational and process improvement",
      "Occupational health and safety systems",
      "Engineering and feasibility studies",
      "Organisation and management systems",
      "Business continuity and risk management planning",
    ],
  },
];

export const values = [
  { title: "Integrity", text: "We give honest advice, even when it is not the easy answer." },
  { title: "Independence", text: "Our recommendations are based on what is right for the client." },
  { title: "Expertise", text: "Specialists in risk, law, finance and engineering work as one team." },
  { title: "Partnership", text: "We stay involved long after the first report is delivered." },
];

export const approach = [
  { step: "01", title: "Understand", text: "We listen first, then study your operations, contracts and numbers." },
  { step: "02", title: "Assess", text: "We identify the risks and gaps that matter most to the business." },
  { step: "03", title: "Advise", text: "You receive clear, prioritised recommendations in plain language." },
  { step: "04", title: "Support", text: "We help put the advice into practice and review it as things change." },
];

export const faqs = [
  {
    q: "Which companies do you work with?",
    a: "We support organisations of different sizes and industries, especially those with property, plant or people to protect. Contact us to discuss your situation.",
  },
  {
    q: "Can I use more than one of your services?",
    a: "Yes. Our risk, insurance, legal, finance and industrial specialists work together, so you can combine services under one engagement.",
  },
  {
    q: "How do we get started?",
    a: "Send us a message or call our office. We will arrange an initial discussion to understand your needs and explain how we can help.",
  },
  {
    q: "Where is your office?",
    a: "We are on the 15th floor of Menara MTH on Jl. Letjen M.T. Haryono, Tebet, South Jakarta.",
  },
];

export const posts = [
  {
    slug: "why-risk-surveys-matter",
    title: "Why a risk survey is worth doing before you renew insurance",
    date: "2026-10-01",
    category: "Risk",
    summary: "A survey shows what insurers will see and what you can fix before they do.",
    body: [
      "Most companies think about insurance once a year, when the renewal notice arrives. By then there is little time to change how a site is run.",
      "A risk survey looks at the building, the equipment and the way people work. It highlights fire protection gaps, storage practices and maintenance issues that could lead to a loss or a higher premium.",
      "Doing the survey before renewal gives you time to act on the findings and to present the property to insurers with confidence.",
    ],
  },
  {
    slug: "sum-insured-check",
    title: "Is your sum insured still correct?",
    date: "2026-09-15",
    category: "Insurance",
    summary: "Asset values change. Your policy should keep up with them.",
    body: [
      "Construction costs and equipment prices rise over time, and new assets are added every year. If the sum insured is not updated, a claim may not cover the full loss.",
      "A short annual review of asset values against the policy schedule is one of the simplest ways to avoid an unpleasant surprise after a loss.",
      "Our team can help you build a reliable asset list and check it against your current coverage.",
    ],
  },
  {
    slug: "planning-employee-retirement",
    title: "Planning retirement benefits that last",
    date: "2026-08-20",
    category: "Retirement",
    summary: "Good retirement programmes balance what employees need with what the company can sustain.",
    body: [
      "Retirement benefits are a long-term promise. A programme that looks affordable today can become a burden if it is not reviewed regularly.",
      "Start with clear goals, understand the regulations that apply and set up simple governance so that decisions are documented and reviewed.",
      "Explaining the programme to employees in plain language also helps them value the benefit and plan their own savings.",
    ],
  },
];

export const navLinks = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About Us" },
  { href: "/services", label: "Services", children: true },
  { href: "/portfolio", label: "Portfolio" },
  { href: "/insights", label: "Insights" },
  { href: "/careers", label: "Careers" },
  { href: "/contact", label: "Contact Us" },
];

// ---------------------------------------------------------------------------
// SAMPLE CONTENT: everything below is made-up placeholder text for the client demo.
// Replace it with real details (history, people, projects, quotes, vacancies) when the client provides them.
// ---------------------------------------------------------------------------

export const history = [
  { year: "2010", title: "Founded in Jakarta", text: "Started as a small team of risk surveyors helping local businesses understand their insurance exposure." },
  { year: "2014", title: "Insurance agency added", text: "Expanded into insurance placement so clients could act on survey findings through one adviser." },
  { year: "2018", title: "Legal, tax and accounting", text: "Welcomed legal, accounting and tax specialists to cover the wider needs of growing companies." },
  { year: "2022", title: "Industrial management", text: "Added engineering and industrial management consulting for plants and manufacturers." },
  { year: "Today", title: "One integrated team", text: "Six disciplines working together from our office in Tebet, South Jakarta." },
];

export const leaders = [
  { name: "Andreas Wibowo", role: "President Director", bio: "Leads the firm and its risk and insurance practice with over 20 years of experience in the industry." },
  { name: "Maya Kusuma", role: "Director, Legal and Compliance", bio: "Advises clients on contracts, licensing and regulatory matters across sectors." },
  { name: "Budi Santoso", role: "Director, Finance and Tax", bio: "Oversees accounting, tax and retirement programme advisory." },
  { name: "Rina Hartono", role: "Head of Industrial Management", bio: "Works with plant teams on safety, process improvement and feasibility studies." },
];

export const projects = [
  { title: "Fire and property risk survey for a manufacturing group", category: "Insurance Risk Assessor", place: "Cikarang", summary: "Surveyed five production sites, graded fire risk and delivered a prioritised improvement plan." },
  { title: "Insurance programme review for a logistics company", category: "Insurance Agent", place: "Jakarta", summary: "Consolidated several policies, closed coverage gaps and simplified renewals." },
  { title: "Employer pension programme redesign", category: "Retirement Fund Consultant", place: "Jakarta", summary: "Reviewed benefits and governance and set out a sustainable programme for employees." },
  { title: "Commercial contract framework for a trading firm", category: "Law Consultant", place: "Surabaya", summary: "Prepared standard contract templates and a review process for supplier agreements." },
  { title: "Tax compliance and reporting support", category: "Accounting and Tax Consultant", place: "Tangerang", summary: "Organised records, streamlined monthly reporting and prepared annual tax filings." },
  { title: "Safety management system for a processing plant", category: "Industrial Management Consultant", place: "Karawang", summary: "Built a safety system with procedures, training and regular audits." },
];

export const testimonials = [
  { quote: "The survey report was clear and practical. We knew exactly what to fix first.", name: "Operations Manager", company: "Manufacturing company, Cikarang" },
  { quote: "Having insurance, legal and tax advice in one team saved us a lot of back and forth.", name: "Finance Director", company: "Trading company, Jakarta" },
  { quote: "They explained our pension options in plain language and stayed with us through the changes.", name: "HR Manager", company: "Services company, Jakarta" },
];

export const jobs = [
  { title: "Risk Surveyor", type: "Full-time", place: "Jakarta", text: "Visit client sites, assess risks and write clear survey reports. Engineering background preferred." },
  { title: "Insurance Account Executive", type: "Full-time", place: "Jakarta", text: "Look after corporate clients, support renewals and guide them through claims." },
  { title: "Tax and Accounting Associate", type: "Full-time", place: "Jakarta", text: "Prepare financial statements and tax reports and support client reviews." },
  { title: "Legal Intern", type: "Internship", place: "Jakarta", text: "Assist with contract review and legal research under senior supervision." },
];

export const benefits = [
  "Health insurance and annual check-up",
  "Structured training and professional certification support",
  "Mentoring from senior specialists",
  "Central Jakarta office near public transport",
  "Collaborative, friendly team culture",
  "Clear paths to grow across disciplines",
];

export const employeeStories = [
  { quote: "I learn something new on every project because I work next to specialists from other fields.", name: "Risk Surveyor, 3 years" },
  { quote: "Senior colleagues take the time to teach. I have grown a lot since joining.", name: "Accounting Associate, 2 years" },
];

// The five pictures shown beside the home page headline, one for each word (insurance, retirement, legal, tax, engineering).
// The files are in public/photos/. "pos" chooses which part of the photo stays in view inside the arch.
// To swap a photo, replace the file (keep the name) or change its "src". Use pictures at least 900 px wide.
export const heroPhotos = [
  { src: "/photos/insurance.jpg", alt: "A building inspector in a hard hat looking up at a glass office tower", zoom: 1, pos: "30% 50%" },
  { src: "/photos/retirement.jpg", alt: "A smiling older couple reading a document together at home", zoom: 1, pos: "72% 40%" },
  { src: "/photos/legal.jpg", alt: "A hand signing a contract beside the scales of justice", zoom: 1, pos: "50% 62%" },
  { src: "/photos/tax.jpg", alt: "A calculator, charts and a laptop on a tidy desk", zoom: 1, pos: "50% 70%" },
  { src: "/photos/engineering.jpg", alt: "Two engineers in safety helmets reviewing plans at an industrial plant", zoom: 1, pos: "58% 50%" },
];
