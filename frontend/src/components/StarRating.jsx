const StarRating = ({ rating }) => {
  const getStarClass = index => {
    const starNumber = index + 1;

    if (rating >= starNumber) {
      return "star-on";
    } else if (rating > starNumber - 1 && rating < starNumber) {
      return "half";
    } else {
      return "empty";
    }
  };

  return (
    <div className="rating-star">
      <svg width="0" height="0" style={{ position: "absolute" }}>
        <defs>
          <mask id="half-mask" x="0" y="0" width="100%" height="100%">
            <rect x="0" y="0" width="50%" height="100%" fill="white" />
          </mask>
        </defs>
      </svg>
      <span className="star-wrap">
        {[...Array(5)].map((_, index) => (
          <span key={index} className="star-box" role="presentation">
            <svg
              className={`star ${getStarClass(index)}`}
              viewBox="0 0 1024 1024"
            >
              <path d="M512 798.134857L195.584 1024 302.08 637.805714 0 391.168l382.244571-12.873143L512 0l129.755429 378.294857L1024 391.168 721.92 637.805714 828.416 1024z" />
            </svg>
          </span>
        ))}
      </span>
      <strong>{!rating ? 0 : rating.toFixed(2)}</strong>
    </div>
  );
};

export default StarRating;
