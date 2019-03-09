import client from "./client";

const apiVersion = "v1/";
const authEndpoint = `${apiVersion}auth/login`;
const userEndpoint = `${apiVersion}user`;

export const api = {
  auth: {
    login: data => client.post(authEndpoint, data)
  },
  user: {
    signUp: data => client.post(userEndpoint, data)
  }
};

export default { api };
