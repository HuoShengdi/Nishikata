const MovingObject = require("./moving_object");
const Util = require("./utils");
const Bullet = require("./bullet");
const PlayerWeapon1 = require('./player_weapon_1');

function Ship (pos, game) {
  this.radius = 8;
  this.COLOR = "#16eb0f";
  this.hp = 16;
  this.team = "player";
  this.weapon = new PlayerWeapon1(this);
  this.lastFired = 0;
  this.pressedKeys = {};
  MovingObject.call(this, {
    pos: pos,
    vel: [0, 0],
    radius: this.radius,
    color: this.COLOR,
    game: game
  });
}

Util.inherits(Ship, MovingObject);

// Ship.prototype.relocate = function () {
//   this.pos = this.game.randomPosition();
//   this.vel = [0,0];
// };

Ship.prototype.fireWeapon = function () {

};

// Ship.prototype.collideWith = function (otherObject) {
//   this.relocate();
// };

Ship.prototype.setVel = function (){
  if (this.pressedKeys['DOWN'] && this.pressedKeys['UP']){
    this.vel[1] = 0;
  }else if (this.pressedKeys['SHIFT']){
    if(this.pressedKeys['DOWN']){
      this.vel[1] = 2;
    }else if (this.pressedKeys['UP']) {
      this.vel[1] = -2;
    }
  }else if (this.pressedKeys['DOWN']) {
    this.vel[1] = 5;
  }else if (this.pressedKeys['UP']) {
    this.vel[1] = -5;
  }else if (this.vel[1] > 0){
    this.vel[1] -= 0.5;
  }else if (this.vel[1] < 0){
    this.vel[1] += 0.5;
  }
};

Ship.prototype.move = function () {
  let pos = this.pos;
  let vel = this.vel;
  this.setVel();
  let newPos = [(pos[0]+vel[0]),(pos[1]+vel[1])];
  this._updateBoundedPos(newPos);

};

Ship.prototype._updateBoundedPos = function (pos) {
  if (pos[0] < 0){
    pos[0] = 0;
  }
  if (pos[1] < 0){
    pos[1] = 0;
  }
  if (pos[0] > this.game.DIM_X) {
    pos[0] = this.game.DIM_X;
  }
  if (pos[1] > this.game.DIM_Y) {
    pos[1] = this.game.DIM_Y;
  }
  this.pos = pos;
};


Ship.prototype._keyactions = function (e, status){
  let code = event.keyCode;
  let key;

  switch(code) {
    case 90:
      key = 'z';
      break;
    case 88:
      key = 'x';
      break;
    case 37:
      key = 'LEFT';
      break;
    case 38:
      key = 'UP';
      break;
    case 39:
      key = 'RIGHT';
      break;
    case 40:
      key = 'DOWN';
      break;
    case 16:
      key = 'SHIFT';
      break;
  }

  this.pressedKeys[key] = status;
};


Ship.prototype._keyListeners = function (){
  const self = this;
  document.addEventListener('keydown', function(e) {
    self._keyactions(e, true);
  });
  document.addEventListener('keyup', function(e) {
    self._keyactions(e, false);
  });
};

module.exports = Ship;
