import { Outlet } from "react-router-dom";
import "../styles/AdminStyles.css";

const AdminLayout = () => {
  return (
    <div className="admin-pages">
      <h1>Admin Dashboard</h1>
      <Outlet />
    </div>
  );
};

export default AdminLayout;
