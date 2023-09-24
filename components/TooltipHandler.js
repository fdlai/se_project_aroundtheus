export default class TooltipHandler {
  // ".card__title";
  // ".card__tooltip";

  // "#profile-title";
  // ".profile__tooltip-title";
  //"#profile-title-input";

  // "#profile-description";
  // ".profile__tooltip-description";
  //"#profile-description-input"

  //both selectors should include their . or #
  constructor(textSelector, tooltipSelector, updateText = true) {
    this._textSelector = textSelector;
    this._tooltipSelector = tooltipSelector;
    this._updateText = updateText;
  }

  handleTooltip() {
    const textElements = document.querySelectorAll(this._textSelector);
    textElements.forEach((elt) => {
      const ellipsisExists = elt.scrollWidth > elt.clientWidth;
      const tooltipIsOpen = elt.parentNode.querySelector(this._tooltipSelector);
      if (ellipsisExists && !tooltipIsOpen) {
        const tooltip = document.createElement("p");
        tooltip.classList.add(this._tooltipSelector.slice(1));
        tooltip.textContent = elt.textContent;
        elt.after(tooltip);
      } else if (ellipsisExists && tooltipIsOpen && this._updateText) {
        const tooltip = elt.nextElementSibling;
        tooltip.textContent = elt.innerText;
      } else if (!ellipsisExists && tooltipIsOpen) {
        const tooltip = elt.nextElementSibling;
        tooltip.remove();
      }
    });
  }
}
