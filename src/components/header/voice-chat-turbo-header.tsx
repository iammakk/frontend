import { Fragment, useEffect, useState } from "react";
import { useChatContext } from "../context/chat-context";
import {
  ArrowDown,
  ArrowRight,
  CautionCircle,
  CorrectCirlce,
  ChatIcon,
  SmallLuminous,
} from "../../../public/images";
import { Outlet, useNavigate } from "react-router-dom";
import { FaCheckCircle, FaRegQuestionCircle } from "react-icons/fa";
import {
  dropdownChildrenVoiceTurboType,
  dropdownOptionsVoiceTurboType,
  turboDropdownOptions,
} from "../../util/constants";
import { AlertCircle } from "lucide-react";
import { BlueHeaderIcon } from "../voice-chat/chooseModel";

interface SwitchButtonProps {
  initialState?: boolean;
}

const SwitchButton: React.FC<SwitchButtonProps> = ({
  initialState = false,
}) => {
  const [isOn, setIsOn] = useState(initialState);

  const toggleSwitch = () => {
    setIsOn(!isOn);
  };

  return (
    <button
      onClick={toggleSwitch}
      className="w-8 h-5 rounded-full border-[#ffffff1a] p-1 flex items-center transition-colors duration-300 bg-transparent border"
    >
      <div
        className={`w-3.5 h-3.5 rounded-full  transition-transform duration-300 ${
          isOn ? "translate-x-2.5 bg-[#AEDCEC] " : "-translate-x-0.5 bg-white"
        }`}
      />
    </button>
  );
};
const VoiceChatTurboHeader = () => {
  const navigate = useNavigate();
  const {
    handleSetfinalSelectedTurboVoiceChild,
    handlesSetfinalSelectedTurboVoiceParent,
    finalSelectedTurboVoiceChild,
    finalSelectedTurboVoiceParent,
    turboModelFirstAccess,
    setTurboModelFirstAccess,
  } = useChatContext();

  const [selectedParent, setSelectedParent] =
    useState<dropdownOptionsVoiceTurboType | null>(turboDropdownOptions[0]);
  const [selectedChild, setSelectedChild] =
    useState<dropdownChildrenVoiceTurboType | null>(
      turboDropdownOptions[0].children &&
        turboDropdownOptions[0].children.length > 0
        ? turboDropdownOptions[0].children[0]
        : null
    );

  const [openDropdown, setOpenDropdown] = useState(false);

  useEffect(() => {
    if (!openDropdown && !turboModelFirstAccess) {
      setSelectedChild(finalSelectedTurboVoiceChild);
      setSelectedParent(finalSelectedTurboVoiceParent);
    }
  }, [openDropdown]);

  useEffect(() => {
    handlesSetfinalSelectedTurboVoiceParent(turboDropdownOptions[0]);
    if (
      turboDropdownOptions[0].children &&
      turboDropdownOptions[0].children.length > 0
    ) {
      handleSetfinalSelectedTurboVoiceChild(
        turboDropdownOptions[0].children[0]
      );
    }
  }, []);

  // useEffect(() => {
  //   if (!finalSelectedTurboVoiceParent) {
  //     setTurboModelFirstAccess(true);
  //   } else setTurboModelFirstAccess(false);
  // }, [finalSelectedTurboVoiceParent]);

  useEffect(() => {
    if (!selectedParent) {
      setSelectedChild(null);
    }
  }, [selectedParent]);

  return (
    <div>
      {openDropdown && (
        <div
          className="fixed left-0 w-screen h-screen bg-transparent z-20"
          onClick={() => {
            setOpenDropdown(false);
          }}
        />
      )}
      <div className="w-full absolute top-0 left-0 p-5 flex justify-between items-start z-20">
        <div className="flex items-center ">
          <div className="flex flex-col gap-5 relative ml-7">
            <div className="flex items-center relative">
              <img
                src={SmallLuminous}
                alt="back"
                className="absolute w-16 h-16 -left-[46px] cursor-pointer"
                onClick={() => {
                  navigate("/voice-model");
                }}
              />
              <div
                className={`flex gap-4  cursor-pointer items-start z-10 ml-7 mt-1 `}
                onClick={() => {
                  setOpenDropdown(!openDropdown);
                }}
              >
                <div className="text-white text-lg">
                  {finalSelectedTurboVoiceChild ? (
                    <div className="flex flex-col ">
                      <div className="flex gap-3 ">
                        <p>{finalSelectedTurboVoiceChild.label}</p>
                        <img className="w-3 h-3 mt-1.5" src={ArrowDown} />
                      </div>
                    </div>
                  ) : finalSelectedTurboVoiceParent ? (
                    <div className="flex flex-col">
                      <div className="flex gap-3 hover:bg-[#2F2F2F] transition-colors duration-200 pb-1 pt-1 pl-2 pr-2 rounded">
                        <p>{finalSelectedTurboVoiceParent.label}</p>
                        <img className="w-3 h-3 mt-1.5" src={ArrowDown} />
                      </div>
                    </div>
                  ) : (
                    ""

                  )}
                </div>
              </div>
            </div>
            <div className="absolute -bottom-7 ">
              {/* {finalSelectedTurboVoiceParent?.children &&
                finalSelectedTurboVoiceParent?.children?.length > 0 && (
                  <p className="text-white font-light text-xs">
                    {finalSelectedTurboVoiceChild
                      ? finalSelectedTurboVoiceChild.label
                      : "No Selection made"}
                  </p>
                )} */}
              {/* {!finalSelectedTurboVoiceParent && (
                <p className="text-white font-light text-xs">
                  No Selection made
                </p>
              )} */}
            </div>
            {openDropdown && (
              <div className="flex absolute top-8 left-5">
                <div className="w-[350px] min-h-12 border  rounded-2xl bg-black border-[#AEDCEC] py-5 mt-4">
                  {/* <div className="flex justify-between items-center px-4">
                    <p className="text-white font-light text-sm">Models</p>
                    <AlertCircle
                      width={15}
                      color="#D6D6D6"
                      className="rotate-180"
                    />
                  </div> */}
                  <div className="flex flex-col mt-1 gap-2 px-1.5  ">
                    {turboDropdownOptions.map((option, index) => {
                      const isSelected =
                        option?.index === selectedParent?.index;
                      return (
                        <Fragment key={index}>
                          <div
                            key={index}
                            className={`flex items-center border border-transparent rounded-lg justify-between py-3 px-2.5  hover:border-[#aedcec]  ${
                              isSelected
                                ? "text-[#AEDCEC] border-[#aedcec]"
                                : option.canBeSelected
                                ? "text-white "
                                : "text-[#838383]"
                            } ${
                              option.firstToHasBorder &&
                              "border-t border-t-[#707070] pt-5"
                            }  ${option.canBeSelected && "cursor-pointer "}`}
                            onClick={() => {
                              if (option.canBeSelected) {
                                setSelectedParent(option);
                              }
                              if (
                                option.children?.length === 0 ||
                                !option.children
                              ) {
                                handlesSetfinalSelectedTurboVoiceParent(option);
                                setOpenDropdown(false);
                                handleSetfinalSelectedTurboVoiceChild(
                                  undefined
                                );
                              }
                            }}
                          >
                            <div className="flex items-center gap-5">
                              <div className="flex flex-col font-light">
                                <p className="text-sm !opacity-100 translate-y-0.5">
                                  {option.label}
                                </p>
                                {/* <p
                                  className={`text-xs ${
                                    !isSelected && "opacity-75"
                                  }`}
                                >
                                  {option.subtitle}
                                </p> */}
                              </div>

                              {!option.canBeSelected && (
                                <img
                                  src={CautionCircle}
                                  alt="caution"
                                  className="w-3"
                                />
                              )}
                            </div>
                            {option.canBeSelected &&
                              option.children &&
                              option.children.length > 0 && (
                                <img
                                  src={ArrowRight}
                                  alt="arrow-right"
                                  className={`${
                                    isSelected ? "opacity-100" : "opacity-60"
                                  } `}
                                />
                              )}
                            {isSelected &&
                              (!option.children ||
                                option.children.length === 0) && (
                                <FaCheckCircle size={15} color="white" />
                              )}
                          </div>
                          {option.hasBorder && (
                            <div className="w-full h-[1px] bg-[#949292]" />
                          )}
                        </Fragment>
                      );
                    })}
                  </div>
                  <div className="flex items-center justify-between gap-4 pt-5 px-4 "  >
                    <div className="flex items-center gap-4">
                      <img
                        src={ChatIcon}
                        alt="chat-icon"
                        className="w-5 h-5 "
                      />
                      <p className="text-white text-sm font-light mt-1">
                        Turbo Pipeline Generation
                      </p>
                    </div>

                    <div>
                      <SwitchButton initialState={true} />
                    </div>
                  </div>
                </div>
                {/* {selectedParent && selectedParent.children?.length > 0 && (
                  <div className=" w-[350px] min-h-12 border border-[#2F2F2F] rounded-2xl  bg-black border-[#ffffff2b] py-5">
                    <div className="flex justify-between items-center px-5">
                      <p className="text-[#D6D6D6] text-sm">
                        {selectedParent.label}
                      </p>
                      <FaRegQuestionCircle color="#D6D6D6" />
                    </div>
                    <div className=" flex flex-col mt-2 gap-2 px-1.5">
                      {selectedParent?.children?.map((option, index) => {
                        const isSelected =
                          selectedChild?.index === option?.index;
                        return (
                          <div
                            key={index}
                            className={`flex items-center justify-between py-3 px-2.5 font-light  border border-transparent rounded-lg   hover:border-[#aedcec] ${
                              isSelected
                                ? "text-[#AEDCEC] border-[#aedcec]"
                                : option.canBeSelected
                                ? "text-white "
                                : "text-[#838383]"
                            } ${option.canBeSelected && "cursor-pointer "}`}
                            onClick={() => {
                              if (!option.canBeSelected) {
                                return;
                              }
                              setTurboModelFirstAccess(false);
                              handlesSetfinalSelectedTurboVoiceParent(
                                selectedParent
                              );
                              handleSetfinalSelectedTurboVoiceChild(option);
                              setOpenDropdown(false);
                            }}
                          >
                            <div className="flex items-center gap-5">
                              <p
                                className={`text-sm ${
                                  isSelected && "text-[#AEDCEC]"
                                }`}
                              >
                                {option.label}
                              </p>
                              {!option.canBeSelected && (
                                <img
                                  src={CautionCircle}
                                  alt="caution"
                                  className="w-3 mb-1"
                                />
                              )}
                            </div>
                            {option.canBeSelected && isSelected && (
                              <img
                                src={CorrectCirlce}
                                alt="arrow-right"
                                className={`${
                                  isSelected ? "opacity-100" : "opacity-60"
                                } `}
                              />
                            )}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )} */}
              </div>
            )}
          </div>
        </div>
        <BlueHeaderIcon />
      </div>
      <Outlet />
    </div>
  );
};
export default VoiceChatTurboHeader;
