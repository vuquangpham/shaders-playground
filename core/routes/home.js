const router = require("express").Router(); // eslint-disable-line

router.get("/", (_, response) => {
  response.render("pages/home", {
    title: "Home",
  });
});

module.exports = router;
