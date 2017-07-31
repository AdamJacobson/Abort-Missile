let canvas;
let ctx;

function animate(game) {
  window.requestAnimationFrame(() => draw(game));

  canvas = document.getElementById('canvas');
  ctx = canvas.getContext('2d');
}

function draw(game) {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  renderBackground(game);

  renderMissiles(game);

  renderCode(game);
  renderLives(game);
  renderScore(game);

  window.requestAnimationFrame(() => draw(game));
}

const renderMissiles = (game) => {
  game.missiles.forEach((m) => {
    ctx.fillStyle = "gray";
    ctx.fillRect(m.x, m.y, m.width, m.height);

    ctx.fillStyle = "white";
    ctx.font = '20px serif';
    ctx.textAlign="center";
    ctx.fillText(m.code, m.x, m.y + m.height + 18);

    if (m.didImpact(canvas.height)) {
      game.impact(m);
    }
  });
};

const renderBackground = (game) => {
  let gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
  gradient.addColorStop(0, 'black');
  gradient.addColorStop(1, 'blue');
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, canvas.width, canvas.height);
};

const renderCode = (game) => {
  ctx.fillStyle = "white";
  ctx.textAlign = "center";
  ctx.fillText(game.code, game.screenWidth / 2, game.screenHeight - 10);
};

const renderScore = (game) => {
  ctx.font = '20px serif';
  ctx.textAlign = "left";
  ctx.fillStyle = "white";
  ctx.fillText(game.score, 0 + 50, game.screenHeight - 10);
};

const renderLives = (game) => {
  ctx.font='20px FontAwesome';
  ctx.fillStyle = "white";
  ctx.textAlign="left";
  let life = 0;
  while (life < game.lives) {
    ctx.fillText('\uf0f7',game.screenWidth - 100 + (life * 30), game.screenHeight - 10);
    life++;
  }
};

export default animate;
