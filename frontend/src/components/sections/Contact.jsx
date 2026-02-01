import { motion, useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Mail, MapPin, Phone, Send } from 'lucide-react';
import { contactService } from '../../services';
import { sendEmail } from '../../utils/email';
import toast from 'react-hot-toast';
import { useTranslation } from 'react-i18next';

const Contact = ({ about }) => {
    const { t } = useTranslation();
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: '-100px' });
    const [isSubmitting, setIsSubmitting] = useState(false);

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm();

    const onSubmit = async (data) => {
        setIsSubmitting(true);
        console.log('📝 Submitting contact form...', data);

        try {
            // 1. Prepare Payload explicitly to avoid sending unwanted fields
            const payload = {
                name: data.name,
                email: data.email,
                subject: data.subject,
                message: data.message
            };

            // 2. Save to Database (Backend)
            console.log('📡 Sending to Backend:', payload);
            try {
                const response = await contactService.sendMessage(payload);
                console.log('✅ Backend Success:', response.data);
            } catch (dbError) {
                console.error('❌ Backend Failure:', dbError);

                // Detailed error logging for debugging 500s
                if (dbError.response) {
                    console.error('Status:', dbError.response.status);
                    console.error('Data:', dbError.response.data);
                    console.error('Headers:', dbError.response.headers);
                } else if (dbError.request) {
                    console.error('No response received:', dbError.request);
                } else {
                    console.error('Error setup:', dbError.message);
                }

                // If Backend fails, we still try EmailJS but we alert the user about the partial issue
                // OR we consider it a Hard Failure if DB is required. 
                // Given the user wants "Message recorded in DB", we treat this as a failure.
                throw new Error(
                    dbError.response?.data?.message ||
                    dbError.userMessage ||
                    'Database connection failed. Please try again.'
                );
            }

            // 3. Send Email (EmailJS) - Optional Notification
            try {
                console.log('📧 Sending EmailJS notification...');
                await sendEmail(payload);
                console.log('✅ EmailJS Success');
            } catch (emailError) {
                console.warn('⚠️ EmailJS Warning:', emailError);
                // Non-blocking error for User (since DB saved fine)
            }

            toast.success(t('contact.success'));
            reset();
        } catch (error) {
            console.error('🛑 Final Error Handler:', error);
            toast.error(error.message || t('contact.error'));
        } finally {
            setIsSubmitting(false);
        }
    };

    const contactInfo = [
        {
            icon: Mail,
            label: t('contact.email'),
            value: about?.email || 'mohamed.bechir@example.com',
            href: `mailto:${about?.email || 'mohamed.bechir@example.com'}`,
        },
        {
            icon: Phone,
            label: 'LinkedIn',
            value: t('contact.social.connect'),
            href: about?.linkedinUrl || '#',
        },
        {
            icon: MapPin,
            label: 'GitHub',
            value: t('contact.social.viewGithub'),
            href: about?.githubUrl || '#',
        },
    ];

    return (
        <section id="contact" className="section-container" ref={ref}>
            <div className="text-center mb-16">
                <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.5 }}
                    className="section-title"
                >
                    {t('contact.title')}
                </motion.h2>
                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.5, delay: 0.1 }}
                    className="section-subtitle"
                >
                    {t('contact.subtitle')}
                </motion.p>
            </div>

            <div className="grid md:grid-cols-2 gap-12 max-w-6xl mx-auto">
                {/* Contact Information */}
                <motion.div
                    initial={{ opacity: 0, x: -50 }}
                    animate={isInView ? { opacity: 1, x: 0 } : {}}
                    transition={{ duration: 0.6 }}
                    className="space-y-8"
                >
                    <div className="glass-card p-8">
                        <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                            {t('contact.connectTitle')}
                        </h3>
                        <p className="text-gray-600 dark:text-gray-300 mb-8">
                            {t('contact.connectText')}
                        </p>

                        <div className="space-y-6">
                            {contactInfo.map((item, index) => (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={isInView ? { opacity: 1, x: 0 } : {}}
                                    transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
                                    className="flex items-start space-x-4"
                                >
                                    <div className="p-3 bg-primary-500/20 rounded-lg">
                                        <item.icon className="w-6 h-6 text-primary-600 dark:text-primary-400" />
                                    </div>
                                    <div>
                                        <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">{item.label}</p>
                                        {item.href ? (
                                            <a
                                                href={item.href}
                                                className="text-gray-900 dark:text-white hover:text-primary-500 dark:hover:text-primary-400 transition-colors duration-300"
                                            >
                                                {item.value}
                                            </a>
                                        ) : (
                                            <p className="text-gray-900 dark:text-white">{item.value}</p>
                                        )}
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </motion.div>

                {/* Contact Form */}
                <motion.div
                    initial={{ opacity: 0, x: 50 }}
                    animate={isInView ? { opacity: 1, x: 0 } : {}}
                    transition={{ duration: 0.6 }}
                >
                    <form onSubmit={handleSubmit(onSubmit)} className="glass-card p-8 space-y-6">
                        {/* Name Field */}
                        <div>
                            <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-2">
                                {t('contact.name')} *
                            </label>
                            <input
                                id="name"
                                type="text"
                                {...register('name', { required: t('contact.validation.nameRequired') })}
                                className="input-field"
                                placeholder={t('contact.placeholder.name')}
                            />
                            {errors.name && (
                                <p className="mt-1 text-sm text-red-500 dark:text-red-400">{errors.name.message}</p>
                            )}
                        </div>

                        {/* Email Field */}
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-2">
                                {t('contact.email')} *
                            </label>
                            <input
                                id="email"
                                type="email"
                                {...register('email', {
                                    required: t('contact.validation.emailRequired'),
                                    pattern: {
                                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                        message: t('contact.validation.emailInvalid'),
                                    },
                                })}
                                className="input-field"
                                placeholder={t('contact.placeholder.email')}
                            />
                            {errors.email && (
                                <p className="mt-1 text-sm text-red-500 dark:text-red-400">{errors.email.message}</p>
                            )}
                        </div>

                        {/* Subject Field */}
                        <div>
                            <label htmlFor="subject" className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-2">
                                {t('contact.subject')} *
                            </label>
                            <input
                                id="subject"
                                type="text"
                                {...register('subject', { required: t('contact.validation.subjectRequired') })}
                                className="input-field"
                                placeholder={t('contact.placeholder.subject')}
                            />
                            {errors.subject && (
                                <p className="mt-1 text-sm text-red-500 dark:text-red-400">{errors.subject.message}</p>
                            )}
                        </div>

                        {/* Message Field */}
                        <div>
                            <label htmlFor="message" className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-2">
                                {t('contact.message')} *
                            </label>
                            <textarea
                                id="message"
                                rows={5}
                                {...register('message', {
                                    required: t('contact.validation.messageRequired'),
                                    minLength: {
                                        value: 10,
                                        message: t('contact.validation.messageMin'),
                                    },
                                })}
                                className="textarea-field"
                                placeholder={t('contact.placeholder.message')}
                            />
                            {errors.message && (
                                <p className="mt-1 text-sm text-red-500 dark:text-red-400">{errors.message.message}</p>
                            )}
                        </div>

                        {/* Submit Button */}
                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className="w-full btn-primary flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {isSubmitting ? (
                                <>
                                    <div className="spinner" />
                                    <span>{t('contact.sending')}</span>
                                </>
                            ) : (
                                <>
                                    <Send className="w-5 h-5" />
                                    <span>{t('contact.send')}</span>
                                </>
                            )}
                        </button>
                    </form>
                </motion.div>
            </div>
        </section>
    );
};

export default Contact;
