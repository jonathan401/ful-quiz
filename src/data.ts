import { QuizQuestionType } from "./types/quiz";

interface QuizListType {
  topic: string;
  questions: QuizQuestionType[];
}

export const quiz: QuizListType = {
  topic: "Javascript",
  questions: [
    {
      question:
        "Which function is used to serialize an object into a JSON string in Javascript?",
      choices: ["stringify()", "parse()", "convert()", "None of the above"],
      correctAnswer: "stringify()",
    },
    {
      question:
        "Which of the following keywords is used to define a variable in Javascript?",
      choices: ["var", "let", "var and let", "None of the above"],
      correctAnswer: "var and let",
    },
    {
      question:
        "Which of the following methods can be used to display data in some form using Javascript?",
      choices: [
        "document.write()",
        "console.log()",
        "window.alert",
        "All of the above",
      ],
      correctAnswer: "All of the above",
    },
    {
      question: "How can a datatype be declared to be a constant type?",
      choices: ["const", "var", "let", "constant"],
      correctAnswer: "const",
    },
  ],
};

export const GST102: QuizListType = {
  topic: "GST 102",
  questions: [
    {
      question:
        "A paragraph is a piece of writing unified by a central controlling _______",
      choices: ["Topic", "Theme", "Title", "Tempo"],
      correctAnswer: "Theme",
    },
    {
      question: "A topic sentence can be all except one of the following",
      choices: ["Generalisation", "Problem", "Statement", "Subject"],
      correctAnswer: "Subject",
    },
    {
      question: "Paragraphs can be developed by all these methods except",
      choices: ["Definition", "Connection", "Listing Effects", "Comparison"],
      correctAnswer: "Comparison",
    },
    {
      question: "Coherence refers to the ___________",
      choices: [
        "Logical transition from one idea to the next",
        "Critical transition from one idea to the next",
        "Practical transition from one idea to the next",
        "Gradual transition from one idea to the next",
      ],
      correctAnswer: "Logical transition from one idea to the next",
    },
    {
      question: "Examples are used in paragraph development to __________.",
      choices: [
        "Persuade the reader that the generalization is correct",
        "Present the writer's perspective",
        "Identify issues",
        "Expand the writing",
      ],
      correctAnswer: "Persuade the reader that the generalization is correct",
    },
    {
      question: "Beginning a paragraph with a topic sentence ________",
      choices: [
        "Helps both the reader and the writer",
        "Makes the paragraph more interesting",
        "Allows the building of the sentence to the topic",
        "Allows for an effective summary",
      ],
      correctAnswer: "Helps both the reader and the writer",
    },
    {
      question: "Placing a topic sentence at the end of a paragraph ________",
      choices: [
        "Helps both the reader and the writer",
        "Makes the paragraph more interesting",
        "Allows for all the sentences to be built up to the topic",
        "Allows for an effective summary",
      ],
      correctAnswer: "Allows for all the sentences to be built up to the topic",
    },
    {
      question:
        "Explaining the meaning of a concept or thing is called________",
      choices: ["Illustration", "Explanation", "Definition", "Identification"],
      correctAnswer: "Definition",
    },
    {
      question: "He had a serious accident while getting off a ________ bus.",
      choices: ["Moving", "Going", "Movement", "Move"],
      correctAnswer: "Moving",
    },
    {
      question: "We need a _________ door here",
      choices: ["Slide", "Slider", "Sliding", "Slided"],
      correctAnswer: "Sliding",
    },
    {
      question: "Look at the dark clouds; it _______ rain tonight.",
      choices: ["Can't", "Can", "May", "Has"],
      correctAnswer: "May",
    },
    {
      question:
        "The interview is often called ________ because it helps the interview board get an insight into your personality",
      choices: [
        "Acuity test",
        "Psychological test",
        "Personality test",
        "Capability test",
      ],
      correctAnswer: "Personality test",
    },
    {
      question:
        "Coherence in a paragraph is achieved through all but one of the following ________",
      choices: [
        "Topic sentence",
        "Topic sentence and supporting details",
        "Transitional devices",
        "Logical transitions",
      ],
      correctAnswer: "Topic sentence",
    },
    {
      question: "One of the following words or phrases expresses result",
      choices: ["Similarly", "Accordingly", "Yet", "Furthermore"],
      correctAnswer: "Accordingly",
    },
    {
      question:
        "One of the following words or phrases expresses additional information",
      choices: ["Likewise", "Consequently", "Besides", "Next"],
      correctAnswer: "Besides",
    },
  ],
};
