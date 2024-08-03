import { useLocation } from "react-router-dom";

const Pagination = () => {
  const useQuery = () => {
    return new URLSearchParams(useLocation().search);
  };
  const query = useQuery();
  let page = query.get("page");
  if (!page) page = 1;

  return (
    <div className="paging">
      <div className="pag-container">
        <ul className="pag">
          {parseInt(page) > 3 && (
            <li className="PagedList-skipToFirst">
              <a href="/browse">&lt;&lt;</a>
            </li>
          )}
          {parseInt(page) > 1 && (
            <li className="PagedList-skipToPrevious">
              <a href={`/browse?page=${parseInt(page) - 1}`} rel="prev">
                &lt;
              </a>
            </li>
          )}
          {[1, 2, 3, 4, 5].map((n, i) => (
            <li key={i} className={n === parseInt(page) ? "active" : ""}>
              {parseInt(page) === n ? (
                <span>{n}</span>
              ) : (
                <a href={`/browse?page=${n}`}>{n}</a>
              )}
            </li>
          ))}
          {parseInt(page) !== 5 && (
            <>
              <li className="PagedList-skipToNext">
                <a href={`/browse?page=${parseInt(page) + 1}`} rel="next">
                  &gt;
                </a>
              </li>
              <li className="PagedList-skipToLast">
                <a href={`/browse?page=5`}>&gt;&gt;</a>
              </li>
            </>
          )}
        </ul>
      </div>
    </div>
  );
};

export default Pagination;
