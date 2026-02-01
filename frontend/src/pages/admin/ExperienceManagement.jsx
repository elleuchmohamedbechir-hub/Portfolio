import { useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import { Plus, Edit2, Trash2, Briefcase, AlertCircle, RefreshCw } from 'lucide-react';
import AdminLayout from '../../components/admin/AdminLayout';
import Modal from '../../components/Modal';
import ConfirmDialog from '../../components/ConfirmDialog';
import { adminService } from '../../services';
import { useAuth } from '../../context/AuthContext';
import toast from 'react-hot-toast';
import Loading from '../../components/Loading';

const ExperienceManagement = () => {
    const { hasValidSession } = useAuth();
    const [experiences, setExperiences] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
    const [selectedExperience, setSelectedExperience] = useState(null);
    const [formData, setFormData] = useState({
        title: '',
        organization: '',
        period: '',
        description: '',
    });
    const [isSubmitting, setIsSubmitting] = useState(false);

    const fetchExperiences = useCallback(async () => {
        // Ensure we have a valid session before making API calls
        if (!hasValidSession()) {
            console.warn('[ExperienceManagement] No valid session, skipping fetch');
            setLoading(false);
            return;
        }

        try {
            setError(null);
            const response = await adminService.getExperiences();
            setExperiences(response.data);
        } catch (err) {
            console.error('[ExperienceManagement] Error fetching experiences:', err);

            // Don't show error toast for auth issues (handled globally)
            if (err.response?.status !== 401 && err.response?.status !== 403) {
                setError(err.userMessage || 'Failed to load experiences');
                toast.error(err.userMessage || 'Failed to load experiences');
            }
        } finally {
            setLoading(false);
        }
    }, [hasValidSession]);

    useEffect(() => {
        fetchExperiences();
    }, [fetchExperiences]);

    const handleOpenModal = (experience = null) => {
        if (experience) {
            setSelectedExperience(experience);
            setFormData({
                title: experience.title,
                organization: experience.organization,
                period: experience.period,
                description: experience.description,
            });
        } else {
            setSelectedExperience(null);
            setFormData({
                title: '',
                organization: '',
                period: '',
                description: '',
            });
        }
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setSelectedExperience(null);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);

        try {
            if (selectedExperience) {
                await adminService.updateExperience(selectedExperience.id, formData);
                toast.success('Experience updated successfully');
            } else {
                await adminService.createExperience(formData);
                toast.success('Experience created successfully');
            }
            fetchExperiences();
            handleCloseModal();
        } catch (err) {
            console.error('[ExperienceManagement] Error saving experience:', err);
            toast.error(err.userMessage || 'Failed to save experience');
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleDelete = async () => {
        setIsSubmitting(true);
        try {
            await adminService.deleteExperience(selectedExperience.id);
            toast.success('Experience deleted successfully');
            fetchExperiences();
            setIsDeleteDialogOpen(false);
            setSelectedExperience(null);
        } catch (err) {
            console.error('[ExperienceManagement] Error deleting experience:', err);
            toast.error(err.userMessage || 'Failed to delete experience');
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleRetry = () => {
        setLoading(true);
        setError(null);
        fetchExperiences();
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
                        <h2 className="text-3xl font-bold gradient-text mb-2">Experience Management</h2>
                        <p className="text-dark-300">Manage your work experience and roles</p>
                    </div>
                    <button
                        onClick={() => handleOpenModal()}
                        className="btn-primary flex items-center space-x-2"
                    >
                        <Plus className="w-5 h-5" />
                        <span>Add Experience</span>
                    </button>
                </div>

                {/* Experiences List */}
                <div className="space-y-4">
                    {experiences.map((experience, index) => (
                        <motion.div
                            key={experience.id}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.1 }}
                            className="glass-card p-6 hover-lift"
                        >
                            <div className="flex items-start justify-between">
                                <div className="flex items-start space-x-4 flex-1">
                                    <div className="p-3 bg-gradient-to-r from-primary-500/20 to-blue-500/20 rounded-lg flex-shrink-0">
                                        <Briefcase className="w-6 h-6 text-primary-400" />
                                    </div>
                                    <div className="flex-1">
                                        <h3 className="text-xl font-bold text-white mb-1">
                                            {experience.title}
                                        </h3>
                                        <p className="text-primary-400 font-medium mb-2">
                                            {experience.organization}
                                        </p>
                                        <p className="text-dark-400 text-sm mb-3">
                                            {experience.period}
                                        </p>
                                        <p className="text-dark-300">
                                            {experience.description}
                                        </p>
                                    </div>
                                </div>
                                <div className="flex items-center space-x-2 flex-shrink-0 ml-4">
                                    <button
                                        onClick={() => handleOpenModal(experience)}
                                        className="p-2 hover:bg-primary-500/20 text-primary-400 rounded-lg transition-colors duration-300"
                                    >
                                        <Edit2 className="w-4 h-4" />
                                    </button>
                                    <button
                                        onClick={() => {
                                            setSelectedExperience(experience);
                                            setIsDeleteDialogOpen(true);
                                        }}
                                        className="p-2 hover:bg-red-500/20 text-red-400 rounded-lg transition-colors duration-300"
                                    >
                                        <Trash2 className="w-4 h-4" />
                                    </button>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>

                {experiences.length === 0 && (
                    <div className="glass-card p-12 text-center">
                        <Briefcase className="w-16 h-16 text-dark-600 mx-auto mb-4" />
                        <p className="text-dark-400 mb-4">No experience added yet</p>
                        <button onClick={() => handleOpenModal()} className="btn-primary">
                            Add Your First Experience
                        </button>
                    </div>
                )}
            </div>

            {/* Add/Edit Modal */}
            <Modal
                isOpen={isModalOpen}
                onClose={handleCloseModal}
                title={selectedExperience ? 'Edit Experience' : 'Add New Experience'}
                size="lg"
            >
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label htmlFor="title" className="block text-sm font-medium text-dark-200 mb-2">
                                Job Title / Role *
                            </label>
                            <input
                                id="title"
                                type="text"
                                required
                                value={formData.title}
                                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                className="input-field"
                                placeholder="e.g., Senior Full-Stack Developer"
                            />
                        </div>

                        <div>
                            <label htmlFor="organization" className="block text-sm font-medium text-dark-200 mb-2">
                                Company / Organization *
                            </label>
                            <input
                                id="organization"
                                type="text"
                                required
                                value={formData.organization}
                                onChange={(e) => setFormData({ ...formData, organization: e.target.value })}
                                className="input-field"
                                placeholder="e.g., Tech Company Inc."
                            />
                        </div>
                    </div>

                    <div>
                        <label htmlFor="period" className="block text-sm font-medium text-dark-200 mb-2">
                            Period *
                        </label>
                        <input
                            id="period"
                            type="text"
                            required
                            value={formData.period}
                            onChange={(e) => setFormData({ ...formData, period: e.target.value })}
                            className="input-field"
                            placeholder="e.g., Jan 2020 - Present"
                        />
                    </div>

                    <div>
                        <label htmlFor="description" className="block text-sm font-medium text-dark-200 mb-2">
                            Description *
                        </label>
                        <textarea
                            id="description"
                            required
                            rows={5}
                            value={formData.description}
                            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                            className="input-field resize-none"
                            placeholder="Describe your responsibilities and achievements..."
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
                            ) : selectedExperience ? (
                                'Update Experience'
                            ) : (
                                'Add Experience'
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
                    setSelectedExperience(null);
                }}
                onConfirm={handleDelete}
                title="Delete Experience"
                message={`Are you sure you want to delete "${selectedExperience?.title}" at ${selectedExperience?.organization}? This action cannot be undone.`}
                isLoading={isSubmitting}
            />
        </AdminLayout>
    );
};

export default ExperienceManagement;
