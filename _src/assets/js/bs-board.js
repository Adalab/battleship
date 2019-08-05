'use strict';

(function() {
  // PRIVATE DATA

  const board = {};

  // PRIVATE METHODS

  const getDimensionsFromInputs = () => {
    board.width = parseInt(helpers.getElementValue('.js-board-width-input'));
    board.height = parseInt(helpers.getElementValue('.js-board-height-input'));
  };

  const getCellClassName = (x, y) => {
    const shipId = bs.getShipIdAt(x, y);
    const isThereShoot = bs.isThereShootAt(x, y);
    const isThereDamage = bs.isThereDamageAt(x, y);
    let className = 'cell';
    if (shipId !== '') {
      className += ` ship ship-${shipId}`;
    }
    if (isThereShoot) {
      className += ' shoot';
    }
    if (isThereDamage) {
      className += ' damaged';
    }
    return className;
  };

  const logBoard = () => {
    helpers.log(`Board initialized: ${board.width} x ${board.height}`);
  };

  // PUBLIC METHODS

  bs.initBoard = () => {
    getDimensionsFromInputs();
    logBoard();
  };

  bs.renderBoard = () => {
    let htmlCode = '';
    for (let y = 0; y < board.height; y++) {
      htmlCode += `<li class="row">`;
      for (let x = 0; x < board.width; x++) {
        htmlCode += `<span class="${getCellClassName(x, y)}">${x},${y}</span>`;
      }
      htmlCode += '</li>';
    }
    helpers.setElementHtml('.js-board', htmlCode);
  };

  bs.getBoardDataForPlayer = () => {
    return {
      width: board.width,
      height: board.height
    };
  };

  bs.getBoardWidth = () => board.width;

  bs.getBoardHeight = () => board.height;
})();
