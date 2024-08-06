import UserComment from "../../components/AccountPagesComp/UserComment";
import "../../styles/AccountPages/AccountCommentsPageStyles.css";

const AccountCommentsPage = () => {
  return (
    <div className="user-panel-body">
      <div className="user-panel-section">
        <section className="profile-comments account-container-box">
          <div className="user-panel-header">
            <h3>Recent Comments (Last 20)</h3>
          </div>
          <div className="comment-list">
            <div className="comment-wrapper">
              <div className="user-panel-body">
                <ul>
                  {Array(5)
                    .fill(null)
                    .map((_, i) => (
                      <UserComment key={i} />
                    ))}
                </ul>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default AccountCommentsPage;
