import React, { createContext, useContext, useEffect, useState } from 'react';
import {
    type User,
    onAuthStateChanged,
    signInWithPopup,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut as firebaseSignOut
} from 'firebase/auth';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { auth, googleProvider, db } from '../lib/firebase';

interface AuthContextType {
    user: User | null;
    loading: boolean;
    isAdmin: boolean;
    signInWithGoogle: () => Promise<void>;
    login: (email: string, password: string) => Promise<void>;
    signup: (email: string, password: string, name: string) => Promise<void>;
    logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);
    const [isAdmin, setIsAdmin] = useState(false);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
            setUser(currentUser);
            if (currentUser) {
                // Check if user document exists, if not create it
                const userRef = doc(db, 'users', currentUser.uid);
                const userSnap = await getDoc(userRef);

                if (!userSnap.exists()) {
                    await setDoc(userRef, {
                        email: currentUser.email,
                        displayName: currentUser.displayName,
                        photoURL: currentUser.photoURL,
                        role: 'user', // Default role
                        createdAt: new Date(),
                        lastLogin: new Date()
                    });
                } else {
                    // Update last login
                    await setDoc(userRef, { lastLogin: new Date() }, { merge: true });
                    // Check admin role
                    const userData = userSnap.data();
                    console.log("Logged In User Data:", userData);
                    console.log("Is Admin?", userData.role === 'admin');
                    setIsAdmin(userData.role === 'admin');
                }
            } else {
                setIsAdmin(false);
            }
            setLoading(false);
        });

        return () => unsubscribe();
    }, []);

    const signInWithGoogle = async () => {
        try {
            await signInWithPopup(auth, googleProvider);
            // Create user doc if it doesn't exist (handled by useEffect, but good to ensure uniqueness)
        } catch (error) {
            console.error("Error signing in with Google", error);
            throw error;
        }
    };

    const login = async (email: string, password: string) => {
        try {
            await signInWithEmailAndPassword(auth, email, password);
        } catch (error) {
            console.error("Error logging in", error);
            throw error;
        }
    };

    const signup = async (email: string, password: string, name: string) => {
        try {
            const result = await createUserWithEmailAndPassword(auth, email, password);
            // Create user document immediately
            const userRef = doc(db, 'users', result.user.uid);
            await setDoc(userRef, {
                email: result.user.email,
                displayName: name,
                photoURL: null,
                role: 'user',
                createdAt: new Date(),
                lastLogin: new Date()
            });
        } catch (error) {
            console.error("Error signing up", error);
            throw error;
        }
    };

    const logout = async () => {
        try {
            await firebaseSignOut(auth);
        } catch (error) {
            console.error("Error signing out", error);
            throw error;
        }
    };

    return (
        <AuthContext.Provider value={{ user, loading, isAdmin, signInWithGoogle, login, signup, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = (): AuthContextType => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};
