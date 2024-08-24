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
  const [pageSize, setPageSize] = useState(10);
  const [filter, setFilter] = useState("newest"); // Default to 'newest'
  const [period, setPeriod] = useState("allTime"); // Default period
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [hasMore, setHasMore] = useState(true); // Track if more comments are available
  const novelId = novel._id;

  const fetchComments = async (novelId, page, pageSize, filter, period) => {
    try {
      const response = await axiosInstance.get(`/novels/${novelId}/comments`, {
        params: {
          page,
          pageSize,
          sortBy: filter,
          period,
        },
      });

      const fetchedComments = response.data;
      setHasMore(fetchedComments.length === pageSize);

      return fetchedComments;
    } catch (error) {
      return;
    }
  };

  const fetchChapterComments = useCallback(async () => {
    if (!onChapter || !novel) return;

    setLoading(true);
    try {
      const response = await axiosInstance.get(
        `/novels/${novel._id}/chapters/${chapterNumber}/comments`,
        {
          params: { page, limit: pageSize }, // Adjust limit as needed
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
        setHasMore(uniqueNewComments.length === pageSize); // Adjust based on your limit
      }
    } catch (error) {
      return;
    } finally {
      setLoading(false);
    }
  }, [page, novel, chapterNumber, onChapter, pageSize]);
  useEffect(() => {
    const loadComments = async () => {
      setLoading(true);
      setError(null);
      try {
        const newComments = await fetchComments(
          novelId,
          page,
          pageSize,
          filter,
          period
        );

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
      } catch (error) {
        setError("Failed to load comments");
      } finally {
        setLoading(false);
      }
    };
    if (onChapter) {
      fetchChapterComments();
    } else {
      loadComments();
    }
  }, [novelId, page, pageSize, filter, period]);

  const handleFilterChange = event => {
    const value = event.target.value;
    if (value === "newest") {
      setFilter("newest");
      setPeriod("allTime"); // Default period for newest
    } else if (value === "mostLikedThisWeek") {
      setFilter("mostLiked");
      setPeriod("week");
    } else if (value === "mostLikedThisMonth") {
      setFilter("mostLiked");
      setPeriod("month");
    } else if (value === "mostLikedAllTime") {
      setFilter("mostLiked");
      setPeriod("allTime");
    }

    // Reset page to 1 when filter changes
    setPage(1);
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
                      checked={filter === "mostLiked" && period === "week"}
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
                      checked={filter === "mostLiked" && period === "month"}
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
                      checked={filter === "mostLiked" && period === "allTime"}
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
      {hasMore && (
        <div>
          <button
            onClick={() => setPage(page + 1)}
            disabled={!hasMore || loading}
          >
            Next
          </button>
        </div>
      )}
      {loading && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}
      {loading && <Spinner />} {/* Adjust placement of loading spinner */}
    </section>
  );
};

export default memo(CommentSection);
