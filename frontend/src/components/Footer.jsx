import "../styles/FooterStyles.css";

const Footer = () => {
  return (
    <footer>
      <div className="wrapper">
        <div className="logo">
          <img src="/assets/logo-dark.webp" alt="" />
          <span> © 2023 lightnovelworld.com</span>
        </div>
        <div className="nav-grid">
          <nav className="links">
            <ul>
              <li>
                <a href="https://www.google.com">&gt; Novel Ranking</a>
              </li>
              <li>
                <a href="https://www.google.com">&gt; Latest Chapter</a>
              </li>
              <li>
                <a href="https://www.google.com">&gt; Latest Novels</a>
              </li>
              <li>
                <a href="https://www.google.com">&gt; All Tags</a>
              </li>
            </ul>
          </nav>
          <nav className="links">
            <ul>
              <li>
                <a href="https://www.google.com">&gt; Romance</a>
              </li>
              <li>
                <a href="https://www.google.com">&gt; Josei for Ladies</a>
              </li>
              <li>
                <a href="https://www.google.com">&gt; Video Games</a>
              </li>
              <li>
                <a href="https://www.google.com">&gt; Fantasy</a>
              </li>
            </ul>
          </nav>
          <nav className="links">
            <ul>
              <li>
                <a href="https://www.google.com">&gt; Martial Arts</a>
              </li>
              <li>
                <a href="https://www.google.com">&gt; Slice of Life</a>
              </li>
              <li>
                <a href="https://www.google.com">&gt; Sci-fi</a>
              </li>
              <li>
                <a href="https://www.google.com">&gt; Super Natural</a>
              </li>
            </ul>
          </nav>
          <nav className="links">
            <ul>
              <li>
                <a href="https://www.google.com">&gt; Privacy Policy</a>
              </li>
              <li>
                <a href="https://www.google.com">&gt; Terms of Service</a>
              </li>
              <li>
                <a href="https://www.google.com">&gt; DMCA Notices</a>
              </li>
              <li>
                <a href="https://www.google.com">&gt; Contact Us</a>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
