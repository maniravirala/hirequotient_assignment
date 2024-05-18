import React, { useState, useEffect, useContext } from "react";
import axiosInstance from "../../../config/axiosInstance";
import { AuthContext } from "../../../context/userContext";
import { AvatarGenerator } from "random-avatar-generator";
const generator = new AvatarGenerator();
const UsersComponent = ({ setSelectedUser, selectedUser }) => {
  const { authUser } = useContext(AuthContext);
  const currentUserId = authUser._id;

  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selUsr, setSelUsr] = useState(selectedUser);

  const fetchContacts = async () => {
    try {
      const res = await axiosInstance.get(`/api/contacts/get/${currentUserId}`);
      setUsers(res.data);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchContacts();
  }, []);

  useEffect(() => {
    setSelUsr(selectedUser);
  }, [selectedUser]);

  return (
    <>
      <div className="w-full bg-gray-900 rounded-3xl mt-5 ">
        {users.map((user) => (
          <div
            key={user._id}
            className={`flex items-center cursor-pointer justify-between hover:bg-gray-100 p-2 border-b-2 border-gray-200 ${
              selUsr && selUsr._id === user._id ? "bg-red-500" : ""
            }`}
            onClick={() => setSelectedUser(user)}
          >
            <div className="ml-2 flex  place-items-center gap-2">
              <img
                src={generator.generateRandomAvatar()}
                alt="avatar"
                className="w-10 h-10 rounded-full"
              />
              <h2 className="text-lg font-semibold">{user?.username}</h2>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default UsersComponent;
