import { getPayload } from 'payload'
import config from '@payload-config'
import { NextResponse } from 'next/server'
import https from 'https'
import http from 'http'
import { Readable } from 'stream'

// Download image from URL and return as Buffer
async function downloadImage(url: string): Promise<{ buffer: Buffer; contentType: string }> {
  return new Promise((resolve, reject) => {
    const client = url.startsWith('https') ? https : http
    client.get(url, (res) => {
      if (res.statusCode === 301 || res.statusCode === 302) {
        downloadImage(res.headers.location!).then(resolve).catch(reject)
        return
      }
      const chunks: Buffer[] = []
      res.on('data', (chunk) => chunks.push(chunk))
      res.on('end', () => resolve({
        buffer: Buffer.concat(chunks),
        contentType: res.headers['content-type'] || 'image/jpeg',
      }))
      res.on('error', reject)
    }).on('error', reject)
  })
}

// Upload an image to Payload Media from URL
async function uploadImage(payload: any, url: string, alt: string) {
  try {
    const { buffer, contentType } = await downloadImage(url)
    const ext = contentType.includes('png') ? 'png' : 'jpg'
    const filename = `${alt.toLowerCase().replace(/[^a-z0-9]+/g, '-')}.${ext}`

    const file = {
      data: buffer,
      mimetype: contentType,
      name: filename,
      size: buffer.length,
    }

    const media = await payload.create({
      collection: 'media',
      data: { alt },
      file,
    })
    return media
  } catch (err) {
    console.error(`Failed to upload image: ${alt}`, err)
    return null
  }
}

// Helper to create a page if it doesn't exist
async function createPage(payload: any, data: any) {
  const { docs } = await payload.find({
    collection: 'pages',
    where: { slug: { equals: data.slug } },
    limit: 1,
  })
  if (docs.length > 0) {
    return payload.update({ collection: 'pages', id: docs[0].id, data })
  }
  return payload.create({ collection: 'pages', data })
}

export async function POST() {
  try {
    const payload = await getPayload({ config })
    const results: string[] = []

    // ─── Upload Hero Images ───
    results.push('Uploading hero images...')
    const heroImages = await Promise.all([
      uploadImage(payload, 'https://images.unsplash.com/photo-1562774053-701939374585?w=1920&h=1080&fit=crop&q=80', 'SGC Campus Main Building'),
      uploadImage(payload, 'https://images.unsplash.com/photo-1523050854058-8df90110c476?w=1920&h=1080&fit=crop&q=80', 'SGC Campus Aerial View'),
      uploadImage(payload, 'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=1920&h=1080&fit=crop&q=80', 'SGC Students on Campus'),
    ])

    // ─── Upload Chairman Photo ───
    results.push('Uploading chairman photo...')
    const chairmanPhoto = await uploadImage(payload, 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&h=400&fit=crop&q=80', 'Shri Swaminathan G - Chairman')

    // ─── Upload Faculty Photos ───
    results.push('Uploading faculty photos...')
    const facultyPhotos = await Promise.all([
      uploadImage(payload, 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&q=80', 'Dr Ramesh Kumar'),
      uploadImage(payload, 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop&q=80', 'Dr Priya Venkatesh'),
      uploadImage(payload, 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&q=80', 'Prof Suresh Babu'),
      uploadImage(payload, 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop&q=80', 'Dr Lakshmi Narayanan'),
    ])

    // ─── Upload Gallery Images ───
    results.push('Uploading gallery images...')
    const galleryImages = await Promise.all([
      uploadImage(payload, 'https://images.unsplash.com/photo-1523580494863-6f3031224c94?w=800&h=600&fit=crop&q=80', 'Campus Event'),
      uploadImage(payload, 'https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?w=800&h=600&fit=crop&q=80', 'Classroom Session'),
      uploadImage(payload, 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&h=600&fit=crop&q=80', 'College Function'),
      uploadImage(payload, 'https://images.unsplash.com/photo-1559027615-cd4628902d4a?w=800&h=600&fit=crop&q=80', 'Sports Day'),
      uploadImage(payload, 'https://images.unsplash.com/photo-1504384764586-bb4cdc1707b0?w=800&h=600&fit=crop&q=80', 'Tech Fest'),
      uploadImage(payload, 'https://images.unsplash.com/photo-1532094349884-543bc11b234d?w=800&h=600&fit=crop&q=80', 'Science Lab'),
    ])

    // ─── Upload Testimonial Photos ───
    results.push('Uploading testimonial photos...')
    const testimonialPhotos = await Promise.all([
      uploadImage(payload, 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=300&h=300&fit=crop&q=80', 'Priya Sharma'),
      uploadImage(payload, 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=300&fit=crop&q=80', 'Rahul Kumar'),
      uploadImage(payload, 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=300&h=300&fit=crop&q=80', 'Anita Devi'),
    ])

    // ─── Update Homepage with Hero Slides ───
    results.push('Updating homepage with hero images...')
    const { docs: homePages } = await payload.find({
      collection: 'pages',
      where: { slug: { equals: 'home' } },
      limit: 1,
    })

    if (homePages.length > 0) {
      const homePage = homePages[0]
      const layout = (homePage.layout as any[]) || []
      const updatedLayout = layout.map((block: any) => {
        if (block.blockType === 'hero') {
          return {
            ...block,
            slides: heroImages.filter(Boolean).map((img, i) => ({
              image: img!.id,
              ctaLabel: ['Explore Programmes', 'Apply Now', 'Campus Life'][i],
              ctaLink: ['/academics', '/admissions/apply', '/campus-life'][i],
            })),
          }
        }
        if (block.blockType === 'about' && chairmanPhoto) {
          return { ...block, chairmanPhoto: chairmanPhoto.id }
        }
        if (block.blockType === 'testimonials') {
          const items = (block.items || []).map((item: any, i: number) => ({
            ...item,
            photo: testimonialPhotos[i]?.id || null,
          }))
          return { ...block, items }
        }
        return block
      })

      await payload.update({
        collection: 'pages',
        id: homePage.id,
        data: { layout: updatedLayout } as any,
      })
    }

    // ─── Create Departments ───
    results.push('Creating departments...')
    const deptData = [
      { name: 'Department of Computer Science', shortName: 'CS', slug: 'computer-science', hodName: 'Dr. Ramesh Kumar', hodDesig: 'Associate Professor & HOD', hodPhoto: facultyPhotos[0] },
      { name: 'Department of Commerce', shortName: 'COM', slug: 'commerce', hodName: 'Dr. Priya Venkatesh', hodDesig: 'Associate Professor & HOD', hodPhoto: facultyPhotos[1] },
      { name: 'Department of Business Administration', shortName: 'BBA', slug: 'business-administration', hodName: 'Prof. Suresh Babu', hodDesig: 'Assistant Professor & HOD', hodPhoto: facultyPhotos[2] },
      { name: 'Department of Mathematics', shortName: 'MATH', slug: 'mathematics', hodName: 'Dr. Lakshmi Narayanan', hodDesig: 'Associate Professor & HOD', hodPhoto: facultyPhotos[3] },
      { name: 'Department of English', shortName: 'ENG', slug: 'english' },
      { name: 'Department of Physics', shortName: 'PHY', slug: 'physics' },
    ]

    const createdDepts: any[] = []
    for (const dept of deptData) {
      const { docs } = await payload.find({ collection: 'departments', where: { slug: { equals: dept.slug } }, limit: 1 })
      if (docs.length > 0) {
        createdDepts.push(docs[0])
        continue
      }
      const created = await payload.create({
        collection: 'departments',
        data: {
          name: dept.name,
          slug: dept.slug,
          shortName: dept.shortName,
          status: 'published',
          hod: dept.hodName ? {
            name: dept.hodName,
            designation: dept.hodDesig,
            photo: dept.hodPhoto?.id || null,
          } : undefined,
        },
      })
      createdDepts.push(created)
    }

    // ─── Create Faculty ───
    results.push('Creating faculty...')
    const facultyData = [
      { name: 'Dr. Ramesh Kumar', slug: 'ramesh-kumar', designation: 'Associate Professor & HOD', qualifications: 'M.Sc, M.Phil, Ph.D (Computer Science)', department: createdDepts[0]?.id, photo: facultyPhotos[0], specialization: 'Artificial Intelligence & Machine Learning', email: 'ramesh@sgc.edu.in', order: 1 },
      { name: 'Dr. Priya Venkatesh', slug: 'priya-venkatesh', designation: 'Associate Professor & HOD', qualifications: 'M.Com, M.Phil, Ph.D (Commerce)', department: createdDepts[1]?.id, photo: facultyPhotos[1], specialization: 'Financial Management', email: 'priya@sgc.edu.in', order: 1 },
      { name: 'Prof. Suresh Babu', slug: 'suresh-babu', designation: 'Assistant Professor & HOD', qualifications: 'MBA, M.Phil, NET', department: createdDepts[2]?.id, photo: facultyPhotos[2], specialization: 'Marketing Management', email: 'suresh@sgc.edu.in', order: 1 },
      { name: 'Dr. Lakshmi Narayanan', slug: 'lakshmi-narayanan', designation: 'Associate Professor & HOD', qualifications: 'M.Sc, M.Phil, Ph.D (Mathematics)', department: createdDepts[3]?.id, photo: facultyPhotos[3], specialization: 'Number Theory', email: 'lakshmi@sgc.edu.in', order: 1 },
    ]

    for (const f of facultyData) {
      const { docs } = await payload.find({ collection: 'faculty', where: { slug: { equals: f.slug } }, limit: 1 })
      if (docs.length > 0) continue
      await payload.create({
        collection: 'faculty',
        data: { ...f, visible: true, photo: f.photo?.id || null },
      })
    }

    // ─── Create Courses ───
    results.push('Creating courses...')
    const courseData = [
      { name: 'B.Sc Computer Science (Honours)', type: 'UG', fees: '₹24,000', duration: '3 Years', department: createdDepts[0]?.id, icon: 'Monitor' },
      { name: 'B.C.A (Honours)', type: 'UG', fees: '₹24,000', duration: '3 Years', department: createdDepts[0]?.id, icon: 'Laptop' },
      { name: 'M.Sc Computer Science', type: 'PG', fees: '₹22,000', duration: '2 Years', department: createdDepts[0]?.id, icon: 'Monitor' },
      { name: 'B.Com (Honours)', type: 'UG', fees: '₹28,000', duration: '3 Years', department: createdDepts[1]?.id, icon: 'BarChart3' },
      { name: 'M.Com', type: 'PG', fees: '₹22,000', duration: '2 Years', department: createdDepts[1]?.id, icon: 'BarChart3' },
      { name: 'B.B.A (Honours)', type: 'UG', fees: '₹28,000', duration: '3 Years', department: createdDepts[2]?.id, icon: 'Briefcase' },
      { name: 'B.Sc Mathematics (Honours)', type: 'UG', fees: '₹16,000', duration: '3 Years', department: createdDepts[3]?.id, icon: 'Calculator' },
      { name: 'M.Sc Mathematics', type: 'PG', fees: '₹16,000', duration: '2 Years', department: createdDepts[3]?.id, icon: 'Calculator' },
      { name: 'B.A English (Honours)', type: 'UG', fees: '₹16,000', duration: '3 Years', department: createdDepts[4]?.id, icon: 'BookOpen' },
      { name: 'M.A English', type: 'PG', fees: '₹16,000', duration: '2 Years', department: createdDepts[4]?.id, icon: 'BookOpen' },
      { name: 'B.Sc Physics (Honours)', type: 'UG', fees: '₹16,000', duration: '3 Years', department: createdDepts[5]?.id, icon: 'Atom' },
      { name: 'B.Sc IT (Honours)', type: 'UG', fees: '₹24,000', duration: '3 Years', department: createdDepts[0]?.id, icon: 'Globe' },
      { name: 'B.Com Corporate Secretaryship', type: 'UG', fees: '₹28,000', duration: '3 Years', department: createdDepts[1]?.id, icon: 'Scale' },
    ]

    for (const c of courseData) {
      const { docs } = await payload.find({ collection: 'courses', where: { name: { equals: c.name } }, limit: 1 })
      if (docs.length > 0) continue
      await payload.create({ collection: 'courses', data: c })
    }

    // ─── Create Gallery Albums ───
    results.push('Creating gallery albums...')
    const validGalleryImages = galleryImages.filter(Boolean)
    const galleryAlbums = [
      { title: 'Campus Life', slug: 'campus-life', category: 'Campus', description: 'A glimpse into everyday life at SGC campus.', images: validGalleryImages.slice(0, 3).map(img => ({ image: img!.id })) },
      { title: 'Annual Day 2026', slug: 'annual-day-2026', category: 'Events', description: 'Highlights from the Annual Day celebrations.', images: validGalleryImages.slice(3, 6).map(img => ({ image: img!.id })) },
    ]

    for (const album of galleryAlbums) {
      const { docs } = await payload.find({ collection: 'gallery', where: { slug: { equals: album.slug } }, limit: 1 })
      if (docs.length > 0) continue
      await payload.create({ collection: 'gallery', data: { ...album, date: '2026-03-15' } })
    }

    // ─── Create News Articles ───
    results.push('Creating news articles...')
    const newsData = [
      { title: 'SGC Awarded NAAC A+ Grade', slug: 'sgc-naac-a-plus', date: '2026-03-20', category: 'Achievement', featured: true, excerpt: 'Saradha Gangadharan College has been awarded A+ grade by the National Assessment and Accreditation Council.', status: 'published', image: validGalleryImages[0]?.id },
      { title: 'MoU Signed with Leading IT Companies', slug: 'mou-it-companies', date: '2026-03-18', category: 'Academic', featured: false, excerpt: 'The college signed MoUs with three major IT companies for internship and placement opportunities.', status: 'published', image: validGalleryImages[1]?.id },
      { title: 'Faculty Publication in International Journal', slug: 'faculty-publication-ieee', date: '2026-03-15', category: 'Achievement', featured: false, excerpt: 'Dr. Ramesh Kumar from the Computer Science department published a paper in IEEE Transactions.', status: 'published' },
      { title: 'Blood Donation Camp Organized', slug: 'blood-donation-camp', date: '2026-03-12', category: 'Event', featured: false, excerpt: 'Red Cross Youth Club organized a blood donation camp with over 200 donors participating.', status: 'published', image: validGalleryImages[3]?.id },
    ]

    for (const n of newsData) {
      const { docs } = await payload.find({ collection: 'news', where: { slug: { equals: n.slug } }, limit: 1 })
      if (docs.length > 0) continue
      await payload.create({
        collection: 'news',
        data: {
          ...n,
          content: { root: { type: 'root', children: [{ type: 'paragraph', children: [{ type: 'text', text: n.excerpt, version: 1 }], version: 1 }], direction: null, format: '', indent: 0, version: 1 } },
        },
      })
    }

    // ─── Create Events ───
    results.push('Creating events...')
    const eventsData = [
      { title: 'Annual Orientation Programme 2026', slug: 'orientation-2026', date: '2026-03-28', category: 'Academic', venue: 'Main Auditorium', status: 'published' },
      { title: 'iTechnova 2026 — Tech Fest', slug: 'itechnova-2026', date: '2026-03-15', category: 'Festival', venue: 'CS Block', status: 'published' },
      { title: 'NSS Special Camp', slug: 'nss-camp-2026', date: '2026-03-10', category: 'Service', venue: 'Adopted Village', status: 'published' },
    ]

    for (const e of eventsData) {
      const { docs } = await payload.find({ collection: 'events', where: { slug: { equals: e.slug } }, limit: 1 })
      if (docs.length > 0) continue
      await payload.create({
        collection: 'events',
        data: {
          ...e,
          description: { root: { type: 'root', children: [{ type: 'paragraph', children: [{ type: 'text', text: `Details about ${e.title}.`, version: 1 }], version: 1 }], direction: null, format: '', indent: 0, version: 1 } },
        },
      })
    }

    // ─── Create Inner Pages ───
    results.push('Creating inner pages...')

    await createPage(payload, {
      title: 'About SGC', slug: 'about', status: 'published',
      layout: [
        { blockType: 'about', heading: 'Excellence in Education Since 2010',
          description: 'Saradha Gangadharan College (SGC) was established in 2010 under the aegis of Sri Saradha Gangadharan Educational Trust. The college is affiliated to Pondicherry University and is accredited by NAAC with A+ grade.\n\nLocated in the heart of Puducherry, SGC has grown to become one of the premier institutions in the region, offering a wide range of undergraduate and postgraduate programmes across Science, Arts, Commerce, and Technology.\n\nOur commitment to academic excellence, industry-relevant curriculum, and holistic development has resulted in consistently high placement records and academic achievements.',
          chairmanName: 'Shri. Swaminathan G', chairmanTitle: 'Founder & Chairman', chairmanOrg: 'Sri Saradha Gangadharan Educational Trust',
          chairmanQuote: 'Education is the most powerful weapon which you can use to change the world. At SGC, we are committed to providing an education that transforms lives and builds a better tomorrow.',
          chairmanPhoto: chairmanPhoto?.id || null,
        },
        { blockType: 'stats', items: [
          { label: 'Courses Offered', value: 13, suffix: '+' },
          { label: 'Expert Faculty', value: 79, suffix: '+' },
          { label: 'Students', value: 1245, suffix: '+' },
          { label: 'Placements', value: 1000, suffix: '+' },
        ]},
        { blockType: 'why-join', title: 'Why Choose SGC?', reasons: [
          { icon: 'Award', heading: 'NAAC A+ Accredited', description: 'Recognized for excellence in education by NAAC.' },
          { icon: 'Users', heading: 'Expert Faculty', description: '79+ highly qualified faculty members.' },
          { icon: 'Briefcase', heading: '1000+ Placements', description: 'Strong placement record with top recruiters.' },
          { icon: 'BookOpen', heading: '13+ Programmes', description: 'Diverse UG and PG programmes.' },
        ]},
        { blockType: 'cta', heading: 'Want to Know More?', description: 'Get in touch with us to learn more about SGC.', buttonLabel: 'Contact Us', buttonLink: '/contact', phone: '+91-413-2211800' },
      ],
    })

    await createPage(payload, {
      title: 'Vision & Mission', slug: 'about/vision-mission', status: 'published',
      layout: [
        { blockType: 'rich-text', content: { root: { type: 'root', children: [
          { type: 'heading', tag: 'h2', children: [{ type: 'text', text: 'Our Vision', version: 1 }], version: 1 },
          { type: 'paragraph', children: [{ type: 'text', text: 'To be a centre of excellence in higher education, fostering innovation, research, and holistic development, producing graduates who are globally competent and socially responsible.', version: 1 }], version: 1 },
          { type: 'heading', tag: 'h2', children: [{ type: 'text', text: 'Our Mission', version: 1 }], version: 1 },
          { type: 'paragraph', children: [{ type: 'text', text: 'To provide quality education through innovative teaching-learning methods, to promote research and entrepreneurship, to nurture ethical values and social responsibility, and to create industry-ready professionals through skill development and placement support.', version: 1 }], version: 1 },
        ], direction: null, format: '', indent: 0, version: 1 }}},
      ],
    })

    await createPage(payload, {
      title: 'Contact Us', slug: 'contact', status: 'published',
      layout: [
        { blockType: 'rich-text', content: { root: { type: 'root', children: [
          { type: 'heading', tag: 'h2', children: [{ type: 'text', text: 'Get in Touch', version: 1 }], version: 1 },
          { type: 'paragraph', children: [{ type: 'text', text: 'We\'d love to hear from you. Reach out to us for admissions, general enquiries, or campus visits.', version: 1 }], version: 1 },
          { type: 'heading', tag: 'h3', children: [{ type: 'text', text: 'Address', version: 1 }], version: 1 },
          { type: 'paragraph', children: [{ type: 'text', text: 'Saradha Gangadharan College, Lake Road, Velrampet, Puducherry — 605 004, India', version: 1 }], version: 1 },
          { type: 'heading', tag: 'h3', children: [{ type: 'text', text: 'Phone', version: 1 }], version: 1 },
          { type: 'paragraph', children: [{ type: 'text', text: '+91-413-2211800', version: 1 }], version: 1 },
          { type: 'heading', tag: 'h3', children: [{ type: 'text', text: 'Email', version: 1 }], version: 1 },
          { type: 'paragraph', children: [{ type: 'text', text: 'info@sgc.edu.in', version: 1 }], version: 1 },
        ], direction: null, format: '', indent: 0, version: 1 }}},
        { blockType: 'cta', heading: 'Visit Our Campus', description: 'Experience SGC firsthand. Schedule a campus tour today.', buttonLabel: 'Get Directions', buttonLink: 'https://maps.google.com/?q=Saradha+Gangadharan+College+Puducherry' },
      ],
    })

    await createPage(payload, {
      title: 'Admissions', slug: 'admissions', status: 'published',
      layout: [
        { blockType: 'rich-text', content: { root: { type: 'root', children: [
          { type: 'heading', tag: 'h2', children: [{ type: 'text', text: 'Admissions 2026-27', version: 1 }], version: 1 },
          { type: 'paragraph', children: [{ type: 'text', text: 'Applications are now open for the 2026-27 academic year. SGC offers admission to 9 UG and 4 PG programmes across multiple disciplines.', version: 1 }], version: 1 },
          { type: 'heading', tag: 'h3', children: [{ type: 'text', text: 'Eligibility', version: 1 }], version: 1 },
          { type: 'paragraph', children: [{ type: 'text', text: 'UG Programmes: 10+2 or equivalent with minimum 50% marks. PG Programmes: Relevant UG degree with minimum 50-55% marks depending on the programme.', version: 1 }], version: 1 },
          { type: 'heading', tag: 'h3', children: [{ type: 'text', text: 'How to Apply', version: 1 }], version: 1 },
          { type: 'paragraph', children: [{ type: 'text', text: '1. Visit application.sgc.edu.in\n2. Register and fill in the application form\n3. Upload required documents\n4. Pay the application fee online\n5. Download the acknowledgement', version: 1 }], version: 1 },
        ], direction: null, format: '', indent: 0, version: 1 }}},
        { blockType: 'quick-access', buttons: [
          { label: 'Apply Online', description: 'Start your application', href: '/admissions/apply', icon: 'FileText', color: 'primary' },
          { label: 'Fee Structure', description: 'View fees by programme', href: '/admissions/fees', icon: 'CreditCard', color: 'accent' },
          { label: 'Download Prospectus', description: 'Get the 2026-27 prospectus', href: '/admissions/prospectus', icon: 'Download', color: 'primary' },
        ]},
        { blockType: 'scholarship', title: 'Scholarships & Financial Aid',
          description: 'We believe financial constraints should never be a barrier to quality education.',
          items: [
            { name: 'Merit Scholarship', amount: 'Up to 100% tuition fee', eligibility: '90%+ in qualifying exam' },
            { name: 'SC/ST Scholarship', amount: 'Full fee + stipend', eligibility: 'Government of Puducherry scheme' },
            { name: 'Sports Quota', amount: '50% tuition fee', eligibility: 'State/National level players' },
            { name: 'EWS Scholarship', amount: '75% tuition fee', eligibility: 'Family income below ₹8 LPA' },
          ],
          ctaLabel: 'Enquire About Scholarships', ctaLink: '/contact',
        },
        { blockType: 'cta', heading: 'Ready to Apply?', description: 'Join the SGC family. Applications close soon.', buttonLabel: 'Apply Now', buttonLink: '/admissions/apply', phone: '+91-413-2211800' },
      ],
    })

    await createPage(payload, {
      title: 'Placements', slug: 'placements', status: 'published',
      layout: [
        { blockType: 'placements', title: 'Placement Highlights', stats: [
          { label: 'Management', percentage: 88 },
          { label: 'Banking & Finance', percentage: 80 },
          { label: 'IT & Software', percentage: 92 },
          { label: 'Higher Studies', percentage: 76 },
        ]},
        { blockType: 'recruiter-logos', title: 'Our Recruiters', companies: [
          { name: 'TCS' }, { name: 'Infosys' }, { name: 'Wipro' }, { name: 'HCL Technologies' }, { name: 'Cognizant' },
          { name: 'Accenture' }, { name: 'Capgemini' }, { name: 'Tech Mahindra' }, { name: 'Zoho' }, { name: 'Freshworks' },
          { name: 'HDFC Bank' }, { name: 'ICICI Bank' }, { name: 'Deloitte' }, { name: 'EY' }, { name: 'KPMG' },
          { name: 'Amazon' }, { name: 'Flipkart' },
        ]},
        { blockType: 'cta', heading: 'For Recruiters', description: 'Partner with SGC for your recruitment needs. Our students are industry-ready.', buttonLabel: 'Contact Placement Cell', buttonLink: '/contact' },
      ],
    })

    results.push('✅ All seeding complete!')
    return NextResponse.json({ success: true, results })
  } catch (error: any) {
    console.error('Seed error:', error)
    return NextResponse.json({ success: false, error: error.message, stack: error.stack }, { status: 500 })
  }
}
