import { Link } from "react-router-dom";

const CategoryBtn = ({ category, isActive, onClick }) => {
  return (
    <li onClick={onClick} className={isActive ? "active" : ""}>
      <Link href="/browse">{category}</Link>
    </li>
  );
};

export default CategoryBtn;
