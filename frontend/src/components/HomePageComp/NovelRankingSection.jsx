import { useCallback, useEffect, useState } from "react";
import RankingNovelItem from "./RankingNovelItem";
import notify from "../../utils/toastUtil";
import axiosInstance from "../../axios";

const NovelRankingSection = () => {
  const [mostRead, setMostReadNovels] = useState([]);
  const [newTrends, setNewTrendNovels] = useState([]);
  const [userRated, setUserRatedNovels] = useState([]);

  const getRankings = useCallback(async () => {
    try {
      const response = await axiosInstance.get("/novels/rankings");
      if (response && response.data) {
        setMostReadNovels(response.data.topByViews);
        setNewTrendNovels(response.data.topByComments);
        setUserRatedNovels(response.data.topByRatings);
      }
    } catch (error) {
      console.error("Error fetching compnovels:", error);
      notify("error", "Something went wrong!");
    }
  }, []);

  useEffect(() => {
    getRankings();
  }, [getRankings]);

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
              {mostRead.map((novel, i) => (
                <RankingNovelItem key={novel._id} novel={novel} />
              ))}
            </ul>
          </div>
          <div className="ranking-container">
            <h3>
              <span>New Trends</span>
            </h3>
            <ul>
              {newTrends.map((novel, i) => (
                <RankingNovelItem
                  key={novel._id}
                  newTrends={true}
                  novel={novel}
                />
              ))}
            </ul>
          </div>
          <div className="ranking-container">
            <h3>
              <span>User Rated</span>
            </h3>
            <ul>
              {userRated.map(novel => (
                <RankingNovelItem
                  key={novel._id}
                  novel={novel}
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
