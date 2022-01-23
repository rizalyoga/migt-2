// import { useNavigate } from "react-router-dom";
import Home from "./index.jsx";
import { useDispatch, useSelector } from "react-redux";
import allStore from "../../store/actions/index";
import { useState } from "react";

const AddCustomers = () => {
  const dispatch = useDispatch();

  const loading = useSelector(({ loading }) => loading);
  const error = useSelector(({ error }) => error);

  const [formState, setFormState] = useState({
    name: "",
    address: "",
    country: "",
    phone_number: "",
    job_title: "",
    status: "",
  });

  /* --------------------------------- Event Handler -------------------------------- */
  const handlerError = () => {
    dispatch(allStore.setError(null));
  };

  const changeValue = (event) => {
    setFormState({
      ...formState,
      [event.target.name]: event.target.value,
    });
  };

  const submitHandler = (event) => {
    event.preventDefault();
    const newState = formState;
    newState.status === "true" ? (newState.status = true) : (newState.status = false);
    dispatch(allStore.AddCustomer(newState));
  };

  if (!localStorage.token) {
    return <Home />;
  }

  return (
    <div style={{ background: "#9F78DD" }} className="dispay-background flex justify-center items-center">
      <div className="container mx-auto px-8 py-16 container-form-customer">
        {/* <button className="inline-flex items-center justify-center mb-8 px-3 py-2 border border-transparent text-base font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none" onClick={() => navigate("/")}>
        Back to Home
      </button> */}
        <div className="flex justify-center items-center">
          <div className="container-form screen-tab">
            <h3 className="lg:text-3xl font-bold text-center text-white">New Customer</h3>

            <form className="px-10 py-2 w-full form-customer " onSubmit={submitHandler}>
              <label htmlFor="name" className="sr-only">
                name
              </label>
              <input
                className="my-3 appearance-none text-center rounded-none relative block w-full py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                id="name"
                name="name"
                type="text"
                placeholder="Customer Name"
                autoComplete="off"
                onChange={changeValue}
                onFocus={() => handlerError()}
                required
              />
              <label htmlFor="phone" className="sr-only">
                Customer Phone
              </label>
              <input
                className="my-3 appearance-none text-center rounded-none relative block w-full py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                id="phone"
                name="phone_number"
                type="tel"
                pattern="[0-9]{4}-[0-9]{4}-[0-9]{4}"
                placeholder="0812-1078-1238"
                // autoComplete="off"
                onChange={changeValue}
                onFocus={() => handlerError()}
                required
              />
              <label htmlFor="address" className="sr-only">
                address
              </label>
              <input
                className="my-3 appearance-none text-center rounded-none relative block w-full py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                id="address"
                name="address"
                type="text"
                placeholder="Customer Address"
                autoComplete="off"
                onChange={changeValue}
                onFocus={() => handlerError()}
                required
              />
              <label htmlFor="country" className="sr-only">
                country
              </label>
              <input
                className="my-3 appearance-none text-center rounded-none relative block w-full py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                id="country"
                name="country"
                type="text"
                placeholder="Customer Country"
                autoComplete="off"
                onChange={changeValue}
                onFocus={() => handlerError()}
                required
              />
              <label htmlFor="job" className="sr-only">
                job
              </label>
              <input
                className="my-3 appearance-none text-center rounded-none relative block w-full py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                id="job"
                name="job_title"
                type="text"
                placeholder="Customer Job"
                autoComplete="off"
                onChange={changeValue}
                onFocus={() => handlerError()}
                required
              />
              <p>status :</p>
              <div className="status">
                <input className="my-4" id="status" name="status" type="radio" value="true" onChange={changeValue} onFocus={() => handlerError()} required />
                <label htmlFor="status"> Active </label>
                <input className="my-4" id="status" name="status" type="radio" value="false" onChange={changeValue} onFocus={() => handlerError()} required />
                <label htmlFor="status"> Not Active </label>
              </div>

              <p className="my-3 text-center text-red-500">{error ? <span>Error : {error}</span> : <></>}</p>
              <input
                type="submit"
                className="cursor-pointer my-3 text-center rounded-none relative block w-full py-2 border border-gray-300 text-white hover:bg-purple-900 focus:outline-none focus:ring-white-500 focus:border-white-500 focus:z-10 md:text-md"
                value={loading ? "please wait..." : "Submit"}
              />
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddCustomers;
