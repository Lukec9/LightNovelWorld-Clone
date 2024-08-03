import SearchNovelItem from "./SearchNovelItem";
import "../../styles/SearchPageStyles.css";

const PopularNovelsSection = () => {
  return (
    <section className="popular-novels">
      <h2>Some Popular Novels</h2>
      <ul className="novel-list">
        {Array(10)
          .fill(null)
          .map((_, i) => (
            <SearchNovelItem
              rank={i + 1}
              key={i}
              title={"Infinite Mana In The Apocalypse"}
              img={"assets/00732-infinite-mana-in-the-apocalypse-novel.jpg"}
            />
          ))}
      </ul>
    </section>
  );
};

export default PopularNovelsSection;
