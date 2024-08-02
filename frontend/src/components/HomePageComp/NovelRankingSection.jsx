import React from "react";
import RankingNovelItem from "./RankingNovelItem";

const NovelRankingSection = () => {
  return (
    <section className="container vspace">
      <div className="section-header">
        <h3>Ranking</h3>
        <a
          className="getmorebtn"
          title="Top Rated Light Novels"
          href="/ranking-29071230"
        >
          View More
        </a>
      </div>
      <div className="section-body">
        <div className="ranking">
          <input
            type="radio"
            name="ranktabs"
            defaultChecked="true"
            id="tab_most_read"
          />
          <label htmlFor="tab_most_read">Most Read</label>
          <input type="radio" name="ranktabs" id="tab_new_trends" />
          <label htmlFor="tab_new_trends">New Trends</label>
          <input type="radio" name="ranktabs" id="tab_user_rated" />
          <label htmlFor="tab_user_rated">User Rated</label>
          <div className="ranking-container">
            <h3>
              <span>Most read</span>
            </h3>
            <ul>
              {Array(10)
                .fill(null)
                .map((_, i) => (
                  <RankingNovelItem
                    key={i}
                    title={"Steward demonic emperor"}
                    rank={"1"}
                    chapters={"1000"}
                    img={"assets/01296-grand-ancestral-bloodlines.jpg"}
                  />
                ))}
            </ul>
          </div>
          <div className="ranking-container">
            <h3>
              <span>New Trends</span>
            </h3>
            <ul>
              {Array(10)
                .fill(null)
                .map((_, i) => (
                  <RankingNovelItem
                    key={i}
                    title={"Steward demonic emperor"}
                    rank={"1"}
                    chapters={"1000"}
                    newTrends={true}
                    img={"assets/01132-supremacy-games.jpg"}
                  />
                ))}
            </ul>
          </div>
          <div className="ranking-container">
            <h3>
              <span>User Rated</span>
            </h3>
            <ul>
              {Array(10)
                .fill(null)
                .map((_, i) => (
                  <RankingNovelItem
                    key={i}
                    title={"Steward demonic emperor"}
                    rank={"1"}
                    chapters={"1000"}
                    img={
                      "/assets/00732-infinite-mana-in-the-apocalypse-novel.jpg"
                    }
                    userRated={true}
                  />
                ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default NovelRankingSection;
