const { createPagesPrototype } = require("./core/utils/utils");
module.exports = createPagesPrototype([
  {
    title: "The Book of Shaders",
    base: "book-of-shaders",
    pages: [],
  },
  {
    title: "Three.js Journey",
    base: "threejs-journey",
    pages: [],
  },
  {
    title: "Math for Creative Devs",
    description: "https://threejs-workshops.com/workshop/math",
    base: "math-devs",
    pages: [
      {
        title: "Sine to smooth transitions",
      },
    ],
  },
]);
