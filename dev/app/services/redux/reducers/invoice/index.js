const defaultInvoiceState = {
  invoiceItems: [],
  subtotal: "0.00",
  taxRate: 5,
  tax: "0.00",
  total: "0.00"
};

const invoice = (state = defaultInvoiceState, action) => {
  switch (action.type) {
    default:
      return state;
  }
};

export default invoice;
