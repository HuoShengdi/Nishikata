import {Ship} from "./models/ship";
import {Bullet} from "./models/bullet";
import {Enemy} from "./models/enemy";
import {enemyGeneration} from "./scripts/enemy_generation";

class Game {
  constructor () {
    this.DIM_X = 800;
    this.DIM_Y = 600;
    this.enemies = [];
    this.ship = new Ship([this.DIM_X/2, this.DIM_Y - 50], this);
    this.bullets = {player: [], enemy: []};
    this.gameTime = 0;
    this.isGameOver = false;
  }


  draw(ctx) {
    ctx.clearRect(0, 0, this.DIM_X, this.DIM_Y);
    ctx.fillStyle = "#000000";
    ctx.fillRect(0, 0, this.DIM_X, this.DIM_Y);
    this.allObjects().forEach( (obj) => obj.draw(ctx));
  }

  step(dt) {
    this.spawnWaves();
    this.update(dt);
    this.checkCollisions();
    this.clearDead();
  }

  spawnWaves(){
    let _waves = [enemyGeneration.WAVE_A];

    if (!enemyGeneration.generating && this.enemies.length === 0){
      _waves[Math.floor(Math.random() * _waves.length)](this);
    }
  }

  update(dt) {
    this.allObjects().forEach( (obj) => obj.update(dt) );
  }

  checkCollisions() {
    this.checkPlayerBulletCollisions();
    this.checkPlayerShipCollisions();
  }

  checkPlayerBulletCollisions(){
    this.bullets["player"].forEach((bullet)=>{
      this.enemies.forEach((enemy)=>{
        if (bullet.isCollidedWith(enemy)){
          enemy.hit(bullet.damage);
          this.remove(bullet);
        }
      });
    });
  }

  checkPlayerShipCollisions(){
    this.bullets["enemy"].forEach((bullet)=>{
      if (bullet.isCollidedWith(this.ship)){
        this.ship.hit(bullet.damage);
        this.remove(bullet);
      }
    });
  }

  clearDead(){
    this.enemies = this.enemies.filter((enemy)=>{
      return enemy.hp > 0;
    });
  }

  allObjects(){
    let all = this.enemies.concat([this.ship],this.bullets["player"],this.bullets["enemy"]);
    return all;
  }

  addBullet(bullet) {
    this.bullets[bullet.team].push(bullet);
  }

  remove(obj) {
    if (obj instanceof Enemy){
      let idx = this.enemies.indexOf(obj);
      this.enemies.splice(idx, 1);
    }else if (obj instanceof Bullet) {
      let idx = this.bullets[obj.team].indexOf(obj);
      this.bullets[obj.team].splice(idx, 1);
    }
  }
}

export {Game};
