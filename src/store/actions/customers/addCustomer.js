import axios from "axios";
import swal from "sweetalert2";
import allStore from "../index";
import { baseURL } from "./getCustomers";

const AddCustomers = (payload) => {
  const online = window.navigator.onLine;
  const token = localStorage.getItem("token");

  const config = {
    headers: { Authorization: `${token}` },
  };

  return (dispatch) => {
    dispatch(allStore.setLoading(true));
    axios
      .post(baseURL, payload, config)
      .then((data) => {
        swal.fire({
          icon: "success",
          text: `Added data successfully`,
        });
      })
      .catch((err) => {
        if (online) {
          dispatch(allStore.setError(err.response.data.error));
          swal.fire({
            icon: "error",
            text: `${err.response.data.error}`,
          });
          console.log(err.response);
        } else {
          console.log("your internet offline");
        }
      })
      .finally((_) => dispatch(allStore.setLoading(false)));
  };
};

export default AddCustomers;
