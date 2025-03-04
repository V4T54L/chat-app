import React from 'react'
import ChatBubble from './ChatBubble';
import { Menu } from 'lucide-react';
import ChatInput from './ChatInput';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';

interface MainChatAreaProps {
    conversationId: string;
}

const MainChatArea: React.FC<MainChatAreaProps> = ({ conversationId }) => {
    const chats = useSelector((state: RootState) => state.chats.chats)
    const currentUser = useSelector((state: RootState) => state.chats.user)
    const currentChat = chats.find(e => e.id === conversationId)
    const currentConversation = currentChat
    const messages = currentChat?.messages

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
                        const isUser = msg.senderId === currentUser.name
                        const user = isUser && currentConversation ? currentUser : currentConversation!.participants[0]
                        console.log("\n\n\n Messages : ", messages)
                        console.log("CurrentUser : ", currentUser)
                        console.log("Other : ", user)
                        return <ChatBubble key={msg.id} isUser={isUser} message={msg.content}
                            senderAvatar={user.avatar} senderName={isUser ? "You" : user.name}
                            status={msg.status} time={msg.timestamp} />
                    })
                }
            </div >


            {conversationId && (
                <div className="p-4 bg-base-100 border-t border-base-300">
                    <ChatInput conversationId={conversationId} />
                </div>
            )}

        </>
    )
}

export default MainChatArea