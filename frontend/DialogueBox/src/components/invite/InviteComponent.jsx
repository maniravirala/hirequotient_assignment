import React, { useState , useContext } from "react";
import Sidebar from "../Nav/Sidebar";
import axioInst from "../../config/axiosInstance";
import { AuthContext } from "../../context/userContext";

const InviteComponent = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
    const {authUser} = useContext(AuthContext);
  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleSearch = async () => {
    if (!searchQuery) {
      return;
    }
    try {
      const res = await axioInst.get(`/api/invitaions/search/${searchQuery}`);
      setSearchResults(res.data.users);
    } catch (error) {
      console.error("Error searching users:", error);
    }
  };

  const handleInvite = async (userId) => {
    try {
      const res = await axioInst.post("/api/invitaions/send", {
        recipientUser: userId,
        senderId: authUser._id
      });
      console.log("Invitation sent to user with ID:", userId);
    } catch (error) {
      console.error("Error sending invitation:", error);
    }
  };

  return (
    <div>
      <div className="flex justify-between h-screen">
        <div>
          <Sidebar />
        </div>
        <div className="w-full p-10">
          <h1 className="text-3xl font-semibold mb-4">
            Search for users to invite
          </h1>
          <div className="flex items-center">
            <input
              type="text"
              placeholder="Search by user name or email"
              value={searchQuery}
              onChange={handleSearchChange}
              className="px-4 py-2 border border-gray-300 bg-white rounded-l-md focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 flex-grow"
            />
            <button
              onClick={handleSearch}
              className="px-4 py-2 bg-indigo-600 text-white rounded-r-md hover:bg-indigo-700 focus:outline-none focus:bg-indigo-700"
            >
              Search
            </button>
          </div>
          <ul className="mt-4">
            {searchResults.map((user) => (
              <li key={user._id} className="border-b border-gray-200 py-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="w-10 h-10 rounded-full overflow-hidden mr-4">
                      <img
                        src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg"
                        alt="Profile"
                      />
                    </div>
                    <div>
                      <h2 className="text-lg font-semibold">{user.username}</h2>
                      <p className="text-gray-500">{user.email}</p>
                    </div>
                  </div>
                  <button
                    onClick={() => handleInvite(user._id)}
                    className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:bg-indigo-700"
                  >
                    Invite
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default InviteComponent;
