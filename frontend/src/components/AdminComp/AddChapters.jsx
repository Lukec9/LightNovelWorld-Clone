import React, { useState } from "react";
import { addChaptersToNovel } from "../../services/api";
import notify from "../../utils/toastUtil";

const AddChapters = ({ novelId }) => {
  const [chapters, setChapters] = useState([
    { title: "", chapterNumber: "", file: null },
  ]);

  const handleInputChange = (index, e) => {
    const { name, value, files } = e.target;
    const updatedChapters = [...chapters];
    if (name === "file") {
      updatedChapters[index][name] = files[0]; // Single file
    } else {
      updatedChapters[index][name] = value;
    }
    setChapters(updatedChapters);
  };

  const handleAddChapter = () => {
    setChapters([...chapters, { title: "", chapterNumber: "", file: null }]);
  };

  const handleRemoveChapter = index => {
    const updatedChapters = chapters.filter((_, i) => i !== index);
    setChapters(updatedChapters);
  };

  const handleSubmit = async e => {
    e.preventDefault();
    const formData = new FormData();

    chapters.forEach((chapter, index) => {
      formData.append(
        "chapters",
        JSON.stringify({
          title: chapter.title,
          chapterNumber: chapter.chapterNumber,
        })
      );
      formData.append("files", chapter.file);
    });

    try {
      await addChaptersToNovel(novelId, formData);
      notify("success", "Chapters added successfully");
    } catch (error) {
      notify("error", "Failed to add chapters");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {chapters.map((chapter, index) => (
        <div key={index}>
          <input
            type="text"
            name="title"
            value={chapter.title}
            placeholder="Chapter Title"
            onChange={e => handleInputChange(index, e)}
            required
          />
          <input
            type="number"
            name="chapterNumber"
            value={chapter.chapterNumber}
            placeholder="Chapter Number"
            onChange={e => handleInputChange(index, e)}
            required
          />
          <input
            type="file"
            name="file"
            onChange={e => handleInputChange(index, e)}
            required
          />
          <button
            className="button"
            type="button"
            onClick={() => handleRemoveChapter(index)}
          >
            Remove
          </button>
        </div>
      ))}
      <button className="button" type="button" onClick={handleAddChapter}>
        Add Another Chapter
      </button>
      <button className="button" type="submit">
        Submit Chapters
      </button>
    </form>
  );
};

export default AddChapters;
