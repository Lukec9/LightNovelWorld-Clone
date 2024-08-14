import NovelItem from "./NovelItem";

const NewNovelSection = () => {
  return (
    <section className="container vspace">
      <div className="section-header">
        <h3>New Ongoing Release</h3>
        <a
          className="getmorebtn"
          title="Most recently added light novels"
          href="/browse/genre-all-25060123/order-new/status-all"
        >
          View More
        </a>
      </div>
      <div className="section-body">
        <ul className="novel-list">
          {/* {Array(12)
            .fill(null)
            .map((_, i) => (
              <NovelItem
                key={i}
                title={"Steward demonic emperor"}
                rank={"1"}
                chapters={"1000"}
                img={"/assets/01296-grand-ancestral-bloodlines.jpg"}
              />
            ))} */}
        </ul>
      </div>
    </section>
  );
};

export default NewNovelSection;
