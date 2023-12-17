import { ComponentProps } from "react";

// style
import "./QuizButton.style.scss";

interface QuizButtonProps extends ComponentProps<"button"> {
  text: string | number;
  active?: boolean;
  selected?: boolean;
}

const QuizButton: React.FC<QuizButtonProps> = ({
  active,
  selected,
  text,
  ...rest
}) => {
  return (
    <button
      {...rest}
      className={`${active ? "quiz-btn quiz-btn--active" : "quiz-btn"}`}
    >
      {text}
    </button>
  );
};

export default QuizButton;
