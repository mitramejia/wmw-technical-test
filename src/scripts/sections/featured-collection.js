/**
 * Section: Featured collection
 * ------------------------------------------------------------------------------
 * Featured collection configuration for complete theme support
 * - https://github.com/Shopify/theme-scripts/tree/master/packages/theme-sections
 *
 * @namespace featuredCollection
 */
import {register} from '@shopify/theme-sections';
import Flickity from 'flickity';

/**
 * Featured collection constructor
 * Executes on page load as well as Theme Editor `section:load` events.
 *
 * @param {string} container - selector for the section container DOM element
 */
register('featured-collection', {
  flickity: null,
  flickityRootSelector: '.featured-collection__flickity-root',
  variantIdAttr: 'data-variant-id',
  quantityToAdd: 1,

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

  },
});
