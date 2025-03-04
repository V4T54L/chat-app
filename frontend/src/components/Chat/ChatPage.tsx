import React, { useEffect, useState } from 'react'
import { LogOut, Settings, UserIcon } from 'lucide-react'
import ConversationList from './ConversationList'
import MainChatArea from './MainChatArea'
import { useSocket } from '../../contexts/SocketContext'
import { ACTIVE_USERS, NEW_CONN_BROADCAST, NEW_CONN_JOINED, SEND_MESSAGE_RESPONSE, USER_INFO } from '../../constants/constant'
import { User, Conversation } from "./types"
import { useDispatch, useSelector } from 'react-redux'
import { addConversation, addMessageToConversation, setChats, setUser } from '../../redux/slices/chatSlice'
import { AddMessageAction } from '../../constants/types'
import { RootState } from '../../redux/store'

const ChatPage: React.FC = () => {
    const [activeConversation, setActiveConversation] = useState("")
    const socket = useSocket()
    const user = useSelector((state: RootState) => state.chats.user)

    const dispatch = useDispatch()

    useEffect(() => {
        if (!socket) {
            return
        }

        const handleActiveChatsEvent = (data: User[]) => {
            const chats: Map<string, Conversation> = new Map();

            data.forEach(e => {
                const conversation: Conversation = {
                    id: e.name,
                    participants: [e],
                    type: "direct",
                    messages: [],
                    unreadCount: 0,
                };
                chats.set(conversation.id, conversation); // Use the conversation id as the key
            });
            dispatch(setChats(chats))
        }

        const handleNewConnectionBroadcast = (user: User) => {
            const conversation: Conversation = {
                id: user.name,
                participants: [user],
                type: "direct",
                messages: [],
                unreadCount: 0,
            };
            dispatch(addConversation(conversation))
        }

        const handleMessageReceived = (action: AddMessageAction) => {
            dispatch(addMessageToConversation(action))
        }

        const handleSetUserInfo = (user: User) => {
            dispatch(setUser(user))
        }

        socket.on(ACTIVE_USERS, handleActiveChatsEvent)
        socket.on(NEW_CONN_BROADCAST, handleNewConnectionBroadcast)
        socket.on(SEND_MESSAGE_RESPONSE, handleMessageReceived)
        socket.on(USER_INFO, handleSetUserInfo)

        socket.send(NEW_CONN_JOINED, {})

        return () => {
            socket.off(USER_INFO, handleSetUserInfo)
            socket.off(SEND_MESSAGE_RESPONSE, handleMessageReceived)
            socket.off(NEW_CONN_BROADCAST, handleNewConnectionBroadcast)
            socket.off(ACTIVE_USERS, handleActiveChatsEvent)
        }
    }, [socket, dispatch])

    return (
        <div data-theme="dark">
            <div className="drawer lg:drawer-open">
                <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
                <div className="drawer-content flex flex-col items-center justify-center">

                    <main className="flex-1 w-full h-full
             flex flex-col">
                        <MainChatArea conversationId={activeConversation} />
                    </main>
                </div>

                <div className="drawer-side">
                    <label htmlFor="my-drawer-2" aria-label="close sidebar" className="drawer-overlay"></label>
                    <div className="menu bg-base-200 text-base-content min-h-full w-80 p-4">

                        {/* User Menu */}
                        <div className="flex border-b border-base-100 items-center gap-3 pb-4">
                            <div className="dropdown">
                                <div tabIndex={0} className="avatar" role="button">
                                    <div className="w-10 rounded-full cursor-pointer">
                                        <img src={user?.avatar} alt={user?.name} />
                                    </div>
                                </div>
                                <ul tabIndex={0} className="dropdown-content menu bg-base-100 rounded-box z-[1] w-52 p-2 shadow">
                                    <li><div className='btn btn-ghost justify-start'>
                                        <UserIcon className="w-4 h-4" />
                                        Profile
                                    </div></li>
                                    <li><div className='btn btn-ghost justify-start'>
                                        <Settings className="w-4 h-4" />
                                        Settings
                                    </div></li>
                                    <div className="divider p-0 m-0"></div>
                                    <li><div className='btn btn-ghost text-error justify-start'>
                                        <LogOut className="w-4 h-4" />
                                        Log out
                                    </div></li>
                                </ul>
                            </div>
                            <h2 className="font-semibold">{user?.name}</h2>
                        </div>

                        <label className="input input-bordered flex items-center gap-2 my-4">
                            <input type="text" className="grow" placeholder="Search" />
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 16 16"
                                fill="currentColor"
                                className="h-4 w-4 opacity-70">
                                <path
                                    fillRule="evenodd"
                                    d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
                                    clipRule="evenodd" />
                            </svg>
                        </label>


                        <div className="flex-1 overflow-y-auto w-full">
                            <ConversationList activeConversation={activeConversation} setActiveConversation={setActiveConversation} />
                        </div>

                    </div>
                </div>

            </div>
        </div>
    )
}

export default ChatPage