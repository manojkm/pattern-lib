import {dropdownMarkup, dropdownPositions} from './template';
import {debounce, toggleVisibilityHandler} from '../utils';

document.addEventListener('DOMContentLoaded', appendDropdown);

/**
 * Add the template to the DOM
 */

function appendDropdown() {

  const dropdownFragment = document.createDocumentFragment();
  const dropdownContainer = document.createElement('div');
  dropdownContainer.classList.add('mb--xxxxl', 'plr--md');
  if (dropdownMarkup) {
    dropdownContainer.innerHTML = dropdownMarkup();
  }
  dropdownFragment.appendChild(dropdownContainer);
  document.getElementById('root').appendChild(dropdownFragment);

  /**
   * Dropdown events
   */

  dropdownHandler('click', 'dropdown', 'dropdown--active');
  dropdownHandler('keypress', 'dropdown', 'dropdown--active');
  dropdownHandler('click', 'dropdown2', 'dropdown--active');
  dropdownHandler('keypress', 'dropdown2', 'dropdown--active');
  dropdownHandler('click', 'dropdown3', 'dropdown--active');
  dropdownHandler('keypress', 'dropdown3', 'dropdown--active');

}

/**
 * Show/hide dropdown wrapper
 * @param {string} evtType - The `Event` type
 * @param {string} parent - The parent `id`
 * @param {string} className - The `class` to toggle on the parent
 * @returns null
 */

export function dropdownHandler(evtType, parent, className) {

  const dropdown = document.getElementById(parent);

  if (!dropdown) {
    throw new Error('dropdownHandler method requires `parent` as a valid HTML element');
  }
  const visibleClass = className;
  const dropdownWrap = dropdown.querySelector('.dropdown-wrap');
  const dropdownLabel = dropdown.querySelector('.dropdown-label').id;
  if (!visibleClass) {
    throw new Error('dropdownHandler method requires `className` as a string');
  }

  /**
   * Bind dropdown events
   */

  dropdownResizeHandler(parent, dropdownPositions);
  toggleVisibilityHandler(evtType, parent, dropdownLabel, visibleClass);
  dropdown.addEventListener(evtType, dropdownPositionHandler.bind(null, parent, dropdownPositions));
  dropdown.addEventListener('mouseenter', () => dropdownWrap.style.willChange = 'opacity, transform');
  dropdown.addEventListener('mouseleave', () => dropdownWrap.style.willChange = 'auto');

}

/**
 * Reposition dropdown on window resize event
 * @param {string} parent - The dropdown `id`
 * @param {object} classNames - The dropdown position classNames
 */

function dropdownResizeHandler(parent, classNames) {

  window.addEventListener('resize', debounce(handler, 250));
  function handler() {
    dropdownPositionHandler(parent, classNames);
  }

}

/**
 * Position dropdown list
 * based on the available space in the viewport
 * Reference: https://goo.gl/hX93fa
 * @example: https://jsfiddle.net/dzigSawww/spckajwz/
 *
 * @param {string} parent - The dropdown `id`
 * @param {Object} positionClassName- The dropdown list position `class` names (top|right|bottom|left)
 * @returns null
 */

function dropdownPositionHandler(parent, positionClassName) {

  if (!parent) {
    throw new Error('dropdownPositionHandler method requires `parent` as a string');
  }
  const dropdown = document.getElementById(parent);
  const dropdownWrap = dropdown.querySelector('.dropdown-wrap');
  const rootElement = document.documentElement;

  /**
   * `documentElement` & `dropdownWrap` dimensions
   */

  const dropdownCoords = dropdownWrap.getBoundingClientRect();
  const rootElementCoords = rootElement.getBoundingClientRect();
  const dropdownWidth = (dropdownCoords.width || dropdownCoords.right - dropdownCoords.left);
  const dropdownHeight = (dropdownCoords.height || dropdownCoords.bottom - dropdownCoords.top);
  const rootElementWidth = (rootElementCoords.width || rootElementCoords.right - rootElementCoords.left);


  if (!positionClassName) {
    throw new Error('dropdownPositionHandler method requires `positionClassName` as an object');
  }
  const {top, right, left, bottom} = positionClassName;
  const positionTop = top;
  const positionRight = right;
  const positionLeft = left;
  const positionBottom = bottom;
  const spacer = 55;
  const classArr = [...dropdownWrap.classList];

  /**
   * Check if `dropdownWrap` right offset is beyond the edge of the viewport
   */

  if (dropdownCoords.right > rootElementCoords.right) {
    if (classArr.includes(positionLeft)) { dropdownWrap.classList.remove(positionLeft); }
    dropdownWrap.classList.add(positionRight);
  }

  /**
   * Calculate the distance between `dropdownWrap` and the edge of the viewport
   * then check the amount of space available on the right of `dropdownWrap`
   */

  if ((rootElementWidth - dropdownCoords.right) > dropdownWidth) {
    if (classArr.includes(positionRight)) { dropdownWrap.classList.remove(positionRight); }
    dropdownWrap.classList.add(positionLeft);
  } else {
    dropdownWrap.classList.remove(positionLeft);
  }

  /**
   * Check if `dropdownWrap` bottom offset is beyond the edge of the viewport
   */

  if (dropdownCoords.bottom > rootElementCoords.bottom) {
    if (classArr.includes(positionTop)) { dropdownWrap.classList.remove(positionTop); }
    dropdownWrap.classList.add(positionBottom);
  }

  /**
   * Calculate the distance between `dropdownWrap` and the bottom edge of the viewport
   * then check the amount of space available below `dropdownWrap`
   */

  if ((rootElementCoords.bottom - dropdownCoords.bottom) > (dropdownHeight + spacer)) {
    if (classArr.includes(positionBottom)) { dropdownWrap.classList.remove(positionBottom); }
    dropdownWrap.classList.add(positionTop);
  }

}
