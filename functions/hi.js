// .netlify/functions/hi
exports.handler = async function () {
  return {
    statusCode: 200,
    body: "Hi!",
  };
};
