class MovingObject {


  constructor (options) {
    this.pos = options.pos;
    this.vel = options.vel;
    this.radius = options.radius;
    this.sprite = options.sprite;
    this.color = options.color;
    this.game = options.game;
  }

// MovingObject.prototype.vertices(){
//   return [
//     [this.pos[0]-(this.radius/2), this.pos[1]-(this.radius/2)],
//     [this.pos[0]-(this.radius/2), this.pos[1]+(this.radius/2)],
//     [this.pos[0]+(this.radius/2), this.pos[1]+(this.radius/2)],
//     [this.pos[0]+(this.radius/2), this.pos[1]-(this.radius/2)]
//   ];
// };


// function triangleArea (A, B, C) {
//   return (C[0]*B[1] - B[0]*C[1]) - (C[0]*A[1]-A[0]*C[1]) + (B[0]*A[1]-A[0]*B[1]);
// }

// MovingObject.prototype.isInside = function (pos){
//   const verts = this.vertices();
//   if (triangleArea(verts[0],verts[1],pos) > 0 ||
//     triangleArea(verts[1], verts[2], pos) > 0 ||
//     triangleArea(verts[2], verts[3], pos) > 0 ||
//     triangleArea(verts[3], verts[0], pos) > 0){
//       return false;
//     }
//   return true;
// };

  draw (ctx){
    ctx.fillStyle = this.color;
    ctx.beginPath();

    ctx.arc(
      this.pos[0],
      this.pos[1],
      this.radius,
      0,
      2 * Math.PI,
      false
    );

    ctx.fill();
  }

  move (dt){
    let pos = this.pos;
    let vel = this.vel;
    const newPos = [pos[0]+this.vel[0]*dt, pos[1]+this.vel[1]*dt];
    this.pos = newPos;
  }

  update(dt){
    this.move(dt);
    this._checkBounds();
  }

  _checkBounds(){
    if (
      this.pos[0] < -10 ||
      this.pos[0] > this.game.DIM_X + 10 ||
      this.pos[1] < -10 ||
      this.pos[1] > this.game.DIM_Y + 10
      ){
      this.game.remove(this);
    }
  }

  isCollidedWith(otherObject) {
    // Rectangular collision logic
    // const self = this;
    // otherObject.vertices().forEach((pos)=>{
    //   if (self.isInside(pos)){
    //     return true;
    //   }
    // });
    // this.vertices().forEach((pos)=>{
    //   if (otherObject.isInside(pos)){
    //     return true;
    //   }
    // });
    // return false;

    // Circular collision logic
    let dx = this.pos[0] - otherObject.pos[0];
    let dy = this.pos[1] - otherObject.pos[1];
    let dist = Math.sqrt((dx * dx) + (dy * dy));
    let radii = this.radius + otherObject.radius;
    return dist < radii;
  }

  collideWith(otherObject) {

  }
}

export {MovingObject};
