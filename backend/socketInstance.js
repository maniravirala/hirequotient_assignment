import { Server } from "socket.io";
import http from "http";
import { addUserSocket, removeUserSocket, userSocketMap } from "./gbMap.js"; 

const server = http.createServer();

const io = new Server(server, {
  cors: {
    origin: "*",
  },
});

io.on("connection", (socket) => {
  socket.on("user-connected", (userId) => {
    addUserSocket(userId, socket.id);
    console.log(userSocketMap)
  });

  socket.on("disconnect", () => {
    console.log("User disconnected");
    for (const [userId, socketId] of userSocketMap.entries()) {
      if (socketId === socket.id) {
        removeUserSocket(userId);
        break;
      }
    }
  });

});

export {io , userSocketMap }

// socket instance is created then it is passed to all other controllers : 
// it import userSocketMap which conatins the all the online users : 

