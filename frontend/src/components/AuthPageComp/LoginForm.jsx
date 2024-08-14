import { useState } from "react";
import { useAuthScreenContext } from "../../context/AuthScreenContext";
import { useAuthContext } from "../../context/AuthContext";
import notify from "../../utils/toastUtil";
import axiosInstance from "../../axios";

const LoginForm = () => {
  const { setSignupScreen } = useAuthScreenContext();
  const [inputs, setInputs] = useState({ username: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const { login } = useAuthContext();

  const handleLogin = async e => {
    e.preventDefault();

    // Basic form validation
    if (!inputs.password || !inputs.username) {
      notify("error", "Please fill in all required fields");
      return;
    }

    try {
      if (loading) return;
      setLoading(true);

      const response = await axiosInstance.post("/users/login", {
        ...inputs,
      });
      login(response.data.userResponse);
      notify("success", response.data.message);

      setInputs({ password: "", username: "" });
    } catch (error) {
      console.log(error.response.data);
      const message =
        error.response.data.error || "Could not log user in, please try again";
      notify("error", message);
      console.error("Error signing up:", message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex-container">
      <div className="form-container">
        <div className="header">
          <h1>Login</h1>
        </div>
        <div className="form-box">
          <div className="form-group">
            <label htmlFor="username">Username</label>
            <input
              id="username"
              type="text"
              value={inputs.username}
              onChange={e =>
                setInputs(inputs => ({ ...inputs, username: e.target.value }))
              }
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <div className="password-input-group">
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                value={inputs.password}
                onChange={e =>
                  setInputs(inputs => ({ ...inputs, password: e.target.value }))
                }
              />
              <button
                className="password-toggle"
                onClick={() => setShowPassword(showPassword => !showPassword)}
              >
                {showPassword ? "Hide" : "Show"}
              </button>
            </div>
          </div>
          <div className="form-actions">
            <button
              className="submit-button"
              onClick={handleLogin}
              disabled={loading}
            >
              {loading ? "Logging in..." : "Login"}
            </button>
          </div>
          <div className="signup-link">
            <p>
              Don&apos;t have an account?{" "}
              <a href="#" onClick={() => setSignupScreen()}>
                Sign up
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
