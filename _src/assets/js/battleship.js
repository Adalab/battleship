'use strict';

const battleship = {};

(function () {

  const board = {};
  const ships = [];
  let players = [];
  let currentPlayer = 0;

  // public methods

  battleship.addPlayer = (player) => {
    player = _.cloneDeep(player);
    player.id = _.uniqueId();
    players.push(player);
    battleship.log('Added player #' + player.id + ': ' + player.name);
  };

  battleship.play = () => {
    shufflePlayers();
    initBoard();
    createShips();
    play();
  };

  battleship.log = (...messages) => {
    // eslint-disable-next-line no-console
    console.log(...messages);
  };

  // players

  const shufflePlayers = () => {
    players = _.shuffle(players);
    const names = _.map(players, player => player.name);
    battleship.log('Shuffle players:', names.join(', '));
  };

  const getPlayerName = (id) => {
    const player = _.find(players, {
      id
    });
    return player.name;
  };

  // board

  const initBoard = () => {
    board.width = 5;
    board.height = 5;
  };

  // play

  const play = () => {
    const shootPosition = players[currentPlayer].shoot({
      board
    });
    battleship.log(getPlayerName(players[currentPlayer].id) + ' shoots at position (' + shootPosition.x + ',' + shootPosition.y + ')');
    _.each(ships, ship => {
      _.each(ship.positions, positions => {
        if (positions.x === shootPosition.x && positions.y === shootPosition.y) {
          positions.damaged = true;
          battleship.log(getPlayerName(ship.player) + '\'s ship damaged at position (' + shootPosition.x + ',' + shootPosition.y + ')');
        }
      });
    });
    if (isGameOver()) {
      battleship.log('Fleet status:');
      _.each(ships, ship => {
        battleship.log(getPlayerName(ship.player) + '\' ship:', ship.positions);
      });
    } else {
      currentPlayer = (currentPlayer + 1) % players.length;
      setTimeout(play, 1000);
    }
  };

  const isGameOver = () => {
    for (const ship of ships) {
      const isDestroyed = _.every(ship.positions, position => position.damaged);
      if (isDestroyed) {
        return true;
      }
    }
    return false;
  };

  // ships

  const createShips = () => {
    const shipLength = 4;
    _.each(players, player => createShip(player, shipLength));
  };

  const createShip = (player, length) => {
    let positions;
    if (_.random(1)) {
      const x = _.random(board.width - length);
      const y = _.random(board.height);
      positions = _.map(_.range(x, x + length), x => ({
        x: x,
        y: y,
        damaged: false
      }));
    } else {
      const x = _.random(board.width);
      const y = _.random(board.height - length);
      positions = _.map(_.range(y, y + length), y => ({
        x: x,
        y: y,
        damaged: false
      }));
    }
    ships.push({
      player: player.id,
      positions: positions
    });
    const positionsLog = _.map(positions, position => '(' + position.x + ',' + position.y + ')');
    battleship.log('Created ship for player ' + player.name + ':', positionsLog.join(' '));
  };

}());
