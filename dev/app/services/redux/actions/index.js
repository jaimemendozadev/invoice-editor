import { ADD_LINE_ITEM } from "../types";

export const addLineItem = lineItem => ({
  type: ADD_LINE_ITEM,
  payload: lineItem
});
