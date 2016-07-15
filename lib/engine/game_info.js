import {Game} from './game';
import {HealthBar} from './models/health_bar';

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

class GameInfo {
  constructor(ctx){
    this.ctx = ctx;
    this.lastTime = 0;
    this.DIM_X = 1000;
    this.DIM_Y = 600;
  }

  start() {
    this.lastTime = Date.now();
    this.healthBar = new HealthBar();
    this.main();
  }

  main () {
    const now = Date.now();
    const dt = (now - this.lastTime) / 1000;
    const self = this;
    this.draw();
    this.lastTime = now;
    requestAnimFrame(this.main.bind(self));
  }

  draw(){
    this.ctx.clearRect(0,0, 1000, 600);
    this.ctx.fillStyle = "#121212";
    this.ctx.fillRect(0, 0, this.DIM_X, this.DIM_Y);
    if (this.healthBar.draw){
      this.healthBar.draw(this.ctx);
    }
  }

}

export {GameInfo};
