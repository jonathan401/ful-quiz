import { useEffect, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";

// style import
import "./Quiz.style.scss";

import { useQuizContext } from "../../context/QuizContext";

import Question from "../../components/Question/Question";
import { range } from "../../utils";
import QuizNavButton from "../../components/QuizNavButton/QuizNavButton";
import { t } from "../../data";
import { NotFoundEmptyState } from "../../components/NotFoundEmptyState";

const Quiz = () => {
  const [currentQuestion, setCurrentQuestion] = useState<number>(0);
  const [showResult, setShowResult] = useState<boolean>(false);
  const { quizQuestions, answeredQuestions, reshuffleQuestions, setQuestions } =
    useQuizContext();
  const navigate = useNavigate();

  const { id } = useParams<{ id: string }>();
  useEffect(() => {
    // set the questions wnen the page loads
    if (!id || t[id] === undefined) {
      navigate("*");
    } else {
      setQuestions(t[id].questions);
    }
  }, [id]);

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

  if (!quizQuestions.length) {
    return (
      <NotFoundEmptyState
        title="Questions not available"
        redirectUrl="/courses"
        redirectText="Explore courses"
        type="empty"
      />
    );
  }

  return (
    <section className="quiz-container">
      <Link
        to="/courses"
        className="btn btn--ghost quiz-container__btn--redirect"
      >
        Go back
      </Link>
      <h1 className="quiz-header">The FUL Quiz</h1>
      <div className="question-container">
        {!showResult && (
          <form className="question-form">
            <Question
              questionNumber={currentQuestion}
              question={quizQuestions[currentQuestion].question}
              options={quizQuestions[currentQuestion].choices}
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
                <QuizNavButton
                  type="button"
                  key={crypto.randomUUID()}
                  text={num + 1}
                  onClick={() => {
                    setCurrentQuestion(num);
                  }}
                  active={currentQuestion === num}
                  // answered={
                  //   answeredQuestions
                  //     ? answeredQuestions[num]?.answer?.length > 0
                  //     : false
                  // }
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
