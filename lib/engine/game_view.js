import {Game} from './game';

const requestAnimFrame = (function(){
    return window.requestAnimationFrame       ||
        window.webkitRequestAnimationFrame ||
        window.mozRequestAnimationFrame    ||
        window.oRequestAnimationFrame      ||
        window.msRequestAnimationFrame     ||
        function(callback){
            window.setTimeout(callback, 1000 / 60);
        };
})();

let lostModal;
let restartButton;
let restartGame;
let gameAnimationId;
const controls = document.getElementById('controls-bottom');

class GameView {
  constructor(ctx){
    this.ctx = ctx;
    this.lastTime = 0;
  }

  setGameOver(modal, button, startGame){
    lostModal = modal;
    restartButton = button;
    restartGame = startGame;
  }

  start() {
    this.lastTime = Date.now();
    Game.start();
    this.main();
  }

  main () {
    const now = Date.now();
    const dt = (now - this.lastTime) / 1000;
    const self = this;
    Game.step(dt);
    Game.draw(this.ctx);
    if (Game.isGameOver){
      this.stop();
      return gameAnimationId;
    }
    this.lastTime = now;
    gameAnimationId = requestAnimFrame(this.main.bind(self));
    return gameAnimationId;
  }

  stop() {
    lostModal.className = "modal-container modal-lost";
    controls.classList.add("hidden");
    restartButton.addEventListener("click", restartGame);
  }

  reset () {
    Game.reset();
  }

}

export {GameView};
