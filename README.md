# Battleship

## ¿Qué es Battleship?

Battleship es un juego colaborativo de programación para todas las Adalabers. Está inspirado en el clásico juego de nuestra infancia **Hundir la flota**.

La misión de este proyecto no es jugar, sino **programar**. La gracia está en programar una inteligencia artificial que compita por hundir los barcos de tus contrincantes, que también serán inteligencias artificiales programadas por otras Adalabers.

## ¿Cómo funciona?

Los [ficheros de JavaScript](./_src/js) están divididos en tres carpetas:

- `libs:` carpeta donde guardamos las librerías externas.
- `battleship:` carpeta donde está el motor del juego, en estos ficheros controlamos el tablero, los turnos, comprobamos si una jugadora ha ganado la partida...
- `players:` carpeta donde están las inteligencias artificiales programadas por las adalabers. Ahora mismo hay dos jugadoras: **Wonderwoman** y **Maricarmen**.

Al arrancar la página web se cargan todos los ficheros JS y:

1. El motor del juego carga a las jugadoras.
1. A continuación se espera a que el botón **Start** sea pulsado. Entonces:
   1. El motor del juego genera el tablero.
   1. El motor del juego genera aleatoriamente un barco para cada jugadora.
   1. Cada vez que se pulsa el botón **Next** se inicia un nuevo turno que consiste en:
      1. El motor ejecuta el método `shoot` de la jugadora que le toca en este momento, que está en `_src/js/players/player-jugadora-actual.js`. Este método recibe como único parámetro un objeto con toda la información que se necesita para poder disparar, como por ejemplo el tamaño del tablero, las coordenadas de los disparos que ha hecho en turnos anteriores, las coordenadas de su barco...
      1. Dicho método `shoot` devuelve al motor del juego las coordenadas del tablero donde la jugadora está disparando.
      1. El motor usa dichas coordenadas para saber si ha disparado en agua o dado a algún barco.
      1. El motor comprueba si la jugadora ha ganado.

> **Nota:** El botón **Previous** deshace el último turno de una jugadora. Está pensado para facilitar la programación y el debugging del juego.

> **Nota:** mira la consola de Devtools para la progresión del juego.

## ¿Cómo jugar?

Descárgate este repo en tu ordenador y haz:

```bash
npm install
```

```bash
gulp
```

Actualmente el juego está preparado para dos jugadoras. Edita uno de los ficheros `_src/js/players/player-wonderwoman.js` o `_src/js/players/player-maricarmen.js`, el que más rabia te dé.

Debes programar el método shoot:

```javascript
bs.addPlayer({
  name: 'Maricarmen',
  shoot: data => {
    return {
      x: _.random(data.board.width - 1),
      y: _.random(data.board.height - 1)
    };
  }
});
```

Como ves este método devuelve las coordenadas X e Y de donde queremos disparar. Ahora mismo este método devuelve coordenadas aleatorias. Lo ideal que no sean aleatorias, lo ideal es programar una inteligencia que haga lo que tú quieras, como por ejemplo:

- No disparar sobre tu propio barco.
- No disparar en un sitio donde ya hayas disparado antes.
- Cualquier otra estrategia que se te ocurra.

## Cómo colaborar

## Documentación técnica
