import { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { Input } from "../Input";
import Button from "../Button/Button";
import { confirmPasswordReset } from "firebase/auth";
import { toast } from "react-toastify";
import { auth } from "../../firebase-config";
import { firebaseAuthErrorMap } from "../../helpers";

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
    setValue,
  } = useForm<PasswordResetInputProps>({
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
  });

  console.log(oobCode);

  const onSubmit: SubmitHandler<PasswordResetInputProps> = async (data) => {
    if (data.password !== data.confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    try {
      if (oobCode) {
        await confirmPasswordReset(auth, oobCode, data.confirmPassword);
        setValue("password", "");
        setValue("confirmPassword", "");
        toast.success("Password successfully updated!");
      } else {
        toast.error("something went wrong! Try again later!");
      }
    } catch (error: any) {
      toast.error(firebaseAuthErrorMap[error.code]);
    }
  };

  return (
    <section className="container-flexed">
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
              placeholder="Confirm password"
              id="reset-password-confirm"
              {...register("confirmPassword", { required: true })}
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
          <Button className="btn btn--primary btn--full-width" type="submit">
            Reset password
          </Button>
        </form>
      </div>
    </section>
  );
};

export default PasswordReset;
