import { useEffect, useState } from "react";
import { useChatContext } from "../context/chat-context";
import {
  ArrowDown,
  ChatTabIcon,
  NewChatIcon,
  VerseinLogoWhite,
  ArrowRight,
  CautionCircle,
  CorrectCirlce,
  ChatIcon,
} from "../../../public/images";
import { Outlet } from "react-router-dom";
import { FaRegQuestionCircle } from "react-icons/fa";
import { BlueHeaderIcon } from "../voice-chat/chooseModel";

export interface chatDropdownChildrenType {
  label: string;
  index: string | number;
  canBeSelected: boolean;
}

export interface chatDropdownOptionsType {
  label: string;
  canBeSelected: boolean;
  children?: chatDropdownChildrenType[];
  hasBorder: boolean;
  firstToHasBorder: boolean;
  index: string;
}
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
      className={`w-9 h-5 rounded-full p-1 flex items-center transition-colors duration-300 ${
        isOn ? "bg-[#AEDCEC]" : "bg-white"
      }`}
    >
      <div
        className={`w-[18px] h-[18px] rounded-full bg-black transition-transform duration-300 ${
          isOn ? "translate-x-3" : "-translate-x-0.5"
        }`}
      />
    </button>
  );
};
const ChatPageHeader = ({ socket }) => {
  const {
    handleFirstAccess,
    handlesSetfinalSelectedChatChild,
    handlesSetfinalSelectedChatParent,
    finalSelectedChatParent,
    finalSelectedChatChild,
  } = useChatContext();

  const [selectedParent, setSelectedParent] =
    useState<chatDropdownOptionsType | null>(null);
  const [selectedChild, setSelectedChild] =
    useState<chatDropdownChildrenType | null>(null);

  const [openDropdown, setOpenDropdown] = useState(false);
  const chatDropdownOptions: chatDropdownOptionsType[] = [
    {
      label: "Operation Manual",
      index: "operation_manual",
      canBeSelected: true,
      children: [
        { label: "Chapter 10: Maintenance", canBeSelected: true, index: 10 },
        { label: "Weight and Balance", canBeSelected: true, index: 14 },
        {
          label: "Chapter 17: Flight Planning and Fuel Policy",
          canBeSelected: true,
          index: 17,
        },
        {
          label: "Chapter 18: Adverse Weather",
          canBeSelected: true,
          index: 18,
        },
      ],
      hasBorder: false,
      firstToHasBorder: false,
    },
    {
      label: "Flight Crew Operating Manual",
      index: "flight_crew_operating_manual",
      canBeSelected: true,
      children: [
        { label: "Limitations", canBeSelected: true, index: 1 },
        { label: "Memory Items", canBeSelected: true, index: 2 },
      ],
      hasBorder: false,
      firstToHasBorder: false,
    },
    {
      label: "Training Manual",
      index: "training_manual",
      canBeSelected: false,
      hasBorder: false,
      firstToHasBorder: false,
    },
    {
      label: "Safety Manual",
      index: "safety_manual",
      canBeSelected: false,
      hasBorder: false,
      firstToHasBorder: false,
    },
    {
      label: "Cabin Crew Operating Manual",
      index: "cabin_crew_operating_manual",
      canBeSelected: false,
      hasBorder: true,
      firstToHasBorder: true,
    },
    {
      label: "General Maintenance Manual",
      index: "general_maintenance_manual",
      canBeSelected: false,
      hasBorder: true,
      firstToHasBorder: false,
    },
  ];

  useEffect(() => {
    if (!finalSelectedChatParent) {
      handleFirstAccess(true);
    } else {
      handleFirstAccess(false);
      console.log(12);

      socket.emit("change_collection", {
        number: finalSelectedChatChild.index,
        name: finalSelectedChatChild.label,
      });
    }
  }, [finalSelectedChatParent]);

  useEffect(() => {
    if (!selectedParent) {
      setSelectedChild(null);
    }
  }, [selectedParent]);

  useEffect(() => {
    if (!openDropdown) {
      setSelectedChild(finalSelectedChatChild);
      setSelectedParent(finalSelectedChatParent);
    }
  }, [openDropdown]);

  return (
    <div>
      {openDropdown && (
        <div
          className="fixed left-0 w-screen h-screen bg-transparent "
          onClick={() => {
            setOpenDropdown(false);
          }}
        />
      )}
      <div className="w-full absolute top-0 left-0 p-5 flex justify-between items-center z-20">
        <div className="flex items-center gap-3">
          <img src={ChatTabIcon} alt="chat-tab" className="w-5 h-5" />
          <img src={NewChatIcon} alt="new-chat" className="w-5 h-5" />
          <div className="flex flex-col gap-5 relative ml-7">
            <div
              className="flex gap-4 items-center cursor-pointer"
              onClick={() => {
                setOpenDropdown(!openDropdown);
              }}
            >
              <p className="text-[#AEDCEC]">
                {finalSelectedChatParent
                  ? finalSelectedChatParent.label
                  : "Operation Manual"}
              </p>
              <img className="w-4 h-4" src={ArrowDown} />
            </div>
            <div className="absolute -bottom-7 -left-3 w-max">
              <p className="text-white font-light text-sm">
                {finalSelectedChatChild
                  ? finalSelectedChatChild.label
                  : "No Selection made"}
              </p>
            </div>
            {openDropdown && (
              <div className="flex absolute top-7 -left-5">
                <div className=" w-[300px] min-h-12 border border-[#2F2F2F] rounded-xl  bg-black p-5 z-10">
                  <div className="flex justify-between items-center">
                    <p className="text-[#D6D6D6] text-xs">Chapters</p>
                    <FaRegQuestionCircle color="#D6D6D6" />
                  </div>
                  <div className="pl-2 flex flex-col gap-5 mt-5 ">
                    {chatDropdownOptions.map((option, index) => {
                      const isSelected =
                        option?.index === selectedParent?.index;
                      return (
                        <div
                          key={index}
                          className={`flex items-center justify-between ${
                            isSelected ? "text-[#AEDCEC]" : "text-[#838383]"
                          } ${
                            option.firstToHasBorder &&
                            "border-t border-t-[#707070] pt-5"
                          } ${
                            option.hasBorder &&
                            "border-b border-b-[#707070] pb-5"
                          } ${option.canBeSelected && "cursor-pointer"}`}
                          onClick={() => {
                            if (option.canBeSelected) {
                              setSelectedParent(option);
                            }
                          }}
                        >
                          <div className="flex items-center gap-5">
                            <p className="text-xs">{option.label}</p>
                            {!option.canBeSelected && (
                              <img
                                src={CautionCircle}
                                alt="caution"
                                className="w-3"
                              />
                            )}
                          </div>
                          {option.canBeSelected && (
                            <img
                              src={ArrowRight}
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
                  <div className="flex items-center justify-between gap-4 pt-5 pl-2">
                    <img src={ChatIcon} alt="chat-icon" className="w-4 h-4" />
                    <p className="text-white text-sm mt-1">
                      Turbo Pipeline Generation
                    </p>
                    <div>
                      <SwitchButton initialState={true} />
                    </div>
                  </div>
                </div>
                {selectedParent && (
                  <div className=" min-w-[300px] min-h-12 border border-[#2F2F2F] rounded-xl  bg-black p-5 z-10">
                    <div className="flex justify-between items-center">
                      <p className="text-[#D6D6D6] text-xs">Operation Manual</p>
                      <FaRegQuestionCircle color="#D6D6D6" />
                    </div>
                    <div className="pl-2 flex flex-col gap-5 mt-5">
                      {selectedParent?.children?.map((option, index) => {
                        const isSelected =
                          selectedChild?.index === option?.index;
                        return (
                          <div
                            key={index}
                            className={`flex items-center justify-between text-[#838383] ${
                              option.canBeSelected && "cursor-pointer"
                            }`}
                            onClick={() => {
                              handlesSetfinalSelectedChatParent(selectedParent);
                              handlesSetfinalSelectedChatChild(option);

                              setOpenDropdown(false);
                            }}
                          >
                            <div className="flex items-center gap-5">
                              <p
                                className={`text-xs ${
                                  isSelected && "text-[#AEDCEC]"
                                }`}
                              >
                                {option.label}
                              </p>
                              {!option.canBeSelected && (
                                <img
                                  src={CautionCircle}
                                  alt="caution"
                                  className="w-3"
                                />
                              )}
                            </div>
                            <img
                              src={CorrectCirlce}
                              alt="arrow-right"
                              className={`${
                                isSelected ? "opacity-100" : "opacity-60"
                              } `}
                            />
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}
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
export default ChatPageHeader;
