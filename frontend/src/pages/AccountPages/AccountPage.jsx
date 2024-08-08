import InfoListItem from "../../components/AccountPagesComp/InfoListItem";
import StatGroup from "../../components/AccountPagesComp/StatGroup";
import ColorPicker from "../../components/ColorPicker";
import "../../styles/AccountPages/AccountPageStyles.css";

const AccountPage = () => {
  return (
    <div className="user-panel-body">
      <div className="profile-info">
        <div className="upanel">
          <div className="uhead">
            <h3>Profile Info</h3>
          </div>
          <ul className="info-list">
            {userInfo.map((field, i) => (
              <InfoListItem key={i} label={field.label} value={field.value} />
            ))}
          </ul>
        </div>
        <div className="upanel__buttons">
          <a className="signout" href="">
            Sign out
          </a>
          <a className="updateprof button" href="">
            Update Profile
          </a>
          <div className="block delete">
            <a href="">Delete Account</a>
          </div>
        </div>
      </div>
      <div className="stat-info">
        <div className="upanel">
          <div className="uhead">
            <h3>Activity Stats</h3>
          </div>
          <div className="stat-group-collection">
            <StatGroup cstats={commentStats} />
            <StatGroup rstats={reviewStats} />
            <StatGroup nstats={novelStats} />
            <StatGroup kstats={karmaStats} />
          </div>
        </div>
        <p className="reminder">
          *** The data specified here are processed periodically. The actions
          you have taken are not updated instantly.
        </p>

        <div className="restriction-warning-panel">
          <div>
            <strong>Received Restriction Warning: None</strong>
            <p>
              Once you reach the 5 warning limit, your account will be
              automatically banned. Please consider the rules when writing
              comments and reviews. Check your inbox page to follow warning
              notifications.
            </p>
          </div>
        </div>
      </div>
      <div id="theme-setting" className="theme-setting">
        <div className="upanel">
          <div className="uhead">
            <h3>Theme Settings</h3>
          </div>
          <ColorPicker />
        </div>
      </div>
    </div>
  );
};

const userInfo = [
  {
    label: "User Name",
    value: "MrLukec",
  },
  {
    label: "E-mail",
    value: "tluka234@gmail.com",
  },
  {
    label: "About",
    value: "Hello",
  },
  {
    label: "Rank",
    value: "Reader",
  },
  {
    label: "Login Type",
    value: "External (Google/FB)",
  },
  {
    label: "Registered",
    value: "12 April 2023, 06:23",
  },
  {
    label: "Last Activity",
    value: "05 August 2024, 08:49",
  },
];

const commentStats = [
  {
    name: "Comments",
    value: 1,
  },
  { name: "Likes", value: 2 },
  { name: "Dislikes", value: 0 },
];
const reviewStats = [
  {
    name: "Review",
    value: 1,
  },
  { name: "Likes", value: 0 },
  { name: "Dislikes", value: 0 },
];
const novelStats = [
  { name: "Bookmarked", value: 10 },
  { name: "Novels Read", value: 39 },
];
const karmaStats = [
  { name: "Total points", value: 2 },
  { name: "Karma Level", value: 1 },
];

export default AccountPage;
