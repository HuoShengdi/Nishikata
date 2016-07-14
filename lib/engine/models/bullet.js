import {MovingObject} from "./moving_object";


class Bullet extends MovingObject {
  constructor(options){
    super({
      pos: options.pos,
      vel: options.vel,
      radius: 2,
      color: options.color,
      game: options.game
    });
    this.team = options.team;
    this.damage = options.damage;
  }

  collideWith (otherObject){

  }

}

export {Bullet};
