import React, { useState } from 'react';
import { useTasks, useJobs } from '../hooks';
import {
    Briefcase,
    MapPin,
    Search,
    Plus,
    CheckCircle,
    FileText,
    MessageSquare,
    Calendar,
    ChevronDown,
    ChevronUp,
    Sparkles,
    Building,
    AlertCircle,
} from 'lucide-react';

// Job listings are now fetched from the useJobs hook

const careerPrepTasks = [
    { title: 'Create tailored PM resume', category: 'CV/Resume' },
    { title: 'Write compelling PM cover letter', category: 'CV/Resume' },
    { title: 'Optimize LinkedIn headline for PM roles', category: 'LinkedIn' },
    { title: 'Add PM certifications to LinkedIn', category: 'LinkedIn' },
    { title: 'Prepare 5 STAR stories for interviews', category: 'Interview Prep' },
    { title: 'Research top 10 PM interview questions', category: 'Interview Prep' },
    { title: 'Practice mock PM interview', category: 'Interview Prep' },
    { title: 'Set up job application tracker', category: 'Job Search' },
    { title: 'Apply to 5 entry-level PM roles', category: 'Job Search' },
    { title: 'Network with 3 PMs on LinkedIn', category: 'Networking' },
    { title: 'Join PM community/meetup group', category: 'Networking' },
    { title: 'Update GitHub/portfolio with PM projects', category: 'Portfolio' },
    { title: 'Complete Google PM Certificate', category: 'Certifications' },
    { title: 'Study for CAPM exam', category: 'Certifications' },
    { title: 'Set up job alerts on LinkedIn & Indeed', category: 'Job Search' },
    { title: 'Research companies hiring in Dublin', category: 'Research' },
];

const interviewQuestions = {
    behavioral: [
        'Tell me about a time you led a project from start to finish.',
        'Describe a situation where you had to manage conflict within a team.',
        'How do you prioritize tasks when everything seems urgent?',
        'Tell me about a time you failed. What did you learn?',
        'Describe how you\'ve handled a difficult stakeholder.',
    ],
    technical: [
        'What is the difference between Agile and Waterfall methodologies?',
        'How do you create a Work Breakdown Structure?',
        'Explain the concept of critical path in project scheduling.',
        'What tools have you used for project management?',
        'How do you estimate effort and duration for tasks?',
    ],
    situational: [
        'A key team member leaves mid-project. What do you do?',
        'The scope is creeping but deadline is fixed. How do you handle it?',
        'Your project is behind schedule. What steps do you take?',
        'A stakeholder wants to add a major feature late in the project. How do you respond?',
        'You discover a significant risk that wasn\'t identified in planning. What\'s your approach?',
    ],
};

const resumeTips = [
    { tip: 'Quantify achievements with metrics (e.g., "Led 5-person team", "Delivered 3 weeks early")' },
    { tip: 'Use action verbs: Led, Coordinated, Managed, Facilitated, Delivered, Implemented' },
    { tip: 'Tailor your resume to each job description using relevant keywords' },
    { tip: 'Include any PM certifications prominently (Google PM, CAPM, PSM)' },
    { tip: 'Highlight transferable skills: leadership, communication, problem-solving' },
    { tip: 'Keep it to 1-2 pages with clean, scannable formatting' },
];

const filters = ['All Jobs', 'New Today', 'Remote', 'Hybrid', 'Graduate Roles', 'Trainee Programs'];

export const Career: React.FC = () => {
    const [activeTab, setActiveTab] = useState<'jobs' | 'prep'>('jobs');
    const [activeFilter, setActiveFilter] = useState('All Jobs');
    const [searchQuery, setSearchQuery] = useState('');
    const [expandedJob, setExpandedJob] = useState<string | null>(null);
    const [expandedSection, setExpandedSection] = useState<string | null>('behavioral');
    const { addTask } = useTasks();
    const { jobs: jobListings, loading, error, isSampleData } = useJobs();

    const filteredJobs = jobListings.filter(job => {
        const matchesSearch =
            job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            job.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
            job.location.toLowerCase().includes(searchQuery.toLowerCase());

        const matchesFilter =
            activeFilter === 'All Jobs' ||
            (activeFilter === 'New Today' && job.isNew) ||
            (activeFilter === 'Remote' && job.type === 'Remote') ||
            (activeFilter === 'Hybrid' && job.type === 'Hybrid') ||
            (activeFilter === 'Graduate Roles' && job.tags.includes('Graduate')) ||
            (activeFilter === 'Trainee Programs' && job.tags.includes('Trainee'));

        return matchesSearch && matchesFilter;
    });

    const handleAddCareerTask = (title: string) => {
        addTask({
            title,
            description: 'Career preparation task',
            category: 'Practice',
            priority: 'High',
            dueDate: new Date().toISOString().split('T')[0],
        });
    };



    return (
        <div className="space-y-6 animate-fade-in">
            <div>
                <h1 className="text-2xl lg:text-3xl font-bold text-gray-800 dark:text-white flex items-center gap-3">
                    <Briefcase className="w-8 h-8 text-primary-500" />
                    Career Center
                </h1>
                <p className="text-gray-600 dark:text-gray-400 mt-1">Your gateway to PM jobs in Ireland</p>
            </div>

            {/* Tabs */}
            <div className="flex border-b border-gray-200 dark:border-gray-700">
                <button
                    onClick={() => setActiveTab('jobs')}
                    className={`tab-button ${activeTab === 'jobs' ? 'tab-button-active' : ''}`}
                >
                    <Briefcase className="w-4 h-4 mr-2 inline" />
                    Job Listings
                </button>
                <button
                    onClick={() => setActiveTab('prep')}
                    className={`tab-button ${activeTab === 'prep' ? 'tab-button-active' : ''}`}
                >
                    <FileText className="w-4 h-4 mr-2 inline" />
                    Career Preparation
                </button>
            </div>

            {activeTab === 'jobs' && (
                <div className="space-y-6">
                    {/* Search & Filters */}
                    <div className="flex flex-col lg:flex-row gap-4">
                        <div className="relative flex-1">
                            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                            <input
                                type="text"
                                placeholder="Search by title, company, or location..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="input-field pl-12"
                            />
                        </div>
                        <div className="flex flex-wrap gap-2">
                            {filters.map((filter) => (
                                <button
                                    key={filter}
                                    onClick={() => setActiveFilter(filter)}
                                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${activeFilter === filter
                                        ? 'bg-primary-500 text-white'
                                        : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                                        }`}
                                >
                                    {filter}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Error State */}
                    {error && (
                        <div className="card p-6 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800">
                            <div className="flex flex-col gap-2 text-red-700 dark:text-red-300">
                                <div className="flex items-center gap-3">
                                    <AlertCircle className="w-5 h-5" />
                                    <p className="font-semibold">Unable to load jobs</p>
                                </div>
                                <p className="text-sm font-mono bg-red-100 dark:bg-red-900/40 p-2 rounded">
                                    {error}
                                </p>
                                <p className="text-xs mt-2">
                                    Check your .env file and ensure VITE_RAPIDAPI_KEY is correct.
                                </p>
                            </div>
                        </div>
                    )}

                    {/* Loading State */}
                    {loading && (
                        <div className="space-y-4">
                            {[...Array(5)].map((_, i) => (
                                <div key={i} className="card p-6 animate-pulse">
                                    <div className="flex gap-3 mb-4">
                                        <div className="w-12 h-12 bg-gray-200 dark:bg-gray-700 rounded-xl"></div>
                                        <div className="flex-1">
                                            <div className="h-5 bg-gray-200 dark:bg-gray-700 rounded w-1/3 mb-2"></div>
                                            <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/4"></div>
                                        </div>
                                    </div>
                                    <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-full mb-2"></div>
                                    <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-2/3"></div>
                                </div>
                            ))}
                        </div>
                    )}

                    {/* Sample Data Warning */}
                    {!loading && isSampleData && (
                        <div className="card p-4 bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 mb-4 animate-fade-in">
                            <div className="flex items-center gap-3 text-amber-700 dark:text-amber-300">
                                <AlertCircle className="w-5 h-5 flex-shrink-0" />
                                <div>
                                    <p className="font-semibold text-sm">Showing Sample Data</p>
                                    <p className="text-xs mt-1">
                                        Unable to fetch live jobs (API not subscribed or limit reached).
                                        Showing high-quality sample Irish listings for demonstration.
                                    </p>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Job Cards */}
                    {!loading && !error && (
                        <div className="space-y-4">
                            <div className="space-y-0 border-t border-gray-200 dark:border-gray-800">
                                {filteredJobs.map((job) => (
                                    <div key={job.id} className="group border-b border-gray-200 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors">
                                        <div className="p-4 md:p-6 flex flex-col md:flex-row md:items-center gap-4 md:gap-6">
                                            {/* Company Logo/Icon */}
                                            <div className="w-12 h-12 rounded-lg bg-black/5 dark:bg-white/10 flex items-center justify-center text-xl font-bold text-black dark:text-white flex-shrink-0">
                                                {job.company.charAt(0)}
                                            </div>

                                            {/* Main Info */}
                                            <div className="flex-1 min-w-0">
                                                <div className="flex items-center gap-2 mb-1">
                                                    <h3 className="font-semibold text-lg text-black dark:text-white truncate">{job.title}</h3>
                                                    {job.isNew && <span className="px-2 py-0.5 rounded-full bg-blue-100 text-blue-700 text-xs font-medium">New</span>}
                                                </div>
                                                <div className="flex items-center gap-4 text-sm text-gray-500 dark:text-gray-400">
                                                    <span className="flex items-center gap-1 font-medium text-black dark:text-gray-300"><Building className="w-3 h-3" /> {job.company}</span>
                                                    <span className="flex items-center gap-1"><MapPin className="w-3 h-3" /> {job.location}</span>
                                                </div>
                                            </div>

                                            {/* Metadata Columns (Hidden on mobile) */}
                                            <div className="hidden md:flex items-center gap-6 text-sm text-gray-600 dark:text-gray-400">
                                                <div className="w-24">
                                                    <span className={`px-2 py-1 rounded text-xs font-medium ${job.type === 'Remote' ? 'bg-emerald-100 text-emerald-700' :
                                                        job.type === 'Hybrid' ? 'bg-blue-100 text-blue-700' : 'bg-gray-100 text-gray-700'
                                                        }`}>
                                                        {job.type}
                                                    </span>
                                                </div>
                                                <div className="w-24 font-mono text-xs">{job.salary}</div>
                                                <div className="w-24 text-right">{new Date(job.postedDate).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}</div>
                                            </div>

                                            {/* Action */}
                                            <div className="flex items-center gap-3 md:pl-4 md:border-l border-gray-100 dark:border-gray-800">
                                                <button
                                                    onClick={() => setExpandedJob(expandedJob === job.id ? null : job.id)}
                                                    className="p-2 text-gray-400 hover:text-black dark:hover:text-white transition-colors"
                                                >
                                                    {expandedJob === job.id ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                                                </button>
                                                <a
                                                    href={job.applyUrl}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="px-4 py-2 bg-black dark:bg-white text-white dark:text-black text-sm font-medium rounded hover:opacity-80 transition-opacity whitespace-nowrap"
                                                >
                                                    Apply
                                                </a>
                                            </div>
                                        </div>

                                        {/* Expanded Details (Fintech Style) */}
                                        {expandedJob === job.id && (
                                            <div className="px-6 pb-6 pt-0 md:pl-[5.5rem]">
                                                <div className="p-4 bg-gray-50 dark:bg-gray-900 rounded border border-gray-100 dark:border-gray-800">
                                                    <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">Key Requirements</h4>
                                                    <ul className="space-y-2">
                                                        {job.requirements.map((req, index) => (
                                                            <li key={index} className="flex items-start gap-2 text-sm text-gray-700 dark:text-gray-300">
                                                                <div className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-1.5 flex-shrink-0" />
                                                                {req}
                                                            </li>
                                                        ))}
                                                    </ul>
                                                    <div className="mt-4 flex flex-wrap gap-2">
                                                        {job.tags.map((tag) => (
                                                            <span key={tag} className="px-2 py-1 text-xs border border-gray-200 dark:border-gray-700 rounded text-gray-500">
                                                                {tag}
                                                            </span>
                                                        ))}
                                                    </div>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            )}

            {activeTab === 'prep' && (
                <div className="space-y-8">
                    {/* Career Prep Tasks */}
                    <div className="card p-6">
                        <h2 className="text-lg font-semibold text-gray-800 dark:text-white mb-4 flex items-center gap-2">
                            <CheckCircle className="w-5 h-5 text-emerald-500" />
                            Career Preparation Checklist
                        </h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                            {careerPrepTasks.map((task, index) => (
                                <button
                                    key={index}
                                    onClick={() => handleAddCareerTask(task.title)}
                                    className="flex items-center gap-3 p-3 rounded-xl bg-gray-50 dark:bg-gray-700/50 hover:bg-primary-50 dark:hover:bg-primary-900/20 text-left transition-all group"
                                >
                                    <Plus className="w-5 h-5 text-gray-400 group-hover:text-primary-500" />
                                    <div>
                                        <p className="font-medium text-gray-800 dark:text-white text-sm">{task.title}</p>
                                        <p className="text-xs text-gray-500 dark:text-gray-400">{task.category}</p>
                                    </div>
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Interview Questions */}
                    <div className="card p-6">
                        <h2 className="text-lg font-semibold text-gray-800 dark:text-white mb-4 flex items-center gap-2">
                            <MessageSquare className="w-5 h-5 text-blue-500" />
                            Interview Questions Bank
                        </h2>
                        <div className="space-y-4">
                            {Object.entries(interviewQuestions).map(([category, questions]) => (
                                <div key={category}>
                                    <button
                                        onClick={() => setExpandedSection(expandedSection === category ? null : category)}
                                        className="w-full flex items-center justify-between p-4 rounded-xl bg-gray-50 dark:bg-gray-700/50 hover:bg-gray-100 dark:hover:bg-gray-700"
                                    >
                                        <span className="font-medium text-gray-800 dark:text-white capitalize">{category} Questions</span>
                                        {expandedSection === category ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                                    </button>
                                    {expandedSection === category && (
                                        <ul className="mt-2 ml-4 space-y-2">
                                            {questions.map((q, index) => (
                                                <li key={index} className="flex items-start gap-2 text-gray-600 dark:text-gray-400">
                                                    <span className="text-primary-500 font-medium">{index + 1}.</span>
                                                    {q}
                                                </li>
                                            ))}
                                        </ul>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Resume Tips */}
                    <div className="card p-6">
                        <h2 className="text-lg font-semibold text-gray-800 dark:text-white mb-4 flex items-center gap-2">
                            <FileText className="w-5 h-5 text-purple-500" />
                            Resume/CV Tips
                        </h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {resumeTips.map((item, index) => (
                                <div key={index} className="flex items-start gap-3 p-4 rounded-xl bg-gray-50 dark:bg-gray-700/50">
                                    <Sparkles className="w-5 h-5 text-amber-500 flex-shrink-0 mt-0.5" />
                                    <p className="text-sm text-gray-700 dark:text-gray-300">{item.tip}</p>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* 4-Week Action Plan */}
                    <div className="card p-6">
                        <h2 className="text-lg font-semibold text-gray-800 dark:text-white mb-4 flex items-center gap-2">
                            <Calendar className="w-5 h-5 text-indigo-500" />
                            4-Week Job Search Action Plan
                        </h2>
                        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                            {[
                                { week: 'Week 1', title: 'Foundation', tasks: ['Update resume', 'Optimize LinkedIn', 'Research companies'] },
                                { week: 'Week 2', title: 'Applications', tasks: ['Apply to 10+ jobs', 'Set up job alerts', 'Network on LinkedIn'] },
                                { week: 'Week 3', title: 'Preparation', tasks: ['Practice interviews', 'Prepare STAR stories', 'Mock interviews'] },
                                { week: 'Week 4', title: 'Follow-up', tasks: ['Send thank-you notes', 'Follow up on apps', 'Continue applying'] },
                            ].map((week) => (
                                <div key={week.week} className="p-4 rounded-xl bg-gradient-to-br from-primary-50 to-accent-50 dark:from-primary-900/20 dark:to-accent-900/20 border border-primary-100 dark:border-primary-800">
                                    <p className="text-sm font-medium text-primary-600 dark:text-primary-400">{week.week}</p>
                                    <h3 className="font-semibold text-gray-800 dark:text-white mb-2">{week.title}</h3>
                                    <ul className="space-y-1">
                                        {week.tasks.map((task, index) => (
                                            <li key={index} className="text-xs text-gray-600 dark:text-gray-400 flex items-center gap-1">
                                                <CheckCircle className="w-3 h-3 text-primary-500" />
                                                {task}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};
