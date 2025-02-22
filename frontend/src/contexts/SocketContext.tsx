import { createContext, ReactNode, useContext, useEffect, useState } from 'react';
import { WebSocketClient } from 'socketify-client';
import { SERVER_URL } from "../constants/constant"
import { getOnConnectionHandler, loggingMiddleware, OnDisconnectHandler } from '../utils/socketUtils';

const SocketContext = createContext<WebSocketClient | null>(null);

export const SocketProvider = ({ children }: { children: ReactNode }) => {
  const [socket, setSocket] = useState<WebSocketClient | null>(null);

  useEffect(() => {
    // Create a socket connection when the provider is mounted
    const newSocket = new WebSocketClient(SERVER_URL, {
      maxReconnectAttempts: 5,
      reconnectDelay: 1000
    })
    setSocket(newSocket);

    // Cleanup on unmount
    return () => {
      // newSocket.disconnect();
    };
  }, []);

  useEffect(() => {
    if (!socket) {
      return
    }

    const onConnectionHandler = getOnConnectionHandler(socket)

    socket.use(loggingMiddleware)
    socket.on('connected', onConnectionHandler);
    socket.on('disconnected', OnDisconnectHandler);

    return () => {
      socket.off('connected', onConnectionHandler);
      socket.off('disconnected', OnDisconnectHandler);
    };
  }, [socket])

  return (
    <SocketContext.Provider value={socket}>
      {children}
    </SocketContext.Provider>
  );
};

export const useSocket = () => {
  return useContext(SocketContext);
};