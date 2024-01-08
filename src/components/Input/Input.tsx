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
        <input
          {...rest}
          aria-label={label}
          ref={ref}
          type={inputType}
          // type={showPassword ? "text" : "password"}
        />
        {isTypePassword && (
          <button
            type="button"
            className="input--is-type-password__visibility-toggle"
            role="checkbox"
            aria-checked={inputType === "password" ? "true" : "false"}
            onClick={toggleType}
            aria-label="set password as visible"
          >
            {inputType === "password" && <AiOutlineEyeInvisible />}
            {inputType === "text" && <AiOutlineEye />}
          </button>
        )}
      </div>
    );
  }
);

export default Input;
