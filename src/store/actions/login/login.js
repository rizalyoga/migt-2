import axios from "axios";
import allStore from "../index.js";

export const UserLogin = (payload) => {
  localStorage.clear();
  const online = window.navigator.onLine;

  return (dispatch) => {
    dispatch(allStore.setLoading(true));
    axios
      .post("https://mitramas-test.herokuapp.com/auth/login", payload)
      .then((response) => {
        localStorage.setItem("token", response.data.access_token);
        window.location.reload();
      })
      .catch((err) => {
        if (online) {
          dispatch(allStore.setError(err.response.data.error));
        } else if (!online) {
          dispatch(allStore.setError("your Internet is offline"));
        }
      })
      .finally((_) => dispatch(allStore.setLoading(false)));
  };
};
