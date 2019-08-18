'use strict';

/**
 * @module bs-board
 * @desc Module responsible for managing the game board.
 */

(function() {
  /**
   * @const {Object} board
   * @desc Constant where we store the information of the board as the width and height.
   */
  const board = {};

  /**
   * @func getDimensionsFromInputs
   * @returns The CSS classes that has a cell depending on whether there is a ship and if it is damaged.
   */
  const getDimensionsFromInputs = () => {
    board.width = parseInt(helpers.getInputValue('.js-board-width-input'));
    board.height = parseInt(helpers.getInputValue('.js-board-height-input'));
  };

  /**
   * @func getCellClassName
   * @desc Read the dimensions of the board from DOM and save them on the constant board.
   */
  const getCellClassName = (x, y) => {
    const shipId = bs.getShipIdAt(x, y);
    const isThereShot = bs.isThereShotAt(x, y);
    const isThereDamage = bs.isThereDamageAt(x, y);
    let className = 'cell';
    if (shipId !== '') {
      className += ` ship ship-${shipId}`;
    }
    if (isThereShot) {
      className += ' shot';
    }
    if (isThereDamage) {
      className += ' damaged';
    }
    return className;
  };

  /**
   * @func logBoard
   * @desc Log board info in console.
   */
  const logBoard = () => {
    helpers.log(`Board initialized: ${board.width} x ${board.height}`);
  };

  /**
   * @method initBoard
   * @desc Init board module. Read dimensions from DOM inputs and save it.
   */
  bs.initBoard = () => {
    getDimensionsFromInputs();
    logBoard();
  };

  /**
   * @method renderBoard
   * @desc Paint board into DOM.
   */
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

  /**
   * @method getBoardDataForPlayer
   * @returns {Object} Useful information for the player relative to the board.
   */
  bs.getBoardDataForPlayer = () => {
    return {
      width: board.width,
      height: board.height
    };
  };

  /**
   * @method getBoardWidth
   * @returns {Number} The width of the board in cells.
   */
  bs.getBoardWidth = () => board.width;

  /**
   * @method getBoardHeight
   * @returns {Number} The height of the board in cells.
   */
  bs.getBoardHeight = () => board.height;
})();
