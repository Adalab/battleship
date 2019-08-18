'use strict';

/**
 * @module battleship
 * @desc Main module of the game.
 */

/**
 * @const {Object} bs
 * @desc It is the global constant where all public methods of the game are declared.
 * The board, players... modules add to this object their public methods.
 */
const bs = {};

/**
 * @method init
 * @desc Init the game, listen menu buttons and init the players.
 */
bs.init = () => {
  bs.initMenu();
  bs.initPlayers();
};

/**
 * @method start
 * @desc Start the game, init board, create random ships and render board.
 */
bs.start = () => {
  helpers.logGroup('Starting...');
  bs.initBoard();
  bs.initShips();
  bs.renderBoard();
  helpers.logGroupEnd();
};
