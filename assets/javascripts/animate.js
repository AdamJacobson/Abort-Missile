let canvas, ctx, rocket, city;
const buildingIcon = '\uf0f7';
import * as Stages from './stages';

function animate(game) {
  canvas = document.getElementById('canvas');
  ctx = canvas.getContext('2d');

  rocket = document.getElementById('rocket');
  city = document.getElementById('city');
  window.requestAnimationFrame(() => draw(game));
}

function draw(game) {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  renderBackground();

  // switch (game.stage) {
  //   case Stages.PLAYING:
  // }

  ctx.fillText(game.stage, 20, 20);

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

  renderMissiles(game);

  renderCode(game);
  renderLives(game);
  renderScore(game);

  window.requestAnimationFrame(() => draw(game));
}

const renderMissiles = (game) => {
  game.missiles.forEach((m) => {
    ctx.drawImage(rocket, m.x - 10, m.y - 35);

    ctx.fillStyle = "black";
    ctx.font = '20px serif';
    ctx.textAlign = "center";
    ctx.fillText(m.code, m.x, m.y + m.height + 18);

    if (m.didImpact(canvas.height)) {
      game.impact(m);
    }
  });
};

const renderBackground = () => {
  // let gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
  // gradient.addColorStop(0, 'black');
  // gradient.addColorStop(1, 'blue');
  // ctx.fillStyle = gradient;
  // ctx.fillRect(0, 0, canvas.width, canvas.height);

  ctx.drawImage(city, 0, 0, canvas.width, canvas.height);
};

const renderCode = (game) => {
  ctx.fillStyle = "black";
  ctx.textAlign = "center";
  ctx.fillText(game.code, game.screenWidth / 2, game.screenHeight - 10);
};

const renderScore = (game) => {
  ctx.font = '20px serif';
  ctx.textAlign = "left";
  ctx.fillStyle = "black";
  ctx.fillText(game.score, 0 + 50, game.screenHeight - 10);
};

const renderLives = (game) => {
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
