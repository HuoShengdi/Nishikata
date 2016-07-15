import {MovingObject} from "./moving_object";
import {Game} from "../game";


class Bullet extends MovingObject {
  constructor(options){
    super({
      pos: options.pos,
      vel: options.vel,
      radius: options.radius || 2,
      color: options.color,
    });
    this.team = options.team;
    this.damage = options.damage;
  }

  collideWith (otherObject){

  }

}

export {Bullet};
