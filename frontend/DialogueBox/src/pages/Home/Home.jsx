import React,{useState , useContext , useEffect} from "react";
import HomeComp from "../../components/Home/Home.component";
import Sidebar from "../../components/Nav/Sidebar";
import UsersComponent from "../../components/chat/users/UsersComponent";
import MessageBox from "../../components/chat/message/MessageBox";
import { SocketContext } from "../../context/socketContext";
import { AuthContext } from "../../context/userContext";
const Home = () => {
  const socket = useContext(SocketContext);
  const {authUser} = useContext(AuthContext);
  useEffect(() => {
    if (socket) {
      socket.emit("user-connected", authUser._id);
    }
  }, [socket]);
  const css = {
    display: "grid",
    gridTemplateColumns: "64px 1fr 3fr",
  };
  const [selectUser , setSelectedUser] = useState(null);

  return (
    <div style={css} className="bg-white gap-10 ">
    <div
      className=" h-screen"
      style={{
        gridColumn: "1 / 2",
      }}
    >
      <Sidebar />
    </div>
    
    <div
      className=" h-screen border border-black  rounded-3xl "
      style={{
        gridColumn: "2 / 3",
      }}
    >
      <UsersComponent
        setSelectedUser={setSelectedUser}
        />
    </div>
    <div
      className=" h-screen"
      style={{
        gridColumn: "3 / 4",
      }}
    >
      <MessageBox 
      selectedUser={selectUser}
      />
    </div>
    </div>
  );
};

export default Home;
