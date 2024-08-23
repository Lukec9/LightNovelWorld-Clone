import { memo, Suspense, useCallback, useEffect, useState } from "react";
import NovelItem from "./NovelItem";
import axiosInstance from "../../axios";
import Spinner from "../Spinner";
import notify from "../../utils/toastUtil";
import Skeleton from "react-loading-skeleton";

const NewNovelSection = () => {
  const [newNovels, setNewNovels] = useState([]);
  const [loading, setLoading] = useState(true);

  const getNewNovels = useCallback(async () => {
    setLoading(true);
    try {
      const response = await axiosInstance.get(
        "/novels?limit=12&status=Ongoing&sortBy=New"
      );
      if (response && response.data) {
        setNewNovels(response.data.novels);
      }
    } catch (error) {
      notify("error", "Something went wrong!");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    getNewNovels();
  }, [getNewNovels]);

  return (
    <section className="container vspace">
      {loading && <Skeleton height={"150px"} count={6} />}
      <div className="section-header">
        <h3>New Ongoing Release</h3>
        <a
          className="getmorebtn"
          title="Most recently added light novels"
          href="/browse/genre-all-25060123/order-new/status-all"
        >
          View More
        </a>
      </div>
      <div className="section-body">
        <ul className="novel-list">
          {newNovels.map((novel, i) => (
            <Suspense fallback={<Spinner />} key={i}>
              <NovelItem key={novel._id} novel={novel} />
            </Suspense>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default memo(NewNovelSection);
