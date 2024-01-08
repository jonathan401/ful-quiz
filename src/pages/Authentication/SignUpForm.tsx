import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm, SubmitHandler } from "react-hook-form";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";

import { Input } from "../../components/Input";
import { db, auth } from "../../firebase";

interface SignupFormInput {
  email: string;
  password: string;
  passwordConfirm: string;
}

const SignUpForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignupFormInput>({
    defaultValues: {
      email: "",
      password: "",
      passwordConfirm: "",
    },
  });
  const [loading, setLoading] = useState<boolean>(false);
  const navigate = useNavigate();
  // const [dataError, setDataError] = useState<string || null>(null);

  const onSubmit: SubmitHandler<SignupFormInput> = async (data) => {
    try {
      const response = await createUserWithEmailAndPassword(
        auth,
        data.email,
        data.password
      );
      console.log(response);
      navigate("/courses");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <h1 className="page-header">Sign up</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
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
        <div className="form-group">
          <label htmlFor="sign-up-password-confirm" className="form-label">
            Confirm password
          </label>
          <Input
            autoComplete="off"
            type="password"
            placeholder="Enter password"
            id="sign-up-password-confirm"
            {...register("passwordConfirm", { required: true })}
            className="form-control"
            isTypePassword
            aria-invalid={errors.passwordConfirm ? "true" : "false"}
          />
          {errors.passwordConfirm?.type === "required" && (
            <span className="form-error" role="alert">
              This field is required
            </span>
          )}
        </div>
        <button className="btn btn--primary btn--full-width">Sign up</button>
      </form>
      <p>
        Already have an account? <Link to="/signin">Log in</Link>
      </p>
    </div>
  );
};

export default SignUpForm;
