import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm, SubmitHandler } from "react-hook-form";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";

import { Input } from "../../components/Input";
import { db, auth } from "../../firebase-config";
import { userAuthContext } from "../../context/AuthContext";
import Button from "../../components/Button/Button";
import { toast } from "react-toastify";

export interface SignupFormInput {
  username: string;
  email: string;
  password: string;
}

const SignUpForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<SignupFormInput>({
    defaultValues: {
      username: "",
      email: "",
      password: "",
    },
  });
  const navigate = useNavigate();
  const { signUpWithEmail, loading } = userAuthContext();

  const onSubmit: SubmitHandler<SignupFormInput> = async (data) => {
    try {
      await signUpWithEmail(data.username, data.email, data.password);
      navigate("/courses");
    } catch (err: any) {
      console.log("the error: ", err.code);
    }
  };

  return (
    <section className="container-flexed">
      <h1 className="page-header visually-hidden">Sign up</h1>
      <div className="auth-form-container">
        <h2 className="page-header-2">Sign up</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="form-group">
            <label htmlFor="sign-up-username" className="form-label">
              Username
            </label>
            <Input
              autoComplete="off"
              type="text"
              placeholder="Enter username"
              id="sign-up-username"
              {...register("username", { required: true })}
              className="form-control"
              aria-invalid={errors.username ? "true" : "false"}
            />
            {errors.username?.type === "required" && (
              <span className="form-error" role="alert">
                This field is required
              </span>
            )}
          </div>
          <div className="form-group">
            <label htmlFor="sign-up-email" className="form-label">
              Email
            </label>
            <Input
              autoComplete="off"
              type="text"
              placeholder="Enter email"
              id="sign-up-email"
              className="form-control"
              {...register("email", {
                pattern: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                required: true,
              })}
              aria-invalid={errors.email ? "true" : "false"}
            />
            {(errors.email?.type === "required" && (
              <span className="form-error" role="alert">
                email is required
              </span>
            )) ||
              (errors.email?.type === "pattern" && (
                <span className="form-error" role="alert">
                  Invalid email
                </span>
              ))}
          </div>
          <div className="form-group">
            <label htmlFor="sign-up-password" className="form-label">
              Password
            </label>
            <Input
              autoComplete="off"
              type="password"
              placeholder="Enter password"
              id="sign-up-password"
              {...register("password", { required: true })}
              className="form-control"
              isTypePassword
              aria-invalid={errors.password ? "true" : "false"}
            />
            {errors.password?.type === "required" && (
              <span className="form-error" role="alert">
                Password is required
              </span>
            )}
          </div>
          <Button
            className="btn btn--primary btn--full-width"
            loading={loading}
          >
            Sign up
          </Button>
        </form>
      </div>
      <p className="auth-text">
        Already have an account?{" "}
        <Link to="/auth/signin" className="auth-link">
          Log in
        </Link>
      </p>
    </section>
  );
};

export default SignUpForm;
