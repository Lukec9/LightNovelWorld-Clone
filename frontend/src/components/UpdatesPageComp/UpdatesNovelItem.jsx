import { Link } from "react-router-dom";
import timeAgo from "../../utils/timeAgo";
import Spinner from "../Spinner";

const UpdatesNovelItem = ({ novel }) => {
  const lastChapter = novel?.chapters[novel.chapters.length - 1] || {
    chapterNumber: 1,
    title: "Example Title",
  };

  if (!novel) return <Spinner />;

  return (
    <li className="novel-item">
      <div className="cover-wrap">
        <Link
          title={novel?.title}
          to={`/novel/${novel?.slugTitle}`}
          className="item-cover"
        >
          <div className="novel-coverfig">
            <img src={novel?.cover} alt={`${novel?.title}'s cover`} />
          </div>
        </Link>
      </div>
      <div className="item-stats">
        <Link
          to={`/novel/${novel.slugTitle}/chapters/${
            lastChapter.chapterNumber || 1
          }`}
        >
          <h4 className="novel-title ">
            {novel.title}
            {/* {novel?.title.length > 18
              ? novel?.title.substring(0, 18) + "..."
              : novel?.title} */}
          </h4>
          <h5 className="chapter-title ">
            Chapter {lastChapter?.chapterNumber}:{" "}
            {lastChapter?.title.length > 18
              ? lastChapter?.title.substring(0, 18) + "..."
              : lastChapter?.title}
          </h5>
          <div className="novel-stats">
            <span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width={16}
                height={16}
                fill="var(--text-color-2)"
                className="bi bi-pencil"
                viewBox="0 0 16 16"
              >
                <path d="M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168zM11.207 2.5 13.5 4.793 14.793 3.5 12.5 1.207zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293zm-9.761 5.175-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325" />
              </svg>

              <time dateTime={novel?.updatedAt}>
                Updates {timeAgo(new Date(novel?.updatedAt))}
              </time>
            </span>
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
              Rank {novel?.rank}
            </span>
          </div>
        </Link>
        <div className="summary">
          <p>{novel?.summary}</p>
        </div>
      </div>
    </li>
  );
};

export default UpdatesNovelItem;
