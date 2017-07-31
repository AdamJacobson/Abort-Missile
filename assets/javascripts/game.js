import Missile from './missile';
import animate from './animate';

class Game {
  constructor(screenWidth, screenHeight) {
    this.score = 0;
    this.lives = 3;
    this.wave = 1;

    this.screenWidth = screenWidth;
    this.screenHeight = screenHeight;

    this.missiles = [];

    this.gameLoop = null;

    this.paused = false;

    this.code = "";

    animate(this);
  }

  sendKey(e) {
    const keyCode = e.which;

    if (keyCode === 27) { // Escape
      // pause game
    } else if (keyCode === 13 || keyCode === 32) { // enter || space
      this.fireCode(this.code);
      this.code = "";
    } else if (keyCode === 8) { // backspace
      this.code = this.code.slice(0, this.code.length - 1);
    } else if (keyCode >= 65 && keyCode <= 90) {
      this.code += e.key;
    }
  }

  fireCode(code) {
    this.missiles.forEach((missile) => {
      if (code === missile.code) {
        this.destroy(missile);
      }
    });
  }

  impact(missile) {
    this.removeMissile(missile);
    this.lives--;
    this.checkGameOver();
  }

  destroy(missile) {
    this.removeMissile(missile);
    this.score += missile.points;
  }

  removeMissile(missile) {
    const idx = this.missiles.indexOf(missile);
    this.missiles = this.missiles.slice(0, idx).concat(this.missiles.slice(idx + 1));
  }

  start() {
    console.log("Game started");
    this.gameLoop = setInterval(() => {
      const missile = new Missile(this.screenWidth);
      this.missiles.push(missile);
      missile.startFalling();
    }, 3000);
  }

  pause() {
    // this.paused = true;
    // this.missiles.forEach((missile) => missile.pauseFalling());
    console.log("Game paused");
  }

  unpause() {
    // this.paused = false;
    // this.missiles.forEach((missile) => missile.startFalling());
    console.log("Game unpaused");
  }

  checkGameOver() {
    if (this.lives <= 0) {
      this.gameOver();
    }
  }

  gameOver() {
    clearInterval(this.gameLoop);
    this.missiles = [];
    console.log("Game Over. Final score: " + this.score);

  }
}

export default Game;
