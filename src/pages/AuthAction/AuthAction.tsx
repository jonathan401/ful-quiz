import { useSearchParams } from "react-router-dom";
import PasswordReset from "../../components/PasswordReset/PasswordReset";

const AuthAction = () => {
  const [searchParams] = useSearchParams();
  const mode: string | null = searchParams.get("mode");
  const oobCode: string | null = searchParams.get("oobCode");

  if (mode === "resetPassword") {
    return <PasswordReset oobCode={oobCode} />;
  }

  // TODO: add for verifying user email too
  return <div>An error occured</div>;
};

export default AuthAction;
