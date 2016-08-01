import {GameView} from './engine/game_view.js';
import {GameInfo} from './engine/game_info.js';

document.addEventListener( "DOMContentLoaded", function () {
  const foreground = document.getElementById('nishikata-foreground');
  const middleground = document.getElementById('nishikata-middleground');
  const background = document.getElementById('nishikata-background');
  const startModal = document.getElementById('start-modal');
  const lostModal = document.getElementById('lost-modal');
  const startButton = document.getElementById('start');
  const restartButton = document.getElementById('restart');
  const controls = document.getElementById('controls-bottom');
  const ctx = foreground.getContext('2d');
  const infoctx = middleground.getContext('2d');

  const nishikataGame = new GameView(ctx);
  const gameInfo = new GameInfo(infoctx);

  function startGame () {
    nishikataGame.start.bind(nishikataGame)();
    gameInfo.start.bind(gameInfo)();
    nishikataGame.setGameOver(lostModal, restartButton, startGame);
    startModal.className = ("hidden");
    lostModal.className = ("hidden");
    controls.classList.remove("hidden");
  }

  startButton.addEventListener("click", startGame);
});
