import {Bullet} from './bullet';

class WaveBullet extends Bullet {
  constructor(options){
    super(options);
    this.startTime = Date.now();
    this.startPos = this.pos;
    this.cycleSpeed = 10;
  }

  move(dt){
    let pos = this.pos;
    let vel = this.vel;
    const lifetime = Date.now() - this.startTime;
    const lifecycle = ((lifetime/1000)*this.cycleSpeed) % (2 * Math.PI);
    const newPos = [this.startPos[0]+vel[0]*Math.sin(lifecycle),pos[1]+vel[1]*dt];
    this.pos = newPos;
  }
}

export {WaveBullet};
