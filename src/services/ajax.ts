import axios from "axios";
import toast from "react-hot-toast";

export type ResponseType = {
  code: number;
  data?: ResponseDataType;
  message?: string;
};

export type ResponseDataType = {
  [key: string]: any;
};

const instance = axios.create({
  baseURL: "https://api.spoonacular.com",
  timeout: 10 * 1000,
});

instance.interceptors.request.use(
  function (config) {
    config.url = config.url?.appendQueryParam(
      "apiKey",
      "25a54ebd06604ee4bbf74d64931480fb"
    );
    return config;
  },
  function (error) {
    const { message } = error;
    if (message) {
      toast.error(message);
    }
    return Promise.reject(error);
  }
);

instance.interceptors.response.use(
  (res) => res.data,
  function (error) {
    const { message } = error.response.data;
    if (message) {
      toast.error(message);
    }
    return Promise.reject(error);
  }
);

export default instance;
