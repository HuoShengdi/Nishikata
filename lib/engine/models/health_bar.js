import {Game} from "../game";

class HealthBar {
  constructor(){
    this.width = 50;
    this.pos = [0, 600];
  }


  draw(ctx){
    const hp = Game.playerHP;
    let hpcolor;
    if(hp > 8){
      hpcolor = "#44ff44";
    }else if(hp > 4){
      hpcolor = "#ffff44";
    }else {
      hpcolor = "#ff4844";
    }
    ctx.fillStyle = hpcolor;
    ctx.font = "16px Noto-Sans";
    ctx.fillText('Health', this.pos[0]+23, 100, 100);

    ctx.fillStyle = hpcolor;

    //HP bars
    ctx.fillRect(this.pos[0] + 17, this.pos[1], this.width + 17, -480*hp/16);
    for(let i = 0; i < 16; i++){
      ctx.strokeStyle = "#aaaaaa";
      ctx.strokeRect(this.pos[0] + 17,this.pos[1], this.width + 17, -30 - 30*i);
    }

  }
}

export {HealthBar};
