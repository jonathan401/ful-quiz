import { useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";

const AuthAction = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  useEffect(() => {
    let mode: string | null = searchParams.get("mode");
    if (mode === "resetPassword") {
      navigate("/password-reset");
    }

    // TODO: add mode setting for verifying user email
  }, []);

  return <div></div>;
};

export default AuthAction;
