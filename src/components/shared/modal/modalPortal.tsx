import { ReactPortal } from "react";
import { createPortal } from "react-dom"; // Import createPortal

const ModalPortal = ({
  children,
}: {
  children: React.ReactNode;
}): ReactPortal => {
  return createPortal(children, document.body);
};

export default ModalPortal;
