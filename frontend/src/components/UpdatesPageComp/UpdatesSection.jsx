import { lazy, Suspense } from "react";

const UpdatesNovelItem = lazy(() => import("./UpdatesNovelItem"));

const UpdatesSection = () => {
  return (
    <section className="recent-chap">
      <div className="section-header ">
        <h1>Recently Added Chapters</h1>
        <p>
          The new novel chapters list is based on original or translated novel
          chapters published in the last few days. You can follow new episodes
          of the most popular light novels on our platform.
        </p>
      </div>{" "}
      <div className="section-body">
        <div className="novel-list">
          {Array(40)
            .fill(null)
            .map((_, i) => (
              <Suspense key={i}>
                <UpdatesNovelItem
                  key={i}
                  title={"Lightning Is The Only Way"}
                  rank={1}
                  chapters={"1000"}
                  img={"/assets/01485-lightning-is-the-only-way.jpg"}
                />
              </Suspense>
            ))}
        </div>
      </div>
    </section>
  );
};

export default UpdatesSection;
