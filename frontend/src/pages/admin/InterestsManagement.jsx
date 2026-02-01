import { useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import { Plus, Edit2, Trash2, Heart, AlertCircle, RefreshCw } from 'lucide-react';
import AdminLayout from '../../components/admin/AdminLayout';
import Modal from '../../components/Modal';
import ConfirmDialog from '../../components/ConfirmDialog';
import { adminService } from '../../services';
import { useAuth } from '../../context/AuthContext';
import toast from 'react-hot-toast';
import Loading from '../../components/Loading';

const InterestsManagement = () => {
    const { hasValidSession } = useAuth();
    const [interests, setInterests] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
    const [selectedInterest, setSelectedInterest] = useState(null);
    const [formData, setFormData] = useState({ name: '' });
    const [isSubmitting, setIsSubmitting] = useState(false);

    const fetchInterests = useCallback(async () => {
        if (!hasValidSession()) {
            console.warn('[InterestsManagement] No valid session, skipping fetch');
            setLoading(false);
            return;
        }

        try {
            setError(null);
            const response = await adminService.getInterests();
            setInterests(response.data);
        } catch (err) {
            console.error('[InterestsManagement] Error fetching interests:', err);

            if (err.response?.status !== 401 && err.response?.status !== 403) {
                setError(err.userMessage || 'Failed to load interests');
                toast.error(err.userMessage || 'Failed to load interests');
            }
        } finally {
            setLoading(false);
        }
    }, [hasValidSession]);

    useEffect(() => {
        fetchInterests();
    }, [fetchInterests]);

    const handleRetry = () => {
        setLoading(true);
        setError(null);
        fetchInterests();
    };

    const handleOpenModal = (interest = null) => {
        if (interest) {
            setSelectedInterest(interest);
            setFormData({ name: interest.name });
        } else {
            setSelectedInterest(null);
            setFormData({ name: '' });
        }
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setSelectedInterest(null);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);

        try {
            if (selectedInterest) {
                await adminService.updateInterest(selectedInterest.id, formData);
                toast.success('Interest updated successfully');
            } else {
                await adminService.createInterest(formData);
                toast.success('Interest created successfully');
            }
            fetchInterests();
            handleCloseModal();
        } catch (err) {
            console.error('[InterestsManagement] Error saving interest:', err);
            toast.error(err.userMessage || 'Failed to save interest');
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleDelete = async () => {
        setIsSubmitting(true);
        try {
            await adminService.deleteInterest(selectedInterest.id);
            toast.success('Interest deleted successfully');
            fetchInterests();
            setIsDeleteDialogOpen(false);
            setSelectedInterest(null);
        } catch (err) {
            console.error('[InterestsManagement] Error deleting interest:', err);
            toast.error(err.userMessage || 'Failed to delete interest');
        } finally {
            setIsSubmitting(false);
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
                <div className="flex items-center justify-between">
                    <div>
                        <h2 className="text-3xl font-bold gradient-text mb-2">Interests Management</h2>
                        <p className="text-dark-300">Manage your personal interests and hobbies</p>
                    </div>
                    <button
                        onClick={() => handleOpenModal()}
                        className="btn-primary flex items-center space-x-2"
                    >
                        <Plus className="w-5 h-5" />
                        <span>Add Interest</span>
                    </button>
                </div>

                {/* Interests Grid */}
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
                    {interests.map((interest, index) => (
                        <motion.div
                            key={interest.id}
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: index * 0.03 }}
                            className="glass-card p-4 hover-lift group relative"
                        >
                            <div className="flex flex-col items-center text-center space-y-3">
                                <div className="p-3 bg-gradient-to-r from-primary-500/20 to-blue-500/20 rounded-full group-hover:scale-110 transition-transform duration-300">
                                    <Heart className="w-5 h-5 text-primary-400" />
                                </div>
                                <h3 className="text-sm font-medium text-white">{interest.name}</h3>
                            </div>

                            {/* Action buttons - shown on hover */}
                            <div className="absolute top-2 right-2 flex items-center space-x-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                <button
                                    onClick={() => handleOpenModal(interest)}
                                    className="p-1.5 hover:bg-primary-500/20 text-primary-400 rounded-lg transition-colors duration-300"
                                >
                                    <Edit2 className="w-3.5 h-3.5" />
                                </button>
                                <button
                                    onClick={() => {
                                        setSelectedInterest(interest);
                                        setIsDeleteDialogOpen(true);
                                    }}
                                    className="p-1.5 hover:bg-red-500/20 text-red-400 rounded-lg transition-colors duration-300"
                                >
                                    <Trash2 className="w-3.5 h-3.5" />
                                </button>
                            </div>
                        </motion.div>
                    ))}
                </div>

                {interests.length === 0 && (
                    <div className="glass-card p-12 text-center">
                        <Heart className="w-16 h-16 text-dark-600 mx-auto mb-4" />
                        <p className="text-dark-400 mb-4">No interests added yet</p>
                        <button onClick={() => handleOpenModal()} className="btn-primary">
                            Add Your First Interest
                        </button>
                    </div>
                )}
            </div>

            {/* Add/Edit Modal */}
            <Modal
                isOpen={isModalOpen}
                onClose={handleCloseModal}
                title={selectedInterest ? 'Edit Interest' : 'Add New Interest'}
                size="sm"
            >
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label htmlFor="name" className="block text-sm font-medium text-dark-200 mb-2">
                            Interest / Hobby *
                        </label>
                        <input
                            id="name"
                            type="text"
                            required
                            value={formData.name}
                            onChange={(e) => setFormData({ name: e.target.value })}
                            className="input-field"
                            placeholder="e.g., Photography, Gaming, Travel"
                            autoFocus
                        />
                    </div>

                    <div className="flex items-center justify-end space-x-3 pt-4 border-t border-white/10">
                        <button
                            type="button"
                            onClick={handleCloseModal}
                            disabled={isSubmitting}
                            className="px-6 py-2 text-dark-200 hover:text-white transition-colors duration-300 disabled:opacity-50"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {isSubmitting ? (
                                <div className="flex items-center space-x-2">
                                    <div className="spinner" />
                                    <span>Saving...</span>
                                </div>
                            ) : selectedInterest ? (
                                'Update Interest'
                            ) : (
                                'Add Interest'
                            )}
                        </button>
                    </div>
                </form>
            </Modal>

            {/* Delete Confirmation Dialog */}
            <ConfirmDialog
                isOpen={isDeleteDialogOpen}
                onClose={() => {
                    setIsDeleteDialogOpen(false);
                    setSelectedInterest(null);
                }}
                onConfirm={handleDelete}
                title="Delete Interest"
                message={`Are you sure you want to delete "${selectedInterest?.name}"? This action cannot be undone.`}
                isLoading={isSubmitting}
            />
        </AdminLayout>
    );
};

export default InterestsManagement;
