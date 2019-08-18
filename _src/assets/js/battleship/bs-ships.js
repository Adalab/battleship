'use strict';

(function() {
  // PRIVATE DATA

  const ships = [];
  let shipLength;

  // PRIVATE METHODS

  // get and set menu data

  const getLengthFromInput = () => {
    shipLength = parseInt(helpers.getElementValue('.js-ship-length-input'));
  };

  // create ships methods

  const createShips = () => {
    for (const playerId of bs.getPlayerIds()) {
      ships.push({
        id: ships.length,
        playerId: playerId
      });
    }
  };

  const createShipsPositions = () => {
    for (const ship of ships) {
      ship.positions = createShipPositions(ship);
    }
  };

  const createShipPositions = () => {
    const positions = [];
    const direction = getRandomDirection();
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
    for (let idx = 0; idx < shipLength; idx++) {
      positions.push({
        x: initialX + incrementX * idx,
        y: initialY + incrementY * idx
      });
    }
    return positions;
  };

  const getRandomDirection = () => {
    return _.random(1) ? 'horizontal' : 'vertical';
  };

  // log

  const logShips = () => {
    for (const ship of ships) {
      const shipPositions = [];
      for (const position of ship.positions) {
        shipPositions.push(`(${position.x}, ${position.y})`);
      }
      helpers.log(`Ship #${ship.id}: ${shipPositions.join(', ')}`);
    }
  };

  // PUBLIC METHODS

  bs.initShips = () => {
    getLengthFromInput();
    createShips();
    createShipsPositions();
    logShips();
  };

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
