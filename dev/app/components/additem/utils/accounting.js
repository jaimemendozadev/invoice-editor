export const formatPrice = price => {
  // Take the price, convert to float, then create string with 2 decimal places
  const stringPriceFloat = parseFloat(price).toFixed(2);

  // Convert string and return float of 2 decimal places
  return parseFloat(stringPriceFloat);
};

export const calculateTotal = (qty, price) => {
  const result = qty * price;

  return result.toFixed(2); // Returns string total with cents
};
