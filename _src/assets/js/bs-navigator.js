'use strict';

(function () {

  const start = () => {
    helpers.getElement('.js-start').classList.add('hidden');
    helpers.getElement('.js-next').classList.remove('hidden');
    helpers.getElement('.js-previous').classList.remove('hidden');
    battleship.start();
  };

  // PUBLIC METHODS

  battleship.initNavigator = () => {
    helpers.listenEvent('.js-start', 'click', start);
    helpers.listenEvent('.js-next', 'click', battleship.runNextShoot);
    helpers.listenEvent('.js-previous', 'click', battleship.goPreviousShoot);
  };

}());
