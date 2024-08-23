import { memo, Suspense, useCallback, useEffect, useState } from "react";
import RecentNovelItem from "./RecentNovelItem";
import axiosInstance from "../../axios";
import notify from "../../utils/toastUtil";
import Spinner from "../Spinner";
import Skeleton from "react-loading-skeleton";

const RecentlyAddedChapteresSection = () => {
  const [recentNovels, setRecentNovels] = useState([]);
  const [loading, setLoading] = useState(true);

  const getRecentNovels = useCallback(async () => {
    setLoading(true);
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
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    getRecentNovels();
  }, [getRecentNovels]);

  return (
    <section className="container vspace recent-chap">
      {loading && (
        <Skeleton height={"50px"} containerClassName="vertloading" count={6} />
      )}
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

export default memo(RecentlyAddedChapteresSection);
