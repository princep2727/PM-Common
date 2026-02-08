import React from 'react';
import { Link } from 'react-router-dom';
import { useTasks, useQuizResults, useProgress } from '../hooks';
import {
    TrendingUp,
    CheckCircle,
    Target,
    Flame,
    ArrowRight,
    Newspaper,
    HelpCircle,
    Briefcase,
    BookOpen,
    Timer,
    Calendar,
    Sparkles,
} from 'lucide-react';

export const Dashboard: React.FC = () => {
    const { getTaskStats, getPendingTasks } = useTasks();
    const { getAverageScore, results } = useQuizResults();
    const { progress } = useProgress();
    const taskStats = getTaskStats();
    const pendingTasks = getPendingTasks().slice(0, 3);

    const quickNavCards = [
        { path: '/news', icon: Newspaper, label: 'PM News', desc: 'Latest industry updates', color: 'from-blue-500 to-cyan-500' },
        { path: '/quiz', icon: HelpCircle, label: 'Take Quiz', desc: 'Test your knowledge', color: 'from-purple-500 to-pink-500' },
        { path: '/career', icon: Briefcase, label: 'Career Center', desc: 'Find jobs in Ireland', color: 'from-emerald-500 to-teal-500' },
        { path: '/resources', icon: BookOpen, label: 'Resources', desc: 'Learning materials', color: 'from-orange-500 to-red-500' },
        { path: '/timer', icon: Timer, label: 'Study Timer', desc: 'Focus sessions', color: 'from-indigo-500 to-violet-500' },
    ];

    const getGreeting = () => {
        const hour = new Date().getHours();
        if (hour < 12) return 'Good Morning';
        if (hour < 17) return 'Good Afternoon';
        return 'Good Evening';
    };

    return (
        <div className="space-y-8 animate-fade-in">
            {/* Welcome Section */}
            <div className="relative overflow-hidden rounded-3xl gradient-bg p-8 text-white">
                <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2" />
                <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/10 rounded-full translate-y-1/2 -translate-x-1/2" />
                <div className="relative z-10">
                    <div className="flex items-center gap-2 mb-2">
                        <Sparkles className="w-5 h-5" />
                        <span className="text-white/80 text-sm font-medium">Welcome back!</span>
                    </div>
                    <h1 className="text-3xl lg:text-4xl font-bold mb-2">{getGreeting()}, Future PM! 🎯</h1>
                    <p className="text-white/80 text-lg max-w-2xl">
                        Keep pushing forward! Every task completed brings you closer to your PM career goals in Ireland's thriving tech sector.
                    </p>
                </div>
            </div>

            {/* Stats Overview */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="stat-card">
                    <div className="flex items-center justify-between mb-4">
                        <div className="w-12 h-12 rounded-xl bg-emerald-100 dark:bg-emerald-900/50 flex items-center justify-center">
                            <CheckCircle className="w-6 h-6 text-emerald-600 dark:text-emerald-400" />
                        </div>
                        <span className="text-2xl font-bold text-gray-800 dark:text-white">{taskStats.completed}</span>
                    </div>
                    <h3 className="font-semibold text-gray-700 dark:text-gray-200">Tasks Completed</h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">{taskStats.pending} pending</p>
                </div>

                <div className="stat-card">
                    <div className="flex items-center justify-between mb-4">
                        <div className="w-12 h-12 rounded-xl bg-purple-100 dark:bg-purple-900/50 flex items-center justify-center">
                            <Target className="w-6 h-6 text-purple-600 dark:text-purple-400" />
                        </div>
                        <span className="text-2xl font-bold text-gray-800 dark:text-white">{getAverageScore()}%</span>
                    </div>
                    <h3 className="font-semibold text-gray-700 dark:text-gray-200">Avg Quiz Score</h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">{results.length} quizzes taken</p>
                </div>

                <div className="stat-card">
                    <div className="flex items-center justify-between mb-4">
                        <div className="w-12 h-12 rounded-xl bg-orange-100 dark:bg-orange-900/50 flex items-center justify-center">
                            <Flame className="w-6 h-6 text-orange-600 dark:text-orange-400" />
                        </div>
                        <span className="text-2xl font-bold text-gray-800 dark:text-white">{progress.streakDays}</span>
                    </div>
                    <h3 className="font-semibold text-gray-700 dark:text-gray-200">Day Streak</h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Best: {progress.longestStreak} days</p>
                </div>

                <div className="stat-card">
                    <div className="flex items-center justify-between mb-4">
                        <div className="w-12 h-12 rounded-xl bg-blue-100 dark:bg-blue-900/50 flex items-center justify-center">
                            <TrendingUp className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                        </div>
                        <span className="text-2xl font-bold text-gray-800 dark:text-white">{Math.floor(progress.studyTimeMinutes / 60)}h</span>
                    </div>
                    <h3 className="font-semibold text-gray-700 dark:text-gray-200">Study Time</h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">{progress.studyTimeMinutes % 60}m this session</p>
                </div>
            </div>

            {/* Today's Tasks & Quick Nav */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Today's Tasks */}
                <div className="lg:col-span-1 card p-6">
                    <div className="flex items-center justify-between mb-6">
                        <h2 className="text-xl font-bold text-gray-800 dark:text-white flex items-center gap-2">
                            <Calendar className="w-5 h-5 text-primary-500" />
                            Today's Tasks
                        </h2>
                        <Link to="/tasks" className="text-primary-500 hover:text-primary-600 text-sm font-medium flex items-center gap-1">
                            View all <ArrowRight className="w-4 h-4" />
                        </Link>
                    </div>
                    {pendingTasks.length > 0 ? (
                        <div className="space-y-3">
                            {pendingTasks.map((task) => (
                                <div key={task.id} className="flex items-start gap-3 p-3 rounded-xl bg-gray-50 dark:bg-gray-700/50">
                                    <div className={`w-3 h-3 rounded-full mt-1.5 ${task.priority === 'High' ? 'bg-red-500' :
                                            task.priority === 'Medium' ? 'bg-amber-500' : 'bg-green-500'
                                        }`} />
                                    <div>
                                        <p className="font-medium text-gray-800 dark:text-white">{task.title}</p>
                                        <span className="text-xs text-gray-500 dark:text-gray-400">{task.category}</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-8">
                            <CheckCircle className="w-12 h-12 text-emerald-500 mx-auto mb-3" />
                            <p className="text-gray-600 dark:text-gray-400">All caught up! Add new tasks to keep learning.</p>
                        </div>
                    )}
                </div>

                {/* Quick Navigation */}
                <div className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {quickNavCards.map((card) => (
                        <Link
                            key={card.path}
                            to={card.path}
                            className="group card card-hover p-5"
                        >
                            <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${card.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                                <card.icon className="w-6 h-6 text-white" />
                            </div>
                            <h3 className="font-semibold text-gray-800 dark:text-white mb-1">{card.label}</h3>
                            <p className="text-sm text-gray-500 dark:text-gray-400">{card.desc}</p>
                        </Link>
                    ))}
                </div>
            </div>

            {/* Motivational Section */}
            <div className="card p-6 text-center">
                <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-2">💡 PM Tip of the Day</h3>
                <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
                    "The key to successful project management is not just about tools and techniques—it's about building relationships and trust with your stakeholders."
                </p>
            </div>
        </div>
    );
};
