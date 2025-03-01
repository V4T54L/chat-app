import React from 'react'
import { mockConversations, mockMessages, mockUser } from './mock'
import ChatBubble from './ChatBubble';
import { formatDate } from './types';
import { Menu } from 'lucide-react';
import ChatInput from './ChatInput';

interface MainChatAreaProps {
    conversationId: string;
}

const MainChatArea: React.FC<MainChatAreaProps> = ({ conversationId }) => {
    const messages = mockMessages[conversationId]
    const currentConversation = mockConversations.find(e => e.id === conversationId)

    return (
        <>
            <header className="h-16 bg-base-200 flex items-center px-4">
                <label htmlFor="my-drawer-2" className="btn btn-ghost drawer-button lg:hidden">
                    <Menu />
                </label>


                {currentConversation && (
                    <div className="flex items-center gap-3">
                        <img
                            src={currentConversation.participants[0].avatar}
                            alt={currentConversation.participants[0].name}
                            className="w-10 h-10 rounded-full"
                        />
                        <div>
                            <h1 className="font-semibold">
                                {currentConversation.participants[0].name}
                            </h1>
                            {/* {typingUsers[
                                `${currentConversation.id}-${currentConversation.participants[0].id}`
                            ] && <p className="text-sm text-gray-500">Typing...</p>} */}
                        </div>
                    </div>
                )}

            </header>


            <div className="flex-1 overflow-y-auto p-4">

                {
                    messages?.map((msg) => {
                        return <ChatBubble key={msg.id} isUser={msg.senderId === mockUser.id} message={msg.content}
                            senderAvatar={mockUser.avatar} senderName={(msg.senderId === mockUser.id) ? "You" : "Ditto"}
                            status={msg.status} time={formatDate(msg.timestamp)} />
                    })
                }
            </div >


            {conversationId && (
                <div className="p-4 bg-white border-t border-gray-200">
                    <ChatInput conversationId={conversationId} />
                </div>
            )}

        </>
    )
}

export default MainChatArea