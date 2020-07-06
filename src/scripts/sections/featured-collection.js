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
  init() {
    this.publicMethod();
  },

  onUnload() {
    this.flickity.destroy();
  },
  initCarousel() {
    const elem = document.querySelector('.main-carousel');
    new Flickity(elem, {
      // options

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


  },
});
