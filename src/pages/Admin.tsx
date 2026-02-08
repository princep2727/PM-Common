import React from 'react';
import {
    Users,
    Eye,
    TrendingUp,
    Activity,
    Search,
    Shield,
    UserCircle
} from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useStats } from '../hooks/useAnalytics';
// In a real app, we would import admin functions from firebase/firestore
// For now, we'll mock the data or fetch from 'users' collection if possible

export const Admin: React.FC = () => {
    const { user } = useAuth();

    const { stats: realStats, loading } = useStats();

    // Stats with real data
    const stats = [
        { label: 'Total Users', value: loading ? '...' : realStats.users.toLocaleString(), icon: Users, color: 'text-blue-500', bg: 'bg-blue-100 dark:bg-blue-900/30' },
        { label: 'Total Visits', value: loading ? '...' : realStats.visits.toLocaleString(), icon: Eye, color: 'text-green-500', bg: 'bg-green-100 dark:bg-green-900/30' },
        { label: 'Active Today', value: '128', icon: Activity, color: 'text-orange-500', bg: 'bg-orange-100 dark:bg-orange-900/30' },
        { label: 'Growth', value: '+12%', icon: TrendingUp, color: 'text-purple-500', bg: 'bg-purple-100 dark:bg-purple-900/30' },
    ];

    return (
        <div className="space-y-8 animate-fade-in">
            <div>
                <h1 className="text-2xl lg:text-3xl font-bold text-gray-800 dark:text-white flex items-center gap-3">
                    <Shield className="w-8 h-8 text-primary-500" />
                    Admin Dashboard
                </h1>
                <p className="text-gray-600 dark:text-gray-400 mt-1">Manage users and view platform analytics</p>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {stats.map((stat, index) => (
                    <div key={index} className="card p-6 flex items-center gap-4">
                        <div className={`p-3 rounded-xl ${stat.bg}`}>
                            <stat.icon className={`w-6 h-6 ${stat.color}`} />
                        </div>
                        <div>
                            <p className="text-sm text-gray-500 dark:text-gray-400">{stat.label}</p>
                            <h3 className="text-2xl font-bold text-gray-800 dark:text-white">{stat.value}</h3>
                        </div>
                    </div>
                ))}
            </div>

            {/* User Management Section */}
            <div className="card p-6">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
                    <h2 className="text-xl font-bold text-gray-800 dark:text-white">User Management</h2>
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                        <input
                            type="text"
                            placeholder="Search users..."
                            className="input-field pl-9 py-2 text-sm max-w-xs"
                        />
                    </div>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead className="bg-gray-50 dark:bg-gray-700/50 text-gray-500 dark:text-gray-400 text-sm uppercase">
                            <tr>
                                <th className="px-6 py-3 font-medium rounded-tl-lg">User</th>
                                <th className="px-6 py-3 font-medium">Role</th>
                                <th className="px-6 py-3 font-medium">Status</th>
                                <th className="px-6 py-3 font-medium">Last Login</th>
                                <th className="px-6 py-3 font-medium rounded-tr-lg">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                            <tr className="hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors">
                                <td className="px-6 py-4">
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 rounded-full bg-primary-100 dark:bg-primary-900/30 flex items-center justify-center text-primary-600 dark:text-primary-400">
                                            {user?.photoURL ? <img src={user.photoURL} alt="" className="rounded-full" /> : <UserCircle className="w-6 h-6" />}
                                        </div>
                                        <div>
                                            <p className="font-medium text-gray-800 dark:text-white">{user?.displayName || 'Current User'}</p>
                                            <p className="text-sm text-gray-500">{user?.email}</p>
                                        </div>
                                    </div>
                                </td>
                                <td className="px-6 py-4">
                                    <span className="px-2 py-1 rounded-full text-xs font-medium bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300">Admin</span>
                                </td>
                                <td className="px-6 py-4">
                                    <span className="inline-flex items-center gap-1.5 px-2 py-1 rounded-full text-xs font-medium bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300">
                                        <span className="w-1.5 h-1.5 rounded-full bg-green-500"></span>
                                        Active
                                    </span>
                                </td>
                                <td className="px-6 py-4 text-sm text-gray-600 dark:text-gray-400">Now</td>
                                <td className="px-6 py-4">
                                    <button className="text-sm text-primary-600 dark:text-primary-400 font-medium hover:underline">Edit</button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};
