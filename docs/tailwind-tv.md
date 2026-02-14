# Tailwind TV Configuration

This project uses a TV-focused Tailwind setup tuned for living-room viewing distances.

## Files

- `tailwind.config.ts`
- `src/styles.css`
- `vite.config.ts` (Tailwind Vite plugin)
- `src/main.tsx` (global stylesheet import)

## Current Setup

### 1) Tailwind integration

- `@tailwindcss/vite` is enabled in `vite.config.ts`.
- Global CSS is loaded from `src/styles.css`.

### 2) TV typography tokens

Custom text tokens are defined in `src/styles.css` under `@theme`:

- `text-tv-caption`
- `text-tv-body`
- `text-tv-body-lg`
- `text-tv-title`
- `text-tv-display`

These are used in UI components and screens for readable text on TVs.

### 3) TV breakpoints

`tailwind.config.ts` defines TV-oriented breakpoints:

- `tv720`: `1280px`
- `tv1080`: `1920px`
- `tv4k`: `2560px`

Use them like:

```tsx
<div className="text-tv-body tv1080:text-tv-body-lg tv4k:text-tv-title" />
```

### 4) Root rem scaling

`src/styles.css` sets base `html` font-size by viewport width:

- default: `14px`
- `>=1280px`: `15px`
- `>=1920px`: `16px`
- `>=2560px`: `18px`

This keeps `rem`-based sizing readable across HD, Full HD, and 4K TVs.

## Recommended Usage

- Default body copy: `text-tv-body`
- Important content labels/buttons: `text-tv-body-lg`
- Screen titles/headings: `text-tv-title`
- Very large hero headings: `text-tv-display`

## Tuning Guidelines

- If text feels too small at distance, increase one step at a time:
  - bump root `html` font-size values first.
  - then increase token values in `@theme`.
- Keep line-height generous (`1.35` to `1.5`) for readability.
- Keep focus states strong (outline + contrast + scale) for remote navigation.

## Notes

- Tailwind v4 reads custom text utility tokens from `@theme` in CSS.
- `tailwind.config.ts` still provides content paths and additional breakpoints.
