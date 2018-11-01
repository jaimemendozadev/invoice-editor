import { ADD_LINE_ITEM } from "../../types";

const defaultInvoiceState = {
  invoiceItems: {},
  subtotal: "0.00",
  taxRate: 5,
  tax: "0.00",
  total: "0.00"
};

const invoice = (state = defaultInvoiceState, action) => {
  switch (action.type) {
    case ADD_LINE_ITEM:
      return Object.assign({}, state, {
        invoiceItems: Object.assign({}, state.invoiceItems, action.payload)
      });
    default:
      return state;
  }
};

export default invoice;
