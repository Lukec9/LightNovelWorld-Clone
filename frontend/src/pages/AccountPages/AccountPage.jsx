import InfoListItem from "../../components/AccountPagesComp/InfoListItem";
import StatGroup from "../../components/AccountPagesComp/StatGroup";
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
          <div className="color-select">
            <p>
              *** Theme settings are stored in the browser cookie. It is not
              applied when you change browser or device.
            </p>
            <h4>Dark Mode Background Colors</h4>
            <p>
              <i>It only works when dark mode is active.</i>
            </p>
            <div className="color-list">
              <div className="color-item">
                <input
                  id="bgcolor-black"
                  name="bgcolor"
                  type="radio"
                  defaultValue="black"
                />
                <label htmlFor="bgcolor-black" data-bgcolor="black" />
              </div>
              <div className="color-item">
                <input
                  id="bgcolor-gray"
                  name="bgcolor"
                  type="radio"
                  defaultValue="gray"
                />
                <label htmlFor="bgcolor-gray" data-bgcolor="gray" />
              </div>
              <div className="color-item">
                <input
                  id="bgcolor-darkgray"
                  name="bgcolor"
                  type="radio"
                  defaultValue="darkgray"
                />
                <label htmlFor="bgcolor-darkgray" data-bgcolor="darkgray" />
              </div>
              <div className="color-item">
                <input
                  id="bgcolor-darkblue"
                  name="bgcolor"
                  type="radio"
                  defaultValue="darkblue"
                  defaultChecked=""
                />
                <label htmlFor="bgcolor-darkblue" data-bgcolor="darkblue" />
              </div>
              <div className="color-item">
                <input
                  id="bgcolor-darkblue2"
                  name="bgcolor"
                  type="radio"
                  defaultValue="darkblue2"
                />
                <label htmlFor="bgcolor-darkblue2" data-bgcolor="darkblue2" />
              </div>
              <div className="color-item">
                <input
                  id="bgcolor-darkblue3"
                  name="bgcolor"
                  type="radio"
                  defaultValue="darkblue3"
                />
                <label htmlFor="bgcolor-darkblue3" data-bgcolor="darkblue3" />
              </div>
              <div className="color-item">
                <input
                  id="bgcolor-darkblue4"
                  name="bgcolor"
                  type="radio"
                  defaultValue="darkblue4"
                />
                <label htmlFor="bgcolor-darkblue4" data-bgcolor="darkblue4" />
              </div>
              <div className="color-item">
                <input
                  id="bgcolor-darkblue5"
                  name="bgcolor"
                  type="radio"
                  defaultValue="darkblue5"
                />
                <label htmlFor="bgcolor-darkblue5" data-bgcolor="darkblue5" />
              </div>
              <div className="color-item">
                <input
                  id="bgcolor-darkgreen"
                  name="bgcolor"
                  type="radio"
                  defaultValue="darkgreen"
                />
                <label htmlFor="bgcolor-darkgreen" data-bgcolor="darkgreen" />
              </div>
              <div className="color-item">
                <input
                  id="bgcolor-darkbrown"
                  name="bgcolor"
                  type="radio"
                  defaultValue="darkbrown"
                />
                <label htmlFor="bgcolor-darkbrown" data-bgcolor="darkbrown" />
              </div>
              <div className="color-item">
                <input
                  id="bgcolor-darkpurple"
                  name="bgcolor"
                  type="radio"
                  defaultValue="darkpurple"
                />
                <label htmlFor="bgcolor-darkpurple" data-bgcolor="darkpurple" />
              </div>
              <div className="color-item">
                <input
                  id="bgcolor-darkyellow"
                  name="bgcolor"
                  type="radio"
                  defaultValue="darkyellow"
                />
                <label htmlFor="bgcolor-darkyellow" data-bgcolor="darkyellow" />
              </div>
            </div>
          </div>
          <div className="color-select">
            <h4>Highligt Colors</h4>
            <p>
              <i>(buttons, links, tags etc...)</i>
            </p>
            <div className="color-list">
              <div className="color-item">
                <input
                  id="hgcolor-gray"
                  name="hgcolor"
                  type="radio"
                  defaultValue="gray"
                />
                <label htmlFor="hgcolor-gray" data-hgcolor="gray" />
              </div>
              <div className="color-item">
                <input
                  id="hgcolor-purple"
                  name="hgcolor"
                  type="radio"
                  defaultValue="purple"
                />
                <label htmlFor="hgcolor-purple" data-hgcolor="purple" />
              </div>
              <div className="color-item">
                <input
                  id="hgcolor-darkpurple"
                  name="hgcolor"
                  type="radio"
                  defaultValue="darkpurple"
                />
                <label htmlFor="hgcolor-darkpurple" data-hgcolor="darkpurple" />
              </div>
              <div className="color-item">
                <input
                  id="hgcolor-grayblue"
                  name="hgcolor"
                  type="radio"
                  defaultValue="grayblue"
                />
                <label htmlFor="hgcolor-grayblue" data-hgcolor="grayblue" />
              </div>
              <div className="color-item">
                <input
                  id="hgcolor-blue"
                  name="hgcolor"
                  type="radio"
                  defaultValue="blue"
                  defaultChecked=""
                />
                <label htmlFor="hgcolor-blue" data-hgcolor="blue" />
              </div>
              <div className="color-item">
                <input
                  id="hgcolor-blue2"
                  name="hgcolor"
                  type="radio"
                  defaultValue="blue2"
                />
                <label htmlFor="hgcolor-blue2" data-hgcolor="blue2" />
              </div>
              <div className="color-item">
                <input
                  id="hgcolor-green"
                  name="hgcolor"
                  type="radio"
                  defaultValue="green"
                />
                <label htmlFor="hgcolor-green" data-hgcolor="green" />
              </div>
              <div className="color-item">
                <input
                  id="hgcolor-green2"
                  name="hgcolor"
                  type="radio"
                  defaultValue="green2"
                />
                <label htmlFor="hgcolor-green2" data-hgcolor="green2" />
              </div>
              <div className="color-item">
                <input
                  id="hgcolor-yellow"
                  name="hgcolor"
                  type="radio"
                  defaultValue="yellow"
                />
                <label htmlFor="hgcolor-yellow" data-hgcolor="yellow" />
              </div>
              <div className="color-item">
                <input
                  id="hgcolor-red"
                  name="hgcolor"
                  type="radio"
                  defaultValue="red"
                />
                <label htmlFor="hgcolor-red" data-hgcolor="red" />
              </div>
              <div className="color-item">
                <input
                  id="hgcolor-orange"
                  name="hgcolor"
                  type="radio"
                  defaultValue="orange"
                />
                <label htmlFor="hgcolor-orange" data-hgcolor="orange" />
              </div>
              <div className="color-item">
                <input
                  id="hgcolor-pink"
                  name="hgcolor"
                  type="radio"
                  defaultValue="pink"
                />
                <label htmlFor="hgcolor-pink" data-hgcolor="pink" />
              </div>
            </div>
          </div>
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
