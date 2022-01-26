import axios from "axios";
import allStore from "../index.js";
import { baseURL } from "./getCustomers";

const SearchCustomer = (payload) => {
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
        const dataSearch = data.data.data.filter((x) => x.name.toLowerCase().includes(payload.toLowerCase()));
        dispatch(allStore.SetCustomers(dataSearch));
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

export default SearchCustomer;
