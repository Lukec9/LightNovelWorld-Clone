import CompletedStoriesSection from "../components/HomePageComp/CompletedStoriesSection";
import NewNovelSection from "../components/HomePageComp/NewNovelSection";
import NovelRankingSection from "../components/HomePageComp/NovelRankingSection";
import RecentlyAddedChapteresSection from "../components/HomePageComp/RecentlyAddedChaptersSection";
import WeeklyMostActiveSection from "../components/HomePageComp/WeeklyMostActiveSection";
import "../styles/HomePageStyles.css";
const HomePage = () => {
  return (
    <div className="home-container">
      <section className="container home-head">
        <div
          className="background"
          style={{
            backgroundImage: `url("assets/lnw-slider-banner-bg6.jpg")`,
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
      <NewNovelSection />
      <NovelRankingSection />
      <WeeklyMostActiveSection />
      <CompletedStoriesSection />
      <RecentlyAddedChapteresSection />
    </div>
  );
};

export default HomePage;
