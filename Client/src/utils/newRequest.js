import axios from "axios";

const newRequest = axios.create({
  //baseURL: "http://localhost:8800/api",
  baseUrl: "https://phaxnetgigs.onrender.com/api",
  withCredentials: true,
});

export default newRequest;