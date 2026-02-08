import { useState, useEffect } from 'react';

export interface Task {
    id: string;
    title: string;
    description: string;
    category: 'Learning' | 'Practice' | 'Networking' | 'Tools';
    priority: 'High' | 'Medium' | 'Low';
    completed: boolean;
    dueDate: string;
    createdAt: string;
}

const STORAGE_KEY = 'pm-hub-tasks';

export const useTasks = () => {
    const [tasks, setTasks] = useState<Task[]>(() => {
        const stored = localStorage.getItem(STORAGE_KEY);
        return stored ? JSON.parse(stored) : [];
    });

    useEffect(() => {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
    }, [tasks]);

    const addTask = (task: Omit<Task, 'id' | 'createdAt' | 'completed'>) => {
        const newTask: Task = {
            ...task,
            id: crypto.randomUUID(),
            createdAt: new Date().toISOString(),
            completed: false,
        };
        setTasks(prev => [...prev, newTask]);
        return newTask;
    };

    const updateTask = (id: string, updates: Partial<Task>) => {
        setTasks(prev => prev.map(task =>
            task.id === id ? { ...task, ...updates } : task
        ));
    };

    const deleteTask = (id: string) => {
        setTasks(prev => prev.filter(task => task.id !== id));
    };

    const toggleComplete = (id: string) => {
        setTasks(prev => prev.map(task =>
            task.id === id ? { ...task, completed: !task.completed } : task
        ));
    };

    const getTasksByCategory = (category: Task['category']) => {
        return tasks.filter(task => task.category === category);
    };

    const getTasksByPriority = (priority: Task['priority']) => {
        return tasks.filter(task => task.priority === priority);
    };

    const getPendingTasks = () => tasks.filter(task => !task.completed);
    const getCompletedTasks = () => tasks.filter(task => task.completed);

    const getTaskStats = () => ({
        total: tasks.length,
        completed: tasks.filter(t => t.completed).length,
        pending: tasks.filter(t => !t.completed).length,
        highPriority: tasks.filter(t => t.priority === 'High' && !t.completed).length,
    });

    return {
        tasks,
        addTask,
        updateTask,
        deleteTask,
        toggleComplete,
        getTasksByCategory,
        getTasksByPriority,
        getPendingTasks,
        getCompletedTasks,
        getTaskStats,
    };
};
