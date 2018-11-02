const defaultTotalState = {
  subtotal: "0.00",
  tax: "0.00",
  total: "0.00",
  taxPercentage: 5
};

const total = (state = defaultTotalState, action) => {
  switch (action.type) {
    default:
      return state;
  }
};

export default total;
