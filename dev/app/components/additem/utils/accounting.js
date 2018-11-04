export const convertToDecimals = num => {
  // Take the num, convert to float, then create string with 2 decimal places
  const stringPriceFloat = parseFloat(num).toFixed(2);

  // Convert string and return float of 2 decimal places
  return parseFloat(stringPriceFloat);
};

export const calculateTotal = (qty, price) => {
  const result = qty * price;

  return result.toFixed(2); // Returns string total with cents
};

export const calculateUpdatedSubtotal = (
  currItemTotal,
  currentSubTotal,
  decrement = false
) => {
  // Take Redux currentSubTotal and currItemTotal
  // Convert inputs to decimals

  const baseSubtotal =
    decrement === true
      ? convertToDecimals(currentSubTotal) - convertToDecimals(currItemTotal)
      : convertToDecimals(currentSubTotal) + convertToDecimals(currItemTotal);

  // Return string total with cents
  return baseSubtotal.toFixed(2);
};

export const calculateSalesTax = (taxPercentage, subTotal) => {
  const taxRate = taxPercentage / 100;
  let baseSalesTax = convertToDecimals(subTotal);

  baseSalesTax = taxRate * baseSalesTax;

  // Return string total with cents, toFixed will round
  return baseSalesTax.toFixed(2);
};

export const calculateGrandTotal = (subTotal, salesTax) => {
  const grandTotal = subTotal + salesTax;

  // Return string total with cents, toFixed will round
  return grandTotal.toFixed(2);
};
