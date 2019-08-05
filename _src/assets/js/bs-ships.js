'use strict';

(function () {

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
    for (const playerId of battleship.getPlayerIds()) {
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
      initialX = _.random(battleship.getBoardWidth() - shipLength);
      initialY = _.random(battleship.getBoardHeight());
      incrementX = 1;
      incrementY = 0;
    } else {
      initialX = _.random(battleship.getBoardWidth());
      initialY = _.random(battleship.getBoardHeight() - shipLength);
      incrementX = 0;
      incrementY = 1;
    }
    for (let idx = 0; idx < shipLength; idx++) {
      positions.push({
        x: initialX + (incrementX * idx),
        y: initialY + (incrementY * idx)
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

  battleship.initShips = () => {
    getLengthFromInput();
    createShips();
    createShipsPositions();
    logShips();
  };

  // battleship.getShipIdAt = (x, y) => {
  //   for (const ship of ships) {
  //     for (const position of ship.positions) {
  //       if (position.x === x && position.y === y) {
  //         return ship.id;
  //       }
  //     }
  //   }
  //   return '';
  // };

}());
