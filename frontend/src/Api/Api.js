import axios from "axios";
import Swal from "sweetalert2";

const baseURL = axios.create({
  baseURL: process.env.REACT_BASE_URL || "http://localhost:8000/api/v1",
});


baseURL.interceptors.request.use(
  (config) => {
    const mytoken = JSON.parse(localStorage.getItem("access_Token"));
    if (mytoken) {
      config.headers["Authorization"] = `${mytoken}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);


baseURL.interceptors.response.use(
  (response) => response,
  async (error) => {
    // Check if the error is due to an expired token
    if (error.response && (error.response.status === 401 || error.response.status === 498 || error.response.status === 404)) {
      const errorMessage = error.response.data.message;

      if (errorMessage.includes("Token Expired")) {
        const result = await Swal.fire({
          icon: "error",
          title: "Session Timeout",
          text: "Your session has expired. Please log in again.",
          confirmButtonText: "OK",
          cancelButtonText: "Cancel",
          allowOutsideClick: false,
        });

        if (result.isConfirmed) {
          localStorage.removeItem("user");
          localStorage.removeItem("welcomeAlertShown");
          window.location.href = "/login";
        }
      }
    }
    return Promise.reject(error);
  }
)

export default baseURL;