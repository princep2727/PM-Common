import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { Mail, Lock, AlertCircle, ArrowRight, User as UserIcon } from 'lucide-react';

export const Login: React.FC = () => {
    const { signInWithGoogle, login, signup } = useAuth();
    const navigate = useNavigate();
    const [isSignUp, setIsSignUp] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleGoogleSignIn = async () => {
        try {
            setError('');
            setLoading(true);
            await signInWithGoogle();
            navigate('/');
        } catch (err: any) {
            console.error(err);
            if (err.code === 'auth/popup-closed-by-user') {
                setError('Sign in cancelled.');
            } else {
                setError('Failed to sign in with Google. Check console for details.');
            }
        } finally {
            setLoading(false);
        }
    };

    const handleEmailAuth = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            if (isSignUp) {
                if (!name) throw new Error("Name is required");
                await signup(email, password, name);
            } else {
                await login(email, password);
            }
            navigate('/');
        } catch (err: any) {
            console.error(err);
            // Map Firebase errors to user-friendly messages
            if (err.code === 'auth/email-already-in-use') {
                setError('This email is already registered.');
            } else if (err.code === 'auth/weak-password') {
                setError('Password should be at least 6 characters.');
            } else if (err.code === 'auth/user-not-found' || err.code === 'auth/wrong-password') {
                setError('Invalid email or password.');
            } else {
                setError(err.message || 'Failed to authenticate.');
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-[80vh] flex items-center justify-center px-4">
            <div className="w-full max-w-md">
                <div className="text-center mb-8 animate-fade-in">
                    <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-2">
                        {isSignUp ? 'Create Account' : 'Welcome Back'}
                    </h1>
                    <p className="text-gray-600 dark:text-gray-400">
                        {isSignUp ? 'Join the community of aspiring PMs' : 'Sign in to continue your learning journey'}
                    </p>
                </div>

                <div className="glass-card p-8 animate-slide-up">
                    {error && (
                        <div className="mb-6 p-4 bg-red-50 dark:bg-red-900/30 border border-red-200 dark:border-red-800 rounded-xl flex items-center gap-3 text-red-600 dark:text-red-400">
                            <AlertCircle className="w-5 h-5 flex-shrink-0" />
                            <p className="text-sm">{error}</p>
                        </div>
                    )}

                    <div className="space-y-6">
                        <button
                            onClick={handleGoogleSignIn}
                            disabled={loading}
                            className="w-full flex items-center justify-center gap-3 px-6 py-3 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200 font-semibold rounded-xl border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 transition-all shadow-sm hover:shadow-md group"
                        >
                            <img
                                src="https://www.google.com/favicon.ico"
                                alt="Google"
                                className="w-5 h-5"
                            />
                            <span>Continue with Google</span>
                            {loading && <div className="ml-2 w-4 h-4 border-2 border-primary-500 border-t-transparent rounded-full animate-spin" />}
                        </button>

                        <div className="relative">
                            <div className="absolute inset-0 flex items-center">
                                <div className="w-full border-t border-gray-200 dark:border-gray-700"></div>
                            </div>
                            <div className="relative flex justify-center text-sm">
                                <span className="px-2 bg-white dark:bg-gray-800 text-gray-500">Or continue with email</span>
                            </div>
                        </div>

                        <form className="space-y-4" onSubmit={handleEmailAuth}>
                            {isSignUp && (
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Full Name</label>
                                    <div className="relative">
                                        <UserIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                                        <input
                                            type="text"
                                            required={isSignUp}
                                            value={name}
                                            onChange={(e) => setName(e.target.value)}
                                            placeholder="John Doe"
                                            className="input-field pl-10"
                                        />
                                    </div>
                                </div>
                            )}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Email</label>
                                <div className="relative">
                                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                                    <input
                                        type="email"
                                        required
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        placeholder="Enter your email"
                                        className="input-field pl-10"
                                    />
                                </div>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Password</label>
                                <div className="relative">
                                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                                    <input
                                        type="password"
                                        required
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        placeholder="Enter your password"
                                        className="input-field pl-10"
                                    />
                                </div>
                            </div>
                            <button
                                type="submit"
                                disabled={loading}
                                className="btn-primary w-full flex items-center justify-center gap-2"
                            >
                                <span>{isSignUp ? 'Create Account' : 'Sign In'}</span>
                                {loading ? (
                                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                ) : (
                                    <ArrowRight className="w-5 h-5" />
                                )}
                            </button>
                        </form>
                    </div>
                </div>

                <p className="text-center mt-6 text-gray-600 dark:text-gray-400">
                    {isSignUp ? "Already have an account?" : "Don't have an account?"}{' '}
                    <button
                        onClick={() => {
                            setIsSignUp(!isSignUp);
                            setError('');
                        }}
                        className="text-primary-600 dark:text-primary-400 font-semibold hover:underline"
                    >
                        {isSignUp ? 'Sign In' : 'Sign Up'}
                    </button>
                </p>
            </div>
        </div>
    );
};
