import axios from "axios";
import allStore from "../index.js";

const ListActiveCustomers = (payload) => {
  const online = window.navigator.onLine;
  const token = localStorage.getItem("token");

  const config = {
    headers: { Authorization: `${token}` },
  };

  return (dispatch) => {
    dispatch(allStore.setLoading(true));
    axios
      .get(`https://mitramas-test.herokuapp.com/customers`, config)
      .then((data) => {
        if (payload === false) {
          const filterNotActive = data.data.data.filter((x) => x.status === false);
          dispatch(allStore.SetCustomers(filterNotActive));
        } else {
          const filterActive = data.data.data.filter((x) => x.status === true);
          dispatch(allStore.SetCustomers(filterActive));
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

export default ListActiveCustomers;
