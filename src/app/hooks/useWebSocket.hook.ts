import { useEffect, useRef } from 'react';
import io, { Socket } from 'socket.io-client';

export const useWebSocket = (userId: number) => {
  const socketRef = useRef<Socket>();

  useEffect(() => {
    socketRef.current = io(import.meta.env.VITE_CORE_WEBSOCKET_URL, { query: { userId } });

    socketRef.current.on('connect', () => {
      console.log('WebSocket connected');
    });

    socketRef.current.on('disconnect', () => {
      console.log('WebSocket disconnected');
    });

    return () => {
      if (socketRef.current) {
        socketRef.current.disconnect();
      }
    };
  }, [userId]);

  const subscribe = <T>(event: string, handler: (payload: T) => void) => {
    if (socketRef.current) {
      socketRef.current.on(event, handler);
    }
  };

  const unsubscribe = <T>(event: string, handler: (payload: T) => void) => {
    if (socketRef.current) {
      socketRef.current.off(event, handler);
    }
  };
  return { subscribe, unsubscribe };
};
