import { lazy, Suspense, useEffect, useState } from "react";
import CategoryBtn from "../components/BrowsePageComp/CategoryBtn";
import "../styles/BrowsePageStyles.css";

import Pagination from "../components/BrowsePageComp/Pagination";
import Spinner from "../components/Spinner";
import axiosInstance from "../axios";
import notify from "../utils/toastUtil";
import { useLocation } from "react-router-dom";
const BrowseNovelItem = lazy(() =>
  import("../components/BrowsePageComp/BrowseNovelItem")
);

const BrowsePage = () => {
  const [browseNovels, setBrowseNovels] = useState([]);
  const [activeCategory, setActiveCategory] = useState({
    category: "All",
    order: "New",
    status: "All",
  });
  const location = useLocation();

  // Function to parse query parameters
  const getQueryParams = () => {
    const params = new URLSearchParams(location.search);
    const category = params.get("category") || "All";
    const order = params.get("sortBy") || "New";
    const status = params.get("status") || "All";

    return { category, order, status };
  };

  const getBrowseNovels = async () => {
    try {
      const response = await axiosInstance.get(
        `/novels?limit=15&status=${activeCategory.status}&sortBy=${activeCategory.order}&category=${activeCategory.category}`
      );
      if (response && response.data) {
        setBrowseNovels(response.data.novels);
      }
    } catch (error) {
      console.error("Error fetching novels:", error);
      notify("error", "Something went wrong!");
    }
  };

  useEffect(() => {
    const queryParams = getQueryParams();
    setActiveCategory(queryParams);
  }, [location.search]);

  useEffect(() => {
    getBrowseNovels();
  }, [activeCategory]);

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
            {activeCategory.order === "Popular" && "Explore The Most Popular "}
            {activeCategory.order === "Updates" &&
              "Explore The Recently Updated "}
            {activeCategory.order === "New" && "Explore The Recently Added"}
            {activeCategory.category === "All"
              ? ""
              : ` ${activeCategory.category}`}
            {"  "}
            Light Novels
            {activeCategory.status === "Completed" &&
              " (Translation Completed)"}
            {activeCategory.status === "Ongoing" && " (Translation Ongoing)"}
          </h1>
        </div>
        <ul className="novel-list">
          {browseNovels.map((novel, i) => (
            <Suspense key={i} fallback={<Spinner />}>
              <BrowseNovelItem novel={novel} key={novel._id} />
            </Suspense>
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
