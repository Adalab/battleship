'use strict';

/**
 * @module bs-players
 * @desc Module that handles game players.
 */

(function() {
  /**
   * @var {Array} players
   * @desc Variable where we keep the list of players.
   */
  let players = [];

  /**
   * @func shufflePlayers
   * @desc Shuffle the players.
   */
  const shufflePlayers = () => {
    players = _.shuffle(players);
  };

  /**
   * @func setPlayersId
   * @desc Add an id to each player..
   */
  const setPlayersId = () => {
    for (let idx = 0; idx < players.length; idx++) {
      players[idx].id = idx;
    }
  };

  /**
   * @func logPlayers
   * @desc Log players info in console.
   */
  const logPlayers = () => {
    for (const player of players) {
      helpers.log('Player added #' + player.id + ': ' + player.name);
    }
  };

  /**
   * @method addPlayer
   * @param {Object} player
   * @param {string} player.name Player name.
   * @param {function} player.shoot Player shoot function.
   * @desc Add a player to the game.
   * It is called from the players files (_/src/js/players/).
   */
  bs.addPlayer = player => {
    players.push(player);
  };

  /**
   * @method initPlayers
   * @desc Init players module. Add an id to the players and shuffle them.
   */
  bs.initPlayers = () => {
    shufflePlayers();
    setPlayersId();
    logPlayers();
  };

  /**
   * @method getPlayerIds
   * @returns {array} A list of player ids.
   */
  bs.getPlayerIds = () => {
    const result = [];
    for (const player of players) {
      result.push(player.id);
    }
    return result;
  };

  /**
   * @method getPlayerName
   * @param {string} PlayerId Id of the player.
   * @returns {string} Name of the player.
   */
  bs.getPlayerName = playerId => {
    for (const player of players) {
      if (player.id === playerId) {
        return player.name;
      }
    }
    return '';
  };

  /**
   * @method getNextPlayer
   * @param {string} PlayerId Id of the player.
   * @returns {Object} Returns the next player to a given player.
   * If it is not indicated a player, returns the first player.
   * Useful to start a new turn of the game.
   */
  bs.getNextPlayer = playerId => {
    if (playerId === undefined) {
      return players[0];
    } else {
      const currentPlayer = _.find(players, { id: playerId });
      const nextPlayerId = (currentPlayer.id + 1) % players.length;
      return players[nextPlayerId];
    }
  };
})();
