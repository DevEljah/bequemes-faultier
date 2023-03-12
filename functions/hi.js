// domain.netlify/functions/hi
exports.handler = async function () {
  ///////////////////////////
  ///////// API e.g /////////
  const items = [
    { id: 1, name: "dev" },
    { id: 2, name: "max" },
  ];

  return {
    statusCode: 200,
    body: "Hi!",
    // body: JSON.stringify(items), // API e.g
  };
};
