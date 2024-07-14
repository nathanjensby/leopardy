import { useState } from "react";

export default () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleModal = () => {
    setIsOpen(!isOpen);
  };

  return { isOpen, toggleModal, setIsOpen };
};
