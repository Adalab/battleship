'use strict';

(function () {

  // PRIVATE DATA

  const board = {};

  // PRIVATE METHODS

  const getDimensionsFromInputs = () => {
    board.width = parseInt(helpers.getElementValue('.js-board-width-input'));
    board.height = parseInt(helpers.getElementValue('.js-board-height-input'));
  };

  const getCellClassName = (x, y) => {
    // const shipId = ships.getShipIdAt(x, y);
    // const shootData = actions.getShootAt(x, y);
    let className = 'cell';
    // if (shipId) {
    //   className += ` ship-${shipId}`;
    // }
    // if (shootData) {
    //   className += ' shoot';
    // }
    return className;
  };

  const logBoard = () => {
    helpers.log(`Board initialized: ${board.width} x ${board.height}`);
  };

  // PUBLIC METHODS

  battleship.initBoard = () => {
    getDimensionsFromInputs();
    logBoard();
  };

  battleship.renderBoard = () => {
    let htmlCode = '';
    for (let y = 0; y < board.height; y++) {
      htmlCode += `<li class="row">`;
      for (let x = 0; x < board.width; x++) {
        htmlCode += `<span class="${getCellClassName(x, y)}"></span>`;
      }
      htmlCode += '</li>';
    }
    helpers.setElementHtml('.js-board', htmlCode);
  };

  battleship.getBoardWidth = () => board.width;

  battleship.getBoardHeight = () => board.height;

}());
