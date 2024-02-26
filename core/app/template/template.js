export default class {
  constructor({ element }) {
    this.element = element;
  }

  // for destroy this script when navigating between each page
  destroy() {
    console.log("destroyed", this);
  }
}
