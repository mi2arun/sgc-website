export const dynamic = "force-dynamic"
import { getPayload } from 'payload'
import config from '@payload-config'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import type { Metadata } from 'next'

export const metadata: Metadata = { title: 'Departments' }

const STOP = /^(of|and|the|for|in|&)$/i

// Initials from the department name: multi-word → first letter of each significant
// word (e.g. "Language Studies" → "LS"); single word → first three letters
// (e.g. "Library" → "LIB", "administration" → "ADM").
function initialsFromName(name: string): string {
  const cleaned = name.replace(/^department\s+(of|for)\s+/i, '').trim()
  const words = cleaned.split(/\s+/).filter((w) => w && !STOP.test(w))
  if (words.length >= 2) return words.map((w) => w[0]).join('').slice(0, 4).toUpperCase()
  return (words[0] || cleaned || name).slice(0, 3).toUpperCase()
}

// Badge text: use the CMS short code only when it's a genuine compact code (≤5 chars,
// no spaces) — shown in full, never truncated. Longer "codes" are really words
// (LANGUAGE, ADMINISTRATION, BCOMCS…), so fall back to clean initials from the name.
function deptCode(dept: { shortName?: string | null; name: string }): string {
  const sn = dept.shortName?.trim()
  if (sn && sn.length <= 5 && /^[A-Za-z0-9.&-]+$/.test(sn)) return sn.toUpperCase()
  return initialsFromName(dept.name)
}

// Font size scales down as the code gets longer so it always fits the square badge.
function codeSize(len: number): string {
  if (len <= 2) return 'text-2xl'
  if (len === 3) return 'text-xl'
  if (len === 4) return 'text-lg'
  return 'text-sm'
}

export default async function DepartmentsPage() {
  const payload = await getPayload({ config })
  const { docs } = await payload.find({
    collection: 'departments',
    limit: 100,
  })

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <p className="text-accent font-semibold text-sm tracking-widest uppercase mb-3">Academics</p>
          <h1 className="text-3xl md:text-4xl font-bold text-primary mb-4">Our Departments</h1>
          <p className="text-muted max-w-2xl mx-auto">Explore our departments offering quality education across multiple disciplines.</p>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {docs.map((dept: any) => {
            const code = deptCode(dept)
            return (
              <Link
                key={dept.id}
                href={`/dept/${dept.slug}`}
                className="group flex items-center gap-4 bg-white rounded-2xl border border-border/60 p-5 hover:border-primary hover:shadow-xl hover:shadow-primary/10 transition-all duration-300 hover:-translate-y-1"
              >
                <div className="shrink-0 w-16 h-16 rounded-xl bg-primary/[0.06] ring-1 ring-primary/10 flex items-center justify-center px-1.5 group-hover:bg-primary group-hover:ring-primary transition-colors duration-300">
                  <span className={`font-extrabold tracking-tight leading-none text-primary group-hover:text-white transition-colors ${codeSize(code.length)}`}>
                    {code}
                  </span>
                </div>

                <div className="min-w-0 flex-1">
                  <h2 className="text-base md:text-[1.05rem] font-semibold text-primary leading-snug line-clamp-2">
                    {dept.name}
                  </h2>
                  {dept.hod?.name && (
                    <p className="text-sm text-muted mt-1 truncate">HOD: {dept.hod.name}</p>
                  )}
                </div>

                <ArrowRight className="w-5 h-5 shrink-0 text-primary/30 group-hover:text-accent group-hover:translate-x-0.5 transition-all duration-300" />
              </Link>
            )
          })}
        </div>
        {docs.length === 0 && <p className="text-center text-muted">No departments yet.</p>}
      </div>
    </section>
  )
}
