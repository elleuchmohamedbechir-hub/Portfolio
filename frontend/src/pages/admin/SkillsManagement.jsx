import { useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import { Plus, Edit2, Trash2, Lightbulb, Image as ImageIcon, AlertCircle, RefreshCw } from 'lucide-react';
import AdminLayout from '../../components/admin/AdminLayout';
import Modal from '../../components/Modal';
import ConfirmDialog from '../../components/ConfirmDialog';
import { adminService } from '../../services';
import { useAuth } from '../../context/AuthContext';
import toast from 'react-hot-toast';
import Loading from '../../components/Loading';

const SkillsManagement = () => {
    const { hasValidSession } = useAuth();
    const [skills, setSkills] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
    const [selectedSkill, setSelectedSkill] = useState(null);
    const [formData, setFormData] = useState({
        name: '',
        category: '',
        imageUrl: ''
    });
    const [isSubmitting, setIsSubmitting] = useState(false);

    const categories = [
        'Frontend',
        'Backend',
        'Languages',
        'Databases',
        'Methodologies',
        'Tools'
    ];

    const fetchSkills = useCallback(async () => {
        if (!hasValidSession()) {
            console.warn('[SkillsManagement] No valid session, skipping fetch');
            setLoading(false);
            return;
        }

        try {
            setError(null);
            const response = await adminService.getSkills();
            setSkills(response.data || []);
        } catch (err) {
            console.error('[SkillsManagement] Error fetching skills:', err);

            if (err.response?.status !== 401 && err.response?.status !== 403) {
                setError(err.userMessage || 'Failed to load skills');
                toast.error(err.userMessage || 'Failed to load skills');
            }
        } finally {
            setLoading(false);
        }
    }, [hasValidSession]);

    useEffect(() => {
        fetchSkills();
    }, [fetchSkills]);

    const handleRetry = () => {
        setLoading(true);
        setError(null);
        fetchSkills();
    };

    const handleOpenModal = (skill = null) => {
        if (skill) {
            setSelectedSkill(skill);
            setFormData({
                name: skill.name,
                category: skill.category,
                imageUrl: skill.imageUrl || ''
            });
        } else {
            setSelectedSkill(null);
            setFormData({
                name: '',
                category: '',
                imageUrl: ''
            });
        }
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setSelectedSkill(null);
        setFormData({ name: '', category: '', imageUrl: '' });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);

        try {
            if (selectedSkill) {
                await adminService.updateSkill(selectedSkill.id, formData);
                toast.success('Skill updated successfully');
            } else {
                await adminService.createSkill(formData);
                toast.success('Skill created successfully');
            }
            fetchSkills();
            handleCloseModal();
        } catch (error) {
            console.error('Error saving skill:', error);
            toast.error('Failed to save skill');
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleDelete = async () => {
        setIsSubmitting(true);
        try {
            await adminService.deleteSkill(selectedSkill.id);
            toast.success('Skill deleted successfully');
            fetchSkills();
            setIsDeleteDialogOpen(false);
            setSelectedSkill(null);
        } catch (error) {
            console.error('Error deleting skill:', error);
            toast.error('Failed to delete skill');
        } finally {
            setIsSubmitting(false);
        }
    };

    const groupedSkills = skills.reduce((acc, skill) => {
        const category = skill.category || 'Other';
        if (!acc[category]) acc[category] = [];
        acc[category].push(skill);
        return acc;
    }, {});

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
                        <h2 className="text-3xl font-bold gradient-text mb-2">Skills Management</h2>
                        <p className="text-dark-300">Manage your technical skills and expertise</p>
                    </div>
                    <button
                        onClick={() => handleOpenModal()}
                        className="btn-primary flex items-center space-x-2"
                    >
                        <Plus className="w-5 h-5" />
                        <span>Add Skill</span>
                    </button>
                </div>

                {/* Skills Grid by Category */}
                <div className="space-y-6">
                    {Object.entries(groupedSkills).map(([category, categorySkills]) => (
                        <motion.div
                            key={category}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="glass-card p-6"
                        >
                            <h3 className="text-xl font-bold text-white mb-4 flex items-center space-x-2">
                                <Lightbulb className="w-5 h-5 text-primary-400" />
                                <span>{category}</span>
                                <span className="text-sm text-dark-400">({categorySkills.length})</span>
                            </h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                {categorySkills.map((skill) => (
                                    <div
                                        key={skill.id}
                                        className="flex items-center justify-between p-4 bg-white/5 rounded-lg hover:bg-white/10 transition-colors duration-300 group"
                                    >
                                        <div className="flex items-center space-x-3 flex-1">
                                            {skill.imageUrl ? (
                                                <img
                                                    src={skill.imageUrl}
                                                    alt={skill.name}
                                                    className="w-8 h-8 object-contain rounded"
                                                    onError={(e) => {
                                                        e.target.style.display = 'none';
                                                    }}
                                                />
                                            ) : (
                                                <div className="w-8 h-8 bg-primary-500/20 rounded flex items-center justify-center">
                                                    <Lightbulb className="w-4 h-4 text-primary-400" />
                                                </div>
                                            )}
                                            <span className="text-white font-medium">{skill.name}</span>
                                        </div>
                                        <div className="flex items-center space-x-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                            <button
                                                onClick={() => handleOpenModal(skill)}
                                                className="p-2 hover:bg-primary-500/20 text-primary-400 rounded-lg transition-colors duration-300"
                                            >
                                                <Edit2 className="w-4 h-4" />
                                            </button>
                                            <button
                                                onClick={() => {
                                                    setSelectedSkill(skill);
                                                    setIsDeleteDialogOpen(true);
                                                }}
                                                className="p-2 hover:bg-red-500/20 text-red-400 rounded-lg transition-colors duration-300"
                                            >
                                                <Trash2 className="w-4 h-4" />
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </motion.div>
                    ))}
                </div>

                {skills.length === 0 && (
                    <div className="glass-card p-12 text-center">
                        <Lightbulb className="w-16 h-16 text-dark-600 mx-auto mb-4" />
                        <p className="text-dark-400 mb-4">No skills added yet</p>
                        <button onClick={() => handleOpenModal()} className="btn-primary">
                            Add Your First Skill
                        </button>
                    </div>
                )}
            </div>

            {/* Add/Edit Modal */}
            <Modal
                isOpen={isModalOpen}
                onClose={handleCloseModal}
                title={selectedSkill ? 'Edit Skill' : 'Add New Skill'}
                size="md"
            >
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label htmlFor="name" className="block text-sm font-medium text-dark-200 mb-2">
                            Skill Name *
                        </label>
                        <input
                            id="name"
                            type="text"
                            required
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                            className="input-field"
                            placeholder="e.g., React, Node.js, Docker"
                        />
                    </div>

                    <div>
                        <label htmlFor="category" className="block text-sm font-medium text-dark-200 mb-2">
                            Category *
                        </label>
                        <select
                            id="category"
                            required
                            value={formData.category}
                            onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                            className="input-field bg-slate-800 text-white border-slate-600 focus:border-primary-500"
                        >
                            <option value="" className="bg-slate-800">Select a category</option>
                            {categories.map((cat) => (
                                <option key={cat} value={cat} className="bg-slate-800">
                                    {cat}
                                </option>
                            ))}
                        </select>
                        <p className="text-xs text-dark-400 mt-1">
                            Choose the most appropriate category for this skill
                        </p>
                    </div>

                    <div>
                        <label htmlFor="imageUrl" className="block text-sm font-medium text-dark-200 mb-2 flex items-center space-x-2">
                            <ImageIcon className="w-4 h-4" />
                            <span>Skill Icon / Logo URL (Optional)</span>
                        </label>
                        <input
                            id="imageUrl"
                            type="url"
                            value={formData.imageUrl}
                            onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value })}
                            className="input-field"
                            placeholder="https://example.com/icon.png"
                        />
                        <p className="text-xs text-dark-400 mt-1">
                            Add a logo or icon to make your skill stand out (recommended: 64x64px)
                        </p>
                        {formData.imageUrl && (
                            <div className="mt-3 p-3 bg-white/5 rounded-lg flex items-center space-x-3">
                                <span className="text-xs text-dark-400">Preview:</span>
                                <img
                                    src={formData.imageUrl}
                                    alt="Preview"
                                    className="w-10 h-10 object-contain rounded border border-white/10"
                                    onError={(e) => {
                                        e.target.src = '';
                                        e.target.alt = 'Invalid image URL';
                                        e.target.className = 'text-xs text-red-400';
                                    }}
                                />
                            </div>
                        )}
                    </div>

                    <div className="flex items-center justify-end space-x-3 pt-4">
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
                            ) : selectedSkill ? (
                                'Update Skill'
                            ) : (
                                'Add Skill'
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
                    setSelectedSkill(null);
                }}
                onConfirm={handleDelete}
                title="Delete Skill"
                message={`Are you sure you want to delete "${selectedSkill?.name}"? This action cannot be undone.`}
                isLoading={isSubmitting}
            />
        </AdminLayout>
    );
};

export default SkillsManagement;
