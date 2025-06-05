import axios from "axios";

const authServiceClient = axios.create({
  baseURL: process.env.AUTH_SERVICE_URL || "http://localhost:5000/api/auth",
  timeout: 5000, // Set a timeout for requests
  headers: {
    "Content-Type": "application/json",
  },
  allowAbsoluteUrls: false,
});

export { authServiceClient };
