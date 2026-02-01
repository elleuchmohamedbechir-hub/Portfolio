import { send } from '@emailjs/browser';

const SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID;
const TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
const PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

/**
 * Sends an email using EmailJS
 * @param {Object} data - The form data containing name, email, subject, message
 * @returns {Promise} - The EmailJS response
 */
export const sendEmail = async (data) => {
    // Validate configuration
    if (!SERVICE_ID || !TEMPLATE_ID || !PUBLIC_KEY) {
        if (import.meta.env.DEV) {
            console.warn(`Missing EmailJS Config: 
               Service ID: ${!!SERVICE_ID}
               Template ID: ${!!TEMPLATE_ID}
               Public Key: ${!!PUBLIC_KEY}`);
        }
        throw new Error('Email service configuration is missing. Please check your environment variables.');
    }

    // Validate form data
    if (!data.name || !data.email || !data.subject || !data.message) {
        throw new Error('Please fill in all required fields.');
    }

    const templateParams = {
        name: data.name,
        email: data.email,
        sujet: data.subject,
        message: data.message,
        time: new Date().toLocaleString(),
        name_initial: data.name.charAt(0).toUpperCase(),
    };

    try {
        const response = await send(
            SERVICE_ID,
            TEMPLATE_ID,
            templateParams,
            PUBLIC_KEY
        );

        if (import.meta.env.DEV) {
            console.log('Email sent successfully:', response.status, response.text);
        }

        return response;
    } catch (error) {
        console.error('EmailJS API Error:', error);
        throw new Error('Failed to send email. Please try again later.');
    }
};
