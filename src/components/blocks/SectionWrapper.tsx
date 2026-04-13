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

const bgClasses: Record<string, string> = {
  white: 'bg-white',
  light: 'bg-[#f8f6f0]',
  dark: 'bg-gradient-to-br from-[#1e3a5f] to-[#15294a] text-white',
  gradient: 'bg-gradient-to-b from-[#f8f6f0] to-white',
  transparent: '',
}

const paddingClasses: Record<string, string> = {
  none: '',
  small: 'py-8',
  normal: 'py-16',
  large: 'py-24',
}

export default function SectionWrapper({ settings, children }: Props) {
  if (!settings || settings.bg === 'transparent') return <>{children}</>

  const bg = bgClasses[settings.bg || 'transparent'] || ''
  const pad = paddingClasses[settings.pad || 'none'] || ''
  const borderT = settings.bt ? 'border-t border-gray-200' : ''
  const borderB = settings.bb ? 'border-b border-gray-200' : ''

  if (!bg && !pad && !borderT && !borderB) return <>{children}</>

  return <div className={cn(bg, pad, borderT, borderB)}>{children}</div>
}
