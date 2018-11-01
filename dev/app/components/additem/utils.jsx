import React from "react";

export const calculateTotal = (qty, price) => {
  const result = qty * price;

  return result.toFixed(2); // Return total with cents
};

export const checkForError = errorMsg => {
  if (errorMsg.length) {
    return <div className="error-msg">{errorMsg}</div>;
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
