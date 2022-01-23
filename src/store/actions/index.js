import setLoading from "./setLoading";
import setError from "./setError";
import { UserLogin } from "./login/login.js";
import { GetCustomers, SetCustomers } from "./customers/getCustomers.js";
import AddCustomer from "./customers/addCustomer.js";
import DeleteCustomer from "./customers/deleteCustomer.js";
import EditCustomer from "./customers/editCustomer.js";
import SearchCustomer from "./customers/searchCustomer.js";
import listCustomer from "./list/listActive.js";

const allStore = {
  setLoading,
  setError,
  UserLogin,
  GetCustomers,
  SetCustomers,
  AddCustomer,
  DeleteCustomer,
  EditCustomer,
  SearchCustomer,
  listCustomer,
};

export default allStore;
