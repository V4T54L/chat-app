import { Message } from "../components/Chat/types";

export interface AddMessageAction {
    chatId: string;
    message: Message;
}

export interface BroadcastMessage {
    text: string
}