import { ArrowLeft } from "lucide-react";
import { SmallLuminous, VerseinLogoWhite } from "../../../public/images";
import { useChatContext } from "../context/chat-context";
import Siri from "../siri/siri";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { BlueHeaderIcon } from "./chooseModel";

const MiniLuminousModel = ({ socket }: { socket }) => {
  const { miniModelFirstAccess } = useChatContext();

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

  // Handle typing effect for the message
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

  // Handle transition between messages
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
      }, 1000); // 1 second fade out
    }, 5000); // Change every 5 seconds

    return () => clearInterval(interval);
  }, [messages.length]);

  return (
    <div className="w-screen h-screen relative flex items-center justify-center">
      <div className="flex items-center mt-5  fixed top-0 bottom-12  left-14 mx-auto my-auto w-max">
        {/* <ArrowLeft
          color="white"
          width={22}
          className="cursor-pointer"
          onClick={() => {
            navigate("/voice-model");
          }}
        /> */}
      </div>
      {/* TODO: uncomment to get back the menu */}
      {/* <VoiceChatMiniHeader /> */}

      <img
        src={SmallLuminous}
        alt="back"
        className="absolute w-16 h-16 top-1 left-0.5  cursor-pointer"
        onClick={() => {
          navigate("/voice-model");
        }}
      />
      <BlueHeaderIcon />

      <div className="text-center mb-44">
        <div>
          <Siri
            siriWaveLength={1000}
            fullWidthPage={true}
            isChatPage={true}
            socket={socket}
            specificAssistantId="9b4b98ce-1e7f-49a3-8a0b-7a9befde7842"
          />
        </div>
        <div className="w-[800px] mt-16 mx-auto text-left">
          {/* Aligned "Hello Again, Captain!" to the left */}
          <p
            className="text-[#AEDCEC] text-5xl"
            style={{
              fontFamily: '"gamay-wide", sans-serif',
              fontWeight: 400,
              fontStyle: "normal",
              lineHeight: "1.6", // Added line height for spacing
            }}
          >
            {miniModelFirstAccess
              ? "Hello Again, Captain!"
              : "Well, I am still here!"}
          </p>
          {/* Typing effect text */}
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
          {/* Aligned "Powered By Luminous Mini-4 Voice Intelligence Model" to the left */}
          <p
            className="font-light text-[#D1D1D1] mt-7 text-left"
            style={{
              fontFamily: '"gamay", sans-serif',
              fontWeight: 100,
              fontStyle: "normal",
              fontSize: "16px",
              lineHeight: "1",
            }}
          >
            Powered By Luminous Mini-4 Voice Intelligence Model
          </p>
        </div>
      </div>
    </div>
  );
};

export default MiniLuminousModel;
