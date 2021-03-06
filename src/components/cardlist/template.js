import Button from '../button/template';
import Icon from '../icon/template';
import {addClassNames} from '../utils';

export default renderCardlist;
export const cardlistMarkup = template;

/**
 * Render cardlist
 * @param {Object} cardlist - The cardlist properties
 * @param {string} id - The cardlist `id`
 * @param {string} [cardlist].title - The cardlist title
 * @param {array} [cardlist].items - The cardlist items
 * @param {array} [cardlist].classArr - Additional classnames (Optional)
 * @returns {string} - Markup for cardlist component
 */

function renderCardlist({id, title, items, classArr}) {

  if (!id) {
    throw new Error('renderCardlist method requires `id` as a string');
  }
  return (
    /* eslint-disable indent */
    `<div class="cardlist-container ${addClassNames(classArr)}">
      <header class="cardlist-header">
        <h1 class="cardlist-title">${title}</h1>
      </header>
      <ul id="${id}" class="cardlist">
        ${
          items ?
          items.map(renderCardlistItem).join('')
          : new Error('cardlist requires `items` as an array')
        }
      </ul>
    </div>`
    /* eslint-enable indent */
  );

}

/**
 * Render cardlist items
 * @param {Object} item - The cardlist item
 * @param {string} image - The image URL
 * @param {string} title - The item title
 * @param {string} subtitle - The item sub-title
 * @param {string} details - The item details
 * @returns {string} - Markup for cardlist item
 */

function renderCardlistItem({image, title, subtitle, details}) {

  if (!image) {
    throw new Error('renderCardlistItem method requires `image` as string');
  }
  return (
    `<li class="cardlist-item">
      <div class="cardlist-content">
        <a class="cardlist-overlay" href="#"></a>
        <div class="image-container">
          <div class="media-placeholder"></div>
          <img src="${image}" alt="" />
        </div>
        <div class="cardlist-options">
          ${Button({size: 'xs', icon: favoriteIcon})}
          <a class="btn btn--xs cardlist-expand" title="toggle card image" tabindex="0">
            ${Icon(toggleIcon)}
          </a>
          ${Button({size: 'xs', icon: shareIcon, classArr: ['cardlist-share']})}
          ${Button({size: 'xs', icon: notificationIcon})}
        </div>
      </div>
      <div class="cardlist-info">
        ${title ? `<h3>${title}</h3>` : ''}
        ${subtitle ? `<h4>${subtitle}</h4>` : ''}
        <div>${details}</div>
      </div>
    </li>`
  );

}


/**
 * Cardlist template
 * @returns {string} cardlist markup
 */

function template() {
  return (
    `<div>${renderCardlist(cardlist)}</div>`
  );
}

/**
 * Cardlist properties
 */

const items = [
  {
    title: 'Card Title',
    subtitle: 'Card subtitle',
    details: 'extra details...',
    image: 'assets/bag/bag1.jpg'
  },
  {
    title: 'Card Title',
    subtitle: 'Card subtitle',
    details: 'extra details...',
    image: 'assets/bag/bag2.jpg'
  },
  {
    title: 'Card Title',
    subtitle: 'Card subtitle',
    details: 'extra details...',
    image: 'assets/bag/bag3.jpg'
  },
  {
    title: 'Card Title',
    subtitle: 'Card subtitle',
    details: 'extra details...',
    image: 'assets/bag/bag1.jpg'
  },
  {
    title: 'Card Title',
    subtitle: 'Card subtitle',
    details: 'extra details...',
    image: 'assets/bag/bag2.jpg'
  },
  {
    title: 'Card Title',
    subtitle: 'Card subtitle',
    details: 'extra details...',
    image: 'assets/bag/bag3.jpg'
  },
  {
    title: 'Card Title',
    subtitle: 'Card subtitle',
    details: 'extra details...',
    image: 'assets/bag/bag1.jpg'
  },
  {
    title: 'Card Title',
    subtitle: 'Card subtitle',
    details: 'extra details...',
    image: 'assets/bag/bag2.jpg'
  },
  {
    title: 'Card Title',
    subtitle: 'Card subtitle',
    details: 'extra details...',
    image: 'assets/bag/bag3.jpg'
  }
];

const cardlist = {
  items,
  id: 'cardlist',
  title: 'Card List Title'
};

const favoriteIcon = {
  size: 'sm',
  id: 'heart',
  title: 'Favorite',
  description: 'Favorite this product'
};

const toggleIcon = {
  size: 'sm',
  id: 'plus',
  title: 'Toggle product image',
  classArr: ['icon--expand']
};

const shareIcon = {
  size: 'sm',
  id: 'share',
  title: 'Share this product'
};

const notificationIcon = {
  size: 'sm',
  id: 'bell',
  title: 'Receive notifications',
  description: 'Receive notifications about this product'
};
