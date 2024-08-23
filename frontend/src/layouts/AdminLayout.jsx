import { Link, Outlet, useParams } from "react-router-dom";
import "../styles/AdminStyles.css";

const AdminLayout = () => {
  const { novelId } = useParams();
  return (
    <div className="admin-layout">
      <aside className="sidebar">
        <h2>Admin Panel</h2>
        <nav>
          <ul>
            <li>
              <Link to="/admin/create">Create Novel</Link>
            </li>
            <li>
              <Link to="/admin/update">Update Novel</Link>
            </li>
            {/* <li>
              <Link to="/admin/manage">Manage Chapters</Link>
            </li> */}
          </ul>
        </nav>
      </aside>
      <div className="admin-content">
        <Outlet />
      </div>
    </div>
  );
};

export default AdminLayout;
