import {Weapon} from './weapon';

class PlayerWeapon1 extends Weapon {

  constructor(player) {
    super({
      owner: player,
      game: player.game
    });
  }
}



export {PlayerWeapon1};
