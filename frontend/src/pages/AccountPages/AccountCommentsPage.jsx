import { useEffect, useState } from "react";
import UserComment from "../../components/AccountPagesComp/UserComment";
import "../../styles/AccountPages/AccountCommentsPageStyles.css";
import axiosInstance from "../../axios";
import { useAuthContext } from "../../context/AuthContext";
import notify from "../../utils/toastUtil";
import Spinner from "../../components/Spinner";

const AccountCommentsPage = () => {
  const [comments, setComments] = useState([]);
  const {
    state: { user: user },
  } = useAuthContext();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getComments = async () => {
      setLoading(true);
      try {
        const response = await axiosInstance.get(`/users/${user._id}/comments`);
        setComments(response.data.comments);
      } finally {
        setLoading(false);
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
          {loading && <Spinner />}
          {!loading && !comments && <h2>No comments written by user</h2>}
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
