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
      className={`${
        active ? "quiz-nav-btn quiz-nav-btn--active" : "quiz-nav-btn"
      } ${answered ? "quiz-nav-btn--answered" : "quiz-nav-btn"}`}
      // active ? ${''}
    >
      {text}
    </button>
  );
};

export default QuizNavButton;
