import { Outlet, useLocation } from "react-router-dom";
import "../../styles/RankingPage.css";
import RankingFilter from "../RankingPageComp/RankingFilter";
import { useEffect, useState } from "react";

const RankingLayout = () => {
  const [activeFilter, setActiveFilter] = useState("");
  const location = useLocation();
  const path = location.pathname;

  useEffect(() => {
    const currentFilter = filters.find(
      filter =>
        path === `/ranking/${filter.title.toLowerCase()}` ||
        (filter.title === "Ranking" && path === "/ranking")
    );
    if (currentFilter) {
      setActiveFilter(currentFilter.title);
    }
  }, [path]);

  const getContent = () => {
    switch (activeFilter) {
      case "Ranking":
        return {
          header: "Novel  Ranking",
          paragraph:
            "The ranking is based on the combination of increasing reads of a book and the average user rating score.",
        };
      case "Rating":
        return {
          header: "Top Rated",
          paragraph:
            "The best-rated ranking is based on the average review score of a book as a result of user-written reviews. Ranking was applied among the novels that received a minimum of 50 reviews.",
        };
      case "Reads":
        return {
          header: "Most Read",
          paragraph:
            "The ranking of the most read novels is based on the number of times a novel and its chapters have been read by users. It is based on the number of reads obtained in the last 1 month.",
        };
      case "Reviews":
        return {
          header: "Most Reviewed",
          paragraph:
            "The ranking of the novels with the most reviews is based on the total number of reviews written by users of a novel.",
        };
      case "Comments":
        return {
          header: "Most Commented",
          paragraph:
            "The ranking is based on the total number of comments written by users of a novel.",
        };
      case "Collections":
        return {
          header: "The novels most added to the library",
          paragraph:
            "The ranking is based on the number of readers who add a book to the library.",
        };
      default:
        return {
          header: "Novel Ranking",
          paragraph:
            "The ranking is based on the combination of increasing reads of a book and the average user rating score.",
        };
    }
  };

  const { header, paragraph } = getContent();
  return (
    <div className="ranking-page">
      <div className="container">
        <div>
          <div className="ranking-filt">
            <ul>
              {filters.map((filter, i) => (
                <RankingFilter
                  key={i}
                  isActive={activeFilter === filter.title}
                  title={filter.title}
                  desc={filter.desc}
                />
              ))}
            </ul>
          </div>
          <div className="ranking-info">
            <h1>{header}</h1>
            <p>{paragraph}</p>
          </div>
        </div>
        <Outlet />
      </div>
    </div>
  );
};

const filters = [
  { title: "Ranking", desc: "Overall ranking" },
  { title: "Rating", desc: "Users' votes" },
  { title: "Reads", desc: "Chapter visits" },
  { title: "Reviews", desc: "User opinions" },
  { title: "Comments", desc: "Discussion" },
  { title: "Collections", desc: "In Library" },
];

export default RankingLayout;
