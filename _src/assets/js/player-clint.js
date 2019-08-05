'use strict';

(function () {

  battleship.addPlayer({
    name: 'Clint',
    shoot: (data) => {
      return {
        x: _.random(data.board.width - 1),
        y: _.random(data.board.height - 1)
      };
    }
  });

}());
