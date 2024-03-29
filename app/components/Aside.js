import Component from "@/classes/Component";

/**
 * Aside component
 * */
export default class Aside extends Component {
  constructor(element) {
    super({ element });

    // vars
    this.activeId = null;
    this.activeSlug = null;
    this.activeElm = null;

    this.scrollElement = this.element.querySelector("[data-aside-scroller]");

    // jump to active position
    this.scrollToActivePosition();

    // register click event
    this.element.addEventListener("click", this.toggleActiveClass.bind(this));
  }

  setActivePosition() {
    const activeElement = this.element.querySelector(
      "[data-aside-link].active",
    );

    // no active element
    if (!activeElement) {
      this.activeId = null;
      this.activeSlug = null;
      this.activeElm = null;
      this.activeLinkElm = null;

      return;
    }

    // set active Element
    this.activeElm = activeElement.closest("[data-aside-item]");
    this.activeLinkElm = activeElement;

    // get id and slug
    this.activeId = activeElement.getAttribute("data-id");
    this.activeSlug = activeElement.getAttribute("data-slug");
  }

  scrollToActivePosition() {
    // get active position
    this.setActivePosition();

    // not active page
    if (!this.activeId || !this.activeSlug) {
      return;
    }

    // get top position of the active
    const distanceOfActiveElmToTop = this.activeElm.offsetTop;
    const distanceOfActiveLinkToParent = this.activeLinkElm.offsetTop;

    // calculate the offset to center of the scrollable element
    const offset =
      distanceOfActiveElmToTop +
      distanceOfActiveLinkToParent -
      this.scrollElement.clientHeight * 0.5 +
      this.activeLinkElm.clientHeight * 0.5;

    this.scrollElement.scrollTo({
      top: offset,
      behavior: "smooth",
    });
  }

  toggleActiveClass(event, element = null) {
    const target = element
      ? element
      : event.target.closest("[data-aside-link]");

    // target doesn't exist
    if (!target) {
      return;
    }

    // get current active link
    const currentActiveLink = this.element.querySelector(
      "[data-aside-link].active",
    );

    // same link => do nothing
    if (currentActiveLink && currentActiveLink.isEqualNode(target)) {
      return;
    }

    // change active class
    currentActiveLink?.classList.remove("active");
    target.classList.add("active");

    // scroll to active position
    this.scrollToActivePosition();
  }

  getAsideItemBySlug(slug, id) {
    return this.element.querySelector(`[data-slug="${slug}"][data-id="${id}"]`);
  }
}
