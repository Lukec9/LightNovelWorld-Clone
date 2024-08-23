import React, { useCallback, useEffect, useState } from "react";
import axiosInstance from "../../axios";
import { Link, useParams } from "react-router-dom";
import notify from "../../utils/toastUtil";
import Spinner from "../../components/Spinner";
import "../../styles/NovelPages/NovelChapterPageStyles.css";
import CommentSection from "../../components/NovelPagesComp/CommentSection";
import axios from "axios";
import { useAuthContext } from "../../context/AuthContext";

const NovelChapter = () => {
  const { nid, chapNum } = useParams();
  const {
    state: { user },
  } = useAuthContext();
  const [novel, setNovel] = useState(null);
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [chapter, setChapter] = useState(null);
  const [chapterContent, setChapterContent] = useState("");
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
    } finally {
      setLoading(false);
    }
  }, [nid]);

  const fetchChapter = useCallback(async () => {
    if (!novel) return;

    try {
      const response = await axiosInstance.get(
        `/novels/${novel._id}/chapters/${chapNum}`
      );

      if (response.status === 200) {
        setChapter(response.data);

        if (!response.data?.textFileUrl) {
          return;
        }

        const res = await axios.get(response.data.textFileUrl);
        if (res && res.data) {
          const text = formatTextToHtml(res.data);
          setChapterContent(text);
        } else {
          notify("error", "No chapter text");
        }
      }
    } catch (error) {
      notify("error", "Chapter not found");
    }
  }, [novel, chapNum]);

  function formatTextToHtml(text) {
    const lines = text.split("\r\n");
    const formattedLines = [];
    lines.forEach(line => {
      if (line.trim()) {
        formattedLines.push(`<p>${line.trim()}</p>`);
      }
    });
    return formattedLines.join("");
  }
  const updateProgress = useCallback(async () => {
    if (!user || !novel || !chapter) return;

    try {
      const response = await axiosInstance.put(`/novels/progress`, {
        chapterNumber: chapter.chapterNumber,
        novelId: novel._id,
      });

      // if (response.status === 200) {
      //   console.log("Progress updated successfully");
      // } else {
      //   notify("error", "Failed to update progress");
      // }
    } catch (error) {
      return;
      // notify("error", "Error updating progress");
      // console.error("Error updating progress:", error);
    }
  }, [user, novel, chapter]);

  const updateUserHistory = useCallback(async () => {
    if (!user || !novel || !chapter) return;
    try {
      await axiosInstance.post("/users/recently-read", {
        novelId: novel._id,
      });
    } catch (error) {
      return;
    }
  }, [user, novel, chapter]);

  useEffect(() => {
    const addView = async () => {
      if (!user) return;
      try {
        await axiosInstance.post(`/novels/${novel._id}/count`);
      } catch (error) {
        return;
      }
    };
    addView();
  }, [user, chapter, novel]);

  useEffect(() => {
    updateProgress();
  }, [updateProgress]);

  useEffect(() => {
    updateUserHistory();
  }, [updateUserHistory]);

  useEffect(() => {
    fetchNovel();
  }, [fetchNovel]);
  useEffect(() => {
    fetchChapter();
  }, [fetchChapter]);
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
    setChapter(null);
    setChapterContent("");
    setComments("");
  }, [chapNum]);

  if (loading) return <Spinner />;
  if (!novel && !loading)
    return <Link to="/">Novel not found, return to homepage</Link>;
  if (!chapter && !loading)
    return <Link to="/">Chapter not found, return to homepage</Link>;
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
    if (!chapter) return;
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
          chapterNumber: chapter.chapterNumber,
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

  return (
    <>
      {user.rank === "Admin" && (
        <Link
          to={`/admin/update/${novel._id}/chapters/${chapter.chapterNumber}`}
        >
          Update Chapter
        </Link>
      )}
      <article id="chapter-article">
        <section className="page-in content-wrap">
          <div className="titles">
            <h1 className="headline">
              <Link to={`/novel/${novel.slugTitle}`} className="booktitle">
                {novel.title}
              </Link>
              <span className="chapter-title">
                Chapter {chapter.chapterNumber}: {chapter.title}
              </span>
            </h1>
            <button id="control-action-btn" type="button">
              <svg>
                <use xlinkHref="#i-set"></use>
                <symbol id="i-set" viewBox="0 0 1027 1024">
                  <path d="M1005.37728 614.4l-115.2-64c0-12.8 0-25.6 0-38.4s0-25.6 0-38.4l115.2-64C1024.57728 403.2 1030.97728 384 1018.17728 364.8l-128-224c-6.4-12.8-25.6-19.2-44.8-12.8l-115.2 64c-19.2-12.8-38.4-25.6-64-38.4l0-128C672.57728 12.8 659.77728 0 640.57728 0L384.57728 0C365.37728 0 352.57728 12.8 352.57728 32l0 128c-19.2 12.8-44.8 19.2-64 38.4l-115.2-64C160.57728 121.6 141.37728 128 134.97728 147.2l-128 224C-5.82272 384 0.57728 403.2 13.37728 409.6l115.2 64C128.57728 486.4 128.57728 499.2 128.57728 512s0 25.6 0 38.4l-115.2 64C0.57728 620.8-5.82272 640 6.97728 659.2l128 224c6.4 12.8 25.6 19.2 44.8 12.8l115.2-64c19.2 12.8 38.4 25.6 64 38.4l0 128C352.57728 1011.2 365.37728 1024 384.57728 1024l256 0c19.2 0 32-12.8 32-32l0-128c19.2-12.8 44.8-19.2 64-38.4l115.2 64c12.8 6.4 32 6.4 44.8-12.8l128-224C1030.97728 640 1024.57728 620.8 1005.37728 614.4zM838.97728 774.4l-115.2-70.4c-38.4 44.8-89.6 70.4-147.2 83.2l0 134.4L448.57728 921.6l0-134.4c-57.6-12.8-108.8-44.8-147.2-83.2l-115.2 70.4-64-108.8 115.2-70.4C230.97728 569.6 224.57728 544 224.57728 512s6.4-57.6 12.8-83.2L122.17728 358.4l64-108.8 115.2 70.4C339.77728 275.2 390.97728 243.2 448.57728 230.4L448.57728 96l128 0 0 134.4c57.6 12.8 108.8 44.8 147.2 83.2l115.2-70.4 64 108.8-115.2 70.4c6.4 25.6 12.8 57.6 12.8 83.2s-6.4 57.6-12.8 83.2l115.2 70.4L838.97728 774.4z" />
                  <path d="M512.57728 320C403.77728 320 320.57728 403.2 320.57728 512s83.2 192 192 192 192-83.2 192-192S621.37728 320 512.57728 320zM512.57728 640c-70.4 0-128-57.6-128-128s57.6-128 128-128 128 57.6 128 128S582.97728 640 512.57728 640z" />
                </symbol>
              </svg>
            </button>
          </div>
          <div
            id="chapter-container"
            className="chapter-content"
            dangerouslySetInnerHTML={{ __html: chapterContent }}
          ></div>
          <div className="chapternav">
            <Link
              className={`button prevchap ${
                chapter.chapterNumber === 1 ? "disabled" : ""
              }`}
              to={
                chapter.chapterNumber === 1
                  ? ""
                  : `/novel/${novel.slugTitle}/chapters/${
                      chapter.chapterNumber - 1
                    }`
              }
              onClick={e => {
                if (chapter.chapterNumber === 1) {
                  e.preventDefault(); // Prevent navigation
                }
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width={16}
                height={16}
                fill="currentColor"
                className="bi bi-chevron-left"
                viewBox="0 0 16 16"
              >
                <path
                  fillRule="evenodd"
                  d="M11.354 1.646a.5.5 0 0 1 0 .708L5.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0"
                />
              </svg>
              <span>PREV</span>
            </Link>
            <Link
              className="button chapindex"
              to={`/novel/${novel.slugTitle}/chapters`}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width={16}
                height={16}
                fill="currentColor"
                className="bi bi-house"
                viewBox="0 0 16 16"
              >
                <path d="M8.707 1.5a1 1 0 0 0-1.414 0L.646 8.146a.5.5 0 0 0 .708.708L2 8.207V13.5A1.5 1.5 0 0 0 3.5 15h9a1.5 1.5 0 0 0 1.5-1.5V8.207l.646.647a.5.5 0 0 0 .708-.708L13 5.793V2.5a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0-.5.5v1.293zM13 7.207V13.5a.5.5 0 0 1-.5.5h-9a.5.5 0 0 1-.5-.5V7.207l5-5z" />
              </svg>
              <span>INDEX</span>
            </Link>
            <Link
              className={`button nextchap ${
                chapter.chapterNumber === novel.chapters.length
                  ? "disabled"
                  : ""
              }`}
              to={
                chapter.chapterNumber === novel.chapters.length
                  ? ""
                  : `/novel/${novel.slugTitle}/chapters/${
                      chapter.chapterNumber + 1
                    }`
              }
              onClick={e => {
                if (chapter.chapterNumber === novel.chapters.length) {
                  e.preventDefault(); // Prevent navigation
                }
              }}
            >
              <span>NEXT</span>
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
              </svg>
            </Link>
          </div>
        </section>
        <div id="novel" className="content-wrap">
          <CommentSection
            openModal={openModal}
            chapterNumber={chapter.chapterNumber}
            novel={novel}
            onChapter={true}
          />
        </div>
      </article>
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

export default NovelChapter;
