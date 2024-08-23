import { useEffect, useState } from "react";
import UserReview from "../../components/AccountPagesComp/UserReview";
import { useAuthContext } from "../../context/AuthContext";
import "../../styles/AccountPages/AccountReviewsPageStyles.css";
import notify from "../../utils/toastUtil";
import axiosInstance from "../../axios";

const AccountReviewsPage = () => {
  const {
    state: { user: user },
  } = useAuthContext();
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    const getReviews = async () => {
      try {
        const response = await axiosInstance.get(`/users/${user._id}/reviews`);
        setReviews(response.data.reviews);
        notify("success", "Got Reviews!");
      } catch (error) {
        notify("error", "Could not get user reviews");
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
