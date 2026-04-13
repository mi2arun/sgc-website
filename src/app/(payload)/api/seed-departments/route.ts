import { getPayload } from 'payload'
import config from '@payload-config'
import { NextResponse } from 'next/server'
import https from 'https'
import http from 'http'

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
      res.on('end', () => resolve({ buffer: Buffer.concat(chunks), contentType: res.headers['content-type'] || 'image/jpeg' }))
      res.on('error', reject)
    }).on('error', reject)
  })
}

async function uploadImage(payload: any, url: string, alt: string) {
  try {
    // Check if already uploaded
    const { docs } = await payload.find({ collection: 'media', where: { alt: { equals: alt } }, limit: 1 })
    if (docs.length > 0) return docs[0]

    const { buffer, contentType } = await downloadImage(url)
    const ext = contentType.includes('png') ? 'png' : 'jpg'
    const filename = `${alt.toLowerCase().replace(/[^a-z0-9]+/g, '-').slice(0, 50)}.${ext}`
    return await payload.create({
      collection: 'media',
      data: { alt },
      file: { data: buffer, mimetype: contentType, name: filename, size: buffer.length },
    })
  } catch (err) {
    console.error(`Failed: ${alt}`, err)
    return null
  }
}

async function findOrCreateDept(payload: any, data: any) {
  const { docs } = await payload.find({ collection: 'departments', where: { slug: { equals: data.slug } }, limit: 1 })
  if (docs.length > 0) {
    return payload.update({ collection: 'departments', id: docs[0].id, data })
  }
  return payload.create({ collection: 'departments', data })
}

async function findOrCreateFaculty(payload: any, data: any) {
  const { docs } = await payload.find({ collection: 'faculty', where: { slug: { equals: data.slug } }, limit: 1 })
  if (docs.length > 0) {
    return payload.update({ collection: 'faculty', id: docs[0].id, data })
  }
  return payload.create({ collection: 'faculty', data })
}

// Diverse Unsplash portrait photos for faculty
const MALE_PHOTOS = [
  'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&h=400&fit=crop&q=80',
  'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&q=80',
  'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&q=80',
  'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=400&h=400&fit=crop&q=80',
  'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop&q=80',
  'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&h=400&fit=crop&q=80',
  'https://images.unsplash.com/photo-1463453091185-61582044d556?w=400&h=400&fit=crop&q=80',
]

const FEMALE_PHOTOS = [
  'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop&q=80',
  'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop&q=80',
  'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&h=400&fit=crop&q=80',
  'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&h=400&fit=crop&q=80',
  'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=400&h=400&fit=crop&q=80',
  'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&h=400&fit=crop&q=80',
]

const DEPT_BANNERS = [
  'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=1200&h=400&fit=crop&q=80', // CS
  'https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=1200&h=400&fit=crop&q=80', // Commerce
  'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=1200&h=400&fit=crop&q=80', // BBA
  'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=1200&h=400&fit=crop&q=80', // Math
  'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=1200&h=400&fit=crop&q=80', // English
  'https://images.unsplash.com/photo-1636466497217-26a8cbeaf0aa?w=1200&h=400&fit=crop&q=80', // Physics
  'https://images.unsplash.com/photo-1532094349884-543bc11b234d?w=1200&h=400&fit=crop&q=80', // IT
]

export async function POST() {
  try {
    const payload = await getPayload({ config })
    const log: string[] = []

    // ─── Department definitions with faculty ───
    const departments = [
      {
        name: 'Department of Computer Science', shortName: 'CS', slug: 'computer-science',
        bannerIdx: 0,
        hod: { name: 'Dr. Ramesh Kumar', designation: 'Associate Professor & HOD', gender: 'M', photoIdx: 0 },
        faculty: [
          { name: 'Dr. Ramesh Kumar', slug: 'ramesh-kumar', designation: 'Associate Professor & HOD', qualifications: 'M.Sc, M.Phil, Ph.D (Computer Science)', specialization: 'Artificial Intelligence & Machine Learning', email: 'ramesh@sgc.edu.in', gender: 'M', photoIdx: 0, order: 1 },
          { name: 'Prof. Karthik Selvam', slug: 'karthik-selvam', designation: 'Assistant Professor', qualifications: 'M.Sc, M.Phil, NET', specialization: 'Data Science & Big Data Analytics', email: 'karthik@sgc.edu.in', gender: 'M', photoIdx: 1, order: 2 },
          { name: 'Dr. Meena Kumari', slug: 'meena-kumari', designation: 'Assistant Professor', qualifications: 'MCA, M.Phil, Ph.D', specialization: 'Cloud Computing & IoT', email: 'meena@sgc.edu.in', gender: 'F', photoIdx: 0, order: 3 },
          { name: 'Prof. Arun Prasad', slug: 'arun-prasad', designation: 'Assistant Professor', qualifications: 'M.Sc, NET, SET', specialization: 'Cyber Security', email: 'arun.p@sgc.edu.in', gender: 'M', photoIdx: 2, order: 4 },
          { name: 'Ms. Divya Lakshmi', slug: 'divya-lakshmi', designation: 'Assistant Professor', qualifications: 'M.Sc, M.Phil', specialization: 'Web Technologies', email: 'divya@sgc.edu.in', gender: 'F', photoIdx: 1, order: 5 },
        ],
      },
      {
        name: 'Department of Commerce', shortName: 'COM', slug: 'commerce',
        bannerIdx: 1,
        hod: { name: 'Dr. Priya Venkatesh', designation: 'Associate Professor & HOD', gender: 'F', photoIdx: 2 },
        faculty: [
          { name: 'Dr. Priya Venkatesh', slug: 'priya-venkatesh', designation: 'Associate Professor & HOD', qualifications: 'M.Com, M.Phil, Ph.D', specialization: 'Financial Management & Accounting', email: 'priya@sgc.edu.in', gender: 'F', photoIdx: 2, order: 1 },
          { name: 'Prof. Ganesh Murthy', slug: 'ganesh-murthy', designation: 'Assistant Professor', qualifications: 'M.Com, MBA, NET', specialization: 'Taxation & Auditing', email: 'ganesh@sgc.edu.in', gender: 'M', photoIdx: 3, order: 2 },
          { name: 'Dr. Saranya Devi', slug: 'saranya-devi', designation: 'Assistant Professor', qualifications: 'M.Com, M.Phil, Ph.D, NET', specialization: 'Corporate Finance', email: 'saranya@sgc.edu.in', gender: 'F', photoIdx: 3, order: 3 },
          { name: 'Prof. Vijay Kumar', slug: 'vijay-kumar-com', designation: 'Assistant Professor', qualifications: 'M.Com, M.Phil, SET', specialization: 'Banking & Insurance', email: 'vijay@sgc.edu.in', gender: 'M', photoIdx: 4, order: 4 },
        ],
      },
      {
        name: 'Department of Business Administration', shortName: 'BBA', slug: 'business-administration',
        bannerIdx: 2,
        hod: { name: 'Prof. Suresh Babu', designation: 'Assistant Professor & HOD', gender: 'M', photoIdx: 5 },
        faculty: [
          { name: 'Prof. Suresh Babu', slug: 'suresh-babu', designation: 'Assistant Professor & HOD', qualifications: 'MBA, M.Phil, NET', specialization: 'Marketing Management & Strategy', email: 'suresh@sgc.edu.in', gender: 'M', photoIdx: 5, order: 1 },
          { name: 'Dr. Kavitha Rajan', slug: 'kavitha-rajan', designation: 'Assistant Professor', qualifications: 'MBA, Ph.D', specialization: 'Human Resource Management', email: 'kavitha@sgc.edu.in', gender: 'F', photoIdx: 4, order: 2 },
          { name: 'Prof. Manoj Kumar', slug: 'manoj-kumar', designation: 'Assistant Professor', qualifications: 'MBA, NET', specialization: 'Operations & Supply Chain', email: 'manoj@sgc.edu.in', gender: 'M', photoIdx: 6, order: 3 },
        ],
      },
      {
        name: 'Department of Mathematics', shortName: 'MATH', slug: 'mathematics',
        bannerIdx: 3,
        hod: { name: 'Dr. Lakshmi Narayanan', designation: 'Associate Professor & HOD', gender: 'F', photoIdx: 5 },
        faculty: [
          { name: 'Dr. Lakshmi Narayanan', slug: 'lakshmi-narayanan', designation: 'Associate Professor & HOD', qualifications: 'M.Sc, M.Phil, Ph.D (Mathematics)', specialization: 'Number Theory & Algebra', email: 'lakshmi@sgc.edu.in', gender: 'F', photoIdx: 5, order: 1 },
          { name: 'Dr. Senthil Kumar', slug: 'senthil-kumar', designation: 'Assistant Professor', qualifications: 'M.Sc, Ph.D, NET', specialization: 'Differential Equations', email: 'senthil@sgc.edu.in', gender: 'M', photoIdx: 3, order: 2 },
          { name: 'Prof. Revathi S', slug: 'revathi-s', designation: 'Assistant Professor', qualifications: 'M.Sc, M.Phil, SET', specialization: 'Statistics & Probability', email: 'revathi@sgc.edu.in', gender: 'F', photoIdx: 1, order: 3 },
        ],
      },
      {
        name: 'Department of English', shortName: 'ENG', slug: 'english',
        bannerIdx: 4,
        hod: { name: 'Dr. Jayanthi Mohan', designation: 'Associate Professor & HOD', gender: 'F', photoIdx: 3 },
        faculty: [
          { name: 'Dr. Jayanthi Mohan', slug: 'jayanthi-mohan', designation: 'Associate Professor & HOD', qualifications: 'M.A, M.Phil, Ph.D (English)', specialization: 'Postcolonial Literature', email: 'jayanthi@sgc.edu.in', gender: 'F', photoIdx: 3, order: 1 },
          { name: 'Prof. Rajesh Pandian', slug: 'rajesh-pandian', designation: 'Assistant Professor', qualifications: 'M.A, M.Phil, NET', specialization: 'Linguistics & ELT', email: 'rajesh.p@sgc.edu.in', gender: 'M', photoIdx: 4, order: 2 },
          { name: 'Ms. Anitha Bai', slug: 'anitha-bai', designation: 'Assistant Professor', qualifications: 'M.A, M.Phil, SET', specialization: 'American Literature', email: 'anitha@sgc.edu.in', gender: 'F', photoIdx: 4, order: 3 },
        ],
      },
      {
        name: 'Department of Physics', shortName: 'PHY', slug: 'physics',
        bannerIdx: 5,
        hod: { name: 'Dr. Venkataraman S', designation: 'Associate Professor & HOD', gender: 'M', photoIdx: 6 },
        faculty: [
          { name: 'Dr. Venkataraman S', slug: 'venkataraman-s', designation: 'Associate Professor & HOD', qualifications: 'M.Sc, M.Phil, Ph.D (Physics)', specialization: 'Condensed Matter Physics', email: 'venkat@sgc.edu.in', gender: 'M', photoIdx: 6, order: 1 },
          { name: 'Prof. Nirmala Devi', slug: 'nirmala-devi', designation: 'Assistant Professor', qualifications: 'M.Sc, M.Phil, NET', specialization: 'Spectroscopy', email: 'nirmala@sgc.edu.in', gender: 'F', photoIdx: 0, order: 2 },
          { name: 'Dr. Balaji K', slug: 'balaji-k', designation: 'Assistant Professor', qualifications: 'M.Sc, Ph.D', specialization: 'Nuclear Physics', email: 'balaji@sgc.edu.in', gender: 'M', photoIdx: 5, order: 3 },
        ],
      },
      {
        name: 'Department of Information Technology', shortName: 'IT', slug: 'information-technology',
        bannerIdx: 6,
        hod: { name: 'Dr. Sathish Kumar', designation: 'Associate Professor & HOD', gender: 'M', photoIdx: 1 },
        faculty: [
          { name: 'Dr. Sathish Kumar', slug: 'sathish-kumar', designation: 'Associate Professor & HOD', qualifications: 'M.Sc, M.Phil, Ph.D (IT)', specialization: 'Network Security', email: 'sathish@sgc.edu.in', gender: 'M', photoIdx: 1, order: 1 },
          { name: 'Prof. Deepa M', slug: 'deepa-m', designation: 'Assistant Professor', qualifications: 'MCA, M.Phil, NET', specialization: 'Software Engineering', email: 'deepa@sgc.edu.in', gender: 'F', photoIdx: 2, order: 2 },
          { name: 'Prof. Vinoth R', slug: 'vinoth-r', designation: 'Assistant Professor', qualifications: 'M.Sc (IT), NET', specialization: 'Mobile App Development', email: 'vinoth@sgc.edu.in', gender: 'M', photoIdx: 2, order: 3 },
        ],
      },
    ]

    // ─── Upload all unique photos ───
    log.push('Uploading photos...')
    const malePhotoCache: Record<number, any> = {}
    const femalePhotoCache: Record<number, any> = {}
    const bannerCache: Record<number, any> = {}

    // Pre-upload all needed photos
    for (const dept of departments) {
      // Banner
      if (bannerCache[dept.bannerIdx] === undefined) {
        bannerCache[dept.bannerIdx] = await uploadImage(payload, DEPT_BANNERS[dept.bannerIdx], `${dept.shortName} Department Banner`)
      }
      // Faculty photos
      for (const f of dept.faculty) {
        const cache = f.gender === 'M' ? malePhotoCache : femalePhotoCache
        const photos = f.gender === 'M' ? MALE_PHOTOS : FEMALE_PHOTOS
        if (cache[f.photoIdx] === undefined) {
          cache[f.photoIdx] = await uploadImage(payload, photos[f.photoIdx], f.name)
        }
      }
    }
    log.push(`Photos uploaded: ${Object.keys(malePhotoCache).length + Object.keys(femalePhotoCache).length} faculty, ${Object.keys(bannerCache).length} banners`)

    // ─── Create departments and faculty ───
    for (const dept of departments) {
      log.push(`Creating ${dept.name}...`)

      const hodPhoto = dept.hod.gender === 'M' ? malePhotoCache[dept.hod.photoIdx] : femalePhotoCache[dept.hod.photoIdx]
      const banner = bannerCache[dept.bannerIdx]

      const createdDept = await findOrCreateDept(payload, {
        name: dept.name,
        slug: dept.slug,
        shortName: dept.shortName,
        status: 'published',
        bannerImage: banner?.id || null,
        hod: {
          name: dept.hod.name,
          designation: dept.hod.designation,
          photo: hodPhoto?.id || null,
        },
      })

      // Create faculty for this department
      for (const f of dept.faculty) {
        const photo = f.gender === 'M' ? malePhotoCache[f.photoIdx] : femalePhotoCache[f.photoIdx]
        await findOrCreateFaculty(payload, {
          name: f.name,
          slug: f.slug,
          designation: f.designation,
          qualifications: f.qualifications,
          specialization: f.specialization,
          email: f.email,
          department: createdDept.id,
          photo: photo?.id || null,
          order: f.order,
          visible: true,
        })
      }
      log.push(`  → ${dept.faculty.length} faculty created`)
    }

    log.push('✅ All departments and faculty seeded!')
    return NextResponse.json({ success: true, log })
  } catch (error: any) {
    console.error('Seed error:', error)
    return NextResponse.json({ success: false, error: error.message }, { status: 500 })
  }
}
