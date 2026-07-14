import type { Block } from 'payload'
import { sectionFields } from './shared/sectionFields'

export const HeroBlock: Block = {
  slug: 'hero',
  imageURL: '/blocks/hero.svg',
  labels: { singular: 'Hero Section', plural: 'Hero Sections' },
  fields: [
    {
      name: 'variant',
      type: 'select',
      label: 'Layout Variant',
      defaultValue: 'marketing',
      admin: {
        position: 'sidebar',
        description: 'Pick the overall hero layout. Other fields adapt to the variant.',
      },
      options: [
        { label: 'Marketing — slideshow + centered content (default)', value: 'marketing' },
        { label: 'Split — text left, image right', value: 'split' },
        { label: 'Minimal — simple heading + photo strip', value: 'minimal' },
        { label: 'Video — autoplay video background', value: 'video' },
      ],
    },
    {
      type: 'tabs',
      tabs: [
        // ────────── CONTENT ──────────
        {
          label: 'Content',
          description: 'What the hero says. Leave fields blank to fall back to site defaults.',
          fields: [
            { name: 'eyebrow', type: 'text', admin: { description: 'Small label above the heading (e.g. "Admissions Open")' } },
            { name: 'title', type: 'text', admin: { description: 'Main heading. Leave blank to use the site name.' } },
            { name: 'titleAccent', type: 'text', admin: { description: 'Highlighted word at the end of the title (rendered in accent colour).' } },
            {
              name: 'displayFont',
              type: 'checkbox',
              defaultValue: false,
              label: 'Use decorative serif font for the title',
              admin: { description: 'Renders the title in the Hiroshige serif font. Turn on only for the college-name hero.' },
            },
            { name: 'subtitle', type: 'textarea', admin: { description: 'One-line subtitle under the heading.' } },
            { name: 'trustLine', type: 'text', admin: { description: 'Small line under subtitle (e.g. trust/affiliation name).' } },
            {
              name: 'badges',
              type: 'array',
              label: 'Trust Badges',
              admin: { description: 'Accreditation chips. Leave empty to hide the row.' },
              fields: [
                { name: 'label', type: 'text', required: true },
              ],
            },
            { name: 'showLogo', type: 'checkbox', defaultValue: true, label: 'Show institution logo' },
            { name: 'logoOverride', type: 'upload', relationTo: 'media', admin: { description: 'Optional: replace the default logo for this hero.' } },
          ],
        },

        // ────────── SLIDES ──────────
        {
          label: 'Slides',
          description: 'Background images (and optional per-slide content). Used by marketing & minimal variants.',
          fields: [
            {
              name: 'slides',
              type: 'array',
              labels: { singular: 'Slide', plural: 'Slides' },
              fields: [
                { name: 'image', type: 'upload', relationTo: 'media', required: true },
                { name: 'mobileImage', type: 'upload', relationTo: 'media', admin: { description: 'Optional: different crop for narrow viewports.' } },
                { name: 'title', type: 'text', admin: { description: 'Optional: overrides the main title when this slide is showing.' } },
                { name: 'subtitle', type: 'text', admin: { description: 'Optional: overrides the subtitle for this slide.' } },
                { name: 'ctaLabel', type: 'text', defaultValue: 'Learn More' },
                { name: 'ctaLink', type: 'text', defaultValue: '/' },
                { name: 'secondaryCtaLabel', type: 'text' },
                { name: 'secondaryCtaLink', type: 'text' },
              ],
            },
            {
              name: 'videoUrl',
              type: 'text',
              label: 'Video URL (.mp4)',
              admin: {
                description: 'Only used when variant = Video. Direct mp4 link. Falls back to first slide image as poster.',
              },
            },
          ],
        },

        // ────────── LAYOUT ──────────
        {
          label: 'Layout',
          description: 'Size, alignment, and which UI controls show.',
          fields: [
            {
              type: 'row',
              fields: [
                {
                  name: 'height',
                  type: 'select',
                  defaultValue: 'large',
                  admin: { width: '50%' },
                  options: [
                    { label: 'Compact (480px)', value: 'compact' },
                    { label: 'Medium (560px)', value: 'medium' },
                    { label: 'Large (680px) — default', value: 'large' },
                    { label: 'Tall (780px)', value: 'tall' },
                    { label: 'Fullscreen (100vh)', value: 'fullscreen' },
                    { label: 'Custom (set vh below)', value: 'custom' },
                  ],
                },
                {
                  name: 'customHeight',
                  type: 'number',
                  label: 'Custom height (vh)',
                  min: 20,
                  max: 100,
                  defaultValue: 75,
                  admin: { width: '50%', description: 'Only used when Height = Custom' },
                },
              ],
            },
            {
              name: 'alignment',
              type: 'select',
              defaultValue: 'left',
              options: [
                { label: 'Left-aligned text', value: 'left' },
                { label: 'Centered text', value: 'center' },
                { label: 'Right-aligned text', value: 'right' },
              ],
            },
            { name: 'showBadges', type: 'checkbox', defaultValue: true, label: 'Show trust badges row' },
            { name: 'showArrows', type: 'checkbox', defaultValue: true, label: 'Show slide navigation arrows' },
            { name: 'showIndicators', type: 'checkbox', defaultValue: true, label: 'Show slide indicator dots' },
            { name: 'showScrollIndicator', type: 'checkbox', defaultValue: false, label: 'Show "scroll for more" arrow at bottom' },
          ],
        },

        // ────────── BACKGROUND ──────────
        {
          label: 'Background',
          description: 'Overlay darkness, text legibility, and decorative elements.',
          fields: [
            {
              type: 'row',
              fields: [
                {
                  name: 'overlayOpacity',
                  type: 'number',
                  defaultValue: 50,
                  min: 0,
                  max: 100,
                  admin: { width: '50%', description: 'Darkness of the overlay over the photo. 0 = raw image, 100 = solid. Lower it if the image looks too dark; raise it if text is hard to read. Default 50.' },
                },
                {
                  name: 'overlayColor',
                  type: 'select',
                  defaultValue: 'navy',
                  admin: { width: '50%' },
                  options: [
                    { label: 'Navy (brand)', value: 'navy' },
                    { label: 'Black', value: 'black' },
                    { label: 'Primary gradient', value: 'gradient' },
                    { label: 'None (image only)', value: 'none' },
                  ],
                },
              ],
            },
            {
              name: 'fontColor',
              type: 'text',
              label: 'Text Colour',
              admin: {
                description: 'Hex colour for the hero title / subtitle / trust line, e.g. #ffffff (white) or #0c1f3d (dark navy). Leave blank for white. Use a dark colour when the overlay is light.',
              },
            },
            {
              type: 'row',
              fields: [
                {
                  name: 'textPanel',
                  type: 'checkbox',
                  defaultValue: false,
                  label: 'Panel behind text',
                  admin: { width: '34%', description: 'Adds a translucent box behind the copy so it stays readable over busy or light images.' },
                },
                {
                  name: 'textPanelColor',
                  type: 'text',
                  defaultValue: '#0c1f3d',
                  label: 'Panel colour',
                  admin: { width: '33%', description: 'Hex, e.g. #0c1f3d. Only used when the panel is on.' },
                },
                {
                  name: 'textPanelOpacity',
                  type: 'number',
                  defaultValue: 40,
                  min: 0,
                  max: 100,
                  label: 'Panel opacity',
                  admin: { width: '33%', description: '0 = fully transparent, 100 = solid. ~40 gives a subtle scrim.' },
                },
              ],
            },
            { name: 'showDecorativeRings', type: 'checkbox', defaultValue: true, label: 'Show decorative rings (right side)' },
            { name: 'showDotPattern', type: 'checkbox', defaultValue: true, label: 'Show subtle dot pattern' },
          ],
        },

        // ────────── BEHAVIOR ──────────
        {
          label: 'Behavior',
          description: 'Slideshow timing.',
          fields: [
            { name: 'autoplay', type: 'checkbox', defaultValue: true, label: 'Autoplay slides' },
            {
              name: 'autoplaySpeed',
              type: 'number',
              defaultValue: 6000,
              min: 1000,
              max: 30000,
              admin: { description: 'Milliseconds between slides (default 6000 = 6 seconds)' },
            },
            { name: 'pauseOnHover', type: 'checkbox', defaultValue: true, label: 'Pause autoplay on hover' },
          ],
        },
      ],
    },
    ...sectionFields,
  ],
}
