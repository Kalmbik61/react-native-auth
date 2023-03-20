import { createContext, useContext, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

const AuthContext = createContext({
  isAuth: false,
  token: "",
  onAuth() {},
  onLogout() {},
});

export default AuthProvider = ({ children }) => {
  const [token, setToken] = useState("");

  const onAuth = (token) => {
    setToken(token);
    AsyncStorage.setItem("token", token);
  };
  const onLogout = () => {
    setToken(null);
    AsyncStorage.clear();
  };

  return (
    <AuthContext.Provider value={{ isAuth: !!token, token, onAuth, onLogout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => useContext(AuthContext);
