import * as Stages from './stages';
import Missile from './missile';
import render from './animate';
import { waves, finalWave } from './waves';

class Game {
  constructor() {
    const canvas = document.getElementById('canvas');
    this.screenWidth = canvas.width;
    this.screenHeight = canvas.height;

    this.reset();

    render(this);
  }

  reset() {
    this.score = 0;
    this.lives = 3;
    this.wave = 0;

    this.missiles = [];
    this.gameLoop = null;
    this.paused = false;
    this.code = "";
    this.stage = Stages.NOT_STARTED;
  }

  sendKey(e) {
    const keyCode = e.which;

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
        if (this._anyKey(keyCode)) {
          this.nextWave();
        }
        break;

      case Stages.WAVE_LOST:
        if (this._anyKey(keyCode)) {
          this.reset();
        }
        break;

      case Stages.GAME_COMPLETE:
        if (this._anyKey(keyCode)) {
          this.reset();
        }
        break;
    }
  }

  _anyKey(keyCode) {
    return ([13, 27, 32].includes(keyCode) || keyCode >= 65 && keyCode <= 90);
  }

  fireCode(code) {
    this.missiles.forEach((missile) => {
      if (code === missile.code) {
        missile.destroyed = true;
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
      setTimeout(() => this.endWave(), 2000);
    }
  }

  nextWave() {
    this.wave++;
    if (this.wave <= finalWave) {
      this.startWave();
    } else {
      this.stage = Stages.GAME_COMPLETE;
    }
  }

  startWave() {
    this.stage = Stages.PLAYING;
    this.missilesLeft = 0;
    const missileInterval = 1500;

    let w = waves[this.wave];
    let incoming = [];
    Object.keys(w).forEach(k => {
      this.missilesLeft += w[k];
      let i = 0;
      while (i < w[k]) {
        incoming.push(k);
        i++;
      }
    });
    incoming = this._shuffle(incoming);

    this.gameLoop = setInterval(() => {
      if (!this.paused) {
        if (this.missilesLeft > 0) {
          const missile = new Missile(this.screenWidth, incoming[0]);
          this.missiles.push(missile);
          missile.startFalling();
          this.missilesLeft--;
          incoming = incoming.slice(1);
        }
      }
    }, missileInterval);
  }

  _shuffle(array) {
  let m = array.length, t, i;

  while (m) {
    i = Math.floor(Math.random() * m--);

    t = array[m];
    array[m] = array[i];
    array[i] = t;
  }

  return array;
}

  endWave() {
    this.stage = Stages.WAVE_WON;
    clearInterval(this.gameLoop);
  }

  pause() {
    // can't pause unless playing
    if (this.stage === Stages.PLAYING) {
      this.stage = Stages.PAUSED;
      this.paused = true;
      this.missiles.forEach((missile) => missile.pause());
    }
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
