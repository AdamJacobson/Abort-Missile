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
  const game = new __WEBPACK_IMPORTED_MODULE_0__game__["a" /* default */]();
  setupButtons(game);
});

const setupButtons = (game) => {
  document.getElementsByTagName('body')[0].addEventListener('keydown', (e) => {
    game.sendKey(e);
  });
};


/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__stages__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__missile__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__animate__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__waves__ = __webpack_require__(7);





class Game {
  constructor() {
    const canvas = document.getElementById('canvas');
    this.screenWidth = canvas.width;
    this.screenHeight = canvas.height;

    this.reset();

    Object(__WEBPACK_IMPORTED_MODULE_2__animate__["a" /* default */])(this);
  }

  reset() {
    this.score = 0;
    this.lives = 3;
    this.wave = 0;

    this.missiles = [];
    this.gameLoop = null;
    this.paused = false;
    this.code = "";
    this.stage = __WEBPACK_IMPORTED_MODULE_0__stages__["b" /* NOT_STARTED */];
  }

  sendKey(e) {
    const keyCode = e.which;

    switch (this.stage) {
      case __WEBPACK_IMPORTED_MODULE_0__stages__["b" /* NOT_STARTED */]:
        if (this._anyKey(keyCode)) {
          this.nextWave();
        }
        break;

      case __WEBPACK_IMPORTED_MODULE_0__stages__["c" /* PAUSED */]:
        if (this._anyKey(keyCode)) {
          this.unpause();
        }
        break;

      case __WEBPACK_IMPORTED_MODULE_0__stages__["d" /* PLAYING */]:
        if (keyCode === 27) { // Escape
          if (this.stage === __WEBPACK_IMPORTED_MODULE_0__stages__["c" /* PAUSED */]) {
            this.unpause();
          } else {
            this.pause();
          }
        } else if (keyCode === 13 || keyCode === 32) { // enter || space
          this.fireCode(this.code);
          this.code = "";
        } else if (keyCode === 8) { // backspace
          this.code = this.code.slice(0, this.code.length - 1);
        } else if (keyCode >= 65 && keyCode <= 90) {
          this.code += e.key;
        }
        break;

      case __WEBPACK_IMPORTED_MODULE_0__stages__["f" /* WAVE_WON */]:
        if (this._anyKey(keyCode)) {
          this.nextWave();
        }
        break;

      case __WEBPACK_IMPORTED_MODULE_0__stages__["e" /* WAVE_LOST */]:
        if (this._anyKey(keyCode)) {
          this.reset();
        }
        break;

      case __WEBPACK_IMPORTED_MODULE_0__stages__["a" /* GAME_COMPLETE */]:
        if (this._anyKey(keyCode)) {
          this.reset();
        }
        break;
    }
  }

  _anyKey(keyCode) {
    return ([13, 27, 32].includes(keyCode) || keyCode >= 65 && keyCode <= 90);
  }

  fireCode(code) {
    this.missiles.forEach((missile) => {
      if (code === missile.code) {
        missile.destroyed = true;
      }
    });
  }

  impact(missile) {
    this.lives--;
    this.removeMissile(missile);
  }

  destroy(missile) {
    this.score += missile.points;
    this.removeMissile(missile);
  }

  removeMissile(missile) {
    const idx = this.missiles.indexOf(missile);
    this.missiles = this.missiles.slice(0, idx).concat(this.missiles.slice(idx + 1));

    if (this.lives === 0) {
      this.gameOver();
    } else if (this.missilesLeft === 0 && this.missiles.length === 0) {
      setTimeout(() => this.endWave(), 2000);
    }
  }

  nextWave() {
    this.wave++;
    if (this.wave <= __WEBPACK_IMPORTED_MODULE_3__waves__["a" /* finalWave */]) {
      this.startWave();
    } else {
      this.stage = __WEBPACK_IMPORTED_MODULE_0__stages__["a" /* GAME_COMPLETE */];
    }
  }

  startWave() {
    this.stage = __WEBPACK_IMPORTED_MODULE_0__stages__["d" /* PLAYING */];
    this.missilesLeft = 0;
    const missileInterval = 1500;

    let w = __WEBPACK_IMPORTED_MODULE_3__waves__["b" /* waves */][this.wave];
    let incoming = [];
    Object.keys(w).forEach(k => {
      this.missilesLeft += w[k];
      let i = 0;
      while (i < w[k]) {
        incoming.push(k);
        i++;
      }
    });
    incoming = this._shuffle(incoming);

    this.gameLoop = setInterval(() => {
      if (!this.paused) {
        if (this.missilesLeft > 0) {
          const missile = new __WEBPACK_IMPORTED_MODULE_1__missile__["a" /* default */](this.screenWidth, incoming[0]);
          this.missiles.push(missile);
          missile.startFalling();
          this.missilesLeft--;
          incoming = incoming.slice(1);
        }
      }
    }, missileInterval);
  }

  _shuffle(array) {
  let m = array.length, t, i;

  while (m) {
    i = Math.floor(Math.random() * m--);

    t = array[m];
    array[m] = array[i];
    array[i] = t;
  }

  return array;
}

  endWave() {
    this.stage = __WEBPACK_IMPORTED_MODULE_0__stages__["f" /* WAVE_WON */];
    clearInterval(this.gameLoop);
  }

  pause() {
    this.stage = __WEBPACK_IMPORTED_MODULE_0__stages__["c" /* PAUSED */];
    this.paused = true;
    this.missiles.forEach((missile) => missile.pause());
  }

  unpause() {
    this.stage = __WEBPACK_IMPORTED_MODULE_0__stages__["d" /* PLAYING */];
    this.paused = false;
    this.missiles.forEach((missile) => missile.unpause());
  }

  gameOver() {
    this.stage = __WEBPACK_IMPORTED_MODULE_0__stages__["e" /* WAVE_LOST */];
    clearInterval(this.gameLoop);
    this.missiles = [];

  }
}

/* harmony default export */ __webpack_exports__["a"] = (Game);


/***/ }),
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__random_words__ = __webpack_require__(3);


class Missile {
  constructor(screenWidth, wordLength) {
    this.x = Math.random() * (screenWidth - 50) + 25;
    this.y = -90; // start off the screen
    this.code = Object(__WEBPACK_IMPORTED_MODULE_0__random_words__["a" /* default */])(wordLength);
    this.points = 100;

    this.height = 50;
    this.width = 10;

    this.fallSpeed = 25;
    this.fallInterval = null;
    this.destroyed = false;

    this.paused = false;

    this.startFalling();
  }

  startFalling() {
    this.fallInterval = setInterval(() => {
      if (!this.paused) {
        this.fall();
      }
    }, this.fallSpeed);
  }

  pause() {
    this.paused = true;
  }

  unpause() {
    this.paused = false;
  }

  didImpact(screenHeight) {
    return this.y + this.height >= screenHeight;
  }

  fall() {
    this.y += 1;
  }
}

/* harmony default export */ __webpack_exports__["a"] = (Missile);


/***/ }),
/* 3 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
// Borrowed from random-words by Punkave which borrowed from
// xkcd password generator which borrowed it from wherever

const words = {
  3: [
    "act", "add", "age", "ago", "aid", "air", "all", "any", "are", "arm", "art",
    "ask", "ate", "bad", "bag", "bar", "bat", "bee", "bet", "bit", "bow", "box",
    "boy", "bus", "but", "buy", "can", "cap", "car", "cat", "cow", "cry", "cup",
    "cut", "day", "did", "die", "dig", "dog", "dot", "dry", "due", "dug", "ear",
    "eat", "egg", "end", "eye", "far", "fat", "fed", "few", "fix", "fly", "fog",
    "for", "fox", "fun", "fur", "gas", "get", "got", "gun", "had", "has", "hat",
    "hay", "her", "him", "his", "hit", "hot", "how", "ice", "ill", "its", "jar",
    "jet", "job", "joy", "key", "law", "lay", "led", "leg", "let", "lie", "log",
    "lot", "low", "mad", "man", "map", "may", "men", "met", "mix", "mud", "new",
    "nor", "not", "now", "off", "oil", "old", "one", "our", "out", "own", "pan",
    "pay", "pen", "per", "pet", "pie", "pig", "pot", "put", "ran", "raw", "red",
    "rod", "row", "run", "sad", "sat", "saw", "say", "sea", "see", "she", "sit",
    "six", "sky", "son", "sum", "sun", "tax", "tea", "ten", "thy", "tie", "tin",
    "tip", "too", "top", "toy", "try", "two", "use", "war", "was", "way", "wet",
    "who", "why", "win", "won", "yes", "yet", "you", "zoo"
  ],
  4: [
    "able", "also", "ants", "area", "army", "atom", "away", "baby", "back",
    "ball", "band", "bank", "bare", "bark", "barn", "base", "bean", "bear",
    "beat", "been", "bell", "belt", "bend", "bent", "best", "bill", "bite",
    "blew", "blow", "blue", "boat", "body", "bone", "book", "born", "both",
    "bowl", "burn", "bush", "busy", "cage", "cake", "call", "calm", "came",
    "camp", "card", "care", "case", "cast", "cave", "cell", "cent", "city",
    "clay", "club", "coal", "coat", "cold", "come", "cook", "cool", "copy",
    "corn", "cost", "crew", "crop", "dark", "date", "dawn", "dead", "deal",
    "dear", "deep", "deer", "desk", "dirt", "dish", "does", "doll", "done",
    "door", "down", "draw", "drew", "drop", "duck", "dull", "dust", "duty",
    "each", "earn", "east", "easy", "edge", "else", "even", "ever", "face",
    "fact", "fair", "fall", "farm", "fast", "fear", "feed", "feel", "feet",
    "fell", "felt", "fill", "film", "find", "fine", "fire", "firm", "fish",
    "five", "flag", "flat", "flew", "flow", "food", "foot", "form", "fort",
    "four", "free", "frog", "from", "fuel", "full", "gain", "game", "gate",
    "gave", "gift", "girl", "give", "glad", "goes", "gold", "gone", "good",
    "gray", "grew", "grow", "gulf", "hair", "half", "hall", "hand", "hang",
    "hard", "have", "heat", "held", "help", "herd", "here", "hide", "high",
    "hill", "hold", "hole", "home", "hope", "horn", "hour", "huge", "hung",
    "hunt", "hurt", "idea", "inch", "into", "iron", "jack", "join", "jump",
    "just", "keep", "kept", "kids", "kill", "kind", "knew", "know", "lack",
    "lady", "laid", "lake", "lamp", "land", "last", "late", "lead", "leaf",
    "left", "life", "lift", "like", "line", "lion", "lips", "list", "live",
    "load", "long", "look", "lose", "loss", "lost", "loud", "love", "luck",
    "made", "mail", "main", "make", "many", "mark", "mass", "meal", "mean",
    "meat", "meet", "mice", "mile", "milk", "mill", "mind", "mine", "mood",
    "moon", "more", "most", "move", "must", "name", "near", "neck", "nest",
    "news", "next", "nice", "nine", "none", "noon", "nose", "note", "noun",
    "nuts", "once", "only", "onto", "open", "over", "pack", "page", "paid",
    "pain", "pair", "pale", "park", "part", "pass", "past", "path", "pick",
    "pile", "pine", "pink", "pipe", "plan", "play", "plus", "poem", "poet",
    "pole", "pond", "pony", "pool", "poor", "port", "post", "pour", "pull",
    "pure", "push", "race", "rain", "rate", "rays", "read", "real", "rear",
    "rest", "rice", "rich", "ride", "ring", "rise", "road", "roar", "rock",
    "roll", "roof", "room", "root", "rope", "rose", "rule", "rush", "safe",
    "said", "sail", "sale", "salt", "same", "sand", "sang", "save", "seat",
    "seed", "seen", "sell", "send", "sent", "sets", "ship", "shoe", "shop",
    "shot", "show", "shut", "sick", "sign", "silk", "sing", "sink", "size",
    "skin", "slip", "slow", "snow", "soap", "soft", "soil", "sold", "some",
    "song", "soon", "sort", "spin", "star", "stay", "step", "stop", "such",
    "suit", "sure", "swam", "swim", "tail", "take", "talk", "tall", "tank",
    "tape", "task", "team", "tell", "tent", "term", "test", "than", "that",
    "thee", "them", "then", "they", "thin", "this", "thou", "thus", "tide",
    "till", "time", "tiny", "told", "tone", "took", "tool", "torn", "town",
    "trap", "tree", "trip", "tube", "tune", "turn", "type", "unit", "upon",
    "vast", "verb", "very", "view", "vote", "wait", "walk", "wall", "want",
    "warm", "warn", "wash", "wave", "weak", "wear", "week", "well", "went",
    "were", "west", "what", "when", "whom", "wide", "wife", "wild", "will",
    "wind", "wing", "wire", "wise", "wish", "with", "wolf", "wood", "wool",
    "word", "wore", "work", "yard", "year", "your", "zero"
  ],
  5: [
    "above", "acres", "adult", "after", "again", "agree", "ahead", "alike",
    "alive", "allow", "alone", "along", "aloud", "among", "angle", "angry",
    "apart", "apple", "arrow", "aside", "avoid", "aware", "badly", "basic",
    "basis", "began", "begun", "being", "below", "birds", "birth", "black",
    "blank", "blind", "block", "blood", "board", "bound", "brain", "brass",
    "brave", "bread", "break", "brick", "brief", "bring", "broad", "broke",
    "brown", "brush", "build", "built", "burst", "cabin", "canal", "carry",
    "catch", "cause", "chain", "chair", "chart", "check", "chest", "chief",
    "child", "chose", "class", "claws", "clean", "clear", "climb", "clock",
    "close", "cloth", "cloud", "coach", "coast", "color", "could", "count",
    "court", "cover", "crack", "cream", "cross", "crowd", "curve", "daily",
    "dance", "death", "depth", "dirty", "doing", "doubt", "dozen", "drawn",
    "dream", "dress", "dried", "drink", "drive", "drove", "eager", "early",
    "earth", "eaten", "eight", "empty", "enemy", "enjoy", "enter", "equal",
    "event", "every", "exact", "exist", "extra", "fence", "fewer", "field",
    "fifth", "fifty", "fight", "final", "first", "flame", "flies", "floor",
    "folks", "force", "forth", "forty", "found", "frame", "fresh", "front",
    "fruit", "fully", "funny", "giant", "given", "glass", "globe", "goose",
    "grade", "grain", "graph", "grass", "great", "green", "group", "grown",
    "guard", "guess", "guide", "habit", "happy", "heard", "heart", "heavy",
    "hello", "honor", "horse", "house", "human", "hurry", "image", "judge",
    "knife", "known", "label", "labor", "large", "later", "laugh", "learn",
    "least", "leave", "level", "light", "local", "loose", "lower", "lucky",
    "lunch", "lungs", "lying", "magic", "major", "maybe", "means", "meant",
    "metal", "might", "model", "money", "month", "motor", "mouse", "mouth",
    "movie", "music", "nails", "needs", "never", "night", "noise", "north",
    "noted", "occur", "ocean", "offer", "older", "orbit", "order", "other",
    "ought", "outer", "owner", "paint", "paper", "parts", "party", "peace",
    "piano", "piece", "pilot", "pitch", "place", "plain", "plane", "plant",
    "plate", "point", "porch", "pound", "power", "press", "price", "pride",
    "prize", "proud", "prove", "pupil", "queen", "quick", "quiet", "quite",
    "radio", "raise", "ranch", "range", "reach", "ready", "refer", "rhyme",
    "right", "river", "rocky", "rough", "round", "route", "ruler", "saved",
    "scale", "scene", "score", "seems", "sense", "serve", "seven", "shade",
    "shake", "shall", "shape", "share", "sharp", "sheep", "sheet", "shelf",
    "shine", "shirt", "shoot", "shore", "short", "shout", "shown", "sides",
    "sight", "silly", "since", "skill", "slabs", "slave", "sleep", "slept",
    "slide", "slope", "small", "smell", "smile", "smoke", "snake", "solar",
    "solid", "solve", "sound", "south", "space", "speak", "speed", "spell",
    "spend", "spent", "spite", "split", "sport", "stage", "stand", "start",
    "state", "steam", "steel", "steep", "stems", "stick", "stiff", "still",
    "stock", "stone", "stood", "store", "storm", "story", "stove", "straw",
    "strip", "stuck", "sugar", "sweet", "swept", "swing", "swung", "table",
    "taken", "tales", "taste", "teach", "tears", "teeth", "thank", "there",
    "these", "thick", "thing", "think", "third", "those", "three", "threw",
    "throw", "thumb", "tight", "tired", "title", "today", "topic", "total",
    "touch", "tower", "trace", "track", "trade", "trail", "train", "tribe",
    "trick", "tried", "truck", "trunk", "truth", "twice", "uncle", "under",
    "union", "until", "upper", "using", "usual", "value", "vapor", "visit",
    "voice", "vowel", "wagon", "waste", "watch", "water", "weigh", "whale",
    "wheat", "wheel", "where", "which", "while", "white", "whole", "whose",
    "women", "world", "worry", "worse", "worth", "would", "write", "wrong",
    "wrote", "young", "youth"
  ],
  6: [
    "accept", "across", "action", "active", "actual", "advice", "affect",
    "afraid", "almost", "amount", "animal", "answer", "anyone", "anyway",
    "around", "arrive", "asleep", "atomic", "attack", "author", "basket",
    "battle", "beauty", "became", "become", "before", "behind", "belong",
    "beside", "better", "beyond", "bigger", "border", "bottle", "bottom",
    "branch", "breath", "breeze", "bridge", "bright", "broken", "buried",
    "butter", "camera", "cannot", "carbon", "castle", "cattle", "caught",
    "center", "chance", "change", "charge", "cheese", "choice", "choose",
    "chosen", "church", "circle", "circus", "closer", "coffee", "colony",
    "column", "coming", "common", "copper", "corner", "cotton", "couple",
    "course", "cowboy", "create", "damage", "danger", "decide", "deeply",
    "degree", "depend", "desert", "design", "detail", "differ", "dinner",
    "direct", "divide", "doctor", "dollar", "donkey", "double", "driven",
    "driver", "during", "easier", "easily", "effect", "effort", "either",
    "eleven", "energy", "engine", "enough", "entire", "escape", "except",
    "expect", "facing", "factor", "failed", "fairly", "fallen", "family",
    "famous", "farmer", "faster", "father", "fellow", "fierce", "figure",
    "finest", "finger", "finish", "flight", "flower", "follow", "forest",
    "forget", "forgot", "former", "fought", "fourth", "friend", "frozen",
    "future", "garage", "garden", "gather", "gentle", "gently", "giving",
    "golden", "ground", "growth", "handle", "happen", "harbor", "harder",
    "hardly", "having", "headed", "health", "height", "hidden", "higher",
    "hollow", "hungry", "hunter", "income", "indeed", "inside", "island",
    "itself", "joined", "jungle", "larger", "layers", "leader", "length",
    "lesson", "letter", "likely", "liquid", "listen", "little", "living",
    "locate", "lonely", "longer", "lovely", "magnet", "mainly", "making",
    "manner", "market", "master", "matter", "melted", "member", "memory",
    "mental", "merely", "method", "middle", "mighty", "minute", "mirror",
    "modern", "moment", "monkey", "mostly", "mother", "motion", "moving",
    "muscle", "myself", "nation", "native", "nature", "nearby", "nearer",
    "nearly", "needed", "needle", "nobody", "nodded", "notice", "number",
    "object", "obtain", "office", "oldest", "orange", "origin", "oxygen",
    "palace", "parent", "partly", "pencil", "people", "period", "person",
    "phrase", "planet", "plates", "please", "plenty", "plural", "pocket",
    "poetry", "police", "powder", "pretty", "proper", "public", "purple",
    "rabbit", "rather", "reader", "reason", "recall", "recent", "record",
    "region", "remain", "remove", "repeat", "report", "result", "return",
    "review", "rhythm", "riding", "rising", "rocket", "rubbed", "rubber",
    "saddle", "safety", "salmon", "scared", "school", "screen", "search",
    "season", "second", "secret", "seeing", "seldom", "select", "series",
    "settle", "shadow", "shells", "should", "signal", "silent", "silver",
    "simple", "simply", "single", "sister", "slight", "slowly", "smooth",
    "social", "softly", "source", "speech", "spider", "spirit", "spoken",
    "spread", "spring", "square", "stairs", "stared", "steady", "stream",
    "street", "strike", "string", "strong", "struck", "sudden", "summer",
    "supper", "supply", "symbol", "system", "taught", "theory", "thirty",
    "though", "thread", "throat", "thrown", "tongue", "toward", "travel",
    "troops", "twelve", "twenty", "unless", "upward", "useful", "valley",
    "volume", "voyage", "wealth", "weight", "widely", "window", "winter",
    "within", "wonder", "wooden", "worker", "writer", "yellow"
  ],
  7: [
    "account", "against", "already", "ancient", "another", "anybody", "applied",
    "arrange", "article", "attempt", "average", "balance", "balloon", "because",
    "beneath", "between", "bicycle", "biggest", "blanket", "breathe", "brother",
    "brought", "buffalo", "capital", "captain", "careful", "carried", "central",
    "century", "certain", "chamber", "chapter", "chicken", "citizen", "clearly",
    "climate", "closely", "clothes", "collect", "college", "combine", "command",
    "company", "compare", "compass", "complex", "consist", "contain", "control",
    "cookies", "correct", "country", "courage", "curious", "current", "customs",
    "cutting", "develop", "diagram", "discuss", "disease", "distant", "driving",
    "dropped", "earlier", "element", "equally", "equator", "evening", "exactly",
    "examine", "example", "excited", "explain", "explore", "express", "factory",
    "farther", "feature", "fifteen", "finally", "foreign", "forward", "freedom",
    "further", "general", "getting", "grabbed", "gravity", "greater", "greatly",
    "halfway", "happily", "heading", "hearing", "helpful", "herself", "highest",
    "highway", "himself", "history", "however", "hundred", "hurried", "husband",
    "imagine", "improve", "include", "instant", "instead", "journey", "kitchen",
    "largest", "leather", "leaving", "library", "limited", "machine", "managed",
    "married", "massage", "measure", "missing", "mission", "mistake", "mixture",
    "morning", "musical", "natural", "nearest", "nervous", "nothing", "numeral",
    "observe", "officer", "opinion", "outline", "outside", "package", "passage",
    "pattern", "percent", "perfect", "perhaps", "picture", "planned", "plastic",
    "popular", "prepare", "present", "prevent", "printed", "private", "problem",
    "process", "produce", "product", "program", "provide", "purpose", "putting",
    "quarter", "quickly", "quietly", "rapidly", "realize", "receive", "refused",
    "regular", "related", "replace", "replied", "require", "respect", "running",
    "science", "section", "serious", "service", "setting", "several", "shaking",
    "shallow", "shelter", "shorter", "silence", "similar", "sitting", "slipped",
    "smaller", "society", "soldier", "somehow", "someone", "special", "species",
    "station", "stepped", "stomach", "stopped", "strange", "stretch", "student",
    "studied", "subject", "success", "suggest", "support", "suppose", "surface",
    "teacher", "thought", "through", "tightly", "tobacco", "tonight", "traffic",
    "treated", "trouble", "typical", "unhappy", "unknown", "unusual", "usually",
    "variety", "various", "vessels", "victory", "village", "visitor", "weather",
    "welcome", "western", "whether", "whistle", "willing", "without", "worried",
    "wrapped", "writing", "written", "younger"
  ],
  8: [
    "accurate", "activity", "actually", "addition", "airplane", "alphabet",
    "although", "anything", "anywhere", "attached", "audience", "baseball",
    "becoming", "behavior", "believed", "birthday", "building", "business",
    "captured", "changing", "chemical", "children", "clothing", "complete",
    "composed", "compound", "congress", "consider", "contrast", "creature",
    "darkness", "daughter", "declared", "describe", "diameter", "directly",
    "discover", "distance", "division", "electric", "elephant", "engineer",
    "entirely", "everyone", "evidence", "exchange", "exciting", "exercise",
    "familiar", "fastened", "favorite", "feathers", "fighting", "floating",
    "football", "friendly", "frighten", "function", "gasoline", "greatest",
    "handsome", "happened", "hospital", "identity", "increase", "indicate",
    "industry", "instance", "interest", "interior", "invented", "involved",
    "language", "location", "material", "medicine", "military", "minerals",
    "mountain", "movement", "national", "negative", "neighbor", "official",
    "opposite", "ordinary", "original", "parallel", "personal", "physical",
    "pictured", "planning", "pleasant", "pleasure", "position", "positive",
    "possible", "possibly", "potatoes", "powerful", "practice", "pressure",
    "previous", "probably", "progress", "promised", "properly", "property",
    "question", "railroad", "recently", "remember", "research", "sentence",
    "separate", "settlers", "shinning", "shoulder", "simplest", "slightly",
    "smallest", "solution", "somebody", "sometime", "southern", "specific",
    "standard", "straight", "stranger", "strength", "stronger", "struggle",
    "studying", "suddenly", "sunlight", "surprise", "swimming", "syllable",
    "terrible", "thousand", "together", "tomorrow", "triangle", "tropical",
    "universe", "valuable", "vertical", "whatever", "whenever", "wherever",
    "yourself"
  ],
  9: [
    "adjective", "adventure", "afternoon", "announced", "apartment", "attention",
    "available", "beautiful", "beginning", "breakfast", "breathing", "carefully",
    "certainly", "character", "classroom", "community", "concerned", "condition",
    "connected", "consonant", "continent", "continued", "correctly", "dangerous",
    "determine", "different", "difficult", "direction", "disappear", "discovery",
    "education", "equipment", "essential", "establish", "everybody", "excellent",
    "exclaimed", "fireplace", "forgotten", "furniture", "generally", "gradually",
    "important", "including", "influence", "knowledge", "machinery", "molecular",
    "naturally", "necessary", "newspaper", "operation", "organized", "ourselves",
    "paragraph", "particles", "perfectly", "policeman", "political", "practical",
    "president", "primitive", "principal", "principle", "recognize", "religious",
    "represent", "satisfied", "scientist", "selection", "situation", "something",
    "somewhere", "statement", "structure", "substance", "telephone", "therefore",
    "underline", "vegetable", "whispered", "wonderful", "yesterday"
  ]
};

const randomWordByLength = (length) => {
  return sample(words[length]);
};

const sample = values => {
  return values[Math.floor(Math.random() * values.length)];
};

/* harmony default export */ __webpack_exports__["a"] = (randomWordByLength);


/***/ }),
/* 4 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__stages__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__sprite__ = __webpack_require__(6);



const fontLg = 30;
const fontMed = 24;
const fontSm = 18;

const buildingIcon = '\uf0f7';
let canvas, ctx, rocket, city, game;
let impactExplosionSheet, airExplosionSheet;
let activeSprites = [];

const defaultFont = "PressStart";
const font = (size) => {
  return `${size}px '${defaultFont}'`;
};

function render(g) {
  game = g;
  canvas = document.getElementById('canvas');
  ctx = canvas.getContext('2d');

  rocket = document.getElementById('rocket');
  city = document.getElementById('city');

  impactExplosionSheet = document.getElementById('impact_explosion');
  airExplosionSheet = document.getElementById('air_explosion');

  window.requestAnimationFrame(renderFrame);
}

const impactExplosionOptions = (x, y) => {
  return {
    ctx: ctx,
    width: 131,
    height: 162,
    numberOfFrames: 25,
    ticksPerFrame: 2,
    x,
    y,
    image: impactExplosionSheet
  };
};

const airExplosionOptions = (x, y) => {
  return {
    ctx: ctx,
    width: 157,
    height: 229,
    numberOfFrames: 19,
    ticksPerFrame: 2,
    x,
    y,
    image: airExplosionSheet
  };
};

const newSprite = options => {
  activeSprites.push(Object(__WEBPACK_IMPORTED_MODULE_1__sprite__["a" /* default */])(options));
};

const renderSprites = () => {
  let stillActiveSprites = [];

  activeSprites.forEach(s => {
    s.update();
    s.render();

    if (!s.done) {
      stillActiveSprites.push(s);
    }
  });

  activeSprites = stillActiveSprites;
};

const clearSprites = () => {
  activeSprites = [];
};

function renderFrame() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  renderBackground();

  switch (game.stage) {
    case __WEBPACK_IMPORTED_MODULE_0__stages__["b" /* NOT_STARTED */]:
      renderTitleScreen();
      break;

    case __WEBPACK_IMPORTED_MODULE_0__stages__["d" /* PLAYING */]:
      renderSprites();
      renderMissiles();
      renderHud();
      break;

    case __WEBPACK_IMPORTED_MODULE_0__stages__["c" /* PAUSED */]:
      renderPauseScreen();
      break;

    case __WEBPACK_IMPORTED_MODULE_0__stages__["e" /* WAVE_LOST */]:
      renderGameOverScreen();
      clearSprites();
      break;

    case __WEBPACK_IMPORTED_MODULE_0__stages__["f" /* WAVE_WON */]:
      renderWaveCompleteScreen();
      clearSprites();
      break;

    case __WEBPACK_IMPORTED_MODULE_0__stages__["a" /* GAME_COMPLETE */]:
      renderGameCompleteScreen();
      break;
  }

  window.requestAnimationFrame(() => renderFrame());
}

const renderOverlay = () => {
  ctx.fillStyle = "rgba(100, 100, 100, 0.7)";
  ctx.fillRect(0, 0, game.screenWidth, game.screenHeight);
};

const renderGameCompleteScreen = () => {
  renderOverlay();

  ctx.fillStyle = "white";
  ctx.textAlign = "center";
  ctx.font = font(fontLg);
  ctx.fillText("Thats the end!", game.screenWidth / 2, 100);

  ctx.font = font(fontSm);
  ctx.fillText("Thanks for playing!", game.screenWidth / 2, 160);
  ctx.fillText("Final Score: " + game.score, game.screenWidth / 2, 200);

  ctx.fillText("Press any key to play again", game.screenWidth / 2, game.screenHeight - 100);
};

const renderTitleScreen = () => {
  renderOverlay();

  ctx.fillStyle = "white";
  ctx.textAlign = "center";
  ctx.font = font(fontLg);
  ctx.fillText("Abort Missile!", game.screenWidth / 2, 100);

  renderInstructions();

  ctx.fillText("Press any key to begin!", game.screenWidth / 2, game.screenHeight - 100);
};

const renderInstructions = () => {
  ctx.font = font(fontMed);
  ctx.fillText("Instructions", game.screenWidth / 2, 180);

  ctx.font = font(fontSm);
  ctx.fillText("Type the word which", game.screenWidth / 2, 220);
  ctx.fillText("appears by the missile", game.screenWidth / 2, 240);

  ctx.fillText("Press ENTER or SPACE", game.screenWidth / 2, 270);
  ctx.fillText("to send the word", game.screenWidth / 2, 290);

  ctx.fillText("Press ESCAPE at any", game.screenWidth / 2, 370);
  ctx.fillText("time to pause the game", game.screenWidth / 2, 390);
};

const renderWaveCompleteScreen = () => {
  renderOverlay();

  ctx.fillStyle = "white";
  ctx.textAlign = "center";
  ctx.font = font(fontLg);
  ctx.fillText(`Wave ${game.wave} Complete!`, game.screenWidth / 2, 100);

  ctx.font = font(fontSm);
  ctx.fillText("Press any key to continue", game.screenWidth / 2, game.screenHeight - 100);
};

const renderPauseScreen = () => {
  renderOverlay();

  ctx.fillStyle = "white";
  ctx.textAlign = "center";
  ctx.font = font(fontLg);
  ctx.fillText("Game Paused", game.screenWidth / 2, 100);

  renderInstructions();

  ctx.font = font(fontMed);
  ctx.fillText("Press any key to resume", game.screenWidth / 2, game.screenHeight - 100);
};

const renderGameOverScreen = () => {
  renderOverlay();

  ctx.fillStyle = "white";
  ctx.textAlign = "center";
  ctx.font = font(fontLg);
  ctx.fillText("Game Over", game.screenWidth / 2, 100);

  ctx.font = font(fontMed);
  ctx.fillText("Final Score: " + game.score, game.screenWidth / 2, 160);
  ctx.fillText("Wave: " + game.wave, game.screenWidth / 2, 200);

  ctx.font = font(fontSm);
  ctx.fillText("Press any key to play again", game.screenWidth / 2, game.screenHeight - 100);
};

const textColor = (gameCodeChar, missileCodeChar) => {
  if (gameCodeChar === missileCodeChar) {
    return "red";
  }
  return "black";
};

const texter = (str, x, y) =>{
  for(let i = 0; i <= str.length; ++i){
    let ch = str.charAt(i);
    ctx.fillStyle = textColor(game.code[i], str[i]);
    ctx.fillText(ch, x, y);
    x += ctx.measureText(ch).width;
  }
};

const renderMissiles = () => {
  game.missiles.forEach((m) => {
    ctx.drawImage(rocket, m.x - 12, m.y - 35);
    ctx.fillStyle = "red";
    ctx.fillRect(m.x, m.y, 5, 5);

    ctx.fillStyle = "black";
    ctx.font = font(fontSm - 4);
    let codeWidth = ctx.measureText(m.code).width;
    texter(m.code, m.x - codeWidth / 2, m.y + m.height + 18);

    if (m.didImpact(canvas.height)) {
      game.impact(m);
      newSprite(impactExplosionOptions(m.x - m.width - 60, m.y - m.height - 40));
    } else if (m.destroyed) {
      game.destroy(m);
      newSprite(airExplosionOptions(m.x - m.width - 55, m.y - m.height - 45));
    }
  });
};

const renderBackground = () => {
  ctx.drawImage(city, 0, 0, canvas.width, canvas.height);
};

const renderHud = () => {
  ctx.font = font(fontMed);
  ctx.fillStyle = "black";
  ctx.textAlign = "center";
  ctx.fillText(game.code, game.screenWidth / 2, game.screenHeight - 10);

  // ctx.font = font(20);
  ctx.textAlign = "left";
  ctx.fillStyle = "black";
  ctx.fillText(game.score, 0 + 50, game.screenHeight - 10);

  ctx.font = '20px FontAwesome';
  ctx.fillStyle = "black";
  ctx.textAlign = "left";
  let life = 0;
  while (life < game.lives) {
    ctx.fillText(buildingIcon, game.screenWidth - 100 + (life * 30), game.screenHeight - 10);
    life++;
  }
};

/* harmony default export */ __webpack_exports__["a"] = (render);


/***/ }),
/* 5 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
const NOT_STARTED = 0;
/* harmony export (immutable) */ __webpack_exports__["b"] = NOT_STARTED;

const PLAYING = 1;
/* harmony export (immutable) */ __webpack_exports__["d"] = PLAYING;

const PAUSED = 2;
/* harmony export (immutable) */ __webpack_exports__["c"] = PAUSED;

const WAVE_WON = 3;
/* harmony export (immutable) */ __webpack_exports__["f"] = WAVE_WON;

const WAVE_LOST = 4;
/* harmony export (immutable) */ __webpack_exports__["e"] = WAVE_LOST;

const GAME_COMPLETE = 5;
/* harmony export (immutable) */ __webpack_exports__["a"] = GAME_COMPLETE;



/***/ }),
/* 6 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
const sprite = (options) => {
  let that = {},
    frameIndex = 0,
    tickCount = 0,
    ticksPerFrame = options.ticksPerFrame || 0,
    numberOfFrames = options.numberOfFrames || 1;

  that.ctx = options.ctx;
  that.width = options.width;
  that.height = options.height;
  that.image = options.image;
  that.x = options.x;
  that.y = options.y;
  that.repeat = options.repeat;
  that.done = false;

  that.update = function () {
    tickCount += 1;

    if (tickCount > ticksPerFrame) {
      tickCount = 0;

      if (frameIndex < numberOfFrames - 1) {
        frameIndex += 1;
      } else {
        if (that.repeat) {
          frameIndex = 0;
        } else {
          that.done = true;
        }
      }
    }
  };

  that.render = function () {
    // image, sx, sy, sWitdh, sHeight, dx, dy, dWidth, dHeight
    that.ctx.drawImage(
      that.image,
      frameIndex * that.width,
      0,
      that.width,
      that.height,
      that.x,
      that.y,
      that.width,
      that.height
    );
  };

  return that;
};

/* harmony default export */ __webpack_exports__["a"] = (sprite);


/***/ }),
/* 7 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
// wave#: {
//   wordLength: numMissiles
// },

const waves = {
  1: {
    4: 10
  },

  2: {
    4: 10,
    5: 5
  },

  3: {
    4: 5,
    5: 10
  },

  4: {
    5: 15
  },

  5: {
    5: 10,
    6: 5
  },

  6: {
    6: 10
  },

  7: {
    6: 10,
    7: 5
  },

  8: {
    7: 10
  },

  9: {
    7: 10,
    8: 5
  },

  10: {
    8: 10,
    9: 10
  }
};
/* harmony export (immutable) */ __webpack_exports__["b"] = waves;


const finalWave = 10;
/* harmony export (immutable) */ __webpack_exports__["a"] = finalWave;



/***/ })
/******/ ]);
//# sourceMappingURL=bundle.js.map