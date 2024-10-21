import { ArrowLeft, ArrowRight } from "lucide-react";
import { VerseinLogoWhite } from "../../../public/images";
import { IoClose } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import { useChatContext } from "../context/chat-context";
import { useEffect } from "react";

export const BlueHeaderIcon = () => {
  return (
    <div className="bg-[#020CF5] rounded-full absolute top-5 right-5">
      <img src={VerseinLogoWhite} alt="profile" className="w-8 h-8" />
    </div>
  );
};

const ChooseVoiceModel = () => {
  const navigate = useNavigate();
  const {
    handleSetfinalSelectedMiniVoiceChild,
    handlesSetfinalSelectedMiniVoiceParent,
    handlesSetfinalSelectedTurboVoiceParent,
    handleSetfinalSelectedTurboVoiceChild,
  } = useChatContext();

  useEffect(() => {
    handlesSetfinalSelectedMiniVoiceParent(undefined);
    handleSetfinalSelectedMiniVoiceChild(undefined);
    handlesSetfinalSelectedTurboVoiceParent(undefined);
    handleSetfinalSelectedTurboVoiceChild(undefined);
  }, []);

  return (
    <div className="relative flex items-center justify-center w-screen h-screen">
      <div className="flex items-center mt-5  fixed top-0 bottom-12  left-14 mx-auto my-auto w-max">
        <ArrowLeft
          color="white"
          width={22}
          className="cursor-pointer"
          onClick={() => {
            navigate("/chat");
          }}
        />
      </div>
      <BlueHeaderIcon />
      <div className="relative text-[#FFFFFF] w-[600px]">
        <p
          style={{
            fontFamily: '"gamay-wide", sans-serif',
            fontWeight: 400,
            fontStyle: "normal",
            fontSize: "34px",
            lineHeight: "1.2",
            marginBottom: "20px",
            paddingLeft: "0", // Removed extra padding to align with the texts below
          }}
        >
          Select Your model
        </p>
        <p
          className="text-[#C9C9C9] font-light"
          style={{
            fontFamily: '"gamay", sans-serif',
            fontWeight: 100,
            fontStyle: "normal",
            fontSize: "16px",
            lineHeight: "1",
            marginTop: "0",
            paddingTop: "0",
          }}
        >
          Models varies between speed and concurrency.
        </p>
        <div className="w-full h-[1px] bg-[#707070] my-7" />
        <div
          className="w-full h-20 bg-[#AFDCEC] rounded-xl items-center flex justify-between px-4 cursor-pointer"
          onClick={() => {
            navigate("/voice-model/mini");
          }}
        >
          <div className="flex items-center gap-8">
            <div className="flex items-center justify-between w-12 h-12 rounded-full bg-[#760BAF]">
              <img src={VerseinLogoWhite} alt="logo" />
            </div>
            <p
              className="font-light text-black"
              style={{
                fontFamily: '"gamay-wide", sans-serif',
                fontWeight: 400,
                fontStyle: "normal",
                fontSize: "17px",
              }}
            >
              Luminous-Mini-4
            </p>
          </div>
          <div className="flex items-center justify-center w-7 h-7 rounded-full border-2 border-black bg-transparent">
            <ArrowRight color="black" size={20} />
          </div>
        </div>
        <p
          className="text-[#C9C9C9] mt-3 mb-7 font-light text-base"
          style={{
            fontFamily: '"gamay", sans-serif',
            fontWeight: 100,
            fontStyle: "normal",
            fontSize: "16px",
            lineHeight: "1.6",
          }}
        >
          Our very first model, it has undergone extensive optimization, this
          model offers better pricing options at the cost of latency and speed.
        </p>

        <div
          className="w-full h-20 bg-[#AFDCEC] rounded-xl items-center flex justify-between px-4 cursor-pointer"
          onClick={() => {
            navigate("/voice-model/turbo");
          }}
        >
          <div className="flex items-center gap-8">
            <div className="flex items-center justify-between w-12 h-12 rounded-full bg-[#020CF5]">
              <img src={VerseinLogoWhite} alt="logo" />
            </div>
            <p
              className="font-light text-black"
              style={{
                fontFamily: '"gamay-wide", sans-serif',
                fontWeight: 400,
                fontStyle: "normal",
                fontSize: "17px",
              }}
            >
              Luminous-Turbo-S
            </p>
          </div>
          <div className="flex items-center justify-center w-7 h-7 rounded-full border-2 border-black bg-transparent">
            <ArrowRight color="black" size={20} />
          </div>
        </div>
        <p
          className="text-[#C9C9C9] mt-3 mb-7 font-light leading-6 text-base"
          style={{
            fontFamily: '"gamay", sans-serif',
            fontWeight: 100,
            fontStyle: "normal",
            fontSize: "16px",
            lineHeight: "1.6",
          }}
        >
          Our cutting-edge technology, this is a highly optimized model for
          real-time applications that require very low latency, it excels in
          faster queries for time-critical scenarios.
        </p>
        <div className="w-full h-[1px] bg-[#707070] mt-20" />
        <p
          className="font-thin text-sm mt-4 text-[#C9C9C9]"
          style={{
            fontFamily: '"gamay", sans-serif',
            fontWeight: 100,
            fontStyle: "normal",
            fontSize: "14px",
            lineHeight: "1",
          }}
        >
          *Rate limits of the above models are based on the account holder quota
          limits.
        </p>
        <div
          className="absolute top-0 -right-28 cursor-pointer"
          onClick={() => {
            navigate("/chat");
          }}
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="23.422" height="23.422" viewBox="0 0 23.422 23.422">
  <path id="Icon_core-x" data-name="Icon core-x" d="M29.211,7.336,27.664,5.789,17.5,15.953,7.336,5.789,5.789,7.336,15.953,17.5,5.789,27.664l1.547,1.547L17.5,19.047,27.664,29.211l1.547-1.547L19.047,17.5Z" transform="translate(-5.789 -5.789)" fill="#c3c3c3"/>
</svg>

          {/* Reduced size and made it darker */}
        </div>
      </div>
    </div>
  );
};

export default ChooseVoiceModel;
