import { ADD_LINE_ITEM, DELETE_LINE_ITEM } from "../../types";

const defaultInvoiceState = {
  invoiceItems: {}
};

const invoice = (state = defaultInvoiceState, action) => {
  switch (action.type) {
    case ADD_LINE_ITEM:
      return Object.assign({}, state, {
        invoiceItems: Object.assign(
          {},
          state.invoiceItems,
          action.payload.invoice
        )
      });
    case DELETE_LINE_ITEM:
      return Object.assign({}, state, {
        invoiceItems: Object.assign(
          {},
          state.invoiceItems,
          action.payload.invoice
        )
      });
    default:
      return state;
  }
};

export default invoice;
