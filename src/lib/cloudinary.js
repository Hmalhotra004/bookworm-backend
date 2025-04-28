import { v2 as cloudinary } from "cloudinary";
import "dotenv/config";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  // secure: true,
  // api_endpoint: "https://api.cloudinary.com/v1_1",
  // upload_prefix: "https://res.cloudinary.com",
  // resource_type: "auto",
  // type: "upload",
  // overwrite: true,
  // invalidate: true,
  // eager_async: true,
  // eager_notification_url: process.env.CLOUDINARY_NOTIFICATION_URL,
});

export default cloudinary;
