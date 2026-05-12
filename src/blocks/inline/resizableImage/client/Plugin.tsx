'use client'

import { useEffect } from 'react'
import { COMMAND_PRIORITY_EDITOR, $getSelection, $isRangeSelection, $insertNodes } from 'lexical'
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext'

import { INSERT_RESIZABLE_IMAGE_COMMAND } from './commands'
import { $createResizableImageNode, ResizableImageNode } from './ResizableImageClientNode'

export function ResizableImagePlugin(): null {
  const [editor] = useLexicalComposerContext()

  useEffect(() => {
    if (!editor.hasNodes([ResizableImageNode])) {
      throw new Error('ResizableImagePlugin: ResizableImageNode not registered on editor')
    }

    return editor.registerCommand(
      INSERT_RESIZABLE_IMAGE_COMMAND,
      (payload) => {
        editor.update(() => {
          const selection = $getSelection()
          const node = $createResizableImageNode({
            data: {
              imageId: payload.imageId,
              url: payload.url,
              alt: payload.alt,
              caption: payload.caption,
              widthPercent: payload.widthPercent || 60,
              align: payload.align || 'center',
            },
          })
          if ($isRangeSelection(selection)) {
            $insertNodes([node])
          } else {
            $insertNodes([node])
          }
        })
        return true
      },
      COMMAND_PRIORITY_EDITOR,
    )
  }, [editor])

  return null
}
