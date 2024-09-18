import { Button as ButtonProps, typeButton } from "../components";

import "./styles.css";

const styleTypeButton: Record<typeButton, string> = {
  success: "btn-success",
  warning: "btn-warning",
  error: "btn-error",
  info: "btn-info",
};

export const Button = ({ text, type = "info", onClick }: ButtonProps) => {
  const typeButton = styleTypeButton[type];

  return (
    <button onClick={onClick} className={`btn ${typeButton}`}>
      {text}
    </button>
  );
};
