 import axios from "axios";

const upload = async (file) => {
  const data = new FormData();
  data.append("file", file);
  data.append("upload_preset", "bemultim");


  

  try {
   

    const res = await axios.post(
      "https://api.cloudinary.com/v1_1/bemultim/auto/upload",
      data,
      
    );

    const { url } = res.data;
    return url;
  } catch (err) {
    console.log("eeror", err.response.data.error.message);
    if (err.response.data.error.message) {
      // Capture and throw the error message from the Cloudinary API response
      throw new Error(err.response.data.error.message);
    } else {
      // If the Cloudinary API response doesn't contain a message, throw a generic error
      throw new Error("File upload failed. Ensure you have network and file size is below 10.4mb");
    }
  }
};

export default upload;


