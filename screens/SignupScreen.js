import { useState } from "react";
import AuthContent from "../components/Auth/AuthContent";
import { createUser } from "../utils/auth";
import LoadingOverlay from "../components/ui/LoadingOverlay";
import { Alert } from "react-native";
import { useAuthContext } from "../components/context/AuthContext";

function SignupScreen() {
  const auth = useAuthContext();
  const [loading, setLoading] = useState(false);

  const signUpHandler = async ({ email, password }) => {
    setLoading(true);
    try {
      const token = await createUser(email, password);
      auth.onAuth(token);
    } catch {
      Alert.alert(
        "Authntication failed!",
        "Could not singup. Please try again later."
      );
    }
    setLoading(false);
  };

  if (loading) return <LoadingOverlay message={"Creating user..."} />;

  return <AuthContent onAuthenticate={signUpHandler} />;
}

export default SignupScreen;
