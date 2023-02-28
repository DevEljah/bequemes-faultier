export const formatPrice = (number) => {
  // const newNumber = Intl.NumberFormat("en-US", {
  // style: "currency",
  // currency: "USD", // or == >>;
  return new Intl.NumberFormat("de-DE", {
    style: "currency",
    currency: "EUR",
  }).format(number / 100);
};

export const getUniqueValues = () => {};
