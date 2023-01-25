import axios from "axios";
import "dotenv/config";
const apiConfig = axios.create({
  baseURL: process.env.BUSINESS_UNIT_URL,
  https: true,
});

apiConfig.defaults.headers = {
  "Cache-Control": "no-cache",
  Pragma: "no-cache",
  Expires: "0",
};

export default apiConfig;
