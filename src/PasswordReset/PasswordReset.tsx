import { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { Input } from "../components/Input";
import Button from "../components/Button/Button";

interface PasswordResetInputProps {
  password: string;
  confirmPassword: string;
}

interface PasswordResetProps {
  oobCode: string | null;
}

const PasswordReset: React.FC<PasswordResetProps> = ({ oobCode }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<PasswordResetInputProps>({
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
  });

  console.log(oobCode);

  const onSubmit: SubmitHandler<PasswordResetInputProps> = async (data) => {
    console.log(data);
  };

  return (
    <section className="c">
      <h1 className="page-header-2">Reset password</h1>
      <div className="auth-form-container">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="form-group">
            <label htmlFor="reset-password" className="form-label">
              Password
            </label>
            <Input
              autoComplete="off"
              type="password"
              placeholder="Enter password"
              id="reset-password"
              {...register("password", { required: true })}
              className="form-control"
              isTypePassword
              aria-invalid={errors.password ? "true" : "false"}
            />
            {errors.password?.type === "required" && (
              <span className="form-error" role="alert">
                This field is required
              </span>
            )}
          </div>
          <div className="form-group">
            <label htmlFor="reset-password-confirm" className="form-label">
              Confirm password
            </label>
            <Input
              autoComplete="off"
              type="password"
              placeholder="Enter password"
              id="reset-password-confirm"
              {...register("password", { required: true })}
              className="form-control"
              isTypePassword
              aria-invalid={errors.confirmPassword ? "true" : "false"}
            />
            {errors.confirmPassword?.type === "required" && (
              <span className="form-error" role="alert">
                This field is required
              </span>
            )}
          </div>
          <Button className="btn btn--primary btn--full-width">
            Reset password
          </Button>
        </form>
      </div>
    </section>
  );
};

export default PasswordReset;
