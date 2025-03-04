export const SERVER_API_URL: string = import.meta.env.VITE_API_BASE_URL;
export const SERVER_WS_URL: string = import.meta.env.VITE_WS_BASE_URL;
// const PING_INTERVAL_MS: number = 5000;
// const MESSAGE_TYPE_BROADCAST: string = 'broadcast';
// const MESSAGE_RECEIVED_TYPE_BROADCAST: string = 'broadcastResponse';
// const MESSAGE_TYPE_PING: string = 'ping';

export const NEW_CONN_JOINED = "ncj"
export const NEW_CONN_BROADCAST = "ncb"
export const ACTIVE_USERS = "au"
export const SEND_MESSAGE_REQUEST = "smc"
export const SEND_MESSAGE_RESPONSE = "sms"
export const USER_INFO = "ui"

// export {SERVER_URL, PING_INTERVAL_MS, MESSAGE_TYPE_BROADCAST, MESSAGE_TYPE_PING, MESSAGE_RECEIVED_TYPE_BROADCAST}