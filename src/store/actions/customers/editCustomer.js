import axios from "axios";
import swal from "sweetalert2";
import allStore from "../index";

const EditCustomers = (payload) => {
  const online = window.navigator.onLine;
  const token = localStorage.getItem("token");

  const config = {
    headers: { Authorization: `${token}` },
  };

  return (dispatch) => {
    dispatch(allStore.setLoading(true));
    axios
      .put(`https://mitramas-test.herokuapp.com/customers`, payload, config)
      .then((data) => {
        swal.fire({
          icon: "success",
          text: `Edit data successfully`,
        });
        dispatch(allStore.SetCustomers(data.data.data));
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

export default EditCustomers;
