import {Enemy} from "./enemy";
import {Boss1Script} from "../scripts/boss1_script";
import {Bullet} from "./bullet";
import {Game} from "../game";
import {Util} from "./utils";

class Boss1 extends Enemy {
  constructor(options){
    super({
      pos: options.pos,
      vel: [0,0],
      radius: 20,
      color: "#5a12b5"
    });
    this.hp = 60;
    this.script = Boss1Script;
    this.startTime = Date.now();
    this.lastFire = 0;
  }

  update(dt){
    this.script.movePattern(this);
    this.script.firePattern(this);
    this.move(dt);
  }

  fireBullets () {
    const lifetime = Date.now() - this.startTime;
    let bulletVels = [];
    for (let i = 0; i < 8; i++){
      bulletVels.push(
        Util.transform([100,0], (45*i + (15 * lifetime) / 500) )
      );
    }

    bulletVels.forEach((vel)=>{
      let bullet = new Bullet({
        pos: this.pos,
        vel: vel,
        color: "#eeeeee",
        radius: 4,
        team: "enemy",
        damage: 1});
      Game.addBullet(bullet);
    });
  }

}

export {Boss1};
