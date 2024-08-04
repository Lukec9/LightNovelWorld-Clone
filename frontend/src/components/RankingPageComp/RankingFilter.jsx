const RankingFilter = ({ title, desc, isActive }) => {
  return (
    <li className={isActive ? "active" : ""}>
      <a
        title={title}
        href={
          title === "Ranking" ? "/ranking" : `/ranking/${title.toLowerCase()}`
        }
      >
        <span>{title}</span>
        <small>{desc}</small>
      </a>
    </li>
  );
};

export default RankingFilter;
