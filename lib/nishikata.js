import {GameView} from './engine/game_view.js';

document.addEventListener( "DOMContentLoaded", function () {
  const canvasEl = document.getElementById('nishikata-foreground');

  const ctx = canvasEl.getContext('2d');

  const nishikataGame = new GameView(ctx);
  nishikataGame.start();
});
