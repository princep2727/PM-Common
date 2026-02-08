import React from 'react';
import { useTasks, useQuizResults, useProgress } from '../hooks';
import {
    TrendingUp,
    CheckCircle,
    Target,
    Flame,
    Trophy,
    Clock,
    Calendar,
    Lock,
} from 'lucide-react';

export const Progress: React.FC = () => {
    const { getTaskStats } = useTasks();
    const { getAverageScore, getCategoryStats } = useQuizResults();
    const { progress, getUnlockedAchievements, getLockedAchievements } = useProgress();

    const taskStats = getTaskStats();
    const categoryStats = getCategoryStats();
    const unlockedAchievements = getUnlockedAchievements();
    const lockedAchievements = getLockedAchievements();

    const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const maxStudyMinutes = Math.max(...progress.weeklyStudyMinutes, 1);

    return (
        <div className="space-y-8 animate-fade-in">
            <div>
                <h1 className="text-2xl lg:text-3xl font-bold text-gray-800 dark:text-white flex items-center gap-3">
                    <TrendingUp className="w-8 h-8 text-primary-500" />
                    My Progress
                </h1>
                <p className="text-gray-600 dark:text-gray-400 mt-1">Track your PM learning journey</p>
            </div>

            {/* Overview Stats */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="stat-card">
                    <div className="flex items-center gap-3 mb-4">
                        <div className="w-12 h-12 rounded-xl bg-emerald-100 dark:bg-emerald-900/50 flex items-center justify-center">
                            <CheckCircle className="w-6 h-6 text-emerald-600 dark:text-emerald-400" />
                        </div>
                    </div>
                    <p className="text-3xl font-bold text-gray-800 dark:text-white">{taskStats.completed}</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Tasks Completed</p>
                </div>

                <div className="stat-card">
                    <div className="flex items-center gap-3 mb-4">
                        <div className="w-12 h-12 rounded-xl bg-purple-100 dark:bg-purple-900/50 flex items-center justify-center">
                            <Target className="w-6 h-6 text-purple-600 dark:text-purple-400" />
                        </div>
                    </div>
                    <p className="text-3xl font-bold text-gray-800 dark:text-white">{getAverageScore()}%</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Quiz Average</p>
                </div>

                <div className="stat-card">
                    <div className="flex items-center gap-3 mb-4">
                        <div className="w-12 h-12 rounded-xl bg-orange-100 dark:bg-orange-900/50 flex items-center justify-center">
                            <Flame className="w-6 h-6 text-orange-600 dark:text-orange-400" />
                        </div>
                    </div>
                    <p className="text-3xl font-bold text-gray-800 dark:text-white">{progress.streakDays}</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Day Streak</p>
                </div>

                <div className="stat-card">
                    <div className="flex items-center gap-3 mb-4">
                        <div className="w-12 h-12 rounded-xl bg-blue-100 dark:bg-blue-900/50 flex items-center justify-center">
                            <Clock className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                        </div>
                    </div>
                    <p className="text-3xl font-bold text-gray-800 dark:text-white">{Math.floor(progress.studyTimeMinutes / 60)}h {progress.studyTimeMinutes % 60}m</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Study Time</p>
                </div>
            </div>

            {/* Charts Row */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Weekly Study Time Chart */}
                <div className="card p-6">
                    <h2 className="text-lg font-semibold text-gray-800 dark:text-white mb-6 flex items-center gap-2">
                        <Calendar className="w-5 h-5 text-primary-500" />
                        Weekly Study Time
                    </h2>
                    <div className="flex items-end justify-between h-48 gap-2">
                        {progress.weeklyStudyMinutes.map((minutes, index) => (
                            <div key={index} className="flex-1 flex flex-col items-center">
                                <div className="w-full flex flex-col items-center justify-end h-40">
                                    <span className="text-xs text-gray-500 dark:text-gray-400 mb-1">
                                        {minutes > 0 ? `${minutes}m` : ''}
                                    </span>
                                    <div
                                        className="w-full rounded-t-lg bg-gradient-to-t from-primary-500 to-accent-500 transition-all duration-500"
                                        style={{ height: `${(minutes / maxStudyMinutes) * 100}%`, minHeight: minutes > 0 ? '8px' : '0' }}
                                    />
                                </div>
                                <span className="text-xs text-gray-600 dark:text-gray-400 mt-2">{days[index]}</span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Task Completion Chart */}
                <div className="card p-6">
                    <h2 className="text-lg font-semibold text-gray-800 dark:text-white mb-6 flex items-center gap-2">
                        <CheckCircle className="w-5 h-5 text-emerald-500" />
                        Task Completion
                    </h2>
                    <div className="flex items-center justify-center h-48">
                        <div className="relative w-40 h-40">
                            <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                                <circle
                                    cx="50"
                                    cy="50"
                                    r="40"
                                    stroke="currentColor"
                                    strokeWidth="12"
                                    fill="none"
                                    className="text-gray-200 dark:text-gray-700"
                                />
                                <circle
                                    cx="50"
                                    cy="50"
                                    r="40"
                                    stroke="url(#gradient)"
                                    strokeWidth="12"
                                    fill="none"
                                    strokeLinecap="round"
                                    strokeDasharray={`${(taskStats.completed / Math.max(taskStats.total, 1)) * 251.2} 251.2`}
                                    className="transition-all duration-500"
                                />
                                <defs>
                                    <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                                        <stop offset="0%" stopColor="#6366f1" />
                                        <stop offset="100%" stopColor="#a855f7" />
                                    </linearGradient>
                                </defs>
                            </svg>
                            <div className="absolute inset-0 flex flex-col items-center justify-center">
                                <span className="text-3xl font-bold text-gray-800 dark:text-white">
                                    {taskStats.total > 0 ? Math.round((taskStats.completed / taskStats.total) * 100) : 0}%
                                </span>
                                <span className="text-sm text-gray-500 dark:text-gray-400">Complete</span>
                            </div>
                        </div>
                        <div className="ml-6 space-y-2">
                            <div className="flex items-center gap-2">
                                <div className="w-3 h-3 rounded-full bg-emerald-500" />
                                <span className="text-sm text-gray-600 dark:text-gray-400">Completed: {taskStats.completed}</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <div className="w-3 h-3 rounded-full bg-amber-500" />
                                <span className="text-sm text-gray-600 dark:text-gray-400">Pending: {taskStats.pending}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Quiz Performance by Category */}
            <div className="card p-6">
                <h2 className="text-lg font-semibold text-gray-800 dark:text-white mb-6 flex items-center gap-2">
                    <Target className="w-5 h-5 text-purple-500" />
                    Quiz Performance by Category
                </h2>
                <div className="space-y-4">
                    {categoryStats.map((cat) => (
                        <div key={cat.category}>
                            <div className="flex items-center justify-between mb-2">
                                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{cat.category}</span>
                                <span className="text-sm text-gray-500 dark:text-gray-400">
                                    {cat.attempts > 0 ? `${cat.avgScore}% avg` : 'Not attempted'}
                                </span>
                            </div>
                            <div className="progress-bar">
                                <div
                                    className="progress-fill"
                                    style={{ width: `${cat.avgScore}%` }}
                                />
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Achievements */}
            <div className="card p-6">
                <h2 className="text-lg font-semibold text-gray-800 dark:text-white mb-6 flex items-center gap-2">
                    <Trophy className="w-5 h-5 text-amber-500" />
                    Achievements
                </h2>

                {unlockedAchievements.length > 0 && (
                    <div className="mb-6">
                        <h3 className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-3">Unlocked</h3>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                            {unlockedAchievements.map((achievement) => (
                                <div
                                    key={achievement.id}
                                    className="p-4 rounded-xl bg-gradient-to-br from-amber-50 to-orange-50 dark:from-amber-900/20 dark:to-orange-900/20 border border-amber-200 dark:border-amber-800"
                                >
                                    <div className="text-3xl mb-2">{achievement.icon}</div>
                                    <h4 className="font-semibold text-gray-800 dark:text-white text-sm">{achievement.title}</h4>
                                    <p className="text-xs text-gray-500 dark:text-gray-400">{achievement.description}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                <div>
                    <h3 className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-3">Locked</h3>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        {lockedAchievements.map((achievement) => (
                            <div
                                key={achievement.id}
                                className="p-4 rounded-xl bg-gray-100 dark:bg-gray-700/50 opacity-60"
                            >
                                <div className="text-3xl mb-2 grayscale">{achievement.icon}</div>
                                <h4 className="font-semibold text-gray-600 dark:text-gray-400 text-sm flex items-center gap-1">
                                    <Lock className="w-3 h-3" />
                                    {achievement.title}
                                </h4>
                                <p className="text-xs text-gray-500 dark:text-gray-500">{achievement.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};
