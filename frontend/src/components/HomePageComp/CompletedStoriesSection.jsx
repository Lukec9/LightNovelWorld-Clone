import React, { useCallback, useEffect, useState } from "react";
import NovelItem from "./NovelItem";
import axiosInstance from "../../axios";
import notify from "../../utils/toastUtil";
import { toast } from "react-toastify";

const CompletedStoriesSection = () => {
  const [compNovels, setCompNovels] = useState([]);

  const getCompNovels = useCallback(async () => {
    try {
      const response = await axiosInstance.get(
        "/novels?limit=12&status=Ongoing"
      );
      if (response && response.data) {
        setCompNovels(response.data.novels);
      }
    } catch (error) {
      console.error("Error fetching compnovels:", error);
      notify("error", "Something went wrong!");
    }
  }, []);

  useEffect(() => {
    getCompNovels();
  }, [getCompNovels]);

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
          {compNovels.map(novel => (
            <NovelItem key={novel._id} novel={novel} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default CompletedStoriesSection;
