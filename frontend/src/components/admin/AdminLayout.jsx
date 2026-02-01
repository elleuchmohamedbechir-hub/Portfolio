import { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
    LayoutDashboard,
    FolderKanban,
    Lightbulb,
    Briefcase,
    GraduationCap,
    Languages,
    Heart,
    MessageSquare,
    User,
    LogOut,
    Menu,
    X,
    Code2,
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import toast from 'react-hot-toast';

const AdminLayout = ({ children }) => {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const { user, logout } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();

    const handleLogout = () => {
        logout();
        toast.success('Logged out successfully');
        navigate('/admin/login');
    };

    const menuItems = [
        { icon: LayoutDashboard, label: 'Dashboard', path: '/admin/dashboard' },
        { icon: User, label: 'About', path: '/admin/about' },
        { icon: Lightbulb, label: 'Skills', path: '/admin/skills' },
        { icon: FolderKanban, label: 'Projects', path: '/admin/projects' },
        { icon: Briefcase, label: 'Experience', path: '/admin/experience' },
        { icon: GraduationCap, label: 'Education', path: '/admin/education' },
        { icon: Languages, label: 'Languages', path: '/admin/languages' },
        { icon: Heart, label: 'Interests', path: '/admin/interests' },
        { icon: MessageSquare, label: 'Messages', path: '/admin/messages' },
    ];

    const isActive = (path) => location.pathname === path;

    return (
        <div className="min-h-screen flex">
            {/* Sidebar */}
            <aside
                className={`fixed inset-y-0 left-0 z-50 w-64 glass-card border-r border-white/10 transform transition-transform duration-300 lg:translate-x-0 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'
                    }`}
            >
                <div className="flex flex-col h-full">
                    {/* Logo */}
                    <div className="flex items-center justify-between p-6 border-b border-white/10">
                        <Link to="/" className="flex items-center space-x-2">
                            <div className="p-2 bg-gradient-to-r from-primary-500 to-blue-600 rounded-lg">
                                <Code2 className="w-6 h-6 text-white" />
                            </div>
                            <span className="text-xl font-bold gradient-text">Admin</span>
                        </Link>
                        <button
                            onClick={() => setSidebarOpen(false)}
                            className="lg:hidden p-2 hover:bg-white/10 rounded-lg transition-colors duration-300"
                        >
                            <X className="w-5 h-5 text-white" />
                        </button>
                    </div>

                    {/* Navigation */}
                    <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
                        {menuItems.map((item) => (
                            <Link
                                key={item.path}
                                to={item.path}
                                onClick={() => setSidebarOpen(false)}
                                className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-300 ${isActive(item.path)
                                        ? 'bg-gradient-to-r from-primary-500 to-blue-600 text-white shadow-lg'
                                        : 'text-dark-200 hover:bg-white/10 hover:text-white'
                                    }`}
                            >
                                <item.icon className="w-5 h-5" />
                                <span className="font-medium">{item.label}</span>
                            </Link>
                        ))}
                    </nav>

                    {/* User Info & Logout */}
                    <div className="p-4 border-t border-white/10">
                        <div className="flex items-center space-x-3 mb-4 p-3 bg-white/5 rounded-lg">
                            <div className="w-10 h-10 bg-gradient-to-r from-primary-500 to-blue-600 rounded-full flex items-center justify-center">
                                <User className="w-5 h-5 text-white" />
                            </div>
                            <div className="flex-1 min-w-0">
                                <p className="text-sm font-medium text-white truncate">
                                    {user?.username || 'Admin'}
                                </p>
                                <p className="text-xs text-dark-400">Administrator</p>
                            </div>
                        </div>
                        <button
                            onClick={handleLogout}
                            className="w-full flex items-center justify-center space-x-2 px-4 py-3 bg-red-500/20 text-red-400 rounded-lg hover:bg-red-500/30 transition-all duration-300"
                        >
                            <LogOut className="w-5 h-5" />
                            <span className="font-medium">Logout</span>
                        </button>
                    </div>
                </div>
            </aside>

            {/* Main Content */}
            <div className="flex-1 lg:ml-64">
                {/* Top Bar */}
                <header className="glass-card border-b border-white/10 sticky top-0 z-40">
                    <div className="flex items-center justify-between p-4">
                        <button
                            onClick={() => setSidebarOpen(true)}
                            className="lg:hidden p-2 hover:bg-white/10 rounded-lg transition-colors duration-300"
                        >
                            <Menu className="w-6 h-6 text-white" />
                        </button>
                        <div className="flex-1 lg:flex-none">
                            <h1 className="text-xl font-bold text-white">
                                {menuItems.find((item) => isActive(item.path))?.label || 'Dashboard'}
                            </h1>
                        </div>
                        <Link
                            to="/"
                            className="hidden sm:block px-4 py-2 text-dark-200 hover:text-primary-400 transition-colors duration-300"
                        >
                            View Portfolio
                        </Link>
                    </div>
                </header>

                {/* Page Content */}
                <main className="p-6">
                    {children}
                </main>
            </div>

            {/* Mobile Overlay */}
            <AnimatePresence>
                {sidebarOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setSidebarOpen(false)}
                        className="fixed inset-0 bg-black/50 z-40 lg:hidden"
                    />
                )}
            </AnimatePresence>
        </div>
    );
};

export default AdminLayout;
