import {MovingObject} from "./moving_object";
import {Bullet} from "./bullet";


class Enemy extends MovingObject {
  constructor (options) {
    super({
      pos: options.pos,
      vel: [0,0],
      radius: options.radius,
      color: options.color,
      game: options.game
    });
    this.weapon = options.weapon;
    this.hp = 1;
    this.startTime = Date.now();
  }

  fireBullet (vel) {
    const bulletVel = vel || [0,100];
    let bullet = new Bullet({
      pos: this.pos,
      vel: bulletVel,
      color: this.color,
      team: "enemy",
      damage: 1,
      game: this.game});
    this.game.addBullet(bullet);
  }

  fireWeapon (){
    this.weapon.fire();
  }

  hit (damage) {
    this.hp -= damage;
  }

  _checkBounds(){
    if (
      this.pos[0] < -100 ||
      this.pos[0] > this.game.DIM_X + 100 ||
      this.pos[1] < -200 ||
      this.pos[1] > this.game.DIM_Y + 100
      ){
      this.game.remove(this);
    }
  }
}

export {Enemy};
