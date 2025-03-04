import React from 'react';
import { Send, Paperclip, Smile } from 'lucide-react';
import EmojiPicker from 'emoji-picker-react';
import { useSocket } from '../../contexts/SocketContext';
import { SEND_MESSAGE_REQUEST } from '../../constants/constant';
import { AddMessageAction } from '../../constants/types';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';

interface ChatInputProps {
    conversationId: string;
}

export default function ChatInput({ conversationId }: ChatInputProps) {
    const socket = useSocket()
    const currentUserId = useSelector((state: RootState) => state.chats.user.id)
    const [message, setMessage] = React.useState('');
    const [showEmojiPicker, setShowEmojiPicker] = React.useState(false);
    const sendMessage = (conversationId: string, content: string) => {
        if (!socket) {
            return;
        }

        const msg: AddMessageAction = {
            chatId: conversationId,
            message: {
                content: content,
                senderId: currentUserId,
                status: "sent", // Doesn't really matter; will be set on server
                timestamp: "",  // Doesn't really matter; will be set on server
                id: "",         // Doesn't really matter; will be set on server
            }
        }

        socket.send(SEND_MESSAGE_REQUEST, msg)
    };
    const setTyping = (conversationId: string, userId: string, isTyping: boolean) => { console.log(`User ${userId} ${isTyping ? " is typing" : "stopped typing"} in ${conversationId}`) };
    const typingTimeoutRef = React.useRef<ReturnType<typeof setTimeout> | null>();

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (message.trim()) {
            sendMessage(conversationId, message.trim());
            setMessage('');
            setShowEmojiPicker(false);
        }
    };

    const handleTyping = () => {
        setTyping(conversationId, '1', true);

        if (typingTimeoutRef.current) {
            clearTimeout(typingTimeoutRef.current);
        }

        typingTimeoutRef.current = setTimeout(() => {
            setTyping(conversationId, '1', false);
        }, 3000);
    };

    return (
        <form onSubmit={handleSubmit} className="relative">
            {showEmojiPicker && (
                <div className="absolute bottom-full right-0 mb-2">
                    <EmojiPicker
                        onEmojiClick={(emojiData) => {
                            setMessage((prev) => prev + emojiData.emoji);
                        }}
                    />
                </div>
            )}
            <div className="flex items-center gap-2">
                <button
                    type="button"
                    className="p-2 hover:bg-neutral-content rounded-full"
                    onClick={() => { }}
                >
                    <Paperclip className="w-5 h-5 text-base-content" />
                </button>
                <button
                    type="button"
                    className="p-2 hover:bg-neutral-content rounded-full"
                    onClick={() => setShowEmojiPicker(!showEmojiPicker)}
                >
                    <Smile className="w-5 h-5 text-base-content" />
                </button>
                <input
                    type="text"
                    value={message}
                    onChange={(e) => {
                        setMessage(e.target.value);
                        handleTyping();
                    }}
                    placeholder="Type a message..."
                    className="flex-1 px-4 py-2 rounded-full border border-primary focus:outline-none focus:border-primary"
                />
                <button
                    type="submit"
                    disabled={!message.trim()}
                    className="p-2 bg-primary text-base-100 rounded-full disabled:opacity-50 disabled:cursor-not-allowed hover:bg-primary/90"
                >
                    <Send className="w-5 h-5" />
                </button>
            </div>
        </form>
    );
}