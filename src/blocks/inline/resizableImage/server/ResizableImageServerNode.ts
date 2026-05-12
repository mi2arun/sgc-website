import { DecoratorBlockNode, type SerializedDecoratorBlockNode } from '@lexical/react/LexicalDecoratorBlockNode'
import type { ElementFormatType, LexicalEditor, NodeKey } from 'lexical'
import { $applyNodeReplacement } from 'lexical'
import type { JSX } from 'react'

import type { ResizableImageData, SerializedResizableImageNode } from '../types'

export class ResizableImageServerNode extends DecoratorBlockNode {
  __data: ResizableImageData

  constructor({ data, format, key }: { data: ResizableImageData; format?: ElementFormatType; key?: NodeKey }) {
    super(format || '', key)
    this.__data = data
  }

  static getType(): string {
    return 'resizable-image'
  }

  static clone(node: ResizableImageServerNode): ResizableImageServerNode {
    return new ResizableImageServerNode({ data: node.__data, format: node.__format, key: node.__key })
  }

  static importJSON(serializedNode: SerializedResizableImageNode): ResizableImageServerNode {
    const node = $createResizableImageServerNode({ data: serializedNode.data })
    node.setFormat(serializedNode.format)
    return node
  }

  exportJSON(): SerializedResizableImageNode {
    return {
      ...(super.exportJSON() as SerializedDecoratorBlockNode),
      type: 'resizable-image',
      data: this.__data,
      version: 1,
    }
  }

  getData(): ResizableImageData {
    return this.getLatest().__data
  }

  setData(data: ResizableImageData): void {
    const writable = this.getWritable()
    writable.__data = data
  }

  // Server-side decorate returns null; the client subclass returns a JSX element.
  decorate(_editor: LexicalEditor): JSX.Element | null {
    return null
  }

  updateDOM(): false {
    return false
  }

  static isInline(): false {
    return false
  }
}

export function $createResizableImageServerNode({ data }: { data: ResizableImageData }): ResizableImageServerNode {
  return $applyNodeReplacement(new ResizableImageServerNode({ data }))
}

export function $isResizableImageServerNode(
  node: unknown,
): node is ResizableImageServerNode {
  return node instanceof ResizableImageServerNode
}
