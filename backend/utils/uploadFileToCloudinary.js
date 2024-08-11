import { cloudinary } from "../cloudinaryConfig.js";

const uploadFileToCloudinary = async (fileBuffer, fileName, novelId) => {
  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      {
        resource_type: "raw",
        public_id: `lnworld/${novelId}/novel_chapters/${fileName}`,
      },
      (error, result) => {
        if (error) return reject(error);
        resolve(result.secure_url);
      }
    );

    stream.end(fileBuffer);
  });
};

export default uploadFileToCloudinary;
