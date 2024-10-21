import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import Siri from "../siri/siri";

const LoginPage = ({ socket }) => {
  const navigate = useNavigate();

  const titles = [
    "Login to Luminous",
    "Welcome to the Future",
    "Experience the Power of AI",
    "Join the Revolution",
    "Unlock New Possibilities",
    "Empowering Intelligence, Empowering You",
    "Transform Your Vision with AI",
    "Innovate Beyond Boundaries",
    "AI at Your Fingertips",
    "Shape Tomorrow with Smart Solutions",
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [displayedTitle, setDisplayedTitle] = useState("");
  const [letterIndexTitle, setLetterIndexTitle] = useState(0);
  const [isVisible, setIsVisible] = useState(true);

  // Handle title streaming effect
  useEffect(() => {
    if (letterIndexTitle < titles[currentIndex].length) {
      const timeout = setTimeout(() => {
        setDisplayedTitle(
          (prev) => prev + titles[currentIndex].charAt(letterIndexTitle)
        );
        setLetterIndexTitle((prev) => prev + 1);
      }, 50);
      return () => clearTimeout(timeout);
    }
  }, [letterIndexTitle, currentIndex]);

  // Manage the transition between title fades
  useEffect(() => {
    const interval = setInterval(() => {
      setIsVisible(false);

      setTimeout(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % titles.length); // Cycle through titles
        setDisplayedTitle("");
        setLetterIndexTitle(0);
        setIsVisible(true);
      }, 1000); // 1 second fade out
    }, 3500); // Change every 5 seconds

    return () => clearInterval(interval);
  }, [titles.length]);

  return (
    <div className="w-screen h-screen text-white overflow-hidden relative">
      <div className="z-20 mb-10 absolute top-10 left-0 right-0 mx-auto w-[250px]">
        <Siri
          spinnerLocation="mx-auto top-6 right-0 left-0 absolute"
          siriWaveHeight={50}
          spinnerSize={25}
          socket={socket}
        />
      </div>
      <div className="mx-auto grid grid-cols-[60%,40%] h-full">
        <div
          className="px-14 h-full flex flex-col justify-center text-center overflow-hidden items-start py-6"
          style={{
            backgroundColor: "rgb(7,7,7)",
          }}
        >
          {/* Title with new font and styling */}
          <p className="-translate-y-20 text-xl glow">Luminous</p>
          <div
            className={`transition-all duration-500 ease-in-out transform flex flex-col items-start justify-start min-h-36 ${
              isVisible
                ? "opacity-100 translate-y-0" // New content fades in from the bottom
                : "opacity-0 -translate-y-8" // Old content fades out going upwards
            }`}
          >
            <h2
              className="text-5xl mb-6 text-white text-left leading-[60px]"
              style={{
                fontFamily: "gamay-expanded, sans-serif",
                fontWeight: 600,
                fontStyle: "normal",
              }}
            >
              {displayedTitle}
              {letterIndexTitle < titles[currentIndex].length && (
                <span className="inline-block w-6 h-6 rounded-full ml-2 text-p bg-white" />
              )}
            </h2>
          </div>
          <div
            className="flex items-center mt-5 cursor-pointer"
            onClick={() => {
              navigate("/");
            }}
          >
            <ArrowLeft color="white" width={22} />
          </div>
        </div>

        {/* Buttons: "Chat Luminous" and "Create Account" */}
        <div className="px-14 h-full flex flex-col justify-center text-center overflow-hidden bg-[rgb(7,7,7)] py-6 items-end">
          <div className="flex mx-auto w-max">
            {/* Chat Luminous Button */}
            <div
              className="bg-[#AEDCEC] hover:bg-white duration-300 border border-[#AEDCEC] hover:border-white text-black flex items-center justify-center rounded-md cursor-pointer"
              style={{
                width: "271px",
                height: "53px",
                fontFamily: "gamay-wide, sans-serif",
                fontWeight: 500,
                fontStyle: "normal",
                fontSize: "20px",
                marginTop: "-200px",
              }}
              onClick={() => {
                navigate("/chat");
              }}
            >
              <p className="text-sm">Try Luminous</p>
            </div>
          </div>

          {/* Create Account Button */}
          <div className="flex mx-auto w-max mt-4">
            <div
              className="border border-[#707070] text-white flex items-center justify-center rounded-md cursor-pointer"
              style={{
                width: "271px",
                height: "53px",
                fontFamily: "gamay-wide, sans-serif",
                fontWeight: 500,
                fontStyle: "normal",
                fontSize: "20px",
                marginTop: "-140px",
              }}
              onClick={() => {
                navigate("/signup");
              }}
            >
              <p className="text-sm">Create Account</p>
            </div>
          </div>
        </div>
      </div>

      {/* Footer with consistent styling */}
      <div className="mt-auto mb-0 fixed bottom-10 right-0 left-0 mx-auto w-max">
        <p
          className="text-[#c1c1c1]"
          style={{
            fontFamily: "gamay, sans-serif",
            fontWeight: 200,
            fontStyle: "normal",
            fontSize: "14px",
          }}
        >
          Versein Corporation © 2024 All rights reserved. / Privacy Policy /
          Terms of Use / Cookie preferences / Information Protection
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
