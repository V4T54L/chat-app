import React from "react";
import { motion } from "framer-motion";

const Onboarding: React.FC = () => {
  return (
    <div className="flex flex-col items-center p-6">
      <motion.h2
        className="text-3xl font-bold mb-2"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        Welcome to the App!
      </motion.h2>
      <motion.p
        className="text-center mb-4"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        Connect with your friends, create groups, and chat effortlessly!
      </motion.p>
      <motion.div
        className="flex flex-col space-y-4"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, delay: 0.4 }}
      >
        <span>✨ Real-time messaging</span>
        <span>📞 Voice & Video calls</span>
        <span>🔒 Secure and private</span>
      </motion.div>
    </div>
  );
};

export default Onboarding;