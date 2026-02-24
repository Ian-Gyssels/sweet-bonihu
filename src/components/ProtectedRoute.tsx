import { Navigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { useLocalizedPath } from '@/hooks/useLocalizedPath';
import { useEffect, useState } from 'react';

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
    const { user, loading, signOut } = useAuth();
    const { getPaths } = useLocalizedPath();
    const paths = getPaths();
    const [isCheckingToken, setIsCheckingToken] = useState(true);

    useEffect(() => {
        const verifyToken = async () => {
            if (user) {
                try {
                    await user.getIdToken(true);
                } catch (error) {
                    console.error("Token verification failed:", error);
                    await signOut();
                }
            }
            setIsCheckingToken(false);
        };

        if (!loading) {
            verifyToken();
        }
    }, [user, loading, signOut]);

    if (loading || isCheckingToken) {
        return (
            <div className="min-h-screen bg-background flex items-center justify-center">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary" />
            </div>
        );
    }

    if (!user) {
        return <Navigate to={paths.adminLogin} replace />;
    }

    return <>{children}</>;
};

export default ProtectedRoute;