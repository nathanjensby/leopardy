import { createContext } from "react";
import { IModal } from "../types/types";

export const ModalContext = createContext<IModal>({
  isOpen: false,
  setIsOpen: () => {},
  toggleModal: () => {},
});
