import { Moon, Sun } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';
import { motion } from 'framer-motion';

const ThemeToggle = () => {
    const { theme, toggleTheme, isDark } = useTheme();

    return (
        <motion.button
            onClick={toggleTheme}
            className="relative p-2 rounded-lg glass-card hover:bg-white/10 transition-all duration-300 group"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            aria-label={`Switch to ${isDark ? 'light' : 'dark'} mode`}
        >
            <div className="relative w-6 h-6">
                {/* Sun Icon */}
                <motion.div
                    initial={false}
                    animate={{
                        scale: isDark ? 0 : 1,
                        rotate: isDark ? 90 : 0,
                        opacity: isDark ? 0 : 1,
                    }}
                    transition={{ duration: 0.3 }}
                    className="absolute inset-0"
                >
                    <Sun className="w-6 h-6 text-amber-500" />
                </motion.div>

                {/* Moon Icon */}
                <motion.div
                    initial={false}
                    animate={{
                        scale: isDark ? 1 : 0,
                        rotate: isDark ? 0 : -90,
                        opacity: isDark ? 1 : 0,
                    }}
                    transition={{ duration: 0.3 }}
                    className="absolute inset-0"
                >
                    <Moon className="w-6 h-6 text-sky-400" />
                </motion.div>
            </div>

            {/* Tooltip */}
            <span className="absolute -bottom-10 left-1/2 -translate-x-1/2 px-2 py-1 bg-dark-800 dark:bg-dark-700 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
                {isDark ? 'Light mode' : 'Dark mode'}
            </span>
        </motion.button>
    );
};

export default ThemeToggle;
