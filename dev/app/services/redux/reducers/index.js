import { combineReducers } from "redux";
import addItem from "./addItem";
import invoice from "./invoice";
import total from "./total";

const rootReducer = combineReducers({
  addItem,
  invoice,
  total
});

export default rootReducer;
