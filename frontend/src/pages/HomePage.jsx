import { lazy, Suspense } from "react";
import "../styles/HomePageStyles.css";
import Spinner from "../components/Spinner";
const CompletedStoriesSection = lazy(() =>
  import("../components/HomePageComp/CompletedStoriesSection")
);
const NewNovelSection = lazy(() =>
  import("../components/HomePageComp/NewNovelSection")
);
const NovelRankingSection = lazy(() =>
  import("../components/HomePageComp/NovelRankingSection")
);
const RecentlyAddedChaptersSection = lazy(() =>
  import("../components/HomePageComp/RecentlyAddedChaptersSection")
);
const WeeklyMostActiveSection = lazy(() =>
  import("../components/HomePageComp/WeeklyMostActiveSection")
);
const HomePage = () => {
  return (
    <div className="home-container">
      <section className="container home-head">
        <div
          className="background"
          style={{
            backgroundImage: `url("/assets/lnw-slider-banner-bg6.jpg")`,
          }}
        ></div>
        <div className="head-content">
          <h1>
            Read Light Novel &amp; Web Novel Translations Online For FREE!
          </h1>
          <h2>
            <i>Your fictional stories hub</i>
          </h2>
          <div className="description">
            <p>Looking for a great place to read Light Novels?</p>
            <p>
              Light Novel World is a very special platform where you can read
              the translated versions of world famous Japanese, Chinese and
              Korean light novels in English. Every new chapters published by
              the author is updated instantly on the Light Novel World and
              notification service is provided to the readers.
            </p>
            <p>Start reading now to explore this mysterious fantasy world.</p>
          </div>
        </div>
      </section>
      <Suspense fallback={<Spinner />}>
        <CompletedStoriesSection />
      </Suspense>
      <Suspense fallback={<Spinner />}>
        <NewNovelSection />
      </Suspense>
      <Suspense fallback={<Spinner />}>
        <NovelRankingSection />
      </Suspense>
      <Suspense fallback={<Spinner />}>
        <RecentlyAddedChaptersSection />
      </Suspense>
      <Suspense fallback={<Spinner />}>
        <WeeklyMostActiveSection />
      </Suspense>
    </div>
  );
};

export default HomePage;
