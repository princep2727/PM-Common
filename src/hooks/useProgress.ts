import { useState, useEffect } from 'react';

export interface ProgressData {
    studyTimeMinutes: number;
    lastStudyDate: string;
    streakDays: number;
    longestStreak: number;
    weeklyStudyMinutes: number[];
    achievements: Achievement[];
}

export interface Achievement {
    id: string;
    title: string;
    description: string;
    icon: string;
    unlockedAt: string | null;
}

const STORAGE_KEY = 'pm-hub-progress';

const DEFAULT_ACHIEVEMENTS: Achievement[] = [
    { id: 'first-task', title: 'First Step', description: 'Complete your first task', icon: '🎯', unlockedAt: null },
    { id: 'five-tasks', title: 'Getting Started', description: 'Complete 5 tasks', icon: '⭐', unlockedAt: null },
    { id: 'first-quiz', title: 'Quiz Taker', description: 'Complete your first quiz', icon: '📝', unlockedAt: null },
    { id: 'perfect-score', title: 'Perfectionist', description: 'Get 100% on any quiz', icon: '💎', unlockedAt: null },
    { id: 'streak-3', title: 'Consistent Learner', description: '3-day study streak', icon: '🔥', unlockedAt: null },
    { id: 'streak-7', title: 'Week Warrior', description: '7-day study streak', icon: '🏆', unlockedAt: null },
    { id: 'study-hour', title: 'Dedicated Student', description: 'Study for 1 hour total', icon: '📚', unlockedAt: null },
    { id: 'study-10hours', title: 'Knowledge Seeker', description: 'Study for 10 hours total', icon: '🎓', unlockedAt: null },
];

const getDefaultProgress = (): ProgressData => ({
    studyTimeMinutes: 0,
    lastStudyDate: '',
    streakDays: 0,
    longestStreak: 0,
    weeklyStudyMinutes: [0, 0, 0, 0, 0, 0, 0],
    achievements: DEFAULT_ACHIEVEMENTS,
});

export const useProgress = () => {
    const [progress, setProgress] = useState<ProgressData>(() => {
        const stored = localStorage.getItem(STORAGE_KEY);
        return stored ? JSON.parse(stored) : getDefaultProgress();
    });

    useEffect(() => {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
    }, [progress]);

    const addStudyTime = (minutes: number) => {
        const today = new Date().toDateString();
        setProgress(prev => {
            const isNewDay = prev.lastStudyDate !== today;
            const dayIndex = new Date().getDay();
            const newWeeklyMinutes = [...prev.weeklyStudyMinutes];
            newWeeklyMinutes[dayIndex] += minutes;

            let newStreak = prev.streakDays;
            if (isNewDay) {
                const lastDate = prev.lastStudyDate ? new Date(prev.lastStudyDate) : null;
                const yesterday = new Date();
                yesterday.setDate(yesterday.getDate() - 1);

                if (lastDate && lastDate.toDateString() === yesterday.toDateString()) {
                    newStreak += 1;
                } else if (!lastDate || lastDate.toDateString() !== today) {
                    newStreak = 1;
                }
            }

            return {
                ...prev,
                studyTimeMinutes: prev.studyTimeMinutes + minutes,
                lastStudyDate: today,
                streakDays: newStreak,
                longestStreak: Math.max(prev.longestStreak, newStreak),
                weeklyStudyMinutes: newWeeklyMinutes,
            };
        });
    };

    const unlockAchievement = (achievementId: string) => {
        setProgress(prev => ({
            ...prev,
            achievements: prev.achievements.map(a =>
                a.id === achievementId && !a.unlockedAt
                    ? { ...a, unlockedAt: new Date().toISOString() }
                    : a
            ),
        }));
    };

    const checkAndUnlockAchievements = (tasksCompleted: number, quizzesTaken: number, perfectQuiz: boolean) => {
        if (tasksCompleted >= 1) unlockAchievement('first-task');
        if (tasksCompleted >= 5) unlockAchievement('five-tasks');
        if (quizzesTaken >= 1) unlockAchievement('first-quiz');
        if (perfectQuiz) unlockAchievement('perfect-score');
        if (progress.streakDays >= 3) unlockAchievement('streak-3');
        if (progress.streakDays >= 7) unlockAchievement('streak-7');
        if (progress.studyTimeMinutes >= 60) unlockAchievement('study-hour');
        if (progress.studyTimeMinutes >= 600) unlockAchievement('study-10hours');
    };

    const getUnlockedAchievements = () => progress.achievements.filter(a => a.unlockedAt);
    const getLockedAchievements = () => progress.achievements.filter(a => !a.unlockedAt);

    const resetProgress = () => setProgress(getDefaultProgress());

    return {
        progress,
        addStudyTime,
        unlockAchievement,
        checkAndUnlockAchievements,
        getUnlockedAchievements,
        getLockedAchievements,
        resetProgress,
    };
};
