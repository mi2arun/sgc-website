'use client'

import * as React from 'react'
import { useCallback, useEffect, useRef, useState } from 'react'
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext'
import { $getNodeByKey, type ElementFormatType, type NodeKey } from 'lexical'

import type { ResizableImageData } from '../types'
import { $isResizableImageNode } from './ResizableImageClientNode'

type Props = {
  data: ResizableImageData
  nodeKey: NodeKey
  format: ElementFormatType
}

const alignStyles: Record<string, React.CSSProperties> = {
  left: { float: 'left', marginRight: '1.5rem', marginBottom: '1rem' },
  right: { float: 'right', marginLeft: '1.5rem', marginBottom: '1rem' },
  center: { display: 'block', marginLeft: 'auto', marginRight: 'auto' },
  full: { display: 'block', width: '100%' },
}

export function ResizableImage({ data, nodeKey }: Props) {
  const [editor] = useLexicalComposerContext()
  const [widthPct, setWidthPct] = useState<number>(data.widthPercent || 60)
  const [selected, setSelected] = useState(false)
  const [dragging, setDragging] = useState(false)
  const wrapperRef = useRef<HTMLDivElement>(null)
  const liveWidthRef = useRef<number>(widthPct)

  // Sync local state when the node data changes externally
  useEffect(() => {
    setWidthPct(data.widthPercent || 60)
    liveWidthRef.current = data.widthPercent || 60
  }, [data.widthPercent])

  // Click-outside deselects
  useEffect(() => {
    if (!selected) return
    const onDocPointerDown = (e: PointerEvent) => {
      if (!wrapperRef.current) return
      if (!wrapperRef.current.contains(e.target as Node)) {
        setSelected(false)
      }
    }
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setSelected(false)
    }
    document.addEventListener('pointerdown', onDocPointerDown, true)
    document.addEventListener('keydown', onKey)
    return () => {
      document.removeEventListener('pointerdown', onDocPointerDown, true)
      document.removeEventListener('keydown', onKey)
    }
  }, [selected])

  const onPointerDown = useCallback(
    (e: React.PointerEvent<HTMLDivElement>) => {
      if (!wrapperRef.current) return
      e.preventDefault()
      e.stopPropagation()
      const parent = wrapperRef.current.parentElement
      if (!parent) return
      const parentWidth = parent.clientWidth
      const startX = e.clientX
      const startPct = liveWidthRef.current
      setDragging(true)

      const onMove = (ev: PointerEvent) => {
        const deltaPx = ev.clientX - startX
        const deltaPct = (deltaPx / parentWidth) * 100
        const next = Math.max(10, Math.min(100, Math.round(startPct + deltaPct)))
        liveWidthRef.current = next
        setWidthPct(next)
      }

      const onUp = () => {
        document.removeEventListener('pointermove', onMove)
        document.removeEventListener('pointerup', onUp)
        setDragging(false)
        const finalPct = liveWidthRef.current
        editor.update(() => {
          const node = $getNodeByKey(nodeKey)
          if (node && $isResizableImageNode(node)) {
            node.setData({ ...node.getData(), widthPercent: finalPct })
          }
        })
      }

      document.addEventListener('pointermove', onMove)
      document.addEventListener('pointerup', onUp)
    },
    [editor, nodeKey],
  )

  const setAlign = useCallback(
    (align: ResizableImageData['align']) => {
      editor.update(() => {
        const node = $getNodeByKey(nodeKey)
        if (node && $isResizableImageNode(node)) {
          node.setData({ ...node.getData(), align })
        }
      })
    },
    [editor, nodeKey],
  )

  if (!data.url) {
    return (
      <div style={{ padding: 16, border: '1px dashed #ccc', color: '#999', textAlign: 'center' }}>
        Image URL missing
      </div>
    )
  }

  const align = data.align || 'center'
  const computedStyle: React.CSSProperties = {
    width: align === 'full' ? '100%' : `${widthPct}%`,
    position: 'relative',
    boxSizing: 'border-box',
    ...alignStyles[align],
  }

  const onClickFigure = (e: React.MouseEvent) => {
    e.stopPropagation()
    setSelected(true)
  }

  const showChrome = selected || dragging
  const outline = dragging
    ? '2px solid #3b82f6'
    : selected
      ? '2px solid #3b82f6'
      : '2px solid transparent'

  return (
    <figure
      ref={wrapperRef}
      style={{ ...computedStyle, outline, outlineOffset: 2, cursor: 'pointer' }}
      onClick={onClickFigure}
      onPointerDown={onClickFigure}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={data.url}
        alt={data.alt || ''}
        style={{ width: '100%', height: 'auto', display: 'block', borderRadius: 6 }}
        draggable={false}
      />

      {data.caption && (
        <figcaption style={{ fontSize: 13, color: '#666', marginTop: 6, fontStyle: 'italic' }}>
          {data.caption}
        </figcaption>
      )}

      {/* Resize handle (right edge) — visible when selected */}
      {showChrome && align !== 'full' && (
        <div
          onPointerDown={(e) => {
            e.stopPropagation()
            onPointerDown(e)
          }}
          style={{
            position: 'absolute',
            right: -6,
            top: '50%',
            transform: 'translateY(-50%)',
            width: 14,
            height: 48,
            background: '#3b82f6',
            border: '2px solid white',
            borderRadius: 6,
            cursor: 'ew-resize',
            touchAction: 'none',
            userSelect: 'none',
            boxShadow: '0 1px 3px rgba(0,0,0,0.2)',
            zIndex: 20,
          }}
          aria-label="Drag to resize"
        />
      )}

      {/* Toolbar (shows when selected) — positioned just below the image to stay near the cursor */}
      {showChrome && (
        <div
          style={{
            position: 'absolute',
            top: 6,
            left: 6,
            display: 'flex',
            gap: 4,
            background: 'white',
            border: '1px solid #e5e7eb',
            borderRadius: 6,
            padding: 4,
            boxShadow: '0 2px 6px rgba(0,0,0,0.18)',
            fontSize: 11,
            zIndex: 20,
          }}
          onClick={(e) => e.stopPropagation()}
          onPointerDown={(e) => e.stopPropagation()}
        >
          {(['left', 'center', 'right', 'full'] as const).map((a) => (
            <button
              key={a}
              type="button"
              onClick={(e) => {
                e.stopPropagation()
                setAlign(a)
              }}
              style={{
                padding: '4px 8px',
                border: 'none',
                background: align === a ? '#3b82f6' : 'transparent',
                color: align === a ? 'white' : '#374151',
                borderRadius: 4,
                cursor: 'pointer',
                fontSize: 11,
                fontWeight: 500,
                textTransform: 'capitalize',
              }}
            >
              {a}
            </button>
          ))}
          <span style={{ alignSelf: 'center', padding: '0 6px', color: '#6b7280', fontVariantNumeric: 'tabular-nums' }}>
            {align === 'full' ? '100' : widthPct}%
          </span>
        </div>
      )}
    </figure>
  )
}
