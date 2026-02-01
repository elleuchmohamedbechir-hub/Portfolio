import { motion } from 'framer-motion';
import { User, Award, BookOpen } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const About = ({ about, loading }) => {
    const { t } = useTranslation();

    if (loading) return null; // Or skeleton

    return (
        <section id="about" className="section-container">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                {/* Image side */}
                <motion.div
                    initial={{ opacity: 0, x: -50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    className="relative"
                >
                    <div className="aspect-square rounded-2xl overflow-hidden glass-card p-2">
                        {about?.profileImageUrl ? (
                            <img
                                src={about.profileImageUrl}
                                alt="Profile"
                                className="w-full h-full object-cover rounded-xl"
                            />
                        ) : (
                            <div className="w-full h-full bg-gradient-to-br from-primary-500/20 to-blue-600/20 flex items-center justify-center">
                                <User className="w-32 h-32 text-primary-400" />
                            </div>
                        )}
                    </div>
                    {/* Floating stats or decoration */}
                    <div className="absolute -bottom-6 -right-6 glass-card p-6 border-l-4 border-l-primary-500">
                        <div className="flex items-center space-x-3">
                            <Award className="w-8 h-8 text-primary-400" />
                            <div>
                                <p className="text-2xl font-bold">2+</p>
                                <p className="text-sm text-dark-300">{t('about.yearsExperience')}</p>
                            </div>
                        </div>
                    </div>
                </motion.div>

                {/* Content side */}
                <motion.div
                    initial={{ opacity: 0, x: 50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    className="space-y-8"
                >
                    <div>
                        <h2 className="section-title">{t('about.title')}</h2>
                        <div className="w-20 h-1.5 bg-primary-500 rounded-full mb-8"></div>
                    </div>

                    <h3 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
                        {about?.title || t('about.defaultTitle')}
                    </h3>

                    <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed whitespace-pre-wrap">
                        {about?.description || t('about.defaultDescription')}
                    </p>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-4">
                        <div className="glass-card p-4 flex items-start space-x-4">
                            <div className="p-3 bg-primary-500/10 rounded-lg">
                                <BookOpen className="w-6 h-6 text-primary-500 dark:text-primary-400" />
                            </div>
                            <div>
                                <h4 className="font-bold text-gray-900 dark:text-white">{t('about.education')}</h4>
                                <p className="text-sm text-gray-600 dark:text-gray-300">{t('about.degree')}</p>
                            </div>
                        </div>
                        <div className="glass-card p-4 flex items-start space-x-4">
                            <div className="p-3 bg-primary-500/10 rounded-lg">
                                <User className="w-6 h-6 text-primary-500 dark:text-primary-400" />
                            </div>
                            <div>
                                <h4 className="font-bold text-gray-900 dark:text-white">{t('about.freelance')}</h4>
                                <p className="text-sm text-gray-600 dark:text-gray-300">{t('about.available')}</p>
                            </div>
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

export default About;
