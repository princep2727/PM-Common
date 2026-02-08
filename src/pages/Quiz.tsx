import React, { useState } from 'react';
import { useQuizResults } from '../hooks/useQuizResults';
import {
    HelpCircle,
    CheckCircle,
    XCircle,
    ChevronRight,
    Trophy,
    RotateCcw,
    ArrowRight,
    Brain,
    Users,
    AlertTriangle,
    Wrench,
    MessageSquare,
    Target,
} from 'lucide-react';

interface Question {
    id: string;
    category: string;
    question: string;
    options: string[];
    correctAnswer: number;
    explanation: string;
}

const questions: Question[] = [
    // Project Fundamentals
    { id: 'pf1', category: 'Project Fundamentals', question: 'What is the primary constraint in the project management triple constraint?', options: ['Scope, Time, Cost', 'Risk, Quality, Resources', 'People, Process, Technology', 'Plan, Execute, Close'], correctAnswer: 0, explanation: 'The triple constraint (also known as the iron triangle) consists of Scope, Time, and Cost. Changes to one constraint typically impact the others.' },
    { id: 'pf2', category: 'Project Fundamentals', question: 'Which document formally authorizes a project and provides the project manager with authority?', options: ['Project Plan', 'Project Charter', 'Scope Statement', 'Work Breakdown Structure'], correctAnswer: 1, explanation: 'The Project Charter formally authorizes the project and gives the PM authority to apply resources to project activities.' },
    { id: 'pf3', category: 'Project Fundamentals', question: 'What is a Work Breakdown Structure (WBS)?', options: ['A team organizational chart', 'A hierarchical decomposition of project scope', 'A schedule of project activities', 'A list of project risks'], correctAnswer: 1, explanation: 'A WBS is a hierarchical decomposition of the total scope of work, breaking down deliverables into smaller, manageable components.' },
    { id: 'pf4', category: 'Project Fundamentals', question: 'Which phase typically has the highest cost in a project lifecycle?', options: ['Initiation', 'Planning', 'Execution', 'Closing'], correctAnswer: 2, explanation: 'The Execution phase is where most project work is performed and resources are utilized, making it typically the most expensive phase.' },
    { id: 'pf5', category: 'Project Fundamentals', question: 'What is the critical path in project management?', options: ['The shortest sequence of activities', 'The longest sequence of dependent activities', 'The most risky path', 'The path with most resources'], correctAnswer: 1, explanation: 'The critical path is the longest sequence of dependent activities that determines the minimum project duration.' },

    // Agile & Scrum
    { id: 'as1', category: 'Agile & Scrum', question: 'What is the typical length of a Sprint in Scrum?', options: ['1-2 days', '1-4 weeks', '1-3 months', '6 months'], correctAnswer: 1, explanation: 'Sprints in Scrum are typically 1-4 weeks long, with 2 weeks being the most common duration.' },
    { id: 'as2', category: 'Agile & Scrum', question: 'Who is responsible for maximizing the value of the product in Scrum?', options: ['Scrum Master', 'Development Team', 'Product Owner', 'Stakeholders'], correctAnswer: 2, explanation: 'The Product Owner is responsible for maximizing the value of the product by managing the Product Backlog.' },
    { id: 'as3', category: 'Agile & Scrum', question: 'What happens during a Sprint Retrospective?', options: ['Demo to stakeholders', 'Team inspects and adapts their process', 'Sprint planning', 'Daily standup'], correctAnswer: 1, explanation: 'The Sprint Retrospective is when the team inspects their process and identifies improvements for the next Sprint.' },
    { id: 'as4', category: 'Agile & Scrum', question: 'What is a User Story in Agile?', options: ['A technical specification', 'A requirement written from user perspective', 'A bug report', 'A sprint goal'], correctAnswer: 1, explanation: 'A User Story describes a feature from the perspective of the end user, typically in the format: "As a [user], I want [goal], so that [benefit]."' },
    { id: 'as5', category: 'Agile & Scrum', question: 'What is velocity in Scrum?', options: ['How fast team members work', 'Amount of work completed per Sprint', 'Number of bugs fixed', 'Time to market'], correctAnswer: 1, explanation: 'Velocity is the amount of work (usually measured in story points) a team completes during a Sprint, used for planning future Sprints.' },

    // Risk Management
    { id: 'rm1', category: 'Risk Management', question: 'What is risk mitigation?', options: ['Ignoring the risk', 'Reducing probability or impact of risk', 'Transferring risk to stakeholders', 'Accepting all risks'], correctAnswer: 1, explanation: 'Risk mitigation involves taking actions to reduce the probability of a risk occurring or reducing its impact if it does occur.' },
    { id: 'rm2', category: 'Risk Management', question: 'What is a risk register?', options: ['A list of team members', 'A document tracking identified risks', 'A financial ledger', 'A project schedule'], correctAnswer: 1, explanation: 'A Risk Register is a document that tracks all identified risks, their analysis, response strategies, and current status.' },
    { id: 'rm3', category: 'Risk Management', question: 'What is the difference between a risk and an issue?', options: ['There is no difference', 'A risk is uncertain, an issue has already occurred', 'An issue is less serious', 'Risks are always negative'], correctAnswer: 1, explanation: 'A risk is an uncertain event that may occur, while an issue is something that has already happened and needs to be addressed.' },
    { id: 'rm4', category: 'Risk Management', question: 'What is a contingency reserve?', options: ['Extra team members', 'Budget/time buffer for known risks', 'Emergency fund for sponsors', 'Backup project plan'], correctAnswer: 1, explanation: 'A contingency reserve is budget or time allocated to address identified risks that may occur during the project.' },

    // Stakeholder Management
    { id: 'sm1', category: 'Stakeholder Management', question: 'Who is a project stakeholder?', options: ['Only the project sponsor', 'Anyone affected by or affecting the project', 'Team members only', 'Customers only'], correctAnswer: 1, explanation: 'A stakeholder is anyone who is affected by or can affect the project, including sponsors, team members, customers, and others.' },
    { id: 'sm2', category: 'Stakeholder Management', question: 'What is a stakeholder analysis matrix used for?', options: ['Tracking project costs', 'Understanding stakeholder power and interest', 'Scheduling meetings', 'Assigning tasks'], correctAnswer: 1, explanation: 'A stakeholder analysis matrix (often power/interest grid) helps identify and categorize stakeholders based on their influence and interest levels.' },
    { id: 'sm3', category: 'Stakeholder Management', question: 'What is the best approach for high power, high interest stakeholders?', options: ['Keep informed', 'Keep satisfied', 'Manage closely', 'Monitor only'], correctAnswer: 2, explanation: 'High power, high interest stakeholders should be managed closely with regular engagement and involvement in key decisions.' },
    { id: 'sm4', category: 'Stakeholder Management', question: 'What is stakeholder engagement?', options: ['Hiring stakeholders', 'Process of involving stakeholders appropriately', 'Firing stakeholders', 'Ignoring stakeholders'], correctAnswer: 1, explanation: 'Stakeholder engagement is the process of communicating with and involving stakeholders appropriately throughout the project lifecycle.' },

    // Tools & Techniques
    { id: 'tt1', category: 'Tools & Techniques', question: 'What is a Gantt chart used for?', options: ['Risk analysis', 'Visualizing project schedule', 'Team performance review', 'Budget tracking'], correctAnswer: 1, explanation: 'A Gantt chart is a bar chart that visualizes a project schedule, showing tasks, their durations, and dependencies over time.' },
    { id: 'tt2', category: 'Tools & Techniques', question: 'What does a Kanban board visualize?', options: ['Budget breakdown', 'Work flowing through stages', 'Team hierarchy', 'Risk levels'], correctAnswer: 1, explanation: 'A Kanban board visualizes work items as they flow through different stages (e.g., To Do, In Progress, Done).' },
    { id: 'tt3', category: 'Tools & Techniques', question: 'What is the purpose of a RACI matrix?', options: ['Risk assessment', 'Clarifying roles and responsibilities', 'Cost estimation', 'Schedule compression'], correctAnswer: 1, explanation: 'A RACI matrix defines who is Responsible, Accountable, Consulted, and Informed for each task or deliverable.' },
    { id: 'tt4', category: 'Tools & Techniques', question: 'What is story point estimation?', options: ['Counting lines of code', 'Relative sizing of work effort', 'Exact time estimation', 'Cost calculation'], correctAnswer: 1, explanation: 'Story point estimation uses relative sizing (often Fibonacci numbers) to estimate the effort required for user stories.' },

    // Leadership & Communication
    { id: 'lc1', category: 'Leadership & Communication', question: 'What is servant leadership?', options: ['Commanding the team', 'Leading by serving the team\'s needs', 'Delegating all decisions', 'Avoiding team conflict'], correctAnswer: 1, explanation: 'Servant leadership focuses on serving the team by removing obstacles, supporting growth, and enabling success.' },
    { id: 'lc2', category: 'Leadership & Communication', question: 'What is active listening?', options: ['Listening while working', 'Fully concentrating and responding thoughtfully', 'Interrupting with solutions', 'Multitasking during meetings'], correctAnswer: 1, explanation: 'Active listening means fully concentrating on the speaker, understanding their message, and responding thoughtfully.' },
    { id: 'lc3', category: 'Leadership & Communication', question: 'What is the most effective form of communication in Agile?', options: ['Email', 'Face-to-face conversation', 'Documentation', 'Written reports'], correctAnswer: 1, explanation: 'The Agile Manifesto values face-to-face conversation as the most efficient and effective way to convey information.' },
    { id: 'lc4', category: 'Leadership & Communication', question: 'What is psychological safety in a team?', options: ['Physical safety at work', 'Feeling safe to take risks and speak up', 'Job security', 'Privacy protection'], correctAnswer: 1, explanation: 'Psychological safety means team members feel safe to take risks, voice opinions, and admit mistakes without fear of punishment.' },
];

const categories = ['All', 'Project Fundamentals', 'Agile & Scrum', 'Risk Management', 'Stakeholder Management', 'Tools & Techniques', 'Leadership & Communication'];

const categoryIcons: Record<string, React.ElementType> = {
    'Project Fundamentals': Target,
    'Agile & Scrum': Brain,
    'Risk Management': AlertTriangle,
    'Stakeholder Management': Users,
    'Tools & Techniques': Wrench,
    'Leadership & Communication': MessageSquare,
};

export const Quiz: React.FC = () => {
    const { addResult, getCategoryStats, getRecentResults } = useQuizResults();
    const [selectedCategory, setSelectedCategory] = useState<string>('All');
    const [quizStarted, setQuizStarted] = useState(false);
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
    const [showExplanation, setShowExplanation] = useState(false);
    const [score, setScore] = useState(0);
    const [quizComplete, setQuizComplete] = useState(false);
    const [quizQuestions, setQuizQuestions] = useState<Question[]>([]);

    const startQuiz = (category: string) => {
        const filtered = category === 'All'
            ? questions
            : questions.filter(q => q.category === category);
        const shuffled = [...filtered].sort(() => Math.random() - 0.5).slice(0, 10);
        setQuizQuestions(shuffled);
        setSelectedCategory(category);
        setQuizStarted(true);
        setCurrentQuestion(0);
        setScore(0);
        setQuizComplete(false);
        setSelectedAnswer(null);
        setShowExplanation(false);
    };

    const handleAnswer = (answerIndex: number) => {
        if (selectedAnswer !== null) return;
        setSelectedAnswer(answerIndex);
        setShowExplanation(true);
        if (answerIndex === quizQuestions[currentQuestion].correctAnswer) {
            setScore(prev => prev + 1);
        }
    };

    const nextQuestion = () => {
        if (currentQuestion + 1 < quizQuestions.length) {
            setCurrentQuestion(prev => prev + 1);
            setSelectedAnswer(null);
            setShowExplanation(false);
        } else {
            setQuizComplete(true);
            addResult({
                category: selectedCategory,
                score: score + (selectedAnswer === quizQuestions[currentQuestion].correctAnswer ? 1 : 0),
                totalQuestions: quizQuestions.length,
            });
        }
    };

    const resetQuiz = () => {
        setQuizStarted(false);
        setQuizComplete(false);
        setCurrentQuestion(0);
        setScore(0);
        setSelectedAnswer(null);
        setShowExplanation(false);
    };

    const categoryStats = getCategoryStats();
    const recentResults = getRecentResults(5);

    if (quizComplete) {
        const finalScore = score + (selectedAnswer === quizQuestions[currentQuestion]?.correctAnswer ? 1 : 0);
        const percentage = Math.round((finalScore / quizQuestions.length) * 100);
        return (
            <div className="space-y-8 animate-fade-in">
                <div className="card p-8 text-center max-w-lg mx-auto">
                    <Trophy className={`w-20 h-20 mx-auto mb-6 ${percentage >= 70 ? 'text-amber-500' : 'text-gray-400'}`} />
                    <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-2">Quiz Complete!</h1>
                    <p className="text-gray-600 dark:text-gray-400 mb-6">{selectedCategory}</p>
                    <div className="text-6xl font-bold gradient-text mb-2">{percentage}%</div>
                    <p className="text-xl text-gray-600 dark:text-gray-400 mb-8">
                        {finalScore} out of {quizQuestions.length} correct
                    </p>
                    <div className="flex gap-4 justify-center">
                        <button onClick={resetQuiz} className="btn-primary flex items-center gap-2">
                            <RotateCcw className="w-5 h-5" />
                            Try Again
                        </button>
                        <button onClick={() => setQuizStarted(false)} className="btn-secondary">
                            Choose Category
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    if (quizStarted && quizQuestions.length > 0) {
        const question = quizQuestions[currentQuestion];
        return (
            <div className="space-y-6 animate-fade-in max-w-3xl mx-auto">
                <div className="flex items-center justify-between">
                    <span className="badge badge-primary">{question.category}</span>
                    <span className="text-gray-600 dark:text-gray-400">
                        Question {currentQuestion + 1} of {quizQuestions.length}
                    </span>
                </div>

                <div className="progress-bar">
                    <div className="progress-fill" style={{ width: `${((currentQuestion + 1) / quizQuestions.length) * 100}%` }} />
                </div>

                <div className="card p-8">
                    <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-6">{question.question}</h2>
                    <div className="space-y-3">
                        {question.options.map((option, index) => (
                            <button
                                key={index}
                                onClick={() => handleAnswer(index)}
                                disabled={selectedAnswer !== null}
                                className={`w-full p-4 text-left rounded-xl border-2 transition-all ${selectedAnswer === null
                                        ? 'border-gray-200 dark:border-gray-700 hover:border-primary-500 hover:bg-primary-50 dark:hover:bg-primary-900/20'
                                        : index === question.correctAnswer
                                            ? 'border-emerald-500 bg-emerald-50 dark:bg-emerald-900/20'
                                            : selectedAnswer === index
                                                ? 'border-red-500 bg-red-50 dark:bg-red-900/20'
                                                : 'border-gray-200 dark:border-gray-700 opacity-50'
                                    }`}
                            >
                                <div className="flex items-center gap-3">
                                    <span className={`w-8 h-8 rounded-full flex items-center justify-center font-semibold ${selectedAnswer === null
                                            ? 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300'
                                            : index === question.correctAnswer
                                                ? 'bg-emerald-500 text-white'
                                                : selectedAnswer === index
                                                    ? 'bg-red-500 text-white'
                                                    : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300'
                                        }`}>
                                        {String.fromCharCode(65 + index)}
                                    </span>
                                    <span className="text-gray-800 dark:text-white">{option}</span>
                                    {selectedAnswer !== null && index === question.correctAnswer && (
                                        <CheckCircle className="w-5 h-5 text-emerald-500 ml-auto" />
                                    )}
                                    {selectedAnswer === index && index !== question.correctAnswer && (
                                        <XCircle className="w-5 h-5 text-red-500 ml-auto" />
                                    )}
                                </div>
                            </button>
                        ))}
                    </div>

                    {showExplanation && (
                        <div className="mt-6 p-4 rounded-xl bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800">
                            <p className="text-sm font-medium text-blue-800 dark:text-blue-300 mb-1">Explanation</p>
                            <p className="text-blue-700 dark:text-blue-400">{question.explanation}</p>
                        </div>
                    )}

                    {selectedAnswer !== null && (
                        <button onClick={nextQuestion} className="btn-primary mt-6 w-full flex items-center justify-center gap-2">
                            {currentQuestion + 1 < quizQuestions.length ? 'Next Question' : 'See Results'}
                            <ArrowRight className="w-5 h-5" />
                        </button>
                    )}
                </div>

                <div className="text-center">
                    <button onClick={resetQuiz} className="btn-ghost text-gray-500">
                        Exit Quiz
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="space-y-8 animate-fade-in">
            <div>
                <h1 className="text-2xl lg:text-3xl font-bold text-gray-800 dark:text-white flex items-center gap-3">
                    <HelpCircle className="w-8 h-8 text-primary-500" />
                    Quiz Center
                </h1>
                <p className="text-gray-600 dark:text-gray-400 mt-1">Test your PM knowledge across different categories</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {categories.map((category) => {
                    const stats = categoryStats.find(s => s.category === category);
                    const IconComponent = categoryIcons[category] || HelpCircle;
                    return (
                        <button
                            key={category}
                            onClick={() => startQuiz(category)}
                            className="card card-hover p-6 text-left"
                        >
                            <div className="flex items-start justify-between mb-4">
                                <div className="w-12 h-12 rounded-xl bg-primary-100 dark:bg-primary-900/50 flex items-center justify-center">
                                    <IconComponent className="w-6 h-6 text-primary-600 dark:text-primary-400" />
                                </div>
                                <ChevronRight className="w-5 h-5 text-gray-400" />
                            </div>
                            <h3 className="font-semibold text-gray-800 dark:text-white mb-1">{category}</h3>
                            <p className="text-sm text-gray-500 dark:text-gray-400 mb-3">
                                {category === 'All' ? questions.length : questions.filter(q => q.category === category).length} questions
                            </p>
                            {stats && stats.attempts > 0 && (
                                <div className="pt-2 border-t border-gray-100 dark:border-gray-700">
                                    <p className="text-xs text-gray-500 dark:text-gray-400">
                                        Best: {stats.bestScore}% | Avg: {stats.avgScore}% | Attempts: {stats.attempts}
                                    </p>
                                </div>
                            )}
                        </button>
                    );
                })}
            </div>

            {recentResults.length > 0 && (
                <div className="card p-6">
                    <h2 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">Recent Results</h2>
                    <div className="space-y-3">
                        {recentResults.map((result) => (
                            <div key={result.id} className="flex items-center justify-between p-3 rounded-xl bg-gray-50 dark:bg-gray-700/50">
                                <div>
                                    <p className="font-medium text-gray-800 dark:text-white">{result.category}</p>
                                    <p className="text-sm text-gray-500 dark:text-gray-400">
                                        {new Date(result.completedAt).toLocaleDateString('en-IE')}
                                    </p>
                                </div>
                                <div className={`text-xl font-bold ${result.percentage >= 70 ? 'text-emerald-500' : 'text-amber-500'}`}>
                                    {result.percentage}%
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};
