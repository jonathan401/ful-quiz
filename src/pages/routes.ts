import { FC } from "react";

import { Courses } from "./Courses";
import { Landing } from "./Landing";
import { Quiz } from "./Quiz";
import { ReviewPage } from "./Review";
import SignUpForm from "./Authentication/SignUpForm";
import LoginForm from "./Authentication/LoginForm";
import PasswordRecovery from "./PasswordRecovery/PasswordRecovery";

interface Routes {
  key: string;
  path: string;
  component: FC;
}

export const publicRoutes: Routes[] = [
  {
    key: "landing-route",
    path: "/",
    component: Landing,
  },
  {
    key: "sign-up",
    path: "/auth/register",
    component: SignUpForm,
  },
  {
    key: "sign-in",
    path: "/auth/signin",
    component: LoginForm,
  },
  {
    key: "recovery",
    path: "/password-recovery",
    component: PasswordRecovery,
  },
];

export const protectedRoutes: Routes[] = [
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
  {
    key: "review",
    path: "/review",
    component: ReviewPage,
  },
];
