import {addClassNames} from '../utils';

export default renderDataTree;

/**
 * Render a data tree
 * @param {array} items - The data tree items
 * @param {array} classArr - Additional classnames (Optional)
 * @returns {string} Markup for data tree component
 */

function renderDataTree({items, classArr}) {

  if (!items || items.length === 0) {
    throw new Error('renderDataTree method requires `items` as an array');
  }
  return (
    `<div class="datatree ${addClassNames(classArr)}">
      <ul class="datatree-list">
        ${renderItems(items)}
      </ul>
    </div>`
  );

}

/**
 * Render data tree items
 * @param {array} items - The collection of items
 */

function renderItems(items) {
  return items.map((item) => renderDataTreeItem(item)).join('');
}

/**
 * Render a data tree item
 * @param {string} title - The item title
 * @param {string|number|array} item - A sub-item
 */

function renderDataTreeItem({title, item}) {

  if (!title) {
    throw new Error('renderDataTreeItem requires `title` as a string');
  }
  return (
    `<li class="datatree-item">
      <span class="datatree-title">${title}</span>
      ${item ? `<ul class="datatree-sublist">${renderSubItem(item)}</ul>` : ''}
    </li>`
  );

}

/**
 * Render nested items
 * @param {string|number|array} subItem - The sub-item
 */

function renderSubItem(subItem) {

  if (subItem instanceof Array) {
    return subItem.map((item) => {
      if (typeof (item) == 'object') {
        return (
          `<li class="datatree-subitem">
            <span class="datatree-subtitle">${item.title}</span>
            <ul class="datatree-sublist">
              ${renderSubItem(item.value)}
            </ul>
          </li>`
        );
      } else {
        return `<li class="datatree-subitem"><span>${item}</span></li>`;
      }
    }).join('');
  } else {
    return `<li class="datatree-subitem"><span>${subItem}</span></li>`;
  }

}
