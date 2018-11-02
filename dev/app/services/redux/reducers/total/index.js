import { ADD_LINE_ITEM } from "../../types";

const defaultTotalState = {
  subtotal: "0.00",
  tax: "0.00",
  total: "0.00",
  taxPercentage: 5
};

const total = (state = defaultTotalState, action) => {
  switch (action.type) {
    case ADD_LINE_ITEM:
      return Object.assign({}, state, action.payload.total);
    default:
      return state;
  }
};

export default total;
