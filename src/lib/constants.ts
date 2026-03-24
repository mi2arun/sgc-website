export const SITE_CONFIG = {
  name: "Saradha Gangadharan College",
  shortName: "SGC",
  tagline: "An Autonomous Institution Affiliated to Pondicherry University",
  phone: "+91-413-2211800",
  email: "info@sgc.edu.in",
  address: "Puducherry - 605 004, India",
  website: "https://sgc.edu.in",
  social: {
    facebook: "https://facebook.com/sgcpdy",
    twitter: "https://twitter.com/sgcpdy",
    instagram: "https://instagram.com/sgcpdy",
    youtube: "https://youtube.com/@sgcpdy",
    linkedin: "https://linkedin.com/school/sgcpdy",
  },
};

export const NAV_ITEMS = [
  {
    label: "Home",
    href: "/",
  },
  {
    label: "About",
    href: "/about",
    children: [
      { label: "About SGC", href: "/about" },
      { label: "Vision & Mission", href: "/about/vision-mission" },
      { label: "Administration", href: "/about/administration" },
      { label: "Affiliation & Recognition", href: "/about/affiliation" },
      { label: "Annual Reports", href: "/about/annual-reports" },
    ],
  },
  {
    label: "Academics",
    href: "/academics",
    children: [
      { label: "Departments", href: "/academics/departments" },
      { label: "UG Programmes", href: "/academics/ug-programmes" },
      { label: "PG Programmes", href: "/academics/pg-programmes" },
      { label: "Library", href: "/academics/library" },
      { label: "Academic Calendar", href: "/academics/calendar" },
    ],
  },
  {
    label: "Admissions",
    href: "/admissions",
    children: [
      { label: "Admission Guidelines", href: "/admissions" },
      { label: "Apply Online", href: "/admissions/apply" },
      { label: "Fee Structure", href: "/admissions/fees" },
      { label: "Prospectus", href: "/admissions/prospectus" },
    ],
  },
  {
    label: "Research",
    href: "/research",
    children: [
      { label: "Centre for Research", href: "/research" },
      { label: "Research Fund", href: "/research/fund" },
      { label: "Publications", href: "/research/publications" },
      { label: "Innovation & Startups", href: "/research/innovation" },
    ],
  },
  {
    label: "Campus Life",
    href: "/campus-life",
    children: [
      { label: "Student Support", href: "/campus-life/student-support" },
      { label: "Clubs & Centres", href: "/campus-life/clubs" },
      { label: "NCC & NSS", href: "/campus-life/ncc-nss" },
      { label: "Sports", href: "/campus-life/sports" },
      { label: "Amenities", href: "/campus-life/amenities" },
    ],
  },
  {
    label: "Accreditation",
    href: "/accreditation",
    children: [
      { label: "NAAC", href: "/accreditation/naac" },
      { label: "IQAC", href: "/accreditation/iqac" },
      { label: "AICTE", href: "/accreditation/aicte" },
      { label: "NIRF", href: "/accreditation/nirf" },
      { label: "ISO", href: "/accreditation/iso" },
    ],
  },
  {
    label: "Placements",
    href: "/placements",
  },
  {
    label: "Gallery",
    href: "/gallery",
  },
  {
    label: "Contact",
    href: "/contact",
  },
];

export const STATS = [
  { label: "Courses Offered", value: 13, suffix: "+" },
  { label: "Expert Faculty", value: 79, suffix: "+" },
  { label: "Students", value: 1245, suffix: "+" },
  { label: "Placements", value: 1000, suffix: "+" },
];

export const DEPARTMENTS = [
  { name: "B.A English (Honours)", type: "UG", fees: "₹16,000", icon: "BookOpen" },
  { name: "B.Com (Honours)", type: "UG", fees: "₹28,000", icon: "BarChart3" },
  { name: "B.B.A (Honours)", type: "UG", fees: "₹28,000", icon: "Briefcase" },
  { name: "B.Com Corporate Secretaryship", type: "UG", fees: "₹28,000", icon: "Scale" },
  { name: "B.Sc Physics (Honours)", type: "UG", fees: "₹16,000", icon: "Atom" },
  { name: "B.Sc Mathematics (Honours)", type: "UG", fees: "₹16,000", icon: "Calculator" },
  { name: "B.Sc Computer Science (Honours)", type: "UG", fees: "₹24,000", icon: "Monitor" },
  { name: "B.C.A (Honours)", type: "UG", fees: "₹24,000", icon: "Laptop" },
  { name: "B.Sc IT (Honours)", type: "UG", fees: "₹24,000", icon: "Globe" },
  { name: "M.A English", type: "PG", fees: "₹16,000", icon: "BookOpen" },
  { name: "M.Com", type: "PG", fees: "₹22,000", icon: "BarChart3" },
  { name: "M.Sc Mathematics", type: "PG", fees: "₹16,000", icon: "Calculator" },
  { name: "M.Sc Computer Science", type: "PG", fees: "₹22,000", icon: "Monitor" },
];

export const EVENTS = [
  {
    title: "Annual Orientation Programme 2026",
    date: "2026-03-28",
    category: "Academic",
    description: "Welcome session for newly admitted students across all departments.",
  },
  {
    title: "National Science Day Celebration",
    date: "2026-02-28",
    category: "Event",
    description: "Special lectures and exhibitions on the theme of Science & Innovation.",
  },
  {
    title: "iTechnova 2026 — Tech Fest",
    date: "2026-03-15",
    category: "Festival",
    description: "Annual technology festival featuring hackathons, workshops, and competitions.",
  },
  {
    title: "NSS Special Camp",
    date: "2026-03-10",
    category: "Service",
    description: "Seven-day residential camp focusing on community development and social awareness.",
  },
];

export const NEWS = [
  {
    title: "SGC Awarded NAAC A+ Grade",
    date: "2026-03-20",
    excerpt: "Saradha Gangadharan College has been awarded A+ grade by the National Assessment and Accreditation Council.",
  },
  {
    title: "MoU Signed with Leading IT Companies",
    date: "2026-03-18",
    excerpt: "The college signed MoUs with three major IT companies for internship and placement opportunities.",
  },
  {
    title: "Faculty Publication in International Journal",
    date: "2026-03-15",
    excerpt: "Dr. Ramesh Kumar from the Computer Science department published a paper in IEEE Transactions.",
  },
  {
    title: "Blood Donation Camp Organized",
    date: "2026-03-12",
    excerpt: "Red Cross Youth Club organized a blood donation camp with over 200 donors participating.",
  },
];

export const PLACEMENT_STATS = [
  { label: "Management", percentage: 88 },
  { label: "Banking & Finance", percentage: 80 },
  { label: "IT & Software", percentage: 92 },
  { label: "Higher Studies", percentage: 76 },
];

export const QUICK_LINKS = [
  { label: "Apply Online", href: "/admissions/apply", highlight: true },
  { label: "Pay Fees", href: "/admissions/fees", highlight: true },
  { label: "Download Prospectus", href: "/admissions/prospectus", highlight: false },
  { label: "Exam Results", href: "/examination/results", highlight: false },
];

export const FOOTER_LINKS = {
  quickLinks: [
    { label: "About SGC", href: "/about" },
    { label: "Admissions", href: "/admissions" },
    { label: "Departments", href: "/academics/departments" },
    { label: "Faculty", href: "/faculty" },
    { label: "Research", href: "/research" },
    { label: "Placements", href: "/placements" },
  ],
  academics: [
    { label: "UG Programmes", href: "/academics/ug-programmes" },
    { label: "PG Programmes", href: "/academics/pg-programmes" },
    { label: "Library", href: "/academics/library" },
    { label: "Academic Calendar", href: "/academics/calendar" },
    { label: "Examination", href: "/examination" },
  ],
  resources: [
    { label: "NAAC", href: "/accreditation/naac" },
    { label: "IQAC", href: "/accreditation/iqac" },
    { label: "NIRF", href: "/accreditation/nirf" },
    { label: "Gallery", href: "/gallery" },
    { label: "Alumni", href: "/alumni" },
    { label: "Contact Us", href: "/contact" },
  ],
};
