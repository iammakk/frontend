import Vapi from "@vapi-ai/web";
import { useEffect, useRef, useState } from "react";
import { FaStopCircle } from "react-icons/fa";
import { SmallLuminous } from "../../../public/images";
import { useChatContext } from "../context/chat-context";
import { TextareaAutosize } from "@mui/material";
import { ArrowUp } from "lucide-react";
import { IoIosAttach, IoIosCall } from "react-icons/io";

import { ClearIcon } from "../../../public/images";
import { useNavigate } from "react-router-dom";

const vapi = new Vapi("5ec0d97f-8236-4bf1-8d88-23679bed54e8");

const Input = ({ isProcessing, setChats, socket, setIsProcessing }) => {
  const [inputValue, setInputValue] = useState("");
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [connecting, setConnecting] = useState(false);
  const [connected, setConnected] = useState(false);
  const navigate = useNavigate();
  const fileInputRef = useRef(null); // Ref for file input
  const { firstAccess } = useChatContext();

  useEffect(() => {
    vapi.on("call-start", () => {
      setConnecting(false);
      setConnected(true);
    });

    vapi.on("call-end", () => {
      setConnecting(false);
      setConnected(false);
    });

    vapi.on("speech-start", () => {});

    vapi.on("speech-end", () => {});

    vapi.on("volume-level", (level) => {});

    vapi.on("message", (message) => {});

    vapi.on("error", (error) => {
      console.log(error);
      setConnecting(false);
    });
  }, []);

  const startCallInline = () => {
    setConnecting(true);
    vapi.start("42e64512-d043-45c8-aaaf-2a6add4ac02c");
  };

  const endCall = () => {
    vapi.stop();
  };

  const inputRef = useRef(null);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, [isProcessing]);

  const handleSendMessage = () => {
    if (socket && !isProcessing) {
      if (inputValue.length > 0 || selectedFiles.length > 0) {
        const newChat = { user: inputValue, ai: "" };
        setChats((prevChats) => [...prevChats, newChat]);

        const images = selectedFiles.map((file) => {
          return { name: file.name, data: file.base64 };
        });

        socket.emit("generate_text_response", {
          text: inputValue,
          images: images, // Send images along with text
        });

        setIsProcessing(true);
        setInputValue("");
        setSelectedFiles([]); // Clear the selected files after sending
      }
    }
  };

  const handleFileChange = (event) => {
    const files = Array.from(event.target.files);
    console.log(files, "files");

    const readFiles = [];

    files.forEach((file: File) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        readFiles.push({
          name: file.name,
          base64: reader.result,
        });
        if (readFiles.length === files.length) {
          setSelectedFiles(readFiles); // Store all selected images
        }
      };

      reader.readAsDataURL(file); // Convert image to base64
    });
  };

  const openFileDialog = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click(); // Trigger the file input click
    }
  };

  return (
    <div className="input">
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          width: "100%",
          position: "relative",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <div
          className="absolute -left-10 bottom-6 w-7 h-7 cursor-pointer"
          onClick={() => {
            setChats([]);
            socket.emit("delete_chat")
          }}
        >
          <img src={ClearIcon} alt="ClearIcon" />
        </div>

        <div className="w-full max-h-[200px] overflow-y-scroll rounded-3xl z-10 noScrollbar">
          <TextareaAutosize
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                if (e.shiftKey) {
                  // Insert a newline if Shift + Enter is pressed
                  e.preventDefault();
                  setInputValue((prev) => prev + "\n");
                } else {
                  // Handle message send on Enter
                  e.preventDefault();
                  handleSendMessage();
                }
              }
            }}
            ref={inputRef}
            autoFocus
            style={{
              backgroundColor: "#f0f4f9",
              fontFamily: "gamay-expanded, sans-serif", // Updated to new font
              fontWeight: 300, // Updated to new font-weight
              fontStyle: "normal", // Updated to normal font-style
              fontSize: "18px", // Set font-size to 18px
              textAlign: "left"
        
            }}
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            disabled={isProcessing}
            className="pl-12 pr-14 py-5 !h-[60px] text-base font-light z-10 w-full !bg-[#9f9f9f] hover:!bg-[#e2e2e2] resize-none !border-none focus-visible:outline-none rounded-full focus:!bg-[#e2e2e2]"
            />
        </div>
        <IoIosAttach
          size={26}
          onClick={openFileDialog}
          className="absolute left-3 z-10 mb-2 cursor-pointer"
        />

        <div className="enter-icon relative">
          <div className="z-10 flex gap-2 mb-2">
            {isProcessing ? (
              <div>
                <FaStopCircle
                  size={32}
                  onClick={() => socket.emit("stop_generation")}
                />
              </div>
            ) : (
              <>
                {inputValue ? (
                  <svg
                    onClick={() => handleSendMessage()}
                    xmlns="http://www.w3.org/2000/svg"
                    width="39.14"
                    height="42.987"
                    viewBox="0 0 45.14 42.987"
                  >
                    <path
                      id="Icon_fa-solid-circle-arrow-up"
                      data-name="Icon fa-solid-circle-arrow-up"
                      d="M22.57,42.987c12.465,0,22.57-9.623,22.57-21.494S35.035,0,22.57,0,0,9.623,0,21.494,10.1,42.987,22.57,42.987ZM33.943,19.395a1.94,1.94,0,0,1,0,2.846,2.191,2.191,0,0,1-2.989,0l-6.26-5.961V31.569a2.118,2.118,0,0,1-4.232,0V16.28L14.2,22.241a2.182,2.182,0,0,1-2.989,0,1.947,1.947,0,0,1,0-2.846l9.857-9.4a2.182,2.182,0,0,1,2.989,0Z"
                      fill="#070706"
                    />
                  </svg>
                ) : (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="39.14"
                    height="42.987"
                    viewBox="0 0 45.14 42.987"
                  >
                    <path
                      id="Icon_fa-solid-circle-arrow-up"
                      data-name="Icon fa-solid-circle-arrow-up"
                      d="M22.57,42.987c12.465,0,22.57-9.623,22.57-21.494S35.035,0,22.57,0,0,9.623,0,21.494,10.1,42.987,22.57,42.987ZM33.943,19.395a1.94,1.94,0,0,1,0,2.846,2.191,2.191,0,0,1-2.989,0l-6.26-5.961V31.569a2.118,2.118,0,0,1-4.232,0V16.28L14.2,22.241a2.182,2.182,0,0,1-2.989,0,1.947,1.947,0,0,1,0-2.846l9.857-9.4a2.182,2.182,0,0,1,2.989,0Z"
                      fill="#747474"
                    />
                  </svg>
                )}
                {/* <div className="w-10 h-10 rounded-full bg-black flex items-center justify-center">
                <ArrowUp
                  color="white"
                  onClick={() => handleSendMessage()}
                  size={25}
                />
              </div> */}
              </>
            )}
          </div>
          <div
            className="w-[80px] absolute -right-28 mb-2"
            onClick={() => {
              navigate("/voice-model");
            }}
          >
            <img src={SmallLuminous} alt="Luminous" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Input;
