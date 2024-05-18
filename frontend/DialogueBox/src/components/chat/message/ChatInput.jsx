import React, { useState, useContext } from "react";
import axioInst from "../../../config/axiosInstance";
import { AuthContext } from "../../../context/userContext";
import ImageKit from "imagekit";
import toast, { Toaster } from "react-hot-toast";

const ChatInput = ({ setMessages, messages, selectedUser }) => {
  const imagekit = new ImageKit({
    publicKey: "IMG_PUB_KEY",
    privateKey: "PRIVATE_IMG_KEY",
    urlEndpoint: "URL_IMG_KIT",
    transformationPosition: "path",
    authenticationEndpoint: "http://localhost:3000/imagekit",
  });

  const [message, setMessage] = useState("");
  const { authUser } = useContext(AuthContext);
  const currentUser = authUser._id;
  const handleMessageChange = (event) => {
    setMessage(event.target.value);
  };

  const handleSendMessage = async () => {
    
    let url = `/api/messages/create-message`;
    const res = await axioInst.post(`${url}`, {
      recipientId: selectedUser._id,
      content: message,
      contentType: "text",
      senderId: currentUser,
      busy: selectedUser.status === "Busy" ? true : false,
    });
    setMessages([...messages, res.data.message]);
    console.log("Sending message:", message);
    setMessage("");
  };

  const handleFileUpload = async (event) => {
    try {
      const file = event.target.files[0];
      const fileExtension = file.name.split(".").pop().toLowerCase();
      const fileType = getFileType(fileExtension);
      if (!fileType) {
        console.error("Unsupported file type");
        toast.error("Unsupported file type");
        return;
      }

      const response = await imagekit.upload({
        file: file,
        fileName: file.name,
        folder: "/attachments/",
      });

      const attachmentUrl = response.url;
      console.log("Attachment URL:", attachmentUrl);

      let url = `/api/messages/create-message`;
      toast.success("Uploading file...");
      const res = await axioInst.post(`${url}`, {
        recipientId: selectedUser._id,
        content: attachmentUrl,
        contentType: fileType,
        senderId: currentUser,
        busy: selectedUser.status === "Busy" ? true : false,
      });
      toast.success("File uploaded successfully");
      setMessages([...messages, res.data.message]);
      event.target.value = "";
    } catch (error) {
      console.error("Error uploading file:", error);
      toast.error("Error uploading file");
    }
  };

  const getFileType = (extension) => {
    if (["jpg", "jpeg", "png", "gif", "bmp"].includes(extension)) {
      return "image";
    } else if (["mp4", "mov", "avi", "mkv", "wmv"].includes(extension)) {
      return "video";
    } else {
      return "text";
    }
  };

  return (
    <div className="flex gap-2 px-10">
      <input
        type="text"
        placeholder="Type a message"
        className="w-full p-2 rounded-lg border-2 bg-white border-gray-200"
        value={message}
        onChange={handleMessageChange}
      />
      <label className="relative cursor-pointer bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-lg ">
        <span>Attach </span>
        <input
          type="file"
          className="opacity-0 absolute inset-0 w-full h-full z-10"
          onChange={handleFileUpload}
        />
      </label>

      <button
        className="bg-blue-500 hover:bg-blue-600 text-white p-2 rounded-lg"
        onClick={handleSendMessage}
      >
        Send
      </button>
      <Toaster />
    </div>
  );
};

export default ChatInput;
