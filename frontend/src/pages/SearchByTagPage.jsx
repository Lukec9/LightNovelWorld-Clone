import React, { useEffect, useState } from "react";
import axiosInstance from "../axios";
import notify from "../utils/toastUtil";
import { Link, useLocation } from "react-router-dom";
import CategoryBtn from "../components/BrowsePageComp/CategoryBtn";
import BrowseNovelItem from "../components/BrowsePageComp/BrowseNovelItem";

const SearchByTagPage = () => {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const tag = params.get("tag");
  const [novels, setNovels] = useState(null);
  const [order, setOrder] = useState("Popular");
  const [loading, setLoading] = useState(true);

  const getTagNovels = async () => {
    setLoading(true);
    try {
      const response = await axiosInstance.get(`/novels/tag`, {
        params: { tag, sort: order },
      });
      if ((response.status = 200)) {
        setNovels(response.data);
      }
    } catch (error) {
      notify("error", `Could not find novels with ${tag} tag`);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getTagNovels();
  }, [tag, order]);

  if ((!novels && !loading) || (!tag && !loading))
    return (
      <Link to={"/"}>
        No novels associated with {tag} tag, return to homepage
      </Link>
    );
  return (
    <div className="container tag-page">
      <div className="header">
        <h1>{tag} Tagged Novels</h1>
      </div>
      <div className="order-btns">
        {["Popular", "New", "Updates"].map((filt, i) => (
          <CategoryBtn
            key={i}
            tag={true}
            isActive={order === filt}
            onClick={() => setOrder(filt)}
            category={filt}
          />
        ))}
      </div>
      <ul className="novel-list">
        {novels && novels.map(n => <BrowseNovelItem novel={n} />)}
      </ul>
    </div>
  );
};

export default SearchByTagPage;
