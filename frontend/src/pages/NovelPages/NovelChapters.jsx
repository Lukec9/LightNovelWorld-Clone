import { lazy, Suspense } from "react";
import Pagination from "../../components/BrowsePageComp/Pagination";
import "../../styles/NovelPages/NovelReviewsPageStyles.css";
import Spinner from "../../components/Spinner";
const NovelChapterChapter = lazy(() =>
  import("../../components/NovelPagesComp/NovelChapterChapter")
);

const NovelChapters = () => {
  return (
    <div id="chapter-list-page">
      <div className="container">
        <div className="novel-item">
          <div className="cover-wrap">
            <a
              title="Supreme Lord: I can extract everything!"
              href="/novel/supreme-lord-i-can-extract-everything"
            >
              <figure className="novel-cover">
                <img
                  src="/assets/01623-supreme-lord-i-can-extract-everything.jpg"
                  alt="Supreme Lord: I can extract everything!"
                />
              </figure>
            </a>
          </div>
          <div className="item-body">
            <h1>
              <a
                className="text2row"
                title="Supreme Lord: I can extract everything!"
                href="/novel/supreme-lord-i-can-extract-everything"
              >
                Supreme Lord: I can extract everything!
              </a>
            </h1>
            <div className="novel-stats">
              <span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width={16}
                  height={16}
                  fill="var(--text-color-2)"
                  viewBox="0 0 576 512"
                >
                  <path d="M309 106c11.4-7 19-19.7 19-34c0-22.1-17.9-40-40-40s-40 17.9-40 40c0 14.4 7.6 27 19 34L209.7 220.6c-9.1 18.2-32.7 23.4-48.6 10.7L72 160c5-6.7 8-15 8-24c0-22.1-17.9-40-40-40S0 113.9 0 136s17.9 40 40 40c.2 0 .5 0 .7 0L86.4 427.4c5.5 30.4 32 52.6 63 52.6l277.2 0c30.9 0 57.4-22.1 63-52.6L535.3 176c.2 0 .5 0 .7 0c22.1 0 40-17.9 40-40s-17.9-40-40-40s-40 17.9-40 40c0 9 3 17.3 8 24l-89.1 71.3c-15.9 12.7-39.5 7.5-48.6-10.7L309 106z" />
                </svg>
                Rank 46
              </span>
            </div>
            <div className="novel-stats">
              <span>
                Updated <time dateTime="2024-08-06 09:58">19 hours ago</time>
              </span>
            </div>
          </div>
        </div>
        <span className="divider" />
        <h2>Supreme Lord: I can extract everything! Novel Chapters</h2>
        <p>
          List of most recent chapters published for the Supreme Lord: I can
          extract everything! novel. A total of 913 chapters have been
          translated and the release date of the last chapter is Aug 06, 2024
          <br />
        </p>
        <p>
          Latest Release:
          <br />
          <a
            href="/novel/supreme-lord-i-can-extract-everything/chapter-913"
            title="Chapter 913: Ways"
          >
            Chapter 913: Ways
          </a>
        </p>

        <div className="section-header"></div>
      </div>
      <section id="chpagedlist" className="container">
        <div className="filters">
          <form id="gotochap">
            <input
              name="str"
              type="hidden"
              defaultValue="supreme-lord-i-can-extract-everything"
            />
            <input
              id="gotochapno"
              name="chapno"
              type="number"
              placeholder="Enter Chapter No"
            />
            <button className="button" type="submit" defaultValue="Go">
              Go
            </button>
            <input name="__LNRequestVerifyToken" type="hidden" />
          </form>
          <div className="page-nav">
            <Pagination />
            <a href="/novel/supreme-lord-i-can-extract-everything-/chapters?chorder=desc">
              <i className="chorder fas asc " data-order="asc">
                <svg>
                  <use xlinkHref="#i-rank-up">
                    <symbol id="i-rank-up" viewBox="0 0 1308 1024">
                      <path d="M512 149.33333366666665h796.444444v113.777777H512V149.33333366666665z m0 341.333333h568.888889v113.777778H512V490.6666666666667z m0 341.333333h341.333333v113.777778H512v-113.777778zM227.555556 303.6159996666667L100.124444 452.9493336666667 13.653333 379.0506666666667 341.333333-4.949333333333332V1002.6666666666666H227.555556V303.6159996666667z" />
                    </symbol>
                  </use>
                </svg>
              </i>
            </a>
          </div>
        </div>
        <ul className="chapter-list">
          {Array(100)
            .fill(null)
            .map((_, i) => (
              <Suspense key={i} fallback={<Spinner />}>
                <NovelChapterChapter key={i} />
              </Suspense>
            ))}
        </ul>
      </section>
    </div>
  );
};

export default NovelChapters;
