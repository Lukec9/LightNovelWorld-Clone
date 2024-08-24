import React, { lazy, memo, useCallback, useEffect, useState } from "react";
import axiosInstance from "../../axios";
const NovelReview = lazy(() => import("./NovelReview"));

const ReviewsSection = ({ novel, reviews, setReviews }) => {
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [allReviewsFetched, setAllReviewsFetched] = useState(false);
  const novelId = novel?._id;

  const fetchReviews = useCallback(async () => {
    if (!novelId || loading || allReviewsFetched) return;

    setLoading(true);
    try {
      const response = await axiosInstance.get(`/novels/${novelId}/reviews`, {
        params: {
          page,
        },
      });

      const newReviews = response.data.reviews;

      if (newReviews.length === 0) {
        setAllReviewsFetched(true);
      } else {
        setReviews(prevReviews => {
          // Use a Set to filter out duplicates
          const existingIds = new Set(prevReviews.map(review => review.id));
          const uniqueNewReviews = newReviews.filter(
            review => !existingIds.has(review.id)
          );
          return [...prevReviews, ...uniqueNewReviews];
        });
        setPage(prevPage => prevPage + 1);
      }
    } finally {
      setLoading(false);
    }
  }, [novelId, page, loading, allReviewsFetched, reviews]);

  useEffect(() => {
    fetchReviews();
  }, [fetchReviews]);

  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + document.documentElement.scrollTop + 1 >=
        document.documentElement.scrollHeight
      ) {
        fetchReviews();
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [fetchReviews]);

  useEffect(() => {
    setPage(1);
    setReviews([]);
    setAllReviewsFetched(false);
  }, [novelId]);

  return (
    <>
      <section id="reviews" className="container">
        <div id="review_load" className="review-list fullw">
          {reviews.map((review, i) => (
            <NovelReview
              key={review._id}
              review={review}
              novelTitle={novel?.title}
              setReviews={setReviews}
            />
          ))}
        </div>
      </section>
    </>
  );
};

export default memo(ReviewsSection);
