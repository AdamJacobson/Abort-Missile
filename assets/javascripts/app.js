import Game from './game';

document.addEventListener('DOMContentLoaded', () => {
  console.log("loaded");
  const game = new Game;
  setupButtons(game);
  game.start();
});

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
