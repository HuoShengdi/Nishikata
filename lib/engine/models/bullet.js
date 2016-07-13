const MovingObject = require("./moving_object");
const Util = require("./utils");

function Bullet (pos, vel, damage, color, team, game) {
  this.RADIUS = 2;
  this.COLOR = color;
  this.team = team;
  this.damage = damage;
  MovingObject.call(this, {
    pos: pos,
    vel: vel,
    radius: this.RADIUS,
    color: this.COLOR,
    game: game
  });
}

Util.inherits(Bullet, MovingObject);

Bullet.prototype.collideWith = function (otherObject) {

};

module.exports = Bullet;
