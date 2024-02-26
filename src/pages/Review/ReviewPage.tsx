// style
import { Link } from "react-router-dom";
import { useQuizContext } from "../../context/QuizContext";
import { alphabetMap } from "../../utils";
import "./ReviewPage.style.scss";
import { useState } from "react";

const Review = () => {
  const { answeredQuestions, quizQuestions } = useQuizContext();
  // const [showDetails, setShowDetails] = useState<boolean>(false);

  const correctAnswers = answeredQuestions.reduce((count, answer) => {
    if (answer && answer.answer !== null && answer.correct === true) {
      return (count += 1);
    } else {
      return count;
    }
  }, 0);

  const incorrectAnswers = answeredQuestions.reduce((count, answer) => {
    if (answer && answer.answer !== null && answer.correct === false) {
      return (count += 1);
    } else {
      return count;
    }
  }, 0);

  const unanswered = answeredQuestions.reduce((count, answer) => {
    if (answer && answer.answer === null) {
      return (count += 1);
    } else {
      return count;
    }
  }, 0);

  return (
    <div className="review-page">
      <section aria-labelledby="results">
        <div className="top-cover">
          <div className="container container-padded">
            <h1 className="review-page__header" id="results">
              Results
            </h1>
          </div>
        </div>
        {/* <Link to="/courses">Go back to courses</Link> */}
        <div className="container-md container-padded">
          <div className="review-meta">
            <h2 className="review-meta__header">
              {/* Total questions: {quizQuestions.length} */}
              {/* Score: {correctAnswers}/{quizQuestions.length} |{" "} */}
              Score:{" "}
              {`${Math.floor((correctAnswers / quizQuestions.length) * 100)}%`}
            </h2>
            <span>{`${correctAnswers} / ${quizQuestions.length}`}</span>
            <h3 className="review-meta__header-2">
              Correct answers: {correctAnswers}
            </h3>
            <h3 className="review-meta__header-2">
              Incorrect answers: {incorrectAnswers}
            </h3>
          </div>
          {/* <button
            className="btn btn--ghost"
            onClick={() => setShowDetails((prevState) => !prevState)}
          >
            {showDetails ? "Hide details" : "Show details"}
          </button> */}

          <>
            <p className="review-page__info">
              Answers you chose will be marked with either a red or green border
            </p>
            <ul className="review-questions-list">
              {quizQuestions.map((question, index) => {
                const storedAnswerData = answeredQuestions.find(
                  (answer) => answer.questionNumber === index
                );
                return (
                  <li className="review-question" key={`question-${index}`}>
                    <h2 className="review-question__header">
                      {`${index + 1})`} {question.question}
                    </h2>
                    <ul className="review-question__answers">
                      {question.choices.map((choice, choiceIndex) => {
                        /*
                  find the option text that has the same text as the answer and if it is the same,
                  give that option a colored border. 

                  find the option that the user chose and if it is correct, show that it is correct 
                  using green border or  mark the one the user if wrong chose as red
                 */
                        return (
                          <li
                            className={`${
                              storedAnswerData &&
                              storedAnswerData.questionNumber === index &&
                              storedAnswerData.answer === choice
                                ? storedAnswerData.correct
                                  ? "review-question__answer--correct"
                                  : "review-question__answer--wrong"
                                : "review-question__answer"
                            } review-question__answer`}
                            key={`option-${choiceIndex}`}
                          >
                            <p>
                              <span
                                className="question__alphabet"
                                aria-hidden="true"
                              >
                                {alphabetMap[choiceIndex]})
                              </span>
                              {choice}
                            </p>
                          </li>
                        );
                      })}
                      {!storedAnswerData?.correct && (
                        <p className="review-question__correct-answer">
                          Correct answer: {question.correctAnswer}
                        </p>
                      )}
                      {/* <p className="review-question__correct-answer">
                        Correct answer: {question.correctAnswer}
                      </p> */}
                    </ul>
                  </li>
                );
              })}
            </ul>
          </>
        </div>
      </section>
    </div>
  );
};

export default Review;
