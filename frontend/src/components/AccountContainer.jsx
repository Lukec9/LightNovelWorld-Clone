const AccountContainer = () => {
  return (
    <div className="account-container-box">
      <div className="user-info">
        <div className="profile-image">
          <img id="pfp" src="/assets/pfp.jpg" alt="MrLukec" />
        </div>
        <div className="user-acc-info">
          <div className="username">MrLukec</div>
          <div className="reader-email">
            <p>
              <svg
                className="svg-reader"
                xmlns="http://www.w3.org/2000/svg"
                width={24}
                height={24}
                viewBox="0 0 24 24"
                fill="none"
              >
                <path
                  opacity="0.3"
                  d="M22 12C22 17.5 17.5 22 12 22C6.5 22 2 17.5 2 12C2 6.5 6.5 2 12 2C17.5 2 22 6.5 22 12ZM12 7C10.3 7 9 8.3 9 10C9 11.7 10.3 13 12 13C13.7 13 15 11.7 15 10C15 8.3 13.7 7 12 7Z"
                  fill="gray"
                />
                <path
                  d="M12 22C14.6 22 17 21 18.7 19.4C17.9 16.9 15.2 15 12 15C8.8 15 6.09999 16.9 5.29999 19.4C6.99999 21 9.4 22 12 22Z"
                  fill="white"
                />
              </svg>
              Reader
            </p>
            <p>
              <svg
                className="svg-email"
                xmlns="http://www.w3.org/2000/svg"
                width={24}
                height={24}
                viewBox="0 0 24 24"
                fill="none"
              >
                <path
                  opacity="0.3"
                  d="M21 19H3C2.4 19 2 18.6 2 18V6C2 5.4 2.4 5 3 5H21C21.6 5 22 5.4 22 6V18C22 18.6 21.6 19 21 19Z"
                  fill="gray"
                />
                <path
                  d="M21 5H2.99999C2.69999 5 2.49999 5.10005 2.29999 5.30005L11.2 13.3C11.7 13.7 12.4 13.7 12.8 13.3L21.7 5.30005C21.5 5.10005 21.3 5 21 5Z"
                  fill="white"
                />
              </svg>
              tluka234@gmail.com
            </p>
          </div>
        </div>
      </div>
      <nav className="pages-nav-buttons">
        <ul>
          <li className="page-item">
            <a href="https://www.lightnovelworld.com/account">Info</a>
          </li>
          <li className="page-item library-card">
            <a href="https://www.lightnovelworld.com/account/library">
              Library
            </a>
          </li>
          <li className="page-item">
            <a href="https://www.lightnovelworld.com/account">History</a>
          </li>
          <li className="page-item">
            <a href="https://www.lightnovelworld.com/account">Comments</a>
          </li>
          <li className="page-item">
            <a href="https://www.lightnovelworld.com/account">Reviews</a>
          </li>
          <li className="page-item">
            <a href="https://www.lightnovelworld.com/account">Inbox</a>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default AccountContainer;
