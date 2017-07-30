import Missile from './missile';

class Game {
  constructor(screenWidth, screenHeight) {
    this.score = 0;
    this.lives = 3;
    this.wave = 1;

    this.screenWidth = screenWidth;
    this.screenHeight = screenHeight;

    this.missiles = [new Missile(screenWidth)];
  }

  impact() {
    this.missiles[0].impact();
    this.missiles = [];
  }

  start() {
    console.log("Game started");
  }

  pause() {
    console.log("Game paused");
  }

  unpause() {
    console.log("Game unpaused");
  }
}

export default Game;
