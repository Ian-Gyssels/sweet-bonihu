import {useState} from 'react';
import {useNavigate} from 'react-router-dom';
import {motion} from 'framer-motion';
import {Lock, Mail, AlertCircle} from 'lucide-react';
import {Button} from '@/components/ui/button';
import {Input} from '@/components/ui/input';
import {useLocalizedPath} from '@/hooks/useLocalizedPath';
import AdminSEO from '@/components/AdminSEO';
import {useAuth} from "@/hooks/useAuth.ts";
import {FirebaseError} from 'firebase/app';

const AdminLogin = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();
    const {getPaths} = useLocalizedPath();
    const paths = getPaths();
    const {signIn, user} = useAuth();

    if (user) {
        navigate(paths.adminBlog, {replace: true});
    }

    const getErrorMessage = (code: string): string => {
        switch (code) {
            case 'auth/invalid-credential':
            case 'auth/wrong-password':
                return 'Onjuist e-mailadres of wachtwoord';
            case 'auth/user-not-found':
                return 'Geen account gevonden met dit e-mailadres';
            case 'auth/too-many-requests':
                return 'Te veel inlogpogingen. Probeer later opnieuw.';
            case 'auth/invalid-email':
                return 'Ongeldig e-mailadres';
            default:
                return 'Er is een fout opgetreden bij het inloggen';
        }
    };


    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setError('');

        try {
            await signIn(email, password);
            navigate(paths.adminBlog);
        } catch (err: unknown) {
            if (err instanceof FirebaseError) {
                setError(getErrorMessage(err.code));
            } else {
                setError('Something went wrong. Please try again.');
            }
        } finally {
            setIsLoading(false);
        }
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
                                Voer uw gegevens in om toegang te krijgen
                            </p>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div className="space-y-4">
                                <div className="relative">
                                    <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground"/>
                                    <Input
                                        type="email"
                                        placeholder="E-mailadres"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        className="pl-10"
                                        required
                                        autoFocus
                                    />
                                </div>
                                <div className="relative">
                                    <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground"/>
                                    <Input
                                        type="password"
                                        placeholder="Wachtwoord"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        className="pl-10"
                                        required
                                    />
                                </div>
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
                                disabled={isLoading || !email || !password}
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