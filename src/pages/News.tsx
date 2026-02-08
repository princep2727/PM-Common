import React, { useState } from 'react';
import {
    Newspaper,
    ExternalLink,
    Filter,
    TrendingUp,
    Wrench,
    Users,
    Briefcase,
    Clock,
    AlertCircle,
} from 'lucide-react';
import { useNews } from '../hooks';

const categories = ['All', 'Industry News', 'Methodology Updates', 'Tool Releases', 'Career Insights'] as const;

const categoryIcons: Record<string, React.ElementType> = {
    'Industry News': TrendingUp,
    'Methodology Updates': Briefcase,
    'Tool Releases': Wrench,
    'Career Insights': Users,
};

const categoryColors: Record<string, string> = {
    'Industry News': 'bg-blue-100 dark:bg-blue-900/50 text-blue-700 dark:text-blue-300',
    'Methodology Updates': 'bg-purple-100 dark:bg-purple-900/50 text-purple-700 dark:text-purple-300',
    'Tool Releases': 'bg-emerald-100 dark:bg-emerald-900/50 text-emerald-700 dark:text-emerald-300',
    'Career Insights': 'bg-orange-100 dark:bg-orange-900/50 text-orange-700 dark:text-orange-300',
};

export const News: React.FC = () => {
    const [activeCategory, setActiveCategory] = useState<typeof categories[number]>('All');
    const { articles, loading, error } = useNews();

    const filteredArticles = activeCategory === 'All'
        ? articles
        : articles.filter(article => article.category === activeCategory);

    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-IE', { day: 'numeric', month: 'short', year: 'numeric' });
    };

    return (
        <div className="space-y-6 animate-fade-in">
            {/* Header */}
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                <div>
                    <h1 className="text-2xl lg:text-3xl font-bold text-gray-800 dark:text-white flex items-center gap-3">
                        <Newspaper className="w-8 h-8 text-primary-500" />
                        PM News
                    </h1>
                    <p className="text-gray-600 dark:text-gray-400 mt-1">Stay updated with the latest in project management</p>
                </div>
            </div>

            {/* Category Filters */}
            <div className="flex flex-wrap gap-2">
                <Filter className="w-5 h-5 text-gray-500 dark:text-gray-400 mr-2 self-center" />
                {categories.map((category) => (
                    <button
                        key={category}
                        onClick={() => setActiveCategory(category)}
                        className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${activeCategory === category
                            ? 'bg-primary-500 text-white shadow-lg'
                            : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                            }`}
                    >
                        {category}
                    </button>
                ))}
            </div>

            {/* Error State */}
            {error && (
                <div className="card p-6 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800">
                    <div className="flex items-center gap-3 text-red-700 dark:text-red-300">
                        <AlertCircle className="w-5 h-5" />
                        <p>{error}</p>
                    </div>
                </div>
            )}

            {/* Loading State */}
            {loading && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {[...Array(6)].map((_, i) => (
                        <div key={i} className="card p-6 animate-pulse">
                            <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-1/3 mb-4"></div>
                            <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-full mb-2"></div>
                            <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-2/3"></div>
                        </div>
                    ))}
                </div>
            )}

            {/* News Grid */}
            {!loading && !error && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {filteredArticles.map((article) => {
                        const IconComponent = categoryIcons[article.category] || Newspaper;
                        return (
                            <article
                                key={article.id}
                                className="card card-hover p-6 flex flex-col"
                            >
                                <div className="flex items-start justify-between mb-4">
                                    <span className={`badge ${categoryColors[article.category]}`}>
                                        <IconComponent className="w-4 h-4 mr-1" />
                                        {article.category}
                                    </span>
                                    {article.isNew && <span className="badge-new">New</span>}
                                </div>

                                <h2 className="text-lg font-semibold text-gray-800 dark:text-white mb-2 line-clamp-2">
                                    {article.title}
                                </h2>

                                <p className="text-gray-600 dark:text-gray-400 text-sm mb-4 flex-1 line-clamp-3">
                                    {article.description}
                                </p>

                                <div className="flex items-center justify-between pt-4 border-t border-gray-100 dark:border-gray-700">
                                    <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
                                        <span className="font-medium">{article.source}</span>
                                        <span>•</span>
                                        <Clock className="w-4 h-4" />
                                        <span>{formatDate(article.date)}</span>
                                    </div>
                                    <a
                                        href={article.url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex items-center gap-1 text-primary-500 hover:text-primary-600 text-sm font-medium"
                                    >
                                        Read <ExternalLink className="w-4 h-4" />
                                    </a>
                                </div>
                            </article>
                        );
                    })}
                </div>
            )}

            {/* Empty State */}
            {!loading && !error && filteredArticles.length === 0 && (
                <div className="card p-12 text-center">
                    <Newspaper className="w-16 h-16 text-gray-300 dark:text-gray-600 mx-auto mb-4" />
                    <p className="text-gray-500 dark:text-gray-400">No articles found in this category</p>
                </div>
            )}
        </div>
    );
};
