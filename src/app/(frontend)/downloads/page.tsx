import { getPayload } from 'payload'
import config from '@payload-config'
import { FileText, Download } from 'lucide-react'
import type { Metadata } from 'next'

export const metadata: Metadata = { title: 'Downloads' }

const categoryLabels: Record<string, string> = {
  NAAC: 'NAAC Documents',
  IQAC: 'IQAC Reports & Minutes',
  NIRF: 'NIRF Rankings',
  AICTE: 'AICTE Documents',
  UGC: 'UGC Guidelines',
  ISO: 'ISO Certification',
  RTI: 'Right to Information',
  General: 'General Downloads',
}

const categoryOrder = ['NAAC', 'IQAC', 'NIRF', 'AICTE', 'UGC', 'ISO', 'RTI', 'General']

export default async function DownloadsPage() {
  const payload = await getPayload({ config })
  const { docs } = await payload.find({
    collection: 'documents',
    sort: 'order',
    limit: 100,
    depth: 1,
  })

  // Group by category
  const grouped: Record<string, any[]> = {}
  for (const doc of docs) {
    const cat = (doc.category as string) || 'General'
    if (!grouped[cat]) grouped[cat] = []
    grouped[cat].push(doc)
  }

  const sortedCategories = categoryOrder.filter(cat => grouped[cat])

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <p className="text-accent font-semibold text-sm tracking-widest uppercase mb-3">Resources</p>
          <h1 className="text-3xl md:text-4xl font-bold text-primary mb-4">Downloads</h1>
          <p className="text-muted max-w-2xl mx-auto">Access important documents, reports, and resources.</p>
        </div>

        {sortedCategories.length === 0 && (
          <p className="text-center text-muted">No documents available yet.</p>
        )}

        <div className="space-y-12">
          {sortedCategories.map((category) => (
            <div key={category}>
              <h2 className="text-xl font-bold text-primary mb-4 flex items-center gap-2">
                <FileText className="w-5 h-5 text-accent" />
                {categoryLabels[category] || category}
              </h2>
              <div className="grid gap-3">
                {grouped[category].map((doc: any) => {
                  const fileUrl = doc.file && typeof doc.file === 'object' ? doc.file.url : null
                  return (
                    <div key={doc.id} className="flex items-center justify-between bg-[#f8f6f0] rounded-lg px-5 py-4 border border-border/30 hover:border-accent/30 transition-colors">
                      <div className="flex-1 min-w-0">
                        <h3 className="font-medium text-foreground text-sm">{doc.title}</h3>
                        <div className="flex items-center gap-3 mt-1">
                          {doc.year && <span className="text-xs text-muted">{doc.year}</span>}
                          {doc.description && <span className="text-xs text-muted">{doc.description}</span>}
                        </div>
                      </div>
                      {fileUrl && (
                        <a href={fileUrl} target="_blank" rel="noopener noreferrer"
                          className="shrink-0 ml-4 flex items-center gap-1.5 bg-primary hover:bg-primary-light text-white text-xs font-medium px-4 py-2 rounded-lg transition-colors">
                          <Download className="w-3.5 h-3.5" />
                          Download
                        </a>
                      )}
                    </div>
                  )
                })}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
