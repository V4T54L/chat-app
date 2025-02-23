import React from 'react';
import { Contact, Message } from './types';
import ChatList from './ChatList';
import ChatView from './ChatView';

const ChatPage: React.FC = () => {
    const [selectedContactId, setSelectedContactId] = React.useState<string>("");

    const contacts: Contact[] = [
        {
            id: '1',
            name: 'John Doe',
            avatarUrl: 'https://placehold.co/40',
            status: 'online',
        },
        {
            id: '2',
            name: 'Jane Smith',
            avatarUrl: 'https://placehold.co/40',
            status: 'offline',
        },
    ];

    const messages: Message[] = [
        {
            id: '1',
            content: 'Hello!',
            senderId: '1',
            timestamp: new Date(),
            status: 'sent',
        },
        {
            id: '2',
            content: 'Hi there!',
            senderId: '2',
            timestamp: new Date(),
            status: 'read',
        },
    ];

    return (
        <div className="flex h-screen">
            <ChatList contacts={contacts} onSelectContact={setSelectedContactId} />
            <div className="flex-1 border-l">
                <ChatView messages={messages} currentUser={contacts.find(contact => contact.id == selectedContactId)} />
            </div>
        </div>
    );
};

export default ChatPage;