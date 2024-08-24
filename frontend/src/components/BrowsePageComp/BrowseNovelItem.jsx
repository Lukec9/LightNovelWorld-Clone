import { Link } from "react-router-dom";
import timeAgo from "../../utils/timeAgo";
import { memo } from "react";

const BrowseNovelItem = ({ novel }) => {
  return (
    <li className="novel-item">
      <Link title={novel.title} to={`/novel/${novel.slugTitle}`}>
        <figure className="novel-coverfig">
          <img src={novel.cover} alt="" />
          <span className="badge star">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width={16}
              height={16}
              fill="var(--text-color)"
              className="bi bi-star-fill"
              viewBox="0 0 16 16"
            >
              <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z" />
            </svg>
            <span>{novel.rating.toFixed(1)}</span>
          </span>
        </figure>
        <h4 className="novel-title">
          {novel.title.length > 18
            ? novel.title.substring(0, 18) + "..."
            : novel.title}
        </h4>
      </Link>
      <div className="novel-stats">
        <span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width={16}
            height={16}
            fill="var(--text-color-2)"
            className="bi bi-book"
            viewBox="0 0 16 16"
          >
            <path d="M1 2.828c.885-.37 2.154-.769 3.388-.893 1.33-.134 2.458.063 3.112.752v9.746c-.935-.53-2.12-.603-3.213-.493-1.18.12-2.37.461-3.287.811zm7.5-.141c.654-.689 1.782-.886 3.112-.752 1.234.124 2.503.523 3.388.893v9.923c-.918-.35-2.107-.692-3.287-.81-1.094-.111-2.278-.039-3.213.492zM8 1.783C7.015.936 5.587.81 4.287.94c-1.514.153-3.042.672-3.994 1.105A.5.5 0 0 0 0 2.5v11a.5.5 0 0 0 .707.455c.882-.4 2.303-.881 3.68-1.02 1.409-.142 2.59.087 3.223.877a.5.5 0 0 0 .78 0c.633-.79 1.814-1.019 3.222-.877 1.378.139 2.8.62 3.681 1.02A.5.5 0 0 0 16 13.5v-11a.5.5 0 0 0-.293-.455c-.952-.433-2.48-.952-3.994-1.105C10.413.809 8.985.936 8 1.783" />
          </svg>
          {timeAgo(new Date(novel.updatedAt))}
        </span>
      </div>
    </li>
  );
};

export default memo(BrowseNovelItem);
