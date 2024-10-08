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
import { STORAGE_CONSTANTS } from "../constants";

// data
import { shuffleArray } from "../utils";

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
  const [answeredQuestions, setAnsweredQuestions] = useState<
    QuizAnswerType[] | []
  >(() => {
    const storedAnswersRef = sessionStorage.getItem(STORAGE_CONSTANTS.ANSWERS);
    const storedAnswers =
      storedAnswersRef !== null ? JSON.parse(storedAnswersRef) : [];
    return storedAnswers;
  });

  const [questions, setQuestions] = useState<QuizQuestionType[] | []>(() => {
    const storedAnswersRef = sessionStorage.getItem(
      STORAGE_CONSTANTS.QUESTIONS
    );
    const storedAnswers =
      storedAnswersRef !== null ? JSON.parse(storedAnswersRef) : [];
    return storedAnswers;
  });

  // preserve state of questions on reload
  useEffect(() => {
    sessionStorage.setItem(
      STORAGE_CONSTANTS.ANSWERS,
      JSON.stringify(answeredQuestions)
    );
  }, [answeredQuestions]);

  useEffect(() => {
    sessionStorage.setItem(
      STORAGE_CONSTANTS.QUESTIONS,
      JSON.stringify(questions)
    );
  }, [questions]);

  const clearChoice = (questionId: number) => {
    setAnsweredQuestions((prevAnswers) => {
      const newAnswers = [...prevAnswers];
      if (newAnswers[questionId] !== undefined) {
        newAnswers[questionId] = {
          questionNumber: null,
          question: null,
          correct: null,
          answer: null,
        };
      }
      return newAnswers;
    });
  };

  const addAnsweredQuestion = (questionId: number, answer: QuizAnswerType) => {
    setAnsweredQuestions((prevAnswers) => {
      if (questionId >= 0 && questionId < prevAnswers.length) {
        return prevAnswers.map((obj, i) => (i === questionId ? answer : obj));
      } else {
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
