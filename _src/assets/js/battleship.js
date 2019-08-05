'use strict';

const battleship = {};

(function () {

  // PUBLIC METHODS

  battleship.init = () => {
    battleship.initNavigator();
    battleship.initPlayers();
  };

  battleship.start = () => {
    helpers.logGroup('Starting...');
    battleship.initBoard();
    battleship.initShips();
    battleship.renderBoard();
    helpers.logGroupEnd();
  };

}());
