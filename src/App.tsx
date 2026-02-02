import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import Index from "./pages/Index";
import DeLoft from "./pages/DeLoft";
import Midsomer from "./pages/Midsomer";
import RomantischPakket from "./pages/RomantischPakket";
import Contact from "./pages/Contact";
import Blog from "./pages/Blog";
import BlogPostPage from "./pages/BlogPost";
import AdminLogin from "./pages/AdminLogin";
import AdminBlog from "./pages/AdminBlog";
import AdminBlogEditor from "./pages/AdminBlogEditor";
import NotFound from "./pages/NotFound";
import "@/i18n/config";

const queryClient = new QueryClient();

const App = () => (
    <HelmetProvider>
        <QueryClientProvider client={queryClient}>
            <TooltipProvider>
                <Toaster />
                <Sonner />
                <BrowserRouter>
                    <Routes>
                        {/* Dutch (default) - no prefix */}
                        <Route path="/" element={<Index />} />
                        <Route path="/de-loft" element={<DeLoft />} />
                        <Route path="/midsomer" element={<Midsomer />} />
                        <Route path="/romantisch-pakket" element={<RomantischPakket />} />
                        <Route path="/contact" element={<Contact />} />
                        <Route path="/blog" element={<Blog />} />
                        <Route path="/blog/:slug" element={<BlogPostPage />} />

                        {/* English - /en prefix */}
                        <Route path="/en" element={<Index />} />
                        <Route path="/en/the-loft" element={<DeLoft />} />
                        <Route path="/en/midsomer" element={<Midsomer />} />
                        <Route path="/en/romantic-package" element={<RomantischPakket />} />
                        <Route path="/en/contact" element={<Contact />} />
                        <Route path="/en/blog" element={<Blog />} />
                        <Route path="/en/blog/:slug" element={<BlogPostPage />} />

                        {/* French - /fr prefix */}
                        <Route path="/fr" element={<Index />} />
                        <Route path="/fr/le-loft" element={<DeLoft />} />
                        <Route path="/fr/midsomer" element={<Midsomer />} />
                        <Route path="/fr/forfait-romantique" element={<RomantischPakket />} />
                        <Route path="/fr/contact" element={<Contact />} />
                        <Route path="/fr/blog" element={<Blog />} />
                        <Route path="/fr/blog/:slug" element={<BlogPostPage />} />

                        {/* Admin routes */}
                        <Route path="/admin/login" element={<AdminLogin />} />
                        <Route path="/admin/blog" element={<AdminBlog />} />
                        <Route path="/admin/blog/new" element={<AdminBlogEditor />} />
                        <Route path="/admin/blog/edit/:id" element={<AdminBlogEditor />} />

                        {/* Catch-all 404 */}
                        <Route path="*" element={<NotFound />} />
                    </Routes>
                </BrowserRouter>
            </TooltipProvider>
        </QueryClientProvider>
    </HelmetProvider>
);

export default App;