import { lazy, Suspense, useCallback, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import CategoryBtn from "../components/BrowsePageComp/CategoryBtn";
import "../styles/BrowsePageStyles.css";

import Pagination from "../components/BrowsePageComp/Pagination";
import Spinner from "../components/Spinner";
import axiosInstance from "../axios";
import notify from "../utils/toastUtil";

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
  const navigate = useNavigate(); // Use this to update URL without reloading
  const [pagination, setPagination] = useState(null);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true); // Set true initially to show spinner

  // Function to parse query parameters
  const getQueryParams = () => {
    const params = new URLSearchParams(location.search);
    const category = params.get("category") || "All";
    const order = params.get("sortBy") || "New";
    const status = params.get("status") || "All";
    const pageParam = parseInt(params.get("page")) || 1;

    return { category, order, status, page: pageParam };
  };

  const updateURLParams = newParams => {
    const searchParams = new URLSearchParams(location.search);
    Object.keys(newParams).forEach(key => {
      searchParams.set(key, newParams[key]);
    });
    navigate({ search: searchParams.toString() }, { replace: true });
  };

  const getBrowseNovels = useCallback(async () => {
    setLoading(true);
    try {
      const response = await axiosInstance.get(`/novels`, {
        params: {
          status: activeCategory.status,
          sortBy: activeCategory.order,
          category: activeCategory.category,
          page,
          limit: 5, // Set limit to whatever number you need
        },
      });
      if (response && response.data) {
        setBrowseNovels(response.data.novels);
        setPagination(response.data.pagination);
      }
    } catch (error) {
      notify("error", "Something went wrong!");
    } finally {
      setLoading(false);
    }
  }, [activeCategory, page]);

  useEffect(() => {
    const queryParams = getQueryParams();
    setActiveCategory({
      category: queryParams.category,
      order: queryParams.order,
      status: queryParams.status,
    });
    setPage(queryParams.page);
  }, [location.search]);

  useEffect(() => {
    getBrowseNovels();
  }, [getBrowseNovels]);

  const handleCategoryChange = newCategory => {
    setActiveCategory(prev => ({ ...prev, category: newCategory }));
    setPage(1);
    updateURLParams({ category: newCategory, page: 1 });
  };

  const handleOrderChange = newOrder => {
    setActiveCategory(prev => ({ ...prev, order: newOrder }));
    setPage(1);
    updateURLParams({ sortBy: newOrder, page: 1 });
  };

  const handleStatusChange = newStatus => {
    setActiveCategory(prev => ({ ...prev, status: newStatus }));
    setPage(1);
    updateURLParams({ status: newStatus, page: 1 });
  };

  // if (loading) return <Spinner />;
  if (!browseNovels && !loading)
    return <Link to="/">Couldn't get novels, try refreshing the page</Link>;

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
                  onClick={() => handleCategoryChange(genre)}
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
                    onClick={() => handleOrderChange(filt)}
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
                    onClick={() => handleStatusChange(filt)}
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
        {loading && <Spinner />}
        {browseNovels && !loading && (
          <>
            <ul className="novel-list">
              {browseNovels.map((novel, i) => (
                <Suspense key={i} fallback={<Spinner />}>
                  <BrowseNovelItem novel={novel} key={novel._id} />
                </Suspense>
              ))}
            </ul>
            <Pagination
              pagination={pagination}
              setPage={newPage => {
                setPage(newPage);
                updateURLParams({ page: newPage });
              }}
            />
          </>
        )}
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
