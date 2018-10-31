const defaultInvoiceState = {
  invoiceItems: [],
  Subtotal: "0.00",
  Tax: "0.00",
  Total: "0.00"
};

const invoice = (state = defaultInvoiceState, action) => {
  switch (action.type) {
    default:
      return state;
  }
};

export default invoice;
