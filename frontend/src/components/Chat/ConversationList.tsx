import React from 'react'
import { mockConversations } from './mock';
import { formatDate } from './types';

interface ConversationListProps {
    activeConversation: string;
    setActiveConversation: (act: string) => void;
}

const ConversationList: React.FC<ConversationListProps> = ({ activeConversation, setActiveConversation }) => {
    const MAX_LENGTH = 20

    return (
        <div className="space-y-2">
            {mockConversations.map((conversation) => {
                const participant = conversation.participants[0];
                const isActive = activeConversation === conversation.id;
                const content = conversation.lastMessage?.content + ""
                const truncatedContent = content.length > MAX_LENGTH ? content.substring(0, MAX_LENGTH) + '...' : content;

                return (
                    <button
                        key={conversation.id}
                        onClick={() => setActiveConversation(conversation.id)}
                        className={`w-full p-3 rounded-lg flex items-center gap-3 transition-colors ${isActive ? 'bg-primary/5 hover:bg-primary/10' : 'hover:bg-primary/15'
                            }`}
                    >
                        <div className="relative w-12 h-12">
                            <img
                                src={participant.avatar}
                                alt={participant.name}
                                className="w-12 h-12 rounded-full"
                            />
                            <div
                                className={`absolute bottom-0 right-0 w-3 h-3 border-2 border-white rounded-full ${participant.status === 'online'
                                    ? 'bg-green-500'
                                    : participant.status === 'away'
                                        ? 'bg-yellow-500'
                                        : 'bg-gray-500'
                                    }`}
                            />
                        </div>
                        <div className="flex-1 text-left">
                            <div className="flex justify-between items-start">
                                <h3 className="font-medium">{participant.name}</h3>
                                {conversation.lastMessage && (
                                    <span className="text-xs text-gray-500">
                                        {/* {formatDate(conversation.lastMessage.timestamp, 'HH:mm')} */}
                                        {formatDate(conversation.lastMessage.timestamp)}
                                    </span>
                                )}
                            </div>
                            {conversation.lastMessage && (
                                <p className="text-sm text-gray-500 truncate">
                                    {truncatedContent}
                                </p>
                            )}
                        </div>
                        {conversation.unreadCount > 0 && (
                            <div className="bg-primary text-white text-xs font-medium rounded-full w-5 h-5 flex items-center justify-center">
                                {conversation.unreadCount}
                            </div>
                        )}
                    </button>
                );
            })}
        </div>
    )
}

export default ConversationList