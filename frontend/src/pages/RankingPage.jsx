import { lazy, Suspense, useEffect, useState } from "react";
import Spinner from "../components/Spinner";
import axiosInstance from "../axios";
import notify from "../utils/toastUtil";
import { useOutletContext } from "react-router-dom";
const RankingPageNovelItem = lazy(() =>
  import("../components/RankingPageComp/RankingPageNovelItem")
);

const RankingPage = () => {
  const [rankingNovels, setRankingNovels] = useState([]);
  const { activeFilter } = useOutletContext();

  const getRankingPageNovels = async () => {
    try {
      const response = await axiosInstance.get(
        `/novels/rankingspage?sortBy=${activeFilter}`
      );
      if (response && response.data) {
        setRankingNovels(response.data.novels);
      }
    } catch (error) {
      console.error("Error fetching novels:", error?.response?.data);
      notify("error", "Something went wrong!");
    }
  };

  useEffect(() => {
    getRankingPageNovels();
  }, [activeFilter]);

  return (
    <div className="ranking-body">
      <ul className="rank-novels">
        {rankingNovels.map((novel, i) => (
          <Suspense key={i} fallback={<Spinner />}>
            <RankingPageNovelItem key={novel._id} novel={novel} />
          </Suspense>
        ))}
      </ul>
    </div>
  );
};

export default RankingPage;
