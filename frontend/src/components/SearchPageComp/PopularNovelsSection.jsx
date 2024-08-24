import SearchNovelItem from "./SearchNovelItem";
import "../../styles/SearchPageStyles.css";
import { memo, useEffect, useState } from "react";
import axiosInstance from "../../axios";
import notify from "../../utils/toastUtil";
import Skeleton from "react-loading-skeleton";

const PopularNovelsSection = () => {
  const [popNovels, setPopNovels] = useState([]);
  const [loading, setLoading] = useState(true);

  const getPopularNovels = async () => {
    try {
      setLoading(true);
      const response = await axiosInstance.get(`/novels?limit=10&orderBy=Rank`);
      if (response && response.data) {
        setPopNovels(response.data.novels);
      }
    } catch (error) {
      notify("error", "Something went wrong!");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getPopularNovels();
  }, []);

  return (
    <section className="popular-novels">
      <h2>Some Popular Novels</h2>
      {loading && (
        <>
          <Skeleton count={5} height={"150px"} />
          <Skeleton count={5} height={"150px"} />
        </>
      )}
      <ul className="novel-list">
        {popNovels.map((novel, i) => (
          <SearchNovelItem key={novel._id} novel={novel} />
        ))}
      </ul>
    </section>
  );
};

export default memo(PopularNovelsSection);
