import React from "react";

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

const createErrorObject = errorType =>
  Object.assign({}, { errorMsgs: inputErrors[errorType] });

export const calculateTotal = (qty, price) => {
  const result = qty * price;

  return result.toFixed(2); // Returns string total with cents
};

// export const checkForErrors = errorMsgs => {
//   const errorKeys = Object.keys(errorMsgs);

//   if (errorKeys.length) {
//     return errorKeys.map((errorKey, idx) => (
//       <div key={`${errorKey}-${idx}`} className="error-msg">
//         {errorMsgs[errorKey]}
//       </div>
//     ));
//   }

//   return null;
// };

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
    return createErrorObject("item");
  }

  if (parseInt(qty, 10) <= 0) {
    return createErrorObject("qty");
  }

  if (parseFloat(price) <= 0) {
    return createErrorObject("price");
  }

  return false;
};
