import React, { memo, useCallback, useEffect, useState } from "react";
import NovelItem from "./NovelItem";
import axiosInstance from "../../axios";
import notify from "../../utils/toastUtil";
import { toast } from "react-toastify";
import Skeleton from "react-loading-skeleton";
import { Link } from "react-router-dom";

const CompletedStoriesSection = () => {
  const [compNovels, setCompNovels] = useState([]);
  const [loading, setLoading] = useState(true);

  const getCompNovels = useCallback(async () => {
    setLoading(true);
    try {
      const response = await axiosInstance.get(
        "/novels?limit=12&status=Completed"
      );
      if (response && response.data) {
        setCompNovels(response.data.novels);
      }
    } catch (error) {
      notify("error", "Something went wrong!");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    getCompNovels();
  }, [getCompNovels]);

  return (
    <section className="container vspace">
      {loading && <Skeleton height={"150px"} count={6} />}
      <div className="section-header">
        <h3>Completed Stories</h3>
        <Link
          className="getmorebtn"
          title="Most recently added light novels"
          to="/browse?status=Completed"
        >
          View More
        </Link>
      </div>{" "}
      <div className="section-body">
        <div className="novel-list">
          {compNovels.map(novel => (
            <NovelItem key={novel._id} novel={novel} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default memo(CompletedStoriesSection);
