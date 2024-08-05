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
        {cstats?.map((stat, i) => (
          <Item key={i} name={stat.name} value={stat.value} />
        ))}
        {rstats?.map((stat, i) => (
          <Item key={i} name={stat.name} value={stat.value} />
        ))}
        {nstats?.map((stat, i) => (
          <Item key={i} name={stat.name} value={stat.value} />
        ))}
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
