import Game from './game';

document.addEventListener('DOMContentLoaded', () => {
  const game = new Game;
  setupButtons(game);
  game.start();

  // setupGame();

  animate();
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

function animate() {
  window.requestAnimationFrame(draw);
}

function draw() {
  let canvas = document.getElementById('canvas');
  let ctx = canvas.getContext('2d');

  ctx.globalCompositeOperation = 'destination-over';
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // ctx.save();

  var gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
  gradient.addColorStop(0, 'black');
  gradient.addColorStop(1, 'blue');
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  window.requestAnimationFrame(draw);
}


const setupButtons = (game) => {
  document.getElementById('button-instructions').addEventListener('click', () => {
    console.log("Click instructions");
    document.getElementById('instructions-modal').classList.add('show');
    game.pause();
  });

  document.getElementById('button-play-pause').addEventListener('click', () => {
    console.log("Click play/pause");
    game.unpause();
  });

  document.getElementById('close-modal').addEventListener('click', () => {
    document.getElementById('instructions-modal').classList.remove('show');
  });

  document.getElementById('mask').addEventListener('click', (e) => {
    if (e.target === e.currentTarget) {
      document.getElementById('instructions-modal').classList.remove('show');
    }
  });
};
