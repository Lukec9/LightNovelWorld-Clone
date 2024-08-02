import RecentNovelItem from "./RecentNovelItem";

const RecentlyAddedChapteresSection = () => {
  return (
    <section className="container vspace recent-chap">
      <div className="section-header ">
        <h3>Recently Added Chapters</h3>
        <a
          className="getmorebtn"
          title="Most recently added light novels"
          href="/browse/genre-all-25060123/order-new/status-all"
        >
          View More
        </a>
      </div>{" "}
      <div className="section-body">
        <div className="novel-list">
          {Array(24)
            .fill(null)
            .map((_, i) => (
              <RecentNovelItem
                key={i}
                title={"Author's pov"}
                rank={1}
                chapters={"1000"}
                img={"assets/01485-lightning-is-the-only-way.jpg"}
              />
            ))}
        </div>
      </div>
    </section>
  );
};

export default RecentlyAddedChapteresSection;
