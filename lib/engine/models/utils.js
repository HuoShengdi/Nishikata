const Util = {
  inherits (ChildClass, ParentClass) {
    function Surrogate () {}
    Surrogate.prototype = ParentClass.prototype;
    ChildClass.prototype = new Surrogate();
    ChildClass.prototype.constructor = ChildClass;
  },

  randomVec (length) {
    let vel = [];
    vel[0] = Math.random() * (2 * length) - length;
    vel[1] = Math.random() * (2 * length) - length;
    return vel;
  }
};



module.exports = Util;
