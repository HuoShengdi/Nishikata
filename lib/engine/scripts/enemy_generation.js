import {EnemyA} from '../models/enemyA';
import {Boss1} from '../models/boss1';
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

  LEVEL_1A: ()=>{
    let posArray = [];
    for(let i = 0; i < 32; i++){
      posArray.push([137 + 75*(i%8), -200 + 50*(Math.floor(i/8)%4)]);
    }

    let _generator = ()=>{
      posArray.forEach((pos)=>{
        Game.enemies.push(new EnemyA({pos: pos}));
      });
      enemyGeneration.numEnemies += 32;
    };

    enemyGeneration._generateBuilder(_generator, 32, 1000);
  },

  LEVEL_1B: ()=>{
    let posArray = [[],[],[],[]];
    for (let row = 0; row < 4; row++){
      for (let i = 0; i < 8; i++){
        posArray[row].push([112 + 75*i + 25*(row%2), -200 + 50*row]);
      }
    }

    let _generator = ()=>{
      posArray.forEach((row)=>{
        row.forEach((pos)=>{
          Game.enemies.push(new EnemyA({pos: pos}));
        });
      });
      enemyGeneration.numEnemies += 32;
    };

    enemyGeneration._generateBuilder(_generator, 32, 1000);

  },

  LEVEL_1BOSS: ()=>{
    let _generator = ()=>{
      Game.enemies.push(new Boss1({pos: [Game.DIM_X/2, -100]}));
      enemyGeneration.numEnemies += 1;
    };
    enemyGeneration._generateBuilder(_generator, 1, 1000);
  }
};

export {enemyGeneration};
