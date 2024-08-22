import axiosInstance from "../axios";

export const createNovel = data => {
  return axiosInstance.post("/novels", data);
};

export const getNovelById = id => {
  return axiosInstance.get(`/novels/novel`, { params: { query: id } });
};

export const updateNovel = (id, data) => {
  return axiosInstance.put(`/novels/${id}`, data);
};
export const deleteNovel = id => {
  return axiosInstance.delete(`/novels/${id}`);
};

export const addChaptersToNovel = (novelId, formData) => {
  return axiosInstance.post(`/novels/${novelId}/chapters`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};
