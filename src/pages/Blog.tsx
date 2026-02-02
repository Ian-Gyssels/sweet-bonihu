import { useState } from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import SEOHead from '@/components/SEOHead';
import BlogCard from '@/components/BlogCard';
import { useBlogPosts } from '@/hooks/useBlogPosts';
import { BlogPost } from '@/data/blogPosts';
import { cn } from '@/lib/utils';

type CategoryFilter = 'all' | BlogPost['category'];

const Blog = () => {
    const { t } = useTranslation();
    const { posts, isLoading } = useBlogPosts();
    const [activeCategory, setActiveCategory] = useState<CategoryFilter>('all');

    const categories: { key: CategoryFilter; label: string }[] = [
        { key: 'all', label: t('blog.categories.all') },
        { key: 'travel', label: t('blog.categories.travel') },
        { key: 'wellness', label: t('blog.categories.wellness') },
        { key: 'news', label: t('blog.categories.news') },
    ];

    const filteredPosts = activeCategory === 'all'
        ? posts
        : posts.filter(post => post.category === activeCategory);

    return (
        <>
            <SEOHead
                titleKey="meta.blog.title"
                descriptionKey="meta.blog.description"
                pageKey="blog"
            />

            <Header />

            <main className="pt-20">
                {/* Hero Section */}
                <section className="py-20 md:py-28 bg-muted/30">
                    <div className="container mx-auto px-6">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6 }}
                            className="text-center max-w-3xl mx-auto"
                        >
              <span className="inline-block text-sm font-medium tracking-widest uppercase text-primary mb-4">
                {t('blog.heroSubtitle')}
              </span>
                            <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-medium text-foreground mb-6">
                                {t('blog.heroTitle')}
                            </h1>
                            <p className="text-lg text-muted-foreground">
                                {t('blog.heroDescription')}
                            </p>
                        </motion.div>
                    </div>
                </section>

                {/* Category Filter */}
                <section className="py-8 border-b border-border">
                    <div className="container mx-auto px-6">
                        <div className="flex flex-wrap justify-center gap-2">
                            {categories.map((category) => (
                                <button
                                    key={category.key}
                                    onClick={() => setActiveCategory(category.key)}
                                    className={cn(
                                        "px-4 py-2 text-sm font-medium rounded-full transition-all duration-200",
                                        activeCategory === category.key
                                            ? "bg-primary text-primary-foreground"
                                            : "bg-muted text-muted-foreground hover:bg-muted/80 hover:text-foreground"
                                    )}
                                >
                                    {category.label}
                                </button>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Blog Grid */}
                <section className="py-16 md:py-24">
                    <div className="container mx-auto px-6">
                        {filteredPosts.length > 0 ? (
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                                {filteredPosts.map((post, index) => (
                                    <BlogCard key={post.id} post={post} index={index} />
                                ))}
                            </div>
                        ) : (
                            <div className="text-center py-12">
                                <p className="text-muted-foreground">{t('blog.noResults')}</p>
                            </div>
                        )}
                    </div>
                </section>
            </main>

            <Footer />
        </>
    );
};

export default Blog;