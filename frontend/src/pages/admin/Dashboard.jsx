import { useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import {
    FolderKanban,
    Lightbulb,
    MessageSquare,
    TrendingUp,
    Mail,
    CheckCircle,
    Clock,
    AlertCircle,
    RefreshCw,
} from 'lucide-react';
import AdminLayout from '../../components/admin/AdminLayout';
import { adminService } from '../../services';
import { useAuth } from '../../context/AuthContext';
import Loading from '../../components/Loading';
import toast from 'react-hot-toast';

const Dashboard = () => {
    const { hasValidSession } = useAuth();
    const [stats, setStats] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [retryCount, setRetryCount] = useState(0);

    const fetchStats = useCallback(async () => {
        // Ensure we have a valid session before making API calls
        if (!hasValidSession()) {
            console.warn('[Dashboard] No valid session, skipping fetch');
            setLoading(false);
            return;
        }

        try {
            setError(null);
            const response = await adminService.getDashboardStats();
            setStats(response.data);
            setRetryCount(0); // Reset retry count on success
        } catch (err) {
            console.error('[Dashboard] Error fetching stats:', err);

            // Don't retry on 401/403 - auth issues are handled by interceptor
            if (err.response?.status === 401 || err.response?.status === 403) {
                setError('Authentication error. Please log in again.');
                return;
            }

            // Use mock data as fallback for development/demo
            if (retryCount < 2) {
                toast.error(err.userMessage || 'Failed to load dashboard stats');
                setRetryCount(prev => prev + 1);
            }

            // Use mock data if API fails
            setStats(getMockStats());
        } finally {
            setLoading(false);
        }
    }, [hasValidSession, retryCount]);

    useEffect(() => {
        fetchStats();
    }, [fetchStats]);

    const getMockStats = () => ({
        totalProjects: 12,
        totalSkills: 18,
        totalMessages: 24,
        unreadMessages: 5,
        recentMessages: [
            {
                id: 1,
                name: 'John Doe',
                email: 'john@example.com',
                subject: 'Project Inquiry',
                createdAt: '2024-01-27T10:30:00',
                status: 'NEW',
            },
            {
                id: 2,
                name: 'Jane Smith',
                email: 'jane@example.com',
                subject: 'Collaboration Opportunity',
                createdAt: '2024-01-26T15:45:00',
                status: 'READ',
            },
        ],
    });

    const handleRetry = () => {
        setLoading(true);
        setRetryCount(0);
        fetchStats();
    };

    const statCards = stats
        ? [
            {
                icon: FolderKanban,
                label: 'Total Projects',
                value: stats.totalProjects,
                color: 'from-blue-500 to-blue-600',
                bgColor: 'bg-blue-500/20',
            },
            {
                icon: Lightbulb,
                label: 'Total Skills',
                value: stats.totalSkills,
                color: 'from-purple-500 to-purple-600',
                bgColor: 'bg-purple-500/20',
            },
            {
                icon: MessageSquare,
                label: 'Total Messages',
                value: stats.totalMessages,
                color: 'from-green-500 to-green-600',
                bgColor: 'bg-green-500/20',
            },
            {
                icon: Mail,
                label: 'Unread Messages',
                value: stats.unreadMessages,
                color: 'from-orange-500 to-orange-600',
                bgColor: 'bg-orange-500/20',
            },
        ]
        : [];

    if (loading) {
        return (
            <AdminLayout>
                <Loading />
            </AdminLayout>
        );
    }

    if (error) {
        return (
            <AdminLayout>
                <div className="flex flex-col items-center justify-center min-h-[50vh] space-y-4">
                    <AlertCircle className="w-16 h-16 text-red-400" />
                    <h2 className="text-xl font-bold text-white">{error}</h2>
                    <button
                        onClick={handleRetry}
                        className="btn-primary flex items-center space-x-2"
                    >
                        <RefreshCw className="w-5 h-5" />
                        <span>Retry</span>
                    </button>
                </div>
            </AdminLayout>
        );
    }

    return (
        <AdminLayout>
            <div className="space-y-6">
                {/* Welcome Message */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    <h2 className="text-3xl font-bold gradient-text mb-2">
                        Welcome back! 👋
                    </h2>
                    <p className="text-dark-300">
                        Here's what's happening with your portfolio today.
                    </p>
                </motion.div>

                {/* Stats Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {statCards.map((stat, index) => (
                        <motion.div
                            key={stat.label}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.1 + index * 0.1 }}
                            className="glass-card p-6 hover-lift"
                        >
                            <div className="flex items-center justify-between mb-4">
                                <div className={`p-3 ${stat.bgColor} rounded-lg`}>
                                    <stat.icon className="w-6 h-6 text-white" />
                                </div>
                                <TrendingUp className="w-5 h-5 text-green-400" />
                            </div>
                            <h3 className="text-3xl font-bold text-white mb-1">
                                {stat.value}
                            </h3>
                            <p className="text-dark-400 text-sm">{stat.label}</p>
                        </motion.div>
                    ))}
                </div>

                {/* Recent Messages */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.5 }}
                    className="glass-card p-6"
                >
                    <div className="flex items-center justify-between mb-6">
                        <h3 className="text-xl font-bold text-white">Recent Messages</h3>
                        <a
                            href="/admin/messages"
                            className="text-primary-400 hover:text-primary-300 text-sm font-medium transition-colors duration-300"
                        >
                            View All
                        </a>
                    </div>

                    <div className="space-y-4">
                        {stats?.recentMessages?.map((message) => (
                            <div
                                key={message.id}
                                className="flex items-start space-x-4 p-4 bg-white/5 rounded-lg hover:bg-white/10 transition-colors duration-300"
                            >
                                <div className="flex-shrink-0">
                                    {message.status === 'NEW' ? (
                                        <div className="p-2 bg-orange-500/20 rounded-lg">
                                            <Clock className="w-5 h-5 text-orange-400" />
                                        </div>
                                    ) : (
                                        <div className="p-2 bg-green-500/20 rounded-lg">
                                            <CheckCircle className="w-5 h-5 text-green-400" />
                                        </div>
                                    )}
                                </div>
                                <div className="flex-1 min-w-0">
                                    <div className="flex items-start justify-between">
                                        <div>
                                            <p className="text-white font-medium">{message.name}</p>
                                            <p className="text-dark-400 text-sm">{message.email}</p>
                                        </div>
                                        <span
                                            className={`px-2 py-1 rounded-full text-xs font-medium ${message.status === 'NEW'
                                                ? 'bg-orange-500/20 text-orange-400'
                                                : 'bg-green-500/20 text-green-400'
                                                }`}
                                        >
                                            {message.status}
                                        </span>
                                    </div>
                                    <p className="text-dark-300 text-sm mt-1">{message.subject}</p>
                                    <p className="text-dark-500 text-xs mt-1">
                                        {new Date(message.createdAt).toLocaleString()}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>

                    {(!stats?.recentMessages || stats.recentMessages.length === 0) && (
                        <div className="text-center py-8">
                            <MessageSquare className="w-12 h-12 text-dark-600 mx-auto mb-3" />
                            <p className="text-dark-400">No messages yet</p>
                        </div>
                    )}
                </motion.div>
            </div>
        </AdminLayout>
    );
};

export default Dashboard;
