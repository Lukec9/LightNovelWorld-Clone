import "../styles/AdvancedSearchPageStyles.css";

const AdvancedSearchPage = () => {
  return (
    <div id="adv-search-filter" className="adv-page">
      <div className="container">
        <div id="adv-search" className="">
          <div className="adv-filter-header">
            <h1>
              Search for novels that match your criteria with Advanced Filtering
            </h1>
          </div>
          <form autoComplete="off" method="get" id="adv-filter-form">
            <div className="adv-select">
              <span className="lbl">Origin / Raw Language</span>
              <div className="adv-check">
                <label className="chk-item">
                  <input type="checkbox" defaultValue={1} name="genretypes" />
                  <span className="checkmark" />
                  <span>Chinese</span>
                </label>
                <label className="chk-item">
                  <input type="checkbox" defaultValue={2} name="genretypes" />
                  <span className="checkmark" />
                  <span>Korean</span>
                </label>
                <label className="chk-item">
                  <input type="checkbox" defaultValue={3} name="genretypes" />
                  <span className="checkmark" />
                  <span>Japanese</span>
                </label>
              </div>
            </div>

            <div className="adv-categories  adv adv-w">
              <div className="select-andor">
                <div>
                  <span>Categories</span>
                  <select name="" id="">
                    <option value="or">Or</option>
                    <option value="and">And</option>
                  </select>
                </div>
                <span>(Matches ANY of the categories selected)</span>
              </div>
              <input
                placeholder="Multiple categories can be selected"
                type="text"
                name=""
                id=""
              />
              <select name="" id="">
                <option value=""></option>
              </select>
            </div>
            <div className="adv-tags adv adv-w">
              <div className="select-andor">
                <div>
                  <span>Tags</span>
                  <select name="" id="">
                    <option value="or">Or</option>
                    <option value="and">And</option>
                  </select>
                </div>
                <span>(Matches ALL tags selected)</span>
              </div>
              <input
                placeholder="Multiple tags can be selected"
                type="text"
                name=""
                id=""
              />
              <select name="" id="">
                <option value=""></option>
              </select>
            </div>
            <div className="adv-tags-exclude adv adv-w">
              <div className="select-andor">
                <div>
                  <span>Tags Excluded</span>
                  <select name="" id="">
                    <option value="or">Or</option>
                    <option value="and">And</option>
                  </select>
                </div>
                <span>(Novels associated with selected tags are excluded)</span>
              </div>
              <input
                placeholder="Multiple tags can be selected"
                type="text"
                name=""
                id=""
              />
              <select name="" id="">
                <option value=""></option>
              </select>
            </div>
            <div className="adv-rating adv adv-w">
              <div className="select-andor">
                <div>
                  <span>Rating</span>
                  <select name="" id="">
                    <option value="min">min</option>
                    <option value="max">max</option>
                  </select>
                </div>
                <span>(Novel rating on a scale of 1 to 5)</span>
              </div>
              <select name="" id="">
                <option value="none">none</option>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
              </select>
            </div>
            <div className="adv-translation adv  ">
              <span>Translation Status</span>
              <select name="" id="">
                <option value="all">All</option>
                <option value="completed">Completed</option>
                <option value="ongoing">Ongoing</option>
              </select>
            </div>
            <div className="adv-sort-results adv">
              <span>Sort Results By...</span>
              <select name="" id="">
                <option value="rank-top">Rank(Top)</option>
                <option value="ranking-score">Rating Score(Top)</option>
                <option value="bookmark-count">Bookmark Count(Most)</option>
                <option value="Review-count">Review Count(Most)</option>
                <option value="title">Title(A&gt;Z)</option>
                <option value="last-updated">Last Updated(Newest)</option>
              </select>
            </div>

            <button className="button " type="submit">
              Apply Filters
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AdvancedSearchPage;
