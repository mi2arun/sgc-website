import type { SerializedDecoratorBlockNode } from '@lexical/react/LexicalDecoratorBlockNode'

export type ResizableImageData = {
  imageId: number | string
  widthPercent: number
  align: 'left' | 'center' | 'right' | 'full'
  caption?: string
  alt?: string
  url?: string
}

export type SerializedResizableImageNode = SerializedDecoratorBlockNode & {
  type: 'resizable-image'
  data: ResizableImageData
  version: 1
}
