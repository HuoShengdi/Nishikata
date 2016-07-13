const Util = require("./utils");
const Bullet = require("./bullet");
const Weapon = require('./weapon');

function PlayerWeapon1 (owner, game){

  Weapon.call(this,{
    owner: owner,
    game: game
    }
  );
}

Util.inherits(PlayerWeapon1, Weapon);
