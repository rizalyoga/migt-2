import axios from "axios";
import swal from "sweetalert2";
import allStore from "../index";

const DeleteCustomers = (payload) => {
  const online = window.navigator.onLine;
  const token = localStorage.getItem("token");

  return (dispatch) => {
    dispatch(allStore.setLoading(true));
    axios
      .delete(`https://mitramas-test.herokuapp.com/customers`, {
        headers: {
          Authorization: `${token}`,
        },
        data: payload,
      })
      .then((data) => {
        swal.fire({
          icon: "success",
          text: `${data.data.message}`,
          button: "false",
        });
        dispatch(allStore.GetCustomers());
      })
      .catch((err) => {
        if (online) {
          swal.fire({
            icon: "error",
            text: `${err.response.data}`,
          });
        } else {
          console.log("your internet offline");
        }
      })
      .finally((_) => dispatch(allStore.setLoading(false)));
  };
};

export default DeleteCustomers;
