import React from 'react';
import { motion } from 'framer-motion';
import { Contact } from './types';

interface ChatListProps {
    contacts: Contact[];
    onSelectContact: (contactId: string) => void;
}

const ChatList: React.FC<ChatListProps> = ({ contacts, onSelectContact }) => {
    return (
        <div className="overflow-y-auto h-full p-4">
            <h1 className="text-xl text-primary font-bold">Chatify</h1>
            <ul className="mt-4 space-y-2">
                {contacts.map((contact) => (
                    <motion.li
                        key={contact.id}
                        className="flex items-center p-2 rounded-lg hover:bg-accent transition-colors cursor-pointer"
                        onClick={() => onSelectContact(contact.id)}
                        whileHover={{ scale: 1.02 }}
                    >
                        <img
                            src={contact.avatarUrl}
                            alt={contact.name}
                            className="w-10 h-10 rounded-full"
                        />
                        <div className="ml-3">
                            <span className={`font-semibold ${contact.status === 'online' ? 'text-success' : 'text-gray-500'}`}>
                                {contact.name}
                            </span>
                            <span className="block text-sm text-gray-400">{contact.status}</span>
                        </div>
                    </motion.li>
                ))}
            </ul>
        </div>
    );
};

export default ChatList;