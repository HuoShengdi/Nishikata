
function Game () {
  this.DIM_X = 800;
  this.DIM_Y = 600;
  this.enemies = [];
  this.ship = new Ship([this.DIM_X/2, this.DIM_Y * 0.8], this);
  this.bullets = [];
}


Game.prototype.draw = function (ctx) {
  ctx.clearRect(0, 0, this.DIM_X, this.DIM_Y);
  ctx.fillStyle = "black";
  ctx.fillRect = (0, 0, this.DIM_X, this.DIM_Y);
  this.allObjects().forEach( (obj) => obj.draw(ctx));
};

Game.prototype.allObjects = function (){
  let all = this.enemies.concat([this.ship],this.bullets);
  return all;
};
