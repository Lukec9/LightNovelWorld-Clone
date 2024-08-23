import { useEffect, useState } from "react";
import UpdatesNovelItem from "../components/UpdatesPageComp/UpdatesNovelItem";
import "../styles/AuthorsNovelsPageStyles.css";
import { useParams } from "react-router-dom";
import Spinner from "../components/Spinner";
import axiosInstance from "../axios";
import ReturnToPrevious from "../components/ReturnTo";
import notify from "../utils/toastUtil";

const AuthorsNovelsPage = () => {
  const { aname } = useParams();
  const [novels, setNovels] = useState(null);
  const [loading, setLoading] = useState(true);
  const [bestNovel, setBestNovel] = useState(null);
  const getAuthorsNovels = async () => {
    try {
      const response = await axiosInstance.get(`/novels/author`, {
        params: { author: aname },
      });
      setNovels(response.data);
      if (response.data.length > 0) {
        const topNovel = response.data.reduce((prev, current) =>
          prev.views > current.views ? prev : current
        );
        setBestNovel(topNovel);
      }
    } catch (error) {
      notify("error", error.response.data.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getAuthorsNovels();
  }, [aname]);

  if (loading) return <Spinner />;
  if (!loading && !novels)
    return (
      <div className="container author-novels">
        <p>Couldn't load {aname}'s novels</p>
        <ReturnToPrevious />
      </div>
    );

  return (
    <div className="container author-novels">
      <div id="header">
        <h1>{aname} Author Light Novels</h1>
        <p className="description">
          {aname} is the author of online web novels. One of the author's most
          famous works is the novel {bestNovel.title}
        </p>
      </div>
      <section>
        <ul className="novel-list">
          {novels &&
            novels.map(novel => (
              <UpdatesNovelItem key={novel._id} novel={novel} />
            ))}
          {/* <UpdatesNovelItem
            title={"God's Eyes"}
            img={"/assets/01623-supreme-lord-i-can-extract-everything.jpg"}
            rank={1}
          />
          <UpdatesNovelItem
            title={"God's Eyes"}
            img={"/assets/01623-supreme-lord-i-can-extract-everything.jpg"}
            rank={1}
          /> */}
        </ul>
      </section>
    </div>
  );
};

export default AuthorsNovelsPage;
