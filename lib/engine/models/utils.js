const Util = {
  
  randomVec (length) {
    let vel = [];
    vel[0] = Math.random() * (2 * length) - length;
    vel[1] = Math.random() * (2 * length) - length;
    return vel;
  },

  transform(vel, angle){
    const radians = (Math.PI/180) * angle,
      cos = Math.cos(radians),
      sin = Math.sin(radians),
      nx = (cos * vel[0]) + (sin * vel[1]),
      ny = (cos * vel[1]) + (sin * vel[0]);
    return [nx, ny];
  }
};



export {Util};
