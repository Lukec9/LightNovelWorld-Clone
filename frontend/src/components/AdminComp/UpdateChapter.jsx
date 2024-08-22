import React, { useState, useEffect } from "react";
import axiosInstance from "../../axios";
import { useParams, useNavigate } from "react-router-dom";
import Spinner from "../Spinner";
import notify from "../../utils/toastUtil";

const UpdateChapter = () => {
  const { novelId, chapterNumber } = useParams();
  const navigate = useNavigate();

  const [chapter, setChapter] = useState({});
  const [title, setTitle] = useState("");
  const [number, setNumber] = useState(chapterNumber);
  const [file, setFile] = useState(null);

  useEffect(() => {
    // Fetch the existing chapter details
    const fetchChapter = async () => {
      try {
        const response = await axiosInstance.get(
          `/novels/${novelId}/chapters/${chapterNumber}`
        );
        setChapter(response.data);
        setTitle(response.data.title);
      } catch (error) {
        console.error("Error fetching chapter:", error);
      }
    };
    fetchChapter();
  }, [novelId, chapterNumber]);

  const handleFileChange = e => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async e => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("title", title);
    formData.append("newChapterNumber", number);
    if (file) formData.append("textFile", file);
    console.log(formData);

    try {
      const response = await axiosInstance.put(
        `/novels/${novelId}/chapters/${chapterNumber}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if ((response.status = 200)) {
        notify("success", "Updated chapter!");

        return navigate(`/novel/${novelId}`); // Redirect after successful update
      }
    } catch (error) {
      notify("error", error.response.data);
    }
  };

  if (!chapter || !novelId) return <Spinner />;

  return (
    <div>
      <h2>Update Chapter</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Title</label>
          <input
            type="text"
            value={title}
            onChange={e => setTitle(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Chapter Number</label>
          <input
            type="text"
            value={number}
            onChange={e => setNumber(e.target.value)}
            required
          />
        </div>
        <div>
          <label>File</label>
          <input type="file" onChange={handleFileChange} />
          <p>
            Current file:{" "}
            <a
              href={chapter.textFileUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              {chapter.textFileUrl}
            </a>
          </p>
        </div>
        <button type="submit">Update Chapter</button>
      </form>
    </div>
  );
};

export default UpdateChapter;
