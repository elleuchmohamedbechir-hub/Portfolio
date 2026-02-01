import { motion } from 'framer-motion';
import { ChevronDown, Github, Linkedin, Mail } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const Hero = ({ about, loading }) => {
    const { t } = useTranslation();

    if (loading) {
        return (
            <section id="home" className="relative h-screen flex items-center justify-center overflow-hidden">
                <div className="animate-pulse text-center">
                    <div className="h-12 w-64 bg-white/10 rounded-lg mb-4"></div>
                    <div className="h-6 w-48 bg-white/10 rounded-lg mx-auto"></div>
                </div>
            </section>
        );
    }

    const name = about?.name || 'Mohamed Bechir';
    const title = about?.title || t('hero.role');

    return (
        <section id="home" className="relative h-screen flex items-center justify-center overflow-hidden">
            {/* Background elements */}
            <div className="absolute inset-0 z-0">
                <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary-500/20 rounded-full blur-[120px] animate-pulse"></div>
                <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-600/20 rounded-full blur-[120px] animate-pulse delay-1000"></div>
            </div>

            <div className="container mx-auto px-4 z-10 text-center">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                >
                    <motion.h2
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.2 }}
                        className="text-primary-400 font-medium tracking-widest uppercase mb-4"
                    >
                        {t('hero.greeting')}
                    </motion.h2>
                    <h1 className="text-6xl md:text-8xl font-bold mb-6 tracking-tight">
                        <span className="gradient-text">{name}</span>
                    </h1>
                    <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto mb-10 leading-relaxed">
                        {title}
                    </p>

                    <div className="flex items-center justify-center space-x-6 mb-12">
                        {about?.githubUrl && (
                            <a href={about.githubUrl} target="_blank" rel="noopener noreferrer" className="p-3 glass-card hover:scale-110 transition-transform duration-300 group">
                                <Github className="w-6 h-6 text-gray-700 dark:text-white group-hover:text-primary-400" />
                            </a>
                        )}
                        {about?.linkedinUrl && (
                            <a href={about.linkedinUrl} target="_blank" rel="noopener noreferrer" className="p-3 glass-card hover:scale-110 transition-transform duration-300 group">
                                <Linkedin className="w-6 h-6 text-gray-700 dark:text-white group-hover:text-primary-400" />
                            </a>
                        )}
                        <a href="#contact" className="p-3 glass-card hover:scale-110 transition-transform duration-300 group">
                            <Mail className="w-6 h-6 text-gray-700 dark:text-white group-hover:text-primary-400" />
                        </a>
                    </div>

                    <div className="flex flex-col md:flex-row items-center justify-center gap-4">
                        <a href="#projects" className="btn-primary">
                            {t('hero.viewProjects')}
                        </a>
                        <a href="#contact" className="btn-secondary">
                            {t('hero.contactMe')}
                        </a>
                    </div>
                </motion.div>
            </div>

            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1, duration: 1 }}
                className="absolute bottom-10 left-1/2 -translate-x-1/2"
            >
                <a href="#about" className="flex flex-col items-center text-gray-500 dark:text-gray-400 hover:text-primary-500 dark:hover:text-white transition-colors duration-300">
                    <span className="text-sm uppercase tracking-widest mb-2 font-medium">Scroll</span>
                    <ChevronDown className="w-6 h-6 animate-bounce" />
                </a>
            </motion.div>
        </section>
    );
};

export default Hero;
