export const calculateTotal = (qty, price) => {
  const result = qty * price;

  return result.toFixed(2);
};

export const createLineItem = state => {
  const { item, price } = state;
  const stateKeys = Object.keys(state);

  const lineItem = {};

  stateKeys.forEach(key => {
    lineItem[key] = state[key];
  });

  const payload = {};
  const payloadKey = `${item}-${price}`;
  payload[payloadKey] = lineItem;

  return payload;
};
