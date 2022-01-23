const initialState = [];

const CustomersReducer = (state = initialState, action) => {
  if (action.type === "SET_CUSTOMERS") {
    // console.log("Data Customer :", action.payload);
    return action.payload;
  }

  return state;
};

export default CustomersReducer;
