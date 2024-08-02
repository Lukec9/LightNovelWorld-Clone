import { Outlet } from "react-router-dom";

const AccountLayout = () => {
  return (
    <div className="container">
      <Outlet />
    </div>
  );
};

export default AccountLayout;
