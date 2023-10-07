export default class Section {
  constructor({ items, renderer }, containerSelector) {
    this._items = items;
    this._renderer = renderer;
    this._container = document.querySelector(containerSelector);
  }

  renderItems() {
    this._items.forEach((item) => {
      const itemElement = this._renderer(item);
      this.addItem(itemElement);
    });
  }
  //append or prepend element to container
  addItem(element, placement = "append") {
    switch (placement) {
      case "append":
        this._container.append(element);
        break;
      case "prepend":
        this._container.prepend(element);
        break;
      default:
        console.log("Error. Please use only 'append' or 'prepend'.");
    }
  }
}
