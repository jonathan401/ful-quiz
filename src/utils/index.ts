import { QuizAnswerType, QuizQuestionType } from "../types/quiz";

// export const shuffleArray = (array: QuizQuestionType[]) => {
//   const shuffledArray = array
//     .map((a) => ({ sort: Math.random(), value: a }))
//     .sort((a, b) => a.sort - b.sort)
//     .map((a) => a.value);

//   // console.log(shuffledArray.map((question) => question.choices));
//   return shuffledArray;
// };

export const shuffleArray = (array: QuizQuestionType[]) => {
  const shuffledArray = [...array];
  shuffledArray.forEach((question) => {
    for (let i = question.choices.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [question.choices[i], question.choices[j]] = [
        question.choices[j],
        question.choices[i],
      ];
    }
  });

  for (let i = shuffledArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
  }

  return shuffledArray;
};

const shuffleChoices = (choices: string[]) => {
  return choices
    .map((a) => ({ sort: Math.random(), value: a }))
    .sort((a, b) => a.sort - b.sort)
    .map((a) => a.value);
};

export const addLeadingZero = (number: number) =>
  number.toString().padStart(2, "0");

export const range = (min: number, max: number) => {
  if (min > max) {
    return;
  }
  const rangeArr = [];
  for (let i = min; i < max; i++) {
    rangeArr.push(i);
  }

  return rangeArr;
};

export const alphabetMap: { [key: string]: string } = {
  0: "A",
  1: "B",
  2: "C",
  3: "D",
  4: "E",
};
