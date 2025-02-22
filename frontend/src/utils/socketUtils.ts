import { WebSocketClient } from "socketify-client";
import { MESSAGE_TYPE_BROADCAST, MESSAGE_TYPE_PING, PING_INTERVAL_MS } from "../constants/constant";
import { MiddlewareFunction } from "socketify-client/dist/MiddlewareManager";
import { BroadcastMessage } from "../constants/types";

function sendMessage(socket: WebSocketClient, message: string) {
  const data: BroadcastMessage = { text: message }
  try {
    socket.send(MESSAGE_TYPE_BROADCAST, data);
  } catch (error) {
    console.error('Error sending message:', error);
  }
}

const loggingMiddleware: MiddlewareFunction = (data, next) => {
  console.log('Middleware: Sending data:', data);
  next();
};

const sendPingEvery5Seconds = (socket: WebSocketClient) => {
  const intervalId = setInterval(() => {
    if (socket) {
      try {
        console.log('Sending ping message...');
        socket.send(MESSAGE_TYPE_PING, {});
      } catch (error) {
        console.error('Error sending ping message:', error);
        clearInterval(intervalId);
      }
    } else {
      clearInterval(intervalId);
    }
  }, PING_INTERVAL_MS);
};

const getOnConnectionHandler = (socket: WebSocketClient) => {
  return () => {
    sendPingEvery5Seconds(socket);
  }
}

const OnDisconnectHandler = () => {
  console.log('Disconnected from WebSocket server');
}

export { sendMessage, loggingMiddleware, getOnConnectionHandler, OnDisconnectHandler } 