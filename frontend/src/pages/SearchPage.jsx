import PopularNovelsSection from "../components/SearchPageComp/PopularNovelsSection";

const SearchPage = () => {
  return (
    <div className="container">
      <div className="search-container">
        <form className="novel-search-form">
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
              id="inputContent"
              name="inputContent"
              type="search"
              placeholder="Search Light Novel By Title"
              aria-label="Novel Search"
              aria-describedby="basic-addon1"
            />
          </div>
        </form>
        <PopularNovelsSection />
      </div>
    </div>
  );
};

export default SearchPage;
