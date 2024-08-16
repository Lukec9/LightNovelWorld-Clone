import { lazy, Suspense, useCallback, useEffect, useState } from "react";
import axiosInstance from "../../axios";
import notify from "../../utils/toastUtil";

const UpdatesNovelItem = lazy(() => import("./UpdatesNovelItem"));

const UpdatesSection = () => {
  const [recentChapNovels, setRecentChapNovels] = useState([]);

  const getRecentChapNovels = useCallback(async () => {
    try {
      const response = await axiosInstance.get(
        "/novels?limit=40&status=All&sortBy=Updates"
      );
      if (response && response.data) {
        setRecentChapNovels(response.data.novels);
      }
    } catch (error) {
      notify("error", "Something went wrong!");
    }
  }, []);

  useEffect(() => {
    getRecentChapNovels();
  }, []);

  return (
    <section className="recent-chap">
      <div className="section-header ">
        <h1>Recently Added Chapters</h1>
        <p>
          The new novel chapters list is based on original or translated novel
          chapters published in the last few days. You can follow new episodes
          of the most popular light novels on our platform.
        </p>
      </div>{" "}
      <div className="section-body">
        <div className="novel-list">
          {recentChapNovels.map((novel, i) => (
            <Suspense key={i}>
              <UpdatesNovelItem key={novel._id} novel={novel} />
            </Suspense>
          ))}
        </div>
      </div>
    </section>
  );
};

export default UpdatesSection;
