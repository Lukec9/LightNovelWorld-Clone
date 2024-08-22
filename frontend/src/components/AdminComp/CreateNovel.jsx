import React, { useState } from "react";
import { createNovel } from "../../services/api";
import usePreviewImg from "../../hooks/usePreviewImg";
import notify from "../../utils/toastUtil";

const CreateNovel = ({}) => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [summary, setSummary] = useState("");
  const [status, setStatus] = useState("Ongoing"); // Default value
  const [categories, setCategories] = useState([]);
  const [tags, setTags] = useState([]);
  const { handleImageChange, imgUrl, setImgUrl } = usePreviewImg(); // For image preview

  const handleSubmit = async e => {
    e.preventDefault();

    const data = {
      title,
      author,
      summary,
      status,
      categories,
      tags,
      cover: imgUrl, // Send base64 image data
    };

    try {
      await createNovel(data); // API call to create a novel
      setTitle("");
      setAuthor("");
      setSummary("");
      setStatus("Ongoing");
      setCategories([]);
      setTags([]);
      setImgUrl(""); // Clear image preview
      notify("success", "Created novel");
    } catch (err) {
      console.error("Error creating novel:", err);
      notify("error", err.response?.data);
    }
  };

  return (
    <div>
      <h2>Create New Novel</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Title:</label>
          <input
            type="text"
            value={title}
            onChange={e => setTitle(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Author:</label>
          <input
            type="text"
            value={author}
            onChange={e => setAuthor(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Summary:</label>
          <textarea
            value={summary}
            onChange={e => setSummary(e.target.value)}
            required
          />
        </div>
        <div>
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
        <div>
          <label>Categories (comma separated):</label>
          <input
            type="text"
            value={categories.join(", ")}
            onChange={e =>
              setCategories(e.target.value.split(",").map(c => c.trim()))
            }
            required
          />
        </div>
        <div>
          <label>Tags (comma separated):</label>
          <input
            type="text"
            value={tags.join(", ")}
            onChange={e =>
              setTags(e.target.value.split(",").map(t => t.trim()))
            }
            required
          />
        </div>
        <div>
          <label>Cover Image:</label>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange} // Use the custom hook for image preview
            required
          />
          {imgUrl && (
            <img
              src={imgUrl}
              alt="Cover Preview"
              style={{ width: "100px", height: "auto" }}
            />
          )}
        </div>
        <button type="submit">Create Novel</button>
      </form>
    </div>
  );
};

export default CreateNovel;
