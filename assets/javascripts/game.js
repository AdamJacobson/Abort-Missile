class Game {
  constructor() {
    this.score = 0;
    this.lives = 3;
    this.wave = 1;
  }

  start() {
    console.log("Game started");
  }

  pause() {
    console.log("Game paused");
  }

  unpause() {
    console.log("Game unpaused");
  }
}

export default Game;
