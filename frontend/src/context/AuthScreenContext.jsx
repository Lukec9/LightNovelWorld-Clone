import React, { createContext, useReducer, useContext } from "react";

const initialState = {
  screen: "login",
};

const reducer = (state, action) => {
  switch (action.type) {
    case "login":
      return { ...state, screen: "login" };
    case "signup":
      return { ...state, screen: "signup" };
    default:
      return state;
  }
};

const AuthScreenContext = createContext();

const AuthScreenContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const setLoginScreen = () => dispatch({ type: "login" });
  const setSignupScreen = () => dispatch({ type: "signup" });

  return (
    <AuthScreenContext.Provider
      value={{ state, setLoginScreen, setSignupScreen }}
    >
      {children}
    </AuthScreenContext.Provider>
  );
};

export const useAuthScreenContext = () => useContext(AuthScreenContext);

export default AuthScreenContextProvider;
