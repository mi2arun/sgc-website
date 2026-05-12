'use client'

import { useEffect, useState } from 'react'

const STORAGE_KEY = 'sgc-focus-mode'
const BODY_CLASS = 'sgc-focus-mode'

const FocusIcon = ({ active }: { active: boolean }) => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    {active ? (
      <>
        <path d="M8 3v3a2 2 0 0 1-2 2H3" />
        <path d="M21 8h-3a2 2 0 0 1-2-2V3" />
        <path d="M3 16h3a2 2 0 0 1 2 2v3" />
        <path d="M16 21v-3a2 2 0 0 1 2-2h3" />
      </>
    ) : (
      <>
        <path d="M15 3h6v6" />
        <path d="M9 21H3v-6" />
        <path d="M21 3l-7 7" />
        <path d="M3 21l7-7" />
      </>
    )}
  </svg>
)

export function FocusModeToggle() {
  const [active, setActive] = useState(false)

  // Restore on mount
  useEffect(() => {
    const saved = typeof window !== 'undefined' && window.localStorage.getItem(STORAGE_KEY) === '1'
    setActive(saved)
    if (saved) document.body.classList.add(BODY_CLASS)
  }, [])

  // Apply when changed
  useEffect(() => {
    if (active) {
      document.body.classList.add(BODY_CLASS)
      window.localStorage.setItem(STORAGE_KEY, '1')
    } else {
      document.body.classList.remove(BODY_CLASS)
      window.localStorage.removeItem(STORAGE_KEY)
    }
  }, [active])

  // Keyboard shortcut: Cmd/Ctrl + .
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === '.') {
        e.preventDefault()
        setActive((a) => !a)
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  return (
    <>
      <button
        type="button"
        onClick={() => setActive((a) => !a)}
        title={active ? 'Exit focus mode (⌘.)' : 'Focus mode — hide sidebar (⌘.)'}
        aria-pressed={active}
        style={{
          position: 'fixed',
          right: 16,
          bottom: 16,
          width: 40,
          height: 40,
          borderRadius: 20,
          border: '1px solid var(--theme-elevation-150, #e5e7eb)',
          background: active ? 'var(--theme-success-500, #10b981)' : 'var(--theme-elevation-100, white)',
          color: active ? 'white' : 'var(--theme-text, #111827)',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
          zIndex: 9999,
          transition: 'background-color 0.15s, transform 0.15s',
        }}
      >
        <FocusIcon active={active} />
      </button>

      {/* Scoped CSS — body class hides the right-side document sidebar (Slug, Meta) */}
      <style>{`
        /* Hide the right-side sidebar (Slug, Meta, etc.) on the document edit view */
        body.${BODY_CLASS} .document-fields__sidebar-wrap,
        body.${BODY_CLASS} .document-fields__sidebar {
          display: none !important;
        }

        /* Stretch the main edit column to full available width */
        body.${BODY_CLASS} .document-fields--has-sidebar {
          display: block !important;
        }
        body.${BODY_CLASS} .document-fields__main {
          width: 100% !important;
          max-width: 100% !important;
          flex: 1 1 100% !important;
        }

        /* Subtle visual cue: thin coloured strip at top of the form */
        body.${BODY_CLASS} .collection-edit__form::before {
          content: '';
          display: block;
          height: 3px;
          background: linear-gradient(90deg, #10b981, #3b82f6);
          margin-bottom: 8px;
        }
      `}</style>
    </>
  )
}

export default FocusModeToggle
