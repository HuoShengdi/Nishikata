function MovingObject (options) {
  this.pos = options.pos;
  this.vel = options.vel;
  this.size = options.size;
  this.sprite = options.sprite;
  this.color = options.color;
  this.game = options.game;
}

MovingObject.prototype.vertices = function (){
  return [
    [this.pos[0]-(this.size/2), this.pos[1]-(this.size/2)],
    [this.pos[0]-(this.size/2), this.pos[1]+(this.size/2)],
    [this.pos[0]+(this.size/2), this.pos[1]+(this.size/2)],
    [this.pos[0]+(this.size/2), this.pos[1]-(this.size/2)]
  ];
};


function triangleArea (A, B, C) {
  return (C[0]*B[1] - B[0]*C[1]) - (C[0]*A[1]-A[0]*C[1]) + (B[0]*A[1]-A[0]*B[1]);
}

MovingObject.prototype.isInside = function (pos){
  const verts = this.vertices();
  if (triangleArea(verts[0],verts[1],pos) > 0 ||
    triangleArea(verts[1], verts[2], pos) > 0 ||
    triangleArea(verts[2], verts[3], pos) > 0 ||
    triangleArea(verts[3], verts[0], pos) > 0){
      return false;
    }
  return true;
};

MovingObject.prototype.draw = function (ctx){
  ctx.fillStyle = this.color;
  ctx.fillRect(
    this.pos[0]-(this.size/2),
    this.pos[1]-(this.size/2),
    this.pos[0]+(this.size/2),
    this.pos[1]+(this.size/2)
  );

};

MovingObject.prototype.move = function (){
  this.pos[0] += this.vel[0];
  this.pos[1] += this.vel[1];
};

MovingObject.prototype.checkCollision = function (otherObject) {
  const self = this;
  otherObject.vertices().forEach((pos)=>{
    if (self.isInside(pos)){
      return true;
    }
  });
  this.vertices().forEach((pos)=>{
    if (otherObject.isInside(pos)){
      return true;
    }
  });
  return false;
};

MovingObject.prototype.collideWith = function (otherObject) {

};

module.exports = MovingObject;
