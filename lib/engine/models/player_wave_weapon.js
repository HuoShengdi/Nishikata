import {Weapon} from './weapon';
import {WaveBullet} from './wave_bullet';
import {Game} from "../game";

class PlayerWaveWeapon extends Weapon {

  constructor(player) {
    super({
      owner: player,
    });
    this.bullets = [[20, -500],[-20, -500]];
  }

  fire () {
    const _volley = ()=>{
      for(let i = 0; i < this.bullets.length; i++){
        Game.addBullet(new WaveBullet ({
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



export {PlayerWaveWeapon};
