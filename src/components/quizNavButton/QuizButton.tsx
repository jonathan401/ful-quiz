import { ComponentProps } from "react";

// style
import "./QuizButton.style.scss";

interface QuizButtonProps extends ComponentProps<"button"> {
  text: string | number;
  active?: string;
  selected?: boolean;
}

const QuizButton: React.FC<QuizButtonProps> = ({ selected, text, ...rest }) => {
  return (
    <button {...rest} className="quiz-btn">
      {text}
    </button>
  );
};

export default QuizButton;
