import { useState } from "react";
import { Button as ButtonProps, typeButton } from "./components";

const styleTypeButton: Record<typeButton, string> = {
  success: "bg-green-500",
  warning: "bg-yellow-500",
  error: "bg-red-500",
  info: "bg-blue-500",
};

export const Button = ({ text, type }: ButtonProps) => {
  const [typeButton] = useState(
    styleTypeButton[type] || styleTypeButton["info"]
  );

  return (
    <button className={`cursor-pointer rounded-full p-2 ${typeButton}`}>
      {text}
    </button>
  );
};
