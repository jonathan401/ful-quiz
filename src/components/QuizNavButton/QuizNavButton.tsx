import { ComponentProps } from "react";

// style
import "./QuizNavButton.style.scss";

interface QuizNavButtonProps extends ComponentProps<"button"> {
  text: string | number;
  active?: boolean;
  answered?: boolean;
}

const QuizNavButton: React.FC<QuizNavButtonProps> = ({
  active,
  answered,
  text,
  ...rest
}) => {
  return (
    <button
      {...rest}
      className={`${active ? "quiz-btn quiz-btn--active" : "quiz-btn"} ${
        answered ? "quiz-btn--answered" : "quiz-btn"
      }`}
      // active ? ${''}
    >
      {text}
    </button>
  );
};

export default QuizNavButton;
