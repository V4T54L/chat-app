import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { MessageSquare, UserPlus, Lock, PhoneCall } from 'lucide-react';
import AuthModal from './AuthModal';

const LandingPage: React.FC = () => {
    const [isModalOpen, setModalOpen] = useState(false);

    const toggleModal = () => {
        setModalOpen((prev) => !prev);
    };
    return (
        <div className="min-h-screen flex flex-col justify-center items-center bg-base-200 text-base-content p-4">
            <motion.h1
                className="text-5xl font-bold mb-4 text-primary"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
            >
                Chatify
            </motion.h1>

            <motion.p
                className="text-lg mb-8 max-w-md text-center"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
            >
                Instant Chat Application using Websockets, TypeScript, and Go 🔥
            </motion.p>

            <ul className="list-disc list-inside space-y-4 mb-8">
                <motion.li
                    className="flex items-center"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.4 }}
                >
                    <MessageSquare className="mr-2 text-secondary" /> Sending and receiving text messages 💬
                </motion.li>
                <motion.li
                    className="flex items-center"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.6 }}
                >
                    <UserPlus className="mr-2 text-accent" /> Creating and managing group chats 👥
                </motion.li>
                <motion.li
                    className="flex items-center"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.8 }}
                >
                    <PhoneCall className="mr-2 text-warning" /> Making voice and video calls 📞
                </motion.li>
                <motion.li
                    className="flex items-center"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 1 }}
                >
                    <Lock className="mr-2 text-error" /> Ensuring end-to-end encryption 🔐
                </motion.li>
            </ul>

            <motion.div
                className="flex justify-center"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 1.2 }}
            >
                <button className="btn btn-primary" onClick={toggleModal}>
                    Get Started 🚀
                </button>
            </motion.div>

            <AuthModal isOpen={isModalOpen} onClose={toggleModal} />
        </div>
    );
};

export default LandingPage;