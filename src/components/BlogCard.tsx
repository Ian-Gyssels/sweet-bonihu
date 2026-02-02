import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { useLocalizedPath } from '@/hooks/useLocalizedPath';
import { BlogPost, getCategoryLabel } from '@/data/blogPosts';
import { Calendar } from 'lucide-react';

interface BlogCardProps {
    post: BlogPost;
    index?: number;
}

const BlogCard = ({ post, index = 0 }: BlogCardProps) => {
    const { t } = useTranslation();
    const { getPaths } = useLocalizedPath();
    const paths = getPaths();

    const formattedDate = new Date(post.date).toLocaleDateString('nl-BE', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    });

    return (
        <motion.article
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="group h-full"
        >
            <Link to={`${paths.blog}/${post.slug}`} className="block h-full">
                <div className="h-full flex flex-col overflow-hidden rounded-lg bg-card border border-border transition-all duration-300 hover:shadow-lg hover:border-primary/20">
                    {/* Image */}
                    <div className="aspect-[16/10] overflow-hidden flex-shrink-0">
                        <img
                            src={post.image}
                            alt={post.title}
                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                    </div>

                    {/* Content */}
                    <div className="p-6 flex flex-col flex-grow">
                        {/* Category Badge */}
                        <span className="inline-block px-3 py-1 text-xs font-medium tracking-wide uppercase bg-primary/10 text-primary rounded-full mb-3 self-start">
              {getCategoryLabel(post.category)}
            </span>

                        {/* Title */}
                        <h3 className="font-serif text-xl font-medium text-foreground mb-2 group-hover:text-primary transition-colors line-clamp-2 min-h-[3.5rem]">
                            {post.title}
                        </h3>

                        {/* Excerpt */}
                        <p className="text-muted-foreground text-sm leading-relaxed mb-4 line-clamp-3 flex-grow">
                            {post.excerpt}
                        </p>

                        {/* Date */}
                        <div className="flex items-center gap-2 text-xs text-muted-foreground mt-auto">
                            <Calendar className="w-3.5 h-3.5" />
                            <time dateTime={post.date}>{formattedDate}</time>
                        </div>
                    </div>
                </div>
            </Link>
        </motion.article>
    );
};

export default BlogCard;