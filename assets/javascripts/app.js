import Game from './game';

document.addEventListener('DOMContentLoaded', () => {
  const game = new Game();
  setupButtons(game);

  window.addEventListener('blur', () => {
    game.pause();
  });
});

const setupButtons = (game) => {
  document.getElementsByTagName('body')[0].addEventListener('keydown', (e) => {
    game.sendKey(e);
  });
};
