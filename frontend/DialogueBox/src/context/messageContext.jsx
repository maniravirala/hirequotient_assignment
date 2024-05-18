import React, { createContext, useState, useEffect, useContext } from 'react';
import { SocketContext } from './socketContext';

const MessageContext = createContext();

const MessageProvider = ({ children }) => {
  const [messages, setMessages] = useState([]);
  const socket = useContext(SocketContext);

  useEffect(() => {
    if (socket) {
      socket.on('new-message', (message) => {
        setMessages((prevMessages) => [...prevMessages, message]);
        console.log('new message:', message);
      });
    }
  }, [socket , setMessages]);

  const sendMessage = (message) => {
    if (socket) {
      socket.emit('send-message', message);
    }
  };

  return (
    <MessageContext.Provider value={{ messages, sendMessage, setMessages }}>
      {children}
    </MessageContext.Provider>
  );
};

export { MessageContext, MessageProvider };