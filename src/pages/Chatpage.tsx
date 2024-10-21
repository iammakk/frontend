import { useEffect, useRef, useState } from "react";
import io from "socket.io-client";
import "./chatpage.css";
import Input from "../components/Input/Input";
import {
  VerseinLogoWhite,
  SmallLuminous,
  ChatTabIcon,
  NewChatIcon,
} from "../../public/images";
import ReactMarkdown from "react-markdown";
import rehypeHighlight from "rehype-highlight";
import "highlight.js/styles/github-dark.css";

import rehypeSlug from "rehype-slug";

import { useChatContext } from "../components/context/chat-context";
import { ArrowDownIcon } from "lucide-react";
import { BlueHeaderIcon } from "../components/voice-chat/chooseModel";

const Chatpage = () => {
  const [socket, setSocket] = useState(null);
  const [chats, setChats] = useState([]);
  const [isProcessing, setIsProcessing] = useState(false); // Tracks if AI is processing a response
  const scrollableRef = useRef(null);
  const { firstAccess } = useChatContext();
  const [disaleScroll, setDisableScroll] = useState(false);
  const lineRef = useRef<HTMLDivElement | null>(null);
  const containerDev = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const newSocket = io("http://localhost:8000");
    setSocket(newSocket);

    newSocket.on("send_text_response", (data) => {
      if (data.error) {
        console.log(data);
        return;
      }
      if (data.data !== null) {
        setChats((prevChats) => {
          const updatedChats = [...prevChats];
          const lastChat = { ...updatedChats[updatedChats.length - 1] };
          lastChat.ai += data.data;
          updatedChats[updatedChats.length - 1] = lastChat;
          return updatedChats;
        });
      }
      if (data.message === "ended") {
        setChats((prevChats) => {
          const updatedChats = [...prevChats];
          const lastChat = { ...updatedChats[updatedChats.length - 1] };
          lastChat.done = true;
          updatedChats[updatedChats.length - 1] = lastChat;
          return updatedChats;
        });
        setIsProcessing(false);
      }
    });

    return () => {
      newSocket.disconnect();
    };
  }, []);

  useEffect(() => {
    const currentLine = lineRef.current; // Store ref in a variable
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) {
            setDisableScroll(true);
          } else setDisableScroll(false);
        });
      },
      { threshold: 0 } // 0 means as soon as the element goes out of view
    );
    if (currentLine) {
      observer.observe(currentLine);
    }
    return () => {
      if (currentLine) {
        observer.unobserve(currentLine);
      }
    };
  }, [lineRef]);

  useEffect(() => {
    if (isProcessing && !disaleScroll) {
      containerDev.current?.scrollIntoView({
        behavior: "instant",
        block: "end",
      });
    }
  }, [isProcessing, chats, containerDev, disaleScroll]);

  useEffect(() => {
    containerDev.current?.scrollIntoView({
      behavior: "smooth",
      block: "end",
    });
  }, [chats.length]);

  const renderMessage = (message: string, index: number) => {
    const formattedMessage = message;

    return (
      <div
        key={index}
        className="message-content !text-white opacity-95 leading-7"
      >
        <ReactMarkdown rehypePlugins={[rehypeHighlight, rehypeSlug]}>
          {formattedMessage}
        </ReactMarkdown>
      </div>
    );
  };

  return (
    <div className="bg-black h-screen w-screen">
      <div className="w-full absolute top-0 left-0 p-5 flex justify-between items-center z-20">
        <div className="flex items-center gap-4">
          <img
            src="/public/images/chat-tab-icon.svg"
            alt="chat-tab"
            className="w-[22px] h-[22px]"
          />
          <img
            src="/public/images/new-chat-icon.svg"
            alt="new-chat"
            className="w-[22px] h-[22px]"
          />
        </div>
        <div className="bg-[#020CF5] rounded-full absolute top-5 right-5">
          <img
            src="/public/images/versein-white.svg"
            alt="profile"
            className="w-8 h-8"
          />
        </div>
      </div>

      <div className="chat_container ">
        <div className="chat_page">
          <div
            className={`chats_data ${
              chats.length === 0 &&
              "flex items-center justify-center h-screen overflow-hidden"
            }`}
            ref={scrollableRef}
          >
            <div className="chats_data_inner !mt-2 relative">
              {/* Pushed further up */}
              {chats.length > 0 ? (
                chats.map((chat, index) => (
                  <div key={index}>
                    <div className="flex gap-6 mb-10 items-center">
                      <div className="bg-[#020CF5] rounded-full">
                        <img
                          src={VerseinLogoWhite}
                          alt="profile"
                          className="w-7 h-7"
                        />
                      </div>

                      <div className="px-2.5 text-white text-base mt-1">
                        <p>{chat.user}</p>
                      </div>
                    </div>
                    <div className="ai-chat -translate-x-6">
                      <div className="ai-chatbox !gap-0">
                        <div className="w-[80px] mt-1">
                          <img src={SmallLuminous} alt="Luminous" />
                        </div>
                        <div className="ai-response !w-[calc(720px)] mt-1">
                          <div className="ai-response-box">
                            <div className="chat-text">
                              {renderMessage(chat.ai, index)}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              ) : firstAccess ? (
                <div className="flex flex-col w-max mt-4"> {/* Adjusted position */}
                  <div className="flex flex-col gap-0 pl-5 mb-5">
                    <p
                      className="text-[#AFDCEC] text-5xl"
                      style={{
                        fontFamily: "gamay-wide, sans-serif",
                        fontWeight: 400,
                        fontStyle: "normal",
                        lineHeight: "1",
                      }}
                    >
                      Hello, Captain!
                    </p>
                    <p
                      className="text-[#B1B1B1] text-4xl"
                      style={{
                        fontFamily: "gamay-wide, sans-serif",
                        fontWeight: 400,
                        fontStyle: "normal",
                        lineHeight: "1",
                      }}
                    >
                      How can I assist you today.
                    </p>
                  </div>
                  <Input
                    socket={socket}
                    isProcessing={isProcessing}
                    setChats={setChats}
                    setIsProcessing={setIsProcessing}
                  />
                </div>
              ) : (
                <></>
              )}
              <div
                className="w-0.5 h-0.5 absolute -bottom-0 bg-transparent"
                ref={lineRef}
              ></div>
              <div
                className={`w-0.5 h-0.5 bg-transparent absolute ${
                  disaleScroll ? "-bottom-24" : "-bottom-8"
                }`}
                ref={containerDev}
              />
            </div>
            {disaleScroll && (
              <div
                onClick={() => {
                  containerDev.current?.scrollIntoView({
                    behavior: "smooth",
                    block: "end",
                  });
                }}
                className="w-8 h-8 rounded-full bg-black border border-white flex items-center justify-center absolute bottom-40 right-0 left-0 mx-auto z-10 cursor-pointer"
              >
                <ArrowDownIcon color="#c1c1c1" size={18} />
              </div>
            )}
          </div>

          <div className="fixed bottom-5  left-0 right-0 flex flex-col items-center gap-6">
            {" "}
            {chats.length > 0 && (
              <Input
                socket={socket}
                isProcessing={isProcessing}
                setChats={setChats}
                setIsProcessing={setIsProcessing}
              />
            )}
            <p className="text-[#c1c1c1] text-[13px] font-light">
              Grounded Artificial Intelligence Retrieval-Augmented Generation
              Environment.
            </p>
          </div>

          <div className="fixed bottom-5 left-0 right-0 flex flex-col items-center gap-6">
            {/* Footer remains in its original place */}
            {/* <p className="text-[#c1c1c1] text-[14px] font-light">
              Grounded Artificial Intelligence Retrieval-Augmented Generation
              Environment.
            </p> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chatpage;
