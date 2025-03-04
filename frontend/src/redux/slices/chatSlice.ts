import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Conversation, User } from '../../components/Chat/types';
import { AddMessageAction } from '../../constants/types';

interface ChatState {
    chats: Map<string, Conversation>;
    user: User;
    loading: boolean;
    error: string | null;
}

const initialState: ChatState = {
    chats: new Map<string, Conversation>(),
    user: {
        avatar: "", id: "", name: "", status: "away",
    },
    loading: false,
    error: null,
};

const chatSlice = createSlice({
    name: 'chats',
    initialState,
    reducers: {
        addMessageToConversation(state, action: PayloadAction<AddMessageAction>) {
            if (!state.chats.has(action.payload.chatId)) {
                return
            }
            const messages = state.chats.get(action.payload.chatId)?.messages
            messages!.push(action.payload.message)
        },

        addConversation(state, action: PayloadAction<Conversation>) {
            if (!state.chats.has(action.payload.id)) {
                state.chats.set(action.payload.id, action.payload)
            }
        },

        setChats(state, action: PayloadAction<Map<string, Conversation>>) {
            state.chats = action.payload;
        },

        setUser(state, action: PayloadAction<User>) {
            state.user = action.payload;
        },
        // fetchTodosStart(state) {
        //     state.loading = true;
        //     state.error = null;
        // },
        // fetchTodosSuccess(state, action: PayloadAction<Todo[]>) {
        //     state.loading = false;
        //     state.todos = action.payload;
        // },
        // fetchTodosFailure(state, action: PayloadAction<string>) {
        //     state.loading = false;
        //     state.error = action.payload;
        //     state.todos = [];
        // },
        // addTodoSuccess(state, action: PayloadAction<Todo>) {
        //     state.todos.push(action.payload);
        // },
        // updateTodoSuccess(state, action: PayloadAction<Todo>) {
        //     const updatedTodo = action.payload;
        //     state.todos = state.todos.map(todo => todo.id === updatedTodo.id ? updatedTodo : todo);
        // },
        // deleteTodoSuccess(state, action: PayloadAction<number>) {
        //     const idToDelete = action.payload;
        //     state.todos = state.todos.filter(todo => todo.id !== idToDelete);
        // },
        // clearTodosError(state) {
        //     state.error = null;
        // }
    },
});

export const {
    addConversation,
    addMessageToConversation,
    setUser,
    setChats,
} = chatSlice.actions;

export default chatSlice.reducer;