import randomWordByLength from './random_words';

class Missile {
  constructor(screenWidth) {
    this.x = Math.random() * (screenWidth - 50) + 25;
    this.y = -90; // start off the screen
    this.code = randomWordByLength(4);
    this.points = 100;

    this.height = 50;
    this.width = 10;

    this.fallSpeed = 25;
    this.fallInterval = null;
    this.destroyed = false;

    this.paused = false;

    this.startFalling();
  }

  startFalling() {
    this.fallInterval = setInterval(() => {
      if (!this.paused) {
        this.fall();
      }
    }, this.fallSpeed);
  }

  pause() {
    this.paused = true;
  }

  unpause() {
    this.paused = false;
  }

  didImpact(screenHeight) {
    return this.y + this.height >= screenHeight;
  }

  fall() {
    this.y += 1;
  }
}

export default Missile;
