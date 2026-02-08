import { useState } from 'react';
import { generateInterviewQuestion, provideFeedback } from '../lib/gemini';

export type InterviewState = 'setup' | 'active' | 'feedback';

export interface Message {
    id: string;
    role: 'ai' | 'user';
    content: string;
    timestamp: number;
    feedback?: { // Only for user messages when feedback is given
        score: number;
        text: string;
    }
}

export const useInterview = () => {
    const [state, setState] = useState<InterviewState>('setup');
    const [topic, setTopic] = useState('');
    const [difficulty, setDifficulty] = useState('Mid-Level');
    const [messages, setMessages] = useState<Message[]>([]);
    const [loading, setLoading] = useState(false);

    // Check if running in mock mode
    const isMock = !import.meta.env.VITE_GEMINI_API_KEY;

    const startInterview = async (selectedTopic: string, selectedDifficulty: string) => {
        setTopic(selectedTopic);
        setDifficulty(selectedDifficulty);
        setLoading(true);
        setState('active');
        setMessages([]);

        try {
            const question = await generateInterviewQuestion(selectedTopic, selectedDifficulty);
            const aiMsg: Message = {
                id: Date.now().toString(),
                role: 'ai',
                content: question,
                timestamp: Date.now()
            };
            setMessages([aiMsg]);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    const submitAnswer = async (answer: string) => {
        // Add user message immediately
        const userMsg: Message = {
            id: Date.now().toString(),
            role: 'user',
            content: answer,
            timestamp: Date.now()
        };
        setMessages(prev => [...prev, userMsg]);
        setLoading(true);

        try {
            // Get last question
            const lastQuestion = messages[messages.length - 1]?.content || "Unknown question";

            // Get feedback
            const feedbackData = await provideFeedback(lastQuestion, answer);

            // Update user message with feedback
            setMessages(prev => prev.map(msg =>
                msg.id === userMsg.id
                    ? { ...msg, feedback: { score: feedbackData.score, text: feedbackData.feedback } }
                    : msg
            ));

            // Generate next question
            const nextQuestion = await generateInterviewQuestion(topic, difficulty);
            const aiMsg: Message = {
                id: (Date.now() + 1).toString(),
                role: 'ai',
                content: nextQuestion,
                timestamp: Date.now() + 1
            };
            setMessages(prev => [...prev, aiMsg]);

        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    const resetSession = () => {
        setState('setup');
        setMessages([]);
        setTopic('');
    };

    return {
        state,
        topic,
        difficulty,
        messages,
        loading,
        isMock,
        startInterview,
        submitAnswer,
        resetSession
    };
};
