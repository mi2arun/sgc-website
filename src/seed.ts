import { getPayload } from 'payload'
import config from '@payload-config'

async function seed() {
  const payload = await getPayload({ config })

  console.log('🌱 Seeding CMS data...')

  // ─── Site Settings ───
  console.log('  → Site Settings')
  await payload.updateGlobal({
    slug: 'site-settings',
    data: {
      collegeName: 'Saradha Gangadharan College',
      shortName: 'SGC',
      tagline: 'An Autonomous Institution Affiliated to Pondicherry University',
      phone: '+91-413-2211800',
      email: 'info@sgc.edu.in',
      address: 'Lake Road, Velrampet, Puducherry — 605 004, India',
      mapUrl: 'https://maps.google.com/?q=Saradha+Gangadharan+College+Puducherry',
      social: {
        facebook: 'https://facebook.com/sgcpdy',
        twitter: 'https://twitter.com/sgcpdy',
        instagram: 'https://instagram.com/sgcpdy',
        youtube: 'https://youtube.com/@sgcpdy',
        linkedin: 'https://linkedin.com/school/sgcpdy',
      },
    },
  })

  // ─── Navigation (problem statement structure) ───
  console.log('  → Navigation')
  await payload.updateGlobal({
    slug: 'navigation',
    data: {
      items: [
        { label: 'Home', link: '/' },
        {
          label: 'About', link: '/about',
          children: [
            { label: 'About SGC', link: '/about' },
            { label: 'Vision & Mission', link: '/about/vision-mission' },
            { label: 'Administration', link: '/about/administration' },
            { label: 'Affiliation & Recognition', link: '/about/affiliation' },
            { label: 'Annual Reports', link: '/about/annual-reports' },
            { label: 'Institutional Development Plan', link: '/about/institutional-development-plan' },
          ],
        },
        {
          label: 'Academics', link: '/academics',
          children: [
            { label: 'Departments', link: '/dept' },
            { label: 'UG Programmes', link: '/academics/ug-programmes' },
            { label: 'PG Programmes', link: '/academics/pg-programmes' },
            { label: 'Add On Course', link: '/academics/add-on-course' },
            { label: 'Roles & Responsibility', link: '/academics/roles-responsibility' },
            { label: 'Academic Collaboration', link: '/academics/academic-collaboration' },
            { label: 'Library', link: '/academics/library' },
            { label: 'Academic Calendar', link: '/academics/calendar' },
          ],
        },
        {
          label: 'Admissions', link: '/admissions',
          children: [
            { label: 'Admission Guidelines', link: '/admissions' },
            { label: 'Apply Online', link: '/admissions/apply' },
            { label: 'Fee Structure', link: '/admissions/fees' },
            { label: 'Prospectus', link: '/admissions/prospectus' },
          ],
        },
        {
          label: 'Research', link: '/research',
          children: [
            { label: 'Centre for Research', link: '/research' },
            { label: 'Research Fund', link: '/research/fund' },
            { label: 'Publications', link: '/research/publications' },
            { label: 'Innovation & Startups', link: '/research/innovation' },
          ],
        },
        {
          label: 'Campus Life', link: '/campus-life',
          children: [
            { label: 'Amenities', link: '/campus-life/amenities' },
          ],
        },
        {
          label: 'Student Support', link: '/student-support',
          children: [
            { label: 'Clubs & Centres', link: '/student-support/clubs' },
            { label: 'NCC & NSS', link: '/student-support/ncc-nss' },
            { label: 'Sports', link: '/student-support/sports' },
          ],
        },
        {
          label: 'Accreditation', link: '/accreditation',
          children: [
            { label: 'NAAC', link: '/accreditation/naac' },
            { label: 'IQAC', link: '/accreditation/iqac' },
            { label: 'AICTE', link: '/accreditation/aicte' },
            { label: 'NIRF', link: '/accreditation/nirf' },
            { label: 'ISO', link: '/accreditation/iso' },
          ],
        },
        {
          label: 'Examination', link: '/examination',
          children: [
            { label: 'Examination Schedules', link: '/examination/schedule' },
            { label: 'Results', link: '/examination/results' },
            { label: 'Revaluation', link: '/examination/revaluation' },
          ],
        },
        {
          label: 'Placements', link: '/placements',
          children: [
            { label: 'Overview', link: '/placements' },
            { label: 'For Students', link: '/placements/students' },
            { label: 'For Recruiters', link: '/placements/recruiters' },
            { label: 'Alumni', link: '/placements/alumni' },
          ],
        },
        { label: 'Scholarship', link: '/#scholarships' },
        { label: 'Gallery', link: '/gallery' },
        { label: 'Contact', link: '/contact' },
      ],
    },
  })

  // ─── Footer ───
  console.log('  → Footer')
  await payload.updateGlobal({
    slug: 'footer',
    data: {
      columns: [
        {
          title: 'Quick Links',
          links: [
            { label: 'About SGC', href: '/about' },
            { label: 'Admissions', href: '/admissions' },
            { label: 'Departments', href: '/dept' },
            { label: 'Faculty', href: '/faculty' },
            { label: 'Research', href: '/research' },
            { label: 'Placements', href: '/placements' },
          ],
        },
        {
          title: 'Academics',
          links: [
            { label: 'UG Programmes', href: '/academics/ug-programmes' },
            { label: 'PG Programmes', href: '/academics/pg-programmes' },
            { label: 'Library', href: '/academics/library' },
            { label: 'Academic Calendar', href: '/academics/calendar' },
            { label: 'Examination', href: '/examination' },
          ],
        },
        {
          title: 'Resources',
          links: [
            { label: 'NAAC', href: '/accreditation/naac' },
            { label: 'IQAC', href: '/accreditation/iqac' },
            { label: 'NIRF', href: '/accreditation/nirf' },
            { label: 'Gallery', href: '/gallery' },
            { label: 'Alumni', href: '/alumni' },
            { label: 'Contact Us', href: '/contact' },
          ],
        },
      ],
      newsletterHeading: 'Stay Updated',
      newsletterDescription: 'Subscribe to receive news, events, and admission updates.',
      copyright: '© {year} Saradha Gangadharan College. All rights reserved.',
    },
  })

  // ─── Homepage as CMS Page ───
  console.log('  → Homepage')

  // Check if homepage already exists
  const { docs: existingHome } = await payload.find({
    collection: 'pages',
    where: { slug: { equals: 'home' } },
    limit: 1,
  })

  const homepageData = {
    title: 'Home',
    slug: 'home',
    status: 'published',
    layout: [
      {
        blockType: 'flash-news',
        items: [
          { text: '📢 Admissions Open for 2026-27 Academic Year — Apply Now!', link: '/admissions/apply' },
          { text: '🏆 SGC awarded NAAC A+ Grade — Read More', link: '/accreditation/naac' },
          { text: '📅 End Semester Examinations commence from April 15, 2026', link: '/examination/schedule' },
          { text: '🎓 Convocation 2026 — Register for Graduation Ceremony', link: '/events' },
        ],
      },
      {
        blockType: 'hero',
        slides: [],
      },
      {
        blockType: 'promo-banner',
        banners: [
          { title: 'Admissions Open 2026–27', subtitle: 'Apply now for UG & PG programmes. Limited seats available.', cta: 'Apply Now', href: '/admissions/apply', color: 'primary' },
          { title: 'Merit Scholarships Available', subtitle: 'Up to 100% tuition fee waiver for toppers. Check eligibility.', cta: 'Learn More', href: '/admissions/scholarships', color: 'gold' },
          { title: 'iTechnova 2026 — Register Now', subtitle: 'Annual tech fest. Hackathons, workshops, cash prizes worth ₹2,00,000.', cta: 'Register', href: '/campus-life/events/itechnova', color: 'accent' },
        ],
      },
      {
        blockType: 'quick-access',
        buttons: [
          { label: 'Apply Online', description: 'Start your application', href: '/admissions/apply', icon: 'FileText', color: 'primary' },
          { label: 'Pay Fees', description: 'Online fee payment', href: '/admissions/fees', icon: 'CreditCard', color: 'accent' },
          { label: 'Download Prospectus', description: 'View our prospectus', href: '/admissions/prospectus', icon: 'Download', color: 'primary' },
          { label: 'Exam Results', description: 'Check your results', href: '/examination/results', icon: 'GraduationCap', color: 'accent' },
        ],
      },
      {
        blockType: 'about',
        heading: 'Excellence in Education Since 2010',
        description: 'Saradha Gangadharan College has been a beacon of quality education in Puducherry, offering a diverse range of undergraduate and postgraduate programmes. Our commitment to academic excellence, research, and holistic development has made us one of the most sought-after institutions in the region.\n\nWith a state-of-the-art campus, dedicated faculty, and a vibrant student community, SGC provides an environment that nurtures talent, encourages innovation, and prepares students for the challenges of the modern world.',
        chairmanName: 'Shri. Swaminathan G',
        chairmanTitle: 'Founder & Chairman',
        chairmanOrg: 'Sri Saradha Gangadharan Educational Trust',
        chairmanQuote: 'Education is the most powerful weapon which you can use to change the world. At SGC, we are committed to providing an education that transforms lives and builds a better tomorrow.',
      },
      {
        blockType: 'stats',
        items: [
          { label: 'Courses Offered', value: 13, suffix: '+' },
          { label: 'Expert Faculty', value: 79, suffix: '+' },
          { label: 'Students', value: 1245, suffix: '+' },
          { label: 'Placements', value: 1000, suffix: '+' },
        ],
      },
      {
        blockType: 'programmes',
        title: 'Academic Excellence Across Disciplines',
        subtitle: 'Explore our diverse range of undergraduate and postgraduate programmes designed to prepare you for a successful career.',
        departments: [
          { name: 'B.A English (Honours)', type: 'UG', fees: '₹16,000', icon: 'BookOpen' },
          { name: 'B.Com (Honours)', type: 'UG', fees: '₹28,000', icon: 'BarChart3' },
          { name: 'B.B.A (Honours)', type: 'UG', fees: '₹28,000', icon: 'Briefcase' },
          { name: 'B.Com Corporate Secretaryship', type: 'UG', fees: '₹28,000', icon: 'Scale' },
          { name: 'B.Sc Physics (Honours)', type: 'UG', fees: '₹16,000', icon: 'Atom' },
          { name: 'B.Sc Mathematics (Honours)', type: 'UG', fees: '₹16,000', icon: 'Calculator' },
          { name: 'B.Sc Computer Science (Honours)', type: 'UG', fees: '₹24,000', icon: 'Monitor' },
          { name: 'B.C.A (Honours)', type: 'UG', fees: '₹24,000', icon: 'Laptop' },
          { name: 'B.Sc IT (Honours)', type: 'UG', fees: '₹24,000', icon: 'Globe' },
          { name: 'M.A English', type: 'PG', fees: '₹16,000', icon: 'BookOpen' },
          { name: 'M.Com', type: 'PG', fees: '₹22,000', icon: 'BarChart3' },
          { name: 'M.Sc Mathematics', type: 'PG', fees: '₹16,000', icon: 'Calculator' },
          { name: 'M.Sc Computer Science', type: 'PG', fees: '₹22,000', icon: 'Monitor' },
        ],
      },
      {
        blockType: 'scholarship',
        title: 'Scholarships & Financial Aid',
        description: 'We believe financial constraints should never be a barrier to quality education.',
        items: [
          { name: 'Merit Scholarship', amount: 'Up to 100% tuition fee', eligibility: '90%+ in qualifying exam' },
          { name: 'SC/ST Scholarship', amount: 'Full fee + stipend', eligibility: 'Government of Puducherry scheme' },
          { name: 'Sports Quota', amount: '50% tuition fee', eligibility: 'State/National level players' },
          { name: 'EWS Scholarship', amount: '75% tuition fee', eligibility: 'Family income below ₹8 LPA' },
        ],
        ctaLabel: 'View All Scholarships',
        ctaLink: '/admissions/scholarships',
      },
      {
        blockType: 'announcements',
        title: 'Announcements & Notices',
        items: [
          { title: 'End Semester Examination Schedule — April 2026', date: '2026-03-28', category: 'Examination', href: '/examination/schedule', isNew: true },
          { title: 'Last Date to Pay Tuition Fees — 10th April 2026', date: '2026-03-26', category: 'Fees', href: '/admissions/fees', isNew: true },
          { title: 'UG/PG Admission Open for 2026–27 Academic Year', date: '2026-03-22', category: 'Admission', href: '/admissions/apply', isNew: true },
          { title: 'NAAC Peer Team Visit — 15th to 17th April 2026', date: '2026-03-20', category: 'Accreditation', href: '/accreditation/naac', isNew: false },
          { title: 'Revised Academic Calendar 2025–26 (Even Semester)', date: '2026-03-18', category: 'Academic', href: '/academics/calendar', isNew: false },
          { title: 'Results: Internal Assessment — March 2026', date: '2026-03-15', category: 'Examination', href: '/examination/results', isNew: false },
        ],
      },
      {
        blockType: 'news-events',
        title: 'Latest News & Events',
        events: [
          { title: 'Annual Orientation Programme 2026', date: '2026-03-28', category: 'Academic', description: 'Welcome session for newly admitted students across all departments.' },
          { title: 'National Science Day Celebration', date: '2026-02-28', category: 'Event', description: 'Special lectures and exhibitions on the theme of Science & Innovation.' },
          { title: 'iTechnova 2026 — Tech Fest', date: '2026-03-15', category: 'Festival', description: 'Annual technology festival featuring hackathons, workshops, and competitions.' },
          { title: 'NSS Special Camp', date: '2026-03-10', category: 'Service', description: 'Seven-day residential camp focusing on community development and social awareness.' },
        ],
        news: [
          { title: 'SGC Awarded NAAC A+ Grade', date: '2026-03-20', excerpt: 'Saradha Gangadharan College has been awarded A+ grade by the National Assessment and Accreditation Council.' },
          { title: 'MoU Signed with Leading IT Companies', date: '2026-03-18', excerpt: 'The college signed MoUs with three major IT companies for internship and placement opportunities.' },
          { title: 'Faculty Publication in International Journal', date: '2026-03-15', excerpt: 'Dr. Ramesh Kumar from the Computer Science department published a paper in IEEE Transactions.' },
          { title: 'Blood Donation Camp Organized', date: '2026-03-12', excerpt: 'Red Cross Youth Club organized a blood donation camp with over 200 donors participating.' },
        ],
      },
      {
        blockType: 'activity-feed',
        items: [
          { title: 'Workshop on AI & Machine Learning', date: '2026-03-29', type: 'Workshop', department: 'Computer Science', description: 'Department of Computer Science conducted a two-day workshop in collaboration with IIT Madras.' },
          { title: 'Inter-College Basketball Tournament — Champions!', date: '2026-03-27', type: 'Sports', department: 'Physical Education', description: 'SGC Men\'s Basketball team won the Pondicherry University Inter-College Championship.' },
          { title: 'Guest Lecture: Digital Marketing Trends', date: '2026-03-25', type: 'Seminar', department: 'Commerce', description: 'Mr. Rajesh Kumar, CMO of Zoho Corp, delivered a guest lecture for BBA and B.Com students.' },
          { title: 'NSS Blood Donation Camp — 200+ Donors', date: '2026-03-23', type: 'Service', department: 'NSS', description: 'Red Cross Youth Club organized a mega blood donation camp with participation from all departments.' },
          { title: 'MoU Signing with Infosys Springboard', date: '2026-03-21', type: 'Collaboration', department: 'Placement Cell', description: 'SGC signed an MoU with Infosys Springboard for industry-ready certification programs.' },
        ],
      },
      {
        blockType: 'why-join',
        title: 'Why Choose SGC?',
        reasons: [
          { icon: 'Award', heading: 'NAAC A+ Accredited', description: 'Recognized for excellence in education by the National Assessment and Accreditation Council.' },
          { icon: 'Users', heading: 'Expert Faculty', description: '79+ highly qualified faculty members dedicated to nurturing talent and academic growth.' },
          { icon: 'Briefcase', heading: '1000+ Placements', description: 'Strong placement record with top recruiters from IT, Banking, and Management sectors.' },
          { icon: 'BookOpen', heading: '13+ Programmes', description: 'Diverse UG and PG programmes across Science, Arts, Commerce, and Technology.' },
          { icon: 'Building', heading: 'Modern Campus', description: 'State-of-the-art infrastructure with smart classrooms, labs, and library facilities.' },
          { icon: 'Heart', heading: 'Holistic Development', description: 'NCC, NSS, sports, clubs, and cultural activities for all-round student growth.' },
        ],
      },
      {
        blockType: 'placements',
        title: 'Placement Highlights',
        stats: [
          { label: 'Management', percentage: 88 },
          { label: 'Banking & Finance', percentage: 80 },
          { label: 'IT & Software', percentage: 92 },
          { label: 'Higher Studies', percentage: 76 },
        ],
      },
      {
        blockType: 'recruiter-logos',
        title: 'Our Recruiters',
        companies: [
          { name: 'TCS' }, { name: 'Infosys' }, { name: 'Wipro' }, { name: 'HCL Technologies' }, { name: 'Cognizant' },
          { name: 'Accenture' }, { name: 'Capgemini' }, { name: 'Tech Mahindra' }, { name: 'Zoho' }, { name: 'Freshworks' },
          { name: 'L&T Infotech' }, { name: 'Mphasis' }, { name: 'HDFC Bank' }, { name: 'ICICI Bank' }, { name: 'Axis Bank' },
          { name: 'Deloitte' }, { name: 'EY' }, { name: 'KPMG' }, { name: 'Amazon' }, { name: 'Flipkart' },
        ],
      },
      {
        blockType: 'testimonials',
        title: 'What Our Students Say',
        items: [
          { name: 'Priya Sharma', batch: '2020-2023', quote: 'SGC provided me with the perfect launchpad for my career. The faculty support and placement cell were instrumental in helping me land my dream job at TCS.' },
          { name: 'Rahul Kumar', batch: '2019-2022', quote: 'The holistic approach to education at SGC helped me grow not just academically but as a well-rounded individual. The campus life is vibrant and enriching.' },
          { name: 'Anita Devi', batch: '2021-2024', quote: 'From day one, the professors at SGC went above and beyond to ensure we understood concepts thoroughly. The practical exposure was invaluable.' },
        ],
      },
      {
        blockType: 'compliance-links',
        title: 'Important Links & Compliance',
        links: [
          { label: 'IQAC', href: '/accreditation/iqac', icon: 'ClipboardCheck' },
          { label: 'NAAC', href: '/accreditation/naac', icon: 'Award' },
          { label: 'NIRF', href: '/accreditation/nirf', icon: 'BarChart3' },
          { label: 'RTI', href: '/rti', icon: 'FileText' },
          { label: 'Anti-Ragging', href: '/anti-ragging', icon: 'Shield' },
          { label: 'Grievance', href: '/grievance', icon: 'MessageCircle' },
          { label: 'ICC / POSH', href: '/icc', icon: 'Users' },
          { label: 'Mandatory Disclosure', href: '/disclosure', icon: 'FileCheck' },
          { label: 'AICTE', href: '/accreditation/aicte', icon: 'Building' },
          { label: 'Exam Results', href: '/examination/results', icon: 'GraduationCap' },
          { label: 'Student Feedback', href: '/feedback', icon: 'MessageSquare' },
          { label: 'Downloads', href: '/downloads', icon: 'Download' },
        ],
      },
      {
        blockType: 'cta',
        heading: 'Ready to Begin Your Journey?',
        description: 'Join thousands of successful alumni who started their career at SGC. Applications are now open for the 2026-27 academic year.',
        buttonLabel: 'Apply Now',
        buttonLink: '/admissions/apply',
        phone: '+91-413-2211800',
      },
    ],
  }

  if (existingHome.length > 0) {
    await payload.update({
      collection: 'pages',
      id: existingHome[0].id,
      data: homepageData as any,
    })
  } else {
    await payload.create({
      collection: 'pages',
      data: homepageData as any,
    })
  }

  console.log('✅ Seeding complete!')
  process.exit(0)
}

seed().catch((err) => {
  console.error('❌ Seeding failed:', err)
  process.exit(1)
})
