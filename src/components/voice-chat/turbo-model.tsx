import { ArrowLeft } from "lucide-react";
import { useChatContext } from "../context/chat-context";
import VoiceChatTurboHeader from "../header/voice-chat-turbo-header";
import Siri from "../siri/siri";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const TurboLuminousModel = ({ socket }: { socket }) => {
  const {
    turboModelFirstAccess,
    finalSelectedTurboVoiceChild,
    finalSelectedTurboVoiceParent,
  } = useChatContext();

  let assistantId;
  if (
    finalSelectedTurboVoiceParent?.children &&
    finalSelectedTurboVoiceParent?.children?.length > 0
  ) {
    assistantId = finalSelectedTurboVoiceChild?.assistantId;
  } else if (finalSelectedTurboVoiceParent?.assistantId) {
    assistantId = finalSelectedTurboVoiceParent?.assistantId;
  } else assistantId = undefined;

  const messages = [
    "I am your voice to voice Flynas AI.",
    "Ready to soar higher?",
    "Let me handle the details while you lead the way.",
    "I’m here to make your journey smoother, one command at a time!",
  ];

  const [currentMessageIndex, setCurrentMessageIndex] = useState(0);
  const [displayedMessage, setDisplayedMessage] = useState("");
  const [letterIndex, setLetterIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(true);
  const navigate = useNavigate();

  // Typing effect for the message
  useEffect(() => {
    if (letterIndex < messages[currentMessageIndex].length) {
      const timeout = setTimeout(() => {
        setDisplayedMessage(
          (prev) => prev + messages[currentMessageIndex].charAt(letterIndex)
        );
        setLetterIndex((prev) => prev + 1);
      }, 50);
      return () => clearTimeout(timeout);
    }
  }, [letterIndex, currentMessageIndex]);

  // Transition between messages
  useEffect(() => {
    const interval = setInterval(() => {
      setIsVisible(false);

      setTimeout(() => {
        setCurrentMessageIndex(
          (prevIndex) => (prevIndex + 1) % messages.length
        ); // Cycle through messages
        setDisplayedMessage("");
        setLetterIndex(0);
        setIsVisible(true);
      }, 1000); // 1-second fade out
    }, 3500); // Change every 5 seconds

    return () => clearInterval(interval);
  }, [messages.length]);

  return (
    <div className="w-screen h-screen relative">
      {/* <div className="flex items-center mt-5  fixed top-0 bottom-12  left-14 mx-auto my-auto w-max">
        <ArrowLeft
          color="white"
          width={22}
          className="cursor-pointer"
          onClick={() => {
            navigate("/voice-model");
          }}
        />
      </div> */}

      <VoiceChatTurboHeader />

      <div className="flex items-center justify-center w-full h-full">
        <div className="mb-44">
          <div>
            <Siri
              siriWaveLength={1000}
              fullWidthPage={true}
              isChatPage={true}
              specificAssistantId={assistantId}
              socket={socket}
            />
          </div>
          <div className="w-[800px] mt-16 text-left">
            {/* Left-aligned "Hello Again, Captain!" */}
            <p
              className="text-[#AEDCEC] text-5xl"
              style={{
                fontFamily: '"gamay-wide", sans-serif',
                fontWeight: 400,
                fontStyle: "normal",
                lineHeight: "1.6", // Added line height for spacing
              }}
            >
              {turboModelFirstAccess
                ? "Hello Again, Captain!"
                : "Well, I am still here!"}
            </p>
            {/* Typing effect applied to text */}
            <div
              className={`transition-all duration-500 ease-in-out transform min-h-36 ${
                isVisible
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 -translate-y-8"
              }`}
            >
              <p
                className="text-[#B1B1B1] text-4xl mt-2"
                style={{
                  fontFamily: '"gamay-wide", sans-serif',
                  fontWeight: 400,
                  fontStyle: "normal",
                }}
              >
                {displayedMessage}
                {letterIndex < messages[currentMessageIndex].length && (
                  <span className="inline-block w-2 h-6 ml-2 bg-white" />
                )}
              </p>
            </div>
            {/* New "Powered By Luminous Turbo-S Voice Intelligence Model" text */}
            <p
              className="font-light text-[#D1D1D1] mt-4 text-left"
              style={{
                fontFamily: '"gamay", sans-serif',
                fontWeight: 100,
                fontStyle: "normal",
                fontSize: "16px",
                lineHeight: "1",
              }}
            >
              Powered By Luminous Turbo-S Voice Intelligence Model
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TurboLuminousModel;
