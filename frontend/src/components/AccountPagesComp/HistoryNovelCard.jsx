import { Link } from "react-router-dom";
import timeAgo from "../../utils/timeAgo";

const HistoryNovelCard = ({ novel }) => {
  const { cover, title, rank } = novel;
  const { completed, lastReadChapter, lastReadDate } = novel.progress;
  const lastReadChapterTitle = novel.chapters.find(
    chap => Number(chap.chapterNumber) === Number(lastReadChapter)
  ).title;
  return (
    <li className="novel-card">
      <div className="novel-cover">
        <figure className="novel-coverfig">
          <img src={cover} alt="" />
        </figure>
      </div>
      <div className="novel-content">
        <Link to={`/novel/${novel.slugTitle}`} className="novel-title">
          <p className="ntitle">{title}</p>
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
            Rank {rank}
          </span>
        </Link>
        <div className="chptpro">
          <p className="chappro">
            {completed ? (
              <span style={{ display: "block" }}>Reading is complete</span>
            ) : (
              <>
                <span>Progress: </span>
                <span>{`${lastReadChapter} / ${novel.chapters.length}`}</span>
                <span>
                  {" "}
                  ({(lastReadChapter / novel.chapters.length) * 100}%)
                </span>
              </>
            )}
          </p>
        </div>
        <div className="last-read">
          <span className="mobile-d">Last read: </span>
          <span> {timeAgo(new Date(lastReadDate))}</span>
          <Link to={`/novel/${novel.slugTitle}/chapters/${lastReadChapter}`}>
            Chapter {lastReadChapter}: {lastReadChapterTitle}{" "}
          </Link>
        </div>
      </div>
    </li>
  );
};

export default HistoryNovelCard;
