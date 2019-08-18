'use strict';

(function() {
  bs.addPlayer({
    name: 'Wonder woman',
    shoot: data => {
      return {
        x: Math.floor(Math.random() * data.board.width),
        y: Math.floor(Math.random() * data.board.height)
      };
    }
  });
})();
