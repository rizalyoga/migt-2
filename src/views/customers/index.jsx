import LoginPage from "../loginPage/loginPage.jsx";
import List from "../components/list.jsx";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useDispatch } from "react-redux";
import allStore from "../../store/actions/index";

const Customers = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [disableNA, setDisabledNA] = useState(false);
  const [disableAC, setDisabledAC] = useState(false);

  /* ----------------------- List By notActive Customers ---------------------- */
  const [active, setActive] = useState(false);
  const activeFilter = () => {
    if (active) {
      setActive(false);
      dispatch(allStore.GetCustomers());
    } else {
      setActive(true);
      dispatch(allStore.listCustomer(active));
    }
  };

  /* ----------------------- List By Active Customers ---------------------- */
  const [notActive, setNotActive] = useState(true);
  const notActiveFilter = () => {
    if (notActive) {
      setNotActive(false);
      dispatch(allStore.listCustomer(notActive));
    } else {
      setNotActive(true);
      dispatch(allStore.GetCustomers());
    }
  };

  const lockActive = () => {
    if (active) {
      setDisabledNA(!disableNA);
    } else {
      setDisabledNA(disableNA);
    }
  };

  const lockNotActive = () => {
    if (notActive) {
      setDisabledAC(!disableAC);
    } else {
      setDisabledAC(disableAC);
    }
  };

  if (!localStorage.token) {
    return <LoginPage />;
  }

  return (
    <div>
      <div className="container mx-auto px-8 xl-px-0 2xl-px-0 py-8">
        <button className="inline-flex items-center justify-center mb-8 px-3 py-2 border border-transparent text-base font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none" onClick={() => navigate("/add-customer")}>
          Add Customer
        </button>
        <div className="flex ">
          <div className="max-w-lg">
            <link rel="stylesheet" href="https://unpkg.com/@themesberg/flowbite@1.1.0/dist/flowbite.min.css" />

            <label htmlfor="toggle-active" className="flex items-center cursor-pointer relative mb-4">
              <input
                type="checkbox"
                disabled={disableAC}
                id="toggle-active"
                className="sr-only"
                onClick={() => {
                  activeFilter();
                  lockActive();
                }}
              />
              <div className="toggle-bg bg-gray-200 border-2 border-gray-200 h-6 w-11 rounded-full"></div>
              <span className="ml-3 text-gray-900 text-sm font-medium">
                List by <span className="text-red-700 font-bold">Not Active</span> Customer
              </span>
            </label>

            <label htmlfor="toggle-active" className="flex items-center cursor-pointer relative mb-4">
              <input
                type="checkbox"
                id="toggle-active"
                disabled={disableNA}
                className="sr-only"
                onClick={() => {
                  notActiveFilter();
                  lockNotActive();
                }}
              />
              <div className="toggle-bg bg-gray-200 border-2 border-gray-200 h-6 w-11 rounded-full"></div>
              <span className="ml-3 text-gray-900 text-sm font-medium">
                List by <span className="text-green-700 font-bold">Active</span> Customer
              </span>
            </label>
          </div>
        </div>
        <List />
      </div>
    </div>
  );
};

export default Customers;
