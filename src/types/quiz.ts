export interface QuizQuestionType {
  question: string;
  choices: string[];
  type: string;
  correctAnswer: string;
}
[];

export interface QuizAnswerType {
  question: string | null;
  correct: boolean | null;
  answer: string | null;
}
