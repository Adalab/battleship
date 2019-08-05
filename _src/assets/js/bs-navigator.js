'use strict';

(function() {
  const start = () => {
    helpers.getElement('.js-start').classList.add('hidden');
    helpers.getElement('.js-next').classList.remove('hidden');
    helpers.getElement('.js-previous').classList.remove('hidden');
    bs.start();
  };

  // PUBLIC METHODS

  bs.initNavigator = () => {
    helpers.listenEvent('.js-start', 'click', start);
    helpers.listenEvent('.js-next', 'click', bs.fireShoot);
    helpers.listenEvent('.js-previous', 'click', bs.goPreviousShoot);
  };
})();
