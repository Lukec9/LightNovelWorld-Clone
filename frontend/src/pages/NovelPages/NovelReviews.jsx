import "../../styles/NovelPages/NovelReviewsPageStyles.css";

const NovelReviews = () => {
  return (
    <div id="review-list-page">
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
                href="/novel/supreme-lord-i-can-extract-everything-16091312"
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
        <h2>
          List of reviews made by users for the Supreme Lord: I can extract
          everything! novel.
          <br />
        </h2>
        <p>
          58 users have written reviews for the Supreme Lord: I can extract
          everything! novel and rated it with an average score of 3.9 out of 5.
          Our novel is ranked 46th among all the novels in the Light Novel World
          platform.
        </p>
        <div className="section-header">
          <div className="head-info">
            <h3>58 Reviews</h3>
            <div className="rating-star">
              <span className="star-wrap">
                <span className="star-box" role="presentation">
                  <svg className="star star-on">
                    <use xlinkHref="#star">
                      <symbol
                        className="icon"
                        viewBox="0 0 1024 1024"
                        id="star"
                      >
                        <path d="M512 798.134857L195.584 1024 302.08 637.805714 0 391.168l382.244571-12.873143L512 0l129.755429 378.294857L1024 391.168 721.92 637.805714 828.416 1024z"></path>
                      </symbol>
                    </use>
                  </svg>
                </span>
                <span className="star-box" role="presentation">
                  <svg className="star star-on">
                    <use xlinkHref="#star">
                      <symbol
                        className="icon"
                        viewBox="0 0 1024 1024"
                        id="star"
                      >
                        <path d="M512 798.134857L195.584 1024 302.08 637.805714 0 391.168l382.244571-12.873143L512 0l129.755429 378.294857L1024 391.168 721.92 637.805714 828.416 1024z"></path>
                      </symbol>
                    </use>
                  </svg>
                </span>
                <span className="star-box" role="presentation">
                  <svg className="star star-on">
                    <use xlinkHref="#star">
                      <symbol
                        className="icon"
                        viewBox="0 0 1024 1024"
                        id="star"
                      >
                        <path d="M512 798.134857L195.584 1024 302.08 637.805714 0 391.168l382.244571-12.873143L512 0l129.755429 378.294857L1024 391.168 721.92 637.805714 828.416 1024z"></path>
                      </symbol>
                    </use>
                  </svg>
                </span>
                <span className="star-box" role="presentation">
                  <svg className="star star-on">
                    <use xlinkHref="#star">
                      <symbol
                        className="icon"
                        viewBox="0 0 1024 1024"
                        id="star"
                      >
                        <path d="M512 798.134857L195.584 1024 302.08 637.805714 0 391.168l382.244571-12.873143L512 0l129.755429 378.294857L1024 391.168 721.92 637.805714 828.416 1024z"></path>
                      </symbol>
                    </use>
                  </svg>
                </span>
                <span className="star-box" role="presentation">
                  <svg className="star star-on">
                    <use xlinkHref="#star">
                      <symbol
                        className="icon"
                        viewBox="0 0 1024 1024"
                        id="star"
                      >
                        <path d="M512 798.134857L195.584 1024 302.08 637.805714 0 391.168l382.244571-12.873143L512 0l129.755429 378.294857L1024 391.168 721.92 637.805714 828.416 1024z"></path>
                      </symbol>
                    </use>
                  </svg>
                </span>
              </span>
              <strong>5.0</strong>
            </div>
          </div>
          <a
            id="write-review"
            data-bid={1623}
            data-submit="false"
            className="button "
          >
            Write a review
          </a>
        </div>
      </div>
      <section id="reviews" className="container">
        <div id="review_load" className="review-list fullw">
          {Array(5)
            .fill(null)
            .map((_, i) => (
              <div key={i} className="review-item  ">
                <meta itemProp="datePublished" content="2024-08-01T07:47:32" />
                <div className="review-info">
                  <div className="review-user-avatar" data-ulvlgrp={1}>
                    <img
                      className="avatar  ls-is-cached lazyloaded"
                      src="/assets/pfp.jpg"
                      alt="Luka T"
                    />
                    <span className="klvl">1</span>
                  </div>
                  <div
                    className="user"
                    itemProp="author"
                    itemScope=""
                    itemType="https://schema.org/Person"
                  >
                    <span className="username" itemProp="sameAs">
                      <strong itemProp="name">Luka T</strong>
                    </span>
                    <div className="sub-items">
                      <span className="tier tier0">Reader</span>
                    </div>
                  </div>
                  <div className="top-right">
                    <span className="onChap">Chapter 285</span>
                    <span className="review-date">6 days ago</span>
                  </div>
                </div>
                <div
                  className="rating-info"
                  itemProp="reviewRating"
                  itemScope=""
                  itemType="https://schema.org/Rating"
                >
                  <meta itemProp="ratingValue" content={5.0} />
                  <meta itemProp="bestRating" content={5} />
                  <span className="star-wrap">
                    <svg className="star-on">
                      <use xlinkHref="#star" />
                    </svg>
                    <svg className="star-on">
                      <use xlinkHref="#star" />
                    </svg>
                    <svg className="star-on">
                      <use xlinkHref="#star" />
                    </svg>
                    <svg className="star-on">
                      <use xlinkHref="#star" />
                    </svg>
                    <svg className="star-on">
                      <use xlinkHref="#star" />
                    </svg>
                  </span>
                  <strong>(5.0)</strong>
                </div>
                <div className="review-text" data-spoiler={0}>
                  <p itemProp="reviewBody">
                    Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                    Culpa reiciendis nam impedit doloribus voluptatem, hic
                    distinctio mollitia rem molestias iusto incidunt debitis
                    quod autem sed asperiores. Quod consequatur magnam et.
                    Provident, commodi tempore nisi odio, repudiandae ipsa
                    veniam optio harum nostrum amet, culpa dolorem? Ratione
                    repellat aut odio, voluptatum debitis placeat excepturi quod
                    sit dolores est beatae repudiandae. Voluptates, labore!
                  </p>
                  <div className="rev-remo">
                    <a href="">Read More</a>
                  </div>
                </div>
                <div className="revtoolbar">
                  <div className="leftside">
                    <span
                      className="reply-review  tool-button"
                      data-uaction="revreply"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width={16}
                        height={16}
                        fill="currentColor"
                        className="bi bi-chat-dots"
                        viewBox="0 0 16 16"
                      >
                        <path d="M5 8a1 1 0 1 1-2 0 1 1 0 0 1 2 0m4 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0m3 1a1 1 0 1 0 0-2 1 1 0 0 0 0 2" />
                        <path d="m2.165 15.803.02-.004c1.83-.363 2.948-.842 3.468-1.105A9 9 0 0 0 8 15c4.418 0 8-3.134 8-7s-3.582-7-8-7-8 3.134-8 7c0 1.76.743 3.37 1.97 4.6a10.4 10.4 0 0 1-.524 2.318l-.003.011a11 11 0 0 1-.244.637c-.079.186.074.394.273.362a22 22 0 0 0 .693-.125m.8-3.108a1 1 0 0 0-.287-.801C1.618 10.83 1 9.468 1 8c0-3.192 3.004-6 7-6s7 2.808 7 6-3.004 6-7 6a8 8 0 0 1-2.088-.272 1 1 0 0 0-.711.074c-.387.196-1.24.57-2.634.893a11 11 0 0 0 .398-2" />
                      </svg>{" "}
                      <strong>Reply (0)</strong>
                    </span>
                    <span className="divider" />
                    <span
                      className="tool-button"
                      data-uaction="revreport"
                      data-reporttype={3}
                    >
                      <i className="icon-attention" /> Report
                    </span>
                  </div>
                  <div className="side">
                    <div className="usrlike">
                      <span className="_grp">
                        <input
                          type="radio"
                          name="urevlike_33253"
                          defaultValue={0}
                          data-checked="false"
                        />
                        <label htmlFor="inputrevlike_33253">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="16"
                            height="16"
                            fill="currentColor"
                            className="bi bi-hand-thumbs-up"
                            viewBox="0 0 16 16"
                          >
                            <path d="M8.864.046C7.908-.193 7.02.53 6.956 1.466c-.072 1.051-.23 2.016-.428 2.59-.125.36-.479 1.013-1.04 1.639-.557.623-1.282 1.178-2.131 1.41C2.685 7.288 2 7.87 2 8.72v4.001c0 .845.682 1.464 1.448 1.545 1.07.114 1.564.415 2.068.723l.048.03c.272.165.578.348.97.484.397.136.861.217 1.466.217h3.5c.937 0 1.599-.477 1.934-1.064a1.86 1.86 0 0 0 .254-.912c0-.152-.023-.312-.077-.464.201-.263.38-.578.488-.901.11-.33.172-.762.004-1.149.069-.13.12-.269.159-.403.077-.27.113-.568.113-.857 0-.288-.036-.585-.113-.856a2 2 0 0 0-.138-.362 1.9 1.9 0 0 0 .234-1.734c-.206-.592-.682-1.1-1.2-1.272-.847-.282-1.803-.276-2.516-.211a10 10 0 0 0-.443.05 9.4 9.4 0 0 0-.062-4.509A1.38 1.38 0 0 0 9.125.111zM11.5 14.721H8c-.51 0-.863-.069-1.14-.164-.281-.097-.506-.228-.776-.393l-.04-.024c-.555-.339-1.198-.731-2.49-.868-.333-.036-.554-.29-.554-.55V8.72c0-.254.226-.543.62-.65 1.095-.3 1.977-.996 2.614-1.708.635-.71 1.064-1.475 1.238-1.978.243-.7.407-1.768.482-2.85.025-.362.36-.594.667-.518l.262.066c.16.04.258.143.288.255a8.34 8.34 0 0 1-.145 4.725.5.5 0 0 0 .595.644l.003-.001.014-.003.058-.014a9 9 0 0 1 1.036-.157c.663-.06 1.457-.054 2.11.164.175.058.45.3.57.65.107.308.087.67-.266 1.022l-.353.353.353.354c.043.043.105.141.154.315.048.167.075.37.075.581 0 .212-.027.414-.075.582-.05.174-.111.272-.154.315l-.353.353.353.354c.047.047.109.177.005.488a2.2 2.2 0 0 1-.505.805l-.353.353.353.354c.006.005.041.05.041.17a.9.9 0 0 1-.121.416c-.165.288-.503.56-1.066.56z" />
                          </svg>{" "}
                          <span className="revlc_33253">0</span>
                        </label>
                      </span>
                      <span className="divider" />
                      <span className="_grp">
                        <input
                          type="radio"
                          name="urevlike_33253"
                          defaultValue={1}
                          data-checked="false"
                        />
                        <label htmlFor="inputrevdislike_33253">
                          <span className="revdlc_33253">0</span>
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="16"
                            height="16"
                            fill="currentColor"
                            className="bi bi-hand-thumbs-down"
                            viewBox="0 0 16 16"
                          >
                            <path d="M8.864 15.674c-.956.24-1.843-.484-1.908-1.42-.072-1.05-.23-2.015-.428-2.59-.125-.36-.479-1.012-1.04-1.638-.557-.624-1.282-1.179-2.131-1.41C2.685 8.432 2 7.85 2 7V3c0-.845.682-1.464 1.448-1.546 1.07-.113 1.564-.415 2.068-.723l.048-.029c.272-.166.578-.349.97-.484C6.931.08 7.395 0 8 0h3.5c.937 0 1.599.478 1.934 1.064.164.287.254.607.254.913 0 .152-.023.312-.077.464.201.262.38.577.488.9.11.33.172.762.004 1.15.069.13.12.268.159.403.077.27.113.567.113.856s-.036.586-.113.856c-.035.12-.08.244-.138.363.394.571.418 1.2.234 1.733-.206.592-.682 1.1-1.2 1.272-.847.283-1.803.276-2.516.211a10 10 0 0 1-.443-.05 9.36 9.36 0 0 1-.062 4.51c-.138.508-.55.848-1.012.964zM11.5 1H8c-.51 0-.863.068-1.14.163-.281.097-.506.229-.776.393l-.04.025c-.555.338-1.198.73-2.49.868-.333.035-.554.29-.554.55V7c0 .255.226.543.62.65 1.095.3 1.977.997 2.614 1.709.635.71 1.064 1.475 1.238 1.977.243.7.407 1.768.482 2.85.025.362.36.595.667.518l.262-.065c.16-.04.258-.144.288-.255a8.34 8.34 0 0 0-.145-4.726.5.5 0 0 1 .595-.643h.003l.014.004.058.013a9 9 0 0 0 1.036.157c.663.06 1.457.054 2.11-.163.175-.059.45-.301.57-.651.107-.308.087-.67-.266-1.021L12.793 7l.353-.354c.043-.042.105-.14.154-.315.048-.167.075-.37.075-.581s-.027-.414-.075-.581c-.05-.174-.111-.273-.154-.315l-.353-.354.353-.354c.047-.047.109-.176.005-.488a2.2 2.2 0 0 0-.505-.804l-.353-.354.353-.354c.006-.005.041-.05.041-.17a.9.9 0 0 0-.121-.415C12.4 1.272 12.063 1 11.5 1" />
                          </svg>{" "}
                        </label>
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
        </div>
      </section>
    </div>
  );
};

export default NovelReviews;
