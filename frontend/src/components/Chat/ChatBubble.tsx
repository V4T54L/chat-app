import React from 'react'

interface ChatBubbleProps {
    message: string;
    time: string;
    status: string;
    senderName: string;
    senderAvatar: string;
    isUser: boolean;
}

const ChatBubble: React.FC<ChatBubbleProps> = ({ isUser, message, senderName, senderAvatar, status, time }) => {
    return (
        <>
            <div className={`chat ${isUser ? "chat-end" : "chat-start"}`}>
                <div className="chat-image avatar">
                    <div className="w-10 rounded-full">
                        <img
                            alt={senderName}
                            src={senderAvatar} />
                    </div>
                </div>
                <div className="chat-header flex gap-8">
                    <p className="">
                        {senderName}
                    </p>
                    <time className="text-xs opacity-50">{time}</time>
                </div>
                <div className="chat-bubble">{message}</div>
                <div className="chat-footer opacity-50">{status}</div>
            </div>
        </>
    )
}

export default ChatBubble