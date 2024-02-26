/* eslint-disable no-unused-vars */
const errorHandler = (error, _, response, _next) => {
  response.render("pages/404", {
    title: "OOPS! \n" + "404 PAGE NOT FOUND",
    message:
      "The page you’re looking for does not exist or has been removed.\n" +
      'You can proceed to our <a href="/">home page</a>.',
  });
};

module.exports = errorHandler;
