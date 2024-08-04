import { lazy, Suspense } from "react";
import Spinner from "../components/Spinner";
const RankingPageNovelItem = lazy(() =>
  import("../components/RankingPageComp/RankingPageNovelItem")
);

const RankingPage = () => {
  return (
    <div className="ranking-body">
      <ul className="rank-novels">
        {Array(100)
          .fill(null)
          .map((_, i) => (
            <Suspense key={i} fallback={<Spinner />}>
              <RankingPageNovelItem
                key={i}
                title="Martial World"
                img={"/assets/00220-martial-world-webnovel.jpg"}
              />
            </Suspense>
          ))}
      </ul>
    </div>
  );
};

export default RankingPage;
