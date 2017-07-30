import Missile from './missile';

class Game {
  constructor(screenWidth, screenHeight) {
    this.score = 0;
    this.lives = 3;
    this.wave = 1;

    this.screenWidth = screenWidth;
    this.screenHeight = screenHeight;

    this.missiles = [];
  }

  impact(missile) {
    this.removeMissile(missile);
    console.log("Missile has impacted");
  }

  destroy(missile) {
    this.removeMissile(missile);
    console.log("Missile was destroyed");
  }

  removeMissile(missile) {
    const idx = this.missiles.indexOf(missile);
    if (idx > -1) {
      this.missiles.splice(idx, 1);
    }
  }

  start() {
    console.log("Game started");
    setInterval(() => {
      this.missiles.push(new Missile(this.screenWidth));
    }, 3000);
  }

  pause() {
    console.log("Game paused");
  }

  unpause() {
    console.log("Game unpaused");
  }
}

export default Game;
