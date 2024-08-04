import { useState } from "react";
import CategoryBtn from "../components/BrowsePageComp/CategoryBtn";
import "../styles/BrowsePageStyles.css";
import RankingNovelItem from "../components/HomePageComp/RankingNovelItem";
import Pagination from "../components/BrowsePageComp/Pagination";

const BrowsePage = () => {
  const [activeCategory, setActiveCategory] = useState({
    category: null,
    order: null,
    status: null,
  });
  return (
    <div className="explore">
      <div className="container">
        <div className="action-panel">
          <h4 className="title">Genre / Category</h4>
          <div className="category-list">
            <ul className="action-list">
              {genres.map((genre, i) => (
                <CategoryBtn
                  key={i}
                  isActive={activeCategory.category === genre}
                  onClick={() =>
                    setActiveCategory(prevState => ({
                      ...prevState,
                      category: genre,
                    }))
                  }
                  category={genre}
                />
              ))}
            </ul>
          </div>
          <div className="filters">
            <div className="order-by">
              <h4 className="title">Order by</h4>
              <ul className="action-list">
                {["New", "Popular", "Updates"].map((filt, i) => (
                  <CategoryBtn
                    key={i}
                    isActive={activeCategory.order === filt}
                    onClick={() =>
                      setActiveCategory(prevState => ({
                        ...prevState,
                        order: filt,
                      }))
                    }
                    category={filt}
                  />
                ))}
              </ul>
            </div>
            <div className="status">
              <h4 className="title">Status</h4>
              <ul className="action-list">
                {["All", "Completed", "Ongoing"].map((filt, i) => (
                  <CategoryBtn
                    key={i}
                    isActive={activeCategory.status === filt}
                    onClick={() =>
                      setActiveCategory(prevState => ({
                        ...prevState,
                        status: filt,
                      }))
                    }
                    category={filt}
                  />
                ))}
              </ul>
            </div>
          </div>
        </div>
        <div className="action-header">
          <h1>
            Explore The Recently Added{" "}
            {activeCategory.category === "All" ? "" : activeCategory.category}{" "}
            Light Novels
          </h1>
        </div>
        <ul className="novel-list">
          {Array(15)
            .fill(null)
            .map((_, i) => (
              <RankingNovelItem
                lastChapter={"2 days ago"}
                key={i}
                title={"Infinite Mana In The Apocalypse"}
                img={"/assets/00732-infinite-mana-in-the-apocalypse-novel.jpg"}
              />
            ))}
        </ul>
        <Pagination />
      </div>
    </div>
  );
};

const genres = [
  "All",
  "Action",
  "Adventure",
  "Drama",
  "Fantasy",
  "Harem",
  "Martial Arts",
  "Mature",
  "Romance",
  "Tragedy",
  "Xuanhuan",
  "Ecchi",
  "Comedy",
  "Slice of Life",
  "Mystery",
  "Supernatural",
  "Psychological",
  "Sci-fi",
  "Xianxia",
  "School Life",
  "Josei",
  "Wuxia",
  "Shounen",
  "Horror",
  "Mecha",
  "Historical",
  "Shoujo",
  "Adult",
  "Seinen",
  "Sports",
  "Lolicon",
  "Gender Bender",
  "Shounen Ai",
  "Yaoi",
  "Video Games",
  "Smut",
  "Magical Realism",
  "Eastern Fantasy",
  "Contemporary Romance",
  "Fantasy Romance",
  "Shoujo Ai",
  "Yuri",
];

export default BrowsePage;
