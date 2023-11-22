import axios from "axios";
import toast from "react-hot-toast";

const apiUrl = process.env.REACT_APP_NUTRITION_URL;
const api_key = process.env.REACT_APP_API_KEY;

export type ResponseType = {
  code: number;
  data?: ResponseDataType;
  message?: string;
};

export type ResponseDataType = {
  [key: string]: any;
};

const instance = axios.create({
  baseURL: apiUrl,
});

instance.interceptors.request.use(
  function (config) {
    config.url = config.url?.appendQueryParam("apiKey", api_key || "");
    return config;
  },
  function (error) {
    const { message: origin_message, response } = error;
    const { message } = response.data;
    if (message || origin_message) {
      toast.error(message || origin_message);
    }
    return Promise.reject(error);
  }
);

instance.interceptors.response.use(
  (res) => res.data,
  function (error) {
    const { message: origin_message, response } = error;
    const { message } = response.data;
    if (message || origin_message) {
      toast.error(message || origin_message);
    }
    return Promise.reject(error);
  }
);

export default instance;
