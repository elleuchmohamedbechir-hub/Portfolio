import { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';
import { Plus, Edit2, Trash2, FolderKanban, ExternalLink, Github, AlertCircle, RefreshCw } from 'lucide-react';
import AdminLayout from '../../components/admin/AdminLayout';
import Modal from '../../components/Modal';
import ConfirmDialog from '../../components/ConfirmDialog';
import { adminService } from '../../services';
import { useAuth } from '../../context/AuthContext';
import toast from 'react-hot-toast';
import Loading from '../../components/Loading';

const ProjectsManagement = () => {
    const { hasValidSession } = useAuth();
    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
    const [selectedProject, setSelectedProject] = useState(null);
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        technologies: '',
        year: new Date().getFullYear().toString(),
        githubUrl: '',
        liveUrl: '',
        imageUrl: '',
    });
    const [isSubmitting, setIsSubmitting] = useState(false);

    const fetchProjects = useCallback(async (signal) => {
        if (!hasValidSession()) {
            console.warn('[ProjectsManagement] No valid session, skipping fetch');
            setLoading(false);
            return;
        }

        try {
            setError(null);
            // Pass signal for cancellation
            const response = await adminService.getProjects({ signal });
            // Safe fallback for null/undefined data
            setProjects(Array.isArray(response.data) ? response.data : []);
        } catch (err) {
            // Squelch cancellation errors
            if (axios.isCancel(err)) return;

            console.error('[ProjectsManagement] Error fetching projects:', err);

            if (err.response?.status !== 401 && err.response?.status !== 403) {
                setError(err.userMessage || 'Failed to load projects');
                toast.error(err.userMessage || 'Failed to load projects');
            }
        } finally {
            // Only update state if not aborted (though isCancel check usually covers this)
            if (!signal?.aborted) {
                setLoading(false);
            }
        }
    }, [hasValidSession]);

    useEffect(() => {
        const controller = new AbortController();
        fetchProjects(controller.signal);

        // Cleanup function cancels the request on unmount/re-run
        return () => controller.abort();
    }, [fetchProjects]);

    const handleRetry = () => {
        setLoading(true);
        setError(null);
        fetchProjects();
    };

    const handleOpenModal = (project = null) => {
        if (project) {
            setSelectedProject(project);
            setFormData({
                title: project.title,
                description: project.description,
                technologies: Array.isArray(project.technologies)
                    ? project.technologies.join(', ')
                    : project.technologies || '',
                year: project.year,
                githubUrl: project.githubUrl || '',
                liveUrl: project.liveUrl || '',
                imageUrl: project.imageUrl || '',
            });
        } else {
            setSelectedProject(null);
            setFormData({
                title: '',
                description: '',
                technologies: '',
                year: new Date().getFullYear().toString(),
                githubUrl: '',
                liveUrl: '',
                imageUrl: '',
            });
        }
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setSelectedProject(null);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);

        try {
            const projectData = {
                ...formData,
                technologies: formData.technologies
                    .split(',')
                    .map(tech => tech.trim())
                    .filter(tech => tech.length > 0),
            };

            if (selectedProject) {
                await adminService.updateProject(selectedProject.id, projectData);
                toast.success('Project updated successfully');
            } else {
                await adminService.createProject(projectData);
                toast.success('Project created successfully');
            }
            fetchProjects();
            handleCloseModal();
        } catch (err) {
            console.error('[ProjectsManagement] Error saving project:', err);
            toast.error(err.userMessage || 'Failed to save project');
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleDelete = async () => {
        setIsSubmitting(true);
        try {
            await adminService.deleteProject(selectedProject.id);
            toast.success('Project deleted successfully');
            fetchProjects();
            setIsDeleteDialogOpen(false);
            setSelectedProject(null);
        } catch (err) {
            console.error('[ProjectsManagement] Error deleting project:', err);
            toast.error(err.userMessage || 'Failed to delete project');
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
                        <h2 className="text-3xl font-bold gradient-text mb-2">Projects Management</h2>
                        <p className="text-dark-300">Manage your portfolio projects</p>
                    </div>
                    <button
                        onClick={() => handleOpenModal()}
                        className="btn-primary flex items-center space-x-2"
                    >
                        <Plus className="w-5 h-5" />
                        <span>Add Project</span>
                    </button>
                </div>

                {/* Projects Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {projects.map((project, index) => (
                        <motion.div
                            key={project.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                            className="glass-card p-6 hover-lift group"
                        >
                            {/* Project Header */}
                            <div className="flex items-start justify-between mb-4">
                                <div className="p-3 bg-gradient-to-r from-primary-500/20 to-blue-500/20 rounded-lg">
                                    <FolderKanban className="w-6 h-6 text-primary-400" />
                                </div>
                                <span className="badge">{project.year}</span>
                            </div>

                            {/* Project Title */}
                            <h3 className="text-xl font-bold text-white mb-3 group-hover:text-primary-400 transition-colors duration-300">
                                {project.title}
                            </h3>

                            {/* Project Description */}
                            <p className="text-dark-300 mb-4 line-clamp-3">
                                {project.description}
                            </p>

                            {/* Technologies */}
                            <div className="flex flex-wrap gap-2 mb-6">
                                {project.technologies?.map((tech, i) => (
                                    <span
                                        key={i}
                                        className="px-3 py-1 bg-white/5 border border-white/10 rounded-full text-xs text-dark-200"
                                    >
                                        {tech}
                                    </span>
                                ))}
                            </div>

                            {/* Links */}
                            <div className="flex items-center justify-between pt-4 border-t border-white/10">
                                <div className="flex items-center space-x-2">
                                    {project.githubUrl && (
                                        <a
                                            href={project.githubUrl}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="p-2 hover:bg-white/10 text-dark-300 hover:text-primary-400 rounded-lg transition-colors duration-300"
                                            onClick={(e) => e.stopPropagation()}
                                        >
                                            <Github className="w-4 h-4" />
                                        </a>
                                    )}
                                    {project.liveUrl && (
                                        <a
                                            href={project.liveUrl}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="p-2 hover:bg-white/10 text-dark-300 hover:text-primary-400 rounded-lg transition-colors duration-300"
                                            onClick={(e) => e.stopPropagation()}
                                        >
                                            <ExternalLink className="w-4 h-4" />
                                        </a>
                                    )}
                                </div>
                                <div className="flex items-center space-x-2">
                                    <button
                                        onClick={() => handleOpenModal(project)}
                                        className="p-2 hover:bg-primary-500/20 text-primary-400 rounded-lg transition-colors duration-300"
                                    >
                                        <Edit2 className="w-4 h-4" />
                                    </button>
                                    <button
                                        onClick={() => {
                                            setSelectedProject(project);
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

                {projects.length === 0 && (
                    <div className="glass-card p-12 text-center">
                        <FolderKanban className="w-16 h-16 text-dark-600 mx-auto mb-4" />
                        <p className="text-dark-400 mb-4">No projects added yet</p>
                        <button onClick={() => handleOpenModal()} className="btn-primary">
                            Add Your First Project
                        </button>
                    </div>
                )}
            </div>

            {/* Add/Edit Modal */}
            <Modal
                isOpen={isModalOpen}
                onClose={handleCloseModal}
                title={selectedProject ? 'Edit Project' : 'Add New Project'}
                size="lg"
            >
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label htmlFor="title" className="block text-sm font-medium text-dark-200 mb-2">
                                Project Title *
                            </label>
                            <input
                                id="title"
                                type="text"
                                required
                                value={formData.title}
                                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                className="input-field"
                                placeholder="e.g., E-Commerce Platform"
                            />
                        </div>

                        <div>
                            <label htmlFor="year" className="block text-sm font-medium text-dark-200 mb-2">
                                Year *
                            </label>
                            <input
                                id="year"
                                type="text"
                                required
                                value={formData.year}
                                onChange={(e) => setFormData({ ...formData, year: e.target.value })}
                                className="input-field"
                                placeholder="2024"
                            />
                        </div>
                    </div>

                    <div>
                        <label htmlFor="description" className="block text-sm font-medium text-dark-200 mb-2">
                            Description *
                        </label>
                        <textarea
                            id="description"
                            required
                            rows={4}
                            value={formData.description}
                            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                            className="input-field resize-none"
                            placeholder="Describe your project..."
                        />
                    </div>

                    <div>
                        <label htmlFor="technologies" className="block text-sm font-medium text-dark-200 mb-2">
                            Technologies * <span className="text-dark-400 text-xs">(comma-separated)</span>
                        </label>
                        <input
                            id="technologies"
                            type="text"
                            required
                            value={formData.technologies}
                            onChange={(e) => setFormData({ ...formData, technologies: e.target.value })}
                            className="input-field"
                            placeholder="React, Node.js, MongoDB, Docker"
                        />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label htmlFor="githubUrl" className="block text-sm font-medium text-dark-200 mb-2">
                                GitHub URL
                            </label>
                            <input
                                id="githubUrl"
                                type="url"
                                value={formData.githubUrl}
                                onChange={(e) => setFormData({ ...formData, githubUrl: e.target.value })}
                                className="input-field"
                                placeholder="https://github.com/username/repo"
                            />
                        </div>

                        <div>
                            <label htmlFor="liveUrl" className="block text-sm font-medium text-dark-200 mb-2">
                                Live Demo URL
                            </label>
                            <input
                                id="liveUrl"
                                type="url"
                                value={formData.liveUrl}
                                onChange={(e) => setFormData({ ...formData, liveUrl: e.target.value })}
                                className="input-field"
                                placeholder="https://example.com"
                            />
                        </div>
                    </div>

                    <div>
                        <label htmlFor="imageUrl" className="block text-sm font-medium text-dark-200 mb-2">
                            Project Image URL
                        </label>
                        <input
                            id="imageUrl"
                            type="url"
                            value={formData.imageUrl}
                            onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value })}
                            className="input-field"
                            placeholder="https://example.com/image.jpg"
                        />
                        {formData.imageUrl && (
                            <div className="mt-2 relative aspect-video rounded-lg overflow-hidden border border-white/10">
                                <img
                                    src={formData.imageUrl}
                                    alt="Preview"
                                    className="w-full h-full object-cover"
                                    onError={(e) => e.target.src = 'https://via.placeholder.com/400x225?text=Invalid+Image+URL'}
                                />
                            </div>
                        )}
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
                            ) : selectedProject ? (
                                'Update Project'
                            ) : (
                                'Add Project'
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
                    setSelectedProject(null);
                }}
                onConfirm={handleDelete}
                title="Delete Project"
                message={`Are you sure you want to delete "${selectedProject?.title}"? This action cannot be undone.`}
                isLoading={isSubmitting}
            />
        </AdminLayout>
    );
};

export default ProjectsManagement;
