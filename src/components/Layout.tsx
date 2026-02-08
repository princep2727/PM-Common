import React, { useState } from 'react';
import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import { useTheme } from '../contexts/ThemeContext';
import { useAuth } from '../contexts/AuthContext';
import {
    LayoutDashboard,
    Newspaper,
    Briefcase,
    Menu,
    X,
    Sun,
    Moon,
    LogOut,
    MessageSquare,
    BrainCircuit,
    Info,
    Wrench
} from 'lucide-react';
import { GridBackground } from './GridBackground';

const navItems = [
    { path: '/about', label: 'Start Here', icon: Info },
    { path: '/', label: 'Dashboard', icon: LayoutDashboard },
    { path: '/news', label: 'News', icon: Newspaper },
    { path: '/career', label: 'Jobs', icon: Briefcase },
    { path: '/community', label: 'Community', icon: MessageSquare },
    { path: '/interview', label: 'Coach', icon: BrainCircuit },
];

// Tools that were missing
const toolItems = [
    { path: '/resources', label: 'Resources' },
    { path: '/timer', label: 'Pomodoro Timer' },
    { path: '/notes', label: 'Notes' },
    { path: '/tasks', label: 'Task Manager' },
    { path: '/quiz', label: 'Quiz' },
    { path: '/progress', label: 'Progress' },
];

export const Layout: React.FC = () => {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const { theme, toggleTheme } = useTheme();
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = async () => {
        try {
            await logout();
            navigate('/login');
        } catch (error) {
            console.error('Failed to logout', error);
        }
    };

    return (
        <div className="min-h-screen relative flex flex-col font-sans text-gray-900 dark:text-gray-100 transition-colors duration-300">
            <GridBackground />

            {/* TOP NAVIGATION (Clear Street Style) */}
            <header className="fixed top-0 left-0 right-0 z-50 h-16 border-b border-gray-200/50 dark:border-white/10 bg-white/80 dark:bg-black/80 backdrop-blur-xl">
                <div className="max-w-7xl mx-auto px-4 h-full flex items-center justify-between">

                    {/* Left: Logo */}
                    <div className="flex items-center gap-2 cursor-pointer" onClick={() => navigate('/')}>
                        <div className="w-8 h-8 rounded bg-primary-600 dark:bg-primary-500 flex items-center justify-center">
                            <span className="font-bold text-white">P</span>
                        </div>
                        <span className="font-bold text-lg tracking-tight hidden md:block">PM Commons</span>
                    </div>

                    {/* Center: Desktop Nav */}
                    <nav className="hidden md:flex items-center gap-1">
                        {navItems.map((item) => (
                            <NavLink
                                key={item.path}
                                to={item.path}
                                className={({ isActive }) =>
                                    `px-3 py-2 rounded-full text-sm font-medium transition-all duration-200 ${isActive
                                        ? 'text-primary-600 dark:text-primary-400 bg-primary-50 dark:bg-primary-900/20'
                                        : 'text-gray-500 dark:text-gray-400 hover:text-primary-600 dark:hover:text-white hover:bg-gray-50/50 dark:hover:bg-white/5'
                                    }`
                                }
                            >
                                {item.label}
                            </NavLink>
                        ))}

                        {/* Tools Dropdown */}
                        <div className="relative group ml-1">
                            <button className="px-3 py-2 rounded-full text-sm font-medium text-gray-500 dark:text-gray-400 hover:text-primary-600 dark:hover:text-white hover:bg-gray-50/50 dark:hover:bg-white/5 transition-all flex items-center gap-1">
                                Tools
                                <Wrench className="w-3 h-3" />
                            </button>
                            <div className="absolute top-full right-0 mt-2 w-48 bg-white dark:bg-neutral-900 rounded-xl shadow-xl border border-gray-200 dark:border-gray-800 opacity-0 group-hover:opacity-100 invisible group-hover:visible transition-all duration-200 transform origin-top-right">
                                <div className="p-2 flex flex-col gap-1">
                                    {toolItems.map((subItem) => (
                                        <NavLink
                                            key={subItem.path}
                                            to={subItem.path}
                                            className={({ isActive }) =>
                                                `px-3 py-2 rounded-lg text-sm transition-colors ${isActive
                                                    ? 'bg-primary-50 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400'
                                                    : 'text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-white/5'
                                                }`
                                            }
                                        >
                                            {subItem.label}
                                        </NavLink>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </nav>

                    {/* Right: Actions */}
                    <div className="flex items-center gap-3">
                        {/* Theme Toggle */}
                        <button
                            onClick={toggleTheme}
                            className="p-2 rounded-full text-gray-500 hover:bg-gray-100 dark:hover:bg-white/10 transition-colors"
                        >
                            {theme === 'dark' ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
                        </button>

                        {/* User Profile / Auth */}
                        {user ? (
                            <div className="flex items-center gap-3 pl-3 border-l border-gray-200 dark:border-white/10">
                                <div className="hidden sm:block text-right">
                                    <p className="text-xs font-medium">{user.displayName || 'User'}</p>
                                </div>
                                <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-primary-500 to-accent-500 p-[1px]">
                                    <div className="w-full h-full rounded-full bg-white dark:bg-black flex items-center justify-center overflow-hidden">
                                        {user.photoURL ? (
                                            <img src={user.photoURL} alt="User" className="w-full h-full object-cover" />
                                        ) : (
                                            <span className="text-xs font-bold">{user.displayName?.charAt(0) || 'U'}</span>
                                        )}
                                    </div>
                                </div>
                            </div>
                        ) : (
                            <button
                                onClick={() => navigate('/login')}
                                className="px-4 py-2 text-sm font-medium bg-primary-600 dark:bg-white text-white dark:text-primary-950 rounded-full hover:opacity-90 transition-opacity"
                            >
                                Sign In
                            </button>
                        )}

                        {/* Mobile Menu Toggle */}
                        <button
                            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                            className="md:hidden p-2 text-gray-500 hover:text-black dark:hover:text-white"
                        >
                            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                        </button>
                    </div>
                </div>
            </header>

            {/* Mobile Menu Overlay */}
            {mobileMenuOpen && (
                <div className="md:hidden fixed inset-0 z-40 bg-white dark:bg-black pt-20 px-4 animate-fade-in overflow-y-auto pb-10">
                    <nav className="flex flex-col gap-2">
                        <div className="text-xs font-bold text-gray-400 uppercase tracking-widest px-4 mt-2 mb-1">Menu</div>
                        {navItems.map((item) => (
                            <NavLink
                                key={item.path}
                                to={item.path}
                                onClick={() => setMobileMenuOpen(false)}
                                className={({ isActive }) =>
                                    `p-4 text-lg font-medium border-b border-gray-100 dark:border-white/5 ${isActive ? 'text-primary-600 dark:text-primary-400' : 'text-gray-600 dark:text-gray-400'
                                    }`
                                }
                            >
                                <div className="flex items-center gap-3">
                                    <item.icon className="w-5 h-5" />
                                    {item.label}
                                </div>
                            </NavLink>
                        ))}

                        <div className="text-xs font-bold text-gray-400 uppercase tracking-widest px-4 mt-6 mb-1">Tools</div>
                        {toolItems.map((item) => (
                            <NavLink
                                key={item.path}
                                to={item.path}
                                onClick={() => setMobileMenuOpen(false)}
                                className={({ isActive }) =>
                                    `p-4 text-lg font-medium border-b border-gray-100 dark:border-white/5 ${isActive ? 'text-primary-600 dark:text-primary-400' : 'text-gray-600 dark:text-gray-400'
                                    }`
                                }
                            >
                                <div className="flex items-center gap-3">
                                    <span className="w-5" />
                                    {item.label}
                                </div>
                            </NavLink>
                        ))}

                        {user && (
                            <button
                                onClick={() => { handleLogout(); setMobileMenuOpen(false); }}
                                className="mt-4 p-4 text-lg font-medium text-red-500 border-b border-gray-100 dark:border-white/5 text-left flex items-center gap-3"
                            >
                                <LogOut className="w-5 h-5" />
                                Sign Out
                            </button>
                        )}
                    </nav>
                </div>
            )}

            {/* Content Area */}
            <main className="flex-1 pt-20 px-4 md:px-8 max-w-7xl mx-auto w-full">
                <Outlet />
            </main>
        </div>
    );
};
