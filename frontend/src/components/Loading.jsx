import { motion } from 'framer-motion';

const Loading = ({ fullScreen = false }) => {
    if (fullScreen) {
        return (
            <div className="fixed inset-0 flex items-center justify-center bg-dark-950 z-50">
                <div className="text-center">
                    <motion.div
                        animate={{
                            scale: [1, 1.2, 1],
                            rotate: [0, 180, 360],
                        }}
                        transition={{
                            duration: 2,
                            repeat: Infinity,
                            ease: 'easeInOut',
                        }}
                        className="w-16 h-16 mx-auto mb-4 border-4 border-primary-500/30 border-t-primary-500 rounded-full"
                    />
                    <p className="text-dark-300">Loading...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="flex items-center justify-center py-12">
            <div className="spinner text-primary-500" />
        </div>
    );
};

export default Loading;
