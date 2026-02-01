import { useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import { Plus, Edit2, Trash2, GraduationCap, AlertCircle, RefreshCw } from 'lucide-react';
import AdminLayout from '../../components/admin/AdminLayout';
import Modal from '../../components/Modal';
import ConfirmDialog from '../../components/ConfirmDialog';
import { adminService } from '../../services';
import { useAuth } from '../../context/AuthContext';
import toast from 'react-hot-toast';
import Loading from '../../components/Loading';

const EducationManagement = () => {
    const { hasValidSession } = useAuth();
    const [education, setEducation] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
    const [selectedEducation, setSelectedEducation] = useState(null);
    const [formData, setFormData] = useState({
        degree: '',
        institution: '',
        year: '',
    });
    const [isSubmitting, setIsSubmitting] = useState(false);

    const fetchEducation = useCallback(async () => {
        if (!hasValidSession()) {
            console.warn('[EducationManagement] No valid session, skipping fetch');
            setLoading(false);
            return;
        }

        try {
            setError(null);
            const response = await adminService.getEducation();
            setEducation(response.data);
        } catch (err) {
            console.error('[EducationManagement] Error fetching education:', err);

            if (err.response?.status !== 401 && err.response?.status !== 403) {
                setError(err.userMessage || 'Failed to load education');
                toast.error(err.userMessage || 'Failed to load education');
            }
        } finally {
            setLoading(false);
        }
    }, [hasValidSession]);

    useEffect(() => {
        fetchEducation();
    }, [fetchEducation]);

    const handleRetry = () => {
        setLoading(true);
        setError(null);
        fetchEducation();
    };

    const handleOpenModal = (edu = null) => {
        if (edu) {
            setSelectedEducation(edu);
            setFormData({
                degree: edu.degree,
                institution: edu.institution,
                year: edu.year,
            });
        } else {
            setSelectedEducation(null);
            setFormData({
                degree: '',
                institution: '',
                year: '',
            });
        }
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setSelectedEducation(null);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);

        try {
            if (selectedEducation) {
                await adminService.updateEducation(selectedEducation.id, formData);
                toast.success('Education updated successfully');
            } else {
                await adminService.createEducation(formData);
                toast.success('Education created successfully');
            }
            fetchEducation();
            handleCloseModal();
        } catch (err) {
            console.error('[EducationManagement] Error saving education:', err);
            toast.error(err.userMessage || 'Failed to save education');
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleDelete = async () => {
        setIsSubmitting(true);
        try {
            await adminService.deleteEducation(selectedEducation.id);
            toast.success('Education deleted successfully');
            fetchEducation();
            setIsDeleteDialogOpen(false);
            setSelectedEducation(null);
        } catch (err) {
            console.error('[EducationManagement] Error deleting education:', err);
            toast.error(err.userMessage || 'Failed to delete education');
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
                        <h2 className="text-3xl font-bold gradient-text mb-2">Education Management</h2>
                        <p className="text-dark-300">Manage your educational background</p>
                    </div>
                    <button
                        onClick={() => handleOpenModal()}
                        className="btn-primary flex items-center space-x-2"
                    >
                        <Plus className="w-5 h-5" />
                        <span>Add Education</span>
                    </button>
                </div>

                {/* Education List */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {education.map((edu, index) => (
                        <motion.div
                            key={edu.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                            className="glass-card p-6 hover-lift"
                        >
                            <div className="flex items-start justify-between mb-4">
                                <div className="p-3 bg-gradient-to-r from-primary-500/20 to-blue-500/20 rounded-lg">
                                    <GraduationCap className="w-6 h-6 text-primary-400" />
                                </div>
                                <span className="badge">{edu.year}</span>
                            </div>
                            <h3 className="text-xl font-bold text-white mb-2">{edu.degree}</h3>
                            <p className="text-primary-400 mb-4">{edu.institution}</p>
                            <div className="flex items-center justify-end space-x-2 pt-4 border-t border-white/10">
                                <button
                                    onClick={() => handleOpenModal(edu)}
                                    className="p-2 hover:bg-primary-500/20 text-primary-400 rounded-lg transition-colors duration-300"
                                >
                                    <Edit2 className="w-4 h-4" />
                                </button>
                                <button
                                    onClick={() => {
                                        setSelectedEducation(edu);
                                        setIsDeleteDialogOpen(true);
                                    }}
                                    className="p-2 hover:bg-red-500/20 text-red-400 rounded-lg transition-colors duration-300"
                                >
                                    <Trash2 className="w-4 h-4" />
                                </button>
                            </div>
                        </motion.div>
                    ))}
                </div>

                {education.length === 0 && (
                    <div className="glass-card p-12 text-center">
                        <GraduationCap className="w-16 h-16 text-dark-600 mx-auto mb-4" />
                        <p className="text-dark-400 mb-4">No education added yet</p>
                        <button onClick={() => handleOpenModal()} className="btn-primary">
                            Add Your First Education
                        </button>
                    </div>
                )}
            </div>

            {/* Add/Edit Modal */}
            <Modal
                isOpen={isModalOpen}
                onClose={handleCloseModal}
                title={selectedEducation ? 'Edit Education' : 'Add New Education'}
                size="md"
            >
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label htmlFor="degree" className="block text-sm font-medium text-dark-200 mb-2">
                            Degree / Certification *
                        </label>
                        <input
                            id="degree"
                            type="text"
                            required
                            value={formData.degree}
                            onChange={(e) => setFormData({ ...formData, degree: e.target.value })}
                            className="input-field"
                            placeholder="e.g., Bachelor of Computer Science"
                        />
                    </div>

                    <div>
                        <label htmlFor="institution" className="block text-sm font-medium text-dark-200 mb-2">
                            Institution *
                        </label>
                        <input
                            id="institution"
                            type="text"
                            required
                            value={formData.institution}
                            onChange={(e) => setFormData({ ...formData, institution: e.target.value })}
                            className="input-field"
                            placeholder="e.g., University of Technology"
                        />
                    </div>

                    <div>
                        <label htmlFor="year" className="block text-sm font-medium text-dark-200 mb-2">
                            Year / Period *
                        </label>
                        <input
                            id="year"
                            type="text"
                            required
                            value={formData.year}
                            onChange={(e) => setFormData({ ...formData, year: e.target.value })}
                            className="input-field"
                            placeholder="e.g., 2018 - 2022"
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
                            ) : selectedEducation ? (
                                'Update Education'
                            ) : (
                                'Add Education'
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
                    setSelectedEducation(null);
                }}
                onConfirm={handleDelete}
                title="Delete Education"
                message={`Are you sure you want to delete "${selectedEducation?.degree}"? This action cannot be undone.`}
                isLoading={isSubmitting}
            />
        </AdminLayout>
    );
};

export default EducationManagement;
