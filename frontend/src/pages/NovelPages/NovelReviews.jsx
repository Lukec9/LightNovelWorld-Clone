import { memo, useCallback, useEffect, useState } from "react";
import "../../styles/NovelPages/NovelReviewsPageStyles.css";
import ReviewsSection from "../../components/NovelPagesComp/ReviewsSection";
import { Link, useParams } from "react-router-dom";
import notify from "../../utils/toastUtil";
import timeAgo from "../../utils/timeAgo";
import axiosInstance from "../../axios";
import Spinner from "../../components/Spinner";

const NovelReviews = () => {
  const { nid } = useParams();
  const [novel, setNovel] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setModalOpen] = useState(false);
  const [newReviewText, setNewReviewText] = useState("");
  const [error, setError] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [rating, setRating] = useState(0);
  const openModal = () => setModalOpen(true);
  const closeModal = () => {
    document.body.classList.remove("bodyactive");
    setModalOpen(false);
  };
  const MAX_CHAR = 1000;
  const [remainingChar, setRemainingChar] = useState(MAX_CHAR);

  const fetchNovel = useCallback(async () => {
    setLoading(true);
    try {
      const response = await axiosInstance.get(`/novels/novel`, {
        params: { query: nid },
      });
      if (response.status === 200) {
        setNovel(response.data.novel);
      }
    } catch (error) {
      if (error.response?.data?.error === "Novel not found") {
        notify("error", "Novel not found");
      } else {
        notify("error", "Something went wrong");
      }
    } finally {
      setLoading(false);
    }
  }, [nid]);

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
    fetchNovel();
  }, [fetchNovel]);

  if (loading) return <Spinner />;
  const handlePost = async event => {
    if (loading) return;
    if (!novel) return;
    if (!rating) {
      setError("Please select a rating");
      return notify("error", "Please select a rating");
    }
    if (!newReviewText) return setError("Enter some text");
    event.preventDefault();

    if (newReviewText.length < 100) {
      notify("error", "Comment must be at least 100 characters long");
      setError("Comment must be at least 100 characters long");
      return;
    }

    if (newReviewText.length > 1000) {
      notify("error", "Review  cannot exceed 1000 characters");
      setError("Review  cannot exceed 1000 characters");
      return;
    }

    try {
      setLoading(true);
      const response = await axiosInstance.post(
        `/novels/${novel._id}/reviews`,
        {
          text: newReviewText,
          rating,
        }
      );

      if (response.status === 201) {
        const newrev = response.data.review;
        setReviews(prevReviews => [newrev, ...prevReviews]);
        notify("success", "Review created successfully");
        closeModal();
      } else {
        notify("error", "Failed to create review");
      }
    } catch (error) {
      notify("error", error.response.data.message);
      setError(error.response.data.message);
    } finally {
      setLoading(false);
      // closeModal();
      // setNewReviewText("");
      // setRating(0);
    }
  };
  const handleTextChange = e => {
    const inputText = e.target.value;

    if (inputText.length > MAX_CHAR) {
      const truncatedText = inputText.slice(0, MAX_CHAR);
      setNewReviewText(truncatedText);
      setRemainingChar(0);
    } else {
      setNewReviewText(inputText);
      setRemainingChar(MAX_CHAR - inputText.length);
    }
  };

  const handleRatingChange = event => {
    const userRating = event.target.value;
    setRating(Number(userRating));
  };

  return (
    <>
      <div id="review-list-page">
        <div className="container">
          <div className="novel-item">
            <div className="cover-wrap">
              <Link title={novel?.title} to={`/novel/${novel?.slugTitle}`}>
                <figure className="novel-cover">
                  <img src={novel?.cover} alt={novel?.title} />
                </figure>
              </Link>
            </div>
            <div className="item-body">
              <h1>
                <Link
                  className="text2row"
                  title={novel?.title}
                  to={`/novel/${novel?.slugTitle}`}
                >
                  {novel?.title}
                </Link>
              </h1>
              <div className="novel-stats">
                <span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width={16}
                    height={16}
                    fill="var(--text-color-2)"
                    viewBox="0 0 576 512"
                  >
                    <path d="M309 106c11.4-7 19-19.7 19-34c0-22.1-17.9-40-40-40s-40 17.9-40 40c0 14.4 7.6 27 19 34L209.7 220.6c-9.1 18.2-32.7 23.4-48.6 10.7L72 160c5-6.7 8-15 8-24c0-22.1-17.9-40-40-40S0 113.9 0 136s17.9 40 40 40c.2 0 .5 0 .7 0L86.4 427.4c5.5 30.4 32 52.6 63 52.6l277.2 0c30.9 0 57.4-22.1 63-52.6L535.3 176c.2 0 .5 0 .7 0c22.1 0 40-17.9 40-40s-17.9-40-40-40s-40 17.9-40 40c0 9 3 17.3 8 24l-89.1 71.3c-15.9 12.7-39.5 7.5-48.6-10.7L309 106z" />
                  </svg>
                  Rank {novel?.rank}
                </span>
              </div>
              <div className="novel-stats">
                <span>
                  Updated{" "}
                  <time dateTime={novel?.updatedAt}>
                    {timeAgo(new Date(novel?.updatedAt))}
                  </time>
                </span>
              </div>
            </div>
          </div>
          <span className="divider" />
          <h2>
            List of reviews made by users for the {novel?.title} novel.
            <br />
          </h2>
          <p>
            {novel?.reviewCount} users have written reviews for the Supreme
            Lord: I can extract everything! novel and rated it with an average
            score of {novel?.rating} out of 5. Our novel is ranked{" "}
            {novel?.rating}. among all the novels in the Light Novel World
            platform.
          </p>
          <div className="section-header">
            <div className="head-info">
              <h3>{novel?.reviewCount} Reviews</h3>
              <div className="rating-star">
                <span className="star-wrap">
                  <span className="star-box" role="presentation">
                    <svg className="star star-on">
                      <use xlinkHref="#star"></use>
                    </svg>
                  </span>
                  <span className="star-box" role="presentation">
                    <svg className="star star-on">
                      <use xlinkHref="#star"> </use>
                    </svg>
                  </span>
                  <span className="star-box" role="presentation">
                    <svg className="star star-on">
                      <use xlinkHref="#star"></use>
                    </svg>
                  </span>
                  <span className="star-box" role="presentation">
                    <svg className="star star-on">
                      <use xlinkHref="#star"></use>
                    </svg>
                  </span>
                  <span className="star-box" role="presentation">
                    <svg className="star star-on">
                      <use xlinkHref="#star"></use>
                    </svg>
                  </span>
                </span>
                <strong>{novel?.rating}</strong>
              </div>
            </div>
            <a id="write-review" onClick={openModal} className="button ">
              Write a review
            </a>
          </div>
        </div>
        <ReviewsSection
          novel={novel}
          reviews={reviews}
          setReviews={setReviews}
        />
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
          <div className="modal-header">Write a Review</div>
          {error && (
            <div className="review-error error-message">
              <strong>{error ? error : ""}</strong>
            </div>
          )}
          <p className="review-term">
            Please do not fill the field with unnecessary spaces or characters.
            As a result of this behavior, the moderator may delete your message.
            <strong>
              Only comments written in English are accepted so everyone can
              understand.
            </strong>
          </p>
          <div className="review-star">
            <strong>Review Score</strong>
            <span className="star-edit">
              {rating !== 0 && (
                <button
                  type="button"
                  onClick={() => handleRatingChange({ target: { value: 0 } })}
                >
                  Reset
                </button>
              )}
              <input
                type="radio"
                id="star5"
                name="novelScore"
                value="5"
                // className={rating === 5 ? "checked" : ""}
                checked={rating === 5 ? true : false}
                onChange={handleRatingChange}
              />
              <label htmlFor="star5">
                <svg>
                  <use xlinkHref="#star"></use>
                </svg>
              </label>

              <input
                type="radio"
                id="star4"
                name="novelScore"
                value="4"
                checked={rating >= 4 ? true : false}
                onChange={handleRatingChange}
              />
              <label htmlFor="star4">
                <svg>
                  <use xlinkHref="#star"></use>
                </svg>
              </label>

              <input
                type="radio"
                id="star3"
                name="novelScore"
                value="3"
                checked={rating >= 3 ? true : false}
                onChange={handleRatingChange}
              />
              <label htmlFor="star3">
                <svg>
                  <use xlinkHref="#star"></use>
                </svg>
              </label>

              <input
                type="radio"
                id="star2"
                name="novelScore"
                value="2"
                checked={rating >= 2 ? true : false}
                onChange={handleRatingChange}
              />
              <label htmlFor="star2">
                <svg>
                  <use xlinkHref="#star"></use>
                </svg>
              </label>

              <input
                type="radio"
                id="star1"
                name="novelScore"
                value="1"
                checked={rating >= 1 ? true : false}
                onChange={handleRatingChange}
              />
              <label htmlFor="star1">
                <svg>
                  <use xlinkHref="#star"></use>
                </svg>
              </label>
              {rating}
            </span>
          </div>

          <div className="comment-area">
            <textarea
              id="comments"
              className="txt_block"
              name="comment"
              rows={8}
              minLength={3}
              maxLength={1000}
              placeholder="Join the discussion with your review... Make sure you understand the review rules before posting..."
              defaultValue={""}
              onChange={handleTextChange}
            />
            <div className="com-remain">
              <span>{remainingChar} &gt; 1000</span>
            </div>
            <div className="comment-actions">
              <label className="spoiler-check">
                <input
                  type="checkbox"
                  id="spoilerControl"
                  name="spoiler"
                  defaultValue={1}
                />
                <span>
                  <i />
                </span>
                <strong>
                  Contains
                  <br />
                  Spoiler
                </strong>
              </label>
              <button id="compostbtn" onClick={handlePost} className="button">
                Post Comment
              </button>
            </div>
          </div>
        </dialog>
      )}
      <svg style={{ display: "none" }}>
        <symbol className="icon" id="star" viewBox="0 0 1024 1024">
          <path d="M512 798.134857L195.584 1024 302.08 637.805714 0 391.168l382.244571-12.873143L512 0l129.755429 378.294857L1024 391.168 721.92 637.805714 828.416 1024z"></path>
        </symbol>
      </svg>
    </>
  );
};

export default memo(NovelReviews);
