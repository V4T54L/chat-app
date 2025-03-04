import React, { useEffect, useState } from 'react';
import { useSocket } from '../contexts/SocketContext';
import { sendMessage } from '../utils/socketUtils';
import { BroadcastMessage } from '../constants/types';
import { MESSAGE_RECEIVED_TYPE_BROADCAST } from '../constants/constant';
import { useDispatch } from 'react-redux';
// import styles from './ChatPage.module.css';

interface ChatMessage {
    key: number,
    user: string;
    text: string;
}

interface Props {
    username: string;
}

const ChatPage: React.FC<Props> = ({ username }) => {
    const socket = useSocket()
    const [messages, setMessages] = useState<ChatMessage[]>([]);
    const [newMessage, setNewMessage] = useState('');
    const dispatch = useDispatch()

    console.log("Chat Page Loaded")

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const message = newMessage.trim();
        if (socket && message) {
            setNewMessage("")
            sendMessage(socket, `${username}:${message}`)
        }
    };

    const messagesList = messages.map((message) => (
        <div key={message.user + message.key} className="mb-2">
            <strong>{message.user}:</strong> <span>{message.text}</span>
        </div>
    ));

    const handleMessageReceived = (data: BroadcastMessage) => {
        if (!data.text || typeof data.text !== 'string') {
            console.error("Received an invalid message:", data);
            return;
        }

        const [username, ...msgs] = data.text.split(":").map(part => part.trim());

        if (!username || msgs.length === 0 || msgs.join(':').trim() === '') {
            console.warn("Received a message without a valid username or content:", data);
            return;
        }

        const date = new Date()

        const newMessageObj = {
            key: date.getMilliseconds(),
            user: username,
            text: msgs.join(':'),
        };

        setMessages(prev => [...prev, newMessageObj]);
    };

    useEffect(() => {
        if (!socket) {
            return
        }
        socket.on(MESSAGE_RECEIVED_TYPE_BROADCAST, handleMessageReceived)

        return () => {
            socket.off(MESSAGE_RECEIVED_TYPE_BROADCAST, handleMessageReceived)
        };

    }, [socket])

    return (
        <div className="h-screen p-6 bg-gray-100 flex flex-col items-center">
            {/* Your messages list and form should be inside this section */}
            <div className="w-full max-w-md bg-white p-6 rounded-lg shadow-lg">
                <h2 className="text-2xl font-bold text-gray-800 mb-4">Chat Room</h2>
                <div className="flex justify-between mb-4">
                    <button
                        type="button"
                        className="text-sm text-red-600"
                        onClick={() => alert('Leaving the chat...')}
                    >
                        Leave Chat
                    </button>
                </div>
                <div className="overflow-y-auto h-64 border border-gray-300 p-4 rounded-lg mb-4">
                    {messagesList} {/* Messages should be rendered here */}
                </div>
                <form onSubmit={handleSubmit} className="flex">
                    <input
                        id="message"
                        name="message"
                        type="text"
                        placeholder="Type your message..."
                        className="border border-gray-300 rounded-lg p-2 flex-grow mr-4"
                        value={newMessage}
                        onChange={(event) => setNewMessage(event.target.value)}
                    />
                    <button
                        type="submit"
                        className="bg-blue-500 text-white rounded-lg px-4 py-2"
                    // onClick={handleSubmit}
                    >
                        Send
                    </button>
                </form>
            </div>
        </div>
    );
};

export default ChatPage;