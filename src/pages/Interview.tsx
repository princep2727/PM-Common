import React, { useState, useRef, useEffect } from 'react';
import { useInterview } from '../hooks/useInterview';
import {
    Bot,
    User,
    Send,
    Sparkles,
    BrainCircuit,
    AlertTriangle,
    RefreshCw,
    Play
} from 'lucide-react';
import ReactMarkdown from 'react-markdown'; // Ensure this is installed or use structured text

export const Interview: React.FC = () => {
    const {
        state,
        messages,
        loading,
        isMock,
        startInterview,
        submitAnswer,
        resetSession
    } = useInterview();

    const [answerInput, setAnswerInput] = useState('');
    const messagesEndRef = useRef<HTMLDivElement>(null);

    // Setup State
    const [selectedTopic, setSelectedTopic] = useState('Behavioral');
    const [selectedDifficulty, setSelectedDifficulty] = useState('Mid-Level');

    const topics = ['Behavioral', 'Project Execution', 'Analytical', 'Strategy', 'Technical'];
    const difficulties = ['Junior', 'Mid-Level', 'Senior'];

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const handleStart = () => {
        startInterview(selectedTopic, selectedDifficulty);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!answerInput.trim() || loading) return;
        submitAnswer(answerInput);
        setAnswerInput('');
    };

    if (state === 'setup') {
        return (
            <div className="max-w-4xl mx-auto space-y-8 animate-fade-in">
                <div className="text-center space-y-4">
                    <div className="w-20 h-20 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-3xl mx-auto flex items-center justify-center shadow-xl shadow-indigo-500/20">
                        <BrainCircuit className="w-10 h-10 text-white" />
                    </div>
                    <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple-600 dark:from-indigo-400 dark:to-purple-400">
                        AI Interview Coach
                    </h1>
                    <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
                        Practice real PM interview questions with an AI interviewer. Get instant feedback on your structure, clarity, and strategic thinking.
                    </p>
                </div>

                {isMock && (
                    <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 p-4 rounded-xl flex items-start gap-3">
                        <AlertTriangle className="w-5 h-5 text-yellow-600 dark:text-yellow-400 flex-shrink-0 mt-0.5" />
                        <div>
                            <h3 className="font-semibold text-yellow-800 dark:text-yellow-300">Mock Mode Active</h3>
                            <p className="text-sm text-yellow-700 dark:text-yellow-400">
                                You haven't added a Gemini API Key to your <code>.env</code> file.
                                The coach will use a limited set of pre-defined questions and feedback.
                                Add <code>VITE_GEMINI_API_KEY</code> for the full AI experience.
                            </p>
                        </div>
                    </div>
                )}

                <div className="grid md:grid-cols-2 gap-6">
                    <div className="card p-6 space-y-6">
                        <h2 className="text-xl font-semibold flex items-center gap-2">
                            <Sparkles className="w-5 h-5 text-indigo-500" />
                            Session Config
                        </h2>

                        <div className="space-y-3">
                            <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Topic</label>
                            <div className="grid grid-cols-2 gap-2">
                                {topics.map(t => (
                                    <button
                                        key={t}
                                        onClick={() => setSelectedTopic(t)}
                                        className={`p-3 rounded-xl text-sm font-medium transition-all ${selectedTopic === t
                                            ? 'bg-indigo-500 text-white shadow-lg shadow-indigo-500/30'
                                            : 'bg-gray-100 dark:bg-gray-700/50 text-gray-600 dark:text-gray-400 hover:bg-indigo-50 dark:hover:bg-indigo-900/20'
                                            }`}
                                    >
                                        {t}
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div className="space-y-3">
                            <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Difficulty</label>
                            <div className="flex bg-gray-100 dark:bg-gray-700/50 p-1 rounded-xl">
                                {difficulties.map(d => (
                                    <button
                                        key={d}
                                        onClick={() => setSelectedDifficulty(d)}
                                        className={`flex-1 py-2 text-sm font-medium rounded-lg transition-all ${selectedDifficulty === d
                                            ? 'bg-white dark:bg-gray-600 text-indigo-600 dark:text-indigo-400 shadow-sm'
                                            : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200'
                                            }`}
                                    >
                                        {d}
                                    </button>
                                ))}
                            </div>
                        </div>

                        <button
                            onClick={handleStart}
                            className="w-full btn-primary py-4 text-lg shadow-xl shadow-indigo-500/20 group"
                        >
                            <span className="flex items-center justify-center gap-2">
                                Start Interview
                                <Play className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                            </span>
                        </button>
                    </div>

                    <div className="card p-6 bg-gradient-to-br from-indigo-900 to-purple-900 text-white relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
                        <h2 className="text-xl font-semibold mb-4 relative z-10">How it works</h2>
                        <ul className="space-y-4 relative z-10 text-indigo-100">
                            <li className="flex gap-3">
                                <div className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center text-sm font-bold">1</div>
                                <p>Select a topic you want to practice.</p>
                            </li>
                            <li className="flex gap-3">
                                <div className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center text-sm font-bold">2</div>
                                <p>The AI simulates a real interviewer, asking probing questions.</p>
                            </li>
                            <li className="flex gap-3">
                                <div className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center text-sm font-bold">3</div>
                                <p>Answer using your microphone or keyboard.</p>
                            </li>
                            <li className="flex gap-3">
                                <div className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center text-sm font-bold">4</div>
                                <p>Get instant feedback on your structure (STAR), clarity, and impact.</p>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="max-w-4xl mx-auto h-[calc(100vh-140px)] flex flex-col animate-fade-in">
            {/* Header */}
            <div className="flex items-center justify-between mb-6 px-4">
                <div>
                    <h2 className="text-xl font-bold text-gray-800 dark:text-white flex items-center gap-2">
                        <BrainCircuit className="w-6 h-6 text-indigo-500" />
                        {selectedTopic} Interview
                    </h2>
                    <p className="text-sm text-gray-500 dark:text-gray-400">{selectedDifficulty} Level • {isMock ? 'Mock Mode' : 'AI Mode'}</p>
                </div>
                <button
                    onClick={resetSession}
                    className="flex items-center gap-2 text-sm text-gray-500 hover:text-red-500 transition-colors"
                >
                    <RefreshCw className="w-4 h-4" />
                    End Session
                </button>
            </div>

            {/* Chat Area */}
            <div className="flex-1 overflow-y-auto space-y-6 px-4 pb-4 hide-scrollbar">
                {messages.map((msg) => (
                    <div key={msg.id} className={`flex gap-4 ${msg.role === 'user' ? 'justify-end' : ''}`}>
                        {msg.role === 'ai' && (
                            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center flex-shrink-0 mt-1">
                                <Bot className="w-5 h-5 text-white" />
                            </div>
                        )}

                        <div className="space-y-2 max-w-[80%]">
                            <div className={`p-4 rounded-2xl ${msg.role === 'user'
                                ? 'bg-indigo-500 text-white rounded-br-none'
                                : 'bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-bl-none shadow-sm'
                                }`}>
                                <p className="leading-relaxed whitespace-pre-wrap">{msg.content}</p>
                            </div>

                            {/* Feedback Block */}
                            {msg.feedback && (
                                <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-xl p-4 animate-scale-in">
                                    <div className="flex items-center gap-2 mb-2">
                                        <Sparkles className="w-4 h-4 text-green-600 dark:text-green-400" />
                                        <span className="font-semibold text-green-800 dark:text-green-300">Feedback Score: {msg.feedback.score}/10</span>
                                    </div>
                                    <div className="prose prose-sm dark:prose-invert max-w-none text-gray-700 dark:text-gray-300">
                                        <ReactMarkdown>{msg.feedback.text}</ReactMarkdown>
                                    </div>
                                </div>
                            )}
                        </div>

                        {msg.role === 'user' && (
                            <div className="w-8 h-8 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center flex-shrink-0 mt-1">
                                <User className="w-5 h-5 text-gray-500 dark:text-gray-400" />
                            </div>
                        )}
                    </div>
                ))}

                {loading && (
                    <div className="flex gap-4">
                        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center flex-shrink-0">
                            <Bot className="w-5 h-5 text-white" />
                        </div>
                        <div className="bg-white dark:bg-gray-800 p-4 rounded-2xl rounded-bl-none border border-gray-200 dark:border-gray-700 shadow-sm">
                            <div className="flex gap-1">
                                <div className="w-2 h-2 bg-indigo-400 rounded-full animate-bounce"></div>
                                <div className="w-2 h-2 bg-indigo-400 rounded-full animate-bounce delay-100"></div>
                                <div className="w-2 h-2 bg-indigo-400 rounded-full animate-bounce delay-200"></div>
                            </div>
                        </div>
                    </div>
                )}
                <div ref={messagesEndRef} />
            </div>

            {/* Input Area */}
            <div className="p-4 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border-t border-gray-200 dark:border-gray-700">
                <form onSubmit={handleSubmit} className="flex gap-2 max-w-4xl mx-auto">
                    <input
                        type="text"
                        value={answerInput}
                        onChange={(e) => setAnswerInput(e.target.value)}
                        placeholder="Type your answer here..."
                        className="flex-1 input-field py-3"
                        disabled={loading}
                    />
                    <button
                        type="submit"
                        disabled={!answerInput.trim() || loading}
                        className="btn-primary px-6 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        <Send className="w-5 h-5" />
                    </button>
                    {/* Placeholder for Voice Input Button later */}
                </form>
            </div>
        </div>
    );
};
