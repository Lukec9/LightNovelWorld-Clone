const RankingNovelItem = ({ title, newTrends, userRated, img }) => {
  return (
    <li className="novel-item">
      <a title={title} href="#" className="item-cover">
        <div className="novel-coverfig">
          <img src={img} alt="" />
        </div>
      </a>
      <div className="item-stats">
        <h4 className="novel-title ">
          <a title="Shadow Slave" href="/novel/shadow-slave-05122222">
            Shadow Slave
          </a>
        </h4>
        {userRated && (
          <>
            <div className="rating-star">
              <span className="star-wrap">
                <span className="star-box" role="presentation">
                  <svg className="star star-on">
                    <use xlinkHref="#star">
                      <symbol class="icon" viewBox="0 0 1024 1024" id="star">
                        <path d="M512 798.134857L195.584 1024 302.08 637.805714 0 391.168l382.244571-12.873143L512 0l129.755429 378.294857L1024 391.168 721.92 637.805714 828.416 1024z"></path>
                      </symbol>
                    </use>
                  </svg>
                </span>
                <span className="star-box" role="presentation">
                  <svg className="star star-on">
                    <use xlinkHref="#star">
                      <symbol class="icon" viewBox="0 0 1024 1024" id="star">
                        <path d="M512 798.134857L195.584 1024 302.08 637.805714 0 391.168l382.244571-12.873143L512 0l129.755429 378.294857L1024 391.168 721.92 637.805714 828.416 1024z"></path>
                      </symbol>
                    </use>
                  </svg>
                </span>
                <span className="star-box" role="presentation">
                  <svg className="star star-on">
                    <use xlinkHref="#star">
                      <symbol class="icon" viewBox="0 0 1024 1024" id="star">
                        <path d="M512 798.134857L195.584 1024 302.08 637.805714 0 391.168l382.244571-12.873143L512 0l129.755429 378.294857L1024 391.168 721.92 637.805714 828.416 1024z"></path>
                      </symbol>
                    </use>
                  </svg>
                </span>
                <span className="star-box" role="presentation">
                  <svg className="star star-on">
                    <use xlinkHref="#star">
                      <symbol class="icon" viewBox="0 0 1024 1024" id="star">
                        <path d="M512 798.134857L195.584 1024 302.08 637.805714 0 391.168l382.244571-12.873143L512 0l129.755429 378.294857L1024 391.168 721.92 637.805714 828.416 1024z"></path>
                      </symbol>
                    </use>
                  </svg>
                </span>
                <span className="star-box" role="presentation">
                  <svg className="star star-on">
                    <use xlinkHref="#star">
                      <symbol class="icon" viewBox="0 0 1024 1024" id="star">
                        <path d="M512 798.134857L195.584 1024 302.08 637.805714 0 391.168l382.244571-12.873143L512 0l129.755429 378.294857L1024 391.168 721.92 637.805714 828.416 1024z"></path>
                      </symbol>
                    </use>
                  </svg>
                </span>
              </span>
              <strong>5.0</strong>
            </div>
            <span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width={14}
                height={14}
                fill="var(--text-color-2)"
                className="bi bi-pencil"
                viewBox="0 0 16 16"
              >
                <path d="M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168zM11.207 2.5 13.5 4.793 14.793 3.5 12.5 1.207zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293zm-9.761 5.175-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325" />
              </svg>
              230 reviews
            </span>
          </>
        )}
        {newTrends && (
          <>
            <span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width={14}
                height={14}
                fill="currentColor"
                className="bi bi-chat-dots"
                viewBox="0 0 16 16"
              >
                <path d="M5 8a1 1 0 11-2 0 1 1 0 012 0m4 0a1 1 0 11-2 0 1 1 0 012 0m3 1a1 1 0 100-2 1 1 0 000 2" />
                <path d="M2.165 15.803l.02-.004c1.83-.363 2.948-.842 3.468-1.105A9 9 0 008 15c4.418 0 8-3.134 8-7s-3.582-7-8-7-8 3.134-8 7c0 1.76.743 3.37 1.97 4.6a10.4 10.4 0 01-.524 2.318l-.003.011a11 11 0 01-.244.637c-.079.186.074.394.273.362a22 22 0 00.693-.125m.8-3.108a1 1 0 00-.287-.801C1.618 10.83 1 9.468 1 8c0-3.192 3.004-6 7-6s7 2.808 7 6-3.004 6-7 6a8 8 0 01-2.088-.272 1 1 0 00-.711.074c-.387.196-1.24.57-2.634.893a11 11 0 00.398-2" />
              </svg>
              2310 comments
            </span>
            <span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width={18}
                height={18}
                fill="currentColor"
                className="bi bi-check"
                viewBox="0 0 16 16"
              >
                <path d="M10.97 4.97a.75.75 0 0 1 1.07 1.05l-3.99 4.99a.75.75 0 0 1-1.08.02L4.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093 3.473-4.425z" />
              </svg>
              238 reviews
            </span>
          </>
        )}
        {!userRated && !newTrends && (
          <>
            <span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width={16}
                height={14}
                fill="var(--text-color-2)"
                className="bi bi-eye"
                viewBox="0 0 16 16"
              >
                <path d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8M1.173 8a13 13 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5s3.879 1.168 5.168 2.457A13 13 0 0 1 14.828 8q-.086.13-.195.288c-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5s-3.879-1.168-5.168-2.457A13 13 0 0 1 1.172 8z" />
                <path d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5M4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0" />
              </svg>
              8.69M (Monthly)
            </span>
            <span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width={16}
                height={14}
                fill="var(--text-color-2)"
                className="bi bi-bookmark-fill"
                viewBox="0 0 16 16"
              >
                <path d="M2 2v13.5a.5.5 0 0 0 .74.439L8 13.069l5.26 2.87A.5.5 0 0 0 14 15.5V2a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2" />
              </svg>
              45.1K
            </span>
          </>
        )}
      </div>
    </li>
  );
};

export default RankingNovelItem;
