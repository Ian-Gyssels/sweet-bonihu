import { BlogPost } from '@/data/blogPosts';
import { useAuth } from "@/hooks/useAuth.ts";
import { AuthContext } from "@/contexts/AuthContext.tsx";

const API_URL = 'http://localhost:3000/blogpost';

export interface StoredBlogPost extends Omit<BlogPost, 'id'> {
    id: string;
    createdAt: string;
    updatedAt: string;
}

// Get all blog posts from API
export const getBlogPosts = async (): Promise<BlogPost[]> => {
    try {
        const res = await fetch(API_URL);
        if (!res.ok) throw new Error('Failed to fetch blog posts');
        const data = await res.json();
        return data.map((post: any) => ({ ...post, id: post._id || post.id }));
    } catch (err) {
        console.error(err);
        return [];
    }
};

// Get related blog posts by category
export const getRelatedBlogPosts = async (category: string, excludeId: string, limit: number = 2): Promise<BlogPost[]> => {
    try {
        const res = await fetch(`${API_URL}?category=${category}&limit=${limit + 1}`);
        if (!res.ok) throw new Error('Failed to fetch related blog posts');
        const data = await res.json();
        const posts = data.map((post: any) => ({ ...post, id: post._id || post.id }));
        return posts.filter((p: any) => p.id !== excludeId).slice(0, limit);
    } catch (err) {
        console.error(err);
        return [];
    }
};

// Get a single blog post by slug
export const getBlogPostBySlug = async (slug: string): Promise<BlogPost | undefined> => {
    try {
        const res = await fetch(`${API_URL}/${slug}`);
        if (!res.ok) throw new Error('Failed to fetch blog post');
        const data = await res.json();
        if (Array.isArray(data)) {
            const post = data.length > 0 ? data[0] : undefined;
            return post ? { ...post, id: post._id || post.id } : undefined;
        }
        return (data.id || data._id) ? { ...data, id: data._id || data.id } : undefined;
    } catch (err) {
        console.error(err);
        return undefined;
    }
};

// Create a new blog post
export const createBlogPost = async (post: Omit<BlogPost, 'id' | 'createdAt' | 'updatedAt'>, token: string): Promise<BlogPost | null> => {
    try {
        const newPost = {
            ...post,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
        };
        const res = await fetch(API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(newPost),
        });
        if (!res.ok) throw new Error('Failed to create blog post');
        return await res.json();
    } catch (err) {
        console.error(err);
        return null;
    }
};

// Update an existing blog post
export const updateBlogPost = async (id: string, updates: Partial<Omit<BlogPost, 'id' | 'createdAt'>>, token: string): Promise<BlogPost | null> => {
    try {
        const updatedData = {
            ...updates,
            updatedAt: new Date().toISOString(),
        };
        const res = await fetch(`${API_URL}/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(updatedData),
        });
        if (!res.ok) throw new Error('Failed to update blog post');
        return await res.json();
    } catch (err) {
        console.error(err);
        return null;
    }
};

// Delete a blog post
export const deleteBlogPost = async (id: string, token: string): Promise<boolean> => {
    try {
        const res = await fetch(`${API_URL}/${id}`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${token}`,
            },
        });
        return res.ok;
    } catch (err) {
        console.error(err);
        return false;
    }
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