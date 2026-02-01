import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X, Code2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import LanguageSwitcher from './LanguageSwitcher';
import ThemeToggle from './ThemeToggle';

const Navbar = () => {
    const { t } = useTranslation();
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const navLinks = [
        { name: t('nav.home'), href: '#home' },
        { name: t('nav.about'), href: '#about' },
        { name: t('nav.skills'), href: '#skills' },
        { name: t('nav.projects'), href: '#projects' },
        { name: t('nav.experience'), href: '#experience' },
        { name: t('nav.contact'), href: '#contact' },
    ];

    return (
        <motion.nav
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'glass-card shadow-lg' : 'bg-transparent'
                }`}
        >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    {/* Logo */}
                    <Link to="/" className="flex items-center space-x-2 group">
                        <div className="p-2 bg-gradient-to-r from-primary-500 to-blue-600 rounded-lg group-hover:scale-110 transition-transform duration-300">
                            <Code2 className="w-6 h-6 text-white" />
                        </div>
                        <span className="text-xl font-bold gradient-text">Portfolio</span>
                    </Link>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex items-center space-x-1">
                        {navLinks.map((link) => (
                            <a
                                key={link.href}
                                href={link.href}
                                className="px-4 py-2 text-gray-700 dark:text-slate-200 hover:text-primary-500 dark:hover:text-white font-medium rounded-lg hover:bg-gray-100 dark:hover:bg-white/10 transition-all duration-300"
                            >
                                {link.name}
                            </a>
                        ))}

                        <div className="mx-2 h-6 w-px bg-gray-300 dark:bg-white/10" />

                        <div className="flex items-center gap-2">
                            <ThemeToggle />
                            <LanguageSwitcher />
                        </div>

                        <Link
                            to="/admin/login"
                            className="ml-4 px-6 py-2 bg-gradient-to-r from-primary-500 to-blue-600 text-white font-semibold rounded-lg hover:from-primary-600 hover:to-blue-700 transition-all duration-300 shadow-lg hover:shadow-primary-500/50"
                        >
                            {t('nav.admin')}
                        </Link>
                    </div>

                    {/* Mobile Menu Button - AND Language Switcher for Mobile */}
                    <div className="flex items-center gap-4 md:hidden">
                        <ThemeToggle />
                        <LanguageSwitcher />
                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-white/10 transition-colors duration-300 text-gray-700 dark:text-white"
                        >
                            {isOpen ? (
                                <X className="w-6 h-6" />
                            ) : (
                                <Menu className="w-6 h-6" />
                            )}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="md:hidden glass-card border-t border-gray-200 dark:border-white/10 mx-4 mt-2"
                    >
                        <div className="px-4 py-4 space-y-2">
                            {navLinks.map((link) => (
                                <a
                                    key={link.href}
                                    href={link.href}
                                    onClick={() => setIsOpen(false)}
                                    className="block px-4 py-3 text-gray-700 dark:text-slate-200 hover:text-primary-500 dark:hover:text-white font-medium rounded-lg hover:bg-gray-100 dark:hover:bg-white/10 transition-all duration-300"
                                >
                                    {link.name}
                                </a>
                            ))}
                            <Link
                                to="/admin/login"
                                onClick={() => setIsOpen(false)}
                                className="block px-4 py-3 bg-gradient-to-r from-primary-500 to-blue-600 text-white font-semibold rounded-lg text-center hover:from-primary-600 hover:to-blue-700 transition-all duration-300"
                            >
                                {t('nav.login')}
                            </Link>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.nav>
    );
};

export default Navbar;
