import React from "react";
import NovelItem from "./NovelItem";

const WeeklyMostActiveSection = () => {
  return (
    <section className="container vspace weekly">
      <div className="section-header">
        <h3>Weekly Most Active</h3>
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
                title={"Steward demonic emperor"}
                rank={i + 1}
                chapters={"1000"}
                img={"assets/00892-the-steward-demonic-emperor.jpg"}
              />
            ))}
        </div>
      </div>
    </section>
  );
};

export default WeeklyMostActiveSection;
