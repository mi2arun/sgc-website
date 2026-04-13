import { notFound } from 'next/navigation'
import { getPayload } from 'payload'
import config from '@payload-config'
import Link from 'next/link'
import type { Metadata } from 'next'
import RichText from '@/components/RichText'

type Args = { params: Promise<{ slug: string }> }

export default async function FacultyProfilePage({ params }: Args) {
  const { slug } = await params
  const payload = await getPayload({ config })
  const { docs } = await payload.find({
    collection: 'faculty',
    where: { slug: { equals: slug }, visible: { equals: true } },
    limit: 1,
    depth: 2,
  })

  const faculty = docs[0]
  if (!faculty) notFound()

  const photoUrl = faculty.photo && typeof faculty.photo === 'object' ? (faculty.photo as any).url : null
  const deptName = faculty.department && typeof faculty.department === 'object' ? (faculty.department as any).name : null
  const deptSlug = faculty.department && typeof faculty.department === 'object' ? (faculty.department as any).slug : null

  return (
    <section className="py-16 bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row gap-8 mb-12">
          {/* Photo */}
          <div className="shrink-0">
            <div className="w-48 h-48 rounded-2xl overflow-hidden bg-primary/5">
              {photoUrl ? (
                <img src={photoUrl} alt={faculty.name} className="w-full h-full object-cover" />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-5xl font-bold text-primary/20">
                  {faculty.name.charAt(0)}
                </div>
              )}
            </div>
          </div>

          {/* Info */}
          <div className="flex-1">
            <h1 className="text-3xl font-bold text-primary mb-2">{faculty.name}</h1>
            {faculty.designation && <p className="text-lg text-muted mb-1">{faculty.designation}</p>}
            {faculty.qualifications && <p className="text-sm text-accent font-medium mb-4">{faculty.qualifications}</p>}

            <div className="space-y-2 text-sm text-muted">
              {deptName && (
                <p>Department: {deptSlug ? (
                  <Link href={`/dept/${deptSlug}`} className="text-primary hover:text-accent transition-colors font-medium">{deptName}</Link>
                ) : deptName}</p>
              )}
              {faculty.specialization && <p>Specialization: <span className="text-foreground">{faculty.specialization}</span></p>}
              {faculty.email && <p>Email: <a href={`mailto:${faculty.email}`} className="text-primary hover:text-accent transition-colors">{faculty.email}</a></p>}
              {faculty.phone && <p>Phone: <a href={`tel:${faculty.phone}`} className="text-primary hover:text-accent transition-colors">{faculty.phone}</a></p>}
            </div>
          </div>
        </div>

        {/* Bio */}
        {faculty.bio && (
          <div className="mb-12">
            <h2 className="text-xl font-bold text-primary mb-4">About</h2>
            <RichText content={faculty.bio} />
          </div>
        )}

        {/* Publications */}
        {faculty.publications && (
          <div>
            <h2 className="text-xl font-bold text-primary mb-4">Publications</h2>
            <RichText content={faculty.publications} />
          </div>
        )}
      </div>
    </section>
  )
}

export async function generateMetadata({ params }: Args): Promise<Metadata> {
  const { slug } = await params
  const payload = await getPayload({ config })
  const { docs } = await payload.find({
    collection: 'faculty',
    where: { slug: { equals: slug }, visible: { equals: true } },
    limit: 1,
  })
  const faculty = docs[0]
  if (!faculty) return {}
  return { title: `${faculty.name} | Faculty`, description: faculty.designation as string }
}
