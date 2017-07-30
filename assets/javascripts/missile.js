class Missile {
  constructor(screenWidth) {
    this.x = Math.random() * (screenWidth - 50) + 25;
    this.y = 0;
    this.code = "Missile"; // Eventually randomly generated code

    this.height = 50;
    this.width = 10;
  }

  didImpact(screenHeight) {
    return this.y + this.height >= screenHeight;
  }

  fall() {
    this.y += 1.5;
  }

  impact() {
    console.log("Missile has impacted");
  }
}

export default Missile;
