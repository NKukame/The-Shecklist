import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true,
});

const uploadImage = async (imageData) => {
  try {
    // Cloudinary needs a valid base64 string *with* prefix, or it fails.
    if (!imageData.startsWith("data:image")) {
      throw new Error("Invalid image format. Expected base64 data URL.");
    }

    const result = await cloudinary.uploader.upload(imageData, {
      folder: "artists", // optional: organize your uploads
      use_filename: true,
      unique_filename: false,
      overwrite: true,
    });

    return result.secure_url; // use secure_url instead of url
  } catch (error) {
    console.error("Cloudinary upload error:", error);
    throw error;
  }
};

export default uploadImage;
