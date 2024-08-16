import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";

const RankingPageNovelItem = ({ title, img, novel }) => {
  const scrollContainerRef = useRef(null);
  const [hasOverflow, setHasOverflow] = useState(false);

  const checkOverflow = () => {
    if (scrollContainerRef.current) {
      const { scrollWidth, clientWidth } = scrollContainerRef.current;
      setHasOverflow(scrollWidth > clientWidth);
    }
  };

  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: -100, behavior: "smooth" });
    }
  };

  const scrollRight = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: 100, behavior: "smooth" });
    }
  };
  useEffect(() => {
    checkOverflow();
    const handleResize = () => checkOverflow();
    window.addEventListener("resize", handleResize);

    if (scrollContainerRef.current) {
      scrollContainerRef.current.addEventListener("scroll", checkOverflow);
    }

    return () => {
      window.removeEventListener("resize", handleResize);
      if (scrollContainerRef.current) {
        scrollContainerRef.current.removeEventListener("scroll", checkOverflow);
      }
    };
  }, []);

  return (
    <li className="novel-item">
      <Link title={novel.title} to={`/novels/${novel.slugTitle}`}>
        <figure className="cover">
          <img src={novel.cover} alt={`${novel.title}'s cover`} />
        </figure>
      </Link>
      <div className="novel-stats">
        <div className="status-group">
          <span className="rank-counter"></span>
          <span className="status">{novel.status}</span>
        </div>
        <h2 className="title ">
          <Link title={title} to={`/novels/${novel.slugTitle}`}>
            {novel.title.length > 18
              ? novel.title.substring(0, 18) + "..."
              : novel.title}
          </Link>
        </h2>{" "}
        <div className="categories ">
          {hasOverflow && (
            <i
              onClick={scrollLeft}
              className="icon-left-open scroll-arrow arrow-left"
            >
              &lt;
            </i>
          )}
          <div ref={scrollContainerRef} className="scroll">
            {novel.categories.map(c => (
              <span>{c}</span>
            ))}
          </div>
          {hasOverflow && (
            <i
              onClick={scrollRight}
              className="icon-right-open scroll-arrow arrow-right"
            >
              &gt;
            </i>
          )}
        </div>
      </div>
    </li>
  );
};

export default RankingPageNovelItem;
