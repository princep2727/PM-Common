import { useEffect, useState } from 'react';
import { db } from '../lib/firebase';
import { doc, updateDoc, increment, setDoc, getDoc, onSnapshot } from 'firebase/firestore';

// Hook to log visits
export const usePageTracking = () => {
    useEffect(() => {
        const logVisit = async () => {
            // Use sessionStorage to track session visits
            if (sessionStorage.getItem('pm-hub-visited')) return;

            try {
                const statsRef = doc(db, 'stats', 'global');
                const statsSnap = await getDoc(statsRef);

                if (!statsSnap.exists()) {
                    await setDoc(statsRef, {
                        visits: 1,
                        users: 0
                    });
                } else {
                    await updateDoc(statsRef, {
                        visits: increment(1)
                    });
                }
                sessionStorage.setItem('pm-hub-visited', 'true');
            } catch (error) {
                console.error("Error logging visit:", error);
            }
        };

        logVisit();
    }, []);
};

// Hook to fetch stats for Admin Dashboard
export const useStats = () => {
    const [stats, setStats] = useState({ visits: 0, users: 0 });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const statsRef = doc(db, 'stats', 'global');
        const unsubscribe = onSnapshot(statsRef, (doc) => {
            if (doc.exists()) {
                setStats(doc.data() as { visits: number; users: number });
            }
            setLoading(false);
        }, (error) => {
            console.error("Error fetching stats:", error);
            setLoading(false);
        });

        return () => unsubscribe();
    }, []);

    return { stats, loading };
};
