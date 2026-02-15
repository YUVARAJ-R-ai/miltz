# Miltz™ — Developer Guide

A comprehensive guide to the Miltz website codebase, including animation customization, component architecture, and integration setup.

---

## 🛠️ Tech Stack

| Technology | Purpose |
|---|---|
| **Next.js 14** (App Router) | Framework, routing, image optimization |
| **React 18** | Component rendering, state management |
| **Tailwind CSS** | Utility-first styling, responsive design |
| **Framer Motion** | Scroll reveals, parallax transitions, hover effects |
| **Lucide React** | Premium SVG icons |
| **CSS Keyframes** | Lightweight continuous animations (orbs, grain) |

---

## 📂 Project Structure

```
miltz/
├── app/
│   ├── page.js              # Homepage — assembles all sections, product data
│   ├── layout.js            # HTML shell, fonts, CursorGlow
│   ├── globals.css           # Tailwind + custom animations + slider styles
│   └── api/
│       └── submit-order/
│           └── route.js      # Order form → Google Sheets proxy
├── components/
│   ├── Hero.js               # Parallax hero section (3 layers)
│   ├── CursorGlow.js         # Golden cursor follow effect
│   ├── Navbar.js             # Fixed navbar with Order Now button
│   ├── ProductCarousel.js    # Carousel container with auto-scroll toggle
│   ├── ProductSpotlight.js   # Individual product card + quantity slider
│   ├── OrderForm.js          # Modal order form
│   ├── BrandShowcase.js      # Stats & services section
│   ├── BrandStory.js         # Brand narrative section
│   └── Footer.js             # Footer with social links
├── public/images/            # All static images
├── tailwind.config.js        # Brand colors, fonts, custom utilities
├── next.config.mjs           # Image optimization settings
└── package.json              # Dependencies & scripts
```

---

## 🎬 Hero Parallax — Animation Customization

The hero section uses a **push-down architecture** with two sections in normal document flow. The "New Launch" section expands from `height: 0` → `100vh`, naturally pushing the hero text section down.

### Configuration Constants

All timing values are at the **top of `components/Hero.js`**:

```js
LOAD_WAIT = 3000              // ms AFTER window.load before triggering

BG_DURATION = 1.8             // background reveal speed (slowest)
BG_DELAY = 0                  // background start delay
SUBJECT_DURATION = 1.4        // product reveal speed
SUBJECT_DELAY = 0.2           // product delay after bg
FG_DURATION = 1.0             // foreground reveal speed
FG_DELAY = 0.35               // foreground delay after bg

EXPAND_DURATION = 2.0         // section expansion speed (pushes hero down)

ZOOM_PULSE = [1, 1.04, 1]     // product scale breathing
ZOOM_DURATION = 8             // seconds per pulse cycle
FLOAT_Y = [-6, 0, -6]         // product vertical float (pixels)
FLOAT_DURATION = 6            // seconds per float cycle

MOUSE_SENSITIVITY = { x: 15, y: 10 }  // foreground mouse-follow strength
```

### How It Works

```
Page loads → Hero text visible ("Crunch That Brings People Together")
  └── New Launch section has height: 0 (invisible)

window.load fires → wait 3 seconds
  └── New Launch section expands from height: 0 → 100vh
  └── Hero text section is pushed DOWN naturally in the DOM
  └── Parallax layers reveal inside the expanding section:
      ├── Background: opacity 0→1 + scale 1.1→1 (1.8s)
      ├── Product: opacity 0→1 + y 60→0 (1.4s, 0.2s delay)
      └── Foreground: opacity 0→1 (1.0s, 0.35s delay)

After reveal:
  └── Post-transition text fades in ("New Launch", "Shop Now")
  └── Product: scale pulse + vertical float
  └── Foreground: mouse parallax tracking
```

### Mobile

Mobile **skips the parallax entirely**. Instead:
- Static product image with simple opacity fade-in
- No layers, no blur, no glow orbs, no film grain
- Lightweight and smooth on smartphones

### Layer Images

| Layer | Image Path | Z-Index | Purpose |
|---|---|---|---|
| Background | `/images/background.png` | 10 | Cinematic backdrop with edge gradients |
| Subject | `/images/transparent-hero-product.png` | 20 | Corn Puff packet (transparent PNG) |
| Foreground | `/images/corn_puff_scattered.png` | 25 | Scattered corn puffs for depth |

### Edge Gradients

The background image is blended into the dark theme using 4-edge gradients + a vignette overlay. These are defined inside the Layer 1 `<motion.div>`:

- **Bottom**: Most aggressive (h-48, `from-bg-primary via-bg-primary/60`)
- **Top**: Subtle (h-24, `from-bg-primary/80`)
- **Left/Right**: Side fades (w-32, `from-bg-primary/70`)
- **Vignette**: Radial gradient overlay (defined in `globals.css`)

---

## 🌟 Cursor Glow

The golden cursor-follow effect is in `components/CursorGlow.js`.

| Parameter | Current Value | Effect |
|---|---|---|
| `opacity` | `0.12` | Overall glow intensity |
| Center alpha | `0.8` | Brightness of the glow center |
| Mid-range alpha | `0.35` | Spread of the glow |
| Size | `500px × 500px` | Radius of the glow circle |

> **Note**: The glow is disabled on touch devices (`returns null`).

---

## 🛒 Product System

### Data Structure (`app/page.js`)

```js
{
  id: 1,
  title: "Puff Corn",
  shortTitle: "Puff Corn",
  category: "Signature Snack",
  flavor: "Light & Crispy Goodness",
  tagline: "The crunch that never stops.",
  image: "/images/product-list-puff_corn.png",
  pricing: [                              // ← Optional. Only for products with pricing
    { label: "Bulk 1kg", size: "1kg", price: 170 },
    { label: "15g Pack", size: "15g", price: 5 },
    { label: "30g Pack", size: "30g", price: 10 },
    { label: "60g Pack", size: "60g", price: 60 },
  ],
  idealFor: ["Movie marathons", "After-school snacking", ...],
  freeFrom: ["Artificial Preservatives", "Trans Fats", ...],
}
```

### Quantity Slider

Products with a `pricing` array get an interactive quantity slider:
- **SKU pills**: One per pricing entry (e.g., "Bulk 1kg", "15g Pack")
- **Range slider**: 1–100 quantity selection with +/- buttons
- **Dynamic total**: `quantity × price = ₹total` updates in real-time

Products **without** `pricing` show a "Coming soon" placeholder.

### Carousel Auto-Scroll Toggle

The `ProductCarousel` component includes a Play/Pause button next to the dot indicators. When paused, manual navigation (arrows, dots) still works.

```js
const AUTO_SCROLL_INTERVAL = 6000; // ms between auto-scrolls (in ProductCarousel.js)
```

---

## 📝 Order Form & Google Sheets Integration

### Order Form Component

`components/OrderForm.js` — modal form with fields:
- Vendor Name*, Business Name*, Phone*, Email
- Product, SKU/Size, Quantity (auto-filled from product context)
- Delivery Address*, Notes

### API Route

`app/api/submit-order/route.js` — validates fields, proxies to Google Sheets.

### Google Sheets Setup

1. Create a Google Sheet named "Miltz Orders"
2. Add headers in Row 1:
   ```
   Timestamp | Vendor Name | Business Name | Phone | Email | Product | SKU | Quantity | Address | Notes
   ```
3. Go to **Extensions → Apps Script** and paste:
   ```js
   function doPost(e) {
     var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
     var data = JSON.parse(e.postData.contents);
     sheet.appendRow([
       data.timestamp || new Date().toISOString(),
       data.vendorName || '',
       data.businessName || '',
       data.phone || '',
       data.email || '',
       data.product || '',
       data.sku || '',
       data.quantity || '',
       data.address || '',
       data.notes || ''
     ]);
     return ContentService
       .createTextOutput(JSON.stringify({ success: true }))
       .setMimeType(ContentService.MimeType.JSON);
   }
   ```
4. Deploy → **New Deployment** → Type: Web App → Execute as: Me → Access: Anyone
5. Copy the generated URL
6. Create `.env.local` in the project root:
   ```
   GOOGLE_SCRIPT_URL=https://script.google.com/macros/s/YOUR_SCRIPT_ID/exec
   ```
7. Restart the dev server

> **Without the env variable**, orders log to the server console instead of Sheets.

---

## 🎨 Design Tokens

All brand colors and fonts are in `tailwind.config.js`:

| Token | Hex | Usage |
|---|---|---|
| `bg-primary` | `#14110F` | Main dark background |
| `bg-secondary` | `#1A1714` | Card/section backgrounds |
| `bg-surface` | `#1F1B17` | Elevated surfaces |
| `headline` | `#FAFAF5` | Headings, white text |
| `body-text` | `#D4CEC4` | Body paragraphs |
| `bronze` | `#B08A57` | Accent, borders |
| `gold` | `#D4A76A` | Highlights |
| `cta` | `#C1440E` | Call-to-action buttons |
| `cta-hover` | `#D85A22` | Button hover state |

**Fonts**: Montserrat (headings), Inter (body text).

---

## 🚀 Common Tasks

### Start Development
```bash
npm run dev        # Starts at http://localhost:3000
```

### Production Build
```bash
npm run build      # Creates optimized build
npm start          # Serves the build
```

### Add a New Product
1. Add image to `public/images/`
2. Add product object to the `products` array in `app/page.js`
3. Optionally add `pricing` array for the quantity slider

### Change Parallax Timing
Edit the constants at the top of `components/Hero.js` (lines 11–37).

### Adjust Cursor Glow
Edit opacity and gradient values in `components/CursorGlow.js`.

### Change Brand Colors
Edit `tailwind.config.js` → `theme.extend.colors`.

---

## ⚙️ Image Optimization

Configured in `next.config.mjs`:
- **Formats**: WebP, AVIF (automatic modern format delivery)
- **Device sizes**: 640, 750, 828, 1080, 1200, 1920
- **Image sizes**: 16, 32, 48, 64, 96, 128, 256, 384

All `<Image>` components use `next/image` for automatic optimization.

---

## 🔧 CSS Animations (`globals.css`)

Custom keyframes defined in the global stylesheet:

| Animation | Target | Effect |
|---|---|---|
| `orbBreathe1` | `.hero-orb-1` | Ambient light pulse |
| `orbBreathe2` | `.hero-orb-2` | Secondary ambient pulse |
| `glowCenter` | `.parallax-glow-center` | Post-parallax center glow |
| `glowRight` | `.parallax-glow-right` | Post-parallax accent glow |
| `productShadow` | `.parallax-product-shadow` | Product drop shadow pulse |

**Mobile optimizations**: Film grain uses `steps(4)` instead of `steps(8)` on mobile, and `prefers-reduced-motion` disables non-essential animations.
