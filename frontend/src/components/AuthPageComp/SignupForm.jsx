import React, { useRef, useState } from "react";
import { useAuthScreenContext } from "../../context/AuthScreenContext";
import axiosInstance from "../../axios";
import notify from "../../utils/toastUtil";
import usePreviewImg from "../../hooks/usePreviewImg";
import { useAuthContext } from "../../context/AuthContext";

const SignupForm = () => {
  const { setLoginScreen } = useAuthScreenContext();
  const { login } = useAuthContext();
  const [inputs, setInputs] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const fileRef = useRef(null);
  const { handleImageChange, imgUrl, setImgUrl } = usePreviewImg();

  const handleSignup = async e => {
    e.preventDefault();

    // Basic form validation
    if (!inputs.email || !inputs.password || !inputs.username) {
      notify("error", "Please fill in all required fields");
      return;
    }

    try {
      if (loading) return;
      setLoading(true);

      // Make the POST request

      const response = await axiosInstance.post("/users/signup", {
        ...inputs,
        profilePic: imgUrl,
      });

      login(response.data.userResponse);
      notify("success", response.data.message);

      setInputs({ email: "", password: "", username: "" });
      setImgUrl("");
    } catch (error) {
      // Handle network errors

      const message =
        error.response.data.message ||
        "Could not create user, please try again";
      notify("error", message);
      console.error("Error signing up:", message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex-container">
      <form className="form-container">
        <div className="header">
          <h1>Sign up</h1>
        </div>
        <div className="form-box">
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="username">Username</label>
              <input
                id="username"
                type="text"
                onChange={e =>
                  setInputs({ ...inputs, username: e.target.value })
                }
                value={inputs.username}
              />
            </div>
          </div>
          <div className="form-group">
            <label htmlFor="email">Email address</label>
            <input
              id="email"
              type="email"
              onChange={e => setInputs({ ...inputs, email: e.target.value })}
              value={inputs.email}
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <div className="password-input-group">
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                onChange={e =>
                  setInputs({ ...inputs, password: e.target.value })
                }
                value={inputs.password}
              />
              <button
                className="password-toggle"
                onClick={() => setShowPassword(showPassword => !showPassword)}
              >
                {showPassword ? "Hide" : "Show"}
              </button>
            </div>
          </div>
          <div className="profile-pic-container">
            <div className="avatar-container">
              <img
                className="avatar"
                src={imgUrl || ""}
                alt="Profile Picture"
                style={imgUrl && { display: "block" }}
              />
            </div>
            <div className="upload-container">
              <button
                className="upload-button"
                type="button"
                onClick={() => fileRef.current.click()}
              >
                Upload Avatar
              </button>
              <input
                type="file"
                ref={fileRef}
                onChange={handleImageChange}
                className="file-input"
                hidden
              />
            </div>
          </div>
          <div className="form-actions">
            <button className="submit-button" onClick={handleSignup}>
              Sign up
            </button>
          </div>
          <div className="login-link">
            <p>
              Already a user?{" "}
              <a href="#" onClick={() => setLoginScreen()}>
                Login
              </a>
            </p>
          </div>
        </div>
      </form>
    </div>
  );
};

export default SignupForm;
