import { useRef, useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { Input } from "../../components/Input";
import { userAuthContext } from "../../context/AuthContext";
import { toast } from "react-toastify";
import { firebaseAuthErrorMap } from "../../helpers";
import Button from "../../components/Button/Button";

interface PasswordRecoveryInput {
  email: string;
}

const PasswordRecovery = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<PasswordRecoveryInput>({
    defaultValues: {
      email: "",
    },
  });

  const formRef = useRef(null);

  const { resetPassword, loading } = userAuthContext();

  const onSubmit: SubmitHandler<PasswordRecoveryInput> = async (data) => {
    try {
      await resetPassword(data.email);
      toast.success("Password reset link sent");
    } catch (err: any) {
      toast.error("An error occured");
    }
    data.email = "";
  };

  return (
    <div className="c password-recover-container">
      <h1 className="page-header">Password Recovery</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="form-group">
          <label htmlFor="password-recovery-email" className="form-label">
            Email
          </label>
          <Input
            autoComplete="off"
            type="text"
            placeholder="Enter email"
            id="password-recovery-email"
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
        <Button loading={loading} className="btn btn--primary btn--full-width">
          Reset password
        </Button>
      </form>
    </div>
  );
};

export default PasswordRecovery;
