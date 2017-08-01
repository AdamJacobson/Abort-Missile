import Game from './game';

document.addEventListener('DOMContentLoaded', () => {
  const game = new Game();
  setupButtons(game);
  // game.nextWave();
});

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

  document.getElementsByTagName('body')[0].addEventListener('keydown', (e) => {
    game.sendKey(e);
  });
};
