import UserReview from "../../components/AccountPagesComp/UserReview";
import "../../styles/AccountPages/AccountCommentsPageStyles.css";

const AccountReviewsPage = () => {
  return (
    <div className="user-panel-body">
      <div className="user-panel-section">
        <section className="profile-comments account-container-box">
          <div className="user-panel-header">
            <h3>Recent Reviews (Last 20)</h3>
          </div>

          <div className="user-panel-body">
            <ul className="review-list">
              {Array(2)
                .fill(null)
                .map((_, i) => (
                  <UserReview key={i} />
                ))}
            </ul>
          </div>
        </section>
      </div>
    </div>
  );
};

export default AccountReviewsPage;
