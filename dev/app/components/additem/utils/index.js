import {
  convertToDecimals,
  calculateTotal,
  calculateSubtotal,
  calculateSalesTax,
  calculateGrandTotal
} from "./accounting";

export {
  convertToDecimals,
  calculateTotal,
  calculateSubtotal,
  calculateSalesTax,
  calculateGrandTotal
};

export const defaultState = {
  qty: 0,
  price: "0.00",
  total: "0.00",
  item: "Description",
  errorMsgs: {}
};

export const inputErrors = {
  qty: {
    invalidQty: "Please enter a valid quantity."
  },
  price: {
    invalidPrice: "Please enter a valid price."
  },
  item: {
    invalidItem: "Please enter a valid item description."
  }
};

export const createErrorObject = (stateResets = {}, errorType) =>
  Object.assign({}, stateResets, { errorMsgs: inputErrors[errorType] });

export const createLineItem = state => {
  const { item, price } = state;
  const stateKeys = Object.keys(state);

  // Create lineItem object first
  const lineItem = {};

  stateKeys.forEach(key => {
    if (key !== "errorMsgs") {
      lineItem[key] = state[key];
    }
  });

  // Prep Redux payload with unique payloadKey for Invoice view
  const payload = {};
  const payloadKey = `${item}-${price}`;
  payload[payloadKey] = lineItem;

  return payload;
};

export const checkForFormErrors = (qty, price, item) => {
  if (item === "Description") {
    return createErrorObject({}, "item");
  }

  if (parseInt(qty, 10) <= 0) {
    return createErrorObject({}, "qty");
  }

  if (parseFloat(price) <= 0) {
    return createErrorObject({}, "price");
  }

  return false;
};

export const prepGrandTotal = (itemTotal, grandTotal, taxPercentage) => {
  // Returned strings get convertedToDecimals when passed as args

  const subTotal = calculateSubtotal(itemTotal, grandTotal);

  const salesTax = calculateSalesTax(
    taxPercentage,
    convertToDecimals(subTotal)
  );

  const updatedGrandTotal = calculateGrandTotal(
    convertToDecimals(subTotal),
    convertToDecimals(salesTax)
  );

  return { subtotal: subTotal, tax: salesTax, total: updatedGrandTotal };
};
