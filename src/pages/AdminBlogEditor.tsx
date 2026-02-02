import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Save, Eye } from 'lucide-react';
import { Button } from '@/components/ui/button';
import AdminSEO from '@/components/AdminSEO';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import MarkdownEditor from '@/components/MarkdownEditor';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import {
    getBlogPosts,
    createBlogPost,
    updateBlogPost,
    isAdminAuthenticated,
    generateSlug,
    StoredBlogPost,
} from '@/lib/blogStorage';
import { useLocalizedPath } from '@/hooks/useLocalizedPath';
import { BlogPost } from '@/data/blogPosts';
import { toast } from 'sonner';

const AdminBlogEditor = () => {
    const { id } = useParams<{ id: string }>();
    const isEditing = Boolean(id);
    const navigate = useNavigate();
    const { getPaths } = useLocalizedPath();
    const paths = getPaths();

    const [formData, setFormData] = useState({
        title: '',
        slug: '',
        category: 'news' as BlogPost['category'],
        date: new Date().toISOString().split('T')[0],
        image: '/og-image.jpg',
        excerpt: '',
        content: '',
    });
    const [autoSlug, setAutoSlug] = useState(true);
    const [isSaving, setIsSaving] = useState(false);

    useEffect(() => {
        if (!isAdminAuthenticated()) {
            navigate(paths.adminLogin);
            return;
        }

        if (isEditing && id) {
            const posts = getBlogPosts();
            const post = posts.find(p => p.id === id);
            if (post) {
                setFormData({
                    title: post.title,
                    slug: post.slug,
                    category: post.category,
                    date: post.date,
                    image: post.image,
                    excerpt: post.excerpt,
                    content: post.content,
                });
                setAutoSlug(false);
            } else {
                navigate(paths.adminBlog);
            }
        }
    }, [id, isEditing, navigate, paths.adminBlog, paths.adminLogin]);

    const handleChange = (field: string, value: string) => {
        setFormData(prev => {
            const updated = { ...prev, [field]: value };

            // Auto-generate slug from title
            if (field === 'title' && autoSlug) {
                updated.slug = generateSlug(value);
            }

            return updated;
        });

        // If user edits slug manually, disable auto-slug
        if (field === 'slug') {
            setAutoSlug(false);
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setIsSaving(true);

        // Validate
        if (!formData.title.trim()) {
            toast.error('Titel is verplicht');
            setIsSaving(false);
            return;
        }
        if (!formData.excerpt.trim()) {
            toast.error('Excerpt is verplicht');
            setIsSaving(false);
            return;
        }
        if (!formData.content.trim()) {
            toast.error('Inhoud is verplicht');
            setIsSaving(false);
            return;
        }

        try {
            if (isEditing && id) {
                updateBlogPost(id, formData);
                toast.success('Artikel bijgewerkt');
            } else {
                createBlogPost(formData);
                toast.success('Artikel aangemaakt');
            }
            navigate(paths.adminBlog);
        } catch {
            toast.error('Er is een fout opgetreden');
        } finally {
            setIsSaving(false);
        }
    };

    return (
        <>
            <AdminSEO />
            <div className="min-h-screen bg-background">
                {/* Header */}
                <header className="bg-card border-b border-border sticky top-0 z-50">
                    <div className="container mx-auto px-6 py-4 flex items-center justify-between">
                        <div className="flex items-center gap-4">
                            <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => navigate(paths.adminBlog)}
                            >
                                <ArrowLeft className="w-4 h-4 mr-2" />
                                Terug
                            </Button>
                            <h1 className="font-serif text-xl font-medium text-foreground">
                                {isEditing ? 'Artikel Bewerken' : 'Nieuw Artikel'}
                            </h1>
                        </div>
                        <div className="flex items-center gap-3">
                            {formData.slug && (
                                <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={() => window.open(`${paths.blog}/${formData.slug}`, '_blank')}
                                >
                                    <Eye className="w-4 h-4 mr-2" />
                                    Preview
                                </Button>
                            )}
                            <Button onClick={handleSubmit} disabled={isSaving}>
                                <Save className="w-4 h-4 mr-2" />
                                {isSaving ? 'Opslaan...' : 'Opslaan'}
                            </Button>
                        </div>
                    </div>
                </header>

                <main className="container mx-auto px-6 py-8 max-w-4xl">
                    <motion.form
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        onSubmit={handleSubmit}
                        className="space-y-8"
                    >
                        {/* Basic Info */}
                        <div className="bg-card border border-border rounded-lg p-6 space-y-6">
                            <h2 className="font-serif text-lg font-medium text-foreground">
                                Basis Informatie
                            </h2>

                            <div className="space-y-4">
                                <div>
                                    <Label htmlFor="title">Titel *</Label>
                                    <Input
                                        id="title"
                                        value={formData.title}
                                        onChange={(e) => handleChange('title', e.target.value)}
                                        placeholder="Voer de titel in..."
                                        className="mt-1.5"
                                    />
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <Label htmlFor="slug">URL Slug</Label>
                                        <Input
                                            id="slug"
                                            value={formData.slug}
                                            onChange={(e) => handleChange('slug', e.target.value)}
                                            placeholder="artikel-url-slug"
                                            className="mt-1.5"
                                        />
                                        <p className="text-xs text-muted-foreground mt-1">
                                            /blog/{formData.slug || 'slug'}
                                        </p>
                                    </div>

                                    <div>
                                        <Label htmlFor="category">Categorie</Label>
                                        <Select
                                            value={formData.category}
                                            onValueChange={(value) => handleChange('category', value)}
                                        >
                                            <SelectTrigger className="mt-1.5">
                                                <SelectValue />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="travel">Reizen</SelectItem>
                                                <SelectItem value="wellness">Wellness</SelectItem>
                                                <SelectItem value="news">Nieuws</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <Label htmlFor="date">Publicatiedatum</Label>
                                        <Input
                                            id="date"
                                            type="date"
                                            value={formData.date}
                                            onChange={(e) => handleChange('date', e.target.value)}
                                            className="mt-1.5"
                                        />
                                    </div>

                                    <div>
                                        <Label htmlFor="image">Afbeelding URL</Label>
                                        <Input
                                            id="image"
                                            value={formData.image}
                                            onChange={(e) => handleChange('image', e.target.value)}
                                            placeholder="/og-image.jpg"
                                            className="mt-1.5"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Content */}
                        <div className="bg-card border border-border rounded-lg p-6 space-y-6">
                            <h2 className="font-serif text-lg font-medium text-foreground">
                                Inhoud
                            </h2>

                            <div className="space-y-4">
                                <div>
                                    <Label htmlFor="excerpt">Excerpt / Samenvatting *</Label>
                                    <Textarea
                                        id="excerpt"
                                        value={formData.excerpt}
                                        onChange={(e) => handleChange('excerpt', e.target.value)}
                                        placeholder="Korte samenvatting voor de blog overzichtspagina..."
                                        rows={3}
                                        className="mt-1.5"
                                    />
                                    <p className="text-xs text-muted-foreground mt-1">
                                        Wordt getoond in de blog cards en meta description
                                    </p>
                                </div>

                                <div>
                                    <Label htmlFor="content">Volledige Inhoud *</Label>
                                    <div className="mt-1.5">
                                        <MarkdownEditor
                                            value={formData.content}
                                            onChange={(value) => handleChange('content', value || '')}
                                            height={400}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Submit */}
                        <div className="flex justify-end gap-3">
                            <Button
                                type="button"
                                variant="outline"
                                onClick={() => navigate(paths.adminBlog)}
                            >
                                Annuleren
                            </Button>
                            <Button type="submit" disabled={isSaving}>
                                <Save className="w-4 h-4 mr-2" />
                                {isEditing ? 'Bijwerken' : 'Publiceren'}
                            </Button>
                        </div>
                    </motion.form>
                </main>
            </div>
        </>
    );
};

export default AdminBlogEditor;