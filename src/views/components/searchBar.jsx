import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import debounce from "lodash.debounce";
import { useNavigate } from "react-router-dom";
import allStore from "../../store/actions/index";

const SearchBar = () => {
  const dispatch = useDispatch();
  const [term, setTerm] = useState("");
  const navigate = useNavigate();

  /* -------------------------------- SET TERM -------------------------------- */
  const changeValue = debounce((event) => {
    event.persist();
    setTerm(event.target.value);
  }, 500);

  /* ------------------------ DEBOUNCE REALTIME SEARCH ------------------------ */

  useEffect(() => {
    console.log(term);
    if (term && term.length > 0) {
      dispatch(allStore.SearchCustomer(term));
    }
  }, [term, dispatch]);

  /* -------------------------- DISPATCH SEARCH DATA -------------------------- */
  const submitHandler = (e) => {
    e.preventDefault();
    navigate("/");
    setTimeout(() => {
      dispatch(allStore.SearchCustomer(term));
    }, 100);
  };

  return (
    <>
      {/* /* ------------------------------- Search bar -------------------------------  */}
      <div className="relative w-full bg-white shadow-xl " id="search-content">
        <div className="container mx-auto py-4 text-black">
          <form onSubmit={submitHandler}>
            <input
              id="searchfield"
              type="search"
              placeholder="Search..."
              autoFocus="autofocus"
              className="w-full text-grey-800 transition outline-none border-none focus:outline-none focus:border-transparent px-8 appearance-none leading-normal text-xl lg:text-2xl"
              onChange={changeValue}
              autoComplete="off"
            />
          </form>
        </div>
      </div>
    </>
  );
};

export default SearchBar;
