import React, { useState } from 'react';
import { Contact, formatDate, Message } from './types';
import { motion } from 'framer-motion';
import { Lock } from 'lucide-react';

interface ChatViewProps {
    messages: Message[];
    currentUser: Contact | undefined;
}

const ChatView: React.FC<ChatViewProps> = ({ messages, currentUser }) => {
    const [messageInput, setMessageInput] = useState('');

    if (!currentUser) {
        return (
            <div className="flex flex-col items-center justify-center h-full">
                <h2 className="text-center text-5xl font-bold my-8">Chatify</h2>
                <div className="flex items-center mb-4">
                    <Lock className='w-4 mr-2' />
                    <p className="text-sm">Your personal messages are end-to-end encrypted</p>
                </div>
            </div>
        );
    }

    const handleMessageSend = (e:React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        // Logic to send the message
        // For example: sendMessage({ content: messageInput, senderId: currentUser.id, timestamp: new Date(), status: 'sent' });
        console.log('Sending message:', messageInput);
        setMessageInput(''); // Clear the input after sending
    };

    return (
        <div className="flex flex-col h-full">
            <header className="bg-primary-content p-4 rounded-lg shadow">
                <div className="flex items-center">
                    <img src={currentUser.avatarUrl} alt={currentUser.name} className="w-10 h-10 rounded-full mr-3" />
                    <div>
                        <h1 className="text-2xl font-semibold">{currentUser.name}</h1>
                        <p className={`text-xs ${currentUser.status === 'online' ? 'text-green-500' : 'text-yellow-500'}`}>
                            {currentUser.status === "online" ? "🟢 Online" : "🟡 Offline"}
                        </p>
                    </div>
                </div>
            </header>

            <ul className="overflow-y-auto flex-1 p-4 space-y-2">
                {messages.map((message) => (
                    <motion.li
                        key={message.id}
                        className={`flex flex-col ${message.senderId === currentUser.id ? 'items-end' : 'items-start'}`}
                        whileHover={{ scale: 1.02 }}
                    >
                        <div className={`p-2 rounded-lg ${message.senderId === currentUser.id ? 'bg-primary text-white' : 'bg-secondary text-gray-800'}`}>
                            {message.content}
                        </div>
                        <div className="flex items-center mt-1 text-sm text-gray-500">
                            <span>{formatDate(message.timestamp)}</span>
                            <span className="ml-2">{message.status}</span>
                        </div>
                    </motion.li>
                ))}
            </ul>

            <div className="p-4 border-t border-gray-200">
                <form onSubmit={handleMessageSend} className="flex">
                    <input 
                        type="text" 
                        value={messageInput}
                        onChange={(e) => setMessageInput(e.target.value)}
                        placeholder="Type a message..."
                        className="input input-bordered flex-1 mr-2"
                    />
                    <button 
                    type='submit'
                        className="btn btn-primary"
                    >
                        Send
                    </button>
                </form>
            </div>
        </div>
    );
};


export default ChatView;