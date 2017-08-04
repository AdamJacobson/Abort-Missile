import randomWordByLength from './random_words';

class Missile {
  constructor(screenWidth, wordLength) {
    this.code = randomWordByLength(wordLength);
    this.x = (Math.random() * (screenWidth - 50 - (5 * this.code.length))) + 25 + (2 * this.code.length);
    this.y = -90; // start off the screen
    this.points = 25 * this.code.length;

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
