import {Enemy} from "./enemy";
import {EnemyAScript} from '../scripts/enemyA_script';

class EnemyA extends Enemy {
  constructor(options){
    super({
      pos: options.pos,
      vel: [0, 75],
      radius: 8,
      color: '#aaaaaa',
    });
    this.hp = 3;
    this.script = EnemyAScript;
    this.startTime = Date.now();
    this.lastFire = 0;
  }

  update(dt){
    this.script.movePattern(this);
    this.script.firePattern(this);
    this.move(dt);
    this._checkBounds();
  }
}

export {EnemyA};
