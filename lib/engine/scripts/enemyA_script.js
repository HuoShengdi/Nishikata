const EnemyAScript = {
  lastFire: 0,

  movePattern(enemy) {
    const lifetime = Date.now() - enemy.startTime;
    if (lifetime < 4000){
      enemy.vel = [0, 75];
    }else if((lifetime % 4000) < 1000){
      enemy.vel = [50, 0];
    }else if((lifetime % 4000) < 2000){
      enemy.vel = [0, -50];
    }else if((lifetime % 4000) < 3000){
      enemy.vel = [-50, 0];
    }else if((lifetime % 4000) < 4000){
      enemy.vel = [0, 50];
    }
  },

  firePattern(enemy) {
    const lifetime = Date.now() - enemy.startTime;
    const now = Date.now();
    const interval = Math.random()*2000 + 2000;
    if (lifetime > 3000){
      if (now - enemy.lastFire > interval){
        enemy.fireBullet();
        enemy.lastFire = Date.now();
      }
    }
  }

};

export {EnemyAScript};
