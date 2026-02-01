import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { motion } from 'framer-motion';
import { Lock, Mail, ArrowLeft, AlertCircle } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import toast from 'react-hot-toast';
import { Link } from 'react-router-dom';

const AdminLogin = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { login, isAuthenticated, error: authError } = useAuth();
    const [isLoading, setIsLoading] = useState(false);
    const [loginError, setLoginError] = useState(null);

    // Get the redirect path from location state (set by ProtectedRoute)
    const from = location.state?.from || '/admin/dashboard';

    useEffect(() => {
        if (isAuthenticated) {
            navigate(from, { replace: true });
        }
    }, [isAuthenticated, navigate, from]);

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const onSubmit = async (data) => {
        setIsLoading(true);
        setLoginError(null);

        try {
            await login(data);
            toast.success('Login successful!');
            // Navigation handled by useEffect
        } catch (error) {
            console.error('[AdminLogin] Login error:', error);

            // Get error message from various sources
            const errorMessage =
                error.userMessage ||
                error.response?.data?.message ||
                error.response?.data?.error ||
                'Invalid credentials. Please try again.';

            setLoginError(errorMessage);
            toast.error(errorMessage);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center p-4">
            {/* Background Effects */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <motion.div
                    animate={{
                        scale: [1, 1.2, 1],
                        opacity: [0.3, 0.5, 0.3],
                    }}
                    transition={{
                        duration: 8,
                        repeat: Infinity,
                        ease: 'easeInOut',
                    }}
                    className="absolute top-1/4 -left-20 w-96 h-96 bg-primary-500/20 rounded-full blur-3xl"
                />
                <motion.div
                    animate={{
                        scale: [1.2, 1, 1.2],
                        opacity: [0.3, 0.5, 0.3],
                    }}
                    transition={{
                        duration: 8,
                        repeat: Infinity,
                        ease: 'easeInOut',
                        delay: 1,
                    }}
                    className="absolute bottom-1/4 -right-20 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl"
                />
            </div>

            <div className="w-full max-w-md relative z-10">
                {/* Back to Home Link */}
                <Link
                    to="/"
                    className="inline-flex items-center space-x-2 text-dark-300 hover:text-primary-400 transition-colors duration-300 mb-8"
                >
                    <ArrowLeft className="w-5 h-5" />
                    <span>Back to Home</span>
                </Link>

                {/* Login Card */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="glass-card p-8"
                >
                    {/* Header */}
                    <div className="text-center mb-8">
                        <div className="inline-flex p-4 bg-gradient-to-r from-primary-500/20 to-blue-500/20 rounded-2xl mb-4">
                            <Lock className="w-12 h-12 text-primary-400" />
                        </div>
                        <h1 className="text-3xl font-bold gradient-text mb-2">
                            Admin Login
                        </h1>
                        <p className="text-dark-300">
                            Sign in to access the dashboard
                        </p>
                    </div>

                    {/* Error Alert */}
                    {(loginError || authError) && (
                        <motion.div
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="mb-6 p-4 bg-red-500/10 border border-red-500/20 rounded-lg flex items-center space-x-3"
                        >
                            <AlertCircle className="w-5 h-5 text-red-400 flex-shrink-0" />
                            <p className="text-red-400 text-sm">{loginError || authError}</p>
                        </motion.div>
                    )}

                    {/* Login Form */}
                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                        {/* Username Field */}
                        <div>
                            <label htmlFor="username" className="block text-sm font-medium text-dark-200 mb-2">
                                Username
                            </label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <Mail className="w-5 h-5 text-dark-400" />
                                </div>
                                <input
                                    id="username"
                                    type="text"
                                    {...register('username', { required: 'Username is required' })}
                                    className="input-field pl-10"
                                    placeholder="Enter your username"
                                    autoComplete="username"
                                />
                            </div>
                            {errors.username && (
                                <p className="mt-1 text-sm text-red-400">{errors.username.message}</p>
                            )}
                        </div>

                        {/* Password Field */}
                        <div>
                            <label htmlFor="password" className="block text-sm font-medium text-dark-200 mb-2">
                                Password
                            </label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <Lock className="w-5 h-5 text-dark-400" />
                                </div>
                                <input
                                    id="password"
                                    type="password"
                                    {...register('password', { required: 'Password is required' })}
                                    className="input-field pl-10"
                                    placeholder="Enter your password"
                                    autoComplete="current-password"
                                />
                            </div>
                            {errors.password && (
                                <p className="mt-1 text-sm text-red-400">{errors.password.message}</p>
                            )}
                        </div>

                        {/* Submit Button */}
                        <button
                            type="submit"
                            disabled={isLoading}
                            className="w-full btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {isLoading ? (
                                <div className="flex items-center justify-center space-x-2">
                                    <div className="spinner" />
                                    <span>Signing in...</span>
                                </div>
                            ) : (
                                'Sign In'
                            )}
                        </button>
                    </form>

                    {/* Info */}
                    <div className="mt-6 p-4 bg-primary-500/10 border border-primary-500/20 rounded-lg">
                        <p className="text-sm text-dark-300 text-center">
                            <strong className="text-primary-400">Demo Credentials:</strong><br />
                            Username: admin | Password: admin123
                        </p>
                    </div>
                </motion.div>
            </div>
        </div>
    );
};

export default AdminLogin;
