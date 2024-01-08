import { useNavigate, Outlet } from "react-router-dom";
import { userAuthContext } from "../context/AuthContext";
import { useEffect } from "react";

const ProtectedRoutes = () => {
  const navigate = useNavigate();
  const { currentUser } = userAuthContext();

  useEffect(() => {
    if (!currentUser) {
      navigate("/auth/signin");
    }
  }, [currentUser]);

  return <Outlet />;
};

export default ProtectedRoutes;
