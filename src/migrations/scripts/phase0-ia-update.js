// Phase 0: Add UGC Guidelines, ARIIA, Gallery to navigation.
// Idempotent: fetches current nav, splices new items if not already present, PUTs back.
const BASE = 'http://localhost:3000'
const SOURCE = 'https://sgc.edu.in/assets/docs'

const UGC_SUB_SUB = [
  { label: 'IDP Guidelines for HEIs', link: `${SOURCE}/Guidelines for IDP for HEIs.pdf`, openInNewTab: true },
  { label: 'SEDG Equitable Opportunity Guidelines', link: `${SOURCE}/Guidelines to provide Equitable opportunity for SEDGs in HEIs.pdf`, openInNewTab: true },
  { label: 'Accessibility Guidelines for HEIs', link: `${SOURCE}/Accessibility-Guidelines and standards for HEIs.pdf`, openInNewTab: true },
  { label: 'R&D Cell Establishment Guidelines', link: `${SOURCE}/Guidelines for Establishment of Research and Development Cell.pdf`, openInNewTab: true },
  { label: 'Public Self-Disclosure Guidelines', link: `${SOURCE}/GUIDELINES-ON-PUBLIC-SELF-DISCLOSURE-BY-HIGHER-EDUCATION-INSTITUTIONS.pdf`, openInNewTab: true },
  { label: 'UGC Regulations Undertaking', link: `${SOURCE}/UGC Regulations Undertaking.pdf`, openInNewTab: true },
]

const ARIIA_SUB_SUB = [
  { label: 'ARIIA 2021 Report', link: `${SOURCE}/ARI-C-6576-Report.pdf`, openInNewTab: true },
  { label: 'ARIIA 2022 Report', link: `${SOURCE}/ARIIA _ Report_2022.pdf`, openInNewTab: true },
]

async function main() {
  const loginRes = await fetch(`${BASE}/api/users/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email: 'admin@sgc.edu.in', password: 'admin123' }),
  })
  const { token } = await loginRes.json()
  console.log('✓ logged in')

  const navRes = await fetch(`${BASE}/api/globals/navigation?depth=3`, {
    headers: { Authorization: `JWT ${token}` },
  })
  const nav = await navRes.json()
  const items = nav.items || []

  // (a) Accreditation: add UGC Guidelines if missing, add ARIIA under NIRF
  const accred = items.find((i) => i.label === 'Accreditation')
  if (!accred) throw new Error('Accreditation menu not found')
  accred.children = accred.children || []

  // Add ARIIA under NIRF
  const nirf = accred.children.find((c) => c.label === 'NIRF')
  if (nirf) {
    nirf.subItems = nirf.subItems || []
    if (!nirf.subItems.some((s) => s.label === 'ARIIA 2021 Report')) {
      nirf.subItems.push(...ARIIA_SUB_SUB)
      console.log('  + ARIIA sub-sub added under NIRF')
    } else {
      console.log('  = ARIIA already present, skipping')
    }
  }

  // Add UGC Guidelines as new sub
  if (!accred.children.some((c) => c.label === 'UGC Guidelines')) {
    accred.children.push({
      label: 'UGC Guidelines',
      link: '/accreditation/ugc',
      openInNewTab: false,
      subItems: UGC_SUB_SUB,
    })
    console.log('  + UGC Guidelines sub added (with 6 PDFs)')
  } else {
    console.log('  = UGC Guidelines already present')
  }

  // (b) Student Life: add Gallery
  const studentLife = items.find((i) => i.label === 'Student Life')
  if (!studentLife) throw new Error('Student Life menu not found')
  studentLife.children = studentLife.children || []
  if (!studentLife.children.some((c) => c.label === 'Gallery')) {
    studentLife.children.push({
      label: 'Gallery',
      link: '/gallery',
      openInNewTab: false,
    })
    console.log('  + Gallery sub added under Student Life')
  } else {
    console.log('  = Gallery already present')
  }

  // PUT
  const putRes = await fetch(`${BASE}/api/globals/navigation`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Authorization: `JWT ${token}` },
    body: JSON.stringify({ items }),
  })
  if (!putRes.ok) throw new Error('PUT failed: ' + (await putRes.text()))
  console.log('✓ navigation updated')

  // Summary
  let top = 0, sub = 0, subSub = 0
  for (const i of items) {
    top++
    for (const c of i.children || []) {
      sub++
      for (const _g of c.subItems || []) subSub++
    }
  }
  console.log(`Counts → top: ${top}  sub: ${sub}  sub-sub: ${subSub}`)
}

main().catch((e) => { console.error('ERROR:', e.message); process.exit(1) })
