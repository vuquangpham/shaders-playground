const router = require("express").Router(); // eslint-disable-line

// pages
const PAGES = require("../../pages");

router.get("/:base/:id", (request, response, next) => {
  const base = request.params.base;
  const id = request.params.id;

  // not exist base or id
  if (!base || !id) {
    return next(new Error("Not found base and id"));
  }

  const baseResult = PAGES.find((page) => page.base === base);
  const pageResult = baseResult.pages.find((page) => page.id === id);

  // not found the base
  if (!baseResult) {
    return next(new Error("Found the base but doesn't exist"));
  }

  // not found the ID
  if (!pageResult) {
    return next(new Error("Found the base but ID doesn't exist"));
  }

  response.render(`${base}/${pageResult.id}`, {
    title: pageResult.title,
    base: base,
    pageId: pageResult.id,
    pageTitle: base[0].toUpperCase() + base.substring(1), // capitalize text
  });
});

module.exports = router;
