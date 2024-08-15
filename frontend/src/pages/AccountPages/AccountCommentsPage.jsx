import { useEffect, useState } from "react";
import UserComment from "../../components/AccountPagesComp/UserComment";
import "../../styles/AccountPages/AccountCommentsPageStyles.css";
import axiosInstance from "../../axios";
import { useAuthContext } from "../../context/AuthContext";
import notify from "../../utils/toastUtil";

const AccountCommentsPage = () => {
  const [comments, setComments] = useState([]);
  const {
    state: { user: user },
  } = useAuthContext();

  useEffect(() => {
    const getComments = async () => {
      try {
        const response = await axiosInstance.get(`/users/${user._id}/comments`);
        setComments(response.data.comments);
        notify("success", "Got comments!");
      } catch (error) {
        notify("error", "Could not get user comments");
      }
    };
    getComments();
  }, []);

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
                  {comments.map((comment, i) => (
                    <UserComment
                      setComments={setComments}
                      comment={comment}
                      key={comment._id}
                    />
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
