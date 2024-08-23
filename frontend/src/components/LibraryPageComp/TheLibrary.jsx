import { lazy, Suspense, useEffect, useState } from "react";
import Spinner from "../Spinner";
import { useAuthContext } from "../../context/AuthContext";
import axiosInstance from "../../axios";
import notify from "../../utils/toastUtil";

const NovelCard = lazy(() => import("./NovelCard"));

const TheLibrary = () => {
  const {
    state: { user: user },
  } = useAuthContext();
  const [activeFilters, setActiveFilters] = useState({
    filter: "All",
    sort: "last updated",
  });
  const [novels, setNovels] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getNovels = async () => {
      try {
        const response = await axiosInstance.get("users/bookmarks");
        const novelsWithProgress = await Promise.all(
          response.data.novels.map(async novel => {
            const progressResponse = await axiosInstance.get(
              `/novels/${novel._id}/progress`
            );
            return {
              ...novel,
              progress: progressResponse.data.progress,
            };
          })
        );
        setNovels(novelsWithProgress);
        setLoading(false); // Step 2: Set loading to false once data is fetched
      } catch (error) {
        console.error(error.message);
        notify("error", "Could not get bookmarked novels or progress");
        setLoading(false); // Ensure loading is set to false even on error
      } finally {
        setLoading(false);
      }
    };
    getNovels();
  }, []);

  if (loading) return <Spinner />;

  return (
    <>
      <div className="user-panel-body the-library">
        <div className="user-panel-libraryfilt">
          <div className="intro-library">
            <p className="above-desc">Your Bookmarked Novel Library</p>
            <div className="description">
              <p>The list of novels you subscribe to follow.</p>
              <p>
                You can organize your library and discover the latest updates of
                your favorite novels.
              </p>
              <div className="action-guide">
                <p>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width={16}
                    height={16}
                    fill="currentColor"
                    className="bi bi-star"
                    viewBox="0 0 16 16"
                  >
                    <path d="M2.866 14.85c-.078.444.36.791.746.593l4.39-2.256 4.389 2.256c.386.198.824-.149.746-.592l-.83-4.73 3.522-3.356c.33-.314.16-.888-.282-.95l-4.898-.696L8.465.792a.513.513 0 0 0-.927 0L5.354 5.12l-4.898.696c-.441.062-.612.636-.283.95l3.523 3.356-.83 4.73zm4.905-2.767-3.686 1.894.694-3.957a.565.565 0 0 0-.163-.505L1.71 6.745l4.052-.576a.525.525 0 0 0 .393-.288L8 2.223l1.847 3.658a.525.525 0 0 0 .393.288l4.052.575-2.906 2.77a.565.565 0 0 0-.163.506l.694 3.957-3.686-1.894a.503.503 0 0 0-.461 0z" />
                  </svg>
                  Bookmark your favorite novels in your library.
                </p>
                <p>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width={16}
                    height={16}
                    fill="currentColor"
                    className="bi bi-bell"
                    viewBox="0 0 16 16"
                  >
                    <path d="M8 16a2 2 0 0 0 2-2H6a2 2 0 0 0 2 2zM8 1.918l-.797.161A4.002 4.002 0 0 0 4 6c0 .628-.134 2.197-.459 3.742-.16.767-.376 1.566-.663 2.258h10.244c-.287-.692-.502-1.49-.663-2.258C12.134 8.197 12 6.628 12 6a4.002 4.002 0 0 0-3.203-3.92L8 1.917zM14.22 12c.223.447.481.801.78 1H1c.299-.199.557-.553.78-1C2.68 10.2 3 6.88 3 6c0-2.42 1.72-4.44 4.005-4.901a1 1 0 1 1 1.99 0A5.002 5.002 0 0 1 13 6c0 .88.32 4.2 1.22 6z" />
                  </svg>
                  A maximum of 20 favorites can be selected. You will only
                  receive notifications for the books you selected as favorites.
                </p>
                <p>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width={16}
                    height={16}
                    fill="currentColor"
                    className="bi bi-flag"
                    viewBox="0 0 16 16"
                  >
                    <path d="M14.778.085A.5.5 0 0 1 15 .5V8a.5.5 0 0 1-.314.464L14.5 8l.186.464-.003.001-.006.003-.023.009a12.435 12.435 0 0 1-.397.15c-.264.095-.631.223-1.047.35-.816.252-1.879.523-2.71.523-.847 0-1.548-.28-2.158-.525l-.028-.01C7.68 8.71 7.14 8.5 6.5 8.5c-.7 0-1.638.23-2.437.477A19.626 19.626 0 0 0 3 9.342V15.5a.5.5 0 0 1-1 0V.5a.5.5 0 0 1 1 0v.282c.226-.079.496-.17.79-.26C4.606.272 5.67 0 6.5 0c.84 0 1.524.277 2.121.519l.043.018C9.286.788 9.828 1 10.5 1c.7 0 1.638-.23 2.437-.477a19.587 19.587 0 0 0 1.349-.476l.019-.007.004-.002h.001M14 1.221c-.22.078-.48.167-.766.255-.81.252-1.872.523-2.734.523-.886 0-1.592-.286-2.203-.534l-.008-.003C7.662 1.21 7.139 1 6.5 1c-.669 0-1.606.229-2.415.478A21.294 21.294 0 0 0 3 1.845v6.433c.22-.078.48-.167.766-.255C4.576 7.77 5.638 7.5 6.5 7.5c.847 0 1.548.28 2.158.525l.028.01C9.32 8.29 9.86 8.5 10.5 8.5c.668 0 1.606-.229 2.415-.478A21.317 21.317 0 0 0 14 7.655V1.222z" />
                  </svg>
                  You can mark the novels you have completed reading. You will
                  not receive notifications for such novels.
                </p>
              </div>
            </div>
          </div>
          <div className="buttons-novels">
            <div className="btn-container">
              <div className="fieldset">
                <input
                  type="radio"
                  id="filter_all"
                  name="libfilter"
                  defaultValue={1}
                  defaultChecked={true}
                />
                <label htmlFor="filter_all">All</label>
              </div>
              <div className="fieldset">
                <input
                  type="radio"
                  id="filter_updated"
                  name="libfilter"
                  defaultValue={2}
                />
                <label htmlFor="filter_updated">Updated</label>
              </div>
              <div className="fieldset">
                <input
                  type="radio"
                  id="filter_favorite"
                  name="libfilter"
                  defaultValue={3}
                />
                <label htmlFor="filter_favorite">Favorites</label>
              </div>
              <div className="fieldset">
                <input
                  type="radio"
                  id="filter_completed"
                  name="libfilter"
                  defaultValue={4}
                />
                <label htmlFor="filter_completed">Completed</label>
              </div>
            </div>
          </div>
        </div>
        <section className="saved-novels">
          <div className="sort-buttons">
            <button
              onClick={() =>
                setActiveFilters(prevState => ({
                  ...prevState,
                  sort: "last updated",
                }))
              }
              className={`sortbtn ${
                activeFilters.sort === "last updated" ? "selected" : ""
              }`}
            >
              <span>LAST UPDATE</span>
            </button>
            <button
              onClick={() =>
                setActiveFilters(prevState => ({
                  ...prevState,
                  sort: "last added",
                }))
              }
              className={`sortbtn ${
                activeFilters.sort === "last added" ? "selected" : ""
              }`}
            >
              <span>LAST ADDED</span>
            </button>
            <button
              onClick={() =>
                setActiveFilters(prevState => ({
                  ...prevState,
                  sort: "last read",
                }))
              }
              className={`sortbtn ${
                activeFilters.sort === "last read" ? "selected" : ""
              }`}
            >
              <span>LAST READ</span>
            </button>
          </div>
          <ul className="novel-header">
            <li className="h-title">Novel Title</li>
            <li className="h-prog">Progress</li>
            <li className="h-status">Status</li>
            <li className="h-action">...</li>
          </ul>
          <ul>
            {novels ? (
              novels.map((novel, i) => (
                <Suspense key={i} fallback={<Spinner />}>
                  <NovelCard key={novel._id} novel={novel} />
                </Suspense>
              ))
            ) : (
              <p>Bookmark some novels to show them here</p>
            )}
          </ul>
        </section>
      </div>
    </>
  );
};

export default TheLibrary;
