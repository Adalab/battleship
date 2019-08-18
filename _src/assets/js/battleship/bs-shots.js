'use strict';

/**
 * @module bs-shots
 * @desc Module that manages the shots of the ships of the game.
 */

(function() {
  /**
   * @const {Array} shots
   * @desc Constant where we store the shots of all players.
   */
  const shots = [];

  /**
   * @func getNextShot
   * @desc Get the player from the last shot, get the next player.
   * Execute his shoot function.
   * Save the new shot.
   */
  const getNextShot = () => {
    const lastShot = _.last(shots) || {};
    const player = bs.getNextPlayer(lastShot.playerId);
    const playerShootData = getPlayerShootData(player.id);
    const shot = player.shoot(playerShootData);
    shot.playerId = player.id;
    shots.push(shot);
    logShot(shot);
  };

  /**
   * @func getPlayerShootData
   * @returns {Object} Useful information for the player relative to the game.
   * This information is passed to the player's shoot function.
   */
  const getPlayerShootData = playerId => {
    return _.cloneDeep({
      board: bs.getBoardDataForPlayer(),
      ships: bs.getShipsDataForPlayer(playerId),
      shots: getShotsDataForPlayer(playerId)
    });
  };

  /**
   * @func getShotsDataForPlayer
   * @returns {Object} Useful information for the player relative to the shots.
   */
  const getShotsDataForPlayer = playerId => {
    const playerShots = [];
    for (const shot of shots) {
      if (shot.playerId === playerId) {
        playerShots.push({
          x: shot.x,
          y: shot.y,
          damaged: bs.isThereDamageAt(shot.x, shot.y)
        });
      }
    }
    return playerShots;
  };

  /**
   * @func logShot
   * @desc Log shot info in console.
   */
  const logShot = shot => {
    const isThereDamage = bs.isThereDamageAt(shot.x, shot.y);
    const playerName = bs.getPlayerName(shot.playerId);
    if (isThereDamage) {
      helpers.log(`${playerName} (#${shot.playerId}) shot: (${shot.x}, ${shot.y}) and hit`);
    } else {
      helpers.log(`${playerName} (#${shot.playerId}) shot: (${shot.x}, ${shot.y}) and failed`);
    }
  };

  /**
   * @func logShots
   * @desc Log shots info in console.
   */
  const logShots = () => {
    helpers.log('Total shots:', shots.length);
  };

  /**
   * @func logGameOver
   * @desc Log game over info in console.
   */
  const logGameOver = () => {
    if (bs.isGameOver()) {
      helpers.log('GAME OVER!!!!');
    }
  };

  /**
   * @method fireShot
   * @desc Advance a turn in the game, usually when the next button is clicked.
   * Search for the next player, execute the player's shoot function,
   * save the shot, calculate if there is Game Over and re-render the board.
   */
  bs.fireShot = () => {
    helpers.logGroup('Shooting...');
    getNextShot();
    logShots();
    logGameOver();
    bs.renderBoard();
    helpers.logGroupEnd();
  };

  /**
   * @method goPreviousShot
   * @desc Move back one turn in the game, removing the last shot.
   */
  bs.goPreviousShot = () => {
    helpers.logGroup('Going previous shot...');
    shots.pop();
    bs.renderBoard();
    logShots();
    helpers.logGroupEnd();
  };

  /**
   * @method isThereShotAt
   * @returns {boolean} True if there is a shot in position X, Y.
   */
  bs.isThereShotAt = (x, y) => {
    for (const shot of shots) {
      if (shot.x === x && shot.y === y) {
        return true;
      }
    }
    return false;
  };

  /**
   * @method isThereDamageAt
   * @returns {boolean} True if there is damage position X, Y.
   */
  bs.isThereDamageAt = (x, y) => {
    const isThereShipAt = bs.isThereShipAt(x, y);
    const isThereShot = bs.isThereShotAt(x, y);
    return isThereShipAt && isThereShot;
  };
})();
