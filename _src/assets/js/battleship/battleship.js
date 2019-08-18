'use strict';

const bs = {};

(function() {
  // PUBLIC METHODS

  bs.init = () => {
    bs.initNavigator();
    bs.initPlayers();
  };

  bs.start = () => {
    helpers.logGroup('Starting...');
    bs.initBoard();
    bs.initShips();
    bs.renderBoard();
    helpers.logGroupEnd();
  };
})();
