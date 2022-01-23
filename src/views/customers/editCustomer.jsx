import Home from "./index.jsx";
import { useDispatch, useSelector } from "react-redux";
import allStore from "../../store/actions/index";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import swal from "sweetalert2";

const EditCustomers = () => {
  const dispatch = useDispatch();

  const loading = useSelector(({ loading }) => loading);
  const error = useSelector(({ error }) => error);
  const dataCustomer = useSelector(({ customers }) => customers);
  const { id } = useParams();

  const [formState, setFormState] = useState({
    name: "",
    address: "",
    country: "",
    phone_number: "",
    job_title: "",
    status: "",
  });

  /* ---------------------------- GET DATA CUSTOMER --------------------------- */

  useEffect(() => {
    dispatch(allStore.GetCustomers(+id));
  }, [dispatch]);

  useEffect(() => {
    if (dataCustomer) {
      setFormState(dataCustomer);
    }
  }, [dataCustomer]);

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
    swal
      .fire({
        text: `Are You Sure Want to Edit Data ?`,
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes",
      })
      .then((result) => {
        if (result.isConfirmed) {
          const newState = formState;
          newState.status === "true" ? (newState.status = true) : (newState.status = false);
          dispatch(allStore.EditCustomer(newState));
        }
      });
  };

  if (!localStorage.token) {
    return <Home />;
  }

  return (
    <div style={{ background: "#9F78DD" }} className="dispay-background flex justify-center items-center">
      <div className="container mx-auto px-8 py-16 container-form-customer">
        <div className="flex justify-center items-center">
          <div className="container-form screen-tab">
            <h3 className="mb-2 pt-5 lg:text-3xl font-bold text-center text-white">Edit Customer</h3>

            <form className="px-10 py-2 w-full form-customer" onSubmit={submitHandler}>
              <label htmlFor="name" className="sr-only">
                name
              </label>
              <input
                className="my-3 appearance-none text-center rounded-none relative block w-full py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                id="name"
                name="name"
                type="text"
                placeholder={dataCustomer.name}
                autoComplete="off"
                value={formState.name}
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
                // pattern="[0-9]{4}-[0-9]{4}-[0-9]{14}"
                placeholder={dataCustomer.phone_number}
                // autoComplete="off"
                value={formState.phone_number}
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
                placeholder={dataCustomer.address}
                autoComplete="off"
                value={formState.address}
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
                placeholder={dataCustomer.country}
                autoComplete="off"
                value={formState.country}
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
                placeholder={dataCustomer.job_title}
                autoComplete="off"
                value={formState.job_title}
                onChange={changeValue}
                onFocus={() => handlerError()}
                required
              />
              <p className="text-white">status : {formState.status === true ? <>Active</> : <>Not Active</>}</p>
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

export default EditCustomers;
