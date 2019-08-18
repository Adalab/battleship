'use strict';

(function() {
  bs.addPlayer({
    name: 'Maricarmen',
    shoot: data => {
      return {
        x: Math.floor(Math.random() * data.board.width - 1),
        y: Math.floor(Math.random() * data.board.height - 1)
      };
    }
  });
})();
