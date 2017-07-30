import Game from './game';

document.addEventListener('DOMContentLoaded', () => {
  const game = new Game(700, 500);
  setupButtons(game);
  game.start();

  // setupGame();

  animate(game);
});

// const setupGame = () => {
//   const stage = new createjs.Stage("canvas");
//   const circle = new createjs.Shape();
//   circle.graphics.beginFill("DeepSkyBlue").drawCircle(0, 0, 50);
//   circle.x = 100;
//   circle.y = 100;
//   stage.addChild(circle);
//   stage.update();
// };

function animate(game) {
  window.requestAnimationFrame(() => draw(game));
}

function draw(game) {
  // console.log("x: " + game.missile.x);

  let canvas = document.getElementById('canvas');
  let ctx = canvas.getContext('2d');

  // ctx.globalCompositeOperation = 'destination-over';
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // ctx.save();

  // Background
  let gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
  gradient.addColorStop(0, 'black');
  gradient.addColorStop(1, 'blue');
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // Missiles
  game.missiles.forEach((m) => {
    ctx.fillStyle = "gray";
    ctx.fillRect(m.x, m.y, m.width, m.height);

    ctx.fillStyle = "white";
    ctx.font = '20px serif';
    ctx.textAlign="center";
    ctx.fillText(m.code, m.x, m.y + m.height + 18);

    // m.fall();

    if (m.didImpact(canvas.height)) {
      game.impact(m);
    }
  });

  // if (!game.paused) {
    window.requestAnimationFrame(() => draw(game));
  // }
}


const setupButtons = (game) => {
  document.getElementById('button-instructions').addEventListener('click', () => {
    game.pause();
    console.log("Clicked instructions");
    document.getElementById('instructions-modal').classList.add('show');
  });

  document.getElementById('button-play-pause').addEventListener('click', () => {
    console.log("Clicked play/pause");
    game.unpause();
  });

  document.getElementById('close-modal').addEventListener('click', () => {
    game.unpause();
    document.getElementById('instructions-modal').classList.remove('show');
  });

  document.getElementById('mask').addEventListener('click', (e) => {
    if (e.target === e.currentTarget) {
      game.unpause();
      document.getElementById('instructions-modal').classList.remove('show');
    }
  });

  document.getElementById('code-entry').addEventListener('keypress', (e => {
    game.enterCode(e.key);
  }));
};
