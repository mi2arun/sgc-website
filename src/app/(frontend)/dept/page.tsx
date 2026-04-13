import { getPayload } from 'payload'
import config from '@payload-config'
import Link from 'next/link'
import type { Metadata } from 'next'

export const metadata: Metadata = { title: 'Departments' }

export default async function DepartmentsPage() {
  const payload = await getPayload({ config })
  const { docs } = await payload.find({
    collection: 'departments',
    where: { status: { equals: 'published' } },
    limit: 20,
  })

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <p className="text-accent font-semibold text-sm tracking-widest uppercase mb-3">Academics</p>
          <h1 className="text-3xl md:text-4xl font-bold text-primary mb-4">Our Departments</h1>
          <p className="text-muted max-w-2xl mx-auto">Explore our departments offering quality education across multiple disciplines.</p>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {docs.map((dept: any) => (
            <Link key={dept.id} href={`/dept/${dept.slug}`}
              className="group bg-white rounded-xl border border-border/50 p-6 hover:bg-primary hover:border-primary hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
              <div className="flex items-start gap-4">
                <div className="w-14 h-14 bg-primary/5 rounded-xl flex items-center justify-center group-hover:bg-white/20 transition-colors shrink-0">
                  <span className="text-2xl font-bold text-primary group-hover:text-white transition-colors">
                    {(dept.shortName || dept.name.charAt(0)).slice(0, 3)}
                  </span>
                </div>
                <div>
                  <h2 className="text-lg font-semibold text-primary group-hover:text-white transition-colors">{dept.name}</h2>
                  {dept.hod?.name && (
                    <p className="text-sm text-muted group-hover:text-white/70 transition-colors mt-1">HOD: {dept.hod.name}</p>
                  )}
                </div>
              </div>
            </Link>
          ))}
        </div>
        {docs.length === 0 && <p className="text-center text-muted">No departments yet.</p>}
      </div>
    </section>
  )
}
