import UpdatesNovelItem from "../components/UpdatesPageComp/UpdatesNovelItem";
import "../styles/AuthorsNovelsPageStyles.css";

const AuthorsNovelsPage = () => {
  return (
    <div className="container author-novels">
      <div id="header">
        <h1>HideousGrain Author Light Novels</h1>
        <p className="description">
          HideousGrain is the author of online web novels. One of the author's
          most famous works is the novel "Supreme Lord: I can extract
          everything!".
        </p>
      </div>
      <section>
        <ul className="novel-list">
          <UpdatesNovelItem
            title={"God's Eyes"}
            img={"/assets/01623-supreme-lord-i-can-extract-everything.jpg"}
            rank={1}
          />
          <UpdatesNovelItem
            title={"God's Eyes"}
            img={"/assets/01623-supreme-lord-i-can-extract-everything.jpg"}
            rank={1}
          />
        </ul>
      </section>
    </div>
  );
};

export default AuthorsNovelsPage;
