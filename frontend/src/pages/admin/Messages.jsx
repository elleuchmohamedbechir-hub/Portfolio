import { useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import {
    Search,
    Filter,
    Trash2,
    Eye,
    Mail,
    CheckCircle,
    Clock,
    X,
    AlertCircle,
    RefreshCw
} from 'lucide-react';
import AdminLayout from '../../components/admin/AdminLayout';
import { adminService } from '../../services';
import Loading from '../../components/Loading';
import toast from 'react-hot-toast';
import { useAuth } from '../../context/AuthContext';
import ConfirmDialog from '../../components/ConfirmDialog';

const Messages = () => {
    const { hasValidSession } = useAuth();
    const [messages, setMessages] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [statusFilter, setStatusFilter] = useState('ALL');
    const [selectedMessage, setSelectedMessage] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
    const [messageToDelete, setMessageToDelete] = useState(null);

    const fetchMessages = useCallback(async () => {
        if (!hasValidSession()) {
            console.warn('[Messages] No valid session, skipping fetch');
            setLoading(false);
            return;
        }

        try {
            setError(null);
            const params = statusFilter !== 'ALL' ? { status: statusFilter } : {};
            const response = await adminService.getMessages(params);
            setMessages(response.data);
        } catch (err) {
            console.error('[Messages] Error fetching messages:', err);
            if (err.response?.status !== 401 && err.response?.status !== 403) {
                setError(err.userMessage || 'Failed to load messages');
                toast.error(err.userMessage || 'Failed to load messages');
            }
        } finally {
            setLoading(false);
        }
    }, [hasValidSession, statusFilter]);

    useEffect(() => {
        fetchMessages();
    }, [fetchMessages]);

    const handleRetry = () => {
        setLoading(true);
        setError(null);
        fetchMessages();
    };

    const handleViewMessage = async (message) => {
        setSelectedMessage(message);
        setShowModal(true);

        if (message.status === 'NEW' || message.status === 'UNREAD') {
            try {
                await adminService.markAsRead(message.id);
                setMessages(prevMessages => prevMessages.map(m =>
                    m.id === message.id ? { ...m, status: 'READ' } : m
                ));
            } catch (error) {
                console.error('Error marking as read:', error);
            }
        }
    };

    const confirmDelete = (message) => {
        setMessageToDelete(message);
        setIsDeleteDialogOpen(true);
    };

    const handleDeleteMessage = async () => {
        const id = messageToDelete?.id;
        try {
            await adminService.deleteMessage(id);
            setMessages(messages.filter(m => m.id !== id));
            toast.success('Message deleted successfully');
            if (selectedMessage?.id === id) {
                setShowModal(false);
                setSelectedMessage(null);
            }
        } catch (err) {
            console.error('Error deleting message:', err);
            toast.error(err.userMessage || 'Failed to delete message');
        } finally {
            setIsDeleteDialogOpen(false);
            setMessageToDelete(null);
        }
    };

    const filteredMessages = messages.filter(message =>
        message.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        message.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        message.subject.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const getStatusIcon = (status) => {
        switch (status) {
            case 'NEW':
            case 'UNREAD':
                return <Clock className="w-4 h-4" />;
            case 'READ':
                return <Eye className="w-4 h-4" />;
            case 'REPLIED':
                return <CheckCircle className="w-4 h-4" />;
            default:
                return <Mail className="w-4 h-4" />;
        }
    };

    const getStatusColor = (status) => {
        switch (status) {
            case 'NEW':
            case 'UNREAD':
                return 'bg-orange-500/20 text-orange-400 border-orange-500/30';
            case 'READ':
                return 'bg-blue-500/20 text-blue-400 border-blue-500/30';
            case 'REPLIED':
                return 'bg-green-500/20 text-green-400 border-green-500/30';
            default:
                return 'bg-gray-500/20 text-gray-400 border-gray-500/30';
        }
    };

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
                {/* Header */}
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                    <div>
                        <h2 className="text-2xl font-bold text-white mb-1">Messages</h2>
                        <p className="text-dark-400">Manage contact form submissions</p>
                    </div>
                </div>

                {/* Filters */}
                <div className="glass-card p-4">
                    <div className="flex flex-col sm:flex-row gap-4">
                        {/* Search */}
                        <div className="flex-1 relative">
                            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-dark-400" />
                            <input
                                type="text"
                                placeholder="Search messages..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="input-field pl-10"
                            />
                        </div>

                        {/* Status Filter */}
                        <div className="flex items-center space-x-2">
                            <Filter className="w-5 h-5 text-dark-400" />
                            <select
                                value={statusFilter}
                                onChange={(e) => setStatusFilter(e.target.value)}
                                className="input-field"
                            >
                                <option value="ALL">All Status</option>
                                <option value="NEW">New</option>
                                <option value="READ">Read</option>
                                <option value="REPLIED">Replied</option>
                            </select>
                        </div>
                    </div>
                </div>

                {/* Messages Table */}
                <div className="glass-card overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead className="bg-white/5 border-b border-white/10">
                                <tr>
                                    <th className="px-6 py-4 text-left text-sm font-semibold text-dark-200">
                                        From
                                    </th>
                                    <th className="px-6 py-4 text-left text-sm font-semibold text-dark-200">
                                        Subject
                                    </th>
                                    <th className="px-6 py-4 text-left text-sm font-semibold text-dark-200">
                                        Date
                                    </th>
                                    <th className="px-6 py-4 text-left text-sm font-semibold text-dark-200">
                                        Status
                                    </th>
                                    <th className="px-6 py-4 text-right text-sm font-semibold text-dark-200">
                                        Actions
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-white/10">
                                {filteredMessages.map((message) => (
                                    <tr
                                        key={message.id}
                                        className="hover:bg-white/5 transition-colors duration-200"
                                    >
                                        <td className="px-6 py-4">
                                            <div>
                                                <p className="text-white font-medium">{message.name}</p>
                                                <p className="text-dark-400 text-sm">{message.email}</p>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <p className="text-white">{message.subject}</p>
                                        </td>
                                        <td className="px-6 py-4">
                                            <p className="text-dark-300 text-sm">
                                                {new Date(message.createdAt).toLocaleDateString()}
                                            </p>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span
                                                className={`inline-flex items-center space-x-1 px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(
                                                    message.status
                                                )}`}
                                            >
                                                {getStatusIcon(message.status)}
                                                <span>{message.status}</span>
                                            </span>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex items-center justify-end space-x-2">
                                                <button
                                                    onClick={() => handleViewMessage(message)}
                                                    className="p-2 hover:bg-white/10 rounded-lg transition-colors duration-300"
                                                    title="View message"
                                                >
                                                    <Eye className="w-5 h-5 text-blue-400" />
                                                </button>
                                                <button
                                                    onClick={() => confirmDelete(message)}
                                                    className="p-2 hover:bg-white/10 rounded-lg transition-colors duration-300"
                                                    title="Delete message"
                                                >
                                                    <Trash2 className="w-5 h-5 text-red-400" />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    {filteredMessages.length === 0 && (
                        <div className="text-center py-12">
                            <Mail className="w-12 h-12 text-dark-600 mx-auto mb-3" />
                            <p className="text-dark-400">No messages found</p>
                        </div>
                    )}
                </div>
            </div>

            {/* Message Detail Modal */}
            {showModal && selectedMessage && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.9 }}
                        className="glass-card p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto"
                    >
                        <div className="flex items-start justify-between mb-6">
                            <h3 className="text-2xl font-bold text-white">Message Details</h3>
                            <button
                                onClick={() => setShowModal(false)}
                                className="p-2 hover:bg-white/10 rounded-lg transition-colors duration-300"
                            >
                                <X className="w-6 h-6 text-white" />
                            </button>
                        </div>

                        <div className="space-y-4">
                            <div>
                                <label className="text-sm text-dark-400">From</label>
                                <p className="text-white font-medium">{selectedMessage.name}</p>
                                <a href={`mailto:${selectedMessage.email}`} className="text-primary-400 hover:text-primary-300 text-sm flex items-center gap-1 w-fit">
                                    <Mail className="w-3 h-3" />
                                    {selectedMessage.email}
                                </a>
                            </div>

                            <div>
                                <label className="text-sm text-dark-400">Subject</label>
                                <p className="text-white font-medium">{selectedMessage.subject}</p>
                            </div>

                            <div>
                                <label className="text-sm text-dark-400">Date</label>
                                <p className="text-white">
                                    {new Date(selectedMessage.createdAt).toLocaleString()}
                                </p>
                            </div>

                            <div>
                                <label className="text-sm text-dark-400">Status</label>
                                <div className="mt-1">
                                    <span
                                        className={`inline-flex items-center space-x-1 px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(
                                            selectedMessage.status
                                        )}`}
                                    >
                                        {getStatusIcon(selectedMessage.status)}
                                        <span>{selectedMessage.status}</span>
                                    </span>
                                </div>
                            </div>

                            <div>
                                <label className="text-sm text-dark-400">Message</label>
                                <div className="mt-2 p-4 bg-white/5 rounded-lg border border-white/5">
                                    <p className="text-white whitespace-pre-wrap">{selectedMessage.message}</p>
                                </div>
                            </div>
                        </div>

                        <div className="flex items-center justify-end space-x-3 mt-6 pt-6 border-t border-white/10">
                            <button
                                onClick={() => setShowModal(false)}
                                className="px-4 py-2 text-dark-200 hover:text-white transition-colors"
                            >
                                Close
                            </button>
                            <a
                                href={`mailto:${selectedMessage.email}?subject=Re: ${selectedMessage.subject}`}
                                className="btn-primary flex items-center space-x-2"
                            >
                                <Mail className="w-4 h-4" />
                                <span>Reply via Email</span>
                            </a>
                        </div>
                    </motion.div>
                </div>
            )}

            <ConfirmDialog
                isOpen={isDeleteDialogOpen}
                onClose={() => setIsDeleteDialogOpen(false)}
                onConfirm={handleDeleteMessage}
                title="Delete Message"
                message="Are you sure you want to delete this message? This action cannot be undone."
            />
        </AdminLayout>
    );
};

export default Messages;
