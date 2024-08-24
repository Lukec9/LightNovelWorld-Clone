import React, { useEffect, useState } from "react";
import timeAgo from "../../utils/timeAgo";
import notify from "../../utils/toastUtil";
import axiosInstance from "../../axios";
import { useAuthContext } from "../../context/AuthContext";
import StarRating from "../StarRating";

const NovelReview = ({ review, novelTitle, setReviews }) => {
  const {
    state: { user },
  } = useAuthContext();
  const [isModalOpen, setModalOpen] = useState(false);
  const [reviewText, setReviewText] = useState(review.text);
  const [showEdit, setShowEdit] = useState(false);
  const [likes, setLikes] = useState(review.likes.length);
  const [dislikes, setDislikes] = useState(review.dislikes.length);
  const [userLiked, setUserLiked] = useState(review.likes.includes(user?._id)); // Assuming you have `userId`
  const [userDisliked, setUserDisliked] = useState(
    review.dislikes.includes(user?._id)
  );
  const [loading, setLoading] = useState(false);
  const openModal = () => setModalOpen(true);
  const closeModal = () => {
    document.body.classList.remove("bodyactive");
    setModalOpen(false);
  };
  const handleEdit = async event => {
    if (!review) return;
    if (!user) return notify("error", "Must be logged in");
    if (user?._id !== review.userId._id)
      return notify("error", "Can't edit others reviews");
    if (loading) return;
    event.preventDefault();

    if (review.text.trim() === reviewText.trim()) {
      notify("info", "Nothing different to update");
      return;
    }

    try {
      setLoading(true);
      const response = await axiosInstance.put(
        `/novels/${review.novelId}/reviews/${review._id}`,
        {
          text: reviewText,
        }
      );
      review.text = response.data.review.text;
      notify("success", "Successfully edited review!");
      setReviewText(response.data.review.text);
      closeModal();
      setShowEdit(false);
    } catch (error) {
      if (error.response.data.errors) {
        error.response.data.errors.map((err, i) => notify("error", err));
      } else {
        const msg = "Unable to edit review, please try again!";
        notify("error", msg);
      }
    } finally {
      setLoading(false);
    }
  };
  const handleDelete = async () => {
    if (!window.confirm("Are you sure you want to delete your review?")) return;
    try {
      const response = await axiosInstance.delete(
        `/novels/${review.novelId}/reviews/${review._id}`
      );
      if (response.status === 200) {
        setReviews(prevReviews =>
          prevReviews.filter(r => r._id !== review._id)
        );
        closeModal();
        notify("success", "Successfully deleted review");
      }
    } catch (error) {
      notify("error", "An error occurred while trying to delete review");
    }
  };

  const handleLikeDislike = async type => {
    if (loading) return;
    if (!user) return notify("error", "Must be logged in to like/dislike");

    try {
      setLoading(true);
      const response = await axiosInstance.patch(
        `/novels/${review.novelId}/reviews/${review._id}/like`,
        { type }
      );

      if (response.status === 200) {
        const updatedReview = response.data;

        setReviews(prevReviews =>
          prevReviews.map(r => {
            if (r._id === review._id) {
              return {
                ...r,
                likes: updatedReview.likes,
                dislikes: updatedReview.dislikes,
              };
            }
            return r;
          })
        );

        setLikes(updatedReview.likes.length);
        setDislikes(updatedReview.dislikes.length);
        setUserLiked(updatedReview.likes.includes(user?._id));
        setUserDisliked(updatedReview.dislikes.includes(user?._id));
      }
    } catch (error) {
      notify("error", "Error liking/disliking the review");
    } finally {
      setLoading(false);
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

  return (
    <>
      <div className="review-item  ">
        <meta itemProp="datePublished" content="2024-08-01T07:47:32" />
        <div className="review-info">
          <div className="review-user-avatar" data-ulvlgrp={1}>
            <img
              className="avatar  ls-is-cached lazyloaded"
              src={review.userId.profilePic}
              alt={review.userId.username}
            />
            <span className="klvl">1</span>
          </div>
          <div className="user">
            <span className="username" itemProp="sameAs">
              <strong itemProp="name">{review.userId.username}</strong>
            </span>
            <div className="sub-items">
              <span className="tier tier0">{review.userId.rank}</span>
            </div>
          </div>
          <div className="top-right">
            <span className="onChap">
              {review.chapterNumber
                ? `Chapter ${review.chapterNumber}`
                : novelTitle}
            </span>
            <span className="review-date">
              {timeAgo(new Date(review.createdAt))}
            </span>
          </div>
        </div>
        <StarRating rating={review.rating} />
        <div className="review-text" data-spoiler={0}>
          <p itemProp="reviewBody">{review.text}</p>
          <div className="rev-remo">
            <a href="">Read More</a>
          </div>
        </div>
        <div className="revtoolbar">
          <div className="leftside">
            <span className="reply-review tool-button" data-uaction="revreply">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width={16}
                height={16}
                fill="currentColor"
                className="bi bi-chat-dots"
                viewBox="0 0 16 16"
              >
                <path d="M5 8a1 1 0 1 1-2 0 1 1 0 0 1 2 0m4 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0m3 1a1 1 0 1 0 0-2 1 1 0 0 0 0 2" />
                <path d="m2.165 15.803.02-.004c1.83-.363 2.948-.842 3.468-1.105A9 9 0 0 0 8 15c4.418 0 8-3.134 8-7s-3.582-7-8-7-8 3.134-8 7c0 1.76.743 3.37 1.97 4.6a10.4 10.4 0 0 1-.524 2.318l-.003.011a11 11 0 0 1-.244.637c-.079.186.074.394.273.362a22 22 0 0 0 .693-.125m.8-3.108a1 1 0 0 0-.287-.801C1.618 10.83 1 9.468 1 8c0-3.192 3.004-6 7-6s7 2.808 7 6-3.004 6-7 6a8 8 0 0 1-2.088-.272 1 1 0 0 0-.711.074c-.387.196-1.24.57-2.634.893a11 11 0 0 0 .398-2" />
              </svg>{" "}
              <strong>Reply (0)</strong>
            </span>
            <span className="divider" />
            <span
              className="tool-button"
              data-uaction="revreport"
              data-reporttype={3}
            >
              <i className="icon-attention" /> Report
            </span>
          </div>
          <div className="side">
            <div className="usrlike">
              <span className="_grp" onClick={() => handleLikeDislike("like")}>
                <input
                  type="radio"
                  name={`urevlike_${review._id}`}
                  id={`inputrevlike_${review._id}`}
                  defaultValue={0}
                  data-checked="false"
                />
                <label
                  className={userLiked ? "active" : ""}
                  htmlFor={`inputrevlike_${review._id}`}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    className="bi bi-hand-thumbs-up"
                    viewBox="0 0 16 16"
                  >
                    <path d="M8.864.046C7.908-.193 7.02.53 6.956 1.466c-.072 1.051-.23 2.016-.428 2.59-.125.36-.479 1.013-1.04 1.639-.557.623-1.282 1.178-2.131 1.41C2.685 7.288 2 7.87 2 8.72v4.001c0 .845.682 1.464 1.448 1.545 1.07.114 1.564.415 2.068.723l.048.03c.272.165.578.348.97.484.397.136.861.217 1.466.217h3.5c.937 0 1.599-.477 1.934-1.064a1.86 1.86 0 0 0 .254-.912c0-.152-.023-.312-.077-.464.201-.263.38-.578.488-.901.11-.33.172-.762.004-1.149.069-.13.12-.269.159-.403.077-.27.113-.568.113-.857 0-.288-.036-.585-.113-.856a2 2 0 0 0-.138-.362 1.9 1.9 0 0 0 .234-1.734c-.206-.592-.682-1.1-1.2-1.272-.847-.282-1.803-.276-2.516-.211a10 10 0 0 0-.443.05 9.4 9.4 0 0 0-.062-4.509A1.38 1.38 0 0 0 9.125.111zM11.5 14.721H8c-.51 0-.863-.069-1.14-.164-.281-.097-.506-.228-.776-.393l-.04-.024c-.555-.339-1.198-.731-2.49-.868-.333-.036-.554-.29-.554-.55V8.72c0-.254.226-.543.62-.65 1.095-.3 1.977-.996 2.614-1.708.635-.71 1.064-1.475 1.238-1.978.243-.7.407-1.768.482-2.85.025-.362.36-.594.667-.518l.262.066c.16.04.258.143.288.255a8.34 8.34 0 0 1-.145 4.725.5.5 0 0 0 .595.644l.003-.001.014-.003.058-.014a9 9 0 0 1 1.036-.157c.663-.06 1.457-.054 2.11.164.175.058.45.3.57.65.107.308.087.67-.266 1.022l-.353.353.353.354c.043.043.105.141.154.315.048.167.075.37.075.581 0 .212-.027.414-.075.582-.05.174-.111.272-.154.315l-.353.353.353.354c.006.005.041.05.041.17a.9.9 0 0 1-.121.416c-.165.288-.503.56-1.066.56z" />
                  </svg>{" "}
                  <span className={`revlc_${review._id}`}>{likes}</span>
                </label>
              </span>
              <span className="divider" />
              <span
                className="_grp"
                onClick={() => handleLikeDislike("dislike")}
              >
                <input
                  type="radio"
                  name={`urevlike_${review._id}`}
                  id={`inputrevdislike_${review._id}`}
                  defaultValue={1}
                  data-checked="false"
                />
                <label
                  className={userDisliked ? "active" : ""}
                  htmlFor={`inputrevdislike_${review._id}`}
                >
                  <span className={`revdlc_${review._id}`}>{dislikes}</span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    className="bi bi-hand-thumbs-down"
                    viewBox="0 0 16 16"
                  >
                    <path d="M8.864 15.674c-.956.24-1.843-.484-1.908-1.42-.072-1.05-.23-2.015-.428-2.59-.125-.36-.479-1.012-1.04-1.638-.557-.624-1.282-1.179-2.131-1.41C2.685 8.432 2 7.85 2 7V3c0-.845.682-1.464 1.448-1.546 1.07-.113 1.564-.415 2.068-.723l.048-.029c.272-.166.578-.349.97-.484C6.931.08 7.395 0 8 0h3.5c.937 0 1.599.478 1.934 1.064.164.287.254.607.254.913 0 .152-.023.312-.077.464.201.262.38.577.488.9.11.33.172.762.004 1.15.069.13.12.268.159.403.077.27.113.567.113.856s-.036.586-.113.856c-.035.12-.08.244-.138.363.394.571.418 1.2.234 1.733-.206.592-.682 1.1-1.2 1.272-.847.283-1.803.276-2.516.211a10 10 0 0 1-.443-.05 9.36 9.36 0 0 1-.062 4.51c-.138.508-.55.848-1.012.964zM11.5 1H8c-.51 0-.863.068-1.14.163-.281.097-.506.229-.776.393l-.04.025c-.555.338-1.198.73-2.49.868-.333.035-.554.29-.554.55V7c0 .255.226.543.62.65 1.095.3 1.977.997 2.614 1.709.635.71 1.064 1.475 1.238 1.977.243.7.407 1.768.482 2.85.025.362.36.595.667.518l.262-.065c.16-.04.258-.144.288-.255a8.34 8.34 0 0 0-.145-4.726.5.5 0 0 1 .595-.643h.003l.014.004.058.013a9 9 0 0 0 1.036.157c.663.06 1.457.054 2.11-.163.175-.059.45-.301.57-.651.107-.308.087-.67-.266-1.021L12.793 7l.353-.354c.043-.042.105-.14.154-.315.048-.167.075-.37.075-.581s-.027-.414-.075-.581c-.05-.174-.111-.273-.154-.315l-.353-.354.353-.354c.047-.047.109-.176.005-.488a2.2 2.2 0 0 0-.505-.804l-.353-.354.353-.354c.006-.005.041-.05.041-.17a.9.9 0 0 0-.121-.415C12.4 1.272 12.063 1 11.5 1" />
                  </svg>{" "}
                </label>
              </span>
            </div>
          </div>
          {user?._id === review.userId._id && (
            <a
              onClick={openModal}
              className="usercomact"
              title="User Action Menu"
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
                <path d="M120 256c0 30.9-25.1 56-56 56s-56-25.1-56-56s25.1-56 56-56s56 25.1 56 56zm160 0c0 30.9-25.1 56-56 56s-56-25.1-56-56s25.1-56 56-56s56 25.1 56 56zm104 56c-30.9 0-56-25.1-56-56s25.1-56 56-56s56 25.1 56 56s-25.1 56-56 56z" />
              </svg>
            </a>
          )}
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
          <div className="modal-header">Review Actions</div>
          <div className="comment-action-menu">
            {showEdit ? (
              <form onSubmit={handleEdit}>
                {" "}
                <textarea
                  name="commenttext"
                  id="commenttext"
                  className="reviewtext"
                  placeholder={reviewText}
                  value={reviewText}
                  onChange={e => setReviewText(e.target.value)}
                />{" "}
                <button type="submit">Submit Edit</button>
                <button type="button" onClick={() => setShowEdit(false)}>
                  Cancel{" "}
                </button>
              </form>
            ) : (
              <>
                <button
                  className="isDisabled"
                  onClick={() => setShowEdit(true)}
                >
                  Edit Review <i className="icon-edit" />
                </button>
                <button onClick={handleDelete}>
                  Remove Review <i className="icon-trash-empty" />
                </button>
              </>
            )}
          </div>
        </dialog>
      )}
    </>
  );
};

export default NovelReview;
