import axios from "axios";
import swal from "sweetalert2";
import allStore from "../index";

const DeleteCustomers = (payload) => {
  const online = window.navigator.onLine;
  const token = localStorage.getItem("token");

  const config = {
    headers: { Authorization: `${token}` },
  };

  return (dispatch) => {
    dispatch(allStore.setLoading(true));
    console.log(payload);
    axios
      .delete(`https://mitramas-test.herokuapp.com/customers`, payload, config)
      .then((data) => {
        swal.fire({
          icon: "success",
          text: `${data.data.message}`,
          button: "false",
        });
      })
      .catch((err) => {
        if (online) {
          console.log(err.response.data);
          console.log("Masuk Error");
          console.log(config);
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
