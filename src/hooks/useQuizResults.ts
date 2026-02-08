import { useState, useEffect } from 'react';

export interface QuizResult {
    id: string;
    category: string;
    score: number;
    totalQuestions: number;
    percentage: number;
    completedAt: string;
}

const STORAGE_KEY = 'pm-hub-quiz-results';

export const useQuizResults = () => {
    const [results, setResults] = useState<QuizResult[]>(() => {
        const stored = localStorage.getItem(STORAGE_KEY);
        return stored ? JSON.parse(stored) : [];
    });

    useEffect(() => {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(results));
    }, [results]);

    const addResult = (result: Omit<QuizResult, 'id' | 'completedAt' | 'percentage'>) => {
        const newResult: QuizResult = {
            ...result,
            id: crypto.randomUUID(),
            completedAt: new Date().toISOString(),
            percentage: Math.round((result.score / result.totalQuestions) * 100),
        };
        setResults(prev => [...prev, newResult]);
        return newResult;
    };

    const getResultsByCategory = (category: string) => {
        return results.filter(r => r.category === category);
    };

    const getAverageScore = () => {
        if (results.length === 0) return 0;
        return Math.round(results.reduce((sum, r) => sum + r.percentage, 0) / results.length);
    };

    const getBestScore = () => {
        if (results.length === 0) return 0;
        return Math.max(...results.map(r => r.percentage));
    };

    const getRecentResults = (count: number = 5) => {
        return [...results]
            .sort((a, b) => new Date(b.completedAt).getTime() - new Date(a.completedAt).getTime())
            .slice(0, count);
    };

    const getCategoryStats = () => {
        const categories = ['Project Fundamentals', 'Agile & Scrum', 'Risk Management', 'Stakeholder Management', 'Tools & Techniques', 'Leadership & Communication'];
        return categories.map(cat => {
            const catResults = results.filter(r => r.category === cat);
            return {
                category: cat,
                attempts: catResults.length,
                avgScore: catResults.length > 0
                    ? Math.round(catResults.reduce((sum, r) => sum + r.percentage, 0) / catResults.length)
                    : 0,
                bestScore: catResults.length > 0 ? Math.max(...catResults.map(r => r.percentage)) : 0,
            };
        });
    };

    const clearResults = () => setResults([]);

    return {
        results,
        addResult,
        getResultsByCategory,
        getAverageScore,
        getBestScore,
        getRecentResults,
        getCategoryStats,
        clearResults,
    };
};
