import { Suspense, useCallback, useEffect, useState } from "react";
import RecentNovelItem from "./RecentNovelItem";
import axiosInstance from "../../axios";
import notify from "../../utils/toastUtil";
import Spinner from "../Spinner";

const RecentlyAddedChapteresSection = () => {
  const [recentNovels, setRecentNovels] = useState([]);

  const getRecentNovels = useCallback(async () => {
    try {
      const response = await axiosInstance.get(
        "/novels?limit=24&status=All&sortBy=Updates"
      );
      if (response && response.data) {
        setRecentNovels(response.data.novels);
      }
    } catch (error) {
      console.error("Error fetching compnovels:", error);
      notify("error", "Something went wrong!");
    }
  }, []);

  useEffect(() => {
    getRecentNovels();
  }, [getRecentNovels]);

  return (
    <section className="container vspace recent-chap">
      <div className="section-header ">
        <h3>Recently Added Chapters</h3>
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
          {recentNovels.map(novel => (
            <Suspense fallback={<Spinner />} key={novel.title}>
              <RecentNovelItem key={novel._id} novel={novel} />
            </Suspense>
          ))}
        </div>
      </div>
    </section>
  );
};

export default RecentlyAddedChapteresSection;
