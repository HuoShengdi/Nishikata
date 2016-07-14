import {Weapon} from './weapon';
import {WaveBullet} from './wave_bullet';

class PlayerWaveWeapon extends Weapon {

  constructor(player) {
    super({
      owner: player,
      game: player.game
    });
    this.bullets = [[20, -500],[-20, -500]];
  }

  fire () {
    const _volley = ()=>{
      for(let i = 0; i < this.bullets.length; i++){
        this.game.addBullet(new WaveBullet ({
          color: this.owner.color,
          vel: this.bullets[i],
          pos: this.owner.pos,
          team: this.owner.team,
          damage: this.damage,
          game: this.game
        }));
      }
      this.lastFired = Date.now();
    };

    if (Date.now() - this.lastFired > this.cooldown) { _volley(); }
  }
}



export {PlayerWaveWeapon};
