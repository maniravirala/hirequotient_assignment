const userSocketMap = new Map();

export const addUserSocket = (userId, socketId) => {
  userSocketMap.set(userId, socketId);
};

export const removeUserSocket = (userId) => {
  userSocketMap.delete(userId);
};

export { userSocketMap };
