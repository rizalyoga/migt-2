import axios from "axios";
import allStore from "../index.js";

export const baseURL = `https://mitramas-test.herokuapp.com/customers`;

export const GetCustomers = (payload) => {
  const online = window.navigator.onLine;
  const token = localStorage.getItem("token");

  const config = {
    headers: { Authorization: `${token}` },
  };

  return (dispatch) => {
    dispatch(allStore.setLoading(true));
    axios
      .get(baseURL, config)
      .then((data) => {
        if (!payload) {
          const sortList = data.data.data.sort((a, b) => a.name.localeCompare(b.name));
          dispatch(SetCustomers(sortList));
        } else {
          const filterId = data.data.data.find((x) => x.id === payload);
          dispatch(SetCustomers(filterId));
        }
      })
      .catch((err) => {
        if (online) {
          console.log(err.response);
        } else {
          console.log("your internet offline");
        }
      })
      .finally((_) => dispatch(allStore.setLoading(false)));
  };
};

export const SetCustomers = (payload) => {
  return {
    type: "SET_CUSTOMERS",
    payload,
  };
};
