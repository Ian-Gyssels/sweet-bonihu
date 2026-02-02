# 🌿 Sweet Bonihu — B&B Website

![Vite](https://img.shields.io/badge/Vite-5.x-646CFF?logo=vite\&logoColor=white)
![React](https://img.shields.io/badge/React-18-61DAFB?logo=react\&logoColor=black)
![TypeScript](https://img.shields.io/badge/TypeScript-5.x-3178C6?logo=typescript\&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/TailwindCSS-3.x-38B2AC?logo=tailwindcss\&logoColor=white)
![shadcn/ui](https://img.shields.io/badge/shadcn%2Fui-Radix-black)
![Vitest](https://img.shields.io/badge/Vitest-Tested-6E9F18?logo=vitest)
![License](https://img.shields.io/badge/License-Private-red)

Modern, multilingual B&B website for **Sweet Bonihu**, built with **React**, **Vite**, **TypeScript**, and **Tailwind
CSS**.
The site showcases rooms, packages, blog content, and includes an **admin panel for blog management**.

---

## ✨ Features

* 🏡 Public website for B&B Sweet Bonihu
* 🛏️ Dedicated room pages

    * **Loft** (Wellness room)
    * **Midsomer** (Business room)
* 💕 Romantic package page
* 📝 Blog with Markdown-based content
* 🔐 Admin interface for blog management
* 🌍 Multilingual support with SEO-friendly URLs
* 🤖 Search-engine optimized crawling & indexing
* ⚡ Fast development & build with Vite
* 🎨 Modern UI using shadcn/ui + Radix UI
* 📱 Fully responsive design
* 🧪 Unit & component testing with Vitest

---

## 📄 Pages

* **Home**
* **Loft** – Wellness room
* **Midsomer** – Business room
* **Romantic Package**
* **Contact**
* **Blog**
* **Admin** – Blog management (protected)

---

## 🌍 SEO-Optimized Multilingual Routing

The website uses **language-prefixed routes** to ensure optimal SEO and clear content separation per language.

### Examples

```txt
# Dutch
/
/loft
/midsomer
/romantic-package
/blog

# English
/en
/en/loft
/en/midsomer
/en/romantic-package
/en/blog

# French
/fr
/fr/loft
/fr/midsomer
/fr/romantic-package
/fr/blog
```

### Benefits

* ✅ Separate indexing per language
* ✅ Clean, human-readable URLs
* ✅ Fully compatible with `hreflang`
* ✅ Avoids duplicate content penalties
* ✅ Improves international discoverability

Routing is handled by **React Router DOM**, while language detection and translation are powered by **i18next**.

---

## 🤖 Search Engine Indexing

The project includes essential SEO infrastructure out of the box:

* ✅ **`robots.txt`**

    * Controls crawler access
    * Explicitly allows indexing of public pages
    * References the sitemap location

* ✅ **`sitemap.xml`**

    * Lists all public, indexable routes
    * Includes **language-specific URLs**
    * Helps search engines discover and crawl content efficiently

Together with pre-rendering and metadata management, this ensures optimal visibility in search engines.

---

## 🛠️ Tech Stack

### Core

* **React 18**
* **Vite 5**
* **TypeScript**
* **React Router DOM**

### UI & Styling

* **Tailwind CSS**
* **shadcn/ui**
* **Radix UI**
* **Lucide Icons**
* **Framer Motion**
* **Tailwind Animate**

### Forms & Validation

* **React Hook Form**
* **Zod**
* **@hookform/resolvers**

### State & Data

* **@tanstack/react-query**
* **date-fns**

### Blog & Content

* **@uiw/react-md-editor**
* **react-helmet-async**
* **Recharts** (admin analytics)

### Internationalization

* **i18next**
* **react-i18next**
* **i18next-browser-languagedetector**

### Testing

* **Vitest**
* **Testing Library**
* **JSDOM**

---

## 📦 Scripts

| Command              | Description              |
|----------------------|--------------------------|
| `npm run dev`        | Start development server |
| `npm run build`      | Production build         |
| `npm run build:dev`  | Development-mode build   |
| `npm run preview`    | Preview production build |
| `npm run lint`       | Run ESLint               |
| `npm run test`       | Run tests once           |
| `npm run test:watch` | Watch mode testing       |

---

## 🚀 Getting Started

### 1️⃣ Install dependencies

```bash
npm install
```

### 2️⃣ Start development server

```bash
npm run dev
```

App runs at:

```
http://localhost:8080
```

---

## 🔐 Admin Panel (Blog Management)

Admin functionality includes:

* Creating Markdown-based blog posts
* Editing & deleting posts

> Authentication & authorization is still static password for development purposes

---

## 🧱 Project Structure

```txt
src/
├── assets/
│   ├── hero-wellness.jpg
│   ├── og-image-default.jpg
│   ├── room-loft.jpg
│   └── room-midsomer.jpg
├── components/
│   ├── ui/                      # Shadcn UI components (48 files)
│   ├── About.tsx
│   ├── AdminSEO.tsx
│   ├── BlogCard.tsx
│   ├── Footer.tsx
│   ├── GoogleMap.tsx
│   ├── Header.tsx
│   ├── Hero.tsx
│   ├── LanguageSwitcher.tsx
│   ├── MarkdownEditor.tsx
│   ├── MarkdownRenderer.tsx
│   ├── NavLink.tsx
│   ├── RoomsPreview.tsx
│   ├── SEOHead.tsx
│   ├── StructuredData.tsx
│   └── Testimonials.tsx
├── data/
│   └── blogPosts.ts
├── hooks/
│   ├── use-mobile.tsx
│   ├── use-toast.ts
│   ├── useBlogPosts.ts
│   ├── useLanguageSync.ts
│   └── useLocalizedPath.ts
├── i18n/
│   └── config.ts
├── lib/
│   ├── blogStorage.ts
│   └── utils.ts
├── locales/
│   ├── en/translation.json
│   ├── fr/translation.json
│   └── nl/translation.json
├── pages/
│   ├── Index.tsx               # Home
│   ├── DeLoft.tsx              # Loft
│   ├── Midsomer.tsx            # Midsomer
│   ├── RomantischPakket.tsx    # Romantic Package
│   ├── Contact.tsx             # Contact
│   ├── Blog.tsx                # Blog listing
│   ├── BlogPost.tsx            # Blog detail
│   ├── AdminLogin.tsx          # Admin
│   ├── AdminBlog.tsx           # Admin
│   ├── AdminBlogEditor.tsx     # Admin
│   └── NotFound.tsx            # 404
├── test/
│   ├── example.test.ts
│   └── setup.ts
├── App.css
├── App.tsx
├── index.css
├── main.tsx
└── vite-env.d.ts

```

---

## 🧪 Testing

```bash
npm run test
npm run test:watch
```

---

## 📸 SEO & Performance Summary

* Static pre-rendering via **Puppeteer**
* Dynamic meta tags per page & language
* SEO-safe multilingual routing
* `robots.txt` & `sitemap.xml` included
* Optimized for performance, accessibility & Core Web Vitals

---

## 📄 License

This project is **private** and developed exclusively for **Sweet Bonihu B&B**.

---
