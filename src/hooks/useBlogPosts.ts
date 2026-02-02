import { useEffect, useState } from 'react';
import { blogPosts as defaultPosts, BlogPost } from '@/data/blogPosts';
import {
    getBlogPosts,
    initializeBlogStorage,
    StoredBlogPost,
    getBlogPostBySlug as getStoredPostBySlug
} from '@/lib/blogStorage';

// Initialize localStorage with default posts on first load
let initialized = false;

export const useBlogPosts = () => {
    const [posts, setPosts] = useState<StoredBlogPost[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        if (!initialized) {
            initializeBlogStorage(defaultPosts);
            initialized = true;
        }

        const storedPosts = getBlogPosts();
        setPosts(storedPosts);
        setIsLoading(false);
    }, []);

    const refresh = () => {
        const storedPosts = getBlogPosts();
        setPosts(storedPosts);
    };

    return { posts, isLoading, refresh };
};

export const useBlogPost = (slug: string | undefined) => {
    const [post, setPost] = useState<StoredBlogPost | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        if (!initialized) {
            initializeBlogStorage(defaultPosts);
            initialized = true;
        }

        if (slug) {
            const storedPost = getStoredPostBySlug(slug);
            setPost(storedPost || null);
        }
        setIsLoading(false);
    }, [slug]);

    return { post, isLoading };
};

// Helper to get category label (same as before)
export const getCategoryLabel = (category: BlogPost['category']): string => {
    const labels: Record<BlogPost['category'], string> = {
        travel: 'Reizen',
        wellness: 'Wellness',
        news: 'Nieuws',
    };
    return labels[category];
};