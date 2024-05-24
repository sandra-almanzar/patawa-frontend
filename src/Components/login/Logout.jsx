import { useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import { useEffect } from "react";
const Logout = () => {
  const { auth, setAuth } = useAuth();
  const navigate = useNavigate();
  useEffect(() => {
    localStorage.clear();
    setAuth({});
    navigate("/");
  }, []);

  return <h1>Cerrando sesión ....</h1>;
};

export default Logout;
