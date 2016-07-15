import {Ship} from "./models/ship";
import {Bullet} from "./models/bullet";
import {Enemy} from "./models/enemy";
import {enemyGeneration} from "./scripts/enemy_generation";

const LEVELS = {
  1: [enemyGeneration.LEVEL_1A, enemyGeneration.LEVEL_1B, enemyGeneration.LEVEL_1BOSS]
};

const Game = {
  DIM_X: 800,
  DIM_Y: 600,
  enemies: [],
  ship: {},
  isLevelRunning: false,
  bullets: {player: [], enemy: []},
  isGameOver: false,
  playerHP: 16,
  currentLevel: 0,
  waveCounter: 0,

  start() {
    this.reset();
    this.currentLevel = 1;
    this.ship = new Ship([this.DIM_X/2, this.DIM_Y - 50], this);
    this.initLevel();
  },

  initLevel() {
    this.isLevelRunning = true;
  },

  reset(){
    this.ship = {};
    this.playerHP = 16;
    this.enemies = [];
    this.isLevelRunning = false;
    this.bullets = {player: [], enemy: []};
    this.isGameOver = false;
    this.waveCounter = 0;
    this.currentLevel = 0;
  },

  draw(ctx) {
    ctx.clearRect(0, 0, this.DIM_X, this.DIM_Y);
    ctx.fillStyle = "#000000";
    ctx.fillRect(0, 0, this.DIM_X, this.DIM_Y);
    this.allObjects().forEach( (obj) => obj.draw(ctx));
  },

  step(dt) {
    this.runLevel();
    this.update(dt);
    this.checkCollisions();
    this.clearDead();
    this.checkGameOver();
  },

  checkGameOver(){
    if (this.playerHP === 0){
      this.isGameOver = true;
    }
  },
  runLevel(){
    let _waves = LEVELS[this.currentLevel];
    if (this.isLevelRunning){
      if (!enemyGeneration.generating && this.enemies.length === 0){
        _waves[this.waveCounter]();
        this.waveCounter++;
        if (this.waveCounter >= _waves.length){
          this.waveCounter = 0;
        }
      }
    }
  },

  update(dt) {
    this.allObjects().forEach( (obj) => obj.update(dt) );
  },

  checkCollisions() {
    this.checkPlayerBulletCollisions();
    this.checkPlayerShipCollisions();
  },

  checkPlayerBulletCollisions(){
    this.bullets["player"].forEach((bullet)=>{
      this.enemies.forEach((enemy)=>{
        if (bullet.isCollidedWith(enemy)){
          enemy.hit(bullet.damage);
          this.remove(bullet);
        }
      });
    });
  },

  checkPlayerShipCollisions(){
    this.bullets["enemy"].forEach((bullet)=>{
      if (bullet.isCollidedWith(this.ship)){
        this.ship.hit(bullet.damage);
        this.remove(bullet);
      }
    });
  },

  clearDead(){
    this.enemies = this.enemies.filter((enemy)=>{
      return enemy.hp > 0;
    });
  },

  allObjects(){
    let all = this.enemies.concat([this.ship],this.bullets["player"],this.bullets["enemy"]);
    return all;
  },

  addBullet(bullet) {
    this.bullets[bullet.team].push(bullet);
  },

  remove(obj) {
    if (obj instanceof Enemy){
      let idx = this.enemies.indexOf(obj);
      this.enemies.splice(idx, 1);
    }else if (obj instanceof Bullet) {
      let idx = this.bullets[obj.team].indexOf(obj);
      this.bullets[obj.team].splice(idx, 1);
    }
  },
};

export {Game};
