import RichText from '@/components/RichText'
import { cn } from '@/lib/utils'

type Props = {
  left?: unknown
  right?: unknown
  ratio?: '50-50' | '60-40' | '40-60' | '70-30' | '30-70'
  valign?: 'top' | 'center' | 'bottom'
  gap?: 'tight' | 'normal' | 'wide'
  reverseOnMobile?: boolean
}

const ratioCols: Record<NonNullable<Props['ratio']>, [string, string]> = {
  '50-50': ['md:col-span-6', 'md:col-span-6'],
  '60-40': ['md:col-span-7', 'md:col-span-5'],
  '40-60': ['md:col-span-5', 'md:col-span-7'],
  '70-30': ['md:col-span-8', 'md:col-span-4'],
  '30-70': ['md:col-span-4', 'md:col-span-8'],
}

const valignClass: Record<NonNullable<Props['valign']>, string> = {
  top: 'items-start',
  center: 'items-center',
  bottom: 'items-end',
}

const gapClass: Record<NonNullable<Props['gap']>, string> = {
  tight: 'gap-4 md:gap-6',
  normal: 'gap-6 md:gap-10',
  wide: 'gap-8 md:gap-16',
}

export default function TwoColumnSection({ left, right, ratio = '50-50', valign = 'top', gap = 'normal', reverseOnMobile = false }: Props) {
  if (!left && !right) return null
  const [leftCls, rightCls] = ratioCols[ratio]
  return (
    <section className="py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className={cn('grid grid-cols-1 md:grid-cols-12', valignClass[valign], gapClass[gap])}>
          <div className={cn(leftCls, reverseOnMobile && 'order-2 md:order-1')}>
            {left ? <RichText content={left} /> : null}
          </div>
          <div className={cn(rightCls, reverseOnMobile && 'order-1 md:order-2')}>
            {right ? <RichText content={right} /> : null}
          </div>
        </div>
      </div>
    </section>
  )
}
