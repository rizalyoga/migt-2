const initialState = false;

export default function loadingReducer(state = initialState, action) {
  if (action.type === "SET_LOADING") {
    return action.payload;
  }
  return state;
}
