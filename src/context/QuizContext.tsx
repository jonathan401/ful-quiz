import React, {
  createContext,
  ReactNode,
  useContext,
  useMemo,
  useState,
} from "react";
import { QuizAnswerType, QuizQuestionType } from "../types/quiz";

// data
import { quiz } from "../data";
import { shuffleArray } from "../utils";

type QuizContextType = {
  answeredQuestions: QuizAnswerType[];
  addAnsweredQuestion: (questionId: number, answer: QuizAnswerType) => void;
  quizQuestions: QuizQuestionType[];
  reshuffleQuestions: () => void;
  // currentQuestion:
};

const QuizContext = createContext<QuizContextType>({
  answeredQuestions: [],
  addAnsweredQuestion: () => {},
  quizQuestions: [],
  reshuffleQuestions: () => {},
});

const QuizProvider = ({ children }: { children: ReactNode }) => {
  const [answeredQuestions, setAnsweredQuestions] = useState<QuizAnswerType[]>(
    []
  );
  const [questions, setQuestions] = useState<QuizQuestionType[]>(
    quiz.questions
  );

  const addAnsweredQuestion = (questionId: number, answer: QuizAnswerType) => {
    setAnsweredQuestions((prevAnswers) => {
      // if the question has been answered, update the answer else add the new answer
      if (questionId >= 0 && questionId < prevAnswers.length) {
        return prevAnswers.map((obj, i) => (i === questionId ? answer : obj));
      } else {
        // return [..previousAnswers, answer];
        // if the index does not exists
        // REVIEW: THIS IS REALLY HACKY
        let con = [...prevAnswers];
        for (let i = 0; i <= questionId; i++) {
          if (!con[i]) {
            con[i] =
              i === questionId
                ? answer
                : { question: null, answer: null, correct: null };
          }
        }

        return con;
      }
    });
  };

  // console.log(answeredQuestions);

  const reshuffleQuestions = () => {
    // be able to shuffle the options too
    setQuestions(shuffleArray(questions));
    setAnsweredQuestions([]);
  };

  const context = useMemo(() => {
    return {
      answeredQuestions,
      addAnsweredQuestion,
      quizQuestions: questions,
      reshuffleQuestions,
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

/* 
  actions:
    when the questions are rendered and an options is selected, get the question that is currently rendered and
    update its answer value to the value of the option
    issue is the options should have the state been directly decided by question
    
    <input 
      type="radio" 
      name="radio-name" 
      value={option} 
      checked={selectedAnswser === option}
      onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
        answerQuestion(question, e.target.value);
      }}
    />

    answerQuestion = (question, value) => {
      setAnsweredQuestions((prevQuestions) => 
        {...prevQuestions, {question, correct: question.correct === value}
        })
    }

*/
