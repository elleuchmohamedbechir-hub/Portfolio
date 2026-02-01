import { motion } from 'framer-motion';
import { Github, ExternalLink, Code2 } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const Projects = ({ projects, loading }) => {
    const { t } = useTranslation();

    if (loading) return null;

    return (
        <section id="projects" className="section-container">
            <div className="text-center mb-16">
                <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="section-title"
                >
                    {t('projects.title')}
                </motion.h2>
                <div className="w-20 h-1.5 bg-primary-500 rounded-full mx-auto mb-4"></div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {(projects || []).map((project, idx) => (
                    <motion.div
                        key={project.id}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: idx * 0.1 }}
                        className="glass-card group flex flex-col h-full overflow-hidden"
                    >
                        {/* Project Image */}
                        <div className="relative aspect-video overflow-hidden">
                            {project.imageUrl ? (
                                <img
                                    src={project.imageUrl}
                                    alt={project.title}
                                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                                />
                            ) : (
                                <div className="w-full h-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center">
                                    <Code2 className="w-12 h-12 text-slate-400 dark:text-slate-600" />
                                </div>
                            )}
                            <div className="absolute inset-0 bg-primary-600/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                        </div>

                        {/* Project Content */}
                        <div className="p-6 flex flex-col flex-1">
                            <div className="flex items-center justify-between mb-2">
                                <h3 className="text-xl font-bold text-gray-900 dark:text-white line-clamp-1">{project.title}</h3>
                                <span className="text-xs font-medium px-2 py-1 bg-primary-500/10 text-primary-600 dark:text-primary-400 rounded-md border border-primary-500/20">
                                    {project.year}
                                </span>
                            </div>
                            <p className="text-sm text-gray-600 dark:text-gray-300 mb-6 flex-1 line-clamp-3">
                                {project.description}
                            </p>

                            {/* Technologies */}
                            <div className="flex flex-wrap gap-2 mb-6">
                                {Array.isArray(project.technologies) ? (
                                    project.technologies.map((tech, i) => (
                                        <span
                                            key={i}
                                            className="text-[10px] uppercase tracking-wider font-bold px-2 py-1 bg-gray-100 dark:bg-white/5 rounded border border-gray-200 dark:border-white/5 text-gray-700 dark:text-primary-400"
                                        >
                                            {tech.trim()}
                                        </span>
                                    ))
                                ) : (
                                    project.technologies?.split(',').map((tech, i) => (
                                        <span
                                            key={i}
                                            className="text-[10px] uppercase tracking-wider font-bold px-2 py-1 bg-gray-100 dark:bg-white/5 rounded border border-gray-200 dark:border-white/5 text-gray-700 dark:text-primary-400"
                                        >
                                            {tech.trim()}
                                        </span>
                                    ))
                                )}
                            </div>

                            {/* Links */}
                            <div className="flex items-center space-x-4">
                                {project.githubUrl && (
                                    <a
                                        href={project.githubUrl}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex items-center space-x-1 text-sm text-gray-500 dark:text-gray-400 hover:text-primary-500 dark:hover:text-white transition-colors duration-300"
                                    >
                                        <Github className="w-4 h-4" />
                                        <span>{t('projects.github')}</span>
                                    </a>
                                )}
                                {project.liveUrl && (
                                    <a
                                        href={project.liveUrl}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex items-center space-x-1 text-sm text-gray-500 dark:text-gray-400 hover:text-primary-500 dark:hover:text-white transition-colors duration-300"
                                    >
                                        <ExternalLink className="w-4 h-4" />
                                        <span>{t('projects.demo')}</span>
                                    </a>
                                )}
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>

            {projects.length === 0 && (
                <div className="text-center py-20 glass-card">
                    <p className="text-gray-500 dark:text-gray-400">{t('common.noData')}</p>
                </div>
            )}
        </section>
    );
};

export default Projects;
