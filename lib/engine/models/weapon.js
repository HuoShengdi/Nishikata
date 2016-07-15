import {Bullet} from "./bullet";
import {Game} from "../game";

class Weapon {

  constructor(options){
    this.owner = options.owner;
    this.cooldown = options.cooldown || 100;
    this.damage = options.damage || 1;
    this.bullets = options.bullets || [[0, -500]];
    this.lastFired = 0;
  }

  fire () {
    const _volley = ()=>{
      for(let i = 0; i < this.bullets.length; i++){
        Game.addBullet(new Bullet ({
          color: this.owner.color,
          vel: this.bullets[i],
          pos: this.owner.pos,
          team: this.owner.team,
          damage: this.damage
        }));
      }
      this.lastFired = Date.now();
    };

    if (Date.now() - this.lastFired > this.cooldown) { _volley(); }
  }
}

export {Weapon};
