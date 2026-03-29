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

export const ANNOUNCEMENTS = [
  {
    title: "End Semester Examination Schedule — April 2026",
    date: "2026-03-28",
    category: "Examination",
    isNew: true,
    href: "/examination/schedule",
  },
  {
    title: "Last Date to Pay Tuition Fees — 10th April 2026",
    date: "2026-03-26",
    category: "Fees",
    isNew: true,
    href: "/admissions/fees",
  },
  {
    title: "UG/PG Admission Open for 2026–27 Academic Year",
    date: "2026-03-22",
    category: "Admission",
    isNew: true,
    href: "/admissions/apply",
  },
  {
    title: "NAAC Peer Team Visit — 15th to 17th April 2026",
    date: "2026-03-20",
    category: "Accreditation",
    isNew: false,
    href: "/accreditation/naac",
  },
  {
    title: "Revised Academic Calendar 2025–26 (Even Semester)",
    date: "2026-03-18",
    category: "Academic",
    isNew: false,
    href: "/academics/calendar",
  },
  {
    title: "Results: Internal Assessment — March 2026",
    date: "2026-03-15",
    category: "Examination",
    isNew: false,
    href: "/examination/results",
  },
];

export const PROMO_BANNERS = [
  {
    title: "Admissions Open 2026–27",
    subtitle: "Apply now for UG & PG programmes. Limited seats available.",
    cta: "Apply Now",
    href: "/admissions/apply",
    color: "primary",
  },
  {
    title: "Merit Scholarships Available",
    subtitle: "Up to 100% tuition fee waiver for toppers. Check eligibility.",
    cta: "Learn More",
    href: "/admissions/scholarships",
    color: "gold",
  },
  {
    title: "iTechnova 2026 — Register Now",
    subtitle: "Annual tech fest. Hackathons, workshops, cash prizes worth ₹2,00,000.",
    cta: "Register",
    href: "/campus-life/events/itechnova",
    color: "accent",
  },
];

export const ACCREDITATIONS = [
  { name: "NAAC", grade: "A+", label: "NAAC Accredited", description: "National Assessment & Accreditation Council" },
  { name: "UGC", grade: "2(f) & 12(B)", label: "UGC Recognized", description: "University Grants Commission" },
  { name: "ISO", grade: "9001:2015", label: "ISO Certified", description: "Quality Management System" },
  { name: "NIRF", grade: "#142", label: "NIRF Ranked", description: "National Institutional Ranking Framework" },
  { name: "AUTONOMOUS", grade: "", label: "Autonomous", description: "Affiliated to Pondicherry University" },
];

export const RECRUITERS = [
  "TCS", "Infosys", "Wipro", "HCL Technologies", "Cognizant",
  "Accenture", "Capgemini", "Tech Mahindra", "Zoho", "Freshworks",
  "L&T Infotech", "Mphasis", "HDFC Bank", "ICICI Bank", "Axis Bank",
  "Deloitte", "EY", "KPMG", "Amazon", "Flipkart",
];

export const ACTIVITY_FEED = [
  {
    title: "Workshop on AI & Machine Learning",
    date: "2026-03-29",
    type: "Workshop",
    department: "Computer Science",
    description: "Department of Computer Science conducted a two-day workshop in collaboration with IIT Madras.",
  },
  {
    title: "Inter-College Basketball Tournament — Champions!",
    date: "2026-03-27",
    type: "Sports",
    department: "Physical Education",
    description: "SGC Men's Basketball team won the Pondicherry University Inter-College Championship.",
  },
  {
    title: "Guest Lecture: Digital Marketing Trends",
    date: "2026-03-25",
    type: "Seminar",
    department: "Commerce",
    description: "Mr. Rajesh Kumar, CMO of Zoho Corp, delivered a guest lecture for BBA and B.Com students.",
  },
  {
    title: "NSS Blood Donation Camp — 200+ Donors",
    date: "2026-03-23",
    type: "Service",
    department: "NSS",
    description: "Red Cross Youth Club organized a mega blood donation camp with participation from all departments.",
  },
  {
    title: "MoU Signing with Infosys Springboard",
    date: "2026-03-21",
    type: "Collaboration",
    department: "Placement Cell",
    description: "SGC signed an MoU with Infosys Springboard for industry-ready certification programs.",
  },
];

export const SCHOLARSHIPS = [
  { name: "Merit Scholarship", amount: "Up to 100% tuition fee", eligibility: "90%+ in qualifying exam" },
  { name: "SC/ST Scholarship", amount: "Full fee + stipend", eligibility: "Government of Puducherry scheme" },
  { name: "Sports Quota", amount: "50% tuition fee", eligibility: "State/National level players" },
  { name: "EWS Scholarship", amount: "75% tuition fee", eligibility: "Family income below ₹8 LPA" },
];

export const COMPLIANCE_LINKS = [
  { label: "IQAC", href: "/accreditation/iqac", icon: "ClipboardCheck" },
  { label: "NAAC", href: "/accreditation/naac", icon: "Award" },
  { label: "NIRF", href: "/accreditation/nirf", icon: "BarChart3" },
  { label: "RTI", href: "/rti", icon: "FileText" },
  { label: "Anti-Ragging", href: "/anti-ragging", icon: "Shield" },
  { label: "Grievance", href: "/grievance", icon: "MessageCircle" },
  { label: "ICC / POSH", href: "/icc", icon: "Users" },
  { label: "Mandatory Disclosure", href: "/disclosure", icon: "FileCheck" },
  { label: "AICTE", href: "/accreditation/aicte", icon: "Building" },
  { label: "Exam Results", href: "/examination/results", icon: "GraduationCap" },
  { label: "Student Feedback", href: "/feedback", icon: "MessageSquare" },
  { label: "Downloads", href: "/downloads", icon: "Download" },
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
