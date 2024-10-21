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

function App() {
  return (
    <ChatContext>
      <Routes>
        <Route path="/" element={<HomePage />} />

        <Route path="/chat" element={<Chatpage />} />

        <Route path="/login" element={<LoginPage />} />
        <Route path="/voice-model" element={<ChooseVoiceModel />} />
        <Route path="/voice-model/mini" element={<MiniLuminousModel />} />
        <Route path="/voice-model/turbo" element={<TurboLuminousModel />} />
      </Routes>
    </ChatContext>
  );
}

export default App;
