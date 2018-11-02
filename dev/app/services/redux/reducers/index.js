import { combineReducers } from "redux";
import invoice from "./invoice";
import total from "./total";

const rootReducer = combineReducers({
  invoice,
  total
});

export default rootReducer;
