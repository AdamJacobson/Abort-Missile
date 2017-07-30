/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
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
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__game__ = __webpack_require__(1);


document.addEventListener('DOMContentLoaded', () => {
  const game = new __WEBPACK_IMPORTED_MODULE_0__game__["a" /* default */](700, 500);
  setupButtons(game);
  game.start();

  // setupGame();

  animate(game);
});

// const setupGame = () => {
//   const stage = new createjs.Stage("canvas");
//   const circle = new createjs.Shape();
//   circle.graphics.beginFill("DeepSkyBlue").drawCircle(0, 0, 50);
//   circle.x = 100;
//   circle.y = 100;
//   stage.addChild(circle);
//   stage.update();
// };

function animate(game) {
  window.requestAnimationFrame(() => draw(game));
}

function draw(game) {
  // console.log("x: " + game.missile.x);

  let canvas = document.getElementById('canvas');
  let ctx = canvas.getContext('2d');

  // ctx.globalCompositeOperation = 'destination-over';
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // ctx.save();

  // Background
  let gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
  gradient.addColorStop(0, 'black');
  gradient.addColorStop(1, 'blue');
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // Missile

  game.missiles.forEach((m) => {
    ctx.fillStyle = "gray";
    ctx.fillRect(m.x, m.y, m.width, m.height);

    ctx.fillStyle = "white";
    ctx.font = '20px serif';
    ctx.textAlign="center";
    ctx.fillText(m.code, m.x, m.y + m.height + 18);

    m.fall();

    if (m.didImpact(canvas.height)) {
      game.impact(m);
    }
  });


  window.requestAnimationFrame(() => draw(game));
}


const setupButtons = (game) => {
  document.getElementById('button-instructions').addEventListener('click', () => {
    console.log("Click instructions");
    document.getElementById('instructions-modal').classList.add('show');
    game.pause();
  });

  document.getElementById('button-play-pause').addEventListener('click', () => {
    console.log("Click play/pause");
    game.unpause();
  });

  document.getElementById('close-modal').addEventListener('click', () => {
    document.getElementById('instructions-modal').classList.remove('show');
  });

  document.getElementById('mask').addEventListener('click', (e) => {
    if (e.target === e.currentTarget) {
      document.getElementById('instructions-modal').classList.remove('show');
    }
  });
};


/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__missile__ = __webpack_require__(2);


class Game {
  constructor(screenWidth, screenHeight) {
    this.score = 0;
    this.lives = 3;
    this.wave = 1;

    this.screenWidth = screenWidth;
    this.screenHeight = screenHeight;

    this.missiles = [];
  }

  impact(missile) {
    this.removeMissile(missile);
    console.log("Missile has impacted");
  }

  destroy(missile) {
    this.removeMissile(missile);
    console.log("Missile was destroyed");
  }

  removeMissile(missile) {
    const idx = this.missiles.indexOf(missile);
    if (idx > -1) {
      this.missiles.splice(idx, 1);
    }
  }

  start() {
    console.log("Game started");
    setInterval(() => {
      this.missiles.push(new __WEBPACK_IMPORTED_MODULE_0__missile__["a" /* default */](this.screenWidth));
    }, 3000);
  }

  pause() {
    console.log("Game paused");
  }

  unpause() {
    console.log("Game unpaused");
  }
}

/* harmony default export */ __webpack_exports__["a"] = (Game);


/***/ }),
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
class Missile {
  constructor(screenWidth) {
    this.x = Math.random() * (screenWidth - 50) + 25;
    this.y = 0;
    this.code = "Missile"; // Eventually randomly generated code

    this.height = 50;
    this.width = 10;
  }

  didImpact(screenHeight) {
    return this.y + this.height >= screenHeight;
  }

  fall() {
    this.y += 1.5;
  }

  impact() {
    console.log("Missile has impacted");
  }
}

/* harmony default export */ __webpack_exports__["a"] = (Missile);


/***/ })
/******/ ]);
//# sourceMappingURL=bundle.js.map