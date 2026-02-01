import { motion } from 'framer-motion';
import { Lightbulb } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const Skills = ({ skills, loading }) => {
    const { t } = useTranslation();

    if (loading) return null;

    const groupedSkills = (skills || []).reduce((acc, skill) => {
        const category = skill.category || 'Other';
        if (!acc[category]) acc[category] = [];
        acc[category].push(skill);
        return acc;
    }, {});

    return (
        <section id="skills" className="section-container">
            <div className="text-center mb-16">
                <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="section-title"
                >
                    {t('skills.title')}
                </motion.h2>
                <div className="w-20 h-1.5 bg-primary-500 rounded-full mx-auto mb-4"></div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {Object.entries(groupedSkills).map(([category, items], idx) => (
                    <motion.div
                        key={category}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: idx * 0.1 }}
                        className="glass-card p-8"
                    >
                        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6 flex items-center space-x-2">
                            <Lightbulb className="w-5 h-5 text-primary-500 dark:text-primary-400" />
                            <span>{category}</span>
                        </h3>
                        <div className="flex flex-wrap gap-3">
                            {items.map((skill) => (
                                <div
                                    key={skill.id}
                                    className="skill-tag group flex items-center space-x-2"
                                >
                                    {skill.imageUrl && (
                                        <img
                                            src={skill.imageUrl}
                                            alt=""
                                            className="w-4 h-4 object-contain"
                                            onError={(e) => e.target.style.display = 'none'}
                                        />
                                    )}
                                    <span>{skill.name}</span>
                                </div>
                            ))}
                        </div>
                    </motion.div>
                ))}
            </div>
        </section>
    );
};

export default Skills;
