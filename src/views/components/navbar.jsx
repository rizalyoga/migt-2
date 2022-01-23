import { Fragment, useState } from "react";
import { Disclosure, Menu, Transition } from "@headlessui/react";
import { SearchIcon } from "@heroicons/react/outline";
import { useNavigate } from "react-router-dom";
import SearchBar from "./searchBar.jsx";
import unknown from "../../assets/unknown.png";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Navibar() {
  const navigate = useNavigate();
  const [showSearch, setShowSearch] = useState(false);

  const showSearchBar = () => {
    if (showSearch) {
      setShowSearch(false);
    } else {
      setShowSearch(true);
    }
  };

  /* ----------------------------- LOGOUT FUNTION ----------------------------- */

  const logout = () => {
    localStorage.clear();
    navigate("/");
  };

  if (!localStorage.token) {
    return <></>;
  }

  return (
    <Disclosure as="nav" className="bg-gray-800">
      {({ open }) => (
        <>
          <div className="max-w-10xl mx-auto 2xl-px-0 sm:px-0 lg:px-0 xl-px-0">
            <div className="relative flex items-center justify-between h-16 container mx-auto sm:px-8 lg-px-0">
              <div className="flex-1 flex items-center justify-between sm:items-stretch sm:justify-start">
                <div className="flex-shrink-0 flex items-center">
                  {/* <img className="block lg:hidden h-8 w-auto" src="https://tailwindui.com/img/logos/workflow-mark-indigo-500.svg" alt="Workflow" /> */}
                  {/* <img className="hidden lg:block h-8 w-auto" src="https://tailwindui.com/img/logos/workflow-logo-indigo-500-mark-white-text.svg" alt="Workflow" /> */}
                  <p className="block lg:hidden h-8 w-auto cursor-pointer" style={{ fontWeight: "bold", color: "white", fontSize: "1.3rem" }} onClick={() => navigate("/")}>
                    MIG
                  </p>
                  <p className="hidden lg:block h-8 w-auto cursor-pointer" style={{ fontWeight: "bold", color: "white", fontSize: "1.3rem" }} onClick={() => navigate("/")}>
                    Mitramas Infoys Global
                  </p>
                </div>
              </div>
              <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                <button type="button" className="bg-gray-800 p-1 rounded-full text-gray-400 hover:text-white focus:outline-none" onClick={() => showSearchBar()}>
                  <span className="sr-only">Search bar</span>
                  <SearchIcon className="h-6 w-6" aria-hidden="true" />
                </button>

                {/* Profile dropdown */}
                <Menu as="div" className="ml-3 relative">
                  <div>
                    <Menu.Button className="bg-gray-800 flex text-sm rounded-full focus:outline-none focus:ring-offset-2 focus:ring-offset-black-900">
                      <span className="sr-only">Open user menu</span>
                      <img className="h-8 w-8 rounded-full" src={unknown} alt="profile" />
                    </Menu.Button>
                  </div>
                  <Transition
                    as={Fragment}
                    enter="transition ease-out duration-100"
                    enterFrom="transform opacity-0 scale-95"
                    enterTo="transform opacity-100 scale-100"
                    leave="transition ease-in duration-75"
                    leaveFrom="transform opacity-100 scale-100"
                    leaveTo="transform opacity-0 scale-95"
                  >
                    <Menu.Items className="origin-top-right absolute right-0 mt-2 w-48 shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none z-10">
                      <Menu.Item>
                        {({ active }) => (
                          <a href="/" className={classNames(active ? "bg-gray-100" : "", "block px-4 py-2 text-sm text-gray-700")}>
                            Home
                          </a>
                        )}
                      </Menu.Item>
                      <Menu.Item>
                        {({ active }) => (
                          <a href="/add-customer" className={classNames(active ? "bg-gray-100" : "", "block px-4 py-2 text-sm text-gray-700")}>
                            Add Customer
                          </a>
                        )}
                      </Menu.Item>
                      <Menu.Item>
                        {({ active }) => (
                          <a href="#" className={classNames(active ? "bg-gray-100" : "", "block px-4 py-2 text-sm text-gray-700")} onClick={() => logout()}>
                            Sign Out
                          </a>
                        )}
                      </Menu.Item>
                    </Menu.Items>
                  </Transition>
                </Menu>
              </div>
            </div>
          </div>
          {showSearch ? <SearchBar /> : <></>}
        </>
      )}
    </Disclosure>
  );
}
