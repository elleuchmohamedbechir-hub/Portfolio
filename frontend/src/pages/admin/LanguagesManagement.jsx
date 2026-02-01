import { useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import { Plus, Edit2, Trash2, Languages as LanguagesIcon, AlertCircle, RefreshCw } from 'lucide-react';
import AdminLayout from '../../components/admin/AdminLayout';
import Modal from '../../components/Modal';
import ConfirmDialog from '../../components/ConfirmDialog';
import { adminService } from '../../services';
import { useAuth } from '../../context/AuthContext';
import toast from 'react-hot-toast';
import Loading from '../../components/Loading';

const LanguagesManagement = () => {
    const { hasValidSession } = useAuth();
    const [languages, setLanguages] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
    const [selectedLanguage, setSelectedLanguage] = useState(null);
    const [formData, setFormData] = useState({
        name: '',
        level: 'B1',
    });
    const [isSubmitting, setIsSubmitting] = useState(false);

    const levels = [
        { value: 'A1', label: 'A1 - Beginner' },
        { value: 'A2', label: 'A2 - Elementary' },
        { value: 'B1', label: 'B1 - Intermediate' },
        { value: 'B2', label: 'B2 - Upper Intermediate' },
        { value: 'C1', label: 'C1 - Advanced' },
        { value: 'C2', label: 'C2 - Proficient' },
        { value: 'Native', label: 'Native Speaker' },
    ];

    const fetchLanguages = useCallback(async () => {
        if (!hasValidSession()) {
            console.warn('[LanguagesManagement] No valid session, skipping fetch');
            setLoading(false);
            return;
        }

        try {
            setError(null);
            const response = await adminService.getLanguages();
            setLanguages(response.data);
        } catch (err) {
            console.error('[LanguagesManagement] Error fetching languages:', err);

            if (err.response?.status !== 401 && err.response?.status !== 403) {
                setError(err.userMessage || 'Failed to load languages');
                toast.error(err.userMessage || 'Failed to load languages');
            }
        } finally {
            setLoading(false);
        }
    }, [hasValidSession]);

    useEffect(() => {
        fetchLanguages();
    }, [fetchLanguages]);

    const handleRetry = () => {
        setLoading(true);
        setError(null);
        fetchLanguages();
    };

    const handleOpenModal = (language = null) => {
        if (language) {
            setSelectedLanguage(language);
            setFormData({
                name: language.name,
                level: language.level,
            });
        } else {
            setSelectedLanguage(null);
            setFormData({
                name: '',
                level: 'B1',
            });
        }
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setSelectedLanguage(null);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);

        try {
            if (selectedLanguage) {
                await adminService.updateLanguage(selectedLanguage.id, formData);
                toast.success('Language updated successfully');
            } else {
                await adminService.createLanguage(formData);
                toast.success('Language created successfully');
            }
            fetchLanguages();
            handleCloseModal();
        } catch (err) {
            console.error('[LanguagesManagement] Error saving language:', err);
            toast.error(err.userMessage || 'Failed to save language');
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleDelete = async () => {
        setIsSubmitting(true);
        try {
            await adminService.deleteLanguage(selectedLanguage.id);
            toast.success('Language deleted successfully');
            fetchLanguages();
            setIsDeleteDialogOpen(false);
            setSelectedLanguage(null);
        } catch (err) {
            console.error('[LanguagesManagement] Error deleting language:', err);
            toast.error(err.userMessage || 'Failed to delete language');
        } finally {
            setIsSubmitting(false);
        }
    };

    const getLevelColor = (level) => {
        const colors = {
            'A1': 'text-red-400',
            'A2': 'text-orange-400',
            'B1': 'text-yellow-400',
            'B2': 'text-lime-400',
            'C1': 'text-green-400',
            'C2': 'text-emerald-400',
            'Native': 'text-primary-400',
        };
        return colors[level] || 'text-dark-400';
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
                        <h2 className="text-3xl font-bold gradient-text mb-2">Languages Management</h2>
                        <p className="text-dark-300">Manage your language proficiency levels</p>
                    </div>
                    <button
                        onClick={() => handleOpenModal()}
                        className="btn-primary flex items-center space-x-2"
                    >
                        <Plus className="w-5 h-5" />
                        <span>Add Language</span>
                    </button>
                </div>

                {/* Languages Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {languages.map((language, index) => (
                        <motion.div
                            key={language.id}
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: index * 0.05 }}
                            className="glass-card p-6 hover-lift"
                        >
                            <div className="flex items-start justify-between mb-4">
                                <div className="p-3 bg-gradient-to-r from-primary-500/20 to-blue-500/20 rounded-lg">
                                    <LanguagesIcon className="w-6 h-6 text-primary-400" />
                                </div>
                                <span className={`badge ${getLevelColor(language.level)}`}>
                                    {language.level}
                                </span>
                            </div>
                            <h3 className="text-xl font-bold text-white mb-4">{language.name}</h3>
                            <div className="flex items-center justify-end space-x-2 pt-4 border-t border-white/10">
                                <button
                                    onClick={() => handleOpenModal(language)}
                                    className="p-2 hover:bg-primary-500/20 text-primary-400 rounded-lg transition-colors duration-300"
                                >
                                    <Edit2 className="w-4 h-4" />
                                </button>
                                <button
                                    onClick={() => {
                                        setSelectedLanguage(language);
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

                {languages.length === 0 && (
                    <div className="glass-card p-12 text-center">
                        <LanguagesIcon className="w-16 h-16 text-dark-600 mx-auto mb-4" />
                        <p className="text-dark-400 mb-4">No languages added yet</p>
                        <button onClick={() => handleOpenModal()} className="btn-primary">
                            Add Your First Language
                        </button>
                    </div>
                )}
            </div>

            {/* Add/Edit Modal */}
            <Modal
                isOpen={isModalOpen}
                onClose={handleCloseModal}
                title={selectedLanguage ? 'Edit Language' : 'Add New Language'}
                size="md"
            >
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label htmlFor="name" className="block text-sm font-medium text-dark-200 mb-2">
                            Language *
                        </label>
                        <input
                            id="name"
                            type="text"
                            required
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                            className="input-field"
                            placeholder="e.g., English, French, Spanish"
                        />
                    </div>

                    <div>
                        <label htmlFor="level" className="block text-sm font-medium text-dark-200 mb-2">
                            Proficiency Level *
                        </label>
                        <select
                            id="level"
                            required
                            value={formData.level}
                            onChange={(e) => setFormData({ ...formData, level: e.target.value })}
                            className="input-field"
                        >
                            {levels.map((level) => (
                                <option key={level.value} value={level.value}>
                                    {level.label}
                                </option>
                            ))}
                        </select>
                        <p className="text-xs text-dark-400 mt-2">
                            CEFR levels: A1-A2 (Basic), B1-B2 (Independent), C1-C2 (Proficient)
                        </p>
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
                            ) : selectedLanguage ? (
                                'Update Language'
                            ) : (
                                'Add Language'
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
                    setSelectedLanguage(null);
                }}
                onConfirm={handleDelete}
                title="Delete Language"
                message={`Are you sure you want to delete "${selectedLanguage?.name}"? This action cannot be undone.`}
                isLoading={isSubmitting}
            />
        </AdminLayout>
    );
};

export default LanguagesManagement;
