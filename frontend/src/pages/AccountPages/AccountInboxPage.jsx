import "../../styles/AccountPages/AccountInboxPageStyles.css";

const AccountInboxPage = () => {
  return (
    <div className="user-panel inbox-page">
      <div className="user-panel-section">
        <section className="account-container-box">
          <div className="user-panel-header">
            <h3>Your Message Inbox</h3>
            <p>
              Notifications of transactions such as likes and replies to your
              comments
            </p>
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
                  <label htmlFor="filter_all">View All</label>
                </div>
                <div className="fieldset">
                  <input
                    type="radio"
                    id="filter_updated"
                    name="libfilter"
                    defaultValue={2}
                  />
                  <label htmlFor="filter_updated">Likes</label>
                </div>
                <div className="fieldset">
                  <input
                    type="radio"
                    id="filter_favorite"
                    name="libfilter"
                    defaultValue={3}
                  />
                  <label htmlFor="filter_favorite">Replies</label>
                </div>
              </div>
            </div>
          </div>
          <div className="white-boxed">
            <p>You do not have any notifications.</p>
            <p>
              You can take a more active role by writing comments and reviews
              for novels.
            </p>
          </div>
        </section>
      </div>
    </div>
  );
};

export default AccountInboxPage;
