 import axios from "axios";

const upload = async (file) => {
  const data = new FormData();
  data.append("file", file);
  data.append("upload_preset", "bemultim");

  try {
    const res = await axios.post(
      "https://api.cloudinary.com/v1_1/bemultim/image/upload",
      data
    );

    const { url } = res.data;
    return url;
  } catch (err) {
    throw new Error("File upload failed"); // Throw an error if upload fails
  }
};

export default upload;


