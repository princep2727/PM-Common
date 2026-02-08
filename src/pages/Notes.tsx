import React, { useState } from 'react';
import { useNotes } from '../hooks/useNotes';
import {
    StickyNote,
    Plus,
    Search,
    Trash2,
    Edit2,
    Tag,
    Clock,
    X,
    Save,
} from 'lucide-react';

export const Notes: React.FC = () => {
    const { notes, addNote, updateNote, deleteNote, searchNotes, getAllTags } = useNotes();
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedTag, setSelectedTag] = useState<string | null>(null);
    const [showForm, setShowForm] = useState(false);
    const [editingId, setEditingId] = useState<string | null>(null);
    const [formData, setFormData] = useState({
        title: '',
        content: '',
        tags: '',
    });

    const allTags = getAllTags();

    const filteredNotes = selectedTag
        ? notes.filter(n => n.tags.includes(selectedTag))
        : searchQuery
            ? searchNotes(searchQuery)
            : notes;

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!formData.title.trim()) return;

        const tagsArray = formData.tags
            .split(',')
            .map(tag => tag.trim())
            .filter(tag => tag.length > 0);

        if (editingId) {
            updateNote(editingId, {
                title: formData.title,
                content: formData.content,
                tags: tagsArray,
            });
            setEditingId(null);
        } else {
            addNote({
                title: formData.title,
                content: formData.content,
                tags: tagsArray,
            });
        }
        setFormData({ title: '', content: '', tags: '' });
        setShowForm(false);
    };

    const handleEdit = (note: typeof notes[0]) => {
        setFormData({
            title: note.title,
            content: note.content,
            tags: note.tags.join(', '),
        });
        setEditingId(note.id);
        setShowForm(true);
    };

    const handleDelete = (id: string) => {
        if (confirm('Are you sure you want to delete this note?')) {
            deleteNote(id);
        }
    };

    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-IE', {
            day: 'numeric',
            month: 'short',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
        });
    };

    const tagColors = [
        'bg-blue-100 dark:bg-blue-900/50 text-blue-700 dark:text-blue-300',
        'bg-purple-100 dark:bg-purple-900/50 text-purple-700 dark:text-purple-300',
        'bg-emerald-100 dark:bg-emerald-900/50 text-emerald-700 dark:text-emerald-300',
        'bg-amber-100 dark:bg-amber-900/50 text-amber-700 dark:text-amber-300',
        'bg-pink-100 dark:bg-pink-900/50 text-pink-700 dark:text-pink-300',
        'bg-indigo-100 dark:bg-indigo-900/50 text-indigo-700 dark:text-indigo-300',
    ];

    const getTagColor = (tag: string) => {
        const index = tag.length % tagColors.length;
        return tagColors[index];
    };

    return (
        <div className="space-y-6 animate-fade-in">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                <div>
                    <h1 className="text-2xl lg:text-3xl font-bold text-gray-800 dark:text-white flex items-center gap-3">
                        <StickyNote className="w-8 h-8 text-primary-500" />
                        Notes
                    </h1>
                    <p className="text-gray-600 dark:text-gray-400 mt-1">Capture your PM learning insights</p>
                </div>
                <button onClick={() => setShowForm(true)} className="btn-primary flex items-center gap-2">
                    <Plus className="w-5 h-5" />
                    New Note
                </button>
            </div>

            {/* Search & Tags */}
            <div className="space-y-4">
                <div className="relative">
                    <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                        type="text"
                        placeholder="Search notes..."
                        value={searchQuery}
                        onChange={(e) => {
                            setSearchQuery(e.target.value);
                            setSelectedTag(null);
                        }}
                        className="input-field pl-12"
                    />
                </div>

                {allTags.length > 0 && (
                    <div className="flex flex-wrap gap-2">
                        <Tag className="w-4 h-4 text-gray-500 dark:text-gray-400 self-center mr-1" />
                        <button
                            onClick={() => setSelectedTag(null)}
                            className={`px-3 py-1 rounded-full text-sm font-medium transition-all ${!selectedTag
                                    ? 'bg-primary-500 text-white'
                                    : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                                }`}
                        >
                            All
                        </button>
                        {allTags.map((tag) => (
                            <button
                                key={tag}
                                onClick={() => {
                                    setSelectedTag(tag);
                                    setSearchQuery('');
                                }}
                                className={`px-3 py-1 rounded-full text-sm font-medium transition-all ${selectedTag === tag
                                        ? 'bg-primary-500 text-white'
                                        : `${getTagColor(tag)} hover:opacity-80`
                                    }`}
                            >
                                {tag}
                            </button>
                        ))}
                    </div>
                )}
            </div>

            {/* Note Form Modal */}
            {showForm && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
                    <div className="card p-6 w-full max-w-2xl animate-slide-up max-h-[90vh] overflow-y-auto">
                        <div className="flex items-center justify-between mb-4">
                            <h2 className="text-xl font-bold text-gray-800 dark:text-white">
                                {editingId ? 'Edit Note' : 'New Note'}
                            </h2>
                            <button
                                onClick={() => {
                                    setShowForm(false);
                                    setEditingId(null);
                                    setFormData({ title: '', content: '', tags: '' });
                                }}
                                className="p-2 rounded-lg text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-700"
                            >
                                <X className="w-5 h-5" />
                            </button>
                        </div>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                    Title
                                </label>
                                <input
                                    type="text"
                                    value={formData.title}
                                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                    className="input-field"
                                    placeholder="Note title"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                    Content
                                </label>
                                <textarea
                                    value={formData.content}
                                    onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                                    className="input-field resize-none font-mono"
                                    rows={10}
                                    placeholder="Write your notes here... (supports plain text)"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                    Tags (comma-separated)
                                </label>
                                <input
                                    type="text"
                                    value={formData.tags}
                                    onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
                                    className="input-field"
                                    placeholder="e.g., Agile, Scrum, Interview"
                                />
                            </div>
                            <div className="flex gap-3 pt-2">
                                <button type="submit" className="btn-primary flex-1 flex items-center justify-center gap-2">
                                    <Save className="w-5 h-5" />
                                    {editingId ? 'Update Note' : 'Save Note'}
                                </button>
                                <button
                                    type="button"
                                    onClick={() => {
                                        setShowForm(false);
                                        setEditingId(null);
                                        setFormData({ title: '', content: '', tags: '' });
                                    }}
                                    className="btn-secondary"
                                >
                                    Cancel
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* Notes Grid */}
            {filteredNotes.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {filteredNotes.map((note) => (
                        <div key={note.id} className="card p-5 flex flex-col">
                            <div className="flex items-start justify-between gap-2 mb-3">
                                <h3 className="font-semibold text-gray-800 dark:text-white line-clamp-2">
                                    {note.title}
                                </h3>
                                <div className="flex items-center gap-1 flex-shrink-0">
                                    <button
                                        onClick={() => handleEdit(note)}
                                        className="p-1.5 rounded-lg text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-700"
                                    >
                                        <Edit2 className="w-4 h-4" />
                                    </button>
                                    <button
                                        onClick={() => handleDelete(note.id)}
                                        className="p-1.5 rounded-lg text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20"
                                    >
                                        <Trash2 className="w-4 h-4" />
                                    </button>
                                </div>
                            </div>

                            <p className="text-gray-600 dark:text-gray-400 text-sm flex-1 line-clamp-4 whitespace-pre-wrap">
                                {note.content || 'No content'}
                            </p>

                            {note.tags.length > 0 && (
                                <div className="flex flex-wrap gap-1 mt-3">
                                    {note.tags.map((tag) => (
                                        <span
                                            key={tag}
                                            className={`px-2 py-0.5 rounded-full text-xs font-medium ${getTagColor(tag)}`}
                                        >
                                            {tag}
                                        </span>
                                    ))}
                                </div>
                            )}

                            <div className="flex items-center gap-1 mt-3 pt-3 border-t border-gray-100 dark:border-gray-700 text-xs text-gray-500 dark:text-gray-400">
                                <Clock className="w-3 h-3" />
                                {formatDate(note.updatedAt)}
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <div className="card p-12 text-center">
                    <StickyNote className="w-16 h-16 text-gray-300 dark:text-gray-600 mx-auto mb-4" />
                    <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-300 mb-2">
                        {searchQuery || selectedTag ? 'No notes found' : 'No notes yet'}
                    </h3>
                    <p className="text-gray-500 dark:text-gray-400 mb-4">
                        {searchQuery || selectedTag
                            ? 'Try a different search term or filter'
                            : 'Start capturing your PM learning journey'}
                    </p>
                    {!searchQuery && !selectedTag && (
                        <button onClick={() => setShowForm(true)} className="btn-primary">
                            <Plus className="w-5 h-5 mr-2" />
                            Create Your First Note
                        </button>
                    )}
                </div>
            )}
        </div>
    );
};
