import {Weapon} from './weapon';

class PlayerWeapon1 extends Weapon {

  constructor(player) {
    super({
      owner: player
    });
  }
}



export {PlayerWeapon1};
