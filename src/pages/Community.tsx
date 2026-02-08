import React, { useState } from 'react';
import { useCommunity } from '../hooks/useCommunity';
import { useAuth } from '../contexts/AuthContext';
import {
    MessageSquare,
    Plus,
    Search,
    Heart,
    MessageCircle,
    X,
} from 'lucide-react';

export const Community: React.FC = () => {
    const { posts, loading, error, addPost, likePost } = useCommunity();
    const { user } = useAuth();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedCategory, setSelectedCategory] = useState<string>('All');

    // Form State
    const [newTitle, setNewTitle] = useState('');
    const [newContent, setNewContent] = useState('');
    const [newCategory, setNewCategory] = useState('General');
    const [submitting, setSubmitting] = useState(false);

    const categories = ['All', 'General', 'Career Advice', 'Interview Prep', 'Product Strategy', 'Tools & Tech'];

    const filteredPosts = posts.filter(post => {
        const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            post.content.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesCategory = selectedCategory === 'All' || post.category === selectedCategory;
        return matchesSearch && matchesCategory;
    });

    const handleCreatePost = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!newTitle.trim() || !newContent.trim()) return;

        setSubmitting(true);
        try {
            await addPost(newTitle, newContent, newCategory);
            setIsModalOpen(false);
            setNewTitle('');
            setNewContent('');
            setNewCategory('General');
        } catch (err) {
            console.error(err);
            alert('Failed to post. Please try again.');
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <div className="space-y-6 animate-fade-in max-w-5xl mx-auto">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl lg:text-3xl font-bold text-gray-800 dark:text-white flex items-center gap-3">
                        <MessageSquare className="w-8 h-8 text-primary-500" />
                        Community Board
                    </h1>
                    <p className="text-gray-600 dark:text-gray-400 mt-1">Connect, share, and learn with other PMs</p>
                </div>
                <button
                    onClick={() => {
                        if (!user) {
                            alert('Please sign in to post!');
                            return;
                        }
                        setIsModalOpen(true);
                    }}
                    className="btn-primary flex items-center gap-2 shadow-lg hover:shadow-primary-500/20"
                >
                    <Plus className="w-5 h-5" />
                    New Discussion
                </button>
            </div>

            {/* Filters & Search */}
            <div className="flex flex-col lg:flex-row gap-4">
                <div className="relative flex-1">
                    <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                        type="text"
                        placeholder="Search discussions..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="input-field pl-12"
                    />
                </div>
                <div className="flex overflow-x-auto gap-2 pb-2 lg:pb-0 hide-scrollbar">
                    {categories.slice(1).map((category) => ( /* Skip 'All' in buttons if using chips, or keep it */
                        <button
                            key={category}
                            onClick={() => setSelectedCategory(category === selectedCategory ? 'All' : category)}
                            className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all border ${selectedCategory === category
                                ? 'bg-primary-500 text-white border-primary-500'
                                : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700'
                                }`}
                        >
                            {category}
                        </button>
                    ))}
                </div>
            </div>

            {/* Error State */}
            {error && (
                <div className="p-4 bg-red-50 text-red-700 rounded-xl border border-red-200">
                    {error}
                </div>
            )}

            {/* Posts List */}
            {loading ? (
                <div className="space-y-4">
                    {[...Array(3)].map((_, i) => (
                        <div key={i} className="card p-6 animate-pulse">
                            <div className="flex gap-4">
                                <div className="w-10 h-10 bg-gray-200 dark:bg-gray-700 rounded-full"></div>
                                <div className="flex-1 space-y-2">
                                    <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4"></div>
                                    <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-1/4"></div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            ) : filteredPosts.length === 0 ? (
                <div className="text-center py-12">
                    <div className="w-16 h-16 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-4">
                        <MessageCircle className="w-8 h-8 text-gray-400" />
                    </div>
                    <h3 className="text-lg font-semibold text-gray-800 dark:text-white">No discussions yet</h3>
                    <p className="text-gray-500 dark:text-gray-400 mt-2">Be the first to start a conversation!</p>
                </div>
            ) : (
                <div className="space-y-4">
                    {filteredPosts.map((post) => (
                        <div key={post.id} className="card p-6 hover:shadow-md transition-shadow">
                            <div className="flex items-start gap-4">
                                {post.authorPhoto ? (
                                    <img src={post.authorPhoto} alt={post.authorName} className="w-10 h-10 rounded-full object-cover border border-gray-200 dark:border-gray-700" />
                                ) : (
                                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 to-indigo-500 flex items-center justify-center text-white font-bold text-sm">
                                        {post.authorName.charAt(0)}
                                    </div>
                                )}
                                <div className="flex-1 min-w-0">
                                    <div className="flex items-center gap-2 mb-1">
                                        <h3 className="font-semibold text-lg text-gray-900 dark:text-white truncate">
                                            {post.title}
                                        </h3>
                                        <span className={`px-2 py-0.5 rounded text-xs font-medium ${post.category === 'Career Advice' ? 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300' :
                                            post.category === 'Interview Prep' ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300' :
                                                'bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300'
                                            }`}>
                                            {post.category}
                                        </span>
                                    </div>
                                    <p className="text-sm text-gray-500 dark:text-gray-400 mb-3">
                                        Posted by <span className="font-medium text-gray-700 dark:text-gray-300">{post.authorName}</span> • {post.createdAt?.toDate().toLocaleDateString()}
                                    </p>
                                    <p className="text-gray-700 dark:text-gray-300 leading-relaxed whitespace-pre-wrap">
                                        {post.content}
                                    </p>

                                    <div className="flex items-center gap-6 mt-4 pt-4 border-t border-gray-100 dark:border-gray-700/50">
                                        <button
                                            onClick={() => likePost(post.id)}
                                            className="flex items-center gap-2 text-gray-500 hover:text-red-500 transition-colors group"
                                        >
                                            <Heart className="w-5 h-5 group-hover:fill-red-500" />
                                            <span className="text-sm font-medium">{post.likes || 0} Likes</span>
                                        </button>
                                        <button className="flex items-center gap-2 text-gray-500 hover:text-blue-500 transition-colors">
                                            <MessageCircle className="w-5 h-5" />
                                            <span className="text-sm font-medium">{post.commentsCount || 0} Comments</span>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {/* Create Post Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-fade-in">
                    <div className="bg-white dark:bg-gray-800 rounded-2xl w-full max-w-lg shadow-xl overflow-hidden animate-scale-in">
                        <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between">
                            <h2 className="text-xl font-bold text-gray-800 dark:text-white">Create New Discussion</h2>
                            <button onClick={() => setIsModalOpen(false)} className="text-gray-500 hover:text-gray-700 dark:hover:text-gray-300">
                                <X className="w-6 h-6" />
                            </button>
                        </div>
                        <form onSubmit={handleCreatePost} className="p-6 space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                    Topic Title
                                </label>
                                <input
                                    type="text"
                                    required
                                    value={newTitle}
                                    onChange={(e) => setNewTitle(e.target.value)}
                                    placeholder="What do you want to discuss?"
                                    className="input-field"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                    Category
                                </label>
                                <select
                                    value={newCategory}
                                    onChange={(e) => setNewCategory(e.target.value)}
                                    className="input-field"
                                >
                                    {categories.slice(1).map(cat => (
                                        <option key={cat} value={cat}>{cat}</option>
                                    ))}
                                </select>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                    Content
                                </label>
                                <textarea
                                    required
                                    value={newContent}
                                    onChange={(e) => setNewContent(e.target.value)}
                                    placeholder="Share your thoughts, questions, or insights..."
                                    rows={5}
                                    className="input-field resize-none"
                                />
                            </div>

                            <div className="flex justify-end gap-3 pt-2">
                                <button
                                    type="button"
                                    onClick={() => setIsModalOpen(false)}
                                    className="px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg font-medium transition-colors"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    disabled={submitting}
                                    className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    {submitting ? 'Posting...' : 'Post Discussion'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};
