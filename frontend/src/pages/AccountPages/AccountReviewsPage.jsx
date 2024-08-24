import { useEffect, useState } from "react";
import UserReview from "../../components/AccountPagesComp/UserReview";
import { useAuthContext } from "../../context/AuthContext";
import "../../styles/AccountPages/AccountReviewsPageStyles.css";
import notify from "../../utils/toastUtil";
import axiosInstance from "../../axios";
import Spinner from "../../components/Spinner";

const AccountReviewsPage = () => {
  const {
    state: { user: user },
  } = useAuthContext();
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getReviews = async () => {
      try {
        setLoading(true);
        const response = await axiosInstance.get(`/users/${user._id}/reviews`);
        setReviews(response.data.reviews);
      } finally {
        setLoading(false);
      }
    };
    getReviews();
  }, []);

  return (
    <div className="user-panel-body">
      <div className="user-panel-section">
        <section className="profile-comments account-container-box">
          <div className="user-panel-header">
            <h3>Recent Reviews (Last 20)</h3>
          </div>

          <div className="user-panel-body">
            {loading && <Spinner />}
            {!reviews.toString() && !loading && (
              <h2>No reviews written by user</h2>
            )}
            <ul className="review-list">
              {reviews.map(review => (
                <UserReview
                  review={review}
                  setReviews={setReviews}
                  user={user}
                  key={review._id}
                />
              ))}
            </ul>
          </div>
        </section>
      </div>
    </div>
  );
};

export default AccountReviewsPage;
