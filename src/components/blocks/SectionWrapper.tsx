import { cn } from '@/lib/utils'

type StyleSettings = {
  bg?: string
  pad?: string
  bt?: boolean
  bb?: boolean
  fw?: boolean
}

type Props = {
  settings?: StyleSettings
  children: React.ReactNode
}

// Only these values actually add visual changes worth wrapping
const bgClasses: Record<string, string> = {
  light: 'bg-[#f8f6f0]',
  dark: 'bg-gradient-to-br from-[#1e3a5f] to-[#15294a] text-white',
  gradient: 'bg-gradient-to-b from-[#f8f6f0] to-white',
}

const paddingClasses: Record<string, string> = {
  small: 'py-8',
  large: 'py-24',
}

export default function SectionWrapper({ settings, children }: Props) {
  // No settings, or default values — just pass through
  if (!settings) return <>{children}</>

  const bg = bgClasses[settings.bg || ''] || ''
  const pad = paddingClasses[settings.pad || ''] || ''
  const borderT = settings.bt ? 'border-t border-gray-200' : ''
  const borderB = settings.bb ? 'border-b border-gray-200' : ''

  // Nothing to add — pass through
  if (!bg && !pad && !borderT && !borderB) return <>{children}</>

  return <div className={cn(bg, pad, borderT, borderB)}>{children}</div>
}
