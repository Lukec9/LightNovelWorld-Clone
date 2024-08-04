import React from "react";
import NovelItem from "./NovelItem";

const CompletedStoriesSection = () => {
  return (
    <section className="container vspace">
      <div className="section-header">
        <h3>Completed Stories</h3>
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
          {Array(12)
            .fill(null)
            .map((_, i) => (
              <NovelItem
                key={i}
                title={"Author's pov"}
                rank={1}
                chapters={"1000"}
                completedS={true}
                img={"/assets/01238-the-authors-pov.jpg"}
              />
            ))}
        </div>
      </div>
    </section>
  );
};

export default CompletedStoriesSection;
