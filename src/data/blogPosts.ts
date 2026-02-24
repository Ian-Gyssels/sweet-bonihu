export interface BlogPost {
    id: string;
    slug: string;
    category: 'travel' | 'wellness' | 'news';
    date: string;
    image: string;
    title: string;
    excerpt: string;
    content: string;
}


export const getCategoryLabel = (category: BlogPost['category']): string => {
    const labels: Record<BlogPost['category'], string> = {
        travel: 'Reizen',
        wellness: 'Wellness',
        news: 'Nieuws',
    };
    return labels[category];
};

