# Sweet Bonihu — B&B Website

![Vite](https://img.shields.io/badge/Vite-5.x-646CFF?logo=vite&logoColor=white)
![React](https://img.shields.io/badge/React-18-61DAFB?logo=react&logoColor=black)
![TypeScript](https://img.shields.io/badge/TypeScript-5.x-3178C6?logo=typescript&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/TailwindCSS-3.x-38B2AC?logo=tailwindcss&logoColor=white)
![shadcn/ui](https://img.shields.io/badge/shadcn%2Fui-Radix-black)
![Vitest](https://img.shields.io/badge/Vitest-Tested-6E9F18?logo=vitest)
![License](https://img.shields.io/badge/License-Private-red)

A modern, multilingual web application developed for **Sweet Bonihu B&B**, built with React, Vite, TypeScript, and Tailwind CSS. The platform provides a seamless booking experience and includes an integrated administrative panel for blog and content management.

## Table of Contents

- [Features](#features)
- [Architecture & Tech Stack](#architecture--tech-stack)
- [SEO & Internationalization](#seo--internationalization)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
- [Available Scripts](#available-scripts)
- [Testing](#testing)
- [License](#license)

## Features

- **Public-Facing Application:** Dedicated pages for B&B rooms (Loft & Midsomer) and packages (Romantic Package).
- **Multilingual Support:** Fully supported English, French, and Dutch localizations with SEO-friendly routing.
- **Admin Interface:** Secure blog management panel with a Markdown-based editor.
- **Search Engine Optimization:** Server-side elements, generated sitemaps, and optimized metadata for enhanced discoverability.
- **Responsive Design:** Fully responsive modern UI optimized for all devices.

## Architecture & Tech Stack

### Core Technologies
- **Framework:** React 18, Vite 5
- **Language:** TypeScript
- **Routing:** React Router DOM

### Styling & UI
- **Styling:** Tailwind CSS
- **Component Library:** shadcn/ui, Radix UI
- **Icons & Animations:** Lucide Icons, Framer Motion, Tailwind Animate

### State Management & Forms
- **Data Fetching:** @tanstack/react-query
- **Form Handling:** React Hook Form
- **Validation:** Zod, @hookform/resolvers

### Utilities
- **Content:** @uiw/react-md-editor
- **Internationalization:** i18next, react-i18next
- **Analytics:** Recharts

## SEO & Internationalization

### Routing Configuration
The application utilizes language-prefixed routes to optimize SEO and ensure clear content separation. This approach allows for:
- Separate indexing per language.
- Clean, human-readable URLs.
- Full compatibility with `hreflang` attributes.

Example routing configuration:
```text
/                      # Default (Dutch)
/en/loft               # English - Loft Room
/fr/midsomer           # French - Midsomer Room
/en/romantic-package   # English - Package
```

### Search Engine Indexing
Essential SEO infrastructure is pre-configured:
- **`robots.txt`**: Controls crawler access and references the sitemap.
- **`sitemap.xml`**: Lists all public, indexable routes, explicitly including language-specific URLs.
- **Static Pre-rendering**: Facilitated via Puppeteer for optimized search engine crawling and Core Web Vitals performance.

## Project Structure

```text
src/
├── assets/         # Static assets and images
├── components/     # Reusable UI components and layout structures
├── data/           # Static data and configurations
├── hooks/          # Custom React hooks
├── i18n/           # Internationalization configuration
├── lib/            # Utility functions and shared library code
├── locales/        # Translation JSON files (en, fr, nl)
├── pages/          # Application routes and page components
├── test/           # Test setup and configuration
├── App.css         # Global stylesheet
├── App.tsx         # Root application component
├── index.css       # Tailwind entry point
├── main.tsx        # Application entry point
└── vite-env.d.ts   # Vite environment definitions
```

## Getting Started

### Prerequisites
- Node.js (v18 or higher recommended)
- npm or yarn

### Installation

1. Clone the repository and install dependencies:
```bash
npm install
```

2. Configure environment variables:
Create a `.env` file in the root directory and securely add your Firebase credentials:
```env
VITE_FIREBASE_API_KEY=your_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_auth_domain
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_storage_bucket
VITE_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
VITE_FIREBASE_APP_ID=your_app_id
VITE_FIREBASE_MEASUREMENT_ID=your_measurement_id
```

3. Start the development server:
```bash
npm run dev
```
The application will be accessible at `http://localhost:8080` (or another available port).

## Available Scripts

| Command | Description |
|---|---|
| `npm run dev` | Start the development server. |
| `npm run build` | Build the application for production. |
| `npm run build:dev` | Build the application in development mode. |
| `npm run preview` | Locally preview the production build. |
| `npm run lint` | Run ESLint to analyze code quality. |
| `npm run test` | Execute the test suite once. |
| `npm run test:watch` | Execute the test suite in watch mode. |

## Testing

The project utilizes Vitest and Testing Library for unit and component testing.

To run the test suite:
```bash
npm run test
```

For continuous testing during development:
```bash
npm run test:watch
```

## License

This project is **private** and developed exclusively for **Sweet Bonihu B&B**. All rights reserved.
