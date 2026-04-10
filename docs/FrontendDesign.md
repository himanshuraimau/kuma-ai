# Kuma Station — AI Workspace Landing Page Prompt
> Enhanced with 2025 design research: floating pill navbar, bento grid, micro-interactions, glassmorphism 2.0

---

## PRODUCT CONTEXT

This is NOT a chatbot. This is an **advanced AI workspace appliance**.

The product:
- Reads and understands long documents (PDFs, papers, codebases)
- Maintains persistent memory across sessions
- Performs complex reasoning and multi-step tasks
- Extracts, summarizes, and structures information
- Acts as an AI assistant + agent — not just chat
- Supports multi-modal inputs (text, files, links)

Positioning: **"Your thinking system. Not just an AI."**
Comparable to: ChatGPT + Notion + Perplexity + AI Agents — unified.

---

## DESIGN SYSTEM (STRICT — DO NOT DEVIATE)

### Color Tokens
```
--bg-base:       #09090b   /* page background */
--bg-surface:    #18181b   /* card / panel surface */
--bg-elevated:   #1c1c1f   /* subtle elevation */
--border:        #27272a   /* default borders */
--border-glow:   #f9731640 /* orange glow border on hover */
--accent:        #f97316   /* primary orange */
--accent-amber:  #f59e0b   /* secondary amber */
--accent-glow:   rgba(249,115,22,0.15) /* diffuse glow */
--text-primary:  #fafafa
--text-muted:    #a1a1aa
--text-dim:      #52525b
--error:         #ef4444
--success:       #22c55e
```

### Typography
```
Display (hero):    72px / bold / tracking-tight / line-height 1.05
Heading H2:        40px / semibold / tracking-tight
Heading H3:        22px / medium
Body:              16px / regular / line-height 1.7
Caption:           13px / regular / --text-muted

Font stack: "Geist", "Inter", system-ui  (no Arial, no Roboto)
Accent font for logo: "Space Grotesk" or "Outfit" — bold weight only
```

### Glassmorphism Rules (2025 version)
```
Glass card:
  background: rgba(24, 24, 27, 0.6)
  backdrop-filter: blur(16px) saturate(180%)
  border: 0.5px solid rgba(255,255,255,0.08)
  border-radius: 16px

Glass hover:
  border-color: rgba(249,115,22,0.3)
  box-shadow: 0 0 24px rgba(249,115,22,0.08)

Transparency cap: max 30–40% opacity on fills
Always ensure WCAG AA text contrast on glass surfaces
```

### Spacing & Grid
```
Base unit:    4px
Page padding: clamp(16px, 5vw, 80px)
Section gap:  120px vertical
Card gap:     16px
Max-width:    1280px centered
```

### Motion
```
Transition default: 200ms cubic-bezier(0.4, 0, 0.2, 1)
Hover lift:         translateY(-2px)
Card hover shadow:  0 8px 32px rgba(249,115,22,0.12)
Page load:          staggered fade-up (60ms delay per element)
Blob animation:     slow drift, 8–12s infinite alternate ease-in-out
```

---

## NAVBAR — FLOATING PILL (CRITICAL REQUIREMENT)

This is the MOST IMPORTANT styling decision. Implement exactly as described:

```
Structure:
  [Logo + Name]  |  [Nav Links]  |  [CTA Button]

Position: fixed, top: 24px, left: 50%, transform: translateX(-50%)
Width: fit-content, min-width: 700px, max-width: 90vw
z-index: 9999

Pill styling:
  background: rgba(9, 9, 11, 0.75)
  backdrop-filter: blur(20px) saturate(200%)
  border: 0.5px solid rgba(255,255,255,0.10)
  border-radius: 9999px (full pill)
  padding: 8px 8px 8px 20px
  box-shadow: 0 4px 32px rgba(0,0,0,0.4), 0 0 0 0.5px rgba(255,255,255,0.04)

On scroll (JS class toggle after 60px):
  background: rgba(9, 9, 11, 0.92)
  box-shadow: 0 8px 40px rgba(0,0,0,0.6)

Logo section:
  Font: accent font, 16px, bold
  Color: #fafafa
  Dot or icon accent in --accent color

Nav links (center):
  Font: 14px, --text-muted
  Gap: 32px
  Hover: color → #fafafa, transition 150ms
  Active: color → #fafafa, tiny orange underline dot

CTA Button (right, inside pill):
  "Get Started"
  background: #f97316
  color: #09090b (dark text for contrast)
  border-radius: 9999px
  padding: 8px 20px
  font-size: 14px, font-weight: 600
  hover: background #ea6c0a, box-shadow 0 0 16px rgba(249,115,22,0.4)

Mobile (< 768px):
  Pill collapses to logo + hamburger icon
  Menu slides down below pill as a glass dropdown card
```

---

## PAGE SECTIONS

### 1. HERO SECTION

**Announcement pill** (above headline):
```
[✦ New] Kuma Station 2.0 — Now with persistent memory  →
Pill shape, border: 1px solid --border, bg: --bg-surface
Small arrow chevron on right. Subtle shimmer animation on the border.
```

**Headline:**
```
Think faster.
Understand everything.
```
- 72px, bold, `line-height: 1.05`
- "everything." → gradient text: `linear-gradient(135deg, #f97316, #f59e0b)`
- No outline, no stroke — pure gradient fill

**Subtext:**
```
AI that reads, remembers, and reasons across everything you give it.
Not a chatbot. A thinking system built for depth.
```
- 18px, --text-muted, max-width: 520px, centered

**CTAs (row, centered):**
```
Primary: "Get Started Free"
  → Orange pill button, 48px height, glow on hover

Secondary: "Watch Demo  ▶"
  → Ghost button, border: 1px solid --border
  → Hover: border becomes orange, slight background tint
```

**Hero Visual (below CTAs):**
```
Floating glass card mockup of the chat interface:
  - File upload indicator (PDF chip with filename)
  - Long AI response with structured markdown output
  - Memory indicator badge ("Remembering 47 notes...")
  - Typing cursor animation

Card has: glass styling, subtle orange glow on bottom edge
Slight perspective tilt: rotateX(4deg) on desktop
Floating animation: subtle 6px translateY oscillation, 4s ease infinite
```

**Background:**
```
Two large gradient blobs:
  Blob 1 (top-left): radial-gradient, orange #f97316 at 5% opacity, 600px diameter
  Blob 2 (bottom-right): radial-gradient, amber #f59e0b at 4% opacity, 500px diameter
  Animation: slow drift 10s infinite alternate ease-in-out

Dot grid overlay:
  background-image: radial-gradient(circle, #27272a 1px, transparent 1px)
  background-size: 32px 32px
  opacity: 0.6
  Mask: fade out toward edges
```

---

### 2. TRUST / SOCIAL PROOF BAR

```
Layout: horizontal scrolling marquee (infinite, 30s)
Content: minimal text badges or logo marks

Text: "Trusted by students, engineers, and researchers"
  → 13px, --text-muted, centered above marquee

Marquee items (6–8 items, looped):
  "500K+ documents processed"
  "10M+ tokens reasoned"
  "99.9% uptime"
  [University badge]  [Research badge]  [Developer badge]
  Each item: glass pill, 13px, --text-dim, border: --border
```

---

### 3. CORE FEATURES — BENTO GRID LAYOUT

> **Use a CSS bento grid — NOT equal-column card grid.**
> Mix card sizes for visual rhythm. This is a 2025 pattern.

```
Grid layout (desktop):
  Row 1: [Large card 2/3 width] [Small card 1/3 width]
  Row 2: [Small card 1/3 width] [Large card 2/3 width]
  Row 3: [Medium card 1/2] [Medium card 1/2]

All cards: glass styling, 16px radius, 24px padding
Icon: 20px, orange, inside a 36px dark circle bg
Title: 16px, semibold, --text-primary
Body: 14px, --text-muted, line-height 1.6
Hover: translateY(-2px), border glows orange
```

Feature cards:

**F1 — Long Context Understanding (large card)**
```
Icon: document stack
Title: "Understands everything you give it"
Body: "Upload entire PDFs, books, codebases, or research papers.
Kuma reads the full context — not just a chunk."
Visual: mini file list UI inside card (PDF chips stacked)
```

**F2 — Memory System (small card)**
```
Icon: brain / network
Title: "Persistent Memory"
Body: "Remembers across every session. Builds on what it knows."
Visual: memory graph dots
```

**F3 — Multi-Modal Input (small card)**
```
Icon: layers
Title: "Text, files, links — unified"
Body: "One interface. Every input type."
```

**F4 — Agent Capabilities (large card)**
```
Icon: lightning bolt
Title: "Doesn't just answer. Executes."
Body: "Multi-step tasks, automated workflows, tool use —
Kuma acts, not just responds."
Visual: step pipeline UI (3 steps connected by arrows)
```

**F5 — Structured Output**
```
Icon: table / layout
Title: "Output that's actually useful"
Body: "Notes, summaries, timelines, tables — not walls of text."
```

**F6 — Speed & Efficiency**
```
Icon: gauge
Title: "Faster than your current stack"
Body: "Response latency optimized. No waiting around."
```

---

### 4. PRODUCT DEMO — SPLIT SECTION

```
Layout: 50/50 split, max-width 1280px

Left: Interactive UI preview
  - Glass card mimicking the actual product interface
  - Show: file upload → processing indicator → structured output
  - Tabs at top: "Chat" | "Memory" | "Agent"
  - Active tab has orange underline
  - Content: realistic markdown response with headers + bullets

Right: Explanation
  H2: "See how deep it goes"
  Body: 3-step explanation with numbered list
    1. Drop in any file or paste any link
    2. Kuma reads, reasons, and structures the response
    3. Get notes, summaries, or action plans — instantly
  CTA: "Try it yourself →" (text link, orange)

Background accent: large blurred orange blob behind the left card
```

---

### 5. USE CASES — GRID

```
2×2 grid on desktop, 1-col on mobile
Each cell: glass card with left orange accent border (4px)

[Students]
  Icon: book
  "Study smarter"
  "Summarize lectures, extract key concepts, build revision notes."

[Developers]
  Icon: code brackets
  "Understand any codebase"
  "Paste repos, ask architecture questions, get docs generated."

[Researchers]
  Icon: microscope
  "Navigate papers fast"
  "Upload 50 papers. Ask cross-paper questions. Find patterns."

[Professionals]
  Icon: briefcase
  "Automate knowledge work"
  "Contracts, reports, decks — read, summarize, extract action items."
```

---

### 6. HOW IT WORKS — 3-STEP

```
Layout: horizontal stepper on desktop, vertical on mobile

Step connector: dashed orange line between steps

Step 1: INPUT
  Icon: upload arrow in orange circle
  Title: "Give Kuma anything"
  Body: "Chat, file upload, paste a link — any format works."

Step 2: PROCESS
  Icon: spinning nodes / brain
  Title: "Deep reasoning kicks in"
  Body: "Long context, memory lookup, multi-step thinking."

Step 3: OUTPUT
  Icon: structured document
  Title: "Get structured insights"
  Body: "Not a wall of text. Clean notes, summaries, workflows."
```

---

### 7. AUTH SCREENS

All auth screens are **standalone pages** (routes: /login, /signup, /forgot-password).

**Shared layout:**
```
Full-screen dark bg (#09090b)
Dot grid overlay (same as hero, subtler)
Centered glass card: 420px wide, 48px radius, glass styling
Orange blob behind card (blurred, low opacity)
Logo + product name at top of card
```

#### Login Page (/login)
```
Fields:
  Email input
  Password input (with show/hide toggle eye icon)

Inputs:
  bg: #18181b
  border: 1px solid #27272a
  border-radius: 12px
  padding: 12px 16px
  color: #fafafa
  placeholder: --text-dim
  focus: border-color #f97316, box-shadow 0 0 0 3px rgba(249,115,22,0.15)

Primary CTA: "Sign in"
  Full width, orange, pill, 48px height
  hover glow: box-shadow 0 0 20px rgba(249,115,22,0.35)

Divider: "or continue with"
  Left line / text / right line — #27272a color

Google OAuth button:
  "Continue with Google"
  bg: #18181b, border: 1px solid #27272a
  Google logo SVG on left
  Full width, 48px, rounded-xl

Bottom link: "Don't have an account? Sign up →" — orange text link

Error state:
  Border → #ef4444
  Small error text below field, 12px, red
```

#### Signup Page (/signup)
```
Fields: Full Name, Email, Password, Confirm Password
Password strength meter (4-bar indicator, orange when strong)
Terms checkbox: "I agree to the Terms and Privacy Policy"
  Checkbox: custom orange when checked
CTA: "Create Account" — same orange pill button
Bottom: "Already have an account? Sign in →"
```

#### Forgot Password (/forgot-password)
```
Headline: "Reset your password"
Subtext: "Enter your email and we'll send a reset link."
Single email field
CTA: "Send Reset Link"
Back link: "← Back to sign in"
```

---

### 8. PRICING SECTION

```
Toggle: [Monthly] [Annual — save 20%] → pill toggle, active side orange

2-column card layout (Free | Pro)
Pro card: highlighted with orange border (2px), "Most popular" badge

Free card:
  $0/month
  Features list (4 items) with gray checkmarks
  CTA: "Get started" (ghost button)

Pro card:
  $19/month ($15 if annual)
  Features list (8 items) with orange checkmarks
  One feature highlighted: "Unlimited memory" → small orange badge
  CTA: "Start free trial" (orange pill button, glow)

Feature comparison is kept SHORT — no giant table.
```

---

### 9. FINAL CTA SECTION

```
Background: subtle radial glow, orange, center of section
Centered text layout, max-width 600px

Eyebrow: "Start today" — small orange label, uppercase, 12px, letter-spacing 2px

H2: "Build your thinking system"
  Gradient text on "thinking system"

Body: "Join thousands of researchers, developers, and students
who think deeper with Kuma."

CTA: "Get Started Free →" — large orange pill, 52px height, prominent glow
Secondary: "No credit card required" — 13px, --text-dim
```

---

### 10. FOOTER

```
Layout: 4-column grid (logo col | product links | company links | legal)
Separator: 0.5px border-top --border

Logo + tagline: "Your thinking system."
--text-muted tagline

Link columns (14px, --text-muted, hover → #fafafa):
  Product: Features, Pricing, Demo, Changelog
  Company: About, Blog, Careers, Press
  Legal: Privacy, Terms, Cookie Policy

Bottom bar (flex, space-between):
  Left: "© 2025 Kuma Station. All rights reserved."
  Right: GitHub icon | Twitter/X icon | Discord icon
  All icons: 16px, --text-dim, hover → --accent

No heavy borders. No colored backgrounds. Minimal and dark.
```

---

## COMPONENT ARCHITECTURE

```
src/
  components/
    layout/
      Navbar.jsx          ← floating pill navbar
      Footer.jsx
    sections/
      Hero.jsx
      TrustBar.jsx
      Features.jsx        ← bento grid
      ProductDemo.jsx
      UseCases.jsx
      HowItWorks.jsx
      Pricing.jsx
      FinalCTA.jsx
    auth/
      LoginForm.jsx
      SignupForm.jsx
      ForgotPassword.jsx
    ui/
      GlassCard.jsx       ← reusable glass card
      OrangeButton.jsx    ← primary CTA button
      InputField.jsx      ← dark input with focus ring
      AnnouncementPill.jsx
      BentoGrid.jsx
      StepConnector.jsx
  pages/
    index.jsx             ← main landing page
    login.jsx
    signup.jsx
    forgot-password.jsx
  styles/
    globals.css           ← CSS variables + base
    animations.css        ← blob, drift, fade-up
```

---

## INTERACTION SPEC

```
Navbar:
  Entrance: fade-in + translateY(-8px) on load, 400ms
  Scroll behavior: glass opacity increases, shadow deepens

Hero:
  Staggered load: pill → headline → subtext → CTAs → card
  Each element: opacity 0 → 1, translateY 16px → 0
  Delay increment: 80ms per element

Cards (all):
  hover: translateY(-2px), 200ms ease
  hover border: rgba(249,115,22,0.3), 200ms
  hover shadow: 0 8px 32px rgba(249,115,22,0.10)

Buttons:
  Primary: hover glow + slight scale(1.02), active scale(0.98)
  Secondary: border color transitions to --accent

Marquee (trust bar):
  CSS-only scroll: animation: scroll 30s linear infinite
  Pause on hover

Pricing toggle:
  Smooth text + price crossfade on switch, 200ms

Blob background:
  CSS keyframes: translate + scale drift, 10–12s, ease-in-out, infinite alternate
```

---

## RESPONSIVE BREAKPOINTS

```
Mobile first. Then layer up.

< 640px (mobile):
  Hero: 40px headline, single-col CTAs
  Navbar: pill collapses → logo + hamburger
  Features: single column stack
  Auth: full-width card, 16px padding

640–1024px (tablet):
  Features: 2-col grid
  Demo: stacked (visual on top, text below)

> 1024px (desktop):
  Full bento grid, split layouts, full pill navbar
```

---

## OUTPUT REQUIREMENTS

- **Stack:** React + Tailwind CSS (no inline styles unless dynamic)
- **No placeholder text.** All copy is production-ready as written above.
- **No Lorem Ipsum.** Use the exact headlines, body copy, and labels specified.
- **Icons:** Use `lucide-react` for all icons. No emoji as icons.
- **Fonts:** Load from Google Fonts or use system font with CSS variable.
- **Animations:** Pure CSS for blobs/marquee. Framer Motion for card hover + page load if available, else CSS transitions.
- **Accessibility:**
  - All inputs have `<label>` (visually hidden ok)
  - Color contrast WCAG AA minimum
  - Focus rings visible on keyboard nav
  - `aria-label` on icon-only buttons
- **Performance:**
  - No external image dependencies (use CSS/SVG for visuals)
  - Blur backdrop-filter only on elements that need it (not whole page)

---

## TONE REMINDERS

- No marketing fluff. Every word earns its place.
- "Thinking system" > "AI assistant"
- Feature names are action-oriented, not buzzword-filled.
- Copy is sharp, not salesy.

---

*Prompt version: v2.1 — research-backed, 2025 design principles applied*
*Floating pill navbar added per spec. Bento grid replaces equal-column cards.*
*Glassmorphism 2.0: transparency capped at 30–40%, blur limited to key components.*
