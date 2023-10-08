//handles sections of the page by taking in data, converting it to HTML and placing it on the page
export default class Section {
  constructor({ items, renderer }, containerSelector) {
    this._items = items;
    this._renderer = renderer; //converts item to an html element
    this._container = document.querySelector(containerSelector);
  }
  //render an array of item data to the page
  renderItems(placement = "append") {
    this._items.forEach((item) => {
      this.addItem(item, placement);
    });
  }
  //turn item to element and append or prepend element to container
  addItem(item, placement = "append") {
    const itemElement = this._renderer(item);
    switch (placement) {
      case "append":
        this._container.append(itemElement);
        break;
      case "prepend":
        this._container.prepend(itemElement);
        break;
      default:
        console.log("Error. Please use only 'append' or 'prepend'.");
    }
  }
}
