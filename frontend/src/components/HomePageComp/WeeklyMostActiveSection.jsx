import { memo, useCallback, useEffect, useState } from "react";
import NovelItem from "./NovelItem";
import axiosInstance from "../../axios";
import notify from "../../utils/toastUtil";
import Skeleton from "react-loading-skeleton";
import { Link } from "react-router-dom";

const WeeklyMostActiveSection = () => {
  const [weeklyNovels, setWeeklyNovels] = useState([]);
  const [loading, setLoading] = useState(true);

  const getWeeklyNovels = useCallback(async () => {
    setLoading(true);
    try {
      const response = await axiosInstance.get(
        "/novels?limit=12&status=All&sortBy=Popular"
      );
      if (response && response.data) {
        setWeeklyNovels(response.data.novels);
      }
    } catch (error) {
      notify("error", "Something went wrong!");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    getWeeklyNovels();
  }, [getWeeklyNovels]);

  return (
    <section className="container vspace weekly">
      {loading && <Skeleton height={"150px"} count={6} />}
      <div className="section-header">
        <h3>Weekly Most Active</h3>
        <Link
          className="getmorebtn"
          title="Most recently added light novels"
          to="/browse"
        >
          View More
        </Link>
      </div>{" "}
      <div className="section-body">
        <div className="novel-list">
          {weeklyNovels.map(novel => (
            <NovelItem key={novel._id} novel={novel} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default memo(WeeklyMostActiveSection);
