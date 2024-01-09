import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm, SubmitHandler } from "react-hook-form";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";

import { Input } from "../../components/Input";
import { db, auth } from "../../firebase-config";
import { userAuthContext } from "../../context/AuthContext";
import Button from "../../components/Button/Button";

interface LoginFormInput {
  email: string;
  password: string;
}

const LoginForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormInput>({
    defaultValues: {
      email: "",
      password: "",
    },
  });
  const navigate = useNavigate();

  const { LogInWithEmail, loading } = userAuthContext();

  const onSubmit: SubmitHandler<LoginFormInput> = async (data) => {
    try {
      const response = LogInWithEmail(data.email, data.password);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <section className="c">
      <h1 className="page-header visually-hidden">Login</h1>
      <div className="auth-form-container">
        <h2 className="page-header-2">Login</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="form-group">
            <label htmlFor="login-email" className="form-label">
              Email
            </label>
            <Input
              autoComplete="off"
              type="text"
              placeholder="Enter email"
              id="login-email"
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
            <label htmlFor="login-password" className="form-label">
              Password
            </label>
            <Input
              autoComplete="off"
              type="password"
              placeholder="Enter password"
              id="login-password"
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
          <Link to="/password-recovery" className="auth-link">
            Forgot password?
          </Link>
          <Button
            className="btn btn--primary btn--full-width"
            loading={loading}
          >
            {loading ? "Signing in" : "Sign in"}
          </Button>
        </form>
      </div>
      <p className="auth-text">
        Are you a new user?{" "}
        <Link to="/auth/register" className="auth-link">
          Create an account
        </Link>
      </p>
    </section>
  );
};

export default LoginForm;
