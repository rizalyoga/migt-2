const initalState = null;

export default function errorReducers(state = initalState, action) {
  if (action.type === "SET_ERROR") {
    return action.payload;
  }
  return state;
}
