import {BlogPost} from '@/data/blogPosts';

const BLOG_POSTS_KEY = 'sweetbonihu_blog_posts';

export interface StoredBlogPost extends Omit<BlogPost, 'id'> {
    id: string;
    createdAt: string;
    updatedAt: string;
}

// Initialize localStorage with default posts if empty
export const initializeBlogStorage = (defaultPosts: BlogPost[]): void => {
    const existing = localStorage.getItem(BLOG_POSTS_KEY);
    if (!existing) {
        const postsWithTimestamps: StoredBlogPost[] = defaultPosts.map(post => ({
            ...post,
            createdAt: post.date,
            updatedAt: post.date,
        }));
        localStorage.setItem(BLOG_POSTS_KEY, JSON.stringify(postsWithTimestamps));
    }
};

// Get all blog posts from localStorage
export const getBlogPosts = (): StoredBlogPost[] => {
    const stored = localStorage.getItem(BLOG_POSTS_KEY);
    if (!stored) return [];
    try {
        return JSON.parse(stored);
    } catch {
        return [];
    }
};

// Get a single blog post by slug
export const getBlogPostBySlug = (slug: string): StoredBlogPost | undefined => {
    const posts = getBlogPosts();
    return posts.find(post => post.slug === slug);
};

// Create a new blog post
export const createBlogPost = (post: Omit<StoredBlogPost, 'id' | 'createdAt' | 'updatedAt'>): StoredBlogPost => {
    const posts = getBlogPosts();
    const newPost: StoredBlogPost = {
        ...post,
        id: Date.now().toString(),
        createdAt: new Date().toISOString().split('T')[0],
        updatedAt: new Date().toISOString().split('T')[0],
    };
    posts.unshift(newPost);
    localStorage.setItem(BLOG_POSTS_KEY, JSON.stringify(posts));
    return newPost;
};

// Update an existing blog post
export const updateBlogPost = (id: string, updates: Partial<Omit<StoredBlogPost, 'id' | 'createdAt'>>): StoredBlogPost | null => {
    const posts = getBlogPosts();
    const index = posts.findIndex(post => post.id === id);
    if (index === -1) return null;

    posts[index] = {
        ...posts[index],
        ...updates,
        updatedAt: new Date().toISOString().split('T')[0],
    };
    localStorage.setItem(BLOG_POSTS_KEY, JSON.stringify(posts));
    return posts[index];
};

// Delete a blog post
export const deleteBlogPost = (id: string): boolean => {
    const posts = getBlogPosts();
    const filtered = posts.filter(post => post.id !== id);
    if (filtered.length === posts.length) return false;
    localStorage.setItem(BLOG_POSTS_KEY, JSON.stringify(filtered));
    return true;
};

// Generate slug from title
export const generateSlug = (title: string): string => {
    return title
        .toLowerCase()
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '') // Remove diacritics
        .replace(/[^a-z0-9\s-]/g, '') // Remove special chars
        .replace(/\s+/g, '-') // Replace spaces with hyphens
        .replace(/-+/g, '-') // Remove consecutive hyphens
        .trim();
};