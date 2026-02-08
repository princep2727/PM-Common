import React, { useState } from 'react';
import { useTasks } from '../hooks/useTasks';
import type { Task } from '../hooks/useTasks';
import {
    CheckSquare,
    Plus,
    Trash2,
    Edit2,
    Check,
    Calendar,
    Flag,
    BookOpen,
    Briefcase,
    Users,
    Wrench,
    Sparkles,
} from 'lucide-react';

const categoryIcons: Record<Task['category'], React.ElementType> = {
    Learning: BookOpen,
    Practice: Briefcase,
    Networking: Users,
    Tools: Wrench,
};

const categoryColors: Record<Task['category'], string> = {
    Learning: 'bg-blue-100 dark:bg-blue-900/50 text-blue-700 dark:text-blue-300',
    Practice: 'bg-purple-100 dark:bg-purple-900/50 text-purple-700 dark:text-purple-300',
    Networking: 'bg-emerald-100 dark:bg-emerald-900/50 text-emerald-700 dark:text-emerald-300',
    Tools: 'bg-orange-100 dark:bg-orange-900/50 text-orange-700 dark:text-orange-300',
};

const priorityColors: Record<Task['priority'], string> = {
    High: 'text-red-500',
    Medium: 'text-amber-500',
    Low: 'text-green-500',
};

const quickTasks = [
    { title: 'Watch a PM tutorial video', category: 'Learning' as const, priority: 'Medium' as const },
    { title: 'Complete Jira basics course', category: 'Tools' as const, priority: 'High' as const },
    { title: 'Connect with 3 PMs on LinkedIn', category: 'Networking' as const, priority: 'Medium' as const },
    { title: 'Practice user story writing', category: 'Practice' as const, priority: 'High' as const },
    { title: 'Read about Agile ceremonies', category: 'Learning' as const, priority: 'Low' as const },
    { title: 'Set up Trello board for learning', category: 'Tools' as const, priority: 'Low' as const },
];

export const Tasks: React.FC = () => {
    const { tasks, addTask, updateTask, deleteTask, toggleComplete, getTaskStats } = useTasks();
    const [showForm, setShowForm] = useState(false);
    const [editingId, setEditingId] = useState<string | null>(null);
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        category: 'Learning' as Task['category'],
        priority: 'Medium' as Task['priority'],
        dueDate: new Date().toISOString().split('T')[0],
    });

    const stats = getTaskStats();

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!formData.title.trim()) return;

        if (editingId) {
            updateTask(editingId, formData);
            setEditingId(null);
        } else {
            addTask(formData);
        }
        setFormData({
            title: '',
            description: '',
            category: 'Learning',
            priority: 'Medium',
            dueDate: new Date().toISOString().split('T')[0],
        });
        setShowForm(false);
    };

    const handleEdit = (task: Task) => {
        setFormData({
            title: task.title,
            description: task.description,
            category: task.category,
            priority: task.priority,
            dueDate: task.dueDate,
        });
        setEditingId(task.id);
        setShowForm(true);
    };

    const handleQuickAdd = (quickTask: typeof quickTasks[0]) => {
        addTask({
            ...quickTask,
            description: '',
            dueDate: new Date().toISOString().split('T')[0],
        });
    };

    const sortedTasks = [...tasks].sort((a, b) => {
        if (a.completed !== b.completed) return a.completed ? 1 : -1;
        const priorityOrder = { High: 0, Medium: 1, Low: 2 };
        return priorityOrder[a.priority] - priorityOrder[b.priority];
    });

    return (
        <div className="space-y-6 animate-fade-in">
            {/* Header */}
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                <div>
                    <h1 className="text-2xl lg:text-3xl font-bold text-gray-800 dark:text-white flex items-center gap-3">
                        <CheckSquare className="w-8 h-8 text-primary-500" />
                        Daily Tasks
                    </h1>
                    <p className="text-gray-600 dark:text-gray-400 mt-1">Manage your PM learning journey</p>
                </div>
                <button
                    onClick={() => setShowForm(true)}
                    className="btn-primary flex items-center gap-2"
                >
                    <Plus className="w-5 h-5" />
                    Add Task
                </button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="card p-4 text-center">
                    <p className="text-2xl font-bold text-gray-800 dark:text-white">{stats.total}</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Total Tasks</p>
                </div>
                <div className="card p-4 text-center">
                    <p className="text-2xl font-bold text-emerald-500">{stats.completed}</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Completed</p>
                </div>
                <div className="card p-4 text-center">
                    <p className="text-2xl font-bold text-amber-500">{stats.pending}</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Pending</p>
                </div>
                <div className="card p-4 text-center">
                    <p className="text-2xl font-bold text-red-500">{stats.highPriority}</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">High Priority</p>
                </div>
            </div>

            {/* Quick Add Tasks */}
            <div className="card p-6">
                <h2 className="text-lg font-semibold text-gray-800 dark:text-white mb-4 flex items-center gap-2">
                    <Sparkles className="w-5 h-5 text-amber-500" />
                    Quick Add PM Tasks
                </h2>
                <div className="flex flex-wrap gap-2">
                    {quickTasks.map((task, index) => (
                        <button
                            key={index}
                            onClick={() => handleQuickAdd(task)}
                            className="px-4 py-2 rounded-xl bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 text-sm hover:bg-primary-100 dark:hover:bg-primary-900/30 hover:text-primary-600 dark:hover:text-primary-400 transition-all flex items-center gap-2"
                        >
                            <Plus className="w-4 h-4" />
                            {task.title}
                        </button>
                    ))}
                </div>
            </div>

            {/* Task Form Modal */}
            {showForm && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
                    <div className="card p-6 w-full max-w-md animate-slide-up">
                        <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-4">
                            {editingId ? 'Edit Task' : 'Add New Task'}
                        </h2>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Title</label>
                                <input
                                    type="text"
                                    value={formData.title}
                                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                    className="input-field"
                                    placeholder="Enter task title"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Description</label>
                                <textarea
                                    value={formData.description}
                                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                    className="input-field resize-none"
                                    rows={3}
                                    placeholder="Optional description"
                                />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Category</label>
                                    <select
                                        value={formData.category}
                                        onChange={(e) => setFormData({ ...formData, category: e.target.value as Task['category'] })}
                                        className="input-field"
                                    >
                                        <option value="Learning">Learning</option>
                                        <option value="Practice">Practice</option>
                                        <option value="Networking">Networking</option>
                                        <option value="Tools">Tools</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Priority</label>
                                    <select
                                        value={formData.priority}
                                        onChange={(e) => setFormData({ ...formData, priority: e.target.value as Task['priority'] })}
                                        className="input-field"
                                    >
                                        <option value="High">High</option>
                                        <option value="Medium">Medium</option>
                                        <option value="Low">Low</option>
                                    </select>
                                </div>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Due Date</label>
                                <input
                                    type="date"
                                    value={formData.dueDate}
                                    onChange={(e) => setFormData({ ...formData, dueDate: e.target.value })}
                                    className="input-field"
                                />
                            </div>
                            <div className="flex gap-3 pt-4">
                                <button type="submit" className="btn-primary flex-1">
                                    {editingId ? 'Update' : 'Add'} Task
                                </button>
                                <button
                                    type="button"
                                    onClick={() => {
                                        setShowForm(false);
                                        setEditingId(null);
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

            {/* Task List */}
            <div className="space-y-3">
                {sortedTasks.length > 0 ? (
                    sortedTasks.map((task) => {
                        const CategoryIcon = categoryIcons[task.category];
                        return (
                            <div
                                key={task.id}
                                className={`card p-4 flex items-start gap-4 transition-all ${task.completed ? 'opacity-60' : ''
                                    }`}
                            >
                                <button
                                    onClick={() => toggleComplete(task.id)}
                                    className={`w-6 h-6 rounded-lg border-2 flex items-center justify-center transition-all ${task.completed
                                        ? 'bg-emerald-500 border-emerald-500 text-white'
                                        : 'border-gray-300 dark:border-gray-600 hover:border-primary-500'
                                        }`}
                                >
                                    {task.completed && <Check className="w-4 h-4" />}
                                </button>

                                <div className="flex-1">
                                    <div className="flex items-start justify-between gap-4">
                                        <div>
                                            <h3 className={`font-semibold text-gray-800 dark:text-white ${task.completed ? 'line-through' : ''}`}>
                                                {task.title}
                                            </h3>
                                            {task.description && (
                                                <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">{task.description}</p>
                                            )}
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <button
                                                onClick={() => handleEdit(task)}
                                                className="p-2 rounded-lg text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-700"
                                            >
                                                <Edit2 className="w-4 h-4" />
                                            </button>
                                            <button
                                                onClick={() => deleteTask(task.id)}
                                                className="p-2 rounded-lg text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20"
                                            >
                                                <Trash2 className="w-4 h-4" />
                                            </button>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-4 mt-3">
                                        <span className={`badge ${categoryColors[task.category]}`}>
                                            <CategoryIcon className="w-4 h-4 mr-1" />
                                            {task.category}
                                        </span>
                                        <span className={`flex items-center gap-1 text-sm ${priorityColors[task.priority]}`}>
                                            <Flag className="w-4 h-4" />
                                            {task.priority}
                                        </span>
                                        <span className="flex items-center gap-1 text-sm text-gray-500 dark:text-gray-400">
                                            <Calendar className="w-4 h-4" />
                                            {new Date(task.dueDate).toLocaleDateString('en-IE', { day: 'numeric', month: 'short' })}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        );
                    })
                ) : (
                    <div className="card p-12 text-center">
                        <CheckSquare className="w-16 h-16 text-gray-300 dark:text-gray-600 mx-auto mb-4" />
                        <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-300 mb-2">No tasks yet</h3>
                        <p className="text-gray-500 dark:text-gray-400 mb-4">Start building your PM skills by adding tasks</p>
                        <button onClick={() => setShowForm(true)} className="btn-primary">
                            <Plus className="w-5 h-5 mr-2" />
                            Add Your First Task
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};
