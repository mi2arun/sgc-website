import { getPayload } from 'payload'
import config from '@payload-config'
import Link from 'next/link'

type Props = {
  title?: string
  department?: any
  limit?: number
}

export default async function FacultyGridServer({ title, department, limit = 12 }: Props) {
  const payload = await getPayload({ config })

  const where: any = { visible: { equals: true } }
  const deptId = typeof department === 'object' ? department?.id : department
  if (deptId) where.department = { equals: deptId }

  const { docs } = await payload.find({
    collection: 'faculty',
    where,
    sort: 'order',
    limit,
    depth: 1,
  })

  if (docs.length === 0) return null

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-2xl md:text-3xl font-bold text-primary mb-8">{title || 'Our Faculty'}</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {docs.map((faculty: any) => {
            const photoUrl = faculty.photo && typeof faculty.photo === 'object' ? faculty.photo.url : null
            const deptName = faculty.department && typeof faculty.department === 'object' ? faculty.department.name : null
            return (
              <Link key={faculty.id} href={`/faculty/${faculty.slug}`}
                className="group text-center bg-white rounded-xl border border-border/50 p-6 hover:shadow-lg hover:-translate-y-1 transition-all">
                <div className="w-24 h-24 mx-auto rounded-full overflow-hidden bg-primary/5 mb-4">
                  {photoUrl ? (
                    <img src={photoUrl} alt={faculty.name} className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-2xl font-bold text-primary/30">
                      {faculty.name.charAt(0)}
                    </div>
                  )}
                </div>
                <h3 className="font-semibold text-primary text-sm group-hover:text-primary-light transition-colors">{faculty.name}</h3>
                <p className="text-xs text-muted mt-1">{faculty.designation}</p>
                {faculty.qualifications && <p className="text-xs text-muted">{faculty.qualifications}</p>}
                {deptName && <p className="text-[11px] text-accent mt-1">{deptName}</p>}
              </Link>
            )
          })}
        </div>
      </div>
    </section>
  )
}
