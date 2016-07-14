import {EnemyA} from '../models/enemyA';
import {Game} from '../game';

const enemyGeneration = {
  generating: false,
  numEnemies: 0,
  _reset: ()=>{
    enemyGeneration.numEnemies = 0;
    enemyGeneration.generating = true;
  },
  _generateBuilder: (generator, maxEnemies, spacing) => {
    enemyGeneration._reset();
    enemyGeneration.interval = setInterval(() => {
      generator();

      if (enemyGeneration.numEnemies === maxEnemies){
        clearInterval(enemyGeneration.interval);
        enemyGeneration.numEnemies = 0;

        setTimeout(()=>{
          enemyGeneration.generating = false;
        }, 5000);
      }
    }, spacing);

  },

  WAVE_A: (game)=>{
    let posArray = [];
    for(let i = 0; i < 32; i++){
      posArray.push([100 + 75*(i%8), -200 + 50*(Math.floor(i/8)%4)]);
    }

    let _generator = ()=>{
      posArray.forEach((pos)=>{
        game.enemies.push(new EnemyA({pos: pos, game: game}));
      });
      enemyGeneration.numEnemies += 32;
    };

    enemyGeneration._generateBuilder(_generator, 32, 1000);
  }
};

export {enemyGeneration};
