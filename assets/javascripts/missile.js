class Missile {
  constructor(screenWidth) {
    this.x = Math.random() * (screenWidth - 50) + 25;
    this.y = 0;
    this.code = "Missile"; // Eventually randomly generated code
  }

  fall() {
    this.y++;
  }

  impact() {
    console.log("Missile has impacted");
  }
}

export default Missile;
