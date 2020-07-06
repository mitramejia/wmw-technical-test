/**
 * Section: Featured collection
 * ------------------------------------------------------------------------------
 * Featured collection configuration for complete theme support
 * - https://github.com/Shopify/theme-scripts/tree/master/packages/theme-sections
 *
 * @namespace featuredCollection
 */

import {register} from '@shopify/theme-sections';
import * as cart from '@shopify/theme-cart';
import Flickity from 'flickity';
import {Notyf} from 'notyf';
import 'notyf/notyf.min.css';

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

  // Destroy flickity instance if this section its unloaded
  onUnload() {
    this._flickity.destroy();
  },

  initFlickity() {
    const root = document.querySelector(this._flickityRootSelector);

    this._flickity = new Flickity(root, {
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
    this._flickity.on('staticClick', this._handleAddToCart.bind(this));
  },

  /**
   * Handles static click event to add a product to the cart.
   *
   * @param {Event} evt - event object
   *
   * https://github.com/DefinitelyTyped/DefinitelyTyped/blob/master/types/flickity/index.d.ts#L364
   *
   */
  async _handleAddToCart({target}) {
    try {
      // Gather request parameters
      const variantIdAttr = target.attributes['data-variant-id'];
      if (!variantIdAttr) { return; }
      const variantId = parseInt(variantIdAttr.value, 0);

      // Issue request
      await cart.addItem(variantId, {quantity: 1});
      // Notify user
      this._notyf.success('Product added to cart');
    } catch (error) {
      this._notyf.error(`Error adding product to cart: ${error.message}`);
    }
  },
});
