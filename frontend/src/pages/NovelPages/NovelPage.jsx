import React, { useCallback, useEffect, useRef, useState } from "react";
import "../../styles/NovelPages/NovelPageStyles.css";
import notify from "../../utils/toastUtil";
import axiosInstance from "../../axios";
import { Link, useParams } from "react-router-dom";
import Spinner from "../../components/Spinner";
import formatNumber from "../../utils/formatNumber";
import timeAgo from "../../utils/timeAgo";
import CommentSection from "../../components/NovelPagesComp/CommentSection";
import { useAuthContext } from "../../context/AuthContext";
import DeleteNovel from "../../components/AdminComp/DeleteNovel";
import AddChapters from "../../components/AdminComp/AddChapters";

const NovelPage = () => {
  const { nid } = useParams();
  const {
    state: { user },
  } = useAuthContext();
  const [novel, setNovel] = useState(null);
  const [comments, setComments] = useState([]);
  const [progress, setProgress] = useState(null);
  const [loading, setLoading] = useState(true);
  const [bookmarked, setBookmarked] = useState(false);
  const [isModalOpen, setModalOpen] = useState(false);
  const [newCommentText, setNewCommentText] = useState("");
  const openModal = () => setModalOpen(true);
  const closeModal = () => {
    document.body.classList.remove("bodyactive");
    setModalOpen(false);
  };
  const MAX_CHAR = 1000;
  const [remainingChar, setRemainingChar] = useState(MAX_CHAR);

  const fetchNovel = useCallback(async () => {
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
    }
  }, [nid]);

  useEffect(() => {
    fetchNovel();
  }, [fetchNovel]);

  // Fetch the progress
  const fetchProgress = useCallback(async () => {
    if (!novel) return;

    try {
      const response = await axiosInstance.get(`/novels/${novel._id}/progress`);
      if (response.status === 200) {
        setProgress(response.data.progress);
      }
    } catch (error) {
      setProgress({ fake: 1 });
    }
  }, [novel]);

  useEffect(() => {
    fetchProgress();
  }, [fetchProgress]);

  // Fetch the bookmark status
  const fetchBookmark = useCallback(async () => {
    if (!novel) return;

    try {
      const res = await axiosInstance.get(`/novels/${novel._id}/bookmarks`);
      if (res.status === 404) setBookmarked(false);
      if (res.status === 200) setBookmarked(true);
    } catch (error) {
      if (
        error.response?.data?.error === "Novel already bookmarked by this user"
      ) {
        setBookmarked(true);
      } else {
        setBookmarked(false);
      }
      // notify("error", error.response?.data?.error || "Something went wrong");
    }
  }, [novel]);

  useEffect(() => {
    fetchBookmark();
  }, [fetchBookmark]);

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

  // Conditional loading state
  useEffect(() => {
    if (novel || progress || comments.length > 0 || bookmarked) {
      setLoading(false);
    }
  }, [novel, progress, comments, bookmarked]);

  if (loading) return <Spinner />;
  if (!novel)
    return <Link to="/">Unable to load novel details. Back to Homepage</Link>;
  const lastChapter = novel?.chapters?.[novel?.chapters?.length - 1];

  const formatSummary = summary => {
    if (!summary) return []; // Handle undefined or empty summary

    // Split the summary into sentences using a more general approach
    const sentences = summary.match(/[^.!?]+[.!?]*/g) || [];
    // Combine sentences into paragraphs
    const paragraphs = [];
    for (let i = 0; i < sentences.length; i += 2) {
      // Join every 2 sentences into a paragraph
      paragraphs.push(
        sentences
          .slice(i, i + 2)
          .join(" ")
          .trim()
      );
    }

    return paragraphs;
  };

  const formattedSummary = formatSummary(novel.summary);

  const NovelCat = ({ category }) => {
    return (
      <li>
        <Link
          className="property-item"
          title={`Popular novels in the ${category} genre`}
          to={`/browse?sortBy=Popular&category=${category}`}
          // to="/browse/genre-fantasy-04061342/order-popular/status-all"
        >
          {category}
        </Link>
      </li>
    );
  };
  const NovelTag = ({ tag }) => {
    return (
      <li>
        <Link
          className="property-item"
          title={tag}
          to={`/tag?tag=${tag}`} // implement tag page
        >
          {tag}
        </Link>
      </li>
    );
  };

  const handleTextChange = e => {
    const inputText = e.target.value;

    if (inputText.length > MAX_CHAR) {
      const truncatedText = inputText.slice(0, MAX_CHAR);
      setNewCommentText(truncatedText);
      setRemainingChar(0);
    } else {
      setNewCommentText(inputText);
      setRemainingChar(MAX_CHAR - inputText.length);
    }
  };

  const handlePost = async event => {
    if (loading) return;
    if (!novel) return;
    event.preventDefault(); // Prevent the default form submission behavior

    if (newCommentText.length < 3) {
      notify("error", "Comment must be at least 3 characters long");
      return;
    }

    if (newCommentText.length > 1000) {
      notify("error", "Comment cannot exceed 200 characters");
      return;
    }
    try {
      setLoading(true);
      const response = await axiosInstance.post(
        `/novels/${novel._id}/comments`,
        {
          text: newCommentText,
        }
      );

      if (response.status === 201) {
        const newcom = response.data.comment;
        setComments(prevComments => [newcom, ...prevComments]);
        notify("success", "Comment created successfully");
        closeModal();
      } else {
        notify("error", "Failed to create comment");
      }
    } catch (error) {
      notify("error", "An error occurred while creating comment");
      console.error("Error updating comment:", error);
    } finally {
      setLoading(false);
      closeModal();
      setNewCommentText("");
    }
  };

  const handleBookmark = async () => {
    if (!user) return notify("Log in to bookmark a novel");
    if (!novel) return;

    try {
      if (!bookmarked) {
        const response = await axiosInstance.post(
          `/novels/${novel._id}/bookmarks`
        );
        if (response.status === 201) {
          setBookmarked(true);
          notify("success", "Added novel to library");
        }
      } else if (bookmarked) {
        const response = await axiosInstance.delete(
          `/novels/${novel._id}/bookmarks`
        );
        if (response.status === 200) {
          setBookmarked(false);
          notify("success", "Removed novel from library");
        }
      }
    } catch (error) {}
  };
  return (
    <>
      {user.rank === "Admin" && (
        <>
          <Link to={`/admin/update/${novel._id}`}>Update Novel</Link>
        </>
      )}
      <div id="novel">
        <div className="thenovel-header">
          <div className="glass-background">
            <img src={novel?.cover} alt={`${novel?.title}'s cover`} />
            <div className="glass-shade"></div>
          </div>
          <div className="header-body container">
            <div className="fixed-img">
              <figure className="cover">
                <img src={novel?.cover} alt={`${novel?.title}'s cover`} />
              </figure>
            </div>
            <div className="novel-info">
              <div className="main-head">
                <div className="novel-title">
                  <h1>{novel?.title}</h1>
                </div>
                <div className="author">
                  <span>Author: </span>
                  <Link to={`/author/${novel?.author}`}>{novel?.author}</Link>
                </div>
                <div className="rating">
                  <div className="rank">
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
                  </div>
                  <div className="star-rating">
                    <span className="star-wrap">
                      <span className="star-box" role="presentation">
                        <svg className="star star-on">
                          <use xlinkHref="#star">
                            <symbol
                              className="icon"
                              viewBox="0 0 1024 1024"
                              id="star"
                            >
                              <path d="M512 798.134857L195.584 1024 302.08 637.805714 0 391.168l382.244571-12.873143L512 0l129.755429 378.294857L1024 391.168 721.92 637.805714 828.416 1024z"></path>
                            </symbol>
                          </use>
                        </svg>
                      </span>
                      <span className="star-box" role="presentation">
                        <svg className="star star-on">
                          <use xlinkHref="#star">
                            <symbol
                              className="icon"
                              viewBox="0 0 1024 1024"
                              id="star"
                            >
                              <path d="M512 798.134857L195.584 1024 302.08 637.805714 0 391.168l382.244571-12.873143L512 0l129.755429 378.294857L1024 391.168 721.92 637.805714 828.416 1024z"></path>
                            </symbol>
                          </use>
                        </svg>
                      </span>
                      <span className="star-box" role="presentation">
                        <svg className="star star-on">
                          <use xlinkHref="#star">
                            <symbol
                              className="icon"
                              viewBox="0 0 1024 1024"
                              id="star"
                            >
                              <path d="M512 798.134857L195.584 1024 302.08 637.805714 0 391.168l382.244571-12.873143L512 0l129.755429 378.294857L1024 391.168 721.92 637.805714 828.416 1024z"></path>
                            </symbol>
                          </use>
                        </svg>
                      </span>
                      <span className="star-box" role="presentation">
                        <svg className="star star-on">
                          <use xlinkHref="#star">
                            <symbol
                              className="icon"
                              viewBox="0 0 1024 1024"
                              id="star"
                            >
                              <path d="M512 798.134857L195.584 1024 302.08 637.805714 0 391.168l382.244571-12.873143L512 0l129.755429 378.294857L1024 391.168 721.92 637.805714 828.416 1024z"></path>
                            </symbol>
                          </use>
                        </svg>
                      </span>
                      <span className="star-box" role="presentation">
                        <svg className="star star-on">
                          <use xlinkHref="#star">
                            <symbol
                              className="icon"
                              viewBox="0 0 1024 1024"
                              id="star"
                            >
                              <path d="M512 798.134857L195.584 1024 302.08 637.805714 0 391.168l382.244571-12.873143L512 0l129.755429 378.294857L1024 391.168 721.92 637.805714 828.416 1024z"></path>
                            </symbol>
                          </use>
                        </svg>
                      </span>
                    </span>
                    <strong>{novel?.rating}</strong>
                  </div>
                </div>
              </div>
              <nav className="links">
                <Link
                  id="readchapterbtn"
                  className="button"
                  to={`/novel/${novel?.slugTitle}/chapters/${
                    progress?.lastReadChapter || 1
                  }`}
                  title="Chapter 890: Blast"
                >
                  <span>{progress?.fake ? `Read ` : "Continue Reading"}</span>
                  <small>
                    Chapter
                    {progress?.fake && progress.fake}{" "}
                    {progress?.lastReadChapter}
                  </small>
                </Link>
                <a
                  id="library-push"
                  onClick={handleBookmark}
                  className="button"
                >
                  <span>
                    {!bookmarked ? (
                      <>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width={16}
                          height={16}
                          fill="currentColor"
                          className="bi bi-bell"
                          viewBox="0 0 16 16"
                        >
                          <path d="M8 16a2 2 0 0 0 2-2H6a2 2 0 0 0 2 2M8 1.918l-.797.161A4 4 0 0 0 4 6c0 .628-.134 2.197-.459 3.742-.16.767-.376 1.566-.663 2.258h10.244c-.287-.692-.502-1.49-.663-2.258C12.134 8.197 12 6.628 12 6a4 4 0 0 0-3.203-3.92zM14.22 12c.223.447.481.801.78 1H1c.299-.199.557-.553.78-1C2.68 10.2 3 6.88 3 6c0-2.42 1.72-4.44 4.005-4.901a1 1 0 1 1 1.99 0A5 5 0 0 1 13 6c0 .88.32 4.2 1.22 6" />
                        </svg>
                        Add To library
                      </>
                    ) : (
                      <>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width={18}
                          height={18}
                          fill="currentColor"
                          className="bi bi-check"
                          viewBox="0 0 16 16"
                        >
                          <path d="M10.97 4.97a.75.75 0 0 1 1.07 1.05l-3.99 4.99a.75.75 0 0 1-1.08.02L4.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093 3.473-4.425z" />
                        </svg>
                        In Library
                      </>
                    )}
                  </span>
                </a>
              </nav>
              <div className="header-stats">
                <span>
                  <strong>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width={16}
                      height={16}
                      fill="currentColor"
                      className="bi bi-book"
                      viewBox="0 0 16 16"
                    >
                      <path d="M1 2.828c.885-.37 2.154-.769 3.388-.893 1.33-.134 2.458.063 3.112.752v9.746c-.935-.53-2.12-.603-3.213-.493-1.18.12-2.37.461-3.287.811V2.828zm7.5-.141c.654-.689 1.782-.886 3.112-.752 1.234.124 2.503.523 3.388.893v9.923c-.918-.35-2.107-.692-3.287-.81-1.094-.111-2.278-.039-3.213.492V2.687zM8 1.783C7.015.936 5.587.81 4.287.94c-1.514.153-3.042.672-3.994 1.105A.5.5 0 0 0 0 2.5v11a.5.5 0 0 0 .707.455c.882-.4 2.303-.881 3.68-1.02 1.409-.142 2.59.087 3.223.877a.5.5 0 0 0 .78 0c.633-.79 1.814-1.019 3.222-.877 1.378.139 2.8.62 3.681 1.02A.5.5 0 0 0 16 13.5v-11a.5.5 0 0 0-.293-.455c-.952-.433-2.48-.952-3.994-1.105C10.413.809 8.985.936 8 1.783z" />
                    </svg>{" "}
                    {novel.chapters.length}
                  </strong>
                  <small>Chapters</small>
                </span>
                <span>
                  <strong>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width={16}
                      height={14}
                      fill="var(--text-color-2)"
                      className="bi bi-eye"
                      viewBox="0 0 16 16"
                    >
                      <path d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8M1.173 8a13 13 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5s3.879 1.168 5.168 2.457A13 13 0 0 1 14.828 8q-.086.13-.195.288c-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5s-3.879-1.168-5.168-2.457A13 13 0 0 1 1.172 8z" />
                      <path d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5M4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0" />
                    </svg>{" "}
                    {formatNumber(novel.views)}
                  </strong>
                  <small>Views</small>
                </span>
                <span>
                  <strong>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width={16}
                      height={14}
                      fill="var(--text-color-2)"
                      className="bi bi-bookmark-fill"
                      viewBox="0 0 16 16"
                    >
                      <path d="M2 2v13.5a.5.5 0 0 0 .74.439L8 13.069l5.26 2.87A.5.5 0 0 0 14 15.5V2a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2" />
                    </svg>{" "}
                    {formatNumber(novel.bookmarkCount)}
                  </strong>
                  <small>Bookmarked</small>
                </span>
                <span>
                  <strong className="ongoing">{novel.status}</strong>
                  <small>Status</small>
                </span>
              </div>
              <div className="categories">
                <h4>Categories</h4>

                <ul>
                  {novel.categories.map((cat, i) => (
                    <NovelCat key={i} category={cat} />
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
        <div className="novel-body container">
          <nav className="content-nav">
            <Link
              className="grdbtn chapter-latest-container"
              title={`${novel?.title} Novel Chapters`}
              to={`/novel/${novel?.slugTitle}/chapters`}
            >
              <div className="body">
                <h4>Novel Chapters</h4>
                <p className="latest text1row">
                  Chapter {lastChapter?.chapterNumber}: {lastChapter?.title}
                </p>
                <p className="update">
                  Updated {timeAgo(new Date(novel.updatedAt))}
                </p>
              </div>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                className="bi bi-chevron-right"
                viewBox="0 0 16 16"
              >
                <path
                  fillRule="evenodd"
                  d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708"
                />
              </svg>{" "}
            </Link>
            <Link
              className="grdbtn reviews-latest-container"
              title={`${novel?.title} Novel User Reviews`}
              to={`/novel/${novel?.slugTitle}/reviews`}
            >
              <div className="body">
                <h4>User Reviews</h4>
                <p className="latest text1row">
                  Reviews from {novel.reviewCount} readers
                </p>
                <p className="update">Average score is {novel.rating}</p>
              </div>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                name="bi bi-chevron-right "
                viewBox="0 0 16 16"
              >
                <path
                  fillRule="evenodd"
                  d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708"
                />
              </svg>
            </Link>
          </nav>
          <section id="info">
            <p className="description">
              {novel.title} is a popular light novel covering{" "}
              {novel.categories.slice(0, 3).join(", ")} genres. Written by the
              Author {novel.author}. {novel.chapters.length} chapters have been
              translated{" "}
              {novel.status === "Ongoing" &&
                "and translations of other chapters are in progress."}
            </p>
            <div className="summary">
              <h4 className="lined">Summary</h4>
              <input
                type="checkbox"
                id="expand-toggle"
                className="expand-checkbox"
              />{" "}
              <div className="content expand-wrapper">
                {formattedSummary.length > 0 ? (
                  <>
                    {formattedSummary.map((paragraph, index) => (
                      <div key={index}>
                        <p>{paragraph}</p>
                        {index < formattedSummary.length - 1 && <br />}
                      </div>
                    ))}
                  </>
                ) : (
                  <p>No summary available.</p>
                )}
              </div>
              <label
                htmlFor="expand-toggle"
                className="expand-button lined"
              ></label>
            </div>
            <div className="tags">
              <h4 className="lined">Tags</h4>
              <div>
                <ul className="content">
                  {novel.tags.map((tag, i) => (
                    <NovelTag tag={tag} key={i} />
                  ))}
                </ul>
              </div>
            </div>
            <div className="report-container">
              <p>
                Please report the problems you have identified regarding the
                novel and its chapters.
              </p>
              <a id="novel-report">
                <svg className="icon icon-pantool">
                  <use xlinkHref="#icon-pantool">
                    <symbol id="icon-pantool" viewBox="0 0 24 24">
                      <path d="M21.5 4c-.83 0-1.5.67-1.5 1.5v5c0 .28-.22.5-.5.5s-.5-.22-.5-.5v-8c0-.83-.67-1.5-1.5-1.5S16 1.67 16 2.5v8c0 .28-.22.5-.5.5s-.5-.22-.5-.5v-9c0-.83-.67-1.5-1.5-1.5S12 .67 12 1.5v8.99c0 .28-.22.5-.5.5s-.5-.22-.5-.5V4.5c0-.83-.67-1.5-1.5-1.5S8 3.67 8 4.5v11.41l-4.12-2.35c-.58-.33-1.3-.24-1.78.22-.6.58-.62 1.54-.03 2.13l6.78 6.89c.75.77 1.77 1.2 2.85 1.2H19c2.21 0 4-1.79 4-4V5.5c0-.83-.67-1.5-1.5-1.5z" />
                    </symbol>
                  </use>
                </svg>
                <span>Report</span>
              </a>
            </div>
          </section>
          <CommentSection novel={novel} openModal={openModal} />
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
          <div className="modal-header">Write a New Comment</div>
          <div className="comment-area">
            <textarea
              id="comments"
              className="txt_block"
              name="comment"
              rows={8}
              minLength={3}
              maxLength={1000}
              placeholder="Join the discussion with your comment... Make sure you understand the comment rules before posting..."
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
    </>
  );
};

export default NovelPage;
