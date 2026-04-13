export const dynamic = "force-dynamic"
import { notFound } from 'next/navigation'
import { getPayload } from 'payload'
import config from '@payload-config'
import Link from 'next/link'
import type { Metadata } from 'next'
import RenderBlocks from '@/components/blocks/RenderBlocks'
import RichText from '@/components/RichText'

type Args = { params: Promise<{ slug: string }> }

export default async function DepartmentPage({ params }: Args) {
  const { slug } = await params
  const payload = await getPayload({ config })

  const { docs } = await payload.find({
    collection: 'departments',
    where: { slug: { equals: slug } },
    limit: 1,
  })

  const dept = docs[0]
  if (!dept) notFound()

  // Fetch faculty for this department
  const { docs: facultyDocs } = await payload.find({
    collection: 'faculty',
    where: {
      department: { equals: dept.id },
      visible: { equals: true },
    },
    sort: 'order',
    limit: 50,
  })

  // Fetch courses for this department
  const { docs: courseDocs } = await payload.find({
    collection: 'courses',
    where: { department: { equals: dept.id } },
    limit: 50,
  })

  const bannerUrl = dept.bannerImage && typeof dept.bannerImage === 'object' ? (dept.bannerImage as any).url : null

  return (
    <>
      {/* Department Hero */}
      <section className="relative bg-gradient-to-br from-primary to-primary-dark text-white py-20">
        {bannerUrl && (
          <div className="absolute inset-0">
            <img src={bannerUrl} alt={dept.name} className="w-full h-full object-cover opacity-20" />
          </div>
        )}
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-accent font-semibold text-sm tracking-widest uppercase mb-3">Department</p>
          <h1 className="text-3xl md:text-4xl font-bold mb-4">{dept.name}</h1>
          {dept.hod?.name && (
            <div className="flex items-center gap-4 mt-6">
              {dept.hod.photo && typeof dept.hod.photo === 'object' && (
                <div className="w-16 h-16 rounded-full overflow-hidden ring-2 ring-accent/50">
                  <img src={(dept.hod.photo as any).url} alt={dept.hod.name} className="w-full h-full object-cover" />
                </div>
              )}
              <div>
                <p className="font-semibold">{dept.hod.name}</p>
                <p className="text-white/60 text-sm">{dept.hod.designation || 'Head of Department'}</p>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* About Department */}
      {dept.description && (
        <section className="py-16 bg-white">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            <RichText content={dept.description} />
          </div>
        </section>
      )}

      {/* Courses */}
      {courseDocs.length > 0 && (
        <section className="py-16 bg-secondary">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl font-bold text-primary mb-8">Programmes Offered</h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {courseDocs.map((course: any) => (
                <div key={course.id} className="bg-white rounded-xl p-6 border border-border/50">
                  <span className="inline-block px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider bg-accent/10 text-accent rounded-full mb-2">
                    {course.type}
                  </span>
                  <h3 className="font-semibold text-primary text-sm mb-1">{course.name}</h3>
                  {course.fees && <p className="text-xs text-muted">{course.fees} / semester</p>}
                  {course.duration && <p className="text-xs text-muted">{course.duration}</p>}
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Faculty */}
      {facultyDocs.length > 0 && (
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl font-bold text-primary mb-8">Faculty</h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {facultyDocs.map((faculty: any) => {
                const photoUrl = faculty.photo && typeof faculty.photo === 'object' ? (faculty.photo as any).url : null
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
                  </Link>
                )
              })}
            </div>
          </div>
        </section>
      )}

      {/* Custom Blocks Layout */}
      {dept.layout && (dept.layout as any[]).length > 0 && (
        <RenderBlocks blocks={dept.layout as any[]} />
      )}
    </>
  )
}

export async function generateMetadata({ params }: Args): Promise<Metadata> {
  const { slug } = await params
  const payload = await getPayload({ config })
  const { docs } = await payload.find({
    collection: 'departments',
    where: { slug: { equals: slug } },
    limit: 1,
  })
  const dept = docs[0]
  if (!dept) return {}
  return { title: `${dept.name} | Department` }
}
