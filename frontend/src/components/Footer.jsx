import { Github, Linkedin, Mail, Heart, ArrowUp } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const Footer = ({ about, languages, interests }) => {
    const { t } = useTranslation();

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const currentYear = new Date().getFullYear();
    const navItems = ['home', 'about', 'skills', 'projects', 'experience'];

    return (
        <footer className="relative bg-gray-50 dark:bg-slate-950 pt-20 pb-10 border-t border-gray-200 dark:border-white/5 overflow-hidden transition-colors duration-300">
            {/* Background Decoration */}
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[300px] bg-primary-500/5 dark:bg-primary-500/10 blur-[120px] rounded-full z-0"></div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
                    {/* Brand Section */}
                    <div className="space-y-6">
                        <div className="flex items-center space-x-2">
                            <span className="text-2xl font-bold gradient-text">Portfolio</span>
                        </div>
                        <p className="text-gray-600 dark:text-gray-400 max-w-xs">
                            {t('footer.description')}
                        </p>
                        <div className="flex items-center space-x-4">
                            {about?.githubUrl && (
                                <a href={about.githubUrl} target="_blank" rel="noopener noreferrer" className="p-2 glass-card hover:bg-gray-200 dark:hover:bg-white/10 transition-colors">
                                    <Github className="w-5 h-5 text-gray-700 dark:text-white" />
                                </a>
                            )}
                            {about?.linkedinUrl && (
                                <a href={about.linkedinUrl} target="_blank" rel="noopener noreferrer" className="p-2 glass-card hover:bg-gray-200 dark:hover:bg-white/10 transition-colors">
                                    <Linkedin className="w-5 h-5 text-gray-700 dark:text-white" />
                                </a>
                            )}
                            <a href="#contact" className="p-2 glass-card hover:bg-gray-200 dark:hover:bg-white/10 transition-colors">
                                <Mail className="w-5 h-5 text-gray-700 dark:text-white" />
                            </a>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h4 className="text-gray-900 dark:text-white font-bold mb-6">{t('footer.quickLinks')}</h4>
                        <ul className="space-y-4">
                            {navItems.map((key) => (
                                <li key={key}>
                                    <a
                                        href={`#${key}`}
                                        className="text-gray-600 dark:text-gray-400 hover:text-primary-500 dark:hover:text-primary-400 transition-colors"
                                    >
                                        {t(`nav.${key}`)}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Languages & Interests (Extra Info) */}
                    <div>
                        <h4 className="text-gray-900 dark:text-white font-bold mb-6">{t('footer.languages')}</h4>
                        <div className="flex flex-wrap gap-2 mb-8">
                            {languages?.map((lang) => (
                                <span key={lang.id} className="text-xs font-medium px-2 py-1 bg-gray-100 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded text-gray-700 dark:text-gray-300">
                                    {lang.name} ({lang.level || lang.proficiency})
                                </span>
                            ))}
                            {(!languages || languages.length === 0) && (
                                <span className="text-xs text-gray-500 dark:text-gray-400">English, French</span>
                            )}
                        </div>
                        <h4 className="text-gray-900 dark:text-white font-bold mb-4">{t('footer.interests')}</h4>
                        <div className="flex flex-wrap gap-2">
                            {interests?.map((interest) => (
                                <span key={interest.id} className="text-xs text-gray-500 dark:text-gray-400 italic">
                                    #{interest.name.toLowerCase()}
                                </span>
                            ))}
                        </div>
                    </div>

                    {/* Scroll to Top */}
                    <div className="flex flex-col items-center justify-center">
                        <button
                            onClick={scrollToTop}
                            className="p-4 rounded-full glass-card hover:bg-primary-500 transition-all duration-300 group shadow-lg"
                        >
                            <ArrowUp className="w-6 h-6 text-gray-700 dark:text-white group-hover:text-white group-hover:scale-110" />
                        </button>
                        <span className="mt-4 text-xs uppercase tracking-widest text-gray-500 dark:text-gray-400 font-bold">{t('footer.backToTop')}</span>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="pt-8 border-t border-gray-200 dark:border-white/5 text-center">
                    <p className="text-gray-500 dark:text-gray-400 text-sm flex items-center justify-center">
                        © {currentYear} {about?.firstName || 'Mohamed'} {about?.lastName || 'Bechir'}. {t('footer.builtWith')}
                        <Heart className="w-4 h-4 mx-1 text-red-500 fill-current" />
                        using React & Spring Boot.
                    </p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
