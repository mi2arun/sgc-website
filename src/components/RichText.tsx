import { RichText as PayloadRichText } from '@payloadcms/richtext-lexical/react'

type Props = {
  content: any
}

export default function RichText({ content }: Props) {
  if (!content) return null
  return (
    <div className="prose prose-lg max-w-none prose-headings:text-primary prose-a:text-accent">
      <PayloadRichText data={content} />
    </div>
  )
}
