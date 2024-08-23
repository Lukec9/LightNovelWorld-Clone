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
            <Item name={"Comments"} value={cstats.totalComments || 0} />
            <Item name={"Likes"} value={cstats.totalLikes || 0} />
            <Item name={"Dislikes"} value={cstats.totalDislikes || 0} />
          </>
        )}
        {rstats && (
          <>
            <Item name={"Reviews"} value={rstats.totalReviews || 0} />
            <Item name={"Likes"} value={rstats.totalLikes || 0} />
            <Item name={"Dislikes"} value={rstats.totalDislikes || 0} />
          </>
        )}
        {nstats && (
          <>
            <Item name={"Bookmarked"} value={nstats.bookmarkedNovels || 0} />
            <Item name={"Novels Read"} value={nstats.novelsRead || 0} />
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
