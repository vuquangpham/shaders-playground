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
        title: "Drawing a Circle",
      },
      {
        title: "Drawing a Square",
      },
      {
        title: "Moving the shape around the circle",
      },
      {
        title: "Sine to smooth transitions",
      },
      {
        title: "Sine for texture transitions",
      },
      {
        title: "Gerstner waves with Sine",
      },
      {
        title: "Sine to loop noise",
      },
    ],
  },
]);
