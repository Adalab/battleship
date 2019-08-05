'use strict';

(function () {

  // PRIVATE DATA

  const shoots = [];

  // PRIVATE METHODS

  const getPlayerShootData = () => {
    return {
      board: {
        width: battleship.getBoardWidth(),
        height: battleship.getBoardHeight()
      }
    };
  };

  const logShoots = () => {
    helpers.log('Total shoots:', shoots.length);
  };

  // PUBLIC METHODS

  battleship.runNextShoot = () => {
    helpers.logGroup('Shooting...');
    const player = battleship.getCurrentPlayer();
    const playerShootData = getPlayerShootData();
    const shoot = player.shoot(playerShootData);
    shoot.playerId = player.id;
    shoots.push(shoot);
    battleship.renderBoard();
    helpers.log(`Player #${shoot.playerId} shot: (${shoot.x}, ${shoot.y})`);
    logShoots();
    helpers.logGroupEnd();
  };

  battleship.goPreviousShoot = () => {
    helpers.logGroup('Going previous shoot...');
    shoots.pop();
    battleship.renderBoard();
    logShoots();
    helpers.logGroupEnd();
  };

}());
