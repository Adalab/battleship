'use strict';

/**
 * @module bs-ships
 * @desc Module that manages the ships of the game.
 */

(function() {
  /**
   * @const {Array} ships
   * @desc Constant where we store the ships of all players.
   */
  const ships = [];
  /**
   * @var {Array} ships
   * @desc Length of the boats.
   */
  let shipLength;

  /**
   * @func getLengthFromInput
   * @desc Read the ships length from DOM and save it in shipLength.
   */
  const getLengthFromInput = () => {
    shipLength = parseInt(helpers.getInputValue('.js-ship-length-input'));
  };

  /**
   * @func createShips
   * @desc Create a ship for each player.
   */
  const createShips = () => {
    for (const playerId of bs.getPlayerIds()) {
      ships.push({
        id: ships.length,
        playerId: playerId
      });
    }
  };

  /**
   * @func createShipsPositions
   * @desc Create ship positions randomly.
   */
  const createShipsPositions = () => {
    for (const ship of ships) {
      const direction = _.random(1) ? 'horizontal' : 'vertical';
      let initialX;
      let initialY;
      let incrementX;
      let incrementY;
      if (direction === 'horizontal') {
        initialX = _.random(0, bs.getBoardWidth() - shipLength);
        initialY = _.random(0, bs.getBoardHeight() - 1);
        incrementX = 1;
        incrementY = 0;
      } else {
        initialX = _.random(0, bs.getBoardWidth() - 1);
        initialY = _.random(0, bs.getBoardHeight() - shipLength);
        incrementX = 0;
        incrementY = 1;
      }
      ship.positions = [];
      for (let idx = 0; idx < shipLength; idx++) {
        ship.positions.push({
          x: initialX + incrementX * idx,
          y: initialY + incrementY * idx
        });
      }
    }
  };

  /**
   * @func logShips
   * @desc Log ships info in console.
   */
  const logShips = () => {
    for (const ship of ships) {
      const shipPositions = [];
      for (const position of ship.positions) {
        shipPositions.push(`(${position.x}, ${position.y})`);
      }
      helpers.log(`Ship #${ship.id}: ${shipPositions.join(', ')}`);
    }
  };

  /**
   * @method initShips
   * @desc Init ships module. Read length from DOM inputs,
   * save it and create random ships.
   */
  bs.initShips = () => {
    getLengthFromInput();
    createShips();
    createShipsPositions();
    logShips();
  };

  /**
   * @method getShipsDataForPlayer
   * @returns {Object} Useful information for the player relative to the ships.
   */
  bs.getShipsDataForPlayer = playerId => {
    const playerShips = [];
    for (const ship of ships) {
      if (ship.playerId === playerId) {
        playerShips.push({
          positions: ship.positions
        });
      }
    }
    return playerShips;
  };

  /**
   * @method isGameOver
   * @returns {Object} If all cells of a player's ship are damaged.
   */
  bs.isGameOver = () => {
    for (const ship of ships) {
      let isGameOver = true;
      for (const position of ship.positions) {
        if (!bs.isThereDamageAt(position.x, position.y)) {
          isGameOver = false;
        }
      }
      if (isGameOver === true) {
        return true;
      }
    }
    return false;
  };

  /**
   * @method isThereShipAt
   * @returns {boolean} True if there is a ship in position X, Y.
   */
  bs.isThereShipAt = (x, y) => {
    for (const ship of ships) {
      for (const position of ship.positions) {
        if (position.x === x && position.y === y) {
          return true;
        }
      }
    }
    return false;
  };

  /**
   * @method getShipIdAt
   * @returns {string} The Id of the ship in position X, Y. Empty string if there is no ship.
   */
  bs.getShipIdAt = (x, y) => {
    for (const ship of ships) {
      for (const position of ship.positions) {
        if (position.x === x && position.y === y) {
          return ship.id;
        }
      }
    }
    return '';
  };
})();
