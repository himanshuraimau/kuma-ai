# kuma-ai Design System

> Visual design specifications for the kuma-ai frontend

---

## 1. Color Palette

### Primary Colors

| Name | Hex | RGB | Usage |
|------|-----|-----|-------|
| **Coral (Primary)** | `#f97316` | `249, 115, 22` | Primary actions, CTAs, accents, links |
| **Navy (Background)** | `#09090b` | `9, 9, 11` | Page backgrounds, main canvas |
| **Charcoal (Surface)** | `#18181b` | `24, 24, 27` | Cards, modals, elevated surfaces |
| **Cream (Text)** | `#fafafa` | `250, 250, 250` | Primary text, headings |
| **Warm Gray (Muted)** | `#a1a1aa` | `161, 161, 170` | Secondary text, placeholders |

### Secondary/Accent Colors

| Name | Hex | Usage |
|------|-----|-------|
| **Amber** | `#fbbf24` | Warnings, highlights, gradients |
| **Teal** | `#2dd4bf` | Success states, special accents |
| **Red (Destructive)** | `#ef4444` | Errors, delete actions |
| **Blue** | `#3b82f6` | Links in content, info states |
| **Violet** | `#8b5cf6` | Memory/AI features |
| **Green** | `#22c55e` | Success messages |

### Zinc Scale (UI Elements)

| Shade | Hex | Usage |
|-------|-----|-------|
| Zinc 50 | `#fafafa` | Primary text |
| Zinc 100 | `#f4f4f5` | - |
| Zinc 200 | `#e4e4e7` | - |
| Zinc 300 | `#d4d4d8` | - |
| Zinc 400 | `#a1a1aa` | Muted text, icons |
| Zinc 500 | `#71717a` | Disabled text |
| Zinc 600 | `#52525b` | - |
| Zinc 700 | `#3f3f46` | Hover backgrounds |
| Zinc 800 | `#27272a` | Borders, inputs, secondary bg |
| Zinc 900 | `#18181b` | Cards, surfaces |
| Zinc 950 | `#09090b` | Main background |

### Semantic Colors

```css
--background: #09090b;
--foreground: #fafafa;

--card: #18181b;
--card-foreground: #fafafa;

--primary: #f97316;
--primary-foreground: #fafafa;

--secondary: #27272a;
--secondary-foreground: #fafafa;

--muted: #27272a;
--muted-foreground: #a1a1aa;

--destructive: #ef4444;

--border: #27272a;
--input: #27272a;
--ring: #f97316;
```

---

## 2. Typography

### Font Stack

```css
font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 
             'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 
             'Helvetica Neue', sans-serif;
```

### Type Scale

| Name | Size | Weight | Line Height | Usage |
|------|------|--------|-------------|-------|
| **Display** | `72px` / `4.5rem` | 700 (Bold) | 1.1 | Hero headlines |
| **H1** | `48px` / `3rem` | 700 (Bold) | 1.2 | Page titles |
| **H2** | `36px` / `2.25rem` | 600 (Semibold) | 1.25 | Section headers |
| **H3** | `24px` / `1.5rem` | 600 (Semibold) | 1.3 | Card titles |
| **H4** | `20px` / `1.25rem` | 600 (Semibold) | 1.4 | Subsections |
| **Body Large** | `18px` / `1.125rem` | 400 (Regular) | 1.6 | Landing page text |
| **Body** | `15px` / `0.9375rem` | 400 (Regular) | 1.5 | Default text, chat |
| **Body Small** | `14px` / `0.875rem` | 400-500 | 1.5 | Labels, secondary |
| **Caption** | `13px` / `0.8125rem` | 400-500 | 1.4 | Help text, hints |
| **Micro** | `10-12px` | 500-600 | 1.3 | Timestamps, badges |

### Font Weights

| Weight | Value | Usage |
|--------|-------|-------|
| Regular | 400 | Body text |
| Medium | 500 | Labels, buttons |
| Semibold | 600 | Headings, emphasis |
| Bold | 700 | Display, H1 |

### Text Colors

| Purpose | Color | Class |
|---------|-------|-------|
| Primary text | `#fafafa` | `text-cream` / `text-zinc-100` |
| Secondary text | `#a1a1aa` | `text-warm-gray` / `text-zinc-400` |
| Muted text | `#71717a` | `text-zinc-500` |
| Disabled text | `#52525b` | `text-zinc-600` |
| Link text | `#f97316` | `text-coral` / `text-orange-500` |
| Error text | `#f87171` | `text-red-400` |
| Success text | `#4ade80` | `text-green-400` |

---

## 3. Spacing System

Based on 4px base unit.

| Token | Value | Usage |
|-------|-------|-------|
| `0` | 0px | - |
| `0.5` | 2px | Micro adjustments |
| `1` | 4px | Tight spacing |
| `1.5` | 6px | Icon gaps |
| `2` | 8px | Small gaps |
| `3` | 12px | Component internal |
| `4` | 16px | Standard padding |
| `5` | 20px | Form fields |
| `6` | 24px | Section gaps |
| `8` | 32px | Large gaps |
| `10` | 40px | Section padding |
| `12` | 48px | Large sections |
| `16` | 64px | Page sections |
| `20` | 80px | Hero spacing |
| `24` | 96px | Major sections |

### Common Spacing Patterns

```css
/* Card padding */
padding: 16px;          /* p-4 */
padding: 24px;          /* p-6 */

/* Section padding */
padding: 32px;          /* p-8 */
padding-y: 80px;        /* py-20 */

/* Gap between items */
gap: 8px;               /* gap-2 */
gap: 12px;              /* gap-3 */
gap: 16px;              /* gap-4 */

/* Form field height */
height: 50px;           /* h-[50px] - inputs */
height: 52px;           /* h-[52px] - primary buttons */
height: 36px;           /* h-9 - default buttons */
height: 40px;           /* h-10 - large buttons */
```

---

## 4. Border Radius

| Token | Value | Usage |
|-------|-------|-------|
| `--radius-sm` | `8px` | Small buttons, badges |
| `--radius-md` | `10px` | Inputs, cards |
| `--radius` | `12px` | Default (buttons, cards) |
| `--radius-lg` | `12px` | Dialogs, large cards |
| `--radius-xl` | `16px` | Modals, hero elements |
| `rounded-full` | `9999px` | Avatars, pills, circular buttons |

### Common Patterns

```css
/* Buttons */
border-radius: 8px;     /* rounded-lg */
border-radius: 12px;    /* rounded-xl */
border-radius: 9999px;  /* rounded-full (pill) */

/* Cards */
border-radius: 12px;    /* rounded-xl */
border-radius: 16px;    /* rounded-2xl */

/* Inputs */
border-radius: 12px;    /* rounded-xl */

/* Avatars */
border-radius: 9999px;  /* rounded-full */

/* Message bubbles */
border-radius: 16px;    /* rounded-2xl */
border-radius: 4px;     /* rounded-sm (pointed corner) */
```

---

## 5. Shadows & Elevation

### Shadow Scale

| Level | Shadow | Usage |
|-------|--------|-------|
| **None** | `none` | Flat elements |
| **XS** | `0 1px 2px rgba(0,0,0,0.05)` | Subtle lift |
| **SM** | `0 1px 3px rgba(0,0,0,0.1)` | Cards, buttons |
| **MD** | `0 4px 6px rgba(0,0,0,0.1)` | Dropdowns, popovers |
| **LG** | `0 10px 15px rgba(0,0,0,0.1)` | Modals, dialogs |
| **XL** | `0 20px 25px rgba(0,0,0,0.1)` | Hero elements |

### Glow Effects

```css
/* Primary button glow */
box-shadow: 0 0 20px rgba(249, 115, 22, 0.2);     /* shadow-coral/20 */
box-shadow: 0 0 40px rgba(249, 115, 22, 0.4);     /* hover glow */

/* Input focus ring */
box-shadow: 0 0 0 3px rgba(249, 115, 22, 0.2);   /* ring-coral/20 */

/* Error state */
box-shadow: 0 0 0 3px rgba(239, 68, 68, 0.2);    /* ring-red-500/20 */
```

---

## 6. Borders

### Border Widths

| Width | Usage |
|-------|-------|
| `1px` | Default borders, inputs, cards |
| `2px` | Focus states, active states |
| `4px` | Accent borders (error indicators) |

### Border Colors

| Color | Hex | Usage |
|-------|-----|-------|
| Default | `#27272a` | Cards, inputs, dividers |
| Subtle | `rgba(255,255,255,0.08)` | Glass elements |
| Subtle hover | `rgba(255,255,255,0.15)` | Input borders |
| Focus | `#f97316` | Focus rings |
| Error | `#ef4444` | Validation errors |

### Common Patterns

```css
/* Card border */
border: 1px solid #27272a;

/* Input default */
border: 1px solid rgba(255, 255, 255, 0.15);

/* Input focus */
border: 1px solid #f97316;

/* Glass effect border */
border: 1px solid rgba(255, 255, 255, 0.08);
```

---

## 7. Gradients

### Brand Gradients

```css
/* Primary gradient (coral to amber) */
background: linear-gradient(135deg, #f97316 0%, #fbbf24 100%);

/* Hero text gradient */
background: linear-gradient(to right, #fb923c, #fde68a);
-webkit-background-clip: text;
color: transparent;

/* Dark overlay gradient */
background: linear-gradient(to bottom, 
  rgba(9, 9, 11, 0.8), 
  rgba(9, 9, 11, 0.5), 
  #09090b
);
```

### Glassmorphism

```css
/* Standard glass */
.glass {
  background: rgba(24, 24, 27, 0.7);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border: 1px solid rgba(255, 255, 255, 0.08);
}

/* Strong glass (navigation) */
.glass-strong {
  background: rgba(9, 9, 11, 0.8);
  backdrop-filter: blur(20px);
  border-bottom: 1px solid rgba(255, 255, 255, 0.08);
}
```

---

## 8. Animations & Transitions

### Transition Durations

| Speed | Duration | Usage |
|-------|----------|-------|
| Fast | `150ms` | Hover states, micro-interactions |
| Normal | `200ms` | Default transitions |
| Slow | `300ms` | Modal opens, page transitions |
| Slower | `500ms` | Complex animations |

### Easing Functions

| Name | Value | Usage |
|------|-------|-------|
| Default | `ease` | General transitions |
| Ease-out | `ease-out` | Exit animations |
| Ease-in-out | `ease-in-out` | Symmetric animations |

### Common Transitions

```css
/* Default hover transition */
transition: all 200ms ease;

/* Color/opacity only */
transition: color 150ms ease, opacity 150ms ease;

/* Transform */
transition: transform 200ms ease-out;
```

### Keyframe Animations

```css
/* Float (background blobs) */
@keyframes float {
  0%, 100% { transform: translate(0, 0) scale(1); }
  33% { transform: translate(30px, -30px) scale(1.05); }
  66% { transform: translate(-20px, 20px) scale(0.95); }
}

/* Typing indicator */
@keyframes typing-bounce {
  0%, 60%, 100% { transform: translateY(0); }
  30% { transform: translateY(-8px); }
}

/* Fade in up (entry) */
@keyframes fade-in-up {
  from { opacity: 0; transform: translateY(30px); }
  to { opacity: 1; transform: translateY(0); }
}

/* Pulse glow */
@keyframes pulse-glow {
  0%, 100% { box-shadow: 0 0 20px rgba(249, 115, 22, 0.2); }
  50% { box-shadow: 0 0 40px rgba(249, 115, 22, 0.4); }
}

/* Scroll bounce */
@keyframes scroll-bounce {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(8px); }
}
```

### Animation Classes

| Class | Duration | Usage |
|-------|----------|-------|
| `animate-float` | 20s | Background elements |
| `animate-float-slow` | 25s | Slow background |
| `animate-typing-bounce` | 1.4s | Typing dots |
| `animate-fade-in-up` | 0.7s | Entry animations |
| `animate-pulse-glow` | 3s | Button highlights |
| `animate-scroll-bounce` | 2s | Scroll indicator |
| `animate-spin` | 1s | Loading spinners |
| `animate-pulse` | 2s | Skeleton loaders |
| `animate-bounce` | 1s | Attention |

### Animation Delays

```css
.delay-150 { animation-delay: 150ms; }
.delay-300 { animation-delay: 300ms; }
.delay-450 { animation-delay: 450ms; }
.delay-600 { animation-delay: 600ms; }
```

---

## 9. Icons

### Icon Library
**Hugeicons (Free)** - Primary icon library for all product surfaces

Use only icons available in the free Hugeicons package. Avoid Pro-only glyphs to keep the design and implementation consistent across environments.

### Icon Sizes

| Size | Pixels | Usage |
|------|--------|-------|
| XS | 16px | Inline indicators |
| SM | 20px | Tight spaces, badges |
| MD | 24px | Buttons, inputs |
| Default | 28px | Navigation, labels |
| LG | 32px | Cards, actions |
| XL | 40px | Feature icons |
| 2XL | 56px | Empty states |
| Hero | 72-96px | Landing page, feature callouts |

### Icon Style Rules

- Prefer outline icons for default UI states and keep stroke width visually balanced across a view.
- Use filled variants only for active/selected states where higher emphasis is required.
- Keep icon size consistent within a component group (for example, all nav icons at `Default`).
- Pair large icon treatments (`XL` and above) with increased spacing to avoid visual crowding.

### Icon Colors

| Context | Color |
|---------|-------|
| Default | `text-zinc-400` |
| Active | `text-orange-500` |
| Hover | `text-zinc-200` |
| Disabled | `text-zinc-600` |
| Error | `text-red-400` |
| Success | `text-green-400` |

---

## 10. Component Styles

### Buttons

#### Primary Button
```css
height: 36-52px;
padding: 8px 16px;
background: #f97316;
color: #fafafa;
border-radius: 8-12px;
font-weight: 500;
box-shadow: 0 4px 12px rgba(249, 115, 22, 0.2);

/* Hover */
background: rgba(249, 115, 22, 0.9);
transform: translateY(-1px);
box-shadow: 0 6px 16px rgba(249, 115, 22, 0.3);
```

#### Secondary Button
```css
background: #27272a;
color: #fafafa;
border: none;

/* Hover */
background: rgba(39, 39, 42, 0.8);
```

#### Ghost Button
```css
background: transparent;
color: #a1a1aa;

/* Hover */
background: #27272a;
color: #fafafa;
```

#### Outline Button
```css
background: transparent;
border: 1px solid #3f3f46;
color: #d4d4d8;

/* Hover */
background: #27272a;
color: #fafafa;
```

#### Destructive Button
```css
background: #ef4444;
color: white;

/* Hover */
background: rgba(239, 68, 68, 0.9);
```

### Inputs

```css
height: 50px;
padding: 0 16px 0 44px; /* with icon */
background: rgba(9, 9, 11, 0.5);
border: 1px solid rgba(255, 255, 255, 0.15);
border-radius: 12px;
color: #fafafa;
font-size: 15px;

/* Placeholder */
color: rgba(161, 161, 170, 0.4);

/* Focus */
border-color: #f97316;
box-shadow: 0 0 0 3px rgba(249, 115, 22, 0.2);
outline: none;

/* Error */
border-color: #ef4444;
box-shadow: 0 0 0 3px rgba(239, 68, 68, 0.2);
```

### Cards

```css
background: #18181b;
border: 1px solid #27272a;
border-radius: 12-16px;
padding: 16-24px;

/* Hover (interactive cards) */
border-color: #3f3f46;
background: rgba(24, 24, 27, 0.8);
```

### Message Bubbles

#### User Message
```css
background: #27272a;
color: #fafafa;
border-radius: 16px;
border-top-right-radius: 4px; /* pointed corner */
padding: 14px 20px;
```

#### Assistant Message
```css
background: #18181b;
border: 1px solid #27272a;
color: #e4e4e7;
border-radius: 16px;
border-top-left-radius: 4px; /* pointed corner */
padding: 14px 20px;
```

### Sidebar

```css
background: #09090b;
border-right: 1px solid #27272a;
width: 280px; /* expanded */
width: 64px;  /* collapsed */
```

### Toast Notifications

Using **Sonner** with `richColors`:
- Success: Green tint
- Error: Red tint  
- Info: Blue tint
- Warning: Amber tint

Position: `top-right`

---

## 11. Background Patterns

### Grid Pattern
```css
.grid-pattern {
  background-image:
    linear-gradient(rgba(255, 255, 255, 0.03) 1px, transparent 1px),
    linear-gradient(90deg, rgba(255, 255, 255, 0.03) 1px, transparent 1px);
  background-size: 40px 40px;
}
```

### Dot Pattern
```css
.dot-pattern {
  background-image: radial-gradient(
    circle, 
    rgba(255, 255, 255, 0.05) 1px, 
    transparent 1px
  );
  background-size: 40px 40px;
}
```

---

## 12. Scrollbars

### Custom Sidebar Scrollbar
```css
.sidebar-scrollbar::-webkit-scrollbar {
  width: 5px;
}

.sidebar-scrollbar::-webkit-scrollbar-track {
  background: transparent;
}

.sidebar-scrollbar::-webkit-scrollbar-thumb {
  background: #27272a;
  border-radius: 5px;
}

.sidebar-scrollbar::-webkit-scrollbar-thumb:hover {
  background: #3f3f46;
}
```

### Hidden Scrollbar
```css
.no-scrollbar::-webkit-scrollbar {
  display: none;
}
.no-scrollbar {
  -ms-overflow-style: none;
  scrollbar-width: none;
}
```

---

## 13. Responsive Breakpoints

| Breakpoint | Width | Usage |
|------------|-------|-------|
| `sm` | 640px | Mobile landscape |
| `md` | 768px | Tablet |
| `lg` | 1024px | Small desktop |
| `xl` | 1280px | Desktop |
| `2xl` | 1536px | Large desktop |

### Mobile Detection
```typescript
const MOBILE_BREAKPOINT = 768; // md breakpoint
```

---

## 14. Z-Index Scale

| Level | Value | Usage |
|-------|-------|-------|
| Base | 0 | Default content |
| Dropdown | 10 | Menus, popovers |
| Sticky | 20 | Sticky headers |
| Fixed | 30 | Fixed elements |
| Modal backdrop | 40 | Overlay backgrounds |
| Modal | 50 | Dialogs, sheets |
| Toast | 60 | Notifications |
| Tooltip | 70 | Tooltips |

---

## 15. Dark Mode

This application is **dark mode only**. The entire design system is built around a dark theme with:

- Deep black backgrounds (`#09090b`)
- Zinc-based neutrals for UI elements
- Orange (`#f97316`) as the primary accent
- High contrast white text (`#fafafa`)

No light mode variant exists or is planned.

---

## Quick Reference: CSS Variables

```css
:root {
  /* Radius */
  --radius: 0.75rem;
  
  /* Colors */
  --background: #09090b;
  --foreground: #fafafa;
  --card: #18181b;
  --card-foreground: #fafafa;
  --primary: #f97316;
  --primary-foreground: #fafafa;
  --secondary: #27272a;
  --secondary-foreground: #fafafa;
  --muted: #27272a;
  --muted-foreground: #a1a1aa;
  --destructive: #ef4444;
  --border: #27272a;
  --input: #27272a;
  --ring: #f97316;
  
  /* Sidebar */
  --sidebar: #09090b;
  --sidebar-foreground: #fafafa;
  --sidebar-border: #27272a;
  --sidebar-accent: #27272a;
  --sidebar-accent-foreground: #f97316;
  --sidebar-primary: #f97316;
  --sidebar-primary-foreground: #fafafa;
  --sidebar-ring: #f97316;
  
  /* Brand */
  --color-coral: #f97316;
  --color-navy: #09090b;
  --color-charcoal: #18181b;
  --color-cream: #fafafa;
  --color-warm-gray: #a1a1aa;
  --color-amber: #fbbf24;
  --color-teal: #2dd4bf;
}
```

---

*Last updated: April 2026*
