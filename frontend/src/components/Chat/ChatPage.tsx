import React, { useState } from 'react'
import { mockUser } from './mock'
import { LogOut, Settings, UserIcon } from 'lucide-react'
import ConversationList from './ConversationList'
import MainChatArea from './MainChatArea'

const ChatPage: React.FC = () => {
    const [activeConversation, setActiveConversation] = useState("")

    return (
        <div data-theme="cupcake">
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
                                        <img src={mockUser?.avatar} alt={mockUser?.name} />
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
                            <h2 className="font-semibold">{mockUser?.name}</h2>
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