import * as Stages from './stages';

let canvas, ctx, rocket, city, game;
const buildingIcon = '\uf0f7';

const defaultFont = "Exo 2";
const font = (size) => {
  return `${size}px '${defaultFont}'`;
};

function animate(g) {
  game = g;
  canvas = document.getElementById('canvas');
  ctx = canvas.getContext('2d');

  rocket = document.getElementById('rocket');
  city = document.getElementById('city');
  window.requestAnimationFrame(() => draw(game));
}

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  renderBackground();

  switch (game.stage) {
    case Stages.PLAYING:
      renderMissiles(game);
      renderCode(game);
      renderLives(game);
      renderScore(game);
      break;

    case Stages.PAUSED:
      renderPauseScreen();
      break;

    case Stages.WAVE_LOST:
      renderGameOverScreen();
      break;
  }

  // rocket = document.getElementById('rocket');
  // let rocket = new Image();
  // rocket.src = "https://mdn.mozillademos.org/files/5397/rhino.jpg";

  // if(rocket.complete) {
    // ctx.drawImage(rocket, 0, 0, 50, 100);
  // } else {
  //   rocket.onLoad = function() {
  //     ctx.drawImage(rocket, 0, 0);
  //     console.log("rocket loaded");
  //   };
  // }

  // Testing only. Show game stage
  ctx.fillText(game.stage, 20, 20);

  window.requestAnimationFrame(() => draw(game));
}

const renderOverlay = () => {
  ctx.fillStyle = "rgba(100, 100, 100, 0.7)";
  ctx.fillRect(0, 0, game.screenWidth, game.screenHeight);
};

const renderPauseScreen = () => {
  renderOverlay();

  ctx.fillStyle = "white";
  ctx.textAlign = "center";
  ctx.font = font(50);
  ctx.fillText("Game Paused", game.screenWidth / 2, 100);

  ctx.font = font(30);
  ctx.fillText("Instructions", game.screenWidth / 2, 160);

  ctx.font = font(20);
  ctx.fillText("Type the word which appears next to the missile", game.screenWidth / 2, 200);
  ctx.fillText("Press ENTER or SPACE to send the word", game.screenWidth / 2, 225);
  ctx.fillText("Press any key to resume the game", game.screenWidth / 2, game.screenHeight - 100);
};

const renderGameOverScreen = () => {
  renderOverlay();

  ctx.fillStyle = "white";
  ctx.textAlign = "center";
  ctx.font = font(50);
  ctx.fillText("Game Over", game.screenWidth / 2, 100);

  ctx.font = font(30);
  ctx.fillText("Final Score: " + game.score, game.screenWidth / 2, 160);
  ctx.fillText("Wave: " + game.wave, game.screenWidth / 2, 200);

  ctx.font = font(20);
  ctx.fillText("Press any key to play again", game.screenWidth / 2, 250);
};

const renderMissiles = () => {
  game.missiles.forEach((m) => {
    ctx.drawImage(rocket, m.x - 10, m.y - 35);

    ctx.fillStyle = "black";
    ctx.font = font(20);
    ctx.textAlign = "center";
    ctx.fillText(m.code, m.x, m.y + m.height + 18);

    if (m.didImpact(canvas.height)) {
      game.impact(m);
    }
  });
};

const renderBackground = () => {
  ctx.drawImage(city, 0, 0, canvas.width, canvas.height);
};

const renderCode = () => {
  ctx.fillStyle = "black";
  ctx.textAlign = "center";
  ctx.fillText(game.code, game.screenWidth / 2, game.screenHeight - 10);
};

const renderScore = () => {
  ctx.font = font(20);
  ctx.textAlign = "left";
  ctx.fillStyle = "black";
  ctx.fillText(game.score, 0 + 50, game.screenHeight - 10);
};

const renderLives = () => {
  ctx.font = '20px FontAwesome';
  ctx.fillStyle = "black";
  ctx.textAlign = "left";
  let life = 0;
  while (life < game.lives) {
    ctx.fillText(buildingIcon, game.screenWidth - 100 + (life * 30), game.screenHeight - 10);
    life++;
  }
};

export default animate;
