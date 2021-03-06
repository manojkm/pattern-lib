import {addClassNames} from '../utils';

export default renderSidebar;

/**
 * Render a sidebar
 * @param {string} id - The sidebar `id`
 * @param {array} items - The sidebar items
 * @param {string} label - The sidebar button label
 * @param {array} classArr - Additional classNames (Optional)
 * @param {string} sidebarPosition - The sidebar position (left|right|top|bottom)
 * @returns {string} Markup for sidebar component
 */

function renderSidebar({id, items, classArr, label, sidebarPosition = 'left'}) {

  if (!id) {
    throw new Error('renderSidebar method requires `id` as a string');
  }
  return (
    `<nav id=${id} class=${addClassNames(classArr)}>
      <ul class="sidebar sidebar--${sidebarPosition}">
        ${items.map(renderSidebarItem).join('')}
      </ul>
      <div>
        <a class="btn btn--xs btn--full" tabindex="0">${label}</a>
      </div>
    </nav>`
  );

}

/**
 * Render sidebar item
 * @param {any} content - The item content
 * @param {array} classArr - Additional classNames (Optional)
 * @returns {string} Markup for sidebar item
 */

function renderSidebarItem({content, classArr}) {

  if (!content) {
    throw new Error('renderSidebarItem method requires `content`');
  }
  return (
    `<li class="sidebar-item ${addClassNames(classArr)}">
      ${content}
    </li>`
  );

}
