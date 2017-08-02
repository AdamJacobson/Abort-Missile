import Game from './game';

document.addEventListener('DOMContentLoaded', () => {
  const game = new Game();
  setupButtons(game);
});

const setupButtons = (game) => {
  document.getElementsByTagName('body')[0].addEventListener('keydown', (e) => {
    game.sendKey(e);
  });
};
