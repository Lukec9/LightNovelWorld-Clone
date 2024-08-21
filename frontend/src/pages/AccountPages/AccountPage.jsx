import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import InfoListItem from "../../components/AccountPagesComp/InfoListItem";
import StatGroup from "../../components/AccountPagesComp/StatGroup";
import ColorPicker from "../../components/ColorPicker";
import { useAuthContext } from "../../context/AuthContext";
import "../../styles/AccountPages/AccountPageStyles.css";
import notify from "../../utils/toastUtil";
import usePreviewImg from "../../hooks/usePreviewImg";
import axiosInstance from "../../axios";
import axios from "axios";

const AccountPage = () => {
  const { logout, state, dispatch } = useAuthContext();
  const [commentStats, setCommentStats] = useState({});
  const [reviewStats, setReviewStats] = useState({});
  const [novelStats, setNovelStats] = useState({
    bookmarkedNovels: null,
    novelsRead: 39,
  });
  const navigate = useNavigate();
  const { imgUrl, handleImageChange } = usePreviewImg();
  const fileRef = useRef(null);
  const MAX_CHAR = 200;
  const [remainingChar, setRemainingChar] = useState(MAX_CHAR);
  const [isModalOpen, setModalOpen] = useState(false);
  const [inputs, setInputs] = useState({
    username: state.user.username,
    about: state.user.about,
  });
  const handleTextChange = e => {
    const inputText = e.target.value;

    if (inputText.length > MAX_CHAR) {
      const truncatedText = inputText.slice(0, MAX_CHAR);
      setInputs({ ...inputs, about: truncatedText });
      setRemainingChar(0);
    } else {
      setInputs({ ...inputs, about: inputText });
      setRemainingChar(MAX_CHAR - inputText.length);
    }
  };

  const handleInputChange = e => {
    const { name, value } = e.target;
    setInputs(prevInputs => ({
      ...prevInputs,
      [name]: value,
    }));
  };

  const registeredAt = new Date(state.user.createdAt).toDateString();
  const lastActivity = new Date(state.user.lastActivity).toDateString();

  const openModal = () => setModalOpen(true);
  const closeModal = () => {
    document.body.classList.remove("bodyactive");
    setModalOpen(false);
  };

  const handleSubmit = async event => {
    event.preventDefault(); // Prevent the default form submission behavior

    // Validate inputs
    if (!inputs.username.trim()) {
      notify("error", "Username is required");
      return;
    }

    if (inputs.username.length < 3) {
      notify("error", "Username must be at least 3 characters long");
      return;
    }

    if (inputs.about.length > 200) {
      notify("error", "About section cannot exceed 200 characters");
      return;
    }

    let updates = {};
    if (inputs.username !== state.user.username) {
      updates.username = inputs.username;
    }
    if (inputs.about !== state.user.about) {
      updates.about = inputs.about;
    }
    if (imgUrl && imgUrl !== state.user.profilePic) {
      updates.profilePic = imgUrl;
    }

    if (Object.keys(updates).length === 0) {
      notify("info", "No changes to update");
      return;
    }

    try {
      const response = await axiosInstance.put(
        `/users/update/${state.user._id}`,
        updates
      );

      if (response.status === 200) {
        await dispatch({ type: "UPDATE_USER", payload: response.data.user });

        setInputs({
          username: response.data.user.username,
          about: response.data.user.about,
        });

        notify("success", "Profile updated successfully");
        closeModal();
      } else {
        notify("error", "Failed to update profile");
      }
    } catch (error) {
      notify("error", "An error occurred while updating profile");
      console.error("Error updating profile:", error);
      if (axios.isAxiosError(error)) {
        console.error("Axios error details:", error.response?.data);
      }
    } finally {
      // Reset the updates object
      updates = {};
    }
  };

  const handleLogout = async () => {
    try {
      const response = await axiosInstance.post("/users/logout");

      if ((response.status = 200)) {
        await logout();
        notify("success", "Logged out successfully");
        navigate("/");
      } else {
        notify("error", "Failed to log out from server");
        console.error("Logout failed with status:", response.status);
      }
    } catch (error) {
      console.error("Logout error:", error);
      notify("error", "An error occurred while logging out");
    }
  };

  const handleDelete = async () => {
    if (!window.confirm("Are you sure you want to delete your account?"))
      return;
    try {
      const response = await axiosInstance.delete(`/users/${state.user._id}`);
      if (response.status === 200) {
        logout();
        notify("success", "Successfully deleted user");
      }
    } catch (error) {
      notify("error", "An error occurred while updating profile");
      console.error("Error deleting profile:", error);
      if (axios.isAxiosError(error)) {
        console.error("Axios error details:", error.response?.data);
      }
    }
  };

  useEffect(() => {
    if (isModalOpen) {
      const dialog = document.querySelector("dialog");
      if (dialog) {
        dialog.showModal();
        document.body.classList.add("bodyactive");
      }
    } else {
      const dialog = document.querySelector("dialog");
      if (dialog) {
        dialog.close();
        document.body.classList.remove("bodyactive");
      }
    }
  }, [isModalOpen]);

  useEffect(() => {
    const getUserStats = async () => {
      try {
        const response = await axiosInstance.get(
          `/users/${state.user._id}/stats`
        );
        const resp = await axiosInstance.get(`users/bookmarks`);
        setCommentStats(response.data.commentStats[0] || {});
        setReviewStats(response.data.reviewStats[0] || {});
        setNovelStats(prevStats => ({
          ...prevStats,
          bookmarkedNovels: resp.data.novels.length,
        }));
      } catch (error) {
        notify("error", "Could not get activity stats");
      }
    };

    getUserStats();
  }, [state.user._id]);

  return (
    <div className="user-panel-body">
      <div className="profile-info">
        <div className="upanel">
          <div className="uhead">
            <h3>Profile Info</h3>
          </div>
          <ul className="info-list">
            <InfoListItem label={"User Name"} value={state.user.username} />
            <InfoListItem label={"E-Mail"} value={state.user.email} />
            <InfoListItem label={"About"} value={state.user.about} />
            <InfoListItem label={"Rank"} value={state.user.rank} />
            <InfoListItem label={"Registered"} value={registeredAt} />
            <InfoListItem label={"Last Activity"} value={lastActivity} />
          </ul>
        </div>
        <div className="upanel__buttons">
          <a className="signout" onClick={handleLogout}>
            Sign out
          </a>
          <a className="updateprof button" onClick={openModal}>
            Update Profile
          </a>
          <div className="block delete">
            <a onClick={handleDelete}>Delete Account</a>
          </div>
        </div>
      </div>

      <div className="stat-info">
        <div className="upanel">
          <div className="uhead">
            <h3>Activity Stats</h3>
          </div>
          <div className="stat-group-collection">
            <StatGroup cstats={commentStats} />
            <StatGroup rstats={reviewStats} />
            <StatGroup nstats={novelStats} />
            <StatGroup kstats={karmaStats} />
          </div>
        </div>
        <p className="reminder">
          *** The data specified here are processed periodically. The actions
          you have taken are not updated instantly.
        </p>
        <div className="restriction-warning-panel">
          <div>
            <strong>Received Restriction Warning: None</strong>
            <p>
              Once you reach the 5 warning limit, your account will be
              automatically banned. Please consider the rules when writing
              comments and reviews. Check your inbox page to follow warning
              notifications.
            </p>
          </div>
        </div>
      </div>

      <div id="theme-setting" className="theme-setting">
        <div className="upanel">
          <div className="uhead">
            <h3>Theme Settings</h3>
          </div>
          <ColorPicker />
        </div>
      </div>

      {isModalOpen && (
        <dialog className="modal-section">
          <button className="_close" onClick={closeModal}>
            <svg>
              <use xlinkHref="#i-times">
                <symbol id="i-times" viewBox="0 0 1024 1024">
                  <path d="M618.775 512l320.329-320.329c30.51-30.51 30.51-76.269 0-106.775s-76.269-30.51-106.775 0l-320.329 320.329-320.329-320.329c-30.51-30.51-76.269-30.51-106.775 0s-30.51 76.269 0 106.775l320.329 320.329-320.329 320.329c-30.51 30.51-30.51 76.269 0 106.775s76.269 30.51 106.775 0l320.329-320.329 320.329 320.329c30.51 30.51 76.269 30.51 106.775 0s30.51-76.269 0-106.775l-320.329-320.329z"></path>
                </symbol>
              </use>
            </svg>
          </button>
          <div className="modal-header">Profile Settings</div>
          <div className="edit-form">
            <form id="user_profile_update" noValidate>
              <div className="fieldset ava">
                <div className="field-col">
                  <div className="profile-pic-container">
                    <div className="avatar-container">
                      <img
                        className="avatar"
                        src={imgUrl || state.user.profilePic}
                        alt="Profile Picture"
                      />
                    </div>
                    <div className="upload-container">
                      <button
                        type="button"
                        className="upload-button button"
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
                </div>
              </div>

              <div className="fieldset">
                <label className="_lbl">Email</label>
                <div className="field-col">
                  <div className="ln_vali">
                    <input
                      name="email"
                      readOnly
                      type="email"
                      className="_int isDisabled"
                      value={state.user.email}
                      disabled
                    />
                  </div>
                </div>
              </div>

              <div className="fieldset">
                <label className="_lbl">User Name</label>
                <div className="field-col">
                  <div className="ln_vali">
                    <input
                      name="username"
                      type="text"
                      className="_int"
                      placeholder={state.user.username}
                      value={inputs.username}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>
              </div>

              <div className="fieldset">
                <label className="_lbl">About you</label>
                <div className="field-col about">
                  <div className="int-about">
                    <textarea
                      id="aboutyou"
                      name="about"
                      className="_int"
                      cols="30"
                      rows="4"
                      maxLength="200"
                      value={inputs.about}
                      onChange={handleTextChange}
                      placeholder={state.user.about}
                    />
                    <i>{remainingChar}</i>
                  </div>
                </div>
              </div>

              <div className="fieldset">
                <div className="field-col btnfield">
                  <button
                    id="submitbtn"
                    className="button"
                    type="submit"
                    onClick={handleSubmit}
                  >
                    Save Changes
                  </button>
                  <div id="statusmsg"></div>
                </div>
              </div>
              <input type="hidden" />
            </form>
          </div>
        </dialog>
      )}
    </div>
  );
};

const karmaStats = [
  { name: "Total points", value: 2 },
  { name: "Karma Level", value: 1 },
];

export default AccountPage;
