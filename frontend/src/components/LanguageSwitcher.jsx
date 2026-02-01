import React from 'react';
import { useTranslation } from 'react-i18next';
import { Globe } from 'lucide-react';

const LanguageSwitcher = () => {
    const { i18n } = useTranslation();

    const toggleLanguage = () => {
        const newLang = i18n.language.startsWith('fr') ? 'en' : 'fr';
        i18n.changeLanguage(newLang);
        // Also persist to localStorage manually if needed, though plugin does it
        localStorage.setItem('i18nextLng', newLang);
    };

    return (
        <button
            onClick={toggleLanguage}
            className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-gray-200 dark:hover:bg-white/10 transition-colors text-sm font-medium text-gray-700 dark:text-slate-200"
            title={i18n.language.startsWith('fr') ? "Switch to English" : "Passer en Français"}
        >
            <Globe className="w-4 h-4" />
            <span>{i18n.language.startsWith('fr') ? 'FR' : 'EN'}</span>
        </button>
    );
};

export default LanguageSwitcher;
