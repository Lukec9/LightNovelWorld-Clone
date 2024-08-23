import { Link, useLocation } from "react-router-dom";

const Pagination = ({ pagination = null, setPage }) => {
  const totalPages = pagination?.totalPages || 5;
  const page = pagination?.page || 1;
  const createPageNumbers = (currentPage, totalPages) => {
    const pageNumbers = [];
    const range = 2; // Show two pages before and after the current page

    let startPage = Math.max(1, currentPage - range);
    let endPage = Math.min(totalPages, currentPage + range);

    // Adjust if start or end of pages go out of bounds
    if (currentPage <= range) {
      endPage = Math.min(totalPages, 5);
    }
    if (currentPage + range >= totalPages) {
      startPage = Math.max(1, totalPages - 4);
    }

    for (let i = startPage; i <= endPage; i++) {
      pageNumbers.push(i);
    }
    return pageNumbers;
  };

  const pageNumbers = createPageNumbers(page, totalPages);

  const handleClick = newPage => {
    setPage(newPage);
  };

  if (!pagination && !setPage)
    return (
      <div className="paging">
        <div className="pag-container">
          <ul className="pag">
            {parseInt(page) > 3 && (
              <li className="PagedList-skipToFirst">
                <a>&lt;&lt;</a>
              </li>
            )}
            {parseInt(page) > 1 && (
              <li className="PagedList-skipToPrevious">
                <Link href={`/page=${parseInt(page) - 1}`} rel="prev">
                  &lt;
                </Link>
              </li>
            )}
            {[1, 2, 3, 4, 5].map((n, i) => (
              <li key={i} className={n === parseInt(page) ? "active" : ""}>
                {parseInt(page) === n ? <span>{n}</span> : <a>{n}</a>}
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

  return (
    <div className="paging">
      <div className="pag-container">
        <ul className="pag">
          {page > 3 && (
            <li className="PagedList-skipToFirst">
              <Link to="?page=1" onClick={() => handleClick(1)}>
                &lt;&lt;
              </Link>
            </li>
          )}
          {page > 1 && (
            <li className="PagedList-skipToPrevious">
              <Link
                to={`?page=${page - 1}`}
                onClick={() => handleClick(page - 1)}
                rel="prev"
              >
                &lt;
              </Link>
            </li>
          )}
          {Array.from({ length: Math.min(5, totalPages) }, (_, i) => i + 1).map(
            n => (
              <li key={n} className={n === page ? "active" : ""}>
                {n === page ? (
                  <span>{n}</span>
                ) : (
                  <Link to={`?page=${n}`} onClick={() => handleClick(n)}>
                    {n}
                  </Link>
                )}
              </li>
            )
          )}
          {page < totalPages && (
            <>
              <li className="PagedList-skipToNext">
                <Link
                  to={`?page=${page + 1}`}
                  onClick={() => handleClick(page + 1)}
                  rel="next"
                >
                  &gt;
                </Link>
              </li>
              <li className="PagedList-skipToLast">
                <Link
                  to={`?page=${totalPages}`}
                  onClick={() => handleClick(totalPages)}
                >
                  &gt;&gt;
                </Link>
              </li>
            </>
          )}
        </ul>
      </div>
    </div>
  );
};

export default Pagination;
