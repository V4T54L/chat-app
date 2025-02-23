export interface Message {
    id: string;
    content: string;
    senderId: string;
    timestamp: Date;
    status: 'sent' | 'delivered' | 'read';
}

export interface Contact {
    id: string;
    name: string;
    avatarUrl: string;
    status: 'online' | 'offline';
}

export const formatDate = (date: Date): string => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
};