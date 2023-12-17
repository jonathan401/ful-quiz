import { useState } from "react";
import { useQuizContext } from "../../context/QuizContext";
import { QuizQuestionType } from "../../types/quiz";

import { addLeadingZero, alphabetMap } from "../../utils";

// styles
import "./Question.style.scss";

// question and options wil be rendered here
interface QuestionProps {
  questionNumber: number;
  question: string;
  options: string[];
  questions: QuizQuestionType[];
}

const Question = ({
  questionNumber,
  question,
  options,
  questions,
}: QuestionProps) => {
  const { addAnsweredQuestion, answeredQuestions } = useQuizContext();

  const handleAnswerQuestion = (e: React.ChangeEvent<HTMLInputElement>) => {
    addAnsweredQuestion(questionNumber, {
      answer: e.target.value,
      question,
      correct: e.target.value === questions[questionNumber].correctAnswer,
    });
  };
  return (
    <div className="question">
      <h2 className="question__header">
        {addLeadingZero(questionNumber + 1)} of {questions.length}
      </h2>
      <fieldset className="question-wrapper">
        <legend className="question__text">{question}</legend>
        <div className="question__options">
          {options.map((option, index) => {
            const optionId = crypto.randomUUID();

            // console.log(answeredQuestions[questionNumber]);
            return (
              <div
                key={optionId}
                className="question__options-group"
                aria-label="choose options"
              >
                {/* TODO: create a reusable component for the options */}
                <input
                  type="radio"
                  name={`question-${questionNumber + 1}`}
                  id={optionId}
                  value={option}
                  /* 
                  update the checked value based on if the answered selected is same as the value of the radio input
                  note: first check if the question has been answered
                  */
                  checked={
                    answeredQuestions[questionNumber]
                      ? answeredQuestions[questionNumber].answer === option
                      : false
                  }
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    handleAnswerQuestion(e);
                  }}
                  className="question__option-control"
                />
                <label htmlFor={optionId} className="question__option-label">
                  <span className="question__alphabet" aria-hidden="true">
                    {alphabetMap[index]})
                  </span>
                  {option}
                </label>
              </div>
            );
          })}
        </div>
      </fieldset>
    </div>
  );
};

export default Question;
