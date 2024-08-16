import { lazy, Suspense, useEffect, useState } from "react";
import Spinner from "../components/Spinner";
import axiosInstance from "../axios";
import notify from "../utils/toastUtil";
import SearchResItem from "../components/SearchPageComp/SearchResItem";

const PopularNovelsSection = lazy(() =>
  import("../components/SearchPageComp/PopularNovelsSection")
);

const SearchPage = () => {
  const [searchNovels, setSearchNovels] = useState([]);
  const [search, setSearch] = useState("");

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      const response = await axiosInstance.get(
        `/novels/search?search=${search}`
      );
      setSearchNovels(response.data.novels);
    } catch (error) {
      if (error.response.data.errors) {
        error.response.data.errors.map((err, i) => notify("error", err));
      } else {
        notify("error", error.response?.data);
      }
    }
  };
  return (
    <div className="container">
      <div className="search-container">
        <form className="novel-search-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="search_label" htmlFor="search">
              <svg
                width={16}
                height={16}
                viewBox="0 0 16 16"
                className="styles_icon__3eEqS dib vam pa_auto _no_color"
              >
                <path
                  d="M7.153 12.307A5.153 5.153 0 107.153 2a5.153 5.153 0 000 10.307zm5.716-.852l2.838 2.838a1 1 0 01-1.414 1.414l-2.838-2.838a7.153 7.153 0 111.414-1.414z"
                  fill="#C0C2CC"
                  fillRule="nonzero"
                />
              </svg>
            </label>
            <input
              type="search"
              placeholder="Search Light Novel By Title"
              aria-label="Novel Search"
              value={search}
              onChange={e => setSearch(e.target.value)}
            />
          </div>
        </form>
        <section className="search-results recent-chap">
          <ul className="novel-list">
            {searchNovels &&
              searchNovels.map((novel, i) => (
                <SearchResItem key={novel._id} novel={novel} />
              ))}
          </ul>
        </section>
        <Suspense fallback={<Spinner />}>
          <PopularNovelsSection />
        </Suspense>
      </div>
    </div>
  );
};

export default SearchPage;
