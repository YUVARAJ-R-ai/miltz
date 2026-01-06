# Miltz Project Guide

## 🛠️ Tech Stack

This project is built with a modern, performance-focused stack designed for cinematic visuals.

- **Framework**: [Next.js 14 (App Router)](https://nextjs.org/)
  - The latest standard for React applications.
  - Uses Server Components by default for performance.
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
  - Utility-first CSS for rapid styling.
  - Custom brand colors are defined in `tailwind.config.js`.
- **Animations**:
  - **[Framer Motion](https://www.framer.com/motion/)**: Used for complex UI interactions (scroll reveals, hover effects, page transitions).
  - **[React Three Fiber](https://docs.pmnd.rs/react-three-fiber)**: Used for the 3D Hero section (rendering the popcorn bucket).
  - **CSS Keyframes**: Used for lightweight, continuous animations (like floating particles).

---

## 📂 File Structure & Navigation

Here is where everything lives and where you should go to make changes.

### 1. The Core (`/app`)
This directory handles routing and the main page layout.

- **`app/page.js`**: **The Homepage**.
  - This is the main file you see when you load the site.
  - It assembles all the components (`Hero`, `TheatreSection`, etc.).
  - **Edit this to:** Change the order of sections, update the **Product Data** list (names, flavors, images), or add new sections.
- **`app/layout.js`**: **The Shell**.
  - Contains the `<html>` and `<body>` tags.
  - Sets up the Fonts (Montserrat & Inter).
  - **Edit this to:** Change the site title/metadata or add global providers.
- **`app/globals.css`**: **Global Styles**.
  - Contains Tailwind directives.
  - Defines custom animations (like the `float` keyframes).
  - **Edit this to:** Add global CSS rules or custom utility classes.

### 2. The Building Blocks (`/components`)
These are the reusable pieces of your website.

- **`Hero.js`**: The top section with the "CRUNCH. MUNCH. SMILE." text. It imports the 3D scene.
- **`Scene3D.js`**: The 3D logic. It sets up the 3D Canvas, lighting, and renders the Popcorn Bucket model.
- **`ProductCard.js`**: The individual cards for each snack.
  - Contains the logic for the **3D Tilt** and **Shake** animations.
- **`TheatreSection.js`**: The dark "Coming Soon" section with the spotlight and dust particles.
- **`BrandStory.js`**: The section with the lifestyle image and brand text.
- **`Navbar.js`** & **`Footer.js`**: The navigation bar and footer.

### 3. Configuration & Assets

- **`tailwind.config.js`**: **The Design System**.
  - Defines your custom colors (`miltz-red`, `miltz-yellow`, etc.).
  - Defines your font families.
  - **Edit this to:** Change the brand color palette or add new spacing/breakpoints.
- **`public/images/`**: **Images**.
  - Stores all your static images.
  - **Action:** Drop new images here to use them in your site (reference them as `/images/filename.jpg`).

---

## 🚀 Common Tasks

### How do I add a new product?
1. Open `app/page.js`.
2. Find the `products` array constant.
3. Add a new object to the list with the `id`, `title`, `flavor`, `accentColors`, and `image` path.

### How do I change the brand colors?
1. Open `tailwind.config.js`.
2. Modify the hex codes under `theme.extend.colors.miltz`.

### How do I change the 3D model?
1. Place your `.glb` or `.gltf` file in `public/models/` (create the folder if needed).
2. Open `components/Scene3D.js`.
3. Use the `useGLTF` hook from `@react-three/drei` to load your model instead of the placeholder shapes.

### How do I adjust the animations?
- **UI Animations**: Check the `motion.div` tags in the relevant component (e.g., `Hero.js`). Adjust `duration`, `delay`, or `ease` props.
- **3D Animations**: Check `Scene3D.js` (e.g., `autoRotateSpeed` on `OrbitControls`).
