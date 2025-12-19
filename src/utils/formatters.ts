// Utility functions for formatting

export const formatPrice = (price: number | undefined | null): string => {
  if (price === undefined || price === null || isNaN(price)) {
    return '0';
  }
  return price.toFixed(0);
};

export const formatCurrency = (amount: number | undefined | null): string => {
  const price = formatPrice(amount);
  return `₹${price}`;
};
