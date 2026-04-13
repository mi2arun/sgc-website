import RichText from '@/components/RichText'

type Props = {
  content?: any
}

export default function RichTextBlock({ content }: Props) {
  if (!content) return null

  return (
    <section className="py-12 bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <RichText content={content} />
      </div>
    </section>
  )
}
