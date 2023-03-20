import axios from "axios";
const KEY = "AIzaSyDk6DZz4qvGZWr8M8k5u4vqnh9VR5tZM0Y";

export const authenticate = async (mode, email, password) => {
  const url = `https://identitytoolkit.googleapis.com/v1/accounts:${mode}?key=${KEY}`;
  const res = await axios.post(url, {
    email,
    password,
    returnSecureToken: true,
  });

  const token = res.data.idToken;

  return token;
};

export const createUser = (email, password) => {
  return authenticate("signUp", email, password);
};

export const login = (email, password) => {
  return authenticate("signInWithPassword", email, password);
};
