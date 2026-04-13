import { getPayload } from 'payload'
import config from '@payload-config'
import { NextResponse } from 'next/server'

async function createPage(payload: any, data: any) {
  const { docs } = await payload.find({
    collection: 'pages', where: { slug: { equals: data.slug } }, limit: 1,
  })
  if (docs.length > 0) {
    return payload.update({ collection: 'pages', id: docs[0].id, data })
  }
  return payload.create({ collection: 'pages', data })
}

// Helper to create rich text nodes
const h2 = (text: string) => ({ type: 'heading', tag: 'h2', children: [{ type: 'text', text, version: 1 }], version: 1 })
const h3 = (text: string) => ({ type: 'heading', tag: 'h3', children: [{ type: 'text', text, version: 1 }], version: 1 })
const p = (text: string) => ({ type: 'paragraph', children: [{ type: 'text', text, version: 1 }], version: 1 })
const bold = (text: string) => ({ type: 'text', text, format: 1, version: 1 })
const pBold = (label: string, value: string) => ({
  type: 'paragraph', children: [
    { type: 'text', text: label, format: 1, version: 1 },
    { type: 'text', text: ` ${value}`, version: 1 },
  ], version: 1,
})
const li = (text: string) => ({
  type: 'listitem', children: [{ type: 'text', text, version: 1 }], version: 1, value: 1,
})
const ul = (items: string[]) => ({
  type: 'list', listType: 'bullet', children: items.map(li), version: 1, tag: 'ul',
})
const hr = () => ({ type: 'horizontalrule', version: 1 })
const richText = (children: any[]) => ({
  root: { type: 'root', children, direction: null, format: '', indent: 0, version: 1 },
})

export async function POST() {
  try {
    const payload = await getPayload({ config })

    // ─── Research Centre Main Page ───
    await createPage(payload, {
      title: 'Centre for Research & Publications',
      slug: 'research',
      status: 'published',
      layout: [
        {
          blockType: 'rich-text',
          content: richText([
            h2('Centre for Research & Publications'),
            p('The Centre for Research and Publications (CRP) at SGC promotes a vibrant research culture among faculty and students. We support research activities through funding, incentives, and infrastructure to encourage innovation and scholarly output.'),
            hr(),
            h3('Our Mission'),
            ul([
              'Foster a culture of research and innovation across all departments',
              'Support faculty in publishing high-quality research in indexed journals',
              'Encourage interdisciplinary research collaborations',
              'Promote patent filing and intellectual property creation',
              'Facilitate funded research projects from national and international agencies',
            ]),
            hr(),
            h3('Research Highlights'),
            ul([
              '50+ publications in Scopus/Web of Science indexed journals',
              '₹25+ Lakhs in external research funding',
              '5 patents filed in the last 3 years',
              'Active MoUs with IIT Madras, NIT Puducherry, and industry partners',
              'Annual research symposium with 200+ participants',
            ]),
          ]),
        },
        {
          blockType: 'stats',
          items: [
            { label: 'Publications', value: 50, suffix: '+' },
            { label: 'Research Funding', value: 25, suffix: 'L+' },
            { label: 'Patents Filed', value: 5, suffix: '' },
            { label: 'Research Scholars', value: 12, suffix: '' },
          ],
        },
        {
          blockType: 'cta',
          heading: 'Research Incentive Scheme',
          description: 'SGC rewards faculty for research excellence. Explore our comprehensive incentive programme for publications, patents, conferences, and more.',
          buttonLabel: 'View Incentive Scheme',
          buttonLink: '/research/incentive-scheme',
        },
      ],
    })

    // ─── Research Incentive Scheme Page ───
    await createPage(payload, {
      title: 'Research Incentive Scheme (RIS)',
      slug: 'research/incentive-scheme',
      status: 'published',
      layout: [
        // Introduction
        {
          blockType: 'rich-text',
          content: richText([
            h2('Research Incentive Scheme (RIS)'),
            p('SGC aims to improve overall research performance and promote research activities undertaken by various departments and faculty members. The Research Incentive Scheme (RIS) provides the means to assist with research activities and reward staff for successful publication or presentation of research outputs.'),
          ]),
        },
        // Publication Incentives
        {
          blockType: 'rich-text',
          content: richText([
            h2('📄 Publication Incentives'),
            h3('International Publication — Original Article'),
            ul([
              'Scopus / Web of Science indexed journal: ₹2,000/-',
              'Other indexed journal: ₹1,000/-',
            ]),
            h3('National Publication — Original Article'),
            ul([
              'Scopus / Web of Science indexed journal: ₹1,000/-',
              'Other indexed journal: ₹600/-',
            ]),
          ]),
        },
        // Faculty Project Incentives
        {
          blockType: 'rich-text',
          content: richText([
            h2('🔬 Faculty Project Incentives'),
            p('For faculty members who secure external research funding from International, National, or State agencies:'),
            ul([
              'Paid Leave for Principal Investigator / Co-Investigator: Maximum 12 days per project per year',
              'Project Completion Incentive: 1% of total project value',
              'Eligible for projects funded by UGC, DST, CSIR, ICSSR, DBT, and other recognized agencies',
            ]),
          ]),
        },
        // Conference Incentives
        {
          blockType: 'rich-text',
          content: richText([
            h2('🎤 Conference Paper Presentation'),
            p('Faculty members who present papers or posters at conferences are eligible for reimbursement:'),
            ul([
              'Reimbursement: 50% of registration fees (capped at ₹2,000/- per year)',
              'Maximum one conference per academic year',
              'Must submit attendance certificate and original receipt',
              'Paper must be presented by the faculty member in person',
            ]),
          ]),
        },
        // Research Awards
        {
          blockType: 'rich-text',
          content: richText([
            h2('🏆 Research Awards & Recognition'),
            p('Faculty members who receive research awards from recognized bodies are rewarded:'),
            ul([
              'International Award: ₹10,000/- + Certificate of Appreciation',
              'National Award: ₹5,000/- + Certificate of Appreciation',
              'Regional/State Award: ₹2,000/- + Certificate of Appreciation',
            ]),
          ]),
        },
        // Seminar Organization
        {
          blockType: 'rich-text',
          content: richText([
            h2('📋 Seminar / Conference Organization'),
            p('Faculty or departments organizing academic events receive sponsorship support:'),
            ul([
              'International level event: ₹10,000/- sponsorship',
              'National / State level event: ₹5,000/- sponsorship',
              'Must be approved by the Centre for Research & Publications',
            ]),
          ]),
        },
        // Books & E-Content
        {
          blockType: 'rich-text',
          content: richText([
            h2('📚 Books, Chapters & E-Content'),
            h3('Published Books (Authored / Edited)'),
            ul([
              'International Publisher (Springer, Elsevier, etc.): Up to ₹10,000/-',
              'National Publisher: Up to ₹5,000/-',
            ]),
            h3('E-Content Development'),
            ul([
              'SWAYAM / NPTEL / MOOC course development: ₹5,000/- per course',
            ]),
          ]),
        },
        // Patent Incentives
        {
          blockType: 'rich-text',
          content: richText([
            h2('💡 Patent Incentives'),
            p('Faculty members who file and receive patents are rewarded:'),
            ul([
              'International Patent: Up to ₹25,000/-',
              'Indian Patent: Up to ₹10,000/-',
              'Incentive is paid upon grant of the patent',
            ]),
          ]),
        },
        // General Guidelines
        {
          blockType: 'rich-text',
          content: richText([
            h2('📌 General Guidelines'),
            ul([
              'All submissions must be routed through the respective HOD to the Centre for Research and Publications (CRP)',
              'Approval is merit-based and subject to verification of documents',
              'Individual or joint faculty/department submissions are accepted',
              'Applications must be submitted within 60 days from the commencement of the academic session',
              'The decision of the Research Committee is final',
              'Incentives are subject to availability of funds',
            ]),
          ]),
        },
        // Contact CTA
        {
          blockType: 'cta',
          heading: 'Apply for Research Incentives',
          description: 'Contact the Centre for Research & Publications to submit your application. Email: research@sgc.edu.in',
          buttonLabel: 'Contact CRP',
          buttonLink: '/contact',
          phone: '+91-413-2280156',
        },
      ],
    })

    // ─── Research Fund Page ───
    await createPage(payload, {
      title: 'SG Research Fund',
      slug: 'research/fund',
      status: 'published',
      layout: [
        {
          blockType: 'rich-text',
          content: richText([
            h2('SG Research Fund'),
            p('The SG Research Fund is an internal funding mechanism established by Sri Saradha Gangadharan Educational Trust to support faculty-initiated research projects. The fund aims to seed innovative research ideas and provide initial support for projects that can later attract external funding.'),
            hr(),
            h3('Funding Categories'),
            ul([
              'Minor Research Project: Up to ₹50,000/- (Duration: 1 year)',
              'Major Research Project: Up to ₹2,00,000/- (Duration: 2 years)',
              'Seed Grant for Young Researchers: Up to ₹25,000/- (Duration: 6 months)',
            ]),
            h3('Eligibility'),
            ul([
              'Full-time faculty members of SGC with minimum 2 years of service',
              'Young researcher grants open to faculty with less than 5 years of experience',
              'Preference given to interdisciplinary and socially relevant research',
              'Faculty must not have pending completion of any previous SG Research Fund project',
            ]),
            h3('Application Process'),
            ul([
              'Submit detailed research proposal to the Centre for Research & Publications',
              'Proposal reviewed by the Research Committee within 30 days',
              'Approved projects receive funding in two installments',
              'Final report and financial statement required upon completion',
            ]),
          ]),
        },
        {
          blockType: 'cta',
          heading: 'Submit Your Research Proposal',
          description: 'Have an innovative research idea? Apply for the SG Research Fund today.',
          buttonLabel: 'Download Application Form',
          buttonLink: '/downloads',
        },
      ],
    })

    return NextResponse.json({ success: true, message: 'Research pages created' })
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 })
  }
}
