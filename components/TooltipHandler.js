export default class TooltipHandler {
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

// export default class TooltipHandler {
//   //both selectors should include their . or #
//   constructor(
//     textSelector,
//     tooltipSelector,
//     maxTextWidth = null,
//     updateText = true
//   ) {
//     this._textSelector = textSelector;
//     this._tooltipSelector = tooltipSelector;
//     this._maxTextWidth = maxTextWidth;
//     this._updateText = updateText;
//     this._textElements = [...document.querySelectorAll(this._textSelector)];
//     if (this._maxTextWidth) {
//       this._textElements = this._textElements.filter(
//         (elt) => elt.scrollWidth > this._maxTextWidth
//       );
//     }
//     console.log(this._textElements);
//   }

//   //if textElt has ellipsis, add it to array
//   _checkAndAddTextElement(textElt) {
//     if (textElt > this._maxTextWidth) {
//       this._textElements.push(textElt);
//     }
//   }

//   //if textElt in array, remove it
//   _checkAndRemoveTextElement(textElt) {
//     const i = this._textElements.indexOf(textElt);
//     if (i === -1) {
//       return;
//     }
//     this._textElements.splice(i, 1);
//   }

//   handleTooltip() {
//     this._textElements.forEach((elt) => {
//       const ellipsisExists = elt.scrollWidth > elt.clientWidth;
//       const tooltipIsOpen = elt.parentNode.querySelector(this._tooltipSelector);
//       if (ellipsisExists && !tooltipIsOpen) {
//         const tooltip = document.createElement("p");
//         tooltip.classList.add(this._tooltipSelector.slice(1));
//         tooltip.textContent = elt.textContent;
//         elt.after(tooltip);
//       } else if (ellipsisExists && tooltipIsOpen && this._updateText) {
//         const tooltip = elt.nextElementSibling;
//         tooltip.textContent = elt.innerText;
//       } else if (!ellipsisExists && tooltipIsOpen) {
//         const tooltip = elt.nextElementSibling;
//         tooltip.remove();
//       }
//     });
//   }
// }
