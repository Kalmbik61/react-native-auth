import { useState } from "react";
import AuthContent from "../components/Auth/AuthContent";
import LoadingOverlay from "../components/ui/LoadingOverlay";
import { login } from "../utils/auth";
import { Alert } from "react-native";
import { useAuthContext } from "../components/context/AuthContext";

function LoginScreen() {
  const auth = useAuthContext();
  const [loading, setLoading] = useState(false);

  const loginHandler = async ({ email, password }) => {
    setLoading(true);
    try {
      const token = await login(email, password);
      auth.onAuth(token);
    } catch {
      setLoading(false);
      Alert.alert(
        "Authntication failed!",
        "Could not log you in. Please check your credentials or try again later."
      );
    }
  };

  if (loading) return <LoadingOverlay message={"Logging in..."} />;

  return <AuthContent isLogin onAuthenticate={loginHandler} />;
}

export default LoginScreen;
