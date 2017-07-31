import Missile from './missile';
import animate from './animate';
import * as Stages from './stages';

class Game {
  constructor() {
    this.score = 0;
    this.lives = 3;
    this.wave = 1;

    const canvas = document.getElementById('canvas');

    this.screenWidth = canvas.width;
    this.screenHeight = canvas.height;

    this.missiles = [];

    this.gameLoop = null;

    this.paused = false;

    this.code = "";

    this.stage = Stages.NOT_STARTED;

    animate(this);
  }

  sendKey(e) {
    const keyCode = e.which;

    switch (this.stage) {
      case Stages.PAUSED:
        if ([13, 27, 32].includes(keyCode) || keyCode >= 65 && keyCode <= 90) {
          this.unpause();
        }
        break;

      case Stages.PLAYING:
        if (keyCode === 27) { // Escape
          if (this.stage === Stages.PAUSED) {
            this.unpause();
          } else {
            this.pause();
          }
        } else if (keyCode === 13 || keyCode === 32) { // enter || space
          this.fireCode(this.code);
          this.code = "";
        } else if (keyCode === 8) { // backspace
          this.code = this.code.slice(0, this.code.length - 1);
        } else if (keyCode >= 65 && keyCode <= 90) {
          this.code += e.key;
        }
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
    this.stage = Stages.PLAYING;

    console.log("Game started");
    this.gameLoop = setInterval(() => {
      if (!this.paused) {
        const missile = new Missile(this.screenWidth);
        this.missiles.push(missile);
        missile.startFalling();
      }
    }, 1500);
  }

  pause() {
    this.stage = Stages.PAUSED;
    this.paused = true;
    this.missiles.forEach((missile) => missile.pause());
    console.log("Game paused");
  }

  unpause() {
    this.stage = Stages.PLAYING;
    this.paused = false;
    this.missiles.forEach((missile) => missile.unpause());
    console.log("Game unpaused");
  }

  checkGameOver() {
    if (this.lives <= 0) {
      this.gameOver();
    }
  }

  gameOver() {
    this.stage = Stages.WAVE_LOST;
    clearInterval(this.gameLoop);
    this.missiles = [];
    console.log("Game Over. Final score: " + this.score);

  }
}

export default Game;
