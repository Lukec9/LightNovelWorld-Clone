import { Outlet } from "react-router-dom";
import AccountContainer from "../components/AccountContainer";
import "../styles/AccountContainerStyles.css";

const AccountLayout = () => {
  return (
    <div className="account-pages">
      <div className="container">
        <AccountContainer />
        <Outlet />
      </div>
    </div>
  );
};

export default AccountLayout;
