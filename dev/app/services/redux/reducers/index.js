import { combineReducers } from "redux";
import addItem from "./addItem";
import invoice from "./invoice";

const rootReducer = combineReducers({
  addItem,
  invoice
});

export default rootReducer;
