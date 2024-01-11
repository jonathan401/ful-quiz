import React, { ComponentProps, HTMLInputTypeAttribute, useState } from "react";

// style
import "./Input.style.scss";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { IconType } from "react-icons";

interface InputProps extends ComponentProps<"input"> {
  label?: string;
  isTypePassword?: boolean;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ label, isTypePassword, ...rest }, ref) => {
    const [inputType, setInputType] = useState<
      React.HTMLInputTypeAttribute | undefined
    >(rest.type);

    const toggleType = () => {
      setInputType((prevType) =>
        prevType === "password" ? "text" : "password"
      );
    };

    return (
      <div
        className={isTypePassword ? "input--is-type-password" : "input-wrapper"}
      >
        <input {...rest} aria-label={label} ref={ref} type={inputType} />
        {isTypePassword && (
          <button
            type="button"
            className="input--is-type-password__visibility-toggle"
            role="checkbox"
            aria-checked={inputType === "password" ? "false" : "true"}
            onClick={toggleType}
            aria-label="show password"
          >
            {inputType === "text" && <AiOutlineEyeInvisible />}
            {inputType === "password" && <AiOutlineEye />}
          </button>
        )}
      </div>
    );
  }
);

export default Input;
