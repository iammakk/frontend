import { useNavigate } from "react-router-dom";
import Siri from "../siri/siri";

const HomePage = () => {
  const navigate = useNavigate();
  return (
    <div className="h-screen ">
      <div className="px-10 text-white">
        <div className="max-w-[1280px] mx-auto relative h-screen flex flex-col">
          {/* Logo with applied font */}
          <p
            className="top-5 left-5 mr-auto ml-0 my-8"
            style={{
              fontFamily: "gamay-wide, sans-serif",
              fontWeight: 800,
              fontStyle: "normal",
              fontSize: "20px",
            }}
          >
            VERSEIN
          </p>

          <div className=" absolute mx-auto right-0 left-0 top-[75px] z-20">
            <Siri />
          </div>

          <div className="flex flex-col mt-[250px]">
            <p className="text-xl text-center mb-5">Luminous</p>
            <p
              className="text-[#B1B1B1] text-[47px] text-center"
              style={{
                fontFamily: "gamay-wide, sans-serif",
                fontWeight: 500,
                fontStyle: "normal",
              }}
            >
              <span className="text-white glow">Build realtime AI. </span>
              Instantly transport
            </p>
            <p
              className="text-[#B1B1B1] text-[47px] text-center"
              style={{
                fontFamily: "gamay-wide, sans-serif",
                fontWeight: 500,
                fontStyle: "normal",
              }}
            >
              The knowledge in the stream.
            </p>
          </div>

          {/* Adjusted button size and font */}
          <div className="flex gap-2 mx-auto w-max my-10">
            <div
              className="bg-[#AEDCEC] hover:bg-white duration-300 border border-[#AEDCEC] hover:border-white text-black flex items-center justify-center rounded-md cursor-pointer"
              style={{
                width: "271px",
                height: "53px",
                fontFamily: "gamay-wide, sans-serif",
                fontWeight: 500,
                fontStyle: "normal",
                fontSize: "20px",
              }}
              onClick={() => {
                navigate("/login");
              }}
            >
              <p className="text-sm"> Start streaming</p>
            </div>
            <div
              className="border border-[#707070] text-white flex items-center justify-center rounded-md cursor-pointer"
              style={{
                width: "271px",
                height: "53px",
                fontFamily: "gamay-wide, sans-serif",
                fontWeight: 500,
                fontStyle: "normal",
                fontSize: "20px",
              }}
            >
              <p className="text-sm"> Read more</p>
            </div>
          </div>

          {/* Footer with customized font and 14px size */}
          <div className=" mx-auto w-max mt-auto mb-10">
            <p
              className="text-[#c1c1c1]"
              style={{
                fontFamily: "gamay, sans-serif",
                fontWeight: 200,
                fontStyle: "normal",
                fontSize: "14px",
              }} // Set to 14px
            >
              Versein Corporation © 2024 All rights reserved. / Privacy Policy /
              Terms of Use / Cookie preferences / Information Protection
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
