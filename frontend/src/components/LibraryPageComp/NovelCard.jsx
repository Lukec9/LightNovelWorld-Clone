const NovelCard = ({ cover, title, lastChapter, progress, updates }) => {
  const compl = "Reading is complete";

  if (
    progress.current === compl ||
    progress.total === compl ||
    progress.percentage === compl
  ) {
    progress.complete = true;
  }
  return (
    <li className="novel-card">
      <div className="novel-cover">
        <figure className="novel-coverfig">
          <img src={cover} alt="" />
        </figure>
      </div>
      <div className="novel-content">
        <div className="novel-title">
          <p className="ntitle">{title}</p>
          <p className="lastchap">
            <small>
              <svg
                className="arrow"
                xmlns="http://www.w3.org/2000/svg"
                width={16}
                height={16}
                fill="currentColor"
                viewBox="0 0 16 16"
              >
                <path
                  fillRule="evenodd"
                  d="M8 3a5 5 0 1 1-4.546 2.914.5.5 0 0 0-.908-.417A6 6 0 1 0 8 2v1z"
                />
                <path d="M8 4.466V.534a.25.25 0 0 0-.41-.192L5.23 2.308a.25.25 0 0 0 0 .384l2.36 1.966A.25.25 0 0 0 8 4.466z" />
              </svg>
            </small>
            <span>{lastChapter}</span>
          </p>
        </div>
        <div className="chptpro">
          <p className="chappro">
            {progress.complete ? (
              <span style={{ display: "block" }}>Reading is complete</span>
            ) : (
              <>
                <span>Progress:</span>
                <span>{`${progress.current} / ${progress.total}`}</span>
                <span>({progress.percentage})</span>
              </>
            )}
          </p>
        </div>
        <div className="updates">
          <span
            className={updates === "New Chapters" ? "newchap" : "noupdates"}
          >
            {updates}
          </span>
        </div>
      </div>
      <div className="novel-side">
        <div className="items">
          <svg
            className="bellimg"
            xmlns="http://www.w3.org/2000/svg"
            width={16}
            height={16}
            fill="currentColor"
            viewBox="0 0 16 16"
          >
            <path d="M8 16a2 2 0 0 0 2-2H6a2 2 0 0 0 2 2zM8 1.918l-.797.161A4.002 4.002 0 0 0 4 6c0 .628-.134 2.197-.459 3.742-.16.767-.376 1.566-.663 2.258h10.244c-.287-.692-.502-1.49-.663-2.258C12.134 8.197 12 6.628 12 6a4.002 4.002 0 0 0-3.203-3.92L8 1.917zM14.22 12c.223.447.481.801.78 1H1c.299-.199.557-.553.78-1C2.68 10.2 3 6.88 3 6c0-2.42 1.72-4.44 4.005-4.901a1 1 0 1 1 1.99 0A5.002 5.002 0 0 1 13 6c0 .88.32 4.2 1.22 6z" />
          </svg>
          <svg
            className="hambmenu"
            xmlns="http://www.w3.org/2000/svg"
            width={16}
            height={16}
            fill="#5071df"
            viewBox="0 0 16 16"
          >
            <path
              fillRule="evenodd"
              d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5z"
            />
          </svg>
        </div>
      </div>
    </li>
  );
};

export default NovelCard;
