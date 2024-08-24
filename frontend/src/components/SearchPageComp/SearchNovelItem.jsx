import { Link } from "react-router-dom";

const SearchNovelItem = ({ novel }) => {
  return (
    <li className="novel-item">
      <Link
        title={novel.title}
        to={`/novel/${novel.slugTitle}`}
        className="item-cover"
      >
        <div className="novel-coverfig">
          <img src={novel.cover} alt="" />
        </div>
      </Link>
      <div className="item-stats">
        <h4 className="novel-title ">
          <Link title="Shadow Slave" to={`/novel/${novel.slugTitle}`}>
            {novel.title.length > 18
              ? novel.title.substring(0, 18) + "..."
              : novel.title}{" "}
          </Link>
        </h4>
        <span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width={16}
            height={16}
            fill="var(--text-color-2)"
            viewBox="0 0 576 512"
          >
            <path d="M309 106c11.4-7 19-19.7 19-34c0-22.1-17.9-40-40-40s-40 17.9-40 40c0 14.4 7.6 27 19 34L209.7 220.6c-9.1 18.2-32.7 23.4-48.6 10.7L72 160c5-6.7 8-15 8-24c0-22.1-17.9-40-40-40S0 113.9 0 136s17.9 40 40 40c.2 0 .5 0 .7 0L86.4 427.4c5.5 30.4 32 52.6 63 52.6l277.2 0c30.9 0 57.4-22.1 63-52.6L535.3 176c.2 0 .5 0 .7 0c22.1 0 40-17.9 40-40s-17.9-40-40-40s-40 17.9-40 40c0 9 3 17.3 8 24l-89.1 71.3c-15.9 12.7-39.5 7.5-48.6-10.7L309 106z" />
          </svg>
          Rank {novel.rank}
        </span>

        <span className="star-rating">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width={16}
            height={16}
            fill="var(--text-color-2)"
            className="bi bi-star-fill"
            viewBox="0 0 16 16"
          >
            <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z" />
          </svg>
          <span className="num-rate">{novel.rating.toFixed(2)}</span>
        </span>
      </div>
    </li>
  );
};

export default SearchNovelItem;
