import Missile from './missile';
import render from './animate';
import * as Stages from './stages';

class Game {
  constructor() {
    this.score = 0;
    this.lives = 3;
    this.wave = 0;

    const canvas = document.getElementById('canvas');

    this.screenWidth = canvas.width;
    this.screenHeight = canvas.height;

    this.missiles = [];

    this.gameLoop = null;

    this.paused = false;

    this.code = "";

    this.stage = Stages.NOT_STARTED;

    render(this);
  }

  sendKey(e) {
    const keyCode = e.which;

    switch (this.stage) {
      case Stages.NOT_STARTED:
        if ([13, 27, 32].includes(keyCode) || keyCode >= 65 && keyCode <= 90) {
          this.nextWave();
        }
        break;

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
        break;

      case Stages.WAVE_WON:
        if ([13, 27, 32].includes(keyCode) || keyCode >= 65 && keyCode <= 90) {
          this.nextWave();
        }
        break;

      case Stages.WAVE_LOST:
        break;

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
    this.lives--;
    this.removeMissile(missile);
  }

  destroy(missile) {
    this.score += missile.points;
    this.removeMissile(missile);
  }

  removeMissile(missile) {
    const idx = this.missiles.indexOf(missile);
    this.missiles = this.missiles.slice(0, idx).concat(this.missiles.slice(idx + 1));

    if (this.lives === 0) {
      this.gameOver();
    } else if (this.missilesLeft === 0 && this.missiles.length === 0) {
      this.endWave();
    }
  }

  nextWave() {
    this.wave++;
    this.startWave();
  }

  startWave() {
    this.stage = Stages.PLAYING;
    this.missilesLeft = 10;
    const missileInterval = 1500;

    this.gameLoop = setInterval(() => {
      if (!this.paused) {
        if (this.missilesLeft > 0) {
          const missile = new Missile(this.screenWidth);
          this.missiles.push(missile);
          missile.startFalling();
          this.missilesLeft--;
        }
      }
    }, missileInterval);
  }

  endWave() {
    this.stage = Stages.WAVE_WON;
    clearInterval(this.gameLoop);
  }

  pause() {
    this.stage = Stages.PAUSED;
    this.paused = true;
    this.missiles.forEach((missile) => missile.pause());
  }

  unpause() {
    this.stage = Stages.PLAYING;
    this.paused = false;
    this.missiles.forEach((missile) => missile.unpause());
  }

  gameOver() {
    this.stage = Stages.WAVE_LOST;
    clearInterval(this.gameLoop);
    this.missiles = [];

  }
}

export default Game;
