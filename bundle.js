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
  // game.nextWave();
});

const setupButtons = (game) => {
  // document.getElementById('button-instructions').addEventListener('click', () => {
  //   game.pause();
  //   console.log("Clicked instructions");
  //   document.getElementById('instructions-modal').classList.add('show');
  // });
  //
  // document.getElementById('button-play-pause').addEventListener('click', () => {
  //   console.log("Clicked play/pause");
  //   game.unpause();
  // });
  //
  // document.getElementById('close-modal').addEventListener('click', () => {
  //   game.unpause();
  //   document.getElementById('instructions-modal').classList.remove('show');
  // });
  //
  // document.getElementById('mask').addEventListener('click', (e) => {
  //   if (e.target === e.currentTarget) {
  //     game.unpause();
  //     document.getElementById('instructions-modal').classList.remove('show');
  //   }
  // });

  document.getElementsByTagName('body')[0].addEventListener('keydown', (e) => {
    game.sendKey(e);
  });
};


/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__missile__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__animate__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__stages__ = __webpack_require__(5);




class Game {
  constructor() {
    const canvas = document.getElementById('canvas');
    this.screenWidth = canvas.width;
    this.screenHeight = canvas.height;

    this.reset();

    Object(__WEBPACK_IMPORTED_MODULE_1__animate__["a" /* default */])(this);
  }

  reset() {
    this.score = 0;
    this.lives = 3;
    this.wave = 0;

    this.missiles = [];
    this.gameLoop = null;
    this.paused = false;
    this.code = "";
    this.stage = __WEBPACK_IMPORTED_MODULE_2__stages__["a" /* NOT_STARTED */];
  }

  sendKey(e) {
    const keyCode = e.which;

    switch (this.stage) {
      case __WEBPACK_IMPORTED_MODULE_2__stages__["a" /* NOT_STARTED */]:
        if (this._anyKey(keyCode)) {
          this.nextWave();
        }
        break;

      case __WEBPACK_IMPORTED_MODULE_2__stages__["b" /* PAUSED */]:
        if (this._anyKey(keyCode)) {
          this.unpause();
        }
        break;

      case __WEBPACK_IMPORTED_MODULE_2__stages__["c" /* PLAYING */]:
        if (keyCode === 27) { // Escape
          if (this.stage === __WEBPACK_IMPORTED_MODULE_2__stages__["b" /* PAUSED */]) {
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

      case __WEBPACK_IMPORTED_MODULE_2__stages__["e" /* WAVE_WON */]:
        if (this._anyKey(keyCode)) {
          this.nextWave();
        }
        break;

      case __WEBPACK_IMPORTED_MODULE_2__stages__["d" /* WAVE_LOST */]:
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
        this.destroy(missile);
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
      this.endWave();
    }
  }

  nextWave() {
    this.wave++;
    this.startWave();
  }

  startWave() {
    this.stage = __WEBPACK_IMPORTED_MODULE_2__stages__["c" /* PLAYING */];
    this.missilesLeft = 10;
    const missileInterval = 1500;

    this.gameLoop = setInterval(() => {
      if (!this.paused) {
        if (this.missilesLeft > 0) {
          const missile = new __WEBPACK_IMPORTED_MODULE_0__missile__["a" /* default */](this.screenWidth);
          this.missiles.push(missile);
          missile.startFalling();
          this.missilesLeft--;
        }
      }
    }, missileInterval);
  }

  endWave() {
    this.stage = __WEBPACK_IMPORTED_MODULE_2__stages__["e" /* WAVE_WON */];
    clearInterval(this.gameLoop);
  }

  pause() {
    this.stage = __WEBPACK_IMPORTED_MODULE_2__stages__["b" /* PAUSED */];
    this.paused = true;
    this.missiles.forEach((missile) => missile.pause());
  }

  unpause() {
    this.stage = __WEBPACK_IMPORTED_MODULE_2__stages__["c" /* PLAYING */];
    this.paused = false;
    this.missiles.forEach((missile) => missile.unpause());
  }

  gameOver() {
    this.stage = __WEBPACK_IMPORTED_MODULE_2__stages__["d" /* WAVE_LOST */];
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
  constructor(screenWidth) {
    this.x = Math.random() * (screenWidth - 50) + 25;
    this.y = -90; // start off the screen
    this.code = Object(__WEBPACK_IMPORTED_MODULE_0__random_words__["a" /* default */])(4);
    this.points = 100;

    this.height = 50;
    this.width = 10;

    this.fallSpeed = 25;
    this.fallInterval = null;

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

  impact() {
    console.log("Missile has impacted");
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

  ],
  6: [

  ]
};

/*
var wordList = [
  "ability","able","aboard","about","above","accept","accident","according",
  "account","accurate","acres","across","act","action","active","activity",
  "actual","actually","add","addition","additional","adjective","adult","adventure",
  "advice","affect","afraid","after","afternoon","again","against","age",
  "ago","agree","ahead","aid","air","airplane","alike","alive",
  "all","allow","almost","alone","along","aloud","alphabet","already",
  "also","although","am","among","amount","ancient","angle","angry",
  "animal","announced","another","answer","ants","any","anybody","anyone",
  "anything","anyway","anywhere","apart","apartment","appearance","apple","applied",
  "appropriate","are","area","arm","army","around","arrange","arrangement",
  "arrive","arrow","art","article","as","aside","ask","asleep",
  "at","ate","atmosphere","atom","atomic","attached","attack","attempt",
  "attention","audience","author","automobile","available","average","avoid","aware",
  "away","baby","back","bad","badly","bag","balance","ball",
  "balloon","band","bank","bar","bare","bark","barn","base",
  "baseball","basic","basis","basket","bat","battle","be","bean",
  "bear","beat","beautiful","beauty","became","because","become","becoming",
  "bee","been","before","began","beginning","begun","behavior","behind",
  "being","believed","bell","belong","below","belt","bend","beneath",
  "bent","beside","best","bet","better","between","beyond","bicycle",
  "bigger","biggest","bill","birds","birth","birthday","bit","bite",
  "black","blank","blanket","blew","blind","block","blood","blow",
  "blue","board","boat","body","bone","book","border","born",
  "both","bottle","bottom","bound","bow","bowl","box","boy",
  "brain","branch","brass","brave","bread","break","breakfast","breath",
  "breathe","breathing","breeze","brick","bridge","brief","bright","bring",
  "broad","broke","broken","brother","brought","brown","brush","buffalo",
  "build","building","built","buried","burn","burst","bus","bush",
  "business","busy","but","butter","buy","by","cabin","cage",
  "cake","call","calm","came","camera","camp","can","canal",
  "cannot","cap","capital","captain","captured","car","carbon","card",
  "care","careful","carefully","carried","carry","case","cast","castle",
  "cat","catch","cattle","caught","cause","cave","cell","cent",
  "center","central","century","certain","certainly","chain","chair","chamber",
  "chance","change","changing","chapter","character","characteristic","charge","chart",
  "check","cheese","chemical","chest","chicken","chief","child","children",
  "choice","choose","chose","chosen","church","circle","circus","citizen",
  "city","class","classroom","claws","clay","clean","clear","clearly",
  "climate","climb","clock","close","closely","closer","cloth","clothes",
  "clothing","cloud","club","coach","coal","coast","coat","coffee",
  "cold","collect","college","colony","color","column","combination","combine",
  "come","comfortable","coming","command","common","community","company","compare",
  "compass","complete","completely","complex","composed","composition","compound","concerned",
  "condition","congress","connected","consider","consist","consonant","constantly","construction",
  "contain","continent","continued","contrast","control","conversation","cook","cookies",
  "cool","copper","copy","corn","corner","correct","correctly","cost",
  "cotton","could","count","country","couple","courage","course","court",
  "cover","cow","cowboy","crack","cream","create","creature","crew",
  "crop","cross","crowd","cry","cup","curious","current","curve",
  "customs","cut","cutting","daily","damage","dance","danger","dangerous",
  "dark","darkness","date","daughter","dawn","day","dead","deal",
  "dear","death","decide","declared","deep","deeply","deer","definition",
  "degree","depend","depth","describe","desert","design","desk","detail",
  "determine","develop","development","diagram","diameter","did","die","differ",
  "difference","different","difficult","difficulty","dig","dinner","direct","direction",
  "directly","dirt","dirty","disappear","discover","discovery","discuss","discussion",
  "disease","dish","distance","distant","divide","division","do","doctor",
  "does","dog","doing","doll","dollar","done","donkey","door",
  "dot","double","doubt","down","dozen","draw","drawn","dream",
  "dress","drew","dried","drink","drive","driven","driver","driving",
  "drop","dropped","drove","dry","duck","due","dug","dull",
  "during","dust","duty","each","eager","ear","earlier","early",
  "earn","earth","easier","easily","east","easy","eat","eaten",
  "edge","education","effect","effort","egg","eight","either","electric",
  "electricity","element","elephant","eleven","else","empty","end","enemy",
  "energy","engine","engineer","enjoy","enough","enter","entire","entirely",
  "environment","equal","equally","equator","equipment","escape","especially","essential",
  "establish","even","evening","event","eventually","ever","every","everybody",
  "everyone","everything","everywhere","evidence","exact","exactly","examine","example",
  "excellent","except","exchange","excited","excitement","exciting","exclaimed","exercise",
  "exist","expect","experience","experiment","explain","explanation","explore","express",
  "expression","extra","eye","face","facing","fact","factor","factory",
  "failed","fair","fairly","fall","fallen","familiar","family","famous",
  "far","farm","farmer","farther","fast","fastened","faster","fat",
  "father","favorite","fear","feathers","feature","fed","feed","feel",
  "feet","fell","fellow","felt","fence","few","fewer","field",
  "fierce","fifteen","fifth","fifty","fight","fighting","figure","fill",
  "film","final","finally","find","fine","finest","finger","finish",
  "fire","fireplace","firm","first","fish","five","fix","flag",
  "flame","flat","flew","flies","flight","floating","floor","flow",
  "flower","fly","fog","folks","follow","food","foot","football",
  "for","force","foreign","forest","forget","forgot","forgotten","form",
  "former","fort","forth","forty","forward","fought","found","four",
  "fourth","fox","frame","free","freedom","frequently","fresh","friend",
  "friendly","frighten","frog","from","front","frozen","fruit","fuel",
  "full","fully","fun","function","funny","fur","furniture","further",
  "future","gain","game","garage","garden","gas","gasoline","gate",
  "gather","gave","general","generally","gentle","gently","get","getting",
  "giant","gift","girl","give","given","giving","glad","glass",
  "globe","go","goes","gold","golden","gone","good","goose",
  "got","government","grabbed","grade","gradually","grain","grandfather","grandmother",
  "graph","grass","gravity","gray","great","greater","greatest","greatly",
  "green","grew","ground","group","grow","grown","growth","guard",
  "guess","guide","gulf","gun","habit","had","hair","half",
  "halfway","hall","hand","handle","handsome","hang","happen","happened",
  "happily","happy","harbor","hard","harder","hardly","has","hat",
  "have","having","hay","he","headed","heading","health","heard",
  "hearing","heart","heat","heavy","height","held","hello","help",
  "helpful","her","herd","here","herself","hidden","hide","high",
  "higher","highest","highway","hill","him","himself","his","history",
  "hit","hold","hole","hollow","home","honor","hope","horn",
  "horse","hospital","hot","hour","house","how","however","huge",
  "human","hundred","hung","hungry","hunt","hunter","hurried","hurry",
  "hurt","husband","ice","idea","identity","if","ill","image",
  "imagine","immediately","importance","important","impossible","improve","in","inch",
  "include","including","income","increase","indeed","independent","indicate","individual",
  "industrial","industry","influence","information","inside","instance","instant","instead",
  "instrument","interest","interior","into","introduced","invented","involved","iron",
  "is","island","it","its","itself","jack","jar","jet",
  "job","join","joined","journey","joy","judge","jump","jungle",
  "just","keep","kept","key","kids","kill","kind","kitchen",
  "knew","knife","know","knowledge","known","label","labor","lack",
  "lady","laid","lake","lamp","land","language","large","larger",
  "largest","last","late","later","laugh","law","lay","layers",
  "lead","leader","leaf","learn","least","leather","leave","leaving",
  "led","left","leg","length","lesson","let","letter","level",
  "library","lie","life","lift","light","like","likely","limited",
  "line","lion","lips","liquid","list","listen","little","live",
  "living","load","local","locate","location","log","lonely","long",
  "longer","look","loose","lose","loss","lost","lot","loud",
  "love","lovely","low","lower","luck","lucky","lunch","lungs",
  "lying","machine","machinery","mad","made","magic","magnet","mail",
  "main","mainly","major","make","making","man","managed","manner",
  "manufacturing","many","map","mark","market","married","mass","massage",
  "master","material","mathematics","matter","may","maybe","me","meal",
  "mean","means","meant","measure","meat","medicine","meet","melted",
  "member","memory","men","mental","merely","met","metal","method",
  "mice","middle","might","mighty","mile","military","milk","mill",
  "mind","mine","minerals","minute","mirror","missing","mission","mistake",
  "mix","mixture","model","modern","molecular","moment","money","monkey",
  "month","mood","moon","more","morning","most","mostly","mother",
  "motion","motor","mountain","mouse","mouth","move","movement","movie",
  "moving","mud","muscle","music","musical","must","my","myself",
  "mysterious","nails","name","nation","national","native","natural","naturally",
  "nature","near","nearby","nearer","nearest","nearly","necessary","neck",
  "needed","needle","needs","negative","neighbor","neighborhood","nervous","nest",
  "never","new","news","newspaper","next","nice","night","nine",
  "no","nobody","nodded","noise","none","noon","nor","north",
  "nose","not","note","noted","nothing","notice","noun","now",
  "number","numeral","nuts","object","observe","obtain","occasionally","occur",
  "ocean","of","off","offer","office","officer","official","oil",
  "old","older","oldest","on","once","one","only","onto",
  "open","operation","opinion","opportunity","opposite","or","orange","orbit",
  "order","ordinary","organization","organized","origin","original","other","ought",
  "our","ourselves","out","outer","outline","outside","over","own",
  "owner","oxygen","pack","package","page","paid","pain","paint",
  "pair","palace","pale","pan","paper","paragraph","parallel","parent",
  "park","part","particles","particular","particularly","partly","parts","party",
  "pass","passage","past","path","pattern","pay","peace","pen",
  "pencil","people","per","percent","perfect","perfectly","perhaps","period",
  "person","personal","pet","phrase","physical","piano","pick","picture",
  "pictured","pie","piece","pig","pile","pilot","pine","pink",
  "pipe","pitch","place","plain","plan","plane","planet","planned",
  "planning","plant","plastic","plate","plates","play","pleasant","please",
  "pleasure","plenty","plural","plus","pocket","poem","poet","poetry",
  "point","pole","police","policeman","political","pond","pony","pool",
  "poor","popular","population","porch","port","position","positive","possible",
  "possibly","post","pot","potatoes","pound","pour","powder","power",
  "powerful","practical","practice","prepare","present","president","press","pressure",
  "pretty","prevent","previous","price","pride","primitive","principal","principle",
  "printed","private","prize","probably","problem","process","produce","product",
  "production","program","progress","promised","proper","properly","property","protection",
  "proud","prove","provide","public","pull","pupil","pure","purple",
  "purpose","push","put","putting","quarter","queen","question","quick",
  "quickly","quiet","quietly","quite","rabbit","race","radio","railroad",
  "rain","raise","ran","ranch","range","rapidly","rate","rather",
  "raw","rays","reach","read","reader","ready","real","realize",
  "rear","reason","recall","receive","recent","recently","recognize","record",
  "red","refer","refused","region","regular","related","relationship","religious",
  "remain","remarkable","remember","remove","repeat","replace","replied","report",
  "represent","require","research","respect","rest","result","return","review",
  "rhyme","rhythm","rice","rich","ride","riding","right","ring",
  "rise","rising","river","road","roar","rock","rocket","rocky",
  "rod","roll","roof","room","root","rope","rose","rough",
  "round","route","row","rubbed","rubber","rule","ruler","run",
  "running","rush","sad","saddle","safe","safety","said","sail",
  "sale","salmon","salt","same","sand","sang","sat","satellites",
  "satisfied","save","saved","saw","say","scale","scared","scene",
  "school","science","scientific","scientist","score","screen","sea","search",
  "season","seat","second","secret","section","see","seed","seeing",
  "seems","seen","seldom","select","selection","sell","send","sense",
  "sent","sentence","separate","series","serious","serve","service","sets",
  "setting","settle","settlers","seven","several","shade","shadow","shake",
  "shaking","shall","shallow","shape","share","sharp","she","sheep",
  "sheet","shelf","shells","shelter","shine","shinning","ship","shirt",
  "shoe","shoot","shop","shore","short","shorter","shot","should",
  "shoulder","shout","show","shown","shut","sick","sides","sight",
  "sign","signal","silence","silent","silk","silly","silver","similar",
  "simple","simplest","simply","since","sing","single","sink","sister",
  "sit","sitting","situation","six","size","skill","skin","sky",
  "slabs","slave","sleep","slept","slide","slight","slightly","slip",
  "slipped","slope","slow","slowly","small","smaller","smallest","smell",
  "smile","smoke","smooth","snake","snow","so","soap","social",
  "society","soft","softly","soil","solar","sold","soldier","solid",
  "solution","solve","some","somebody","somehow","someone","something","sometime",
  "somewhere","son","song","soon","sort","sound","source","south",
  "southern","space","speak","special","species","specific","speech","speed",
  "spell","spend","spent","spider","spin","spirit","spite","split",
  "spoken","sport","spread","spring","square","stage","stairs","stand",
  "standard","star","stared","start","state","statement","station","stay",
  "steady","steam","steel","steep","stems","step","stepped","stick",
  "stiff","still","stock","stomach","stone","stood","stop","stopped",
  "store","storm","story","stove","straight","strange","stranger","straw",
  "stream","street","strength","stretch","strike","string","strip","strong",
  "stronger","struck","structure","struggle","stuck","student","studied","studying",
  "subject","substance","success","successful","such","sudden","suddenly","sugar",
  "suggest","suit","sum","summer","sun","sunlight","supper","supply",
  "support","suppose","sure","surface","surprise","surrounded","swam","sweet",
  "swept","swim","swimming","swing","swung","syllable","symbol","system",
  "table","tail","take","taken","tales","talk","tall","tank",
  "tape","task","taste","taught","tax","tea","teach","teacher",
  "team","tears","teeth","telephone","television","tell","temperature","ten",
  "tent","term","terrible","test","than","thank","that","thee",
  "them","themselves","then","theory","there","therefore","these","they",
  "thick","thin","thing","think","third","thirty","this","those",
  "thou","though","thought","thousand","thread","three","threw","throat",
  "through","throughout","throw","thrown","thumb","thus","thy","tide",
  "tie","tight","tightly","till","time","tin","tiny","tip",
  "tired","title","to","tobacco","today","together","told","tomorrow",
  "tone","tongue","tonight","too","took","tool","top","topic",
  "torn","total","touch","toward","tower","town","toy","trace",
  "track","trade","traffic","trail","train","transportation","trap","travel",
  "treated","tree","triangle","tribe","trick","tried","trip","troops",
  "tropical","trouble","truck","trunk","truth","try","tube","tune",
  "turn","twelve","twenty","twice","two","type","typical","uncle",
  "under","underline","understanding","unhappy","union","unit","universe","unknown",
  "unless","until","unusual","up","upon","upper","upward","us",
  "use","useful","using","usual","usually","valley","valuable","value",
  "vapor","variety","various","vast","vegetable","verb","vertical","very",
  "vessels","victory","view","village","visit","visitor","voice","volume",
  "vote","vowel","voyage","wagon","wait","walk","wall","want",
  "war","warm","warn","was","wash","waste","watch","water",
  "wave","way","we","weak","wealth","wear","weather","week",
  "weigh","weight","welcome","well","went","were","west","western",
  "wet","whale","what","whatever","wheat","wheel","when","whenever",
  "where","wherever","whether","which","while","whispered","whistle","white",
  "who","whole","whom","whose","why","wide","widely","wife",
  "wild","will","willing","win","wind","window","wing","winter",
  "wire","wise","wish","with","within","without","wolf","women",
  "won","wonder","wonderful","wood","wooden","wool","word","wore",
  "work","worker","world","worried","worry","worse","worth","would",
  "wrapped","write","writer","writing","written","wrong","wrote","yard",
  "year","yellow","yes","yesterday","yet","you","young","younger",
  "your","yourself","youth","zero","zoo"
];
*/

const randomWordByLength = (length) => {
  return sample(words[length]);
};

const sample = values => {
  return values[Math.floor(Math.random() * values.length)];
};

/* harmony default export */ __webpack_exports__["a"] = (randomWordByLength);

// function words(options) {
//   function word() {
//     return wordList[randInt(wordList.length)];
//   }
//
//   function randInt(lessThan) {
//     return Math.floor(Math.random() * lessThan);
//   }
//
//   // No arguments = generate one word
//   if (typeof(options) === 'undefined') {
//     return word();
//   }
//
//   // Just a number = return that many words
//   if (typeof(options) === 'number') {
//     options = { exactly: options };
//   }
//
//   // options supported: exactly, min, max, join
//
//   if (options.exactly) {
//     options.min = options.exactly;
//     options.max = options.exactly;
//   }
//   var total = options.min + randInt(options.max + 1 - options.min);
//   var results = [];
//   for (var i = 0; (i < total); i++) {
//     results.push(word());
//   }
//   if (options.join) {
//     results = results.join(options.join);
//   }
//   return results;
// }
//
// module.exports = words;
// // Export the word list as it is often useful
// words.wordList = wordList;


/***/ }),
/* 4 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__stages__ = __webpack_require__(5);


let canvas, ctx, rocket, city, game;
const buildingIcon = '\uf0f7';

const defaultFont = "Exo 2";
const font = (size) => {
  return `${size}px '${defaultFont}'`;
};

function render(g) {
  game = g;
  canvas = document.getElementById('canvas');
  ctx = canvas.getContext('2d');

  rocket = document.getElementById('rocket');
  city = document.getElementById('city');
  window.requestAnimationFrame(renderFrame);
}

function renderFrame() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  renderBackground();

  switch (game.stage) {
    case __WEBPACK_IMPORTED_MODULE_0__stages__["a" /* NOT_STARTED */]:
      renderTitleScreen();
      break;

    case __WEBPACK_IMPORTED_MODULE_0__stages__["c" /* PLAYING */]:
      renderMissiles();
      renderHud();
      break;

    case __WEBPACK_IMPORTED_MODULE_0__stages__["b" /* PAUSED */]:
      renderPauseScreen();
      break;

    case __WEBPACK_IMPORTED_MODULE_0__stages__["d" /* WAVE_LOST */]:
      renderGameOverScreen();
      break;

    case __WEBPACK_IMPORTED_MODULE_0__stages__["e" /* WAVE_WON */]:
      renderWaveCompleteScreen();
      break;
  }

  // Testing only. Show game stage
  // ctx.fillText(game.stage, 20, 20);

  window.requestAnimationFrame(() => renderFrame());
}

const renderOverlay = () => {
  ctx.fillStyle = "rgba(100, 100, 100, 0.7)";
  ctx.fillRect(0, 0, game.screenWidth, game.screenHeight);
};

const renderTitleScreen = () => {
  renderOverlay();

  ctx.fillStyle = "white";
  ctx.textAlign = "center";
  ctx.font = font(50);
  ctx.fillText("Abort Missile!", game.screenWidth / 2, 100);

  ctx.font = font(30);
  ctx.fillText("Instructions", game.screenWidth / 2, 160);

  ctx.font = font(20);
  ctx.fillText("Type the word which appears by the missile", game.screenWidth / 2, 200);
  ctx.fillText("Press ENTER or SPACE to send the word", game.screenWidth / 2, 225);
  ctx.fillText("Press ESCAPE at any time to pause the game", game.screenWidth / 2, 350);
  ctx.fillText("Press any key to begin!", game.screenWidth / 2, game.screenHeight - 100);
};

const renderWaveCompleteScreen = () => {
  renderOverlay();

  ctx.fillStyle = "white";
  ctx.textAlign = "center";
  ctx.font = font(50);
  ctx.fillText(`Wave ${game.wave} Complete!`, game.screenWidth / 2, 100);

  ctx.font = font(20);
  ctx.fillText("Press any key to continue", game.screenWidth / 2, 250);
};

const renderPauseScreen = () => {
  renderOverlay();

  ctx.fillStyle = "white";
  ctx.textAlign = "center";
  ctx.font = font(50);
  ctx.fillText("Game Paused", game.screenWidth / 2, 100);

  ctx.font = font(30);
  ctx.fillText("Instructions", game.screenWidth / 2, 160);

  ctx.font = font(20);
  ctx.fillText("Type the word which appears by the missile", game.screenWidth / 2, 200);
  ctx.fillText("Press ENTER or SPACE to send the word", game.screenWidth / 2, 225);
  ctx.fillText("Press any key to resume the game", game.screenWidth / 2, game.screenHeight - 100);
};

const renderGameOverScreen = () => {
  renderOverlay();

  ctx.fillStyle = "white";
  ctx.textAlign = "center";
  ctx.font = font(50);
  ctx.fillText("Game Over", game.screenWidth / 2, 100);

  ctx.font = font(30);
  ctx.fillText("Final Score: " + game.score, game.screenWidth / 2, 160);
  ctx.fillText("Wave: " + game.wave, game.screenWidth / 2, 200);

  ctx.font = font(20);
  ctx.fillText("Press any key to play again", game.screenWidth / 2, 250);
};

const renderMissiles = () => {
  game.missiles.forEach((m) => {
    ctx.drawImage(rocket, m.x - 10, m.y - 35);

    ctx.fillStyle = "black";
    ctx.font = font(20);
    ctx.textAlign = "center";
    ctx.fillText(m.code, m.x, m.y + m.height + 18);

    if (m.didImpact(canvas.height)) {
      game.impact(m);
    }
  });
};

const renderBackground = () => {
  ctx.drawImage(city, 0, 0, canvas.width, canvas.height);
};

const renderHud = () => {
  ctx.fillStyle = "black";
  ctx.textAlign = "center";
  ctx.fillText(game.code, game.screenWidth / 2, game.screenHeight - 10);

  ctx.font = font(20);
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
/* harmony export (immutable) */ __webpack_exports__["a"] = NOT_STARTED;

const PLAYING = 1;
/* harmony export (immutable) */ __webpack_exports__["c"] = PLAYING;

const PAUSED = 2;
/* harmony export (immutable) */ __webpack_exports__["b"] = PAUSED;

const WAVE_WON = 3;
/* harmony export (immutable) */ __webpack_exports__["e"] = WAVE_WON;

const WAVE_LOST = 4;
/* harmony export (immutable) */ __webpack_exports__["d"] = WAVE_LOST;



/***/ })
/******/ ]);
//# sourceMappingURL=bundle.js.map