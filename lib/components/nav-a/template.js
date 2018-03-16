import Icon from '../icon/template';

export default renderNavigation;

/**
 * Render a navigation
 * @param {string} id - The navigation `id`
 * @param {object} logo - The logo icon properties
 * @param {string} logoText - The logo text
 * @param {array} items - The navigation items
 * @param {array} classArr - Additional classNames (Optional)
 * @returns {string} Markup for navigation component
 */

function renderNavigation({id, logo, logoText, items, classArr}) {

  if (!id || !items) {
    throw new Error('renderNavigation method requires `id` as a string & `items` as an array');
  }
  const classNames = classArr ? classArr.join(' ') : '';
  return (
    `<div id="${id}" class="nav-a ${classNames}">
      <nav>
        <div class="icon icon--menu vert--mid" tabindex="0">
          <span class="bar"></span>
        </div>
        <a href="#" class="logo">
          ${Icon(logo)}
          <h1 class="logo-text">${logoText}</h1>
        </a>
        <ul class="nav-a-list">${items.map(renderNavigationItem).join('')}</ul>
      </nav>
      <!-- alternate navigation for smaller viewports -->
      <nav class="nav-a--sm js-nav-a--sm" aria-hidden="true">
       <div class="icon--exit" tabindex="0"><span class="bar"></span></div>
       <ul class="nav-a--sm-list">
        ${items.map(renderNavigationItem).join('')}
       </ul>
      </nav>
    </div>`
  );

}

/**
 * Render navigation item
 * @param {string} title - The navigation item title
 * @param {string} link - The title URL
 * @param {array} classArr - AdditionalClassNames (Optional)
 * @returns {string} Markup for navigation item
 */

function renderNavigationItem({title, link, classArr}) {

  const classNames = classArr ? classArr.join(' ') : '';
  return `<li class="nav-a-item ${classNames}"><a href="${link}">${title}</a></li>`;

}