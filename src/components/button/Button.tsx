import { forwardRef, ComponentProps } from "react";

interface ButtonProps extends ComponentProps<"button"> {
  disabled?: boolean;
  text: string;
}

const Button: React.FC<ButtonProps> = ({ disabled, text, ...rest }) => {
  return <button {...rest}>{text}</button>;
};

export default Button;
