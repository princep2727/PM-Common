import React from 'react';
import {
    Coffee,
    Briefcase,
    Newspaper,
    MessageSquare,
    BrainCircuit,
    TrendingUp,
    Target
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

export const About: React.FC = () => {
    const navigate = useNavigate();

    const features = [
        {
            icon: Newspaper,
            title: "News Feed",
            desc: "Read this to drop buzzwords like 'GenAI' or 'Synergy' correctly in your next standup. We only show you what's actually relevant, so you can sound smart with minimal effort.",
            path: "/news",
            color: "text-blue-500",
            bg: "bg-blue-100 dark:bg-blue-900/20"
        },
        {
            icon: Briefcase,
            title: "Job Board",
            desc: "Because the grass is always greener where the JIRA tickets are cleaner. Real, remote-friendly PM jobs sourced from the depths of the internet (and by depths, we mean APIs).",
            path: "/career",
            color: "text-green-500",
            bg: "bg-green-100 dark:bg-green-900/20"
        },
        {
            icon: MessageSquare,
            title: "Community",
            desc: "Find your tribe. Complain about scope creep, difficult stakeholders, and why engineering always underestimates estimates. It's basically free therapy.",
            path: "/community",
            color: "text-purple-500",
            bg: "bg-purple-100 dark:bg-purple-900/20"
        },
        {
            icon: BrainCircuit,
            title: "AI Coach",
            desc: "Roleplay your next interview without the awkwardness of asking a friend. Our AI is harsh but fair (mostly fair). Perfect for practicing your STAR stories at 2 AM.",
            path: "/interview",
            color: "text-indigo-500",
            bg: "bg-indigo-100 dark:bg-indigo-900/20"
        },
        {
            icon: TrendingUp,
            title: "Progress Tracker",
            desc: "Gamify your career anxiety! Watch the bars go up as you complete tasks and quizzes. It releases dopamine, which is scientifically proven* to make you a better PM.",
            path: "/progress",
            color: "text-pink-500",
            bg: "bg-pink-100 dark:bg-pink-900/20"
        }
    ];

    return (
        <div className="max-w-5xl mx-auto space-y-12 pb-12">
            {/* Hero Section - Fintech Style with Motion */}
            <div className="mb-20 border-b border-gray-200 dark:border-gray-800 pb-16 pt-12 overflow-hidden">
                <div className="max-w-4xl">
                    <motion.h1
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                        className="text-6xl md:text-8xl font-bold tracking-tighter text-black dark:text-white mb-8 leading-[0.9] text-balance"
                    >
                        The Operating System for <span className="text-gray-400 dark:text-gray-600 inline-block">Project Managers.</span>
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
                        className="text-2xl text-gray-600 dark:text-gray-400 max-w-2xl leading-relaxed font-light"
                    >
                        High-performance workspace for your career. <br />
                        Real-time intelligence. Community insights. AI-powered tools.
                    </motion.p>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
                        className="flex flex-wrap gap-4 mt-10"
                    >
                        <button
                            onClick={() => navigate('/career')}
                            className="px-8 py-4 bg-black dark:bg-white text-white dark:text-black font-medium rounded-lg hover:bg-gray-800 dark:hover:bg-gray-200 transition-colors flex items-center gap-2"
                        >
                            <Briefcase className="w-5 h-5" />
                            Launch Career
                        </button>
                        <button
                            onClick={() => navigate('/news')}
                            className="px-8 py-4 bg-gray-100 dark:bg-gray-800 text-black dark:text-white font-medium rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                        >
                            Market Intelligence
                        </button>
                    </motion.div>
                </div>
            </div>

            {/* Mission Cards */}
            <div className="grid md:grid-cols-2 gap-8">
                <div className="card p-8 border-l-4 border-indigo-500 hover:scale-[1.02] transition-transform">
                    <Target className="w-10 h-10 text-indigo-500 mb-4" />
                    <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-3">The Mission</h2>
                    <p className="text-gray-600 dark:text-gray-300 text-lg">
                        To provide a centralized space where Project Managers can learn, practice, and connect.
                        We believe that being a great PM shouldn't require reading 50 medium articles a day.
                        It takes practice, community, and the right tools.
                    </p>
                </div>
                <div className="card p-8 border-l-4 border-teal-500 hover:scale-[1.02] transition-transform">
                    <Coffee className="w-10 h-10 text-teal-500 mb-4" />
                    <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-3">The Vibe</h2>
                    <p className="text-gray-600 dark:text-gray-300 text-lg">
                        Serious about growth, but not serious about ourselves.
                        We know the struggle of imposter syndrome and "alignment meetings."
                        This is a no-judgment zone to level up your skills.
                    </p>
                </div>
            </div>

            {/* How It Works */}
            <div className="space-y-8">
                <h2 className="text-3xl font-bold text-center text-gray-800 dark:text-white">
                    So, how do I use this thing?
                </h2>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {features.map((feature, idx) => (
                        <div
                            key={idx}
                            onClick={() => navigate(feature.path)}
                            className="card p-6 cursor-pointer group hover:shadow-xl transition-all hover:-translate-y-1"
                        >
                            <div className={`w-12 h-12 rounded-xl ${feature.bg} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                                <feature.icon className={`w-6 h-6 ${feature.color}`} />
                            </div>
                            <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-2 flex items-center gap-2">
                                {feature.title}
                            </h3>
                            <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                                {feature.desc}
                            </p>
                        </div>
                    ))}
                </div>
            </div>

            {/* Footer Joke */}
            <div className="text-center py-8 text-gray-500 dark:text-gray-400 italic">
                * Scientific proof pending peer review by a group of very busy Project Managers.
            </div>
        </div>
    );
};
