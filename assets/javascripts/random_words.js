// Word list taken from random-words by Punkave
// https://github.com/punkave/random-words
// Reorganized by me into the following format

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

export default randomWordByLength;
