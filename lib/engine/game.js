import {Ship} from "./models/ship";
import {Bullet} from "./models/bullet";
import {Enemy} from "./models/enemy";

function Game () {
  this.DIM_X = 800;
  this.DIM_Y = 600;
  this.enemies = [];
  this.ship = new Ship([this.DIM_X/2, this.DIM_Y - 50], this);
  this.bullets = {player: [], enemy: []};
}


Game.prototype.draw = function (ctx) {
  ctx.clearRect(0, 0, this.DIM_X, this.DIM_Y);
  ctx.fillStyle = "black";
  ctx.fillRect = (0, 0, this.DIM_X, this.DIM_Y);
  this.allObjects().forEach( (obj) => obj.draw(ctx));
};

Game.prototype.step = function () {
  this.moveObjects();
  this.checkCollisions();
};

Game.prototype.moveObjects = function () {
  this.allObjects.forEach( (obj) => obj.move() );
};

Game.prototype.checkCollisions = function () {
  let all = this.allObjects();
  all.forEach((obj1, idx1) => {
    all.forEach( (obj2, idx2) => {
      if (idx1 === idx2) {
        return;
      }
      if (obj1.isCollidedWith(obj2)){
        obj1.collideWith(obj2);
      }
    });
  });
};

Game.prototype.allObjects = function (){
  let all = this.enemies.concat([this.ship],this.bullets["player"],this.bullets["enemy"]);
  return all;
};

Game.prototype.addBullet = function (bullet) {
  this.bullets[bullet.owner.team].push(bullet);
};

Game.prototype.remove = function (obj) {
  if (obj instanceof Enemy){
    let idx = this.enemies.indexOf(obj);
    this.enemies.splice(idx, 1);
  }else if (obj instanceof Bullet) {
    let idx = this.bullets[obj.team].indexOf(obj);
    this.bullets[obj.team].splice(idx, 1);
  }
};
