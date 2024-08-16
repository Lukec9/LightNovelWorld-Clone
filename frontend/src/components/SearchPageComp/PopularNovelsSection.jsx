import SearchNovelItem from "./SearchNovelItem";
import "../../styles/SearchPageStyles.css";
import { useEffect, useState } from "react";
import axiosInstance from "../../axios";
import notify from "../../utils/toastUtil";

const PopularNovelsSection = () => {
  const [popNovels, setPopNovels] = useState([]);

  const getPopularNovels = async () => {
    try {
      const response = await axiosInstance.get(`/novels?limit=10&orderBy=Rank`);
      if (response && response.data) {
        setPopNovels(response.data.novels);
      }
    } catch (error) {
      console.error("Error fetching novels:", error?.response?.data);
      notify("error", "Something went wrong!");
    }
  };

  useEffect(() => {
    getPopularNovels();
  }, []);

  return (
    <section className="popular-novels">
      <h2>Some Popular Novels</h2>
      <ul className="novel-list">
        {popNovels.map((novel, i) => (
          <SearchNovelItem key={novel._id} novel={novel} />
        ))}
      </ul>
    </section>
  );
};

export default PopularNovelsSection;
