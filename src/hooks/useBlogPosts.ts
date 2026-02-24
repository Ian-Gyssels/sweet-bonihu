import { useQuery } from '@tanstack/react-query';
import { BlogPost } from '@/data/blogPosts';
import { getBlogPosts, getBlogPostBySlug, getRelatedBlogPosts } from '@/lib/blogStorage';

export const useBlogPosts = () => {
    const {
        data: posts = [],
        isPending,
        refetch
    } = useQuery({
        queryKey: ['blogPosts'],
        queryFn: getBlogPosts,
        staleTime: 5 * 60 * 1000,
    });

    return { posts, isLoading: isPending, refresh: refetch };
};

export const useBlogPost = (slug: string | undefined) => {
    console.log('slug', slug);
    const {
        data: post = null,
        isPending,
        refetch
    } = useQuery({
        queryKey: ['blogPost', slug],
        queryFn: async () => slug ? (await getBlogPostBySlug(slug) || null) : null,
        enabled: !!slug,
        staleTime: 5 * 60 * 1000,
    });

    return { post, isLoading: isPending, refresh: refetch };
};

export const useRelatedBlogPosts = (category: string | undefined, excludeId: string | undefined, limit: number = 2) => {
    const {
        data: posts = [],
        isPending,
    } = useQuery({
        queryKey: ['relatedBlogPosts', category, excludeId, limit],
        queryFn: () => (category && excludeId) ? getRelatedBlogPosts(category, excludeId, limit) : [],
        enabled: !!category && !!excludeId,
        staleTime: 5 * 60 * 1000,
    });

    return { posts, isLoading: isPending };
};