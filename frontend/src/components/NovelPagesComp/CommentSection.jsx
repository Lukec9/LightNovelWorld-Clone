import React, {
  useCallback,
  useEffect,
  useState,
  Suspense,
  lazy,
  memo,
} from "react";
import axiosInstance from "../../axios";
const NovelComment = lazy(() => import("./NovelComment"));
import Spinner from "../Spinner";

const CommentSection = ({
  novel,
  openModal,
  onChapter = false,
  chapterNumber,
}) => {
  const [comments, setComments] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [filter, setFilter] = useState("newest");

  const fetchComments = useCallback(async () => {
    if (!novel) return;

    setLoading(true);
    try {
      const response = await axiosInstance.get(
        `/novels/${novel._id}/comments`,
        {
          params: { filter, page, limit: 5 }, // Adjust limit as needed
        }
      );

      if (response.status === 200) {
        const newComments = response.data.comments;

        // Ensure uniqueness based on `_id`
        const existingCommentIds = new Set(
          comments.map(comment => comment._id)
        );
        const uniqueNewComments = newComments.filter(
          comment => !existingCommentIds.has(comment._id)
        );

        setComments(prevComments =>
          page === 1
            ? uniqueNewComments
            : [...prevComments, ...uniqueNewComments]
        );
        setHasMore(uniqueNewComments.length === 5); // Adjust based on your limit
      }
    } catch (error) {
      console.error("Failed to load comments", error);
    } finally {
      setLoading(false);
    }
  }, [page, novel, filter]);
  const fetchChapterComments = useCallback(async () => {
    if (!onChapter) return;
    if (!novel) return;
    setLoading(true);
    try {
      const response = await axiosInstance.get(
        `/novels/${novel._id}/chapters/${chapterNumber}/comments`,
        {
          params: { page, limit: 10 }, // Adjust limit as needed
        }
      );

      if (response.status === 200) {
        const newComments = response.data.comments;

        // Ensure uniqueness based on `_id`
        const existingCommentIds = new Set(
          comments.map(comment => comment._id)
        );
        const uniqueNewComments = newComments.filter(
          comment => !existingCommentIds.has(comment._id)
        );

        setComments(prevComments =>
          page === 1
            ? uniqueNewComments
            : [...prevComments, ...uniqueNewComments]
        );
        setHasMore(uniqueNewComments.length === 10); // Adjust based on your limit
      }
    } catch (error) {
      console.error("Failed to load comments", error);
    } finally {
      setLoading(false);
    }
  }, [page, novel, chapterNumber]);

  useEffect(() => {
    if (onChapter) {
      fetchChapterComments();
    } else {
      fetchComments();
    }
  }, [fetchComments, fetchChapterComments, onChapter]);

  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + document.documentElement.scrollTop >=
        document.documentElement.scrollHeight - 100 // Trigger 200px before the bottom
      ) {
        if (hasMore && !loading) {
          setPage(prevPage => prevPage + 1);
        }
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [hasMore, loading]);

  useEffect(() => {
    setLoading(true);
    setPage(1);
    setHasMore(true);
    setComments([]);
    if (onChapter) {
      fetchChapterComments();
    } else {
      fetchComments();
    }
  }, [filter, onChapter]);

  const handleFilterChange = event => {
    const selectedFilter = event.target.value;
    setFilter(selectedFilter);
  };

  return (
    <section className="comment-list">
      <div className="head">
        <h4>User Comments</h4>
        <a id="write-comment" onClick={openModal} className="button">
          Write Comment
        </a>
      </div>
      <div className="comment-policy">
        <a id="comment-policy-show">
          Please read and apply the rules before posting a comment.
        </a>
        <br />
        By sharing your comment, you agree to all the relevant terms.
      </div>
      {!onChapter && (
        <>
          <div className="chapter-comments-group">
            <p className="com-grp-desc">
              Comments on the novel chapters for the last week.
            </p>
            <div className="com-grp-list">
              {comments.slice(0, 5).map(comment => (
                <div key={comment._id} className="com-grp-item">
                  <span className="text1row">
                    <time dateTime={comment.date}>
                      {new Date(comment.date).toLocaleString()}{" "}
                      {/* Adjust formatting as needed */}
                    </time>
                    : <strong>{comment.count}</strong> comment
                    {comment.count > 1 ? "s" : ""} on Chapter{" "}
                    {comment.chapterTitle}
                  </span>
                </div>
              ))}
            </div>
          </div>
          <div id="comment-filter">
            <div className="radio-group">
              <div className="sub-group">
                <div className="group-desc">Orders</div>
                <div className="group-items">
                  <div className="radio-item">
                    <input
                      id="com_order_newest"
                      type="radio"
                      name="com_order"
                      value="newest"
                      checked={filter === "newest"}
                      onChange={handleFilterChange}
                    />
                    <label htmlFor="com_order_newest">Newest</label>
                  </div>
                </div>
              </div>
              <div className="sub-group">
                <div className="group-desc">Most Liked</div>
                <div className="group-items">
                  <div className="radio-item">
                    <input
                      id="com_order_likedweek"
                      type="radio"
                      name="com_order"
                      value="mostLikedThisWeek"
                      checked={filter === "mostLikedThisWeek"}
                      onChange={handleFilterChange}
                    />
                    <label htmlFor="com_order_likedweek">This Week</label>
                  </div>
                  <div className="radio-item">
                    <input
                      id="com_order_likedmonth"
                      type="radio"
                      name="com_order"
                      value="mostLikedThisMonth"
                      checked={filter === "mostLikedThisMonth"}
                      onChange={handleFilterChange}
                    />
                    <label htmlFor="com_order_likedmonth">This Month</label>
                  </div>
                  <div className="radio-item">
                    <input
                      id="com_order_likedall"
                      type="radio"
                      name="com_order"
                      value="mostLikedAllTime"
                      checked={filter === "mostLikedAllTime"}
                      onChange={handleFilterChange}
                    />
                    <label htmlFor="com_order_likedall">All Time</label>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
      <div className="comment-wrapper">
        <ul>
          {comments.length > 0 ? (
            comments.map(comment => (
              <li key={comment._id}>
                <Suspense fallback={<Spinner />}>
                  <NovelComment comment={comment} setComments={setComments} />
                </Suspense>
              </li>
            ))
          ) : (
            <p>No comments</p>
          )}
        </ul>
      </div>
      {loading && <Spinner />} {/* Adjust placement of loading spinner */}
    </section>
  );
};

export default memo(CommentSection);
