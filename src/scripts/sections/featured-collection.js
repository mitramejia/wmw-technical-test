/**
 * Section: Featured collection
 * ------------------------------------------------------------------------------
 * Featured collection configuration for complete theme support
 * - https://github.com/Shopify/theme-scripts/tree/master/packages/theme-sections
 *
 * @namespace featuredCollection
 */

import {register} from '@shopify/theme-sections';
import {addItem} from '@shopify/theme-cart';
import Flickity from 'flickity';

/**
 * Featured collection constructor
 * Executes on page load as well as Theme Editor `section:load` events.
 *
 * @param {string} container - selector for the section container DOM element
 */
register('featured-collection', {
  _flickity: null,
  _notyf: new Notyf({position: {x: 'right', y: 'top'}}),
  _flickityRootSelector: '.featured-collection__flickity-root',

  onLoad() {
    this.initFlickity();
  },

  onUnload() {
    this.flickity.destroy();
  },

  initFlickity() {
    const root = document.querySelector(this.flickityRootSelector);

    this.flickity = new Flickity(root, {
      groupCells: true,
      cellAlign: 'left',
      contain: true,
      arrowShape: {
        x0: 10,
        x1: 60, y1: 50,
        x2: 65, y2: 45,
        x3: 20,
      },
    });
    this.flickity.on('staticClick', this._handleAddToCart.bind(this));
  },


  /**
   * Extracts variant id from the event target's html attribute.
   *
   * @param {EventTarget} target - event target object
   * @returns {number} - id - product variant id
   *
   */
  _getVariantIdFromHtml(target) {
    const variantIdAttr = target.attributes[this.variantIdAttr];
    if (!variantIdAttr) { throw new Error(`Target requires a ${this.variantIdAttr} html attribute`); }
    return parseInt(variantIdAttr.value, 0);
  },


  /**
   * Handles static click event to add a product to the cart.
   *
   * @param {Event} event - event object
   *
   * https://github.com/DefinitelyTyped/DefinitelyTyped/blob/master/types/flickity/index.d.ts#L364
   *
   */
  async _handleAddToCart(event) {
    event.preventDefault();
    try {
      // Gather request parameters
      const quantity = this.quantityToAdd;
      const id = this._getVariantIdFromHtml(event.target);
      // Issue request
      await addItem(id, {quantity});
      // Notify user
      this._notyf.success('Product Added to cart');
    } catch (error) {
      this._notyf.error(`Error adding product to cart: ${error.message}`);
    }
  },
});
