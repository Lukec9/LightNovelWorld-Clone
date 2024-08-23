import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { updateNovel, getNovelById } from "../../services/api";
import usePreviewImg from "../../hooks/usePreviewImg"; // Adjust path as necessary
import notify from "../../utils/toastUtil";
import AddChapters from "./AddChapters";
import DeleteNovel from "./DeleteNovel";
import ReturnToPrevious from "../ReturnTo";

const UpdateNovel = () => {
  const { novelId } = useParams();
  const navigate = useNavigate();
  const [novel, setNovel] = useState(null);
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [summary, setSummary] = useState("");
  const [status, setStatus] = useState("Ongoing");
  const [categories, setCategories] = useState([]);
  const [tags, setTags] = useState([]);
  const { handleImageChange, imgUrl, setImgUrl } = usePreviewImg();

  useEffect(() => {
    // Fetch the existing novel details
    const fetchNovel = async () => {
      try {
        const response = await getNovelById(novelId);
        setNovel(response.data.novel);
        setTitle(response.data.novel.title);
        setAuthor(response.data.novel.author);
        setSummary(response.data.novel.summary);
        setStatus(response.data.novel.status);
        setCategories(response.data.novel.categories);
        setTags(response.data.novel.tags);
        setImgUrl(response.data.novel.cover); // For previewing the current cover
      } catch (error) {
        console.error("Error fetching novel:", error);
        notify("error", "Failed to fetch novel details");
      }
    };

    fetchNovel();
  }, [novelId]);

  const handleCategoryChange = e => {
    const input = e.target.value;
    const newCategories = input
      .split(",")
      .map(category => category.trim())
      .filter(category => category.length > 0);
    setCategories(newCategories);
  };

  const handleTagChange = e => {
    const input = e.target.value;
    const newTags = input
      .split(",")
      .map(tag => tag.trim())
      .filter(tag => tag.length > 0);
    setTags(newTags);
  };

  const handleSubmit = async e => {
    e.preventDefault();

    const data = {
      title,
      author,
      summary,
      status,
      categories,
      tags,
      cover: imgUrl, // Send base64 image data or existing URL
    };

    try {
      await updateNovel(novelId, data); // API call to update the novel
      notify("success", "Novel updated successfully");
      navigate(`/novel/${novelId}`); // Redirect or refresh the page
    } catch (err) {
      console.error("Error updating novel:", err);
      notify("error", "Failed to update novel");
    }
  };

  if (!novel) return <div>Loading...</div>;

  return (
    <div>
      <h2>Update Novel</h2>
      <form onSubmit={handleSubmit}>
        <div className="title">
          <label>Title:</label>
          <input
            type="text"
            value={title}
            onChange={e => setTitle(e.target.value)}
            required
          />
        </div>
        <div className="author">
          <label>Author:</label>
          <input
            type="text"
            value={author}
            onChange={e => setAuthor(e.target.value)}
            required
          />
        </div>
        <div className="summary">
          <label>Summary:</label>
          <textarea
            value={summary}
            onChange={e => setSummary(e.target.value)}
            required
          />
        </div>
        <div className="status">
          <label>Status:</label>
          <select
            value={status}
            onChange={e => setStatus(e.target.value)}
            required
          >
            <option value="Ongoing">Ongoing</option>
            <option value="Completed">Completed</option>
            <option value="Dropped">Dropped</option>
          </select>
        </div>
        <div className="categories">
          <label>Categories (comma separated):</label>
          <input
            type="text"
            placeholder="e.g., Fiction, Mystery, Science Fiction"
            onChange={handleCategoryChange}
            value={categories.join(", ")}
            required
          />
        </div>
        <div className="tags">
          <label>Tags (comma separated):</label>
          <input
            type="text"
            placeholder="e.g., Antihero, Protagonist, Dark Fantasy"
            onChange={handleTagChange}
            value={tags.join(", ")}
            required
          />
        </div>
        <div className="cover">
          <label>Cover Image:</label>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange} // Use the custom hook for image preview
          />
          {imgUrl && (
            <img
              src={imgUrl}
              alt="Cover Preview"
              style={{ width: "100px", height: "auto" }}
            />
          )}
        </div>
        <button className="button" type="submit">
          Update Novel
        </button>
      </form>
      <AddChapters novelId={novelId} />
      <DeleteNovel novelId={novelId} />
      <ReturnToPrevious />
    </div>
  );
};

export default UpdateNovel;
