'use client'
import { createCommand, type LexicalCommand } from 'lexical'
import type { ResizableImageData } from '../types'

export const INSERT_RESIZABLE_IMAGE_COMMAND: LexicalCommand<ResizableImageData> = createCommand(
  'INSERT_RESIZABLE_IMAGE_COMMAND',
)
