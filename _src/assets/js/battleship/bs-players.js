'use strict';

(function() {
  // PRIVATE DATA

  let players = [];

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

  bs.addPlayer = player => {
    players.push(player);
  };

  bs.initPlayers = () => {
    shufflePlayers();
    setPlayersId();
    logPlayers();
  };

  bs.getPlayerIds = () => {
    const result = [];
    for (const player of players) {
      result.push(player.id);
    }
    return result;
  };

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
