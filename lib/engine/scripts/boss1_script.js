const Boss1Script = {
  lastFire: 0,

  movePattern(enemy) {
    const lifetime = Date.now() - enemy.startTime;
    if (lifetime < 4000){
      enemy.vel = [-50, 50];
    }else if((lifetime % 10000) < 500){
      enemy.vel = [800, 0];
    }else if((lifetime % 10000) < 2500){
      enemy.vel = [0, 0];
    }else if((lifetime % 10000) < 3000){
      enemy.vel = [-800, -400];
    }else if((lifetime % 10000) < 5000){
      enemy.vel = [0, 0];
    }else if((lifetime % 10000) < 5500){
      enemy.vel = [800, 0];
    }else if((lifetime % 10000) < 7500){
      enemy.vel = [0, 0];
    }else if((lifetime % 10000) < 8000){
      enemy.vel = [-800, 400];
    }else if((lifetime % 10000) < 10000){
      enemy.vel = [0, 0];
    }
  },

  firePattern(enemy) {
    const lifetime = Date.now() - enemy.startTime;
    const now = Date.now();
    const interval = 500;
    if (lifetime > 5000 && enemy.vel[1] === 0 && enemy.vel[0] === 0){
      if (now - enemy.lastFire > interval){
        enemy.fireBullets();
        enemy.lastFire = Date.now();
      }
    }
  }

};

export {Boss1Script};
