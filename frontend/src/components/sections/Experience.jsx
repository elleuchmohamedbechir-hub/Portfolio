import { motion } from 'framer-motion';
import { Briefcase, GraduationCap, Calendar } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const Experience = ({ experiences, education, loading }) => {
    const { t } = useTranslation();

    if (loading) return null;

    return (
        <section id="experience" className="section-container">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
                {/* Work Experience */}
                <div>
                    <div className="mb-12">
                        <h2 className="section-title">{t('experience.title')}</h2>
                        <div className="w-20 h-1.5 bg-primary-500 rounded-full mb-4"></div>
                    </div>

                    <div className="space-y-8 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-gray-300 dark:before:via-slate-700 before:to-transparent">
                        {(experiences || []).map((exp, idx) => (
                            <motion.div
                                key={exp.id}
                                initial={{ opacity: 0, x: -20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: idx * 0.1 }}
                                className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group"
                            >
                                {/* Dot */}
                                <div className="flex items-center justify-center w-10 h-10 rounded-full border border-gray-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-primary-500 dark:text-primary-400 shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10">
                                    <Briefcase className="w-5 h-5" />
                                </div>
                                {/* Card */}
                                <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] glass-card p-6 group-hover:bg-gray-100 dark:group-hover:bg-white/10 transition-colors duration-300">
                                    <div className="flex flex-col sm:items-baseline justify-between gap-y-2 gap-x-4 mb-2">
                                        <h4 className="font-bold text-gray-900 dark:text-white text-lg leading-snug">{exp.position}</h4>
                                        <div className="flex items-center gap-2 text-sm text-primary-600 dark:text-primary-400 font-medium whitespace-nowrap shrink-0">
                                            <Calendar className="w-4 h-4" />
                                            <span>{exp.startDate} - {exp.current ? t('experience.present') : exp.endDate}</span>
                                        </div>
                                    </div>
                                    <h5 className="text-blue-600 dark:text-blue-400 font-medium mb-4">{exp.company}</h5>
                                    <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
                                        {exp.description}
                                    </p>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>

                {/* Education */}
                <div>
                    <div className="mb-12">
                        <h2 className="section-title">{t('experience.education')}</h2>
                        <div className="w-20 h-1.5 bg-primary-500 rounded-full mb-4"></div>
                    </div>

                    <div className="space-y-8">
                        {(education || []).map((edu, idx) => (
                            <motion.div
                                key={edu.id}
                                initial={{ opacity: 0, x: 20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: idx * 0.1 }}
                                className="glass-card p-8 hover:bg-gray-100 dark:hover:bg-white/10 transition-colors duration-300 relative overflow-hidden group"
                            >
                                <div className="absolute top-0 right-0 p-6 opacity-10 group-hover:opacity-20 transition-opacity">
                                    <GraduationCap className="w-20 h-20 text-gray-900 dark:text-white" />
                                </div>
                                <div className="relative z-10">
                                    <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-y-2 gap-x-4 mb-2">
                                        <h4 className="text-xl font-bold text-gray-900 dark:text-white leading-snug">{edu.degree}</h4>
                                        <div className="flex items-center gap-2 text-sm text-primary-600 dark:text-primary-400 font-medium whitespace-nowrap shrink-0">
                                            <Calendar className="w-4 h-4" />
                                            <span>{edu.startDate} - {edu.endDate}</span>
                                        </div>
                                    </div>
                                    <h5 className="text-lg text-blue-600 dark:text-blue-400 font-medium mb-4">{edu.institution}</h5>
                                    <p className="text-gray-600 dark:text-gray-300">
                                        {edu.description || "Focused on computer science and software development principles."}
                                    </p>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Experience;
