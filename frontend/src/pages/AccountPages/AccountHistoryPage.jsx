import { lazy, Suspense } from "react";

import "../../styles/AccountPages/AccountHistoryPageStyles.css";
import Spinner from "../../components/Spinner";
const HistoryNovelCard = lazy(() =>
  import("../../components/AccountPagesComp/HistoryNovelCard")
);

const AccountHistoryPage = () => {
  return (
    <div className="user-panel-body">
      <div className="user-panel-section">
        <div className="account-container-box">
          <section className="history-container">
            <div className="user-panel-header">
              <h3>The books you read most</h3>
              <p>You can only see the last 20 of the novels you have read</p>
            </div>
            <ul className="novel-header">
              <li className="h-title">Novel Title</li>
              <li className="h-prog">Progress</li>
              <li className="h-status">Last Read</li>
            </ul>

            <div className="novel-table">
              {novels.map((n, i) => (
                <Suspense key={i} fallback={<Spinner />}>
                  <HistoryNovelCard
                    title={n.title}
                    cover={n.cover}
                    progress={n.progress}
                    key={i}
                  />
                </Suspense>
              ))}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

const novels = [
  {
    cover: "/assets/00892-the-steward-demonic-emperor.jpg",
    title: "The Steward Demonic Emperor",
    progress: {
      current: 874,
      total: 997,
      percentage: "87.7%",
    },
  },
  {
    cover: "/assets/01296-grand-ancestral-bloodlines.jpg",
    title: "Grand Ancestral Bloodlines",
    progress: {
      current: 1276,
      total: 1273,
      percentage: "100.2%",
    },
  },
  {
    cover: "/assets/01511-ascension-of-the-immortal-asura.jpg",
    title: "Ascension of the Immortal Asura",
    progress: {
      current: 920,
      total: 984,
      percentage: "93.5%",
    },
  },
  {
    cover: "/assets/00732-infinite-mana-in-the-apocalypse-novel.jpg",
    title: "Infinite Mana In The Apocalypse",
    progress: {
      current: 2357,
      total: 2357,
      percentage: "100.0%",
    },
  },
  {
    cover: "/assets/01132-supremacy-games.jpg",
    title: "Supremacy Games",
    progress: {
      current: 1398,
      total: 1398,
      percentage: "100.0%",
    },
  },
  {
    cover: "/assets/00172-reverend-insanity.jpg",
    title: "Reverend Insanity",
    progress: {
      current: 98,
      total: 2334,
      percentage: "4.2%",
    },
  },
  {
    cover: "/assets/00224-the-desolate-era-web-novel.jpg",
    title: "The Desolate Era",
    progress: {
      current: 573,
      total: 1451,
      percentage: "39.5%",
    },
  },
  {
    cover: "/assets/00265-omniscient-readers-viewpoint-novel.jpg",
    title: "Omniscient Reader's Viewpoint",
    progress: {
      current: "Reading is complete",
      total: "Reading is complete",
      percentage: "Reading is complete",
    },
  },
  {
    cover: "/assets/00220-martial-world-webnovel.jpg",
    title: "Martial World",
    progress: {
      current: "Reading is complete",
      total: "Reading is complete",
      percentage: "Reading is complete",
    },
  },
  {
    cover: "/assets/00072-true-martial-world.jpg",
    title: "True Martial World",
    progress: {
      current: 1256,
      total: 1710,
      percentage: "73.5%",
    },
  },
  {
    cover: "/assets/00089-wujie-whushi-wmw.jpg",
    title: "Warlock of the Magus World",
    progress: {
      current: 573,
      total: 1451,
      percentage: "3.8%",
    },
  },
];

export default AccountHistoryPage;
