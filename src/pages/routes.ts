import { FC } from "react";

import { Courses } from "./Courses";
import { Landing } from "./Landing";
import { Quiz } from "./Quiz";

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
    key: "courses-page",
    path: "/courses",
    component: Courses,
  },
  {
    key: "quiz-page",
    path: "/courses/:id",
    component: Quiz,
  },
];
