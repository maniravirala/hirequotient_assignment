import React,{useContext, useEffect} from "react";
import UsersComponent from "../chat/users/UsersComponent";
import { AuthContext } from "../../context/userContext";
import { SocketContext } from "../../context/socketContext";

const HomeComp = () => {
  const socket = useContext(SocketContext);
  useEffect(() => {
    if (socket) {
      socket.emit("user-connected", authUser._id);
    }
  }, [socket]);
  const {authUser} = useContext(AuthContext);
  console.log("hello")
  return (
    <div className="flex">
      <div className="w-1/4">
        <UsersComponent />
      </div>
      <div className="w-3/4">
        chat here
      </div>
    </div>
  );
};

export default HomeComp;
