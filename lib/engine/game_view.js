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


class GameView {
  constructor(ctx){
    this.canvas = ctx;
    this.game = new Game();
    this.lastTime = 0;
  }

  start() {
    this.lastTime = Date.now();
    this.main();
  }

  main () {
    const now = Date.now();
    const dt = (now - this.lastTime) / 1000;
    const self = this;
    this.game.step(dt);
    this.game.draw(self.canvas);

    this.lastTime = now;
    requestAnimFrame(self.main.bind(self));
  }

  reset () {
    this.game = new Game();
  }

}

export {GameView};
