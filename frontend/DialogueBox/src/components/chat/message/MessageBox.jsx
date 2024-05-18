import React, { useContext, useState, useEffect, useRef } from "react";
import ChatInput from "./ChatInput";
import axioInst from "../../../config/axiosInstance";
import { AuthContext } from "../../../context/userContext";
import { SocketContext } from "../../../context/socketContext";
import { MessageContext } from "../../../context/messageContext";
import UserNav from "./UserNav";

const MessageBox = ({ selectedUser }) => {
  const { messages, setMessages } = useContext(MessageContext);
  const { authUser } = useContext(AuthContext);
  const [msg, setMsg] = useState([]);
  const currentUser = authUser ? authUser._id : null;
  const socket = useContext(SocketContext);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        if (!currentUser || !selectedUser) {
          return;
        }
        const res = await axioInst.get(
          `/api/messages/gm/${currentUser}/${selectedUser._id}`
        );
        setMsg(res.data.messages);
      } catch (error) {
        console.log("Error fetching messages:", error);
      }
    };

    fetchMessages();

    const handleNewMessage = (newMessage) => {
      if (
        (newMessage.senderId === currentUser &&
          newMessage.recipientId === selectedUser._id) ||
        (newMessage.senderId === selectedUser._id &&
          newMessage.recipientId === currentUser)
      ) {
        setMsg((prevMessages) => [...prevMessages, newMessage]);
      }
    };

    if (socket) {
      socket.on("new-message", handleNewMessage);
    }

    markasread();

    return () => {
      if (socket) {
        socket.off("new-message", handleNewMessage);
      }
    };
  }, [currentUser, selectedUser, socket , messages]);


  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [msg]);

  useEffect(() => {
    if (messages.length > 0) {
      setMsg((prevMessages) => [...prevMessages,...messages]);
      setMessages([]);

    }
  }, [messages]);

  function markasread() {
    if(!currentUser || !selectedUser) {
      return;
    }
    axioInst
      .patch(`/api/messages/markasread/${currentUser}/${selectedUser._id}`)
      .then((res) => {

      })
      .catch((error) => {
        console.log("Error marking messages as read:", error);
      });
  }


  return (
    <div className="h-screen relative rounded-3xl    border-black border-2">
    <div className="w-full bg-gray-900 rounded-2xl  text-white  h-20">
      <UserNav selectedUser={selectedUser} />
    </div>
      <div className="overflow-auto h-[calc(100vh-150px)] p-10">
        {msg.map((message) => (
          <div
            key={message._id}
            className={`chat ${
              message.senderId === currentUser ? "chat-end " : "chat-start"
            }`}
          >
            <div className="chat-image avatar">
              <div className="w-10 rounded-full">
                <img
                  alt="Profile"
                  src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg"
                />
              </div>
            </div>
            <div className="chat-header">
              {message.senderId === currentUser ? "You" : selectedUser.username}
              <time className="text-xs opacity-50">{message.timeStamp}</time>
            </div>
            <div className="chat-bubble">
              {
                message.contentType === "text" ? (
                  <p>{message.content}</p>
                ) : (
                  <img
                    src={message.content}
                    alt="attachment"
                    className="w-64 h-44"
                  />
                )
              }
            </div>
            <div className="chat-footer opacity-50">
              {message.status.delivered
                ? message.status.read
                  ? "Read"
                  : "Not Read"
                : "Not Delivered"}
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>
      <div className="absolute bottom-4 w-full left-0">
        <ChatInput
          selectedUser={selectedUser}
          messages={msg}
          setMessages={setMsg}
        />
      </div>
    </div>
  );
};

export default MessageBox;