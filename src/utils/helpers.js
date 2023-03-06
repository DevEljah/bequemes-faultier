export const formatPrice = (number) => {
  // const newNumber = Intl.NumberFormat("en-US", {
  // style: "currency",
  // currency: "USD", // or == >>;
  return new Intl.NumberFormat("de-DE", {
    style: "currency",
    currency: "EUR",
  }).format(number / 100);
};

export const getUniqueValues = (data, type) => {
  let unique = data.map((item) => item[type]); //item[type = accessing the property dynamically
  // console.log(unique);

  // getting colors wich is "Array" (array of arrays)
  if (type === "colors") {
    unique = unique.flat();
  }
  return ["all", ...new Set(unique)];
};
