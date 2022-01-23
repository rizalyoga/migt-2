import unknown from "../../assets/unknown.png";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import allStore from "../../store/actions";
import swal from "sweetalert2";
import "./listCustomer.css";

const List = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const people = useSelector(({ customers }) => customers);
  const loading = useSelector(({ loading }) => loading);

  let number = 0;

  /* ---------------------------- GET ALL CUSTOMERS --------------------------- */
  useEffect(() => {
    dispatch(allStore.GetCustomers());
  }, [dispatch]);

  /* ------------------------------ EDIT CUSTOMER ----------------------------- */
  const goToEditPage = (id) => {
    navigate(`/edit/${id}`);
  };

  /* ----------------------------- DELETE HANDLER ----------------------------- */

  const deleteConfirmation = (e, name, id) => {
    swal
      .fire({
        text: `Are you sure want to Delete ${name}`,
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!",
      })
      .then((result) => {
        e.preventDefault();
        if (result.isConfirmed) {
          const idCustomer = { id: id };
          dispatch(allStore.DeleteCustomer(idCustomer));
        }
      });
  };

  return (
    <div className="list-customer flex flex-col flex-wrap w-full">
      <div className="my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div className="py-2 align-middle inline-block min-w-full ">
          <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-sm">
            {loading ? (
              <p className="text-center">Please Wait...</p>
            ) : (
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider text-center">
                      No
                    </th>
                    <th scope="col" className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider text-center">
                      Name
                    </th>
                    <th scope="col" className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider text-center">
                      Address
                    </th>
                    <th scope="col" className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider text-center">
                      Job
                    </th>
                    <th scope="col" className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider text-center">
                      Status
                    </th>
                    <th scope="col" className="relative px-6 py- text-xs font-medium text-gray-500 uppercase tracking-wider3">
                      Action
                      {/* <span className="sr-only">Edit</span>
                      <span className="sr-only">Delete</span> */}
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {people.map((person) => (
                    <tr className="cursor-pointer hover:bg-violet-200" key={person.id}>
                      <td className="px-6 py-3 text-center text-gray-500">{number >= 0 ? (number += 1) : <></>} </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center">
                          <div className="flex-shrink-0 h-10 w-10">
                            <img className="h-10 w-10 rounded-full" src={unknown} alt="" />
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900">{person.name}</div>
                            <div className="text-sm text-gray-500">{person.phone_number}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-1 py-4 text-sm text-gray-500 text-center">
                        <div className="text-sm font-medium text-gray-900">{person.address}</div>
                        <div className="text-sm text-gray-500">{person.country}</div>
                      </td>
                      <td className="px-1 py-4 text-sm text-gray-500 text-center">{person.job_title}</td>
                      <td className="px-1 py-4 text-center">
                        {person.status ? (
                          <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-500 text-white">Active</span>
                        ) : (
                          <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-500 text-white">Not Active</span>
                        )}
                      </td>
                      <td className="px-3 py-4 text-right text-sm font-medium text-center">
                        <a href="#" className="text-indigo-600 hover:text-indigo-900 px-1" onClick={() => goToEditPage(person.id)}>
                          Edit
                        </a>
                        <a href="#" className="text-indigo-600 hover:text-indigo-900 px-1" onClick={(event) => deleteConfirmation(event, person.name, person.id)}>
                          Delete
                        </a>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default List;
