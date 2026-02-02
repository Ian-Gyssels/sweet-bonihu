import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import prerender from "@prerenderer/rollup-plugin";

// All 15 multilingual routes for SEO prerendering
const prerenderRoutes = [
    // Dutch (default) routes
    "/",
    "/de-loft",
    "/midsomer",
    "/romantisch-pakket",
    "/contact",
    "/blog",
    // English routes
    "/en",
    "/en/the-loft",
    "/en/midsomer",
    "/en/romantic-package",
    "/en/contact",
    "/en/blog",
    // French routes
    "/fr",
    "/fr/le-loft",
    "/fr/midsomer",
    "/fr/forfait-romantique",
    "/fr/contact",
    "/fr/blog",
];

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
    server: {
        host: "::",
        port: 8080,
        hmr: {
            overlay: false,
        },
    },
    plugins: [
        react(),
        mode === "production" &&
        prerender({
            routes: prerenderRoutes,
            renderer: "@prerenderer/renderer-puppeteer",
            rendererOptions: {
                renderAfterDocumentEvent: "DOMContentLoaded",
                timeout: 30000,
            },
            postProcess(renderedRoute) {
                // Ensure proper URL handling in generated HTML
                renderedRoute.html = renderedRoute.html
                    .replace(/http:/gi, "https:")
                    .replace(
                        /(https:\/\/)?(localhost|127\.0\.0\.1):\d*/gi,
                        "https://sweetbonihu.be"
                    );
            },
        }),
    ].filter(Boolean),
    resolve: {
        alias: {
            "@": path.resolve(__dirname, "./src"),
        },
    },
}));