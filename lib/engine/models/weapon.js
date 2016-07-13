const Util = require("./utils");
const Bullet = require("./bullet");

function Weapon (options){
  this.owner = options.owner;
  this.cooldown = options.cooldown || 100;
  this.damage = options.damage || 1;
  this.bullets = options.bullets || [[0, -10]];
  this.game = options.game;
  this.lastFired = 0;
}


Weapon.prototype.fire = function () {
  const _volley = ()=>{
    for(let i = 0; i < this.bullets.length; i++){
      this.game.addBullet(new Bullet ({
        color: this.owner.color,
        vel: this.bullets[i],
        pos: this.owner.pos,
        team: this.owner.team
      }));
    }
    this.lastFired = Date.now();
  };

  if (Date.now() - this.lastFired > this.cooldown) { _volley(); }
};
