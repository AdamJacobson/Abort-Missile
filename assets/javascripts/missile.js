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

    this.startFalling();
  }

  startFalling() {
    this.fallInterval = setInterval(() => this.fall(), this.fallSpeed);
  }

  pauseFalling() {
    clearInterval(this.fallInterval);
  }

  didImpact(screenHeight) {
    return this.y + this.height >= screenHeight;
  }

  fall() {
    this.y += 1;
  }

  impact() {
    console.log("Missile has impacted");
  }
}

export default Missile;
