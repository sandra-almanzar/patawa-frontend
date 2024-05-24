import { createContext, useState, useEffect } from "react";
import Global from "../helpers/Global";

const AuthContext = createContext();
export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({});
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    authUser();
  }, []);
  const authUser = async () => {
    const token = localStorage.getItem("token");
    const user = localStorage.getItem("user");

    if (!token || !user) {
      setLoading(false);
      return false;
    }
    const userObj = JSON.parse(user);
    const userId = userObj.userId;
    try {
      const request = await fetch(Global.baseUrl + `/api/users/${userId}`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await request.json();
      if (data.error) {
        setLoading(false);
        return false;
      } else {
        setAuth(data);
        setLoading(false);
      }
    } catch (error) {
      setLoading(false);
      return false;
    }
  };
  return (
    <AuthContext.Provider value={{ auth, setAuth, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
