export const calculateTotal = (quantity, price) => {
  const result = quantity * price;

  return result.toFixed(2);
};
