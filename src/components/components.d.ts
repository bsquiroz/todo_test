export type typeButton = "success" | "warning" | "error" | "info";

export interface Button {
  text: string;
  type: typeButton;
  onClick: () => void;
}
