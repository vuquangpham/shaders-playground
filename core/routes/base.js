const router = require("express").Router(); // eslint-disable-line

// pages
const PAGES = require("../../pages");

router.get("/:base", (request, response, next) => {
  const base = request.params.base;

  // not exist base
  if (!base) {
    return next(new Error("Not found the base"));
  }

  const baseResult = PAGES.find((page) => page.base === base);

  // not found the base
  if (!baseResult) {
    return next(new Error("Found the base but doesn't exist"));
  }

  // render the first page
  const result = baseResult.pages[0];

  if (request.url.slice(-1) === "/") {
    return response.redirect(`${result.id}`);
  }
  response.redirect(`${base}/${result.id}`);
});

module.exports = router;
