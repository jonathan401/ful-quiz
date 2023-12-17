import { useState } from "react";
import { useQuizContext } from "../../context/QuizContext";

import Question from "../../components/Question/Question";
import { range } from "../../utils";
import QuizButton from "../../components/quizNavButton/QuizButton";

const Quiz = () => {
  const [currentQuestion, setCurrentQuestion] = useState<number>(0);
  const [showResult, setShowResult] = useState<boolean>(false);

  const { quizQuestions, answeredQuestions, reshuffleQuestions } =
    useQuizContext();
  const { question, choices, correctAnswer } = quizQuestions[currentQuestion];

  const isLastQuestion = currentQuestion === quizQuestions.length - 1;

  const handleNext = () => {
    if (!isLastQuestion) {
      setCurrentQuestion((prevQuestion) => prevQuestion + 1);
    } else {
      setShowResult(true);
    }
  };

  const handlePrevious = () => {
    if (currentQuestion !== 0) {
      setCurrentQuestion((prevQuestion) => prevQuestion - 1);
    }
  };

  const retry = () => {
    reshuffleQuestions();
    setCurrentQuestion(0);
    setShowResult(false);
  };

  return (
    <section className="quiz-container">
      <h1 className="quiz-header">The FUL Quiz</h1>
      <div className="question-container">
        {!showResult && (
          <form className="question-form">
            <Question
              questionNumber={currentQuestion}
              question={question}
              options={choices}
              questions={quizQuestions}
            />
            <div className="quiz-progress-btn-group">
              <button
                type="button"
                onClick={handlePrevious}
                className="quiz-progress-btn-group__btn"
              >
                Previous
              </button>
              <button
                type="button"
                onClick={handleNext}
                className="quiz-progress-btn-group__btn"
              >
                {isLastQuestion ? "Finish" : "Next"}
              </button>
            </div>
            <div className="quiz-btn__container">
              {range(0, quizQuestions.length)?.map((num) => (
                <QuizButton
                  type="button"
                  key={crypto.randomUUID()}
                  text={num + 1}
                  onClick={() => setCurrentQuestion(num)}
                  selected={currentQuestion === num}
                />
              ))}
            </div>
          </form>
        )}
        {showResult && (
          <div>
            <p>Total questions: {quizQuestions.length}</p>
            <p>
              correct answers{" "}
              {answeredQuestions.filter((answers) => answers.correct).length}
            </p>
            <button type="button" onClick={retry}>
              Try again
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

export default Quiz;
