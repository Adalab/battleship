'use strict';

/**
 * @module bs-menu
 * @desc Module that manages the game menu.
 */

(function() {
  /**
   * @method start
   * @desc Start the menu and the game.
   */
  const start = () => {
    helpers.getElement('.js-start').classList.add('hidden');
    helpers.getElement('.js-next').classList.remove('hidden');
    helpers.getElement('.js-previous').classList.remove('hidden');
    bs.start();
  };

  /**
   * @method initMenu
   * @desc Init menu module. Listen to menu events and handle them.
   */
  bs.initMenu = () => {
    helpers.listenEvent('.js-start', 'click', start);
    helpers.listenEvent('.js-next', 'click', bs.fireShot);
    helpers.listenEvent('.js-previous', 'click', bs.goPreviousShot);
  };
})();
