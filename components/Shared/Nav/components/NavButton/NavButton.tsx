import React from "react";

import clsx from "clsx";

interface IProps {
  isActive: boolean;
  text: string;
}

const NavButton: React.FC<IProps> = ({ isActive, text }) => {
  return (
    <button
      className={clsx(
        isActive ? "bg-lime text-secondary" : "bg-primary",
        "uppercase text-xs xs:text-sm border border-textbase rounded-md px-1.5 py-1 xs:px-2 xs:py-1 shadow-xl md:shadow-none md:hover:shadow-xl transition-all duration-200 ease-in-out md:hover:bg-lime md:hover:text-secondary"
      )}
    >
      {text}
    </button>
  );
};

export default NavButton;
