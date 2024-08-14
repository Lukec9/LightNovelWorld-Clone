import React from "react";
import SignupForm from "../components/AuthPageComp/SignupForm";
import "../styles/AuthPageStyles.css";
import { useAuthScreenContext } from "../context/AuthScreenContext";
import LoginForm from "../components/AuthPageComp/LoginForm";

const AuthPage = () => {
  const { state } = useAuthScreenContext();

  return state.screen === "login" ? <LoginForm /> : <SignupForm />;
};

export default AuthPage;
