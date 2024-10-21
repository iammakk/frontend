import { createContext, useState, ReactNode, useContext } from "react";
import {
  chatDropdownChildrenType,
  chatDropdownOptionsType,
} from "../header/chatPageHeader";
import {
  dropdownChildrenVoiceMiniType,
  dropdownOptionsVoiceMiniType,
} from "../header/voice-chat-mini-header";
import {
  dropdownChildrenVoiceTurboType,
  dropdownOptionsVoiceTurboType,
} from "@/util/constants";

// Define the type for the context state
interface ChatContextType {
  firstAccess: boolean;
  handleFirstAccess: (state: boolean) => void;
  finalSelectedChatParent: chatDropdownOptionsType;
  finalSelectedChatChild: chatDropdownChildrenType;
  finalSelectedMiniVoiceParent: dropdownOptionsVoiceMiniType;
  finalSelectedMiniVoiceChild: dropdownChildrenVoiceMiniType;
  finalSelectedTurboVoiceParent: dropdownOptionsVoiceTurboType;
  finalSelectedTurboVoiceChild: dropdownChildrenVoiceTurboType;
  miniModelFirstAccess: boolean;
  turboModelFirstAccess: boolean;
  handlesSetfinalSelectedChatParent: (state: chatDropdownOptionsType) => void;
  handlesSetfinalSelectedChatChild: (state: chatDropdownChildrenType) => void;

  setMiniModelFirstAccess: React.Dispatch<React.SetStateAction<boolean>>;
  setTurboModelFirstAccess: React.Dispatch<React.SetStateAction<boolean>>;
  handlesSetfinalSelectedMiniVoiceParent: (
    state: dropdownOptionsVoiceMiniType
  ) => void;
  handleSetfinalSelectedMiniVoiceChild: (
    state: dropdownChildrenVoiceMiniType
  ) => void;
  handlesSetfinalSelectedTurboVoiceParent: (
    state: dropdownOptionsVoiceTurboType
  ) => void;
  handleSetfinalSelectedTurboVoiceChild: (
    state: dropdownChildrenVoiceTurboType
  ) => void;
}

// Create the context
const ChatContextCreation = createContext<ChatContextType | undefined>(
  undefined
);

// Create a provider component
export const ChatContext: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [firstAccess, setFirstAccess] = useState(true);

  // chat to chat page
  const [finalSelectedChatParent, setfinalSelectedChatParent] =
    useState<chatDropdownOptionsType | null>(null);
  const [finalSelectedChatChild, setfinalSelectedChatChild] =
    useState<chatDropdownChildrenType | null>(null);

  // mini model
  const [finalSelectedMiniVoiceParent, setfinalSelectedMiniVoiceParent] =
    useState<dropdownOptionsVoiceMiniType | null>(null);
  const [finalSelectedMiniVoiceChild, setfinalSelectedMiniVoiceChild] =
    useState<dropdownChildrenVoiceMiniType | null>(null);

  const [miniModelFirstAccess, setMiniModelFirstAccess] = useState(true);

  // turbo model
  const [finalSelectedTurboVoiceParent, setfinalSelectedTurboVoiceParent] =
    useState<dropdownOptionsVoiceTurboType | null>(null);
  const [finalSelectedTurboVoiceChild, setfinalSelectedTurboVoiceChild] =
    useState<dropdownChildrenVoiceTurboType | null>(null);

  const [turboModelFirstAccess, setTurboModelFirstAccess] = useState(true);

  const handlesSetfinalSelectedChatParent = (
    state: dropdownOptionsVoiceMiniType
  ) => {
    setfinalSelectedChatParent(state);
  };
  const handlesSetfinalSelectedChatChild = (
    state: dropdownChildrenVoiceMiniType
  ) => {
    setfinalSelectedChatChild(state);
  };

  const handlesSetfinalSelectedMiniVoiceParent = (
    state: dropdownOptionsVoiceMiniType
  ) => {
    setfinalSelectedMiniVoiceParent(state);
  };
  const handleSetfinalSelectedMiniVoiceChild = (
    state: dropdownChildrenVoiceMiniType
  ) => {
    setfinalSelectedMiniVoiceChild(state);
  };
  const handlesSetfinalSelectedTurboVoiceParent = (
    state: dropdownOptionsVoiceTurboType
  ) => {
    setfinalSelectedTurboVoiceParent(state);
  };
  const handleSetfinalSelectedTurboVoiceChild = (
    state: dropdownChildrenVoiceTurboType
  ) => {
    setfinalSelectedTurboVoiceChild(state);
  };

  const handleFirstAccess = (state: boolean) => {
    setFirstAccess(state);
  };
  return (
    <ChatContextCreation.Provider
      value={{
        handlesSetfinalSelectedChatChild,
        handlesSetfinalSelectedChatParent,
        finalSelectedChatParent,
        finalSelectedChatChild,
        firstAccess,
        handleFirstAccess,
        handleSetfinalSelectedMiniVoiceChild,
        handlesSetfinalSelectedMiniVoiceParent,
        finalSelectedMiniVoiceParent,
        finalSelectedMiniVoiceChild,
        miniModelFirstAccess,
        setMiniModelFirstAccess,
        finalSelectedTurboVoiceParent,
        finalSelectedTurboVoiceChild,
        handlesSetfinalSelectedTurboVoiceParent,
        handleSetfinalSelectedTurboVoiceChild,
        turboModelFirstAccess,
        setTurboModelFirstAccess,
      }}
    >
      {children}
    </ChatContextCreation.Provider>
  );
};

// Custom hook to use the ChatContext
export const useChatContext = () => {
  const context = useContext(ChatContextCreation);
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
};
