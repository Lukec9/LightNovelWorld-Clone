import { Link } from "react-router-dom";

const CategoryBtn = ({ category, isActive, onClick, tag }) => {
  return (
    <li onClick={onClick} className={isActive ? "active" : ""}>
      {tag ? <button>{category}</button> : <Link to="/browse">{category}</Link>}
    </li>
  );
};

export default CategoryBtn;
