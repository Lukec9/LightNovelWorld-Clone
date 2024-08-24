import React from "react";
import { useNavigate } from "react-router-dom";
import { deleteNovel } from "../../services/api";
import notify from "../../utils/toastUtil";

const DeleteNovel = ({ novelId }) => {
  const navigate = useNavigate();

  const handleDelete = async () => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this novel? This action cannot be undone."
    );
    if (!confirmed) return;

    try {
      await deleteNovel(novelId);
      notify("success", "Novel deleted successfully");
      navigate("/novels"); // Redirect to the novels list or another page
    } catch (error) {
      notify("error", "Failed to delete novel");
    }
  };

  return (
    <div>
      <button
        className="button"
        onClick={handleDelete}
        style={{ color: "red" }}
      >
        Delete Novel
      </button>
    </div>
  );
};

export default DeleteNovel;
