const MovingObject = require('./moving_object');
const Bullet = require('./bullet');
const Util = require('./utils');

function Enemy (pos, vel, radius, game) {
  this.COLOR = "#aaaaaa";
  this.hp = 1;
  MovingObject.call(this, {
    pos: pos,
    vel: vel,
    radius: radius,
    color: this.COLOR,
    game: game
  });
}

Util.inherits(Enemy, MovingObject);

Enemy.prototype.fireBullet = function (vel) {
  const bulletVel = vel || [0,5];
  let bullet = new Bullet(this.pos, bulletVel, this, this.game);
  this.game.add(bullet);
};
