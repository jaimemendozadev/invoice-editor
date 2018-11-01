import React from "react";

export const calculateTotal = (qty, price) => {
  const result = qty * price;

  return result.toFixed(2); // Return total with cents
};

export const checkForErrors = errorMsgs => {
  const errorKeys = Object.keys(errorMsgs);

  console.log("errorKeys ", errorKeys);

  if (errorKeys.length) {
    return errorKeys.map((errorKey, idx) => (
      <div key={`${errorKey}-${idx}`} className="error-msg">
        {errorMsgs[errorKey]}
      </div>
    ));
  }

  return null;
};

export const createLineItem = state => {
  const { item, price } = state;
  const stateKeys = Object.keys(state);

  // Create lineItem object first
  const lineItem = {};

  stateKeys.forEach(key => {
    lineItem[key] = state[key];
  });

  // Prep Redux payload with unique payloadKey for Invoice view
  const payload = {};
  const payloadKey = `${item}-${price}`;
  payload[payloadKey] = lineItem;

  return payload;
};