import { useParams, Link, Navigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { ArrowLeft, Calendar } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { getCategoryLabel } from '@/data/blogPosts';
import { useLocalizedPath } from '@/hooks/useLocalizedPath';
import { useBlogPost, useBlogPosts } from '@/hooks/useBlogPosts';
import BlogCard from '@/components/BlogCard';
import MarkdownRenderer from '@/components/MarkdownRenderer';
import { Helmet } from 'react-helmet-async';
import { getLanguageFromPath, LanguageCode } from '@/i18n/config';
import { useLocation } from 'react-router-dom';

const BlogPostPage = () => {
    const { slug } = useParams<{ slug: string }>();
    const { t } = useTranslation();
    const { getPaths } = useLocalizedPath();
    const paths = getPaths();
    const location = useLocation();
    const currentLang = getLanguageFromPath(location.pathname) as LanguageCode;

    const { post, isLoading } = useBlogPost(slug);
    const { posts: allPosts } = useBlogPosts();

    if (isLoading) {
        return null;
    }

    if (!post) {
        return <Navigate to={paths.blog} replace />;
    }

    const formattedDate = new Date(post.date).toLocaleDateString('nl-BE', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    });

    // Get related posts (same category, excluding current)
    const relatedPosts = allPosts
        .filter(p => p.category === post.category && p.id !== post.id)
        .slice(0, 2);

    const baseUrl = 'https://sweetbonihu.be';
    const canonicalUrl = `${baseUrl}${paths.blog}/${post.slug}`;

    // Locale mappings for Open Graph
    const ogLocaleMap: Record<LanguageCode, string> = {
        nl: 'nl_BE',
        en: 'en_GB',
        fr: 'fr_FR',
    };

    return (
        <>
            <Helmet>
                <html lang="nl" />
                <title>{post.title} | Blog | Sweet Bonihu</title>
                <meta name="description" content={post.excerpt} />
                <link rel="canonical" href={canonicalUrl} />

                {/* Open Graph */}
                <meta property="og:title" content={`${post.title} | Sweet Bonihu`} />
                <meta property="og:description" content={post.excerpt} />
                <meta property="og:type" content="article" />
                <meta property="og:url" content={canonicalUrl} />
                <meta property="og:image" content={`${baseUrl}${post.image}`} />
                <meta property="og:locale" content={ogLocaleMap[currentLang]} />
                <meta property="article:published_time" content={post.date} />

                {/* Twitter */}
                <meta name="twitter:card" content="summary_large_image" />
                <meta name="twitter:title" content={`${post.title} | Sweet Bonihu`} />
                <meta name="twitter:description" content={post.excerpt} />
                <meta name="twitter:image" content={`${baseUrl}${post.image}`} />

                {/* Structured Data */}
                <script type="application/ld+json">
                    {JSON.stringify({
                        '@context': 'https://schema.org',
                        '@type': 'BlogPosting',
                        headline: post.title,
                        description: post.excerpt,
                        image: `${baseUrl}${post.image}`,
                        datePublished: post.date,
                        author: {
                            '@type': 'Organization',
                            name: 'Sweet Bonihu',
                        },
                        publisher: {
                            '@type': 'Organization',
                            name: 'Sweet Bonihu',
                            url: baseUrl,
                        },
                        mainEntityOfPage: {
                            '@type': 'WebPage',
                            '@id': canonicalUrl,
                        },
                    })}
                </script>
            </Helmet>

            <Header />

            <main className="pt-20">
                {/* Hero Image */}
                <section className="relative h-[40vh] md:h-[50vh] overflow-hidden">
                    <img
                        src={post.image}
                        alt={post.title}
                        className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-background/20 to-transparent" />
                </section>

                {/* Article Content */}
                <article className="container mx-auto px-6 -mt-20 relative z-10">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="max-w-3xl mx-auto"
                    >
                        {/* Back Button */}
                        <Link to={paths.blog}>
                            <Button variant="ghost" size="sm" className="mb-6">
                                <ArrowLeft className="w-4 h-4 mr-2" />
                                {t('blog.backToBlog')}
                            </Button>
                        </Link>

                        {/* Article Header */}
                        <div className="bg-card rounded-lg border border-border p-8 md:p-12 mb-8">
              <span className="inline-block px-3 py-1 text-xs font-medium tracking-wide uppercase bg-primary/10 text-primary rounded-full mb-4">
                {getCategoryLabel(post.category)}
              </span>

                            <h1 className="font-serif text-3xl md:text-4xl lg:text-5xl font-medium text-foreground mb-4">
                                {post.title}
                            </h1>

                            <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                <Calendar className="w-4 h-4" />
                                <time dateTime={post.date}>{formattedDate}</time>
                            </div>
                        </div>

                        {/* Article Body */}
                        <div className="bg-card rounded-lg border border-border p-8 md:p-12">
                            <MarkdownRenderer content={post.content} />
                        </div>
                    </motion.div>
                </article>

                {/* Related Posts */}
                {relatedPosts.length > 0 && (
                    <section className="py-16 md:py-24">
                        <div className="container mx-auto px-6">
                            <h2 className="font-serif text-2xl md:text-3xl font-medium text-foreground text-center mb-12">
                                {t('blog.relatedPosts')}
                            </h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                                {relatedPosts.map((relatedPost, index) => (
                                    <BlogCard key={relatedPost.id} post={relatedPost} index={index} />
                                ))}
                            </div>
                        </div>
                    </section>
                )}
            </main>

            <Footer />
        </>
    );
};

export default BlogPostPage;