import React, { useState } from 'react';
import {
    BookOpen,
    ExternalLink,
    Award,
    Users,
    Headphones,
    Wrench,
    BookMarked,
    Newspaper,
    Linkedin,
    ChevronDown,
    ChevronUp,
    Star,
    GraduationCap,
} from 'lucide-react';

interface Influencer {
    name: string;
    title: string;
    followers: string;
    expertise: string[];
    linkedinUrl: string;
}

const influencers: Influencer[] = [
    { name: 'Adam Grant', title: 'Organizational Psychologist', followers: '5.2M', expertise: ['Leadership', 'Teamwork'], linkedinUrl: 'https://linkedin.com/in/adammgrant' },
    { name: 'Antonio Nieto-Rodriguez', title: 'Project Economy Expert', followers: '320K', expertise: ['Project Economy', 'Strategy'], linkedinUrl: 'https://linkedin.com/in/antonionietorodriguez' },
    { name: 'Susanne Madsen', title: 'Project Leadership Coach', followers: '85K', expertise: ['Leadership', 'Coaching'], linkedinUrl: 'https://linkedin.com/in/susannemadsen' },
    { name: 'Cesar Abeid', title: 'PM Podcast Host', followers: '45K', expertise: ['Agile', 'Communication'], linkedinUrl: 'https://linkedin.com/in/cesarabeid' },
    { name: 'Ricardo Vargas', title: 'Executive Director at Brightline', followers: '280K', expertise: ['Strategy', 'Transformation'], linkedinUrl: 'https://linkedin.com/in/rvvargas' },
    { name: 'Cornelius Fichtner', title: 'PM PrepCast Creator', followers: '65K', expertise: ['PMP', 'Certifications'], linkedinUrl: 'https://linkedin.com/in/corneliusfichtner' },
    { name: 'Elizabeth Harrin', title: 'Project Management Author', followers: '72K', expertise: ['PM Fundamentals', 'Tools'], linkedinUrl: 'https://linkedin.com/in/elizabethharrin' },
    { name: 'Mike Clayton', title: 'Project Manager, Author', followers: '48K', expertise: ['Time Management', 'Risk'], linkedinUrl: 'https://linkedin.com/in/mikeclayton' },
    { name: 'Kory Kogon', title: 'FranklinCovey VP', followers: '35K', expertise: ['Productivity', 'Leadership'], linkedinUrl: 'https://linkedin.com/in/korykogon' },
    { name: 'Daniel Burrus', title: 'Futurist & Author', followers: '220K', expertise: ['Innovation', 'Strategy'], linkedinUrl: 'https://linkedin.com/in/danielburrus' },
    { name: 'Jennifer Bridges', title: 'ProjectManager.com Expert', followers: '28K', expertise: ['Tools', 'Templates'], linkedinUrl: 'https://linkedin.com/in/jenniferbridges' },
    { name: 'Kiron Bondale', title: 'PM Consultant & Author', followers: '32K', expertise: ['Risk', 'Agile'], linkedinUrl: 'https://linkedin.com/in/kironbondale' },
    { name: 'Devin Deen', title: 'PM Trainer', followers: '22K', expertise: ['Training', 'PMP'], linkedinUrl: 'https://linkedin.com/in/devindeen' },
    { name: 'Andy Kaufman', title: 'People and Projects Host', followers: '18K', expertise: ['Leadership', 'Communication'], linkedinUrl: 'https://linkedin.com/in/andykaufman' },
    { name: 'Joy Beatty', title: 'Business Analyst Expert', followers: '25K', expertise: ['Requirements', 'BA'], linkedinUrl: 'https://linkedin.com/in/joybeatty' },
    { name: 'Mike Griffiths', title: 'Agile Leadership Author', followers: '42K', expertise: ['Agile', 'Hybrid'], linkedinUrl: 'https://linkedin.com/in/mikegriffithspm' },
    { name: 'Bonnie Biafore', title: 'PM Author & Trainer', followers: '29K', expertise: ['MS Project', 'Scheduling'], linkedinUrl: 'https://linkedin.com/in/bonniebiafore' },
    { name: 'Harold Kerzner', title: 'PM Legend', followers: '55K', expertise: ['PM Theory', 'Best Practices'], linkedinUrl: 'https://linkedin.com/in/haroldkerzner' },
    { name: 'Kim Heldman', title: 'PMP Author', followers: '38K', expertise: ['Certifications', 'CAPM'], linkedinUrl: 'https://linkedin.com/in/kimheldman' },
    { name: 'Joy Gumz', title: 'Agile Coach', followers: '19K', expertise: ['Scrum', 'Kanban'], linkedinUrl: 'https://linkedin.com/in/joygumz' },
];

const certifications = [
    {
        name: 'Google Project Management Certificate',
        provider: 'Google / Coursera',
        duration: '6 months',
        cost: 'Free (audit) / €39/mo',
        level: 'Beginner',
        description: 'Perfect starting point for PM beginners. Covers Agile, Waterfall, and practical project management skills.',
        url: 'https://www.coursera.org/professional-certificates/google-project-management',
        recommended: true,
    },
    {
        name: 'CAPM (Certified Associate in PM)',
        provider: 'PMI',
        duration: '3-6 months prep',
        cost: '€280 (member) / €400 (non-member)',
        level: 'Entry Level',
        description: 'Entry-level PMI certification. Demonstrates understanding of fundamental PM knowledge and terminology.',
        url: 'https://www.pmi.org/certifications/certified-associate-capm',
        recommended: true,
    },
    {
        name: 'PSM I (Professional Scrum Master)',
        provider: 'Scrum.org',
        duration: '1-2 months prep',
        cost: '€150',
        level: 'Entry Level',
        description: 'Demonstrates understanding of Scrum framework. Widely recognized for Agile/Scrum roles.',
        url: 'https://www.scrum.org/professional-scrum-certifications/professional-scrum-master-i-certification',
        recommended: true,
    },
    {
        name: 'PMP (Project Management Professional)',
        provider: 'PMI',
        duration: '3-6 months prep',
        cost: '€405 (member) / €555 (non-member)',
        level: 'Experienced',
        description: 'Gold standard PM certification. Requires 36 months experience leading projects. Target after gaining experience.',
        url: 'https://www.pmi.org/certifications/project-management-pmp',
        recommended: false,
    },
];

const tools = [
    { name: 'Jira', category: 'Project Tracking', description: 'Industry standard for Agile project management', url: 'https://www.atlassian.com/software/jira' },
    { name: 'Trello', category: 'Kanban Boards', description: 'Visual project management with cards and boards', url: 'https://trello.com' },
    { name: 'Asana', category: 'Work Management', description: 'Flexible work management for teams', url: 'https://asana.com' },
    { name: 'MS Project', category: 'Enterprise PM', description: 'Microsoft\'s comprehensive project management tool', url: 'https://www.microsoft.com/microsoft-365/project/project-management-software' },
    { name: 'Monday.com', category: 'Work OS', description: 'Flexible platform for project tracking', url: 'https://monday.com' },
    { name: 'Notion', category: 'All-in-One', description: 'Notes, docs, and project management combined', url: 'https://notion.so' },
];

const books = [
    { title: 'The Lean Startup', author: 'Eric Ries', focus: 'Agile, MVP', url: 'https://www.amazon.com/Lean-Startup-Entrepreneurs-Continuous-Innovation/dp/0307887898' },
    { title: 'Scrum: The Art of Doing Twice the Work in Half the Time', author: 'Jeff Sutherland', focus: 'Scrum', url: 'https://www.amazon.com/Scrum-Doing-Twice-Work-Half/dp/038534645X' },
    { title: 'Project Management Absolute Beginner\'s Guide', author: 'Greg Horine', focus: 'PM Fundamentals', url: 'https://www.amazon.com/Project-Management-Absolute-Beginners-Guide/dp/0789756757' },
    { title: 'Making Things Happen', author: 'Scott Berkun', focus: 'Practical PM', url: 'https://www.amazon.com/Making-Things-Happen-Mastering-Management/dp/0596517718' },
    { title: 'The Phoenix Project', author: 'Gene Kim', focus: 'DevOps, IT', url: 'https://www.amazon.com/Phoenix-Project-DevOps-Helping-Business/dp/0988262592' },
    { title: 'Crucial Conversations', author: 'Patterson, Grenny, et al.', focus: 'Communication', url: 'https://www.amazon.com/Crucial-Conversations-Talking-Stakes-High/dp/0071401946' },
];

const podcasts = [
    { name: 'The Project Management Podcast', host: 'Cornelius Fichtner', focus: 'PMP, General PM', url: 'https://www.project-management-podcast.com/' },
    { name: 'PM for the Masses', host: 'Cesar Abeid', focus: 'Practical PM', url: 'https://pmforthemasses.com/' },
    { name: 'People and Projects', host: 'Andy Kaufman', focus: 'Leadership', url: 'https://peopleandprojectspodcast.com/' },
    { name: 'The Digital Project Manager', host: 'DPM Team', focus: 'Digital PM', url: 'https://thedigitalprojectmanager.com/podcast/' },
    { name: 'Scrum Master Toolbox', host: 'Vasco Duarte', focus: 'Scrum, Agile', url: 'https://scrum-master-toolbox.org/' },
];

import { useNews } from '../hooks/useNews';

export const Resources: React.FC = () => {
    const [expandedSection, setExpandedSection] = useState<string | null>('influencers');
    const { articles: newsArticles, loading: loadingArticles } = useNews();

    // Get top 5 recent articles for the resources page
    const trendingArticles = newsArticles.slice(0, 5);

    const toggleSection = (section: string) => {
        setExpandedSection(expandedSection === section ? null : section);
    };

    return (
        <div className="space-y-6 animate-fade-in">
            <div>
                <h1 className="text-2xl lg:text-3xl font-bold text-gray-800 dark:text-white flex items-center gap-3">
                    <BookOpen className="w-8 h-8 text-primary-500" />
                    Resources
                </h1>
                <p className="text-gray-600 dark:text-gray-400 mt-1">Everything you need to become a great PM</p>
            </div>

            {/* LinkedIn Influencers */}
            <div className="card">
                <button
                    onClick={() => toggleSection('influencers')}
                    className="w-full p-6 flex items-center justify-between"
                >
                    <h2 className="text-lg font-semibold text-gray-800 dark:text-white flex items-center gap-2">
                        <Users className="w-5 h-5 text-blue-500" />
                        Top 20 PM LinkedIn Influencers
                    </h2>
                    {expandedSection === 'influencers' ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                </button>
                {expandedSection === 'influencers' && (
                    <div className="px-6 pb-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                            {influencers.map((person, index) => (
                                <a
                                    key={index}
                                    href={person.linkedinUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="p-4 rounded-xl bg-gray-50 dark:bg-gray-700/50 hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-all group"
                                >
                                    <div className="flex items-start gap-3">
                                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center text-white font-bold">
                                            {person.name.charAt(0)}
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <h3 className="font-medium text-gray-800 dark:text-white text-sm truncate group-hover:text-blue-600 dark:group-hover:text-blue-400">
                                                {person.name}
                                            </h3>
                                            <p className="text-xs text-gray-500 dark:text-gray-400 truncate">{person.title}</p>
                                            <p className="text-xs text-blue-500 mt-1">{person.followers} followers</p>
                                        </div>
                                        <Linkedin className="w-4 h-4 text-blue-500 opacity-0 group-hover:opacity-100 transition-opacity" />
                                    </div>
                                </a>
                            ))}
                        </div>
                    </div>
                )}
            </div>

            {/* Certifications */}
            <div className="card">
                <button
                    onClick={() => toggleSection('certifications')}
                    className="w-full p-6 flex items-center justify-between"
                >
                    <h2 className="text-lg font-semibold text-gray-800 dark:text-white flex items-center gap-2">
                        <Award className="w-5 h-5 text-amber-500" />
                        Certification Roadmap
                    </h2>
                    {expandedSection === 'certifications' ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                </button>
                {expandedSection === 'certifications' && (
                    <div className="px-6 pb-6">
                        <div className="space-y-4">
                            {certifications.map((cert, index) => (
                                <div
                                    key={index}
                                    className={`p-5 rounded-xl border-2 ${cert.recommended
                                        ? 'border-primary-200 dark:border-primary-800 bg-primary-50/50 dark:bg-primary-900/20'
                                        : 'border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-700/50'
                                        }`}
                                >
                                    <div className="flex items-start justify-between gap-4">
                                        <div className="flex-1">
                                            <div className="flex items-center gap-2 mb-1">
                                                <h3 className="font-semibold text-gray-800 dark:text-white">{cert.name}</h3>
                                                {cert.recommended && (
                                                    <span className="badge badge-primary flex items-center gap-1">
                                                        <Star className="w-3 h-3" />
                                                        Recommended
                                                    </span>
                                                )}
                                            </div>
                                            <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">{cert.description}</p>
                                            <div className="flex flex-wrap gap-4 text-sm">
                                                <span className="text-gray-500 dark:text-gray-400">
                                                    <GraduationCap className="w-4 h-4 inline mr-1" />
                                                    {cert.level}
                                                </span>
                                                <span className="text-gray-500 dark:text-gray-400">⏱️ {cert.duration}</span>
                                                <span className="text-gray-500 dark:text-gray-400">💰 {cert.cost}</span>
                                            </div>
                                        </div>
                                        <a
                                            href={cert.url}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="btn-secondary flex items-center gap-1 flex-shrink-0"
                                        >
                                            Learn More <ExternalLink className="w-4 h-4" />
                                        </a>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>

            {/* PM Tools */}
            <div className="card">
                <button
                    onClick={() => toggleSection('tools')}
                    className="w-full p-6 flex items-center justify-between"
                >
                    <h2 className="text-lg font-semibold text-gray-800 dark:text-white flex items-center gap-2">
                        <Wrench className="w-5 h-5 text-emerald-500" />
                        PM Tools & Tutorials
                    </h2>
                    {expandedSection === 'tools' ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                </button>
                {expandedSection === 'tools' && (
                    <div className="px-6 pb-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                            {tools.map((tool, index) => (
                                <a
                                    key={index}
                                    href={tool.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="p-4 rounded-xl bg-gray-50 dark:bg-gray-700/50 hover:bg-emerald-50 dark:hover:bg-emerald-900/20 transition-all group"
                                >
                                    <div className="flex items-center justify-between mb-2">
                                        <h3 className="font-semibold text-gray-800 dark:text-white group-hover:text-emerald-600 dark:group-hover:text-emerald-400">
                                            {tool.name}
                                        </h3>
                                        <ExternalLink className="w-4 h-4 text-gray-400 group-hover:text-emerald-500" />
                                    </div>
                                    <span className="badge badge-success text-xs mb-2">{tool.category}</span>
                                    <p className="text-sm text-gray-600 dark:text-gray-400">{tool.description}</p>
                                </a>
                            ))}
                        </div>
                    </div>
                )}
            </div>

            {/* Books */}
            <div className="card">
                <button
                    onClick={() => toggleSection('books')}
                    className="w-full p-6 flex items-center justify-between"
                >
                    <h2 className="text-lg font-semibold text-gray-800 dark:text-white flex items-center gap-2">
                        <BookMarked className="w-5 h-5 text-purple-500" />
                        Book Recommendations
                    </h2>
                    {expandedSection === 'books' ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                </button>
                {expandedSection === 'books' && (
                    <div className="px-6 pb-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                            {books.map((book, index) => (
                                <a
                                    key={index}
                                    href={book.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="p-4 rounded-xl bg-gray-50 dark:bg-gray-700/50 hover:bg-purple-50 dark:hover:bg-purple-900/20 transition-all group block"
                                >
                                    <div className="flex justify-between items-start">
                                        <h3 className="font-semibold text-gray-800 dark:text-white mb-1 group-hover:text-purple-600 dark:group-hover:text-purple-400">
                                            {book.title}
                                        </h3>
                                        <ExternalLink className="w-4 h-4 text-gray-400 group-hover:text-purple-500 flex-shrink-0 ml-2" />
                                    </div>
                                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">by {book.author}</p>
                                    <span className="badge badge-primary text-xs">{book.focus}</span>
                                </a>
                            ))}
                        </div>
                    </div>
                )}
            </div>

            {/* Podcasts */}
            <div className="card">
                <button
                    onClick={() => toggleSection('podcasts')}
                    className="w-full p-6 flex items-center justify-between"
                >
                    <h2 className="text-lg font-semibold text-gray-800 dark:text-white flex items-center gap-2">
                        <Headphones className="w-5 h-5 text-pink-500" />
                        PM Podcasts
                    </h2>
                    {expandedSection === 'podcasts' ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                </button>
                {expandedSection === 'podcasts' && (
                    <div className="px-6 pb-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                            {podcasts.map((podcast, index) => (
                                <a
                                    key={index}
                                    href={podcast.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="p-4 rounded-xl bg-gray-50 dark:bg-gray-700/50 hover:bg-pink-50 dark:hover:bg-pink-900/20 transition-all group block"
                                >
                                    <div className="flex justify-between items-start">
                                        <h3 className="font-semibold text-gray-800 dark:text-white mb-1 group-hover:text-pink-600 dark:group-hover:text-pink-400">
                                            {podcast.name}
                                        </h3>
                                        <ExternalLink className="w-4 h-4 text-gray-400 group-hover:text-pink-500 flex-shrink-0 ml-2" />
                                    </div>
                                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">Host: {podcast.host}</p>
                                    <span className="badge badge-warning text-xs">{podcast.focus}</span>
                                </a>
                            ))}
                        </div>
                    </div>
                )}
            </div>

            {/* Research Articles */}
            <div className="card">
                <button
                    onClick={() => toggleSection('articles')}
                    className="w-full p-6 flex items-center justify-between"
                >
                    <h2 className="text-lg font-semibold text-gray-800 dark:text-white flex items-center gap-2">
                        <Newspaper className="w-5 h-5 text-indigo-500" />
                        Trending Articles & Research
                    </h2>
                    {expandedSection === 'articles' ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                </button>
                {expandedSection === 'articles' && (
                    <div className="px-6 pb-6">
                        {loadingArticles ? (
                            <div className="space-y-3">
                                {[...Array(3)].map((_, i) => (
                                    <div key={i} className="p-4 rounded-xl border border-gray-100 dark:border-gray-700 animate-pulse">
                                        <div className="h-5 bg-gray-200 dark:bg-gray-700 rounded w-3/4 mb-2"></div>
                                        <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/2"></div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="space-y-3">
                                {trendingArticles.map((article) => (
                                    <a
                                        key={article.id}
                                        href={article.url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex items-center justify-between p-4 rounded-xl bg-gray-50 dark:bg-gray-700/50 hover:bg-indigo-50 dark:hover:bg-indigo-900/20 transition-all group"
                                    >
                                        <div>
                                            <h3 className="font-medium text-gray-800 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400">
                                                {article.title}
                                            </h3>
                                            <p className="text-sm text-gray-500 dark:text-gray-400 flex items-center gap-2 mt-1">
                                                <span>{article.source}</span>
                                                <span>•</span>
                                                <span>{new Date(article.date).toLocaleDateString()}</span>
                                                {article.isNew && (
                                                    <span className="bg-green-100 text-green-700 text-xs px-2 py-0.5 rounded-full">New</span>
                                                )}
                                            </p>
                                        </div>
                                        <ExternalLink className="w-4 h-4 text-gray-400 group-hover:text-indigo-500 flex-shrink-0 ml-4" />
                                    </a>
                                ))}
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};
