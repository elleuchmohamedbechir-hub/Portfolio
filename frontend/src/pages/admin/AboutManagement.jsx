import { useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import { User, Save, Linkedin, Github, AlertCircle, RefreshCw } from 'lucide-react';
import AdminLayout from '../../components/admin/AdminLayout';
import { adminService } from '../../services';
import { useAuth } from '../../context/AuthContext';
import toast from 'react-hot-toast';
import Loading from '../../components/Loading';

const AboutManagement = () => {
    const { hasValidSession } = useAuth();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        title: '',
        description: '',
        linkedinUrl: '',
        githubUrl: '',
        profileImageUrl: '',
        email: '',
        // Preserve these fields to prevent data loss on update
        phone: '',
        location: '',
        twitterUrl: '',
        resumeUrl: ''
    });
    const [errors, setErrors] = useState({});

    const fetchAbout = useCallback(async () => {
        if (!hasValidSession()) {
            console.warn('[AboutManagement] No valid session, skipping fetch');
            setLoading(false);
            return;
        }

        try {
            setError(null);
            const response = await adminService.getAbout();
            if (response.data) {
                setFormData({
                    name: response.data.name || '',
                    title: response.data.title || '',
                    description: response.data.description || '',
                    linkedinUrl: response.data.linkedinUrl || '',
                    githubUrl: response.data.githubUrl || '',
                    profileImageUrl: response.data.profileImageUrl || '',
                    email: response.data.email || '',
                    phone: response.data.phone || '',
                    location: response.data.location || '',
                    twitterUrl: response.data.twitterUrl || '',
                    resumeUrl: response.data.resumeUrl || ''
                });
            }
        } catch (err) {
            console.error('[AboutManagement] Error fetching about:', err);

            if (err.response?.status === 404) {
                // Not found is fine, we just start with empty form
                return;
            }

            if (err.response?.status !== 401 && err.response?.status !== 403) {
                setError(err.userMessage || 'Failed to load about section');
                toast.error(err.userMessage || 'Failed to load about section');
            }
        } finally {
            setLoading(false);
        }
    }, [hasValidSession]);

    useEffect(() => {
        fetchAbout();
    }, [fetchAbout]);

    const handleRetry = () => {
        setLoading(true);
        setError(null);
        fetchAbout();
    };

    const validateForm = () => {
        const newErrors = {};

        if (!formData.name.trim()) {
            newErrors.name = 'Name is required';
        }
        if (!formData.title.trim()) {
            newErrors.title = 'Professional title is required';
        }
        if (!formData.description.trim()) {
            newErrors.description = 'Description is required';
        }
        if (formData.email && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(formData.email)) {
            newErrors.email = 'Please enter a valid email address';
        }

        // URL validation
        const urlPattern = /^https?:\/\/.+/i;
        if (formData.linkedinUrl && !urlPattern.test(formData.linkedinUrl)) {
            newErrors.linkedinUrl = 'Please enter a valid URL (starting with http:// or https://)';
        }
        if (formData.githubUrl && !urlPattern.test(formData.githubUrl)) {
            newErrors.githubUrl = 'Please enter a valid URL (starting with http:// or https://)';
        }
        if (formData.profileImageUrl && !urlPattern.test(formData.profileImageUrl)) {
            newErrors.profileImageUrl = 'Please enter a valid URL (starting with http:// or https://)';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validateForm()) {
            toast.error('Please fix the errors in the form');
            return;
        }

        setIsSubmitting(true);

        try {
            await adminService.updateAbout(formData);
            toast.success('About section updated successfully');
            setErrors({});
            // Refresh data to ensure consistency
            fetchAbout();
        } catch (err) {
            console.error('[AboutManagement] Error saving about:', err);
            toast.error(err.userMessage || 'Failed to save about section');
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleChange = (field, value) => {
        setFormData({ ...formData, [field]: value });
        // Clear error for this field when user starts typing
        if (errors[field]) {
            setErrors({ ...errors, [field]: '' });
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
                <div>
                    <h2 className="text-3xl font-bold gradient-text mb-2">About Section Management</h2>
                    <p className="text-dark-300">Manage your personal information and professional profile</p>
                </div>

                {/* Form */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="glass-card p-8"
                >
                    <form onSubmit={handleSubmit} className="space-y-6">
                        {/* Preview Section */}
                        {(formData.name || formData.profileImageUrl) && (
                            <div className="p-6 bg-white/5 border border-white/10 rounded-xl mb-6">
                                <h3 className="text-sm font-medium text-dark-400 mb-4 flex items-center space-x-2">
                                    <User className="w-4 h-4" />
                                    <span>Preview</span>
                                </h3>
                                <div className="flex flex-col md:flex-row gap-6">
                                    {formData.profileImageUrl && (
                                        <div className="flex-shrink-0">
                                            <img
                                                src={formData.profileImageUrl}
                                                alt="Profile"
                                                className="w-32 h-32 rounded-lg object-cover border-2 border-primary-500/20"
                                                onError={(e) => {
                                                    e.target.style.display = 'none';
                                                }}
                                            />
                                        </div>
                                    )}
                                    <div className="flex-1">
                                        {formData.name && (
                                            <h4 className="text-2xl font-bold text-white mb-1">
                                                {formData.name}
                                            </h4>
                                        )}
                                        {formData.title && (
                                            <p className="text-primary-400 font-medium mb-3">
                                                {formData.title}
                                            </p>
                                        )}
                                        {formData.description && (
                                            <p className="text-dark-200 whitespace-pre-wrap line-clamp-3">
                                                {formData.description}
                                            </p>
                                        )}
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Personal Information */}
                        <div>
                            <label htmlFor="name" className="block text-sm font-medium text-dark-200 mb-2">
                                Full Name *
                            </label>
                            <input
                                id="name"
                                type="text"
                                required
                                value={formData.name}
                                onChange={(e) => handleChange('name', e.target.value)}
                                className={`input-field ${errors.name ? 'border-red-500' : ''}`}
                                placeholder="Mohamed Bechir Elleuch"
                            />
                            {errors.name && (
                                <p className="text-xs text-red-400 mt-1">{errors.name}</p>
                            )}
                        </div>

                        {/* Professional Title */}
                        <div>
                            <label htmlFor="title" className="block text-sm font-medium text-dark-200 mb-2">
                                Professional Title *
                            </label>
                            <input
                                id="title"
                                type="text"
                                required
                                value={formData.title}
                                onChange={(e) => handleChange('title', e.target.value)}
                                className={`input-field ${errors.title ? 'border-red-500' : ''}`}
                                placeholder="e.g., Full-Stack Developer & Creative Problem Solver"
                            />
                            {errors.title && (
                                <p className="text-xs text-red-400 mt-1">{errors.title}</p>
                            )}
                            <p className="text-xs text-dark-400 mt-1">
                                A catchy headline that describes your professional role
                            </p>
                        </div>

                        {/* Description */}
                        <div>
                            <label htmlFor="description" className="block text-sm font-medium text-dark-200 mb-2">
                                Description / Bio *
                            </label>
                            <textarea
                                id="description"
                                required
                                rows={8}
                                value={formData.description}
                                onChange={(e) => handleChange('description', e.target.value)}
                                className={`input-field resize-none ${errors.description ? 'border-red-500' : ''}`}
                                placeholder="Tell your story... Who are you? What do you do? What are your passions?"
                            />
                            {errors.description && (
                                <p className="text-xs text-red-400 mt-1">{errors.description}</p>
                            )}
                            <p className="text-xs text-dark-400 mt-1">
                                {formData.description.length} characters - Write a compelling bio that showcases your personality
                            </p>
                        </div>

                        {/* Social Links */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label htmlFor="linkedinUrl" className="block text-sm font-medium text-dark-200 mb-2 flex items-center space-x-2">
                                    <Linkedin className="w-4 h-4" />
                                    <span>LinkedIn URL</span>
                                </label>
                                <input
                                    id="linkedinUrl"
                                    type="url"
                                    value={formData.linkedinUrl}
                                    onChange={(e) => handleChange('linkedinUrl', e.target.value)}
                                    className={`input-field ${errors.linkedinUrl ? 'border-red-500' : ''}`}
                                    placeholder="https://linkedin.com/in/yourprofile"
                                />
                                {errors.linkedinUrl && (
                                    <p className="text-xs text-red-400 mt-1">{errors.linkedinUrl}</p>
                                )}
                            </div>

                            <div>
                                <label htmlFor="githubUrl" className="block text-sm font-medium text-dark-200 mb-2 flex items-center space-x-2">
                                    <Github className="w-4 h-4" />
                                    <span>GitHub URL</span>
                                </label>
                                <input
                                    id="githubUrl"
                                    type="url"
                                    value={formData.githubUrl}
                                    onChange={(e) => handleChange('githubUrl', e.target.value)}
                                    className={`input-field ${errors.githubUrl ? 'border-red-500' : ''}`}
                                    placeholder="https://github.com/yourusername"
                                />
                                {errors.githubUrl && (
                                    <p className="text-xs text-red-400 mt-1">{errors.githubUrl}</p>
                                )}
                            </div>
                        </div>

                        {/* Profile Image */}
                        <div>
                            <label htmlFor="profileImageUrl" className="block text-sm font-medium text-dark-200 mb-2">
                                Profile Image URL
                            </label>
                            <input
                                id="profileImageUrl"
                                type="url"
                                value={formData.profileImageUrl}
                                onChange={(e) => handleChange('profileImageUrl', e.target.value)}
                                className={`input-field ${errors.profileImageUrl ? 'border-red-500' : ''}`}
                                placeholder="https://example.com/profile.jpg"
                            />
                            {errors.profileImageUrl && (
                                <p className="text-xs text-red-400 mt-1">{errors.profileImageUrl}</p>
                            )}
                            <p className="text-xs text-dark-400 mt-1">
                                Optional: Add a URL to your professional profile picture
                            </p>
                        </div>

                        {/* Email Address */}
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-dark-200 mb-2">
                                Contact Email
                            </label>
                            <input
                                id="email"
                                type="email"
                                value={formData.email}
                                onChange={(e) => handleChange('email', e.target.value)}
                                className={`input-field ${errors.email ? 'border-red-500' : ''}`}
                                placeholder="mohamed.bechir@example.com"
                            />
                            {errors.email && (
                                <p className="text-xs text-red-400 mt-1">{errors.email}</p>
                            )}
                            <p className="text-xs text-dark-400 mt-1">
                                The email address where potential clients or employers can reach you
                            </p>
                        </div>

                        {/* Submit Button */}
                        <div className="flex items-center justify-end pt-6 border-t border-white/10">
                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className="btn-primary flex items-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {isSubmitting ? (
                                    <>
                                        <div className="spinner" />
                                        <span>Saving Changes...</span>
                                    </>
                                ) : (
                                    <>
                                        <Save className="w-5 h-5" />
                                        <span>Save About Section</span>
                                    </>
                                )}
                            </button>
                        </div>
                    </form>
                </motion.div>

                {/* Tips Section */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="glass-card p-6"
                >
                    <h3 className="text-lg font-bold text-white mb-4">💡 Profile Tips</h3>
                    <ul className="space-y-2 text-dark-300 text-sm">
                        <li className="flex items-start space-x-2">
                            <span className="text-primary-400 mt-1">•</span>
                            <span>Use your real name for authenticity and professional credibility</span>
                        </li>
                        <li className="flex items-start space-x-2">
                            <span className="text-primary-400 mt-1">•</span>
                            <span>Keep your professional title concise and impactful (under 60 characters)</span>
                        </li>
                        <li className="flex items-start space-x-2">
                            <span className="text-primary-400 mt-1">•</span>
                            <span>Tell your unique story - what makes you different from others?</span>
                        </li>
                        <li className="flex items-start space-x-2">
                            <span className="text-primary-400 mt-1">•</span>
                            <span>Include your LinkedIn and GitHub profiles to showcase your professional network</span>
                        </li>
                        <li className="flex items-start space-x-2">
                            <span className="text-primary-400 mt-1">•</span>
                            <span>Use a professional, high-quality profile image with good lighting</span>
                        </li>
                    </ul>
                </motion.div>
            </div>
        </AdminLayout>
    );
};

export default AboutManagement;
