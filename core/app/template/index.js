import Page from "@/classes/Page";

export default class extends Page {
  constructor() {
    super({
      element: "[data-page]",
    });

    // init variable
    this.instance = null;
  }

  create() {
    super.create();

    // dynamic import
    this.id = this.element.getAttribute("data-page");

    // not lessons page
    if (!this.id) {
      return;
    }

    // create instance
    const instanceName = this.id;

    import(`./${instanceName}`).then((instance) => {
      const Page = instance.default;

      // class
      if (typeof Page === "function") {
        this.instance = new Page({
          element: this.element,
        });
      } else {
        // just js file
        this.instance = instance;
      }
    });
  }

  destroy() {
    // destroy last instance
    if (this.instance && this.instance.destroy) {
      this.instance.destroy();
    }

    // clear instance
    this.instance = null;
  }
}
