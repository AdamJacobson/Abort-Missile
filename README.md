# Abort Missile!

_Abort Missile!_ is a typing game based on Missile Command.

[live link](https://adamjacobson.github.io/Abort-Missile/)

## Background

_Missile Command_ is an old game which involves shooting down missiles before they hit the ground, destroying the players city in the process. There are several modern incarnations.

In _Abort Missile!_ the player must type words which match the self-destruct codes of incoming missiles.

The player withstand only 3 strikes before the game ends. The game is played in waves with a certain number of missiles coming in each one and the words required to abort them getting longer each time.

## Instructions

- Player begins the game with 3 lives, represented by little buildings in the lower right corner
- Missiles will begin to rain from the sky. Each missile will appear with a word nearby.
- The player must type the word exactly as it appears and press ENTER or SPACE to send the word out. Any missiles with the matching code will be destroyed.
- The player can only withstand 3 hits until the game is over.
- There are 10 waves with the words required to be type becoming longer each wave.

## Screenshots

![welcome](https://github.com/AdamJacobson/Abort-Missile/blob/master/docs/images/welcome.JPG)

![typing](https://github.com/AdamJacobson/Abort-Missile/blob/master/docs/images/typing.JPG)

![exploding](https://github.com/AdamJacobson/Abort-Missile/blob/master/docs/images/explode.JPG)

## Technologies and Architecture

- Vanilla JavaScript for structure. ES6 classes will be used.
- HTML5 vanilla canvas with no libraries.
- Webpack to bundle javascript files.

`app.js` just does initial setup of the game

`game.js` which will hold the game state, user lives, score and all active missiles. It will also handle user input and manage the stage of the game.

`random_words.js` holds a library of words organized by length.

`missile.js` which represents one missile. Has the code associated with it, a point value and current location on the screen.

`animate.js` will contain the canvas code for rendering the game based on the current stage. It will manage and keep track of all active sprite animations.

`sprite.js` defines a sprite based on a sprite sheet in order to create frame based animations

`stages.js` is just a collection of `consts`'s which represent the stage of the game

## Code Snippets

The game logic uses a Stages pattern in order to determine the functionality at any particular moment. Stages are simply defined as constant numerals.

```javascript
// stages.js
export const NOT_STARTED = 0;
export const PLAYING = 1;
export const PAUSED = 2;
export const WAVE_WON = 3;
export const WAVE_LOST = 4;
export const GAME_COMPLETE = 5;
```

Animation logic checks the stage in order to determine the correct items to render to the cavas.

```javascript
// animate.js
function renderFrame() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  renderBackground();

  switch (game.stage) {
    case Stages.NOT_STARTED:
      renderTitleScreen();
      break;

    case Stages.PLAYING:
      renderSprites();
      renderMissiles();
      renderHud();
      break;

    case Stages.PAUSED:
      renderPauseScreen();
      break;

    case Stages.WAVE_LOST:
      renderGameOverScreen();
      clearSprites();
      break;

    case Stages.WAVE_WON:
      renderWaveCompleteScreen();
      clearSprites();
      break;

    case Stages.GAME_COMPLETE:
      renderGameCompleteScreen();
      break;
  }

  window.requestAnimationFrame(() => renderFrame());
}
```

Game logic uses stages to determine the results of user input.

```javascript
// game.js
switch (this.stage) {
  case Stages.NOT_STARTED:
    if (this._anyKey(keyCode)) {
      this.nextWave();
    }
    break;

  case Stages.PAUSED:
    if (this._anyKey(keyCode)) {
      this.unpause();
    }
    break;
    . . .
  }
```

## Bonus features

Time permitting, the following features will be added.

**Score Keeping**: Maintain the current best score for the player.

**Diversify enemy types**: Add special enemy type such as MIRVs which break into multiple smaller missiles.

**Powerups**: Special items which appear and aren't dangerous but grant the player special abilities (extra lives, time slowing)

**Difficulty**: More dynamic and better difficulty with variations in missile speed.
