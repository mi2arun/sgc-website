import Link from 'next/link'
import { ExternalLink, GraduationCap, CreditCard, FileText, BookOpen, Monitor, Globe } from 'lucide-react'
import { cn } from '@/lib/utils'

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  ExternalLink, GraduationCap, CreditCard, FileText, BookOpen, Monitor, Globe,
}

const colorMap: Record<string, { bg: string; hover: string; icon: string }> = {
  primary: { bg: 'bg-primary/5', hover: 'hover:bg-primary hover:text-white', icon: 'text-primary' },
  accent: { bg: 'bg-accent/10', hover: 'hover:bg-accent hover:text-primary-dark', icon: 'text-accent' },
  dark: { bg: 'bg-gray-100', hover: 'hover:bg-gray-800 hover:text-white', icon: 'text-gray-700' },
}

type Portal = {
  name: string
  description?: string
  url: string
  icon?: string
  color?: string
}

type Props = {
  title?: string
  subtitle?: string
  portals?: Portal[]
}

export default function PortalsSection({ title, subtitle, portals }: Props) {
  const items = portals || []
  if (items.length === 0) return null

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <h2 className="text-2xl md:text-3xl font-bold text-primary mb-3">{title || 'Quick Links & Portals'}</h2>
          {subtitle && <p className="text-muted max-w-2xl mx-auto">{subtitle}</p>}
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {items.map((portal, i) => {
            const Icon = iconMap[portal.icon || 'ExternalLink'] || ExternalLink
            const colors = colorMap[portal.color || 'primary'] || colorMap.primary
            return (
              <a key={i} href={portal.url} target="_blank" rel="noopener noreferrer"
                className={cn(
                  'group flex items-start gap-4 rounded-xl p-5 border border-border/50 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg',
                  colors.hover
                )}>
                <div className={cn('w-12 h-12 rounded-lg flex items-center justify-center shrink-0 transition-colors', colors.bg, 'group-hover:bg-white/20')}>
                  <Icon className={cn('w-6 h-6 transition-colors', colors.icon, 'group-hover:text-inherit')} />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-sm mb-0.5">{portal.name}</h3>
                  {portal.description && <p className="text-xs opacity-70">{portal.description}</p>}
                </div>
                <ExternalLink className="w-4 h-4 opacity-40 group-hover:opacity-70 shrink-0 mt-1" />
              </a>
            )
          })}
        </div>
      </div>
    </section>
  )
}
