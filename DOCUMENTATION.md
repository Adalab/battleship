# Battleship

## Technical documentation

Here is the technical documentation related to the JavaScript part of the project.

## Directories

The project is divided into three folders:

- `_src/js/battleship/:` folder where the game engine is, in these files we control the board, the turns, the ships, the shots, we check if a player has won the game...
- `_src/js/players/:` folder where are the artificial intelligences programmed by the players. Right now there are two players: **WonderWoman** and **Maricarmen**.
- `_src/js/libs/:` folder where we store the external libraries.

## Game flow

When starting the web page, all JS files are loaded and:

1. The game engine loads the players.
1. Next, wait for the **Start** button to be clicked. So:
   1. The game engine generates the board.
   1. The game engine randomly generates a boat for each player.
   1. Each time the **Next** button is clicked, a new turn is started consisting of:
      1. The engine executes the `shoot` method of the player who is currently playing, which is in `_src / js/players/player-*.js`. This method receives as an only parameter an object with all the information that is needed to be able to shoot, such as the size of the board, the coordinates of the shots it has taken in previous turns, the coordinates of its ship...
      1. `shoot` method returns the coordinates of the board where the player is shooting.
      1. The engine uses these coordinates to know if it has fired in water or hit a ship.
      1. The engine checks if the player has won.

> **Note:** The **Previous** button undoes a player's last turn. It is designed to facilitate the programming and debugging of the game.

## Shoot method

Each time it is the turn of a player, the game engine executes its shoot function. This function receives everything you need. The public functions of the engine that are in the global variable `bs` must NOT be accessed from the players' files.

## Modules

We have divided the game engine into several modules so that the code is tidier and cleaner. These modules are in `_src/js/battleship/`.

### Public methods

Public or shared functions between different modules are added to the global object:

```javascript
const bs = {}; // _src/js/battleship/battleship.js file
```

### Private methods and data

We want to have private functions and variables, not shared between the different modules. Therefore, all the variables and functions of a module are within a general function.

Thanks to the scope of functions in JavaScript, all code written within a function is not accessible from outside the function.

This general function is auto executed when the application is started. Therefore, the function starts with `(function () {` and ends with a parenthesis `()`.

```javascript
(function() {
  // private code
})();
```

To see an example see the file `\_src/js/battleship/bs-board.js`.

## Event oriented architecture

This game has events or actions architecture. This means that the game stores all the events that have happened during the game. These events are all shots fired in each turn.

In this way we can travel back in time when the **Previous** button is pressed. These events or shots are stored in:

```javascript
const shots = []; // _src/js/battleship/bs-shots.js file
```

> **Note:** in this section we talk about events, but it has nothing to do with JavaScript events.
