import store from "../store";
import axios from "axios";
import { clearCurrentUser } from "../store/actions/user";
import { useHistory } from "react-router-dom";
import { BASE_API_URL } from "../common/constants";
import { history } from "../common/history";

export const getUserRole = () => {
  const currentUser = store.getState().user;
  return currentUser.role;
};

export const authHeader = () => {
  const currentUser = store.getState().user;

  return {
    "Content-Type": "application/json",
    "Authorization": `Bearer ${currentUser?.token}`,
  };
};

export function handleRequestAuthorizationHeader(){
axios.interceptors.request.use(function (config) {
  const currentUser = store.getState().user;
  config.headers.Authorization = `Bearer ${currentUser?.token}`;
   
  return config;
});
}

export function handleResponseWithLoginCheck() {
  axios.interceptors.response.use(
    (response) => response,
    (error) => {
      const currentUser = store.getState().user;
      const isLoggedIn = currentUser?.token;
      const status = error?.response?.status;

      if (isLoggedIn && [401, 403].includes(status)) {
        store.dispatch(clearCurrentUser());
        history.push('/login');
      }

      return Promise.reject(error);
    }
  );
}