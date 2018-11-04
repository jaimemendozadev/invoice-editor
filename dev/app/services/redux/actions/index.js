import { ADD_LINE_ITEM, DELETE_LINE_ITEM } from "../types";

export const addLineItem = payload => ({
  type: ADD_LINE_ITEM,
  payload
});

export const deleteLineItem = payload => ({
  type: DELETE_LINE_ITEM,
  payload
});
