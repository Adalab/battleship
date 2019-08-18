'use strict';

(function() {
  // PRIVATE DATA

  const shoots = [];

  // PRIVATE METHODS

  const getNextShoot = () => {
    const lastShoot = _.last(shoots) || {};
    const player = bs.getNextPlayer(lastShoot.playerId);
    const playerShootData = getPlayerShootData(player.id);
    const shoot = player.shoot(playerShootData);
    shoot.playerId = player.id;
    shoots.push(shoot);
    logShoot(shoot);
  };

  const getPlayerShootData = playerId => {
    return _.cloneDeep({
      board: bs.getBoardDataForPlayer(),
      ships: bs.getShipsDataForPlayer(playerId),
      shoots: getShootsDataForPlayer(playerId)
    });
  };

  const getShootsDataForPlayer = playerId => {
    const playerShoots = [];
    for (const shoot of shoots) {
      if (shoot.playerId === playerId) {
        playerShoots.push({
          x: shoot.x,
          y: shoot.y,
          damaged: bs.isThereDamageAt(shoot.x, shoot.y)
        });
      }
    }
    return playerShoots;
  };

  const logShoot = shoot => {
    const isThereDamage = bs.isThereDamageAt(shoot.x, shoot.y);
    const playerName = bs.getPlayerName(shoot.playerId);
    if (isThereDamage) {
      helpers.log(`${playerName} (#${shoot.playerId}) shot: (${shoot.x}, ${shoot.y}) and hit`);
    } else {
      helpers.log(`${playerName} (#${shoot.playerId}) shot: (${shoot.x}, ${shoot.y}) and failed`);
    }
  };

  const logShoots = () => {
    helpers.log('Total shoots:', shoots.length);
  };

  const logGameOver = () => {
    if (bs.isGameOver()) {
      helpers.log('GAME OVER!!!!');
    }
  };

  // PUBLIC METHODS

  bs.fireShoot = () => {
    helpers.logGroup('Shooting...');
    getNextShoot();
    logShoots();
    logGameOver();
    bs.renderBoard();
    helpers.logGroupEnd();
  };

  bs.goPreviousShoot = () => {
    helpers.logGroup('Going previous shoot...');
    shoots.pop();
    bs.renderBoard();
    logShoots();
    helpers.logGroupEnd();
  };

  bs.isThereShootAt = (x, y) => {
    for (const shoot of shoots) {
      if (shoot.x === x && shoot.y === y) {
        return true;
      }
    }
    return false;
  };

  bs.isThereDamageAt = (x, y) => {
    const isThereShipAt = bs.isThereShipAt(x, y);
    const isThereShoot = bs.isThereShootAt(x, y);
    return isThereShipAt && isThereShoot;
  };
})();
