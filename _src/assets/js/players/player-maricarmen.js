'use strict';

(function() {
  bs.addPlayer({
    name: 'Maricarmen',
    shoot: data => {
      return {
        x: Math.floor(Math.random() * data.board.width),
        y: Math.floor(Math.random() * data.board.height)
      };
    }
  });
})();
