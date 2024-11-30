import axios from "axios";

const api = axios.create({ //create : tạo
    baseURL: "http://localhost:8000/api",
  });
  export {api};