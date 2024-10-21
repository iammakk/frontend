import { useState, useEffect } from "react";
import { PhoneCall, X } from "lucide-react";
import ReactSiriwave, { IReactSiriwaveProps } from "react-siriwave";
import { motion, AnimatePresence } from "framer-motion";
import useVapi from "./use-vapi";
import {
  Luminous,
  MicOffIcon,
  MicOnIcon,
  CloseCallIcon,
  TrashIcon,
} from "../../../public/images";

import Spinner from "../spinner/spinner";
import { IoClose } from "react-icons/io5";

type CurveStyle = "ios" | "ios9";

interface SiriProps {
  theme?: CurveStyle;
  siriWaveLength?: number;
  siriWaveHeight?: number;
  fullWidthPage?: boolean;
  isChatPage?: boolean;
  specificAssistantId?: string;
  spinnerLocation?: string;
  spinnerSize?: number;
  socket: any;
}

const Siri: React.FC<SiriProps> = ({
  theme = "ios9",
  siriWaveLength = 500,
  siriWaveHeight = 150,
  fullWidthPage = false,
  isChatPage = false,
  specificAssistantId = undefined,
  spinnerLocation,
  spinnerSize = 40,
  socket,
}) => {
  const {
    volumeLevel,
    isSessionActive,
    toggleCall,
    toggleMute,
    isMuted,
    connecting,
  } = useVapi();

  // Set default static width for SSR, dynamic width will be updated on client-side
  const [siriWaveConfig, setSiriWaveConfig] = useState<IReactSiriwaveProps>({
    theme: theme,
    ratio: 1,
    speed: 0.2,
    amplitude: 1,
    frequency: 6,
    color: "#fff",
    cover: false,
    width: 400, // Static default width to avoid SSR issues
    height: 150,
    autostart: true,
    pixelDepth: 1,
    lerpSpeed: 0.1,
  });

  // Only access `window` on the client-side after component mounts
  useEffect(() => {
    if (typeof window !== "undefined") {
      const handleResize = () => {
        setSiriWaveConfig((prevConfig) => ({
          ...prevConfig,
          width: window.innerWidth * 0.8,
        }));
      };
      handleResize(); // Set initial size on mount
      window.addEventListener("resize", handleResize);
      return () => window.removeEventListener("resize", handleResize);
    }
  }, []);

  // Update amplitude, speed, and frequency based on `volumeLevel` and `isSessionActive`
  useEffect(() => {
    setSiriWaveConfig((prevConfig) => ({
      ...prevConfig,
      amplitude: isSessionActive
        ? volumeLevel > 0.01
          ? volumeLevel * 7.5
          : 0
        : 0,
      speed: isSessionActive ? (volumeLevel > 0.5 ? volumeLevel * 10 : 0) : 0,
      frequency: isSessionActive
        ? volumeLevel > 0.01
          ? volumeLevel * 5
          : 0
        : 0,
    }));
  }, [volumeLevel, isSessionActive]);

  const handleToggleCall = () => {
    toggleCall({ specificAssistantId });
  };

  return (
    <div
      className={`flex items-center justify-center  overflow-hidden  ${
        isSessionActive && fullWidthPage
          ? "fixed top-0 left-0 w-screen h-screen bg-black z-40"
          : "relative w-full h-full "
      }`}
    >
      <div className="flex items-center justify-center flex-col">
        {!isSessionActive && (
          <motion.button
            key="callButton"
            onClick={() => {
              if (!connecting) handleToggleCall();
            }}
            className="p-4 rounded-full  mb-4"
            whileTap={{ scale: 0.9 }}
            whileHover={{ scale: 1.1 }}
            style={{ zIndex: 10, position: "relative" }}
          >
            <AnimatePresence>
              {!isSessionActive ? (
                <div className="relative flex items-center justify-center">
                  <div className="relative">
                    <img
                      src={Luminous}
                      alt="luminous"
                      className={` scale-110 ${connecting && "opacity-70"}`}
                    />

                    {connecting && (
                      <div
                        className={
                          spinnerLocation
                            ? spinnerLocation
                            : "mx-auto top-[66px] right-0 left-0 absolute"
                        }
                      >
                        <Spinner size={spinnerSize} color="white" />
                      </div>
                    )}
                  </div>

                  {/* {isChatPage && (
                  <div className="mt-10 text-[#9f9f9f]">
                    <p>Click to talk</p>
                    <p>Luminous Mini-4</p>
                  </div>
                )} */}
                </div>
              ) : fullWidthPage ? (
                <></>
              ) : (
                <></>
              )}
            </AnimatePresence>
          </motion.button>
        )}
        <AnimatePresence>
          <div>
            {isSessionActive && (
              <motion.div
                className="flex items-center justify-center"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
                <ReactSiriwave
                  {...siriWaveConfig}
                  width={siriWaveLength}
                  height={siriWaveHeight}
                />
              </motion.div>
            )}
          </div>
        </AnimatePresence>
        {isSessionActive && !fullWidthPage && (
          <div className=" p-2 mt-4 rounded-full">
            <div className="flex items-center gap-16">
              <div
                className="w-10 h-10 cursor-pointer  duration-300 bg-[rgb(19,19,19)] hover:bg-[rgb(31,31,31)] flex items-center justify-center rounded-lg"
                onClick={(e) => {
                  e.stopPropagation();
                  toggleMute();
                }}
              >
                <img
                  src={isMuted ? MicOffIcon : MicOnIcon}
                  alt="close-call"
                  className="w-5 h-5"
                />
              </div>
              <div
                className="w-10 h-10 cursor-pointer  duration-300 bg-[rgb(19,19,19)] hover:bg-[rgb(31,31,31)] flex items-center justify-center rounded-lg"
                onClick={() => {
                  socket.emit("delete_chat");
                }}
              >
                <img src={TrashIcon} alt="clear" className="w-5 h-5" />
              </div>
              <div
                className="w-10 h-10 cursor-pointer bg-[#31100C] hover:bg-[#4C1812] rounded-lg duration-300 flex items-center justify-center"
                onClick={(e) => {
                  e.stopPropagation();
                  toggleCall({ specificAssistantId });
                }}
              >
                <IoClose size={22} color="#fff" />
              </div>
            </div>
          </div>
        )}

        {isSessionActive && fullWidthPage && (
          <div className="flex items-center gap-20 mt-10 ">
            <div
              className="w-10 h-10 cursor-pointer  duration-300 bg-[rgb(19,19,19)] hover:bg-[rgb(31,31,31)] flex items-center justify-center rounded-lg"
              onClick={() => {
                toggleMute();
              }}
            >
              <img
                src={isMuted ? MicOffIcon : MicOnIcon}
                alt="close-call"
                className="w-5 h-5"
              />
            </div>
            <div
              className="w-10 h-10 cursor-pointer  duration-300 bg-[rgb(19,19,19)] hover:bg-[rgb(31,31,31)] flex items-center justify-center rounded-lg"
              onClick={() => {
                socket.emit("delete_chat");
              }}
            >
              <img src={TrashIcon} alt="clear" className="w-5 h-5" />
            </div>
            <div
              className="w-10 h-10 cursor-pointer bg-[#31100C] hover:bg-[#4C1812] rounded-lg duration-300 flex items-center justify-center"
              onClick={() => {
                toggleCall({ specificAssistantId });
              }}
            >
              <IoClose size={22} color="#fff" />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Siri;
