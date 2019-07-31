'use strict';

(function () {

  const shoot = (game) => {
    return {
      x: _.random(game.board.width),
      y: _.random(game.board.height)
    };
  };

  battleship.addPlayer({
    name: 'Clint',
    shoot: shoot
  });

}());
