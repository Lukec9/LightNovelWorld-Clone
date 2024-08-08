import { useEffect, useRef, useState } from "react";

const RankingPageNovelItem = ({ title, img }) => {
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
      <a title={title} href="#">
        <figure className="cover">
          <img src={img} alt="" />
        </figure>
      </a>
      <div className="novel-stats">
        <div className="status-group">
          <span className="rank-counter"></span>
          <span className="status">Ongoing</span>
        </div>
        <h2 className="title ">
          <a title={title} href="/novel/shadow-slave-05122222">
            {title.length > 18 ? title.substring(0, 18) + "..." : title}
          </a>
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
            <span>Action</span>
            <span>Adventure</span>
            <span>Fantasy</span>
            <span>Romance</span>
            <span>Action</span>
            <span>Adventure</span>
            <span>Fantasy</span>
            <span>Romance</span>
            <span>Action</span>
            <span>Adventure</span>
            <span>Fantasy</span>
            <span>Romance</span>
            <span>Action</span>
            <span>Adventure</span>
            <span>Fantasy</span>
            <span>Romance</span>
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
