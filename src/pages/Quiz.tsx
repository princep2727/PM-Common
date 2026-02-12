import React, { useState } from 'react';
import { useQuizResults } from '../hooks/useQuizResults';
import {
    HelpCircle,
    CheckCircle,
    XCircle,
    ChevronRight,
    Trophy,
    RotateCcw,
    ArrowRight,
    Brain,
    Users,
    AlertTriangle,
    Wrench,
    MessageSquare,
    Target,
} from 'lucide-react';

import { questions } from '../data/quizQuestions';
import type { Question } from '../data/quizQuestions';

// Helper to shuffle array
const shuffleArray = <T,>(array: T[]): T[] => {
    const newArray = [...array];
    for (let i = newArray.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
    }
    return newArray;
};

// Helper to prepare questions with shuffled options
const prepareQuestions = (sourceQuestions: Question[]): Question[] => {
    return sourceQuestions.map(q => {
        // Create a pair of [option, isCorrect]
        const optionsWithCorrectness = q.options.map((opt, idx) => ({
            text: opt,
            isCorrect: idx === q.correctAnswer
        }));

        // Shuffle the pairs
        const shuffledOptions = shuffleArray(optionsWithCorrectness);

        // Reconstruct the question
        return {
            ...q,
            options: shuffledOptions.map(o => o.text),
            correctAnswer: shuffledOptions.findIndex(o => o.isCorrect)
        };
    });
};

const categories = ['All', 'Project Fundamentals', 'Agile & Scrum', 'Risk Management', 'Stakeholder Management', 'Tools & Techniques', 'Leadership & Communication'];

const categoryIcons: Record<string, React.ElementType> = {
    'Project Fundamentals': Target,
    'Agile & Scrum': Brain,
    'Risk Management': AlertTriangle,
    'Stakeholder Management': Users,
    'Tools & Techniques': Wrench,
    'Leadership & Communication': MessageSquare,
};

export const Quiz: React.FC = () => {
    const { addResult, getCategoryStats, getRecentResults } = useQuizResults();
    const [selectedCategory, setSelectedCategory] = useState<string>('All');
    const [quizStarted, setQuizStarted] = useState(false);
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
    const [showExplanation, setShowExplanation] = useState(false);
    const [score, setScore] = useState(0);
    const [quizComplete, setQuizComplete] = useState(false);
    const [quizQuestions, setQuizQuestions] = useState<Question[]>([]);

    const startQuiz = (category: string) => {
        const filtered = category === 'All'
            ? questions
            : questions.filter(q => q.category === category);

        // 1. Shuffle the order of questions
        const shuffledQuestions = shuffleArray(filtered).slice(0, 10);

        // 2. Shuffle the options within each question
        const readyQuestions = prepareQuestions(shuffledQuestions);

        setQuizQuestions(readyQuestions);
        setSelectedCategory(category);
        setQuizStarted(true);
        setCurrentQuestion(0);
        setScore(0);
        setQuizComplete(false);
        setSelectedAnswer(null);
        setShowExplanation(false);
    };

    const handleAnswer = (answerIndex: number) => {
        if (selectedAnswer !== null) return;
        setSelectedAnswer(answerIndex);
        setShowExplanation(true);
        if (answerIndex === quizQuestions[currentQuestion].correctAnswer) {
            setScore(prev => prev + 1);
        }
    };

    const nextQuestion = () => {
        if (currentQuestion + 1 < quizQuestions.length) {
            setCurrentQuestion(prev => prev + 1);
            setSelectedAnswer(null);
            setShowExplanation(false);
        } else {
            setQuizComplete(true);
            addResult({
                category: selectedCategory,
                score: score + (selectedAnswer === quizQuestions[currentQuestion].correctAnswer ? 1 : 0),
                totalQuestions: quizQuestions.length,
            });
        }
    };

    const resetQuiz = () => {
        setQuizStarted(false);
        setQuizComplete(false);
        setCurrentQuestion(0);
        setScore(0);
        setSelectedAnswer(null);
        setShowExplanation(false);
    };

    const categoryStats = getCategoryStats();
    const recentResults = getRecentResults(5);

    if (quizComplete) {
        const finalScore = score + (selectedAnswer === quizQuestions[currentQuestion]?.correctAnswer ? 1 : 0);
        const percentage = Math.round((finalScore / quizQuestions.length) * 100);
        return (
            <div className="space-y-8 animate-fade-in">
                <div className="card p-8 text-center max-w-lg mx-auto">
                    <Trophy className={`w-20 h-20 mx-auto mb-6 ${percentage >= 70 ? 'text-amber-500' : 'text-gray-400'}`} />
                    <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-2">Quiz Complete!</h1>
                    <p className="text-gray-600 dark:text-gray-400 mb-6">{selectedCategory}</p>
                    <div className="text-6xl font-bold gradient-text mb-2">{percentage}%</div>
                    <p className="text-xl text-gray-600 dark:text-gray-400 mb-8">
                        {finalScore} out of {quizQuestions.length} correct
                    </p>
                    <div className="flex gap-4 justify-center">
                        <button onClick={resetQuiz} className="btn-primary flex items-center gap-2">
                            <RotateCcw className="w-5 h-5" />
                            Try Again
                        </button>
                        <button onClick={resetQuiz} className="btn-secondary">
                            Choose Category
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    if (quizStarted && quizQuestions.length > 0) {
        const question = quizQuestions[currentQuestion];
        return (
            <div className="space-y-6 animate-fade-in max-w-3xl mx-auto">
                <div className="flex items-center justify-between">
                    <span className="badge badge-primary">{question.category}</span>
                    <span className="text-gray-600 dark:text-gray-400">
                        Question {currentQuestion + 1} of {quizQuestions.length}
                    </span>
                </div>

                <div className="progress-bar">
                    <div className="progress-fill" style={{ width: `${((currentQuestion + 1) / quizQuestions.length) * 100}%` }} />
                </div>

                <div className="card p-8">
                    <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-6">{question.question}</h2>
                    <div className="space-y-3">
                        {question.options.map((option, index) => (
                            <button
                                key={index}
                                onClick={() => handleAnswer(index)}
                                disabled={selectedAnswer !== null}
                                className={`w-full p-4 text-left rounded-xl border-2 transition-all ${selectedAnswer === null
                                    ? 'border-gray-200 dark:border-gray-700 hover:border-primary-500 hover:bg-primary-50 dark:hover:bg-primary-900/20'
                                    : index === question.correctAnswer
                                        ? 'border-emerald-500 bg-emerald-50 dark:bg-emerald-900/20'
                                        : selectedAnswer === index
                                            ? 'border-red-500 bg-red-50 dark:bg-red-900/20'
                                            : 'border-gray-200 dark:border-gray-700 opacity-50'
                                    }`}
                            >
                                <div className="flex items-center gap-3">
                                    <span className={`w-8 h-8 rounded-full flex items-center justify-center font-semibold ${selectedAnswer === null
                                        ? 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300'
                                        : index === question.correctAnswer
                                            ? 'bg-emerald-500 text-white'
                                            : selectedAnswer === index
                                                ? 'bg-red-500 text-white'
                                                : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300'
                                        }`}>
                                        {String.fromCharCode(65 + index)}
                                    </span>
                                    <span className="text-gray-800 dark:text-white">{option}</span>
                                    {selectedAnswer !== null && index === question.correctAnswer && (
                                        <CheckCircle className="w-5 h-5 text-emerald-500 ml-auto" />
                                    )}
                                    {selectedAnswer === index && index !== question.correctAnswer && (
                                        <XCircle className="w-5 h-5 text-red-500 ml-auto" />
                                    )}
                                </div>
                            </button>
                        ))}
                    </div>

                    {showExplanation && (
                        <div className="mt-6 p-4 rounded-xl bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800">
                            <p className="text-sm font-medium text-blue-800 dark:text-blue-300 mb-1">Explanation</p>
                            <p className="text-blue-700 dark:text-blue-400">{question.explanation}</p>
                        </div>
                    )}

                    {selectedAnswer !== null && (
                        <button onClick={nextQuestion} className="btn-primary mt-6 w-full flex items-center justify-center gap-2">
                            {currentQuestion + 1 < quizQuestions.length ? 'Next Question' : 'See Results'}
                            <ArrowRight className="w-5 h-5" />
                        </button>
                    )}
                </div>

                <div className="text-center">
                    <button onClick={resetQuiz} className="btn-ghost text-gray-500">
                        Exit Quiz
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="space-y-8 animate-fade-in">
            <div>
                <h1 className="text-2xl lg:text-3xl font-bold text-gray-800 dark:text-white flex items-center gap-3">
                    <HelpCircle className="w-8 h-8 text-primary-500" />
                    Quiz Center
                </h1>
                <p className="text-gray-600 dark:text-gray-400 mt-1">Test your PM knowledge across different categories</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {categories.map((category) => {
                    const stats = categoryStats.find(s => s.category === category);
                    const IconComponent = categoryIcons[category] || HelpCircle;
                    return (
                        <button
                            key={category}
                            onClick={() => startQuiz(category)}
                            className="card card-hover p-6 text-left"
                        >
                            <div className="flex items-start justify-between mb-4">
                                <div className="w-12 h-12 rounded-xl bg-primary-100 dark:bg-primary-900/50 flex items-center justify-center">
                                    <IconComponent className="w-6 h-6 text-primary-600 dark:text-primary-400" />
                                </div>
                                <ChevronRight className="w-5 h-5 text-gray-400" />
                            </div>
                            <h3 className="font-semibold text-gray-800 dark:text-white mb-1">{category}</h3>
                            <p className="text-sm text-gray-500 dark:text-gray-400 mb-3">
                                {category === 'All' ? questions.length : questions.filter(q => q.category === category).length} questions
                            </p>
                            {stats && stats.attempts > 0 && (
                                <div className="pt-2 border-t border-gray-100 dark:border-gray-700">
                                    <p className="text-xs text-gray-500 dark:text-gray-400">
                                        Best: {stats.bestScore}% | Avg: {stats.avgScore}% | Attempts: {stats.attempts}
                                    </p>
                                </div>
                            )}
                        </button>
                    );
                })}
            </div>

            {recentResults.length > 0 && (
                <div className="card p-6">
                    <h2 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">Recent Results</h2>
                    <div className="space-y-3">
                        {recentResults.map((result) => (
                            <div key={result.id} className="flex items-center justify-between p-3 rounded-xl bg-gray-50 dark:bg-gray-700/50">
                                <div>
                                    <p className="font-medium text-gray-800 dark:text-white">{result.category}</p>
                                    <p className="text-sm text-gray-500 dark:text-gray-400">
                                        {new Date(result.completedAt).toLocaleDateString('en-IE')}
                                    </p>
                                </div>
                                <div className={`text-xl font-bold ${result.percentage >= 70 ? 'text-emerald-500' : 'text-amber-500'}`}>
                                    {result.percentage}%
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};
