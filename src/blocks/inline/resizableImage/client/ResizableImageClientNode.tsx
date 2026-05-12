'use client'

import * as React from 'react'
import { $applyNodeReplacement } from 'lexical'
import type { LexicalEditor, NodeKey } from 'lexical'
import type { ElementFormatType } from 'lexical'

import { ResizableImageServerNode } from '../server/ResizableImageServerNode'
import type { ResizableImageData, SerializedResizableImageNode } from '../types'

const ResizableImageComponent = React.lazy(() =>
  import('./ResizableImage').then((m) => ({ default: m.ResizableImage })),
)

export class ResizableImageNode extends ResizableImageServerNode {
  static getType(): string {
    return super.getType()
  }

  static clone(node: ResizableImageNode): ResizableImageNode {
    return new ResizableImageNode({ data: node.__data, format: node.__format, key: node.__key })
  }

  static importJSON(serializedNode: SerializedResizableImageNode): ResizableImageNode {
    const node = $createResizableImageNode({ data: serializedNode.data })
    node.setFormat(serializedNode.format)
    return node
  }

  decorate(_editor: LexicalEditor): React.JSX.Element {
    return (
      <React.Suspense fallback={null}>
        <ResizableImageComponent data={this.__data} nodeKey={this.getKey()} format={this.__format} />
      </React.Suspense>
    )
  }
}

export function $createResizableImageNode({ data, format, key }: { data: ResizableImageData; format?: ElementFormatType; key?: NodeKey }): ResizableImageNode {
  return $applyNodeReplacement(new ResizableImageNode({ data, format, key }))
}

export function $isResizableImageNode(node: unknown): node is ResizableImageNode {
  return node instanceof ResizableImageNode
}
