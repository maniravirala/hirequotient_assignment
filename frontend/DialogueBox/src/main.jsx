import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { AuthContextProvider } from "./context/userContext.jsx";
import { SocketProvider } from "./context/socketContext.jsx";
import { MessageProvider } from "./context/messageContext.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  // <React.StrictMode>
    <AuthContextProvider>
      <SocketProvider>
        <MessageProvider>
          <App />
        </MessageProvider>
      </SocketProvider>
    </AuthContextProvider>
  // </React.StrictMode>
);
