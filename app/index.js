import Aside from "@/components/Aside";
import "@/vendors/theme/theme.min";

class App {
  constructor() {
    // create content
    this.createContent();

    this.createPreloader();

    this.createPage();
    this.afterPageLoaded();

    this.addEventListener();
  }

  createPreloader() {}
  onPreloaded() {}

  createContent() {
    // create ...
    this.content = document.querySelector("[data-template]");

    // get template name
    this.template = this.content.getAttribute("data-template");

    // create aside menu
    const asideElement = document.querySelector("[data-aside]");
    if (asideElement) {
      this.aside = new Aside(asideElement);
    }
  }

  createPage() {
    this.pages = {};

    this.dynamicImportPage().then(() => {
      const Page = this.pages[this.template].default;
      this.page = new Page();
    });
  }

  afterPageLoaded() {
    // Handle links click
    this.addLinksListener();
  }

  dynamicImportPage() {
    return new Promise((resolve) => {
      // already exist
      if (this.pages[this.template]) {
        return resolve();
      }

      // dynamic import
      import(`@/pages/${this.template}`).then((instance) => {
        this.pages[this.template] = instance;
        resolve();
      });
    });
  }

  async handlePageChange({ url, push = true }) {
    // animation
    await this.page.hide();

    // fetch new page
    const request = await window.fetch(url);

    if (request.status === 200) {
      // destroy old page
      this.page.destroy();

      // get html of new page
      const html = await request.text();
      const div = document.createElement("div");

      div.innerHTML = html;
      const divContent = div.querySelector("[data-template]");
      this.template = divContent.getAttribute("data-template");

      // change title html
      document.querySelector("head > title").innerHTML =
        div.querySelector("title").innerHTML;

      // change content HTML
      this.content.outerHTML = divContent.outerHTML;
      this.content = document.querySelector("[data-template]");

      // push to popstate
      if (push) {
        window.history.pushState({}, "", url);
      }

      this.dynamicImportPage().then(() => {
        const Page = this.pages[this.template].default;
        this.page = new Page();

        // animation
        this.page.show();

        // handle after page loaded
        this.afterPageLoaded();
      });
    } else {
      console.log("Error!");
    }
  }

  addLinksListener() {
    const links = document.querySelectorAll(
      'a:not([href^="#"]):not(.dynamic-link-enabled)',
    );
    links.forEach((link) => {
      link.addEventListener("click", (e) => {
        const currentURL = new URL(location.href);
        const linkURL = new URL(link.href);

        // external link
        if (currentURL.host !== linkURL.host) {
          return;
        }

        // internal link
        e.preventDefault();

        // current page => no need to do anything
        if (currentURL.href === linkURL.href) {
          return;
        }

        const { href } = link;
        this.handlePageChange({ url: href });
      });

      // current link => not load again
      link.classList.add("dynamic-link-enabled");
    });
  }

  /**
   * Listeners
   * */
  addEventListener() {
    // resize
    window.addEventListener(
      "resize",
      window.Theme.debounce(this.onResize.bind(this)),
    );

    // history api
    window.addEventListener("popstate", this.onPopState.bind(this));
  }

  onResize() {}

  onPopState() {
    // update page
    this.handlePageChange({ url: window.location.pathname, push: false });

    // for re-active the aside
    const [slug, id] = window.location.pathname
      .split("/")
      .filter((string) => string);

    if (!slug || !id) {
      return;
    }

    // active the aside item
    this.aside.toggleActiveClass(null, this.aside.getAsideItemBySlug(slug, id));
  }
}

new App();
