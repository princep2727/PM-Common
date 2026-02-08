import { useState, useEffect } from 'react';
import {
    collection,
    query,
    orderBy,
    onSnapshot,
    addDoc,
    updateDoc,
    doc,
    increment,
    serverTimestamp,
    Timestamp
} from 'firebase/firestore';
import { db } from '../lib/firebase';
import { useAuth } from '../contexts/AuthContext';

export interface Discussion {
    id: string;
    title: string;
    content: string;
    category: string;
    authorId: string;
    authorName: string;
    authorPhoto?: string;
    createdAt: Timestamp;
    likes: number;
    commentsCount: number;
}

export const useCommunity = () => {
    const [posts, setPosts] = useState<Discussion[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const { user } = useAuth();

    useEffect(() => {
        setLoading(true);
        const q = query(
            collection(db, 'discussions'),
            orderBy('createdAt', 'desc')
        );

        const unsubscribe = onSnapshot(q,
            (snapshot) => {
                const fetchedPosts = snapshot.docs.map(doc => ({
                    id: doc.id,
                    ...doc.data()
                })) as Discussion[];
                setPosts(fetchedPosts);
                setLoading(false);
                setError(null);
            },
            (err) => {
                console.error("Error fetching discussions:", err);
                setError("Failed to load community discussions.");
                setLoading(false);
            }
        );

        return () => unsubscribe();
    }, []);

    const addPost = async (title: string, content: string, category: string) => {
        if (!user) throw new Error("You must be logged in to post.");

        try {
            await addDoc(collection(db, 'discussions'), {
                title,
                content,
                category,
                authorId: user.uid,
                authorName: user.displayName || 'Anonymous User',
                authorPhoto: user.photoURL || null,
                createdAt: serverTimestamp(),
                likes: 0,
                commentsCount: 0
            });
            return true;
        } catch (err: any) {
            console.error("Error adding post:", err);
            throw new Error(err.message || "Failed to create post.");
        }
    };

    const likePost = async (postId: string) => {
        if (!user) return; // Silent fail if not logged in, or handle in UI

        try {
            const postRef = doc(db, 'discussions', postId);
            await updateDoc(postRef, {
                likes: increment(1)
            });
        } catch (err) {
            console.error("Error liking post:", err);
        }
    };

    return { posts, loading, error, addPost, likePost };
};
