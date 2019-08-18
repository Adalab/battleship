'use strict';

const helpers = {

  // log methods

  error: (...messages) => {
    // eslint-disable-next-line no-console
    console.error(...messages);
  },

  log: (...messages) => {
    // eslint-disable-next-line no-console
    console.log(...messages);
  },

  logGroup: (...messages) => {
    // eslint-disable-next-line no-console
    console.group(...messages);
  },

  logGroupEnd: () => {
    // eslint-disable-next-line no-console
    console.groupEnd();
  },

  // listener methods

  listenEvent: (selector, eventName, handle) => {
    helpers.getElement(selector).addEventListener(eventName, handle);
  },

  // dom methods

  getElement: selector => {
    const element = document.querySelector(selector);
    if (element === null) {
      helpers.error('There is no item with the selector:', selector);
    }
    return element;
  },

  getElementValue: selector => helpers.getElement(selector).value,

  setElementValue: (selector, value) => helpers.getElement(selector).value = value,

  setElementHtml: (selector, htmlCode) => helpers.getElement(selector).innerHTML = htmlCode

};