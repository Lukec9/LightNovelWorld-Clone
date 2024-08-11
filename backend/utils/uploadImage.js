import { cloudinary } from "../cloudinaryConfig.js";

const uploadToCloudinary = (buffer, p) => {
  return new Promise((resolve, reject) => {
    cloudinary.uploader
      .upload_stream({ folder: `lnworld/${p}` }, (error, result) => {
        if (error) {
          console.error("Cloudinary upload error:", error);
          reject(error);
        } else {
          resolve(result);
        }
      })
      .end(buffer);
  });
};

export default uploadToCloudinary;
