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

  return (
    <div className="container-sm review-page">
      <h1 className="review-page__header">Summary</h1>
      <Link to="/courses">Go back to courses</Link>
      <div className="review-meta">
        <h2>Total questions: {quizQuestions.length}</h2>
        <p>Answered questions: {answeredQuestions.length}</p>
        <p>Correct answers: {correctAnswers}</p>
      </div>
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
                {question.choices.map((choice, index) => {
                  /*
                  find the option text that has the same text as the answer and if it is the same,
                  give that option a colored border. 

                  find the option that the user chose and if it is correct, show that it is correct 
                  using green border or else find the correct one and show it green and mark the one the user 
                  chose as red
                 */
                  // console.log(choice === "stringify()");
                  return (
                    <li
                      className="review-question__answer"
                      key={`option-${index}`}
                    >
                      <span className="question__alphabet" aria-hidden="true">
                        {alphabetMap[index]})
                      </span>
                      {choice}
                    </li>
                  );
                })}
                Correct answer: {question.correctAnswer}
              </ul>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Review;
