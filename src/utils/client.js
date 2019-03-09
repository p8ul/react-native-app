import axios from "axios";
import { authUserHeader } from "./auth";

const client = axios.create({
  baseURL: "http://0.0.0.0:3000/api/",
  headers: {
    "Content-Type": "application/json",
    ...authUserHeader()
  }
});

client.interceptors.response.use(
  response => {
    return response;
  },
  error => {
    let err;
    if (error.response) {
      switch (error.response.status) {
        case 401:
          // clear user token on local storage
          console.warn("user is not authorized");
          break;
        case 403:
          // deal with authorization errors
          break;
        default:
          break;
      }
    } else {
      // deal with network errors
      // set a sensible message to be toasted by the consumer
      err = {
        response: {
          data: { message: "Please check your network and try again." }
        }
      };
    }
    return Promise.reject(err || error);
  }
);

export default client;
