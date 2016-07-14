import {MovingObject} from "./moving_object";
import {PlayerWeapon1} from './player_weapon_1';
import {PlayerWaveWeapon} from './player_wave_weapon';

class Ship extends MovingObject {

  constructor (pos, game) {
    super({
      pos: pos,
      vel: [0, 0],
      radius: 8,
      color: "#16eb0f",
      game: game
    });
    this._keyListeners();
    this.hp = 16;
    this.team = "player";
    this.weapon = new PlayerWaveWeapon(this);
    this.pressedKeys = {};
  }

// relocate() {
//   this.pos = this.game.randomPosition();
//   this.vel = [0,0];
// };

  fireWeapon() {
    this.weapon.fire();
  }

// collideWith(otherObject) {
//   this.relocate();
// };
  decelerate() {
    if (this.vel[1] > 0){
      this.vel[1] -= 20;
    }else if (this.vel[1] < 0){
      this.vel[1] += 20;
    }
    if (this.vel[0] > 0){
    this.vel[0] -= 20;
    }else if (this.vel[0] < 0){
      this.vel[0] += 20;
    }
  }

  setVel(){
    if (this.pressedKeys['DOWN'] && this.pressedKeys['UP']){
      this.delecerate();
    }else if (this.pressedKeys['SHIFT']){
      if(this.pressedKeys['DOWN']){
        this.vel[1] = 100;
      }else if (this.pressedKeys['UP']) {
        this.vel[1] = -100;
      }else{
        this.decelerate();
      }
    }else if (this.pressedKeys['DOWN']) {
      this.vel[1] = 200;
    }else if (this.pressedKeys['UP']) {
      this.vel[1] = -200;
    }else {
      this.decelerate();
    }

    if (this.pressedKeys['RIGHT'] && this.pressedKeys['LEFT']){
      this.decelerate();
    }else if (this.pressedKeys['SHIFT']){
      if(this.pressedKeys['RIGHT']){
        this.vel[0] = 100;
      }else if (this.pressedKeys['LEFT']) {
        this.vel[0] = -100;
      }else {
        this.decelerate();
      }
    }else if (this.pressedKeys['RIGHT']) {
      this.vel[0] = 200;
    }else if (this.pressedKeys['LEFT']) {
      this.vel[0] = -200;
    }else{
      this.decelerate();
    }
  }

  update(dt) {
    this.move(dt);
    if (this.pressedKeys['z']){
      this.fireWeapon();
    }
  }

  move(dt){
    let pos = this.pos;
    let vel = this.vel;
    this.setVel();
    let newPos = [(pos[0]+vel[0]*dt),(pos[1]+vel[1]*dt)];
    this._updateBoundedPos(newPos);
  }

  hit(damage) {
    this.hp -= damage;
  }

  _updateBoundedPos(pos) {
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
  }


  _keyactions(e, status){
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
  }


  _keyListeners(){
    const self = this;
    document.addEventListener('keydown', function(e) {
      self._keyactions(e, true);
    });
    document.addEventListener('keyup', function(e) {
      self._keyactions(e, false);
    });
  }
}

export {Ship};
