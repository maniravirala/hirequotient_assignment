import React, { useState, useEffect, useContext } from "react";
import { AuthContext } from "../../context/userContext";
import axioInst from "../../config/axiosInstance";
import Sidebar from "../../components/Nav/Sidebar";

const InvitationsPage = () => {
  const [invitations, setInvitations] = useState([]);
  const { authUser } = useContext(AuthContext);

  useEffect(() => {
    fetchInvitations();
  }, []);

  const fetchInvitations = async () => {
    try {
      const response = await axioInst.get(
        `/api/invitaions/get/${authUser._id}`
      );
      setInvitations(response.data.senderIds); 
    } catch (error) {
      console.error("Error fetching invitations:", error);
    }
  };

  const handleAccept = async (userId) => {
    try {
      const res = await axioInst.post("/api/invitaions/accept", {
        userId,
      }); 
      setInvitations(
        invitations.filter((senderId) => senderId._id !== userId) 
      );
    } catch (error) {
      console.error("Error accepting invitation:", error);
    }
  };

  return (
    <div className="h-screen w-full flex gap-10">
    <Sidebar/>
      <div>
        <h1 className="text-3xl font-semibold mb-4">Invitations</h1>
        <ul>
          {invitations.map((senderId) => (
            <li  className="border-b border-gray-200 py-4">
              <div>
                <p>From: {senderId.username}</p>
              </div>
              <button
                onClick={() => handleAccept(senderId._id)}
                className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 focus:outline-none focus:bg-green-600"
              >
                Accept
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default InvitationsPage;
