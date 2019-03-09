import { AsyncStorage } from "react-native";
import { TOKEN_KEY } from "../constants";

export const setToken = async token => {
  try {
    await AsyncStorage.setItem(TOKEN_KEY, JSON.stringify(token));
  } catch (error) {
    // Error saving data
  }
};

export const getToken = async () => {
  try {
    const token = await AsyncStorage.getItem(TOKEN_KEY);
    return token;
  } catch (error) {
    return null;
  }
};

export const removeToken = async (callBack = () => {}) => {
  try {
    await AsyncStorage.removeItem(TOKEN_KEY, () => callBack("Login"));
  } catch (error) {
    // Error removing data
  }
};

export const isLoggedIn = () => {
  try {
    const token = getToken();
    return !!token;
  } catch (error) {
    return error === false;
  }
};

export const authUserHeader = () => {
  const token = getToken();
  return token ? { Authorization: `Bearer ${token}` } : {};
};
