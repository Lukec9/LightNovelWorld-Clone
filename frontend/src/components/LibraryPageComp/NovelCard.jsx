import { useEffect, useState, memo } from "react";
import timeAgo from "../../utils/timeAgo";
import notify from "../../utils/toastUtil";
import axiosInstance from "../../axios";
const NovelCard = ({ novel, setNovels }) => {
  const updatedAt = timeAgo(new Date(novel.updatedAt));
  const [isModalOpen, setModalOpen] = useState(false);
  const openModal = () => setModalOpen(true);
  const closeModal = () => {
    document.body.classList.remove("bodyactive");
    setModalOpen(false);
  };
  const [loading, setLoading] = useState(true);
  const [completed, setCompleted] = useState(novel.progress.completed);

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

  const markCompleted = async () => {
    if (!novel) return;

    try {
      setLoading(true);

      // Toggle the completion status
      const newCompletionStatus = !completed;

      await axiosInstance.put("/novels/progress", {
        novelId: novel._id,
        completed: newCompletionStatus,
        chapterNumber: novel.progress.lastReadChapter,
      });

      setNovels(prev =>
        prev.map(n =>
          novel._id === n._id
            ? {
                ...n,
                progress: { ...n.progress, completed: newCompletionStatus },
              }
            : n
        )
      );

      setCompleted(newCompletionStatus);

      notify(
        "success",
        newCompletionStatus
          ? "Marked novel as completed"
          : "Marked novel as uncompleted"
      );
    } catch (error) {
      notify("error", "Could not mark as completed/uncompleted");
    } finally {
      setLoading(false);
      closeModal();
    }
  };

  const removeFromLibrary = async () => {
    if (!novel) return;

    try {
      setLoading(true);

      const response = await axiosInstance.delete(
        `/novels/${novel._id}/bookmarks`
      );

      if (response && response.data) {
        notify("success", "Removed novel from library");

        setNovels(prev => prev.filter(n => n._id !== novel._id));
      }
    } catch (error) {
      notify("error", "Could not remove novel from library");
    } finally {
      closeModal();
      setLoading(false);
    }
  };

  return (
    <>
      <li className="novel-card">
        <div className="novel-cover">
          <figure className="novel-coverfig">
            <img src={novel.cover} alt={`${novel.title} cover image`} />
          </figure>
        </div>
        <div className="novel-content">
          <div className="novel-title">
            <p className="ntitle">{novel.title}</p>
            <p className="lastchap">
              <small>
                <svg
                  className="arrow"
                  xmlns="http://www.w3.org/2000/svg"
                  width={16}
                  height={16}
                  fill="currentColor"
                  viewBox="0 0 16 16"
                >
                  <path
                    fillRule="evenodd"
                    d="M8 3a5 5 0 1 1-4.546 2.914.5.5 0 0 0-.908-.417A6 6 0 1 0 8 2v1z"
                  />
                  <path d="M8 4.466V.534a.25.25 0 0 0-.41-.192L5.23 2.308a.25.25 0 0 0 0 .384l2.36 1.966A.25.25 0 0 0 8 4.466z" />
                </svg>
              </small>
              <span>{updatedAt}</span>
            </p>
          </div>
          <div className="chptpro">
            <p className="chappro">
              {completed ? (
                <span style={{ display: "block" }}>Reading is complete</span>
              ) : (
                <>
                  <span>Progress:</span>
                  <span>{`${novel.progress.lastReadChapter} / ${novel.chapters.length}`}</span>
                  <span>
                    (
                    {`${
                      (novel.progress.lastReadChapter / novel.chapters.length) *
                      100
                    }`}
                    % )
                  </span>
                </>
              )}
            </p>
          </div>
          <div className="updates">
            <span
              className={
                novel.progress.lastReadChapter ===
                novel.chapters[novel.chapters.length - 1].chapterNumber
                  ? "noupdates"
                  : "newchap"
              }
            >
              {novel.progress.lastReadChapter ===
              novel.chapters[novel.chapters.length - 1].chapterNumber
                ? "No Updates"
                : "New Chapters"}
            </span>
          </div>
        </div>
        <div className="novel-side">
          <div className="items">
            <svg
              className="bellimg"
              xmlns="http://www.w3.org/2000/svg"
              width={16}
              height={16}
              fill="currentColor"
              viewBox="0 0 16 16"
            >
              <path d="M8 16a2 2 0 0 0 2-2H6a2 2 0 0 0 2 2zM8 1.918l-.797.161A4.002 4.002 0 0 0 4 6c0 .628-.134 2.197-.459 3.742-.16.767-.376 1.566-.663 2.258h10.244c-.287-.692-.502-1.49-.663-2.258C12.134 8.197 12 6.628 12 6a4.002 4.002 0 0 0-3.203-3.92L8 1.917zM14.22 12c.223.447.481.801.78 1H1c.299-.199.557-.553.78-1C2.68 10.2 3 6.88 3 6c0-2.42 1.72-4.44 4.005-4.901a1 1 0 1 1 1.99 0A5.002 5.002 0 0 1 13 6c0 .88.32 4.2 1.22 6z" />
            </svg>
            <a onClick={openModal}>
              <svg
                className="hambmenu"
                xmlns="http://www.w3.org/2000/svg"
                width={16}
                height={16}
                fill="#5071df"
                viewBox="0 0 16 16"
              >
                <path
                  fillRule="evenodd"
                  d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5z"
                />
              </svg>
            </a>
          </div>
        </div>
      </li>
      {isModalOpen && (
        <dialog className="modal-section">
          <button className="_close" onClick={closeModal}>
            <svg>
              <use xlinkHref="#i-times" />
              <symbol id="i-times" viewBox="0 0 1024 1024">
                <path d="M618.775 512l320.329-320.329c30.51-30.51 30.51-76.269 0-106.775s-76.269-30.51-106.775 0l-320.329 320.329-320.329-320.329c-30.51-30.51-76.269-30.51-106.775 0s-30.51 76.269 0 106.775l320.329 320.329-320.329 320.329c-30.51 30.51-30.51 76.269 0 106.775s76.269 30.51 106.775 0l320.329-320.329 320.329 320.329c30.51 30.51 76.269 30.51 106.775 0s30.51-76.269 0-106.775l-320.329-320.329z" />
              </symbol>
            </svg>
          </button>
          <div className="modal-header">Library Command</div>
          <div className="modal-body">
            <h1 className="text1row book-title">The Primordial Record</h1>
            <div className="library-action-menu">
              <button onClick={markCompleted}>
                <span>
                  {!completed
                    ? "I have completed this book"
                    : "I haven't completed it yet"}
                </span>
                <i className="icon-flag-checkered" />
              </button>
              {/* <button data-action="favorite" data-lid={3377210}>
              Add to Favorites <i className="icon-star" />
            </button>
            <button className="" data-action="notification" data-lid={3377210}>
              <span>Disable Notification</span>
              <i className="icon-bell-off" />
            </button> */}
              <button onClick={removeFromLibrary}>
                Remove from Library <i className="icon-trash-empty" />
              </button>
            </div>
          </div>
        </dialog>
      )}
    </>
  );
};

export default memo(NovelCard);
