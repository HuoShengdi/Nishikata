/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/lib/";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _game_view = __webpack_require__(1);
	
	var _game_info = __webpack_require__(17);
	
	document.addEventListener("DOMContentLoaded", function () {
	  var foreground = document.getElementById('nishikata-foreground');
	  var middleground = document.getElementById('nishikata-middleground');
	  var background = document.getElementById('nishikata-background');
	  var startModal = document.getElementById('start-modal');
	  var lostModal = document.getElementById('lost-modal');
	  var startButton = document.getElementById('start');
	  var restartButton = document.getElementById('restart');
	  var controls = document.getElementById('controls-bottom');
	  var ctx = foreground.getContext('2d');
	  var infoctx = middleground.getContext('2d');
	
	  var nishikataGame = new _game_view.GameView(ctx);
	  var gameInfo = new _game_info.GameInfo(infoctx);
	
	  function startGame() {
	    nishikataGame.start.bind(nishikataGame)();
	    gameInfo.start.bind(gameInfo)();
	    nishikataGame.setGameOver(lostModal, restartButton, startGame);
	    startModal.className = "hidden";
	    lostModal.className = "hidden";
	    controls.classList.remove("hidden");
	  }
	
	  startButton.addEventListener("click", startGame);
	});

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.GameView = undefined;
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _game = __webpack_require__(2);
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var requestAnimFrame = function () {
	  return window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame || function (callback) {
	    window.setTimeout(callback, 1000 / 60);
	  };
	}();
	
	var lostModal = void 0;
	var restartButton = void 0;
	var restartGame = void 0;
	var gameAnimationId = void 0;
	var controls = document.getElementById('controls-bottom');
	
	var GameView = function () {
	  function GameView(ctx) {
	    _classCallCheck(this, GameView);
	
	    this.ctx = ctx;
	    this.lastTime = 0;
	  }
	
	  _createClass(GameView, [{
	    key: 'setGameOver',
	    value: function setGameOver(modal, button, startGame) {
	      lostModal = modal;
	      restartButton = button;
	      restartGame = startGame;
	    }
	  }, {
	    key: 'start',
	    value: function start() {
	      this.lastTime = Date.now();
	      _game.Game.start();
	      this.main();
	    }
	  }, {
	    key: 'main',
	    value: function main() {
	      var now = Date.now();
	      var dt = (now - this.lastTime) / 1000;
	      var self = this;
	      _game.Game.step(dt);
	      _game.Game.draw(this.ctx);
	      if (_game.Game.isGameOver) {
	        this.stop();
	        return gameAnimationId;
	      }
	      this.lastTime = now;
	      gameAnimationId = requestAnimFrame(this.main.bind(self));
	      return gameAnimationId;
	    }
	  }, {
	    key: 'stop',
	    value: function stop() {
	      lostModal.className = "modal-container modal-lost";
	      controls.classList.add("hidden");
	      restartButton.addEventListener("click", restartGame);
	    }
	  }, {
	    key: 'reset',
	    value: function reset() {
	      _game.Game.reset();
	    }
	  }]);
	
	  return GameView;
	}();
	
	exports.GameView = GameView;

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.Game = undefined;
	
	var _ship = __webpack_require__(3);
	
	var _bullet = __webpack_require__(7);
	
	var _enemy = __webpack_require__(10);
	
	var _enemy_generation = __webpack_require__(11);
	
	var LEVELS = {
	  1: [_enemy_generation.enemyGeneration.LEVEL_1A, _enemy_generation.enemyGeneration.LEVEL_1B, _enemy_generation.enemyGeneration.LEVEL_1BOSS]
	};
	
	var Game = {
	  DIM_X: 800,
	  DIM_Y: 600,
	  enemies: [],
	  ship: {},
	  isLevelRunning: false,
	  bullets: { player: [], enemy: [] },
	  isGameOver: false,
	  playerHP: 16,
	  currentLevel: 0,
	  waveCounter: 0,
	
	  start: function start() {
	    this.reset();
	    this.currentLevel = 1;
	    this.ship = new _ship.Ship([this.DIM_X / 2, this.DIM_Y - 50], this);
	    this.initLevel();
	  },
	  initLevel: function initLevel() {
	    this.isLevelRunning = true;
	  },
	  reset: function reset() {
	    this.ship = {};
	    this.playerHP = 16;
	    this.enemies = [];
	    this.isLevelRunning = false;
	    this.bullets = { player: [], enemy: [] };
	    this.isGameOver = false;
	    this.waveCounter = 0;
	    this.currentLevel = 0;
	  },
	  draw: function draw(ctx) {
	    ctx.clearRect(0, 0, this.DIM_X, this.DIM_Y);
	    ctx.fillStyle = "#000000";
	    ctx.fillRect(0, 0, this.DIM_X, this.DIM_Y);
	    this.allObjects().forEach(function (obj) {
	      return obj.draw(ctx);
	    });
	  },
	  step: function step(dt) {
	    this.runLevel();
	    this.update(dt);
	    this.checkCollisions();
	    this.clearDead();
	    this.checkGameOver();
	  },
	  checkGameOver: function checkGameOver() {
	    if (this.playerHP === 0) {
	      this.isGameOver = true;
	    }
	  },
	  runLevel: function runLevel() {
	    var _waves = LEVELS[this.currentLevel];
	    if (this.isLevelRunning) {
	      if (!_enemy_generation.enemyGeneration.generating && this.enemies.length === 0) {
	        _waves[this.waveCounter]();
	        this.waveCounter++;
	        if (this.waveCounter >= _waves.length) {
	          this.waveCounter = 0;
	        }
	      }
	    }
	  },
	  update: function update(dt) {
	    this.allObjects().forEach(function (obj) {
	      return obj.update(dt);
	    });
	  },
	  checkCollisions: function checkCollisions() {
	    this.checkPlayerBulletCollisions();
	    this.checkPlayerShipCollisions();
	  },
	  checkPlayerBulletCollisions: function checkPlayerBulletCollisions() {
	    var _this = this;
	
	    this.bullets["player"].forEach(function (bullet) {
	      _this.enemies.forEach(function (enemy) {
	        if (bullet.isCollidedWith(enemy)) {
	          enemy.hit(bullet.damage);
	          _this.remove(bullet);
	        }
	      });
	    });
	  },
	  checkPlayerShipCollisions: function checkPlayerShipCollisions() {
	    var _this2 = this;
	
	    this.bullets["enemy"].forEach(function (bullet) {
	      if (bullet.isCollidedWith(_this2.ship)) {
	        _this2.ship.hit(bullet.damage);
	        _this2.remove(bullet);
	      }
	    });
	  },
	  clearDead: function clearDead() {
	    this.enemies = this.enemies.filter(function (enemy) {
	      return enemy.hp > 0;
	    });
	  },
	  allObjects: function allObjects() {
	    var all = this.enemies.concat([this.ship], this.bullets["player"], this.bullets["enemy"]);
	    return all;
	  },
	  addBullet: function addBullet(bullet) {
	    this.bullets[bullet.team].push(bullet);
	  },
	  remove: function remove(obj) {
	    if (obj instanceof _enemy.Enemy) {
	      var idx = this.enemies.indexOf(obj);
	      this.enemies.splice(idx, 1);
	    } else if (obj instanceof _bullet.Bullet) {
	      var _idx = this.bullets[obj.team].indexOf(obj);
	      this.bullets[obj.team].splice(_idx, 1);
	    }
	  }
	};
	
	exports.Game = Game;

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.Ship = undefined;
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _moving_object = __webpack_require__(4);
	
	var _player_weapon_ = __webpack_require__(5);
	
	var _player_wave_weapon = __webpack_require__(8);
	
	var _game = __webpack_require__(2);
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var Ship = function (_MovingObject) {
	  _inherits(Ship, _MovingObject);
	
	  function Ship(pos, game) {
	    _classCallCheck(this, Ship);
	
	    var _this = _possibleConstructorReturn(this, (Ship.__proto__ || Object.getPrototypeOf(Ship)).call(this, {
	      pos: pos,
	      vel: [0, 0],
	      radius: 8,
	      color: "#ffe9a3",
	      game: game
	    }));
	
	    _this._keyListeners();
	    _this.team = "player";
	    _this.weapon = new _player_wave_weapon.PlayerWaveWeapon(_this);
	    _this.pressedKeys = {};
	    return _this;
	  }
	
	  // relocate() {
	  //   this.pos = this.game.randomPosition();
	  //   this.vel = [0,0];
	  // };
	
	  _createClass(Ship, [{
	    key: 'fireWeapon',
	    value: function fireWeapon() {
	      this.weapon.fire();
	    }
	
	    // collideWith(otherObject) {
	    //   this.relocate();
	    // };
	
	  }, {
	    key: 'decelerate',
	    value: function decelerate(dt) {
	      if (this.vel[1] > 0) {
	        this.vel[1] -= 1500 * dt;
	        if (this.vel[1] < 0) {
	          this.vel[1] = 0;
	        }
	      } else if (this.vel[1] < 0) {
	        this.vel[1] += 1500 * dt;
	        if (this.vel[1] > 0) {
	          this.vel[1] = 0;
	        }
	      }
	      if (this.vel[0] > 0) {
	        this.vel[0] -= 1500 * dt;
	        if (this.vel[0] < 0) {
	          this.vel[0] = 0;
	        }
	      } else if (this.vel[0] < 0) {
	        this.vel[0] += 1500 * dt;
	        if (this.vel[0] > 0) {
	          this.vel[0] = 0;
	        }
	      }
	    }
	  }, {
	    key: 'setVel',
	    value: function setVel(dt) {
	      if (this.pressedKeys['DOWN'] && this.pressedKeys['UP']) {
	        this.decelerate(dt);
	      } else if (this.pressedKeys['SHIFT']) {
	        if (this.pressedKeys['DOWN']) {
	          this.vel[1] = 150;
	        } else if (this.pressedKeys['UP']) {
	          this.vel[1] = -150;
	        } else {
	          this.decelerate(dt);
	        }
	      } else if (this.pressedKeys['DOWN']) {
	        this.vel[1] = 300;
	      } else if (this.pressedKeys['UP']) {
	        this.vel[1] = -300;
	      } else {
	        this.decelerate(dt);
	      }
	
	      if (this.pressedKeys['RIGHT'] && this.pressedKeys['LEFT']) {
	        this.decelerate(dt);
	      } else if (this.pressedKeys['SHIFT']) {
	        if (this.pressedKeys['RIGHT']) {
	          this.vel[0] = 150;
	        } else if (this.pressedKeys['LEFT']) {
	          this.vel[0] = -150;
	        } else {
	          this.decelerate(dt);
	        }
	      } else if (this.pressedKeys['RIGHT']) {
	        this.vel[0] = 300;
	      } else if (this.pressedKeys['LEFT']) {
	        this.vel[0] = -300;
	      } else {
	        this.decelerate(dt);
	      }
	    }
	  }, {
	    key: 'update',
	    value: function update(dt) {
	      this.move(dt);
	      if (this.pressedKeys['z']) {
	        this.fireWeapon();
	      }
	    }
	  }, {
	    key: 'move',
	    value: function move(dt) {
	      var pos = this.pos;
	      var vel = this.vel;
	      this.setVel(dt);
	      var newPos = [pos[0] + vel[0] * dt, pos[1] + vel[1] * dt];
	      this._updateBoundedPos(newPos);
	    }
	  }, {
	    key: 'hit',
	    value: function hit(damage) {
	      _game.Game.playerHP -= damage;
	    }
	  }, {
	    key: '_updateBoundedPos',
	    value: function _updateBoundedPos(pos) {
	      if (pos[0] - this.radius < 0) {
	        pos[0] = this.radius;
	      }
	      if (pos[1] - this.radius < 0) {
	        pos[1] = this.radius;
	      }
	      if (pos[0] + this.radius > _game.Game.DIM_X) {
	        pos[0] = _game.Game.DIM_X - this.radius;
	      }
	      if (pos[1] + this.radius > _game.Game.DIM_Y) {
	        pos[1] = _game.Game.DIM_Y - this.radius;
	      }
	      this.pos = pos;
	    }
	  }, {
	    key: '_keyactions',
	    value: function _keyactions(e, status) {
	      event.preventDefault();
	      var code = event.keyCode;
	      var key = void 0;
	
	      switch (code) {
	        case 90:
	          key = 'z';
	          break;
	        case 88:
	          key = 'x';
	          break;
	        case 37:
	          key = 'LEFT';
	          break;
	        case 38:
	          key = 'UP';
	          break;
	        case 39:
	          key = 'RIGHT';
	          break;
	        case 40:
	          key = 'DOWN';
	          break;
	        case 16:
	          key = 'SHIFT';
	          break;
	      }
	
	      this.pressedKeys[key] = status;
	    }
	  }, {
	    key: 'shipKeydown',
	    value: function shipKeydown(e) {
	      this._keyactions(e, true);
	    }
	  }, {
	    key: 'shipKeyup',
	    value: function shipKeyup(e) {
	      this._keyactions(e, false);
	    }
	  }, {
	    key: 'removeListeners',
	    value: function removeListeners() {
	      var self = this;
	      document.removeEventListener('keydown', self.shipKeydown);
	      document.removeEventListener('keyup', self.shipKeyup);
	    }
	  }, {
	    key: '_keyListeners',
	    value: function _keyListeners() {
	      var self = this;
	      document.addEventListener('keydown', self.shipKeydown.bind(self));
	      document.addEventListener('keyup', self.shipKeyup.bind(self));
	    }
	  }]);
	
	  return Ship;
	}(_moving_object.MovingObject);
	
	exports.Ship = Ship;

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.MovingObject = undefined;
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _game = __webpack_require__(2);
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var MovingObject = function () {
	  function MovingObject(options) {
	    _classCallCheck(this, MovingObject);
	
	    this.pos = options.pos;
	    this.vel = options.vel;
	    this.radius = options.radius;
	    this.sprite = options.sprite;
	    this.color = options.color;
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
	
	  _createClass(MovingObject, [{
	    key: "draw",
	    value: function draw(ctx) {
	      ctx.fillStyle = this.color;
	      ctx.beginPath();
	
	      ctx.arc(this.pos[0], this.pos[1], this.radius, 0, 2 * Math.PI, false);
	
	      ctx.fill();
	    }
	  }, {
	    key: "move",
	    value: function move(dt) {
	      var pos = this.pos;
	      var vel = this.vel;
	      var newPos = [pos[0] + this.vel[0] * dt, pos[1] + this.vel[1] * dt];
	      this.pos = newPos;
	    }
	  }, {
	    key: "update",
	    value: function update(dt) {
	      this.move(dt);
	      this._checkBounds();
	    }
	  }, {
	    key: "_checkBounds",
	    value: function _checkBounds() {
	      if (this.pos[0] < -10 || this.pos[0] > _game.Game.DIM_X + 10 || this.pos[1] < -10 || this.pos[1] > _game.Game.DIM_Y + 10) {
	        _game.Game.remove(this);
	      }
	    }
	  }, {
	    key: "isCollidedWith",
	    value: function isCollidedWith(otherObject) {
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
	      var dx = this.pos[0] - otherObject.pos[0];
	      var dy = this.pos[1] - otherObject.pos[1];
	      var dist = Math.sqrt(dx * dx + dy * dy);
	      var radii = this.radius + otherObject.radius;
	      return dist < radii;
	    }
	  }, {
	    key: "collideWith",
	    value: function collideWith(otherObject) {}
	  }]);
	
	  return MovingObject;
	}();
	
	exports.MovingObject = MovingObject;

/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.PlayerWeapon1 = undefined;
	
	var _weapon = __webpack_require__(6);
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var PlayerWeapon1 = function (_Weapon) {
	  _inherits(PlayerWeapon1, _Weapon);
	
	  function PlayerWeapon1(player) {
	    _classCallCheck(this, PlayerWeapon1);
	
	    return _possibleConstructorReturn(this, (PlayerWeapon1.__proto__ || Object.getPrototypeOf(PlayerWeapon1)).call(this, {
	      owner: player
	    }));
	  }
	
	  return PlayerWeapon1;
	}(_weapon.Weapon);
	
	exports.PlayerWeapon1 = PlayerWeapon1;

/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.Weapon = undefined;
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _bullet = __webpack_require__(7);
	
	var _game = __webpack_require__(2);
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var Weapon = function () {
	  function Weapon(options) {
	    _classCallCheck(this, Weapon);
	
	    this.owner = options.owner;
	    this.cooldown = options.cooldown || 100;
	    this.damage = options.damage || 1;
	    this.bullets = options.bullets || [[0, -500]];
	    this.lastFired = 0;
	  }
	
	  _createClass(Weapon, [{
	    key: "fire",
	    value: function fire() {
	      var _this = this;
	
	      var _volley = function _volley() {
	        for (var i = 0; i < _this.bullets.length; i++) {
	          _game.Game.addBullet(new _bullet.Bullet({
	            color: _this.owner.color,
	            vel: _this.bullets[i],
	            pos: _this.owner.pos,
	            team: _this.owner.team,
	            damage: _this.damage
	          }));
	        }
	        _this.lastFired = Date.now();
	      };
	
	      if (Date.now() - this.lastFired > this.cooldown) {
	        _volley();
	      }
	    }
	  }]);
	
	  return Weapon;
	}();
	
	exports.Weapon = Weapon;

/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.Bullet = undefined;
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _moving_object = __webpack_require__(4);
	
	var _game = __webpack_require__(2);
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var Bullet = function (_MovingObject) {
	  _inherits(Bullet, _MovingObject);
	
	  function Bullet(options) {
	    _classCallCheck(this, Bullet);
	
	    var _this = _possibleConstructorReturn(this, (Bullet.__proto__ || Object.getPrototypeOf(Bullet)).call(this, {
	      pos: options.pos,
	      vel: options.vel,
	      radius: options.radius || 2,
	      color: options.color
	    }));
	
	    _this.team = options.team;
	    _this.damage = options.damage;
	    return _this;
	  }
	
	  _createClass(Bullet, [{
	    key: "collideWith",
	    value: function collideWith(otherObject) {}
	  }]);
	
	  return Bullet;
	}(_moving_object.MovingObject);
	
	exports.Bullet = Bullet;

/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.PlayerWaveWeapon = undefined;
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _weapon = __webpack_require__(6);
	
	var _wave_bullet = __webpack_require__(9);
	
	var _game = __webpack_require__(2);
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var PlayerWaveWeapon = function (_Weapon) {
	  _inherits(PlayerWaveWeapon, _Weapon);
	
	  function PlayerWaveWeapon(player) {
	    _classCallCheck(this, PlayerWaveWeapon);
	
	    var _this = _possibleConstructorReturn(this, (PlayerWaveWeapon.__proto__ || Object.getPrototypeOf(PlayerWaveWeapon)).call(this, {
	      owner: player
	    }));
	
	    _this.bullets = [[20, -500], [-20, -500]];
	    return _this;
	  }
	
	  _createClass(PlayerWaveWeapon, [{
	    key: 'fire',
	    value: function fire() {
	      var _this2 = this;
	
	      var _volley = function _volley() {
	        for (var i = 0; i < _this2.bullets.length; i++) {
	          _game.Game.addBullet(new _wave_bullet.WaveBullet({
	            color: _this2.owner.color,
	            vel: _this2.bullets[i],
	            pos: _this2.owner.pos,
	            team: _this2.owner.team,
	            damage: _this2.damage
	          }));
	        }
	        _this2.lastFired = Date.now();
	      };
	
	      if (Date.now() - this.lastFired > this.cooldown) {
	        _volley();
	      }
	    }
	  }]);
	
	  return PlayerWaveWeapon;
	}(_weapon.Weapon);
	
	exports.PlayerWaveWeapon = PlayerWaveWeapon;

/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.WaveBullet = undefined;
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _bullet = __webpack_require__(7);
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var WaveBullet = function (_Bullet) {
	  _inherits(WaveBullet, _Bullet);
	
	  function WaveBullet(options) {
	    _classCallCheck(this, WaveBullet);
	
	    var _this = _possibleConstructorReturn(this, (WaveBullet.__proto__ || Object.getPrototypeOf(WaveBullet)).call(this, options));
	
	    _this.startTime = Date.now();
	    _this.startPos = _this.pos;
	    _this.cycleSpeed = 10;
	    return _this;
	  }
	
	  _createClass(WaveBullet, [{
	    key: 'move',
	    value: function move(dt) {
	      var pos = this.pos;
	      var vel = this.vel;
	      var lifetime = Date.now() - this.startTime;
	      var lifecycle = lifetime / 1000 * this.cycleSpeed % (2 * Math.PI);
	      var newPos = [this.startPos[0] + vel[0] * Math.sin(lifecycle), pos[1] + vel[1] * dt];
	      this.pos = newPos;
	    }
	  }]);
	
	  return WaveBullet;
	}(_bullet.Bullet);
	
	exports.WaveBullet = WaveBullet;

/***/ },
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.Enemy = undefined;
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _moving_object = __webpack_require__(4);
	
	var _bullet = __webpack_require__(7);
	
	var _game = __webpack_require__(2);
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var Enemy = function (_MovingObject) {
	  _inherits(Enemy, _MovingObject);
	
	  function Enemy(options) {
	    _classCallCheck(this, Enemy);
	
	    var _this = _possibleConstructorReturn(this, (Enemy.__proto__ || Object.getPrototypeOf(Enemy)).call(this, {
	      pos: options.pos,
	      vel: [0, 0],
	      radius: options.radius,
	      color: options.color
	    }));
	
	    _this.script = options.script;
	    _this.weapon = options.weapon;
	    _this.hp = 1;
	    _this.startTime = Date.now();
	    return _this;
	  }
	
	  _createClass(Enemy, [{
	    key: "fireBullet",
	    value: function fireBullet(vel) {
	      var bulletVel = vel || [0, 100];
	      var bullet = new _bullet.Bullet({
	        pos: this.pos,
	        vel: bulletVel,
	        color: this.color,
	        team: "enemy",
	        damage: 1 });
	      _game.Game.addBullet(bullet);
	    }
	  }, {
	    key: "update",
	    value: function update(dt) {
	      this.script.movePattern(this);
	      this.script.firePattern(this);
	      this.move(dt);
	      this._checkBounds();
	    }
	  }, {
	    key: "fireWeapon",
	    value: function fireWeapon() {
	      this.weapon.fire();
	    }
	  }, {
	    key: "hit",
	    value: function hit(damage) {
	      this.hp -= damage;
	    }
	  }, {
	    key: "_checkBounds",
	    value: function _checkBounds() {
	      if (this.pos[0] < -100 || this.pos[0] > _game.Game.DIM_X + 100 || this.pos[1] < -200 || this.pos[1] > _game.Game.DIM_Y + 100) {
	        _game.Game.remove(this);
	      }
	    }
	  }]);
	
	  return Enemy;
	}(_moving_object.MovingObject);
	
	exports.Enemy = Enemy;

/***/ },
/* 11 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.enemyGeneration = undefined;
	
	var _enemyA = __webpack_require__(12);
	
	var _boss = __webpack_require__(14);
	
	var _game = __webpack_require__(2);
	
	var enemyGeneration = {
	  generating: false,
	  numEnemies: 0,
	  _reset: function _reset() {
	    enemyGeneration.numEnemies = 0;
	    enemyGeneration.generating = true;
	  },
	  _generateBuilder: function _generateBuilder(generator, maxEnemies, spacing) {
	    enemyGeneration._reset();
	    enemyGeneration.interval = setInterval(function () {
	      generator();
	
	      if (enemyGeneration.numEnemies === maxEnemies) {
	        clearInterval(enemyGeneration.interval);
	        enemyGeneration.numEnemies = 0;
	
	        setTimeout(function () {
	          enemyGeneration.generating = false;
	        }, 5000);
	      }
	    }, spacing);
	  },
	
	  LEVEL_1A: function LEVEL_1A() {
	    var posArray = [];
	    for (var i = 0; i < 32; i++) {
	      posArray.push([137 + 75 * (i % 8), -200 + 50 * (Math.floor(i / 8) % 4)]);
	    }
	
	    var _generator = function _generator() {
	      posArray.forEach(function (pos) {
	        _game.Game.enemies.push(new _enemyA.EnemyA({ pos: pos }));
	      });
	      enemyGeneration.numEnemies += 32;
	    };
	
	    enemyGeneration._generateBuilder(_generator, 32, 1000);
	  },
	
	  LEVEL_1B: function LEVEL_1B() {
	    var posArray = [[], [], [], []];
	    for (var row = 0; row < 4; row++) {
	      for (var i = 0; i < 8; i++) {
	        posArray[row].push([112 + 75 * i + 25 * (row % 2), -200 + 50 * row]);
	      }
	    }
	
	    var _generator = function _generator() {
	      posArray.forEach(function (row) {
	        row.forEach(function (pos) {
	          _game.Game.enemies.push(new _enemyA.EnemyA({ pos: pos }));
	        });
	      });
	      enemyGeneration.numEnemies += 32;
	    };
	
	    enemyGeneration._generateBuilder(_generator, 32, 1000);
	  },
	
	  LEVEL_1BOSS: function LEVEL_1BOSS() {
	    var _generator = function _generator() {
	      _game.Game.enemies.push(new _boss.Boss1({ pos: [_game.Game.DIM_X / 2, -100] }));
	      enemyGeneration.numEnemies += 1;
	    };
	    enemyGeneration._generateBuilder(_generator, 1, 1000);
	  }
	};
	
	exports.enemyGeneration = enemyGeneration;

/***/ },
/* 12 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.EnemyA = undefined;
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _enemy = __webpack_require__(10);
	
	var _enemyA_script = __webpack_require__(13);
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var EnemyA = function (_Enemy) {
	  _inherits(EnemyA, _Enemy);
	
	  function EnemyA(options) {
	    _classCallCheck(this, EnemyA);
	
	    var _this = _possibleConstructorReturn(this, (EnemyA.__proto__ || Object.getPrototypeOf(EnemyA)).call(this, {
	      pos: options.pos,
	      vel: [0, 75],
	      radius: 12,
	      color: '#aaaaaa'
	    }));
	
	    _this.hp = 3;
	    _this.script = _enemyA_script.EnemyAScript;
	    _this.startTime = Date.now();
	    _this.lastFire = 0;
	    return _this;
	  }
	
	  _createClass(EnemyA, [{
	    key: 'update',
	    value: function update(dt) {
	      this.script.movePattern(this);
	      this.script.firePattern(this);
	      this.move(dt);
	      this._checkBounds();
	    }
	  }]);
	
	  return EnemyA;
	}(_enemy.Enemy);
	
	exports.EnemyA = EnemyA;

/***/ },
/* 13 */
/***/ function(module, exports) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	var EnemyAScript = {
	  lastFire: 0,
	
	  movePattern: function movePattern(enemy) {
	    var lifetime = Date.now() - enemy.startTime;
	    if (lifetime < 4000) {
	      enemy.vel = [0, 75];
	    } else if (lifetime % 4000 < 1000) {
	      enemy.vel = [50, 0];
	    } else if (lifetime % 4000 < 2000) {
	      enemy.vel = [0, -50];
	    } else if (lifetime % 4000 < 3000) {
	      enemy.vel = [-50, 0];
	    } else if (lifetime % 4000 < 4000) {
	      enemy.vel = [0, 50];
	    }
	  },
	  firePattern: function firePattern(enemy) {
	    var lifetime = Date.now() - enemy.startTime;
	    var now = Date.now();
	    var interval = Math.random() * 7500 + 1500;
	    if (lifetime > 2000) {
	      if (now - enemy.lastFire > interval) {
	        enemy.fireBullet();
	        enemy.lastFire = Date.now();
	      }
	    } else {
	      enemy.lastFire = Date.now();
	    }
	  }
	};
	
	exports.EnemyAScript = EnemyAScript;

/***/ },
/* 14 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.Boss1 = undefined;
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _enemy = __webpack_require__(10);
	
	var _boss1_script = __webpack_require__(15);
	
	var _bullet = __webpack_require__(7);
	
	var _game = __webpack_require__(2);
	
	var _utils = __webpack_require__(16);
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var Boss1 = function (_Enemy) {
	  _inherits(Boss1, _Enemy);
	
	  function Boss1(options) {
	    _classCallCheck(this, Boss1);
	
	    var _this = _possibleConstructorReturn(this, (Boss1.__proto__ || Object.getPrototypeOf(Boss1)).call(this, {
	      pos: options.pos,
	      vel: [0, 0],
	      radius: 20,
	      color: "#5a12b5"
	    }));
	
	    _this.hp = 60;
	    _this.script = _boss1_script.Boss1Script;
	    _this.startTime = Date.now();
	    _this.lastFire = 0;
	    return _this;
	  }
	
	  _createClass(Boss1, [{
	    key: "update",
	    value: function update(dt) {
	      this.script.movePattern(this);
	      this.script.firePattern(this);
	      this.move(dt);
	    }
	  }, {
	    key: "fireBullets",
	    value: function fireBullets() {
	      var _this2 = this;
	
	      var lifetime = Date.now() - this.startTime;
	      var bulletVels = [];
	      for (var i = 0; i < 8; i++) {
	        bulletVels.push(_utils.Util.transform([100, 0], 45 * i + 15 * lifetime / 500));
	      }
	
	      bulletVels.forEach(function (vel) {
	        var bullet = new _bullet.Bullet({
	          pos: _this2.pos,
	          vel: vel,
	          color: "#eeeeee",
	          radius: 4,
	          team: "enemy",
	          damage: 1 });
	        _game.Game.addBullet(bullet);
	      });
	    }
	  }]);
	
	  return Boss1;
	}(_enemy.Enemy);
	
	exports.Boss1 = Boss1;

/***/ },
/* 15 */
/***/ function(module, exports) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	var Boss1Script = {
	  lastFire: 0,
	
	  movePattern: function movePattern(enemy) {
	    var lifetime = Date.now() - enemy.startTime;
	    if (lifetime < 4000) {
	      enemy.vel = [-50, 50];
	    } else if (lifetime % 10000 < 500) {
	      enemy.vel = [800, 0];
	    } else if (lifetime % 10000 < 2500) {
	      enemy.vel = [0, 0];
	    } else if (lifetime % 10000 < 3000) {
	      enemy.vel = [-800, -400];
	    } else if (lifetime % 10000 < 5000) {
	      enemy.vel = [0, 0];
	    } else if (lifetime % 10000 < 5500) {
	      enemy.vel = [800, 0];
	    } else if (lifetime % 10000 < 7500) {
	      enemy.vel = [0, 0];
	    } else if (lifetime % 10000 < 8000) {
	      enemy.vel = [-800, 400];
	    } else if (lifetime % 10000 < 10000) {
	      enemy.vel = [0, 0];
	    }
	  },
	  firePattern: function firePattern(enemy) {
	    var lifetime = Date.now() - enemy.startTime;
	    var now = Date.now();
	    var interval = 500;
	    if (lifetime > 5000 && enemy.vel[1] === 0 && enemy.vel[0] === 0) {
	      if (now - enemy.lastFire > interval) {
	        enemy.fireBullets();
	        enemy.lastFire = Date.now();
	      }
	    }
	  }
	};
	
	exports.Boss1Script = Boss1Script;

/***/ },
/* 16 */
/***/ function(module, exports) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	var Util = {
	  randomVec: function randomVec(length) {
	    var vel = [];
	    vel[0] = Math.random() * (2 * length) - length;
	    vel[1] = Math.random() * (2 * length) - length;
	    return vel;
	  },
	  transform: function transform(vel, angle) {
	    var radians = Math.PI / 180 * angle,
	        cos = Math.cos(radians),
	        sin = Math.sin(radians),
	        nx = cos * vel[0] + sin * vel[1],
	        ny = cos * vel[1] + sin * vel[0];
	    return [nx, ny];
	  }
	};
	
	exports.Util = Util;

/***/ },
/* 17 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.GameInfo = undefined;
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _game = __webpack_require__(2);
	
	var _health_bar = __webpack_require__(18);
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var requestAnimFrame = function () {
	  return window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame || function (callback) {
	    window.setTimeout(callback, 1000 / 60);
	  };
	}();
	
	var GameInfo = function () {
	  function GameInfo(ctx) {
	    _classCallCheck(this, GameInfo);
	
	    this.ctx = ctx;
	    this.lastTime = 0;
	    this.DIM_X = 1000;
	    this.DIM_Y = 600;
	  }
	
	  _createClass(GameInfo, [{
	    key: 'start',
	    value: function start() {
	      this.lastTime = Date.now();
	      this.healthBar = new _health_bar.HealthBar();
	      this.main();
	    }
	  }, {
	    key: 'main',
	    value: function main() {
	      var now = Date.now();
	      var dt = (now - this.lastTime) / 1000;
	      var self = this;
	      this.draw();
	      this.lastTime = now;
	      requestAnimFrame(this.main.bind(self));
	    }
	  }, {
	    key: 'draw',
	    value: function draw() {
	      this.ctx.clearRect(0, 0, 1000, 600);
	      this.ctx.fillStyle = "#121212";
	      this.ctx.fillRect(0, 0, this.DIM_X, this.DIM_Y);
	      if (this.healthBar.draw) {
	        this.healthBar.draw(this.ctx);
	      }
	    }
	  }]);
	
	  return GameInfo;
	}();
	
	exports.GameInfo = GameInfo;

/***/ },
/* 18 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.HealthBar = undefined;
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _game = __webpack_require__(2);
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var HealthBar = function () {
	  function HealthBar() {
	    _classCallCheck(this, HealthBar);
	
	    this.width = 50;
	    this.pos = [0, 600];
	  }
	
	  _createClass(HealthBar, [{
	    key: "draw",
	    value: function draw(ctx) {
	      var hp = _game.Game.playerHP;
	      var hpcolor = void 0;
	      if (hp > 8) {
	        hpcolor = "#44ff44";
	      } else if (hp > 4) {
	        hpcolor = "#ffff44";
	      } else {
	        hpcolor = "#ff4844";
	      }
	      ctx.fillStyle = hpcolor;
	      ctx.font = "16px Noto-Sans";
	      ctx.fillText('Health', this.pos[0] + 23, 100, 100);
	
	      ctx.fillStyle = hpcolor;
	
	      //HP bars
	      ctx.fillRect(this.pos[0] + 17, this.pos[1], this.width + 17, -480 * hp / 16);
	      for (var i = 0; i < 16; i++) {
	        ctx.strokeStyle = "#aaaaaa";
	        ctx.strokeRect(this.pos[0] + 17, this.pos[1] - 30 * i, this.width + 17, -30);
	      }
	    }
	  }]);
	
	  return HealthBar;
	}();
	
	exports.HealthBar = HealthBar;

/***/ }
/******/ ]);
//# sourceMappingURL=bundle.js.map