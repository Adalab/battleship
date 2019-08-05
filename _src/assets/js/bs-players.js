'use strict';

(function () {

  // PRIVATE DATA

  let players = [];
  let currentPlayer = 0;

  // PRIVATE METHODS

  const shufflePlayers = () => {
    players = _.shuffle(players);
  };

  const setPlayersId = () => {
    for (let idx = 0; idx < players.length; idx++) {
      players[idx].id = idx;
    }
  };

  const logPlayers = () => {
    for (const player of players) {
      helpers.log('Player added #' + player.id + ': ' + player.name);
    }
  };

  // PUBLIC METHODS

  battleship.addPlayer = (player) => {
    players.push(player);
  };

  battleship.initPlayers = () => {
    shufflePlayers();
    setPlayersId();
    logPlayers();
  };

  battleship.getPlayerIds = () => {
    const result = [];
    for (const player of players) {
      result.push(player.id);
    }
    return result;
  };

  battleship.getCurrentPlayer = () => {
    return players[currentPlayer];
  };

  battleship.setNextPlayer = () => {
    currentPlayer = (currentPlayer + 1) % players.length;
  };

}());
