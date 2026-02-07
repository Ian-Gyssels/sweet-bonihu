import {createContext, type ReactNode, useEffect, useState} from 'react';
import {onAuthStateChanged, signInWithEmailAndPassword, signOut as firebaseSignOut, type User,} from 'firebase/auth';
import {auth} from '@/lib/firebase';

interface AuthContextType {
    user: User | null;
    loading: boolean;
    signIn: (email: string, password: string) => Promise<void>;
    signOut: () => Promise<void>;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({children}: { children: ReactNode }) => {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        return onAuthStateChanged(auth, (firebaseUser) => {
            setUser(firebaseUser);
            setLoading(false);
        });
    }, []);

    const signIn = async (email: string, password: string) => {
        await signInWithEmailAndPassword(auth, email, password);
    };

    const signOut = async () => {
        await firebaseSignOut(auth);
    };

    return (
        <AuthContext.Provider value={{user, loading, signIn, signOut}}>
            {children}
        </AuthContext.Provider>
    );
};