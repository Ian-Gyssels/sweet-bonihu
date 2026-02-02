import {useState} from 'react';
import {useNavigate} from 'react-router-dom';
import {motion} from 'framer-motion';
import {Lock, AlertCircle} from 'lucide-react';
import {Button} from '@/components/ui/button';
import {Input} from '@/components/ui/input';
import {loginAdmin} from '@/lib/blogStorage';
import {useLocalizedPath} from '@/hooks/useLocalizedPath';
import AdminSEO from '@/components/AdminSEO';

const AdminLogin = () => {
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();
    const {getPaths} = useLocalizedPath();
    const paths = getPaths();

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setError('');

        // Simulate a small delay for UX
        setTimeout(() => {
            if (loginAdmin(password)) {
                navigate(paths.adminBlog);
            } else {
                setError('Onjuist wachtwoord');
                setPassword('');
            }
            setIsLoading(false);
        }, 500);
    };

    return (
        <>
            <AdminSEO/>
            <div className="min-h-screen bg-background flex items-center justify-center px-4">
                <motion.div
                    initial={{opacity: 0, y: 20}}
                    animate={{opacity: 1, y: 0}}
                    transition={{duration: 0.5}}
                    className="w-full max-w-md"
                >
                    <div className="bg-card border border-border rounded-lg p-8 shadow-lg">
                        <div className="text-center mb-8">
                            <div
                                className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                                <Lock className="w-8 h-8 text-primary"/>
                            </div>
                            <h1 className="font-serif text-2xl font-medium text-foreground">
                                Admin Login
                            </h1>
                            <p className="text-muted-foreground text-sm mt-2">
                                Voer uw wachtwoord in om toegang te krijgen
                            </p>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div>
                                <Input
                                    type="password"
                                    placeholder="Wachtwoord"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="w-full"
                                    autoFocus
                                />
                            </div>

                            {error && (
                                <div className="flex items-center gap-2 text-destructive text-sm">
                                    <AlertCircle className="w-4 h-4"/>
                                    {error}
                                </div>
                            )}

                            <Button
                                type="submit"
                                className="w-full"
                                disabled={isLoading || !password}
                            >
                                {isLoading ? 'Bezig...' : 'Inloggen'}
                            </Button>
                        </form>
                    </div>
                </motion.div>
            </div>
        </>
    );
};

export default AdminLogin;