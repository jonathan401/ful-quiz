// style
import { Link } from "react-router-dom";
import { useQuizContext } from "../../context/QuizContext";
import { alphabetMap } from "../../utils";
import "./ReviewPage.style.scss";

const Review = () => {
  const { answeredQuestions, quizQuestions } = useQuizContext();

  const correctAnswers = answeredQuestions.reduce((count, answer) => {
    if (answer.answer && answer.correct === true) {
      return (count += 1);
    } else {
      return count;
    }
  }, 0);

  const totalAnswers = answeredQuestions.filter(
    (answer) => answer.answer !== null
  );

  return (
    <div className="container-sm review-page">
      <h1 className="review-page__header">Summary</h1>
      <Link to="/courses">Go back to courses</Link>
      <div className="review-meta">
        <h2>Total questions: {quizQuestions.length}</h2>
        <p>Answered questions: {totalAnswers.length}</p>
        <p>Correct answers: {correctAnswers}</p>
      </div>
      <p className="review-page__info">
        Answers you choose will be marked with either a red or green border
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
                      <span className="question__alphabet" aria-hidden="true">
                        {alphabetMap[choiceIndex]})
                      </span>
                      {choice}
                    </li>
                  );
                })}
                <p className="review-question__correct-answer">
                  Correct answer: {question.correctAnswer}
                </p>
              </ul>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Review;
