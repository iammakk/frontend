"use client";
import { ReactElement, useEffect, useState } from "react";
import ModalPortal from "./modalPortal";

const Modal = ({
  children,
  open,
  setOpen,
  className,
}: {
  children: ReactElement;
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  className?: string;
}) => {
  const [visible, setVisible] = useState(open);
  const [animation, setAnimation] = useState(false);

  useEffect(() => {
    setVisible(open);
    document.body.style.overflow = open ? "hidden" : "";
    const timeout = setTimeout(() => setAnimation(open), 200);

    return () => clearTimeout(timeout);
  }, [open]);

  useEffect(() => {
    // @ts-ignore
    const handleEsc = (event) => {
      if (event.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [setOpen]);
  // @ts-ignore
  const handleOverlayClick = (event) => {
    if (event.target === event.currentTarget) setOpen(false);
  };

  return (
    <ModalPortal>
      {visible && (
        <div
          className={`fixed  inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50 transition-opacity duration-300  ${
            animation ? "opacity-100" : "opacity-0"
          }`}
          onClick={handleOverlayClick}
        >
          <div
            className={`rounded-lg bg-white shadow-lg relative max-h-[80%] overflow-scroll transform transition-transform duration-300 ${
              animation ? "opacity-100" : "opacity-0"
            } ${className}`}
          >
            {children}
          </div>
        </div>
      )}
    </ModalPortal>
  );
};

export default Modal;
