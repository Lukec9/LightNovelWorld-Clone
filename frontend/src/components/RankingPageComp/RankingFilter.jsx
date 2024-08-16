import { Link } from "react-router-dom";

const RankingFilter = ({ title, desc, isActive }) => {
  return (
    <li className={isActive ? "active" : ""}>
      <Link
        title={title}
        to={
          title === "Ranking" ? "/ranking" : `/ranking/${title.toLowerCase()}`
        }
      >
        <span>{title}</span>
        <small>{desc}</small>
      </Link>
    </li>
  );
};

export default RankingFilter;
