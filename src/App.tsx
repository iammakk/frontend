import "./App.css";
import { Route, Routes } from "react-router-dom";
import Header from "./components/header/header";
import Chatpage from "./pages/Chatpage";
import HomePage from "./components/home/home";
import LoginPage from "./components/register/login-page";
import { ChatContext } from "./components/context/chat-context";
import ChatPageHeader from "./components/header/chatPageHeader";
import ChooseVoiceModel from "./components/voice-chat/chooseModel";
import MiniLuminousModel from "./components/voice-chat/mini-4";
import TurboLuminousModel from "./components/voice-chat/turbo-model";
import { useEffect, useState } from "react";
import { io } from "socket.io-client";

function App() {
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    const newSocket = io("http://localhost:8000");
    setSocket(newSocket);

    return () => {
      newSocket.disconnect();
    };
  }, []);

  return (
    <ChatContext>
      <Routes>
        <Route path="/" element={<HomePage socket={socket} />} />

        <Route path="/chat" element={<Chatpage socket={socket} />} />

        <Route path="/login" element={<LoginPage socket={socket} />} />
        <Route path="/voice-model" element={<ChooseVoiceModel />} />
        <Route
          path="/voice-model/mini"
          element={<MiniLuminousModel socket={socket} />}
        />
        <Route
          path="/voice-model/turbo"
          element={<TurboLuminousModel socket={socket} />}
        />
      </Routes>
    </ChatContext>
  );
}

export default App;
