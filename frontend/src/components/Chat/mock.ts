import { Conversation, Message, User } from "./types";

export const mockMessages: Record<string, Message[]> = {
    '1': [
        {
            id: '1001',
            content: 'Hey! How are you?',
            senderId: '2',
            timestamp: new Date(Date.now() - 1000 * 60 * 60),
            status: 'read'
        },
        {
            id: '1002',
            content: 'I\'m doing great! Just finished that project we talked about.',
            senderId: '1',
            timestamp: new Date(Date.now() - 1000 * 60 * 30),
            status: 'delivered'
        },
        {
            id: '1003',
            content: 'That\'s awesome! Would love to see it sometime.',
            senderId: '2',
            timestamp: new Date(Date.now() - 1000 * 60 * 5),
            status: 'read'
        }
    ]
};

export const mockConversations: Conversation[] = [
    {
        id: '1',
        type: 'direct',
        participants: [
            {
                id: '2',
                name: 'Sarah Wilson',
                avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop',
                status: 'online'
            }
        ],
        lastMessage: {
            id: '101',
            content: 'Hey, how are you doing?',
            senderId: '2',
            timestamp: new Date(Date.now() - 1000 * 60 * 5),
            status: 'read'
        },
        unreadCount: 0,
        messages: mockMessages['1']
    },
    {
        id: '2',
        type: 'direct',
        participants: [
            {
                id: '3',
                name: 'Michael Chen',
                avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop',
                status: 'offline'
            }
        ],
        lastMessage: {
            id: '102',
            content: 'The project is coming along nicely!',
            senderId: '1',
            timestamp: new Date(Date.now() - 1000 * 60 * 30),
            status: 'delivered'
        },
        unreadCount: 0,
        messages: []
    },
    {
        id: '3',
        type: 'group',
        participants: [
            {
                id: '4',
                name: 'Emma Davis',
                avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop',
                status: 'online'
            },
            {
                id: '5',
                name: 'James Rodriguez',
                avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop',
                status: 'away'
            }
        ],
        lastMessage: {
            id: '103',
            content: 'When is our next team meeting?',
            senderId: '4',
            timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2),
            status: 'sent'
        },
        unreadCount: 3,
        messages: []
    }
];

export const mockUser: User = {
    id: '1',
    name: 'John Doe',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop',
    status: 'online',
};