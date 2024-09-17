import { useMemo } from "react";
import { Button as ButtonProps, typeButton } from "./components";

const styleTypeButton: Record<typeButton, string> = {
  success: "bg-green-500",
  warning: "bg-yellow-500",
  error: "bg-red-500",
  info: "bg-blue-500",
};

export const Button = ({ text, type }: ButtonProps) => {
  const typeButton = useMemo(
    () => styleTypeButton[type] || styleTypeButton["info"],
    [type]
  );

  return (
    <button
      className={`
      cursor-pointer rounded-full 
      py-2 px-4
      hover:opacity-90
      active:scale-95
      transition-all
      ${typeButton}
    `}
    >
      {text}
    </button>
  );
};
