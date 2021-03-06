import Icon from '../icon/template';
import {getNoticeState, renderNoticeFooter} from './utils';
import {addClassNames, getShape} from '../utils';

export default renderNotice;
export const noticeMarkup = template;

/**
 * Render a notice message
 * @param {object} notice - The notice properties
 * @param {string} [notice].id - The notice `id`
 * @param {string} [notice].message - The notice message
 * @param {string} [notice].state - The notice state (Optional)
 * @param {object} [notice].icon - Icon properties (Optional)
 * @param {string} [notice].iconPosition - The icon position (Optional)
 * @param {boolean} [notice].rounded - The notice shape (Optional)
 * @param {any} [notice].footerContent - The footer content (Optional)
 * @param {array} [notice].classArr Additional classNames (Optional)
 * @returns {string} Markup for message component
 */

function renderNotice(notice) {

  if (!notice) {
    throw new Error('renderNotice method requires `message` as a string');
  }
  const {id, message, state, icon, iconPosition, footerContent, rounded, classArr} = notice;
  return (
    `<div id=${id} class="notice ${getNoticeState(state)} ${getShape(rounded, 'notice')} ${addClassNames(classArr)}">
      <section class="notice-content">
        ${icon && iconPosition == 'left' ? Icon(icon) : ''}
        <p>${message ? message : Error('notice needs to render a message')}</p>
        ${icon && iconPosition == 'right' ? Icon(icon) : ''}
      </section>
      ${footerContent ? renderNoticeFooter(footerContent) : ''}
    </div>`
  );

}

/**
 * Notice template
 * @returns {string} notice markup
 */

function template() {
  return (
    `<div class="constrain p--xs mb--xxxl">
      <div class="mb--sm">${renderNotice(notice)}</div>
      <div class="mb--sm">${renderNotice(notice_error)}</div>
      <div class="mb--sm">${renderNotice(notice_success)}</div>
      <div class="mb--sm">${renderNotice(notice_warn)}</div>
    </div>
    <div class="constrain p--xs">
      <div class="mb--sm">${renderNotice(notice_rounded)}</div>
      <div class="mb--sm">${renderNotice(notice_error_rounded)}</div>
      <div class="mb--sm">${renderNotice(notice_success_rounded)}</div>
      <div class="mb--sm">${renderNotice(notice_warn_rounded)}</div>
    </div>`
  );
}

/**
 * Notice properties
 */

const errorIcon = {
  size: 'sm',
  id: 'warning',
  title: 'An error occured'
};

const successIcon = {
  size: 'sm',
  id: 'check',
  title: 'Action successful',
  classArr: ['mr--xs']
};

const infoIcon = {
  size: 'sm',
  id: 'info',
  title: 'Inormation'
};

const notice = {
  id: 'notice',
  message: 'This is a default notice message.',
};

const notice_error = {
  id: 'notice_error',
  state: 'error',
  icon: errorIcon,
  iconPosition: 'right',
  message: 'This is an error notice message.'
};

const notice_success = {
  id: 'notice_success',
  state: 'success',
  icon: successIcon,
  iconPosition: 'left',
  message: 'This is a success notice message.'
};

const notice_warn = {
  id: 'notice_warn',
  state: 'warn',
  icon: infoIcon,
  iconPosition: 'right',
  message: 'This is a warning notice message.'
};

const notice_rounded = Object.assign({}, notice, {
  rounded: true
});

const notice_error_rounded = Object.assign({}, notice_error, {
  rounded: true,
  icon: errorIcon,
  iconPosition: 'right'
});

const notice_success_rounded = Object.assign({}, notice_success, {
  rounded: true,
  icon: successIcon,
  iconPosition: 'left'
});

const notice_warn_rounded = Object.assign({}, notice_warn, {
  rounded: true,
  icon: infoIcon,
  iconPosition: 'right'
});
