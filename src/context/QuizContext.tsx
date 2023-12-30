import React, {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { QuizAnswerType, QuizQuestionType } from "../types/quiz";

// data
import { quiz, GST102 } from "../data";
import { shuffleArray } from "../utils";
import { useParams } from "react-router-dom";

type QuizContextType = {
  answeredQuestions: QuizAnswerType[];
  addAnsweredQuestion: (questionId: number, answer: QuizAnswerType) => void;
  quizQuestions: QuizQuestionType[] | [];
  reshuffleQuestions: () => void;
  setQuestions: Dispatch<SetStateAction<QuizQuestionType[]>>;
  clearChoice: (questionId: number) => void;
  resetQuestions: () => void;
};

const QuizContext = createContext<QuizContextType>({
  answeredQuestions: [],
  addAnsweredQuestion: () => {},
  quizQuestions: [],
  reshuffleQuestions: () => {},
  setQuestions: () => {},
  clearChoice: () => {},
  resetQuestions: () => {},
});

const QuizProvider = ({ children }: { children: ReactNode }) => {
  const [answeredQuestions, setAnsweredQuestions] = useState<QuizAnswerType[]>(
    []
  );
  const [questions, setQuestions] = useState<QuizQuestionType[] | []>([]);

  // console.log(CoursesList[0]);

  const clearChoice = (questionId: number) => {
    setAnsweredQuestions((prevAnswers) => {
      const rest = [
        ...prevAnswers.filter((answer) => answer.questionNumber !== questionId),
      ];
      const choice = prevAnswers.filter(
        (answer) => answer.questionNumber === questionId
      )[0];
      choice.answer = null;
      return [...rest, choice];
    });
  };

  const addAnsweredQuestion = (questionId: number, answer: QuizAnswerType) => {
    setAnsweredQuestions((prevAnswers) => {
      // if the question has been answered, update the answer else add the new answer
      if (questionId >= 0 && questionId < prevAnswers.length) {
        return prevAnswers.map((obj, i) => (i === questionId ? answer : obj));
      } else {
        // return [..previousAnswers, answer];
        // if the index does not exists
        // REVIEW: THIS IS REALLY HACKY
        /* 
          when the user answers a question, save that question and if it is edited, find that question and update
          its value. If the question is being answered for the first time, add that answer to the question
        */
        let newAnswers = [...prevAnswers];
        for (let i = 0; i <= questionId; i++) {
          if (!newAnswers[i]) {
            newAnswers[i] =
              i === questionId
                ? answer
                : {
                    question: null,
                    answer: null,
                    correct: false,
                    questionNumber: i,
                  };
          }
        }

        return newAnswers;
      }
    });
  };

  const reshuffleQuestions = () => {
    // TODO be able to shuffle the options too
    setQuestions(shuffleArray(questions));
    setAnsweredQuestions([]);
  };

  const resetQuestions = () => setAnsweredQuestions([]);

  const context = useMemo(() => {
    return {
      answeredQuestions,
      addAnsweredQuestion,
      quizQuestions: questions,
      reshuffleQuestions,
      setQuestions,
      clearChoice,
      resetQuestions,
    };
  }, [questions, answeredQuestions]);

  return (
    <QuizContext.Provider value={context}>{children}</QuizContext.Provider>
  );
};

export const useQuizContext = () => {
  const context = useContext(QuizContext);

  if (!context) {
    throw new Error("Quiz context must be used within a Quiz provider");
  }

  return context;
};

export default QuizProvider;
