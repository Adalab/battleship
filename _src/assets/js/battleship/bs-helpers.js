'use strict';

/**
 * @module bs-helpers
 * @desc Utilities module and methods common to other modules.
 */

const helpers = {
  /**
   * @method log
   * @desc Log a message in devtools console. Similar to console.log().
   */
  log: (...messages) => {
    // eslint-disable-next-line no-console
    console.log(...messages);
  },

  /**
   * @method logGroup
   * @desc Create a devtool group and log a message. Similar to console.logGroup().
   */
  logGroup: (...messages) => {
    // eslint-disable-next-line no-console
    console.group(...messages);
  },

  /**
   * @method logGroupEnd
   * @desc Finish a devtool group. Similar to console.groupEnd().
   */
  logGroupEnd: () => {
    // eslint-disable-next-line no-console
    console.groupEnd();
  },

  /**
   * @method listenEvent
   * @param {string} selector Selector of DOM element.
   * @param {string} eventName Event name.
   * @param {function} handle Function that will handle the event.
   * @desc Add event listener to a DOM element.
   */
  listenEvent: (selector, eventName, handle) => {
    helpers.getElement(selector).addEventListener(eventName, handle);
  },

  /**
   * @method getElement
   * @param {string} selector Selector of DOM element.
   * @returns {Element} A DOM element. Similar to document.querySelector.
   */
  getElement: selector => {
    const element = document.querySelector(selector);
    if (element === null) {
      helpers.error('There is no item with the selector:', selector);
    }
    return element;
  },

  /**
   * @method getInputValue
   * @param {string} selector Selector of DOM input.
   * @returns {string} A DOM input value. Similar to document.querySelector(selector).input.
   */
  getInputValue: selector => helpers.getElement(selector).value,

  /**
   * @method setElementHtml
   * @param {string} selector Selector of DOM element.
   * @param {string} htmlCode New HTML code.
   * @desc Update innerHTML of a DOM element.
   */
  setElementHtml: (selector, htmlCode) => (helpers.getElement(selector).innerHTML = htmlCode)
};
