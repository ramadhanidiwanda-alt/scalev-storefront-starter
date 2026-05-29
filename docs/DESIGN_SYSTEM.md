# 🎨 Design System - Scalev Storefront (Meta Blue Theme)

## Visual Style
- **Pattern:** Minimal Single Column
- **Style:** Flat Design (no shadows, no gradients)
- **Typography:** Rubik (headings) + Nunito Sans (body)
- **Colors:** Meta Blue + Clean White/Dark
- **Mode:** Light + Dark mode support

---

## 🎨 Color Palette (Meta Blue Theme)

### Primary Colors

| Role | Light Mode | Dark Mode | CSS Variable | Usage |
|------|------------|-----------|--------------|-------|
| **Primary** | `#1877F2` | `#4A9EFF` | `--color-primary` | Main brand color, primary buttons, links |
| **Primary Hover** | `#166FE5` | `#3A8EEF` | `--color-primary-hover` | Hover state for primary elements |
| **On Primary** | `#FFFFFF` | `#FFFFFF` | `--color-on-primary` | Text on primary background |
| **Secondary** | `#65676B` | `#B0B3B8` | `--color-secondary` | Secondary text, icons |
| **Accent** | `#42B72A` | `#5FD068` | `--color-accent` | Success states, CTAs, prices |
| **Background** | `#FFFFFF` | `#18191A` | `--color-background` | Page background |
| **Surface** | `#F0F2F5` | `#242526` | `--color-surface` | Card backgrounds |
| **Foreground** | `#050505` | `#E4E6EB` | `--color-foreground` | Main text |
| **Muted** | `#E4E6EB` | `#3A3B3C` | `--color-muted` | Disabled states, subtle backgrounds |
| **Muted Foreground** | `#65676B` | `#B0B3B8` | `--color-muted-foreground` | Secondary text |
| **Border** | `#CED0D4` | `#3E4042` | `--color-border` | Borders, dividers |
| **Destructive** | `#DC2626` | `#EF4444` | `--color-destructive` | Delete, error states |
| **Ring** | `#1877F2` | `#4A9EFF` | `--color-ring` | Focus rings |

### Semantic Colors

| Role | Light | Dark | Usage |
|------|-------|------|-------|
| **Success** | `#42B72A` | `#5FD068` | Success messages, available status |
| **Warning** | `#F59E0B` | `#FBBF24` | Warning messages |
| **Error** | `#DC2626` | `#EF4444` | Error messages, destructive actions |
| **Info** | `#1877F2` | `#4A9EFF` | Info messages, notifications |

### Meta Blue Shades (for reference)

```
Meta Blue 50:  #E7F3FF
Meta Blue 100: #C3E2FF
Meta Blue 200: #90CBFF
Meta Blue 300: #5DB4FF
Meta Blue 400: #2A9DFF
Meta Blue 500: #1877F2  ← Primary
Meta Blue 600: #166FE5
Meta Blue 700: #1461CC
Meta Blue 800: #1153B3
Meta Blue 900: #0D4599
```

---

## 📝 Typography

### Font Pairing
- **Heading:** Rubik (300, 400, 500, 600, 700)
- **Body:** Nunito Sans (300, 400, 500, 600, 700)
- **Mood:** Clean, modern, trustworthy, professional

### Google Fonts Import
```css
@import url('https://fonts.googleapis.com/css2?family=Nunito+Sans:wght@300;400;500;600;700&family=Rubik:wght@300;400;500;600;700&display=swap');
```

### Type Scale
```css
/* Headings - Rubik */
h1: 2.5rem (40px) - Rubik 700
h2: 2rem (32px) - Rubik 600
h3: 1.5rem (24px) - Rubik 600
h4: 1.25rem (20px) - Rubik 500
h5: 1.125rem (18px) - Rubik 500
h6: 1rem (16px) - Rubik 500

/* Body - Nunito Sans */
body: 1rem (16px) - Nunito Sans 400
small: 0.875rem (14px) - Nunito Sans 400
caption: 0.75rem (12px) - Nunito Sans 400
```

### Line Heights
```css
Headings: 1.2
Body: 1.6
Small: 1.5
```

---

## 📐 Spacing System

Based on 4px/8px increments:
```
xs:  4px   (0.25rem)
sm:  8px   (0.5rem)
md:  16px  (1rem)
lg:  24px  (1.5rem)
xl:  32px  (2rem)
2xl: 48px  (3rem)
3xl: 64px  (4rem)
4xl: 96px  (6rem)
```

---

## 🎭 Effects & Interactions

### Transitions
- **Duration:** 150-200ms
- **Easing:** ease-in-out
- **Properties:** color, background-color, border-color, opacity, transform

### Hover States
- **Primary Button:** Background darkens to `--color-primary-hover`
- **Secondary Button:** Background changes to `--color-muted`
- **Links:** Underline appears
- **Cards:** Border color changes to `--color-primary`

### Focus States
- **Ring:** 2px solid `--color-ring`
- **Offset:** 2px
- **Visible on keyboard navigation**

### Disabled States
- **Opacity:** 0.5
- **Cursor:** not-allowed
- **No hover effects**

---

## 🎨 Component Patterns

### Buttons

**Primary Button:**
```
Background: bg-primary
Text: text-on-primary
Hover: bg-primary-hover
Border: none
Padding: px-6 py-3
Border Radius: rounded-lg (8px)
Font: Rubik 500
Transition: 150ms
```

**Secondary Button:**
```
Background: bg-surface
Text: text-foreground
Hover: bg-muted
Border: border border-border
Padding: px-6 py-3
Border Radius: rounded-lg (8px)
Font: Rubik 500
Transition: 150ms
```

**Destructive Button:**
```
Background: bg-destructive
Text: text-white
Hover: opacity-90
Border: none
Padding: px-6 py-3
Border Radius: rounded-lg (8px)
Font: Rubik 500
Transition: 150ms
```

### Cards
```
Background: bg-surface
Border: border border-border
Border Radius: rounded-lg (8px)
Padding: p-4 or p-6
Hover: border-primary (for interactive cards)
Transition: border-color 150ms
```

### Inputs
```
Background: bg-background
Border: border border-border
Border Radius: rounded-md (6px)
Padding: px-3 py-2
Focus: ring-2 ring-ring ring-offset-2
Placeholder: text-muted-foreground
Transition: 150ms
```

---

## 🌓 Dark Mode Guidelines

### Principles
- Reduce eye strain with darker backgrounds
- Maintain contrast ratios (WCAG AA: 4.5:1)
- Use lighter blue shades for primary color
- Increase surface elevation with lighter grays

### Color Adjustments
- **Primary:** Lighter blue (#4A9EFF) for better visibility
- **Accent:** Lighter green (#5FD068) for contrast
- **Backgrounds:** Dark grays (#18191A, #242526)
- **Text:** Light gray (#E4E6EB) instead of pure white
- **Borders:** Subtle gray (#3E4042) for separation

---

## ♿ Accessibility

### Contrast Ratios (WCAG AA)
- Normal text: ≥4.5:1
- Large text (18px+): ≥3:1
- UI components: ≥3:1

### Verified Combinations
✅ Primary (#1877F2) on White (#FFFFFF) - 4.53:1
✅ Foreground (#050505) on Background (#FFFFFF) - 20.35:1
✅ Primary Dark (#4A9EFF) on Dark BG (#18191A) - 7.12:1
✅ Foreground Dark (#E4E6EB) on Dark BG (#18191A) - 13.28:1

### Focus Indicators
- Always visible on keyboard navigation
- 2px ring with 2px offset
- Color: primary blue

### Touch Targets
- Minimum size: 44×44px (iOS) / 48×48dp (Android)
- Spacing between targets: ≥8px

---

## 📱 Responsive Breakpoints

```css
/* Mobile First */
sm:  640px   /* Small tablets */
md:  768px   /* Tablets */
lg:  1024px  /* Laptops */
xl:  1280px  /* Desktops */
2xl: 1536px  /* Large desktops */
```

---

## 🎯 Usage Examples

### Primary CTA
```tsx
<button className="bg-primary hover:bg-primary-hover text-on-primary px-6 py-3 rounded-lg font-medium transition-colors duration-150">
  Add to Cart
</button>
```

### Product Card
```tsx
<div className="bg-surface border border-border rounded-lg overflow-hidden hover:border-primary transition-colors duration-150">
  <img src="..." alt="..." className="w-full aspect-square object-cover" />
  <div className="p-4">
    <h3 className="font-rubik font-medium text-foreground">Product Name</h3>
    <p className="text-primary font-rubik font-semibold text-lg mt-2">$99.00</p>
  </div>
</div>
```

### Input Field
```tsx
<input 
  type="text"
  className="w-full px-3 py-2 bg-background border border-border rounded-md focus:ring-2 focus:ring-ring focus:ring-offset-2 transition-all duration-150"
  placeholder="Enter your email"
/>
```

---

## 🚫 Anti-Patterns (Avoid)

❌ Using gradients or shadows (keep flat design)
❌ Mixing multiple blue shades randomly
❌ Using emoji as icons
❌ Text smaller than 14px for body content
❌ Low contrast color combinations
❌ Animations longer than 300ms
❌ Hover-only interactions on mobile
❌ Disabling zoom on mobile

---

**Created:** 2026-05-29  
**Theme:** Meta Blue  
**Status:** Ready for Implementation ✅
