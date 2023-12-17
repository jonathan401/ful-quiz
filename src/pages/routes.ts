import { FC } from "react";

import { QuizPage } from "./QuizPage";
import { Landing } from "./Landing";

interface Routes {
  key: string;
  path: string;
  component: FC;
}

export const routes: Routes[] = [
  {
    key: "landing-route",
    path: "/",
    component: Landing,
  },
  {
    key: "quiz-page-route",
    path: "/quiz",
    component: QuizPage,
  },
];
