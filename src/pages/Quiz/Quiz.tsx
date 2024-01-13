import { useEffect, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";

// style import
import "./Quiz.style.scss";

import { useQuizContext } from "../../context/QuizContext";

import Question from "../../components/Question/Question";
import { range, shuffleArray } from "../../utils";
import QuizNavButton from "../../components/QuizNavButton/QuizNavButton";
import { QuizData, quiz } from "../../data";
import { NotFoundEmptyState } from "../../components/NotFoundEmptyState";
import { STORAGE_CONSTANTS } from "../../constants";

const Quiz = () => {
  const [currentQuestion, setCurrentQuestion] = useState<number>(() => {
    const storedQuestionNumberRef = sessionStorage.getItem(
      STORAGE_CONSTANTS.CURRENT_QUESTION
    );
    const storedQuestionNumber: number =
      storedQuestionNumberRef !== null
        ? JSON.parse(storedQuestionNumberRef)
        : 0;
    return Number(storedQuestionNumber);
  });
  // const [currentQuestion, setCurrentQuestion] = useState<number>(0);
  const {
    quizQuestions,
    answeredQuestions,
    reshuffleQuestions,
    setQuestions,
    resetQuestions,
  } = useQuizContext();
  const navigate = useNavigate();

  const { id } = useParams<{ id: string }>();

  useEffect(() => {
    // check if there is the questions are available
    if (!id || QuizData[id] === undefined) {
      navigate("*");
    } else {
      /* when the page loads, check if there are no questions in storage, if there isn't, 
        then shuffle the questions, else use the questions in the session storage
       */

      if (!quizQuestions.length) {
        const shuffledQuestions = shuffleArray(QuizData[id].questions);
        setQuestions(shuffledQuestions);
      }
    }
  }, [id]);

  useEffect(() => {
    sessionStorage.setItem(
      STORAGE_CONSTANTS.CURRENT_QUESTION,
      String(currentQuestion)
    );
  }, [currentQuestion]);

  const isLastQuestion = currentQuestion === quizQuestions.length - 1;

  const handleNext = () => {
    if (!isLastQuestion) {
      setCurrentQuestion((prevQuestion) => prevQuestion + 1);
    } else {
      navigate("/review");
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
    <section className="quiz-container container-padded">
      <h1 className="quiz-header">{id ? QuizData[id].code : "GST"}</h1>
      <div className="question-container">
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
      </div>
    </section>
  );
};

export default Quiz;
