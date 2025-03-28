export const numberFormatter = (data: number, decimalNumber = 2) => {
  const options = {
    minimumFractionDigits: decimalNumber,
    maximumFractionDigits: decimalNumber,
  };
  return Number(data || 0).toLocaleString("en", options);
};
