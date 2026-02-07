import {useState, useEffect} from 'react';
import {useNavigate} from 'react-router-dom';
import {motion} from 'framer-motion';
import {Plus, Edit2, Trash2, LogOut, Eye} from 'lucide-react';
import {Button} from '@/components/ui/button';
import AdminSEO from '@/components/AdminSEO';
import {useAuth} from '@/hooks/useAuth';
import {
    getBlogPosts,
    deleteBlogPost,
    StoredBlogPost
} from '@/lib/blogStorage';
import {useLocalizedPath} from '@/hooks/useLocalizedPath';
import {getCategoryLabel} from '@/data/blogPosts';
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import {toast} from 'sonner';

const AdminBlog = () => {
    const [posts, setPosts] = useState<StoredBlogPost[]>([]);
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
    const [postToDelete, setPostToDelete] = useState<string | null>(null);
    const navigate = useNavigate();
    const {getPaths} = useLocalizedPath();
    const paths = getPaths();
    const {signOut} = useAuth();

    useEffect(() => {
        loadPosts();
    }, []);

    const loadPosts = () => {
        const blogPosts = getBlogPosts();
        setPosts(blogPosts);
    };

    const handleLogout = async () => {
        try {
            await signOut();
            navigate(paths.blog);
        } catch (error) {
            console.error('Logout error:', error);
            toast.error('Fout bij het uitloggen');
        }
    };

    const handleDelete = (id: string) => {
        setPostToDelete(id);
        setDeleteDialogOpen(true);
    };

    const confirmDelete = () => {
        if (postToDelete) {
            deleteBlogPost(postToDelete);
            loadPosts();
            toast.success('Blog post verwijderd');
        }
        setDeleteDialogOpen(false);
        setPostToDelete(null);
    };

    const formatDate = (dateStr: string) => {
        return new Date(dateStr).toLocaleDateString('nl-BE', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
        });
    };

    return (
        <>
            <AdminSEO/>
            <div className="min-h-screen bg-background">
                {/* Header */}
                <header className="bg-card border-b border-border sticky top-0 z-50">
                    <div className="container mx-auto px-6 py-4 flex items-center justify-between">
                        <h1 className="font-serif text-xl font-medium text-foreground">
                            Blog Beheer
                        </h1>
                        <div className="flex items-center gap-3">
                            <Button
                                variant="outline"
                                size="sm"
                                onClick={() => navigate(paths.blog)}
                            >
                                <Eye className="w-4 h-4 mr-2"/>
                                Bekijk Blog
                            </Button>
                            <Button
                                variant="ghost"
                                size="sm"
                                onClick={handleLogout}
                            >
                                <LogOut className="w-4 h-4 mr-2"/>
                                Uitloggen
                            </Button>
                        </div>
                    </div>
                </header>

                <main className="container mx-auto px-6 py-8">
                    {/* Actions */}
                    <div className="flex items-center justify-between mb-8">
                        <div>
                            <h2 className="text-2xl font-serif font-medium text-foreground">
                                Alle Blog Posts
                            </h2>
                            <p className="text-muted-foreground mt-1">
                                {posts.length} {posts.length === 1 ? 'artikel' : 'artikelen'}
                            </p>
                        </div>
                        <Button onClick={() => navigate(paths.adminBlogNew)}>
                            <Plus className="w-4 h-4 mr-2"/>
                            Nieuw Artikel
                        </Button>
                    </div>

                    {/* Posts List */}
                    {posts.length > 0 ? (
                        <div className="space-y-4">
                            {posts.map((post, index) => (
                                <motion.div
                                    key={post.id}
                                    initial={{opacity: 0, y: 10}}
                                    animate={{opacity: 1, y: 0}}
                                    transition={{delay: index * 0.05}}
                                    className="bg-card border border-border rounded-lg p-4 hover:border-primary/30 transition-colors"
                                >
                                    <div className="flex items-start gap-4">
                                        {/* Image Thumbnail */}
                                        <div className="w-20 h-20 rounded-md overflow-hidden flex-shrink-0 bg-muted">
                                            <img
                                                src={post.image}
                                                alt={post.title}
                                                className="w-full h-full object-cover"
                                            />
                                        </div>

                                        {/* Content */}
                                        <div className="flex-grow min-w-0">
                                            <div className="flex items-start justify-between gap-4">
                                                <div className="min-w-0">
                                                    <div className="flex items-center gap-2 mb-1">
                          <span className="px-2 py-0.5 text-xs font-medium bg-primary/10 text-primary rounded-full">
                            {getCategoryLabel(post.category)}
                          </span>
                                                        <span className="text-xs text-muted-foreground">
                            {formatDate(post.date)}
                          </span>
                                                    </div>
                                                    <h3 className="font-medium text-foreground truncate">
                                                        {post.title}
                                                    </h3>
                                                    <p className="text-sm text-muted-foreground line-clamp-1 mt-1">
                                                        {post.excerpt}
                                                    </p>
                                                </div>

                                                {/* Actions */}
                                                <div className="flex items-center gap-2 flex-shrink-0">
                                                    <Button
                                                        variant="ghost"
                                                        size="sm"
                                                        onClick={() => navigate(`${paths.adminBlogEdit}/${post.id}`)}
                                                    >
                                                        <Edit2 className="w-4 h-4"/>
                                                    </Button>
                                                    <Button
                                                        variant="ghost"
                                                        size="sm"
                                                        onClick={() => handleDelete(post.id)}
                                                        className="text-destructive hover:text-destructive"
                                                    >
                                                        <Trash2 className="w-4 h-4"/>
                                                    </Button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-16">
                            <p className="text-muted-foreground mb-4">
                                Nog geen blog posts gevonden.
                            </p>
                            <Button onClick={() => navigate(paths.adminBlogNew)}>
                                <Plus className="w-4 h-4 mr-2"/>
                                Eerste Artikel Maken
                            </Button>
                        </div>
                    )}
                </main>

                {/* Delete Confirmation Dialog */}
                <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
                    <AlertDialogContent>
                        <AlertDialogHeader>
                            <AlertDialogTitle>Weet je het zeker?</AlertDialogTitle>
                            <AlertDialogDescription>
                                Deze actie kan niet ongedaan worden gemaakt. Het artikel wordt permanent verwijderd.
                            </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                            <AlertDialogCancel>Annuleren</AlertDialogCancel>
                            <AlertDialogAction onClick={confirmDelete}
                                               className="bg-destructive hover:bg-destructive/90">
                                Verwijderen
                            </AlertDialogAction>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialog>
            </div>
        </>
    );
};

export default AdminBlog;