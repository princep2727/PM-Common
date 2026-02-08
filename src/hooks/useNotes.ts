import { useState, useEffect } from 'react';

export interface Note {
    id: string;
    title: string;
    content: string;
    tags: string[];
    createdAt: string;
    updatedAt: string;
}

const STORAGE_KEY = 'pm-hub-notes';

export const useNotes = () => {
    const [notes, setNotes] = useState<Note[]>(() => {
        const stored = localStorage.getItem(STORAGE_KEY);
        return stored ? JSON.parse(stored) : [];
    });

    useEffect(() => {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(notes));
    }, [notes]);

    const addNote = (note: { title: string; content: string; tags: string[] }) => {
        const newNote: Note = {
            ...note,
            id: crypto.randomUUID(),
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
        };
        setNotes(prev => [newNote, ...prev]);
        return newNote;
    };

    const updateNote = (id: string, updates: Partial<Pick<Note, 'title' | 'content' | 'tags'>>) => {
        setNotes(prev => prev.map(note =>
            note.id === id
                ? { ...note, ...updates, updatedAt: new Date().toISOString() }
                : note
        ));
    };

    const deleteNote = (id: string) => {
        setNotes(prev => prev.filter(note => note.id !== id));
    };

    const searchNotes = (query: string) => {
        const lowercaseQuery = query.toLowerCase();
        return notes.filter(note =>
            note.title.toLowerCase().includes(lowercaseQuery) ||
            note.content.toLowerCase().includes(lowercaseQuery) ||
            note.tags.some(tag => tag.toLowerCase().includes(lowercaseQuery))
        );
    };

    const getNotesByTag = (tag: string) => {
        return notes.filter(note => note.tags.includes(tag));
    };

    const getAllTags = () => {
        const tagSet = new Set<string>();
        notes.forEach(note => note.tags.forEach(tag => tagSet.add(tag)));
        return Array.from(tagSet);
    };

    return {
        notes,
        addNote,
        updateNote,
        deleteNote,
        searchNotes,
        getNotesByTag,
        getAllTags,
    };
};
