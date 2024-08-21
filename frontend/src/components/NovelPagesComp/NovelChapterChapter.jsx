import { Link } from "react-router-dom";
import timeAgo from "../../utils/timeAgo";

const NovelChapterChapter = ({ chapter, slugTitle }) => {
  return (
    <li>
      <Link
        to={`/novel/${slugTitle}/chapters/${chapter.chapterNumber}`}
        title="Chapter 1: Prologue - Calamity Record"
      >
        <span className="chapter-no "></span>
        <strong className="chapter-title">{chapter.title}</strong>
        <time className="chapter-update" dateTime={chapter.createdAt}>
          {timeAgo(new Date(chapter.updatedAt))}
        </time>
      </Link>
    </li>
  );
};

export default NovelChapterChapter;
