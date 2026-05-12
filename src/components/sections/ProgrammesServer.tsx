import { getPayload } from 'payload'
import config from '@payload-config'
import ProgrammesSection from './ProgrammesSection'

type Props = {
  title?: string
  subtitle?: string
  typeFilter?: 'all' | 'UG' | 'PG' | 'Add-on'
  limit?: number
}

type CourseDoc = {
  name: string
  type: 'UG' | 'PG' | 'Add-on'
  fees?: string | null
  icon?: string | null
}

export default async function ProgrammesServer({ title, subtitle, typeFilter = 'all', limit = 24 }: Props) {
  const payload = await getPayload({ config })

  const result = await payload.find({
    collection: 'courses',
    where: typeFilter === 'all' ? undefined : { type: { equals: typeFilter } },
    sort: 'type',
    limit,
  })

  const departments = (result.docs as unknown as CourseDoc[]).map((c) => ({
    name: c.name,
    type: c.type,
    fees: c.fees || '',
    icon: c.icon || 'BookOpen',
  }))

  return <ProgrammesSection title={title} subtitle={subtitle} departments={departments} />
}
