import React from "react";

const StatGroup = ({ cstats, rstats, nstats, kstats }) => {
  return (
    <div className="stat-group">
      <div className="stat-title">
        {cstats && "Comment Stats"}
        {rstats && "Review Stats"}
        {nstats && "Novel Stats"}
        {kstats && "Karma Stats"}
      </div>
      <div className="stat-items">
        {cstats && (
          <>
            <Item name={"Comments"} value={cstats.totalComments} />
            <Item name={"Likes"} value={cstats.totalLikes} />
            <Item name={"Dislikes"} value={cstats.totalDislikes} />
          </>
        )}
        {rstats && (
          <>
            <Item name={"Reviews"} value={rstats.totalReviews} />
            <Item name={"Likes"} value={rstats.totalLikes} />
            <Item name={"Dislikes"} value={rstats.totalDislikes} />
          </>
        )}
        {nstats && (
          <>
            <Item name={"Bookmarked"} value={nstats.bookmarkedNovels} />
            <Item name={"Novels Read"} value={nstats.novelsRead} />
          </>
        )}
        {kstats?.map((stat, i) => (
          <Item key={i} name={stat.name} value={stat.value} />
        ))}
      </div>
    </div>
  );
};

const Item = ({ name, value }) => {
  return (
    <div className="item">
      <div className="stat-name">{name}</div>
      <div className="stat-value">{value}</div>
    </div>
  );
};

export default StatGroup;
