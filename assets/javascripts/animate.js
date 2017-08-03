import * as Stages from './stages';
import sprite from './sprite';

const buildingIcon = '\uf0f7';
let canvas, ctx, rocket, city, game;
let impactExplosionSheet, airExplosionSheet;
let activeSprites = [];

const defaultFont = "Exo 2";
const font = (size) => {
  return `${size}px '${defaultFont}'`;
};

function render(g) {
  game = g;
  canvas = document.getElementById('canvas');
  ctx = canvas.getContext('2d');

  rocket = document.getElementById('rocket');
  city = document.getElementById('city');

  impactExplosionSheet = document.getElementById('impact_explosion');
  airExplosionSheet = document.getElementById('air_explosion');

  window.requestAnimationFrame(renderFrame);
}

const impactExplosionOptions = (x, y) => {
  return {
    ctx: ctx,
    width: 131,
    height: 162,
    numberOfFrames: 25,
    ticksPerFrame: 2,
    x,
    y,
    image: impactExplosionSheet
  };
};

const airExplosionOptions = (x, y) => {
  return {
    ctx: ctx,
    width: 157,
    height: 229,
    numberOfFrames: 19,
    ticksPerFrame: 2,
    x,
    y,
    image: airExplosionSheet
  };
};

const newSprite = options => {
  activeSprites.push(sprite(options));
};

const renderSprites = () => {
  let stillActiveSprites = [];

  activeSprites.forEach(s => {
    s.update();
    s.render();

    if (!s.done) {
      stillActiveSprites.push(s);
    }
  });

  activeSprites = stillActiveSprites;
};

const clearSprites = () => {
  activeSprites = [];
};

function renderFrame() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  renderBackground();

  switch (game.stage) {
    case Stages.NOT_STARTED:
      renderTitleScreen();
      break;

    case Stages.PLAYING:
      renderSprites();
      renderMissiles();
      renderHud();
      break;

    case Stages.PAUSED:
      renderPauseScreen();
      break;

    case Stages.WAVE_LOST:
      renderGameOverScreen();
      clearSprites();
      break;

    case Stages.WAVE_WON:
      renderWaveCompleteScreen();
      clearSprites();
      break;

    case Stages.GAME_COMPLETE:
      renderGameCompleteScreen();
      break;
  }

  window.requestAnimationFrame(() => renderFrame());
}

const renderOverlay = () => {
  ctx.fillStyle = "rgba(100, 100, 100, 0.7)";
  ctx.fillRect(0, 0, game.screenWidth, game.screenHeight);
};

const renderGameCompleteScreen = () => {
  renderOverlay();

  ctx.fillStyle = "white";
  ctx.textAlign = "center";
  ctx.font = font(50);
  ctx.fillText("Thats the end!", game.screenWidth / 2, 100);

  ctx.font = font(30);
  ctx.fillText("Thanks for playing!", game.screenWidth / 2, 160);
  ctx.fillText("Final Score: " + game.score, game.screenWidth / 2, 200);

  ctx.font = font(20);
  ctx.fillText("Press any key to play again", game.screenWidth / 2, 250);
};

const renderTitleScreen = () => {
  renderOverlay();

  ctx.fillStyle = "white";
  ctx.textAlign = "center";
  ctx.font = font(50);
  ctx.fillText("Abort Missile!", game.screenWidth / 2, 100);

  ctx.font = font(30);
  ctx.fillText("Instructions", game.screenWidth / 2, 160);

  ctx.font = font(20);
  ctx.fillText("Type the word which appears by the missile", game.screenWidth / 2, 200);
  ctx.fillText("Press ENTER or SPACE to send the word", game.screenWidth / 2, 225);
  ctx.fillText("Press ESCAPE at any time to pause the game", game.screenWidth / 2, 350);
  ctx.fillText("Press any key to begin!", game.screenWidth / 2, game.screenHeight - 100);
};

const renderWaveCompleteScreen = () => {
  renderOverlay();

  ctx.fillStyle = "white";
  ctx.textAlign = "center";
  ctx.font = font(50);
  ctx.fillText(`Wave ${game.wave} Complete!`, game.screenWidth / 2, 100);

  ctx.font = font(20);
  ctx.fillText("Press any key to continue", game.screenWidth / 2, 250);
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
  ctx.fillText("Type the word which appears by the missile", game.screenWidth / 2, 200);
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
    ctx.drawImage(rocket, m.x - 12, m.y - 35);

    ctx.fillStyle = "black";
    ctx.font = font(20);
    ctx.textAlign = "center";
    ctx.fillText(m.code, m.x, m.y + m.height + 18);

    if (m.didImpact(canvas.height)) {
      game.impact(m);
      newSprite(impactExplosionOptions(m.x - m.width - 60, m.y - m.height - 40));
    } else if (m.destroyed) {
      game.destroy(m);
      newSprite(airExplosionOptions(m.x - m.width - 55, m.y - m.height - 45));
    }
  });
};

const renderBackground = () => {
  ctx.drawImage(city, 0, 0, canvas.width, canvas.height);
};

const renderHud = () => {
  ctx.fillStyle = "black";
  ctx.textAlign = "center";
  ctx.fillText(game.code, game.screenWidth / 2, game.screenHeight - 10);

  ctx.font = font(20);
  ctx.textAlign = "left";
  ctx.fillStyle = "black";
  ctx.fillText(game.score, 0 + 50, game.screenHeight - 10);

  ctx.font = '20px FontAwesome';
  ctx.fillStyle = "black";
  ctx.textAlign = "left";
  let life = 0;
  while (life < game.lives) {
    ctx.fillText(buildingIcon, game.screenWidth - 100 + (life * 30), game.screenHeight - 10);
    life++;
  }
};

export default render;
