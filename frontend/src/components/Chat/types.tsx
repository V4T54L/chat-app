export interface Attachment {
    id: string;
    type: 'image' | 'file';
    url: string;
    name: string;
    size: number;
}

export interface Message {
    id: string;
    content: string;
    senderId: string;
    timestamp: Date;
    status: 'sent' | 'delivered' | 'read';
    attachments?: Attachment[];
}

// export interface Conversation {
//     id: string;
//     name: string;
//     avatarUrl: string;
//     status: 'online' | 'offline';
//     type: 'direct' | 'group';
//     lastMessage?: Message;
//     unreadCount: number;
//     participants?: User[];
// }

export interface Conversation {
    id: string;
    type: 'direct' | 'group';
    participants: User[];
    lastMessage?: Message;
    unreadCount: number;
    messages: Message[];
}

export interface User {
    id: string;
    name: string;
    avatar: string;
    status: 'online' | 'offline' | 'away';
}

export const formatDate = (date: Date): string => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
};