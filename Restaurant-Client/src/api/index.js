import axios from "axios";


const api = axios.create({ //create : tạo
  // baseURL: "http://localhost/datn/Restaurant_server/public/api",
    // baseURL: "http://127.0.0.1:8000/api",
    baseURL: "https://admin.hightfiverestaurant.store/api",
    headers: {
      "Content-Type": "application/json",
    },
  });
  export {api};

  // url hình ảnh
// const url = "http://127.0.0.1:8000";
const url = "https://admin.hightfiverestaurant.store/";


export {url};
