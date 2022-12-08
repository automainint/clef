/* eslint-disable */

/*
 *
 *
 *    CONSTANTS
 *
 *
 */

/*  Words for random song name generation.
 */

const NOUNS = [
"people", "history", "way", "art", "world", "information", "map", "two", "family", "government", "health", "system", "computer", "meat", "year", "thanks", "music", "person", "reading", "method", 
"data", "food", "understanding", "theory", "law", "bird", "literature", "problem", "software", "control", "knowledge", "power", "ability", "economics", "love", "internet", "television", "science", 
"library", "nature", "fact", "product", "idea", "temperature", "investment", "area", "society", "activity", "story", "industry", "media", "thing", "oven", "community", "definition", "safety", 
"quality", "development", "language", "management", "player", "variety", "video", "week", "security", "country", "exam", "movie", "organization", "equipment", "physics", "analysis", "policy", 
"series", "thought", "basis", "boyfriend", "direction", "strategy", "technology", "army", "camera", "freedom", "paper", "environment", "child", "instance", "month", "truth", "marketing", "university", 
"writing", "article", "department", "difference", "goal", "news", "audience", "fishing", "growth", "income", "marriage", "user", "combination", "failure", "meaning", "medicine", "philosophy", 
"teacher", "communication", "night", "chemistry", "disease", "disk", "energy", "nation", "road", "role", "soup", "advertising", "location", "success", "addition", "apartment", "education", "math", 
"moment", "painting", "politics", "attention", "decision", "event", "property", "shopping", "student", "wood", "competition", "distribution", "entertainment", "office", "population", "president", 
"unit", "category", "cigarette", "context", "introduction", "opportunity", "performance", "driver", "flight", "length", "magazine", "newspaper", "relationship", "teaching", "cell", "dealer", 
"finding", "lake", "member", "message", "phone", "scene", "appearance", "association", "concept", "customer", "death", "discussion", "housing", "inflation", "insurance", "mood", "woman", "advice", 
"blood", "effort", "expression", "importance", "opinion", "payment", "reality", "responsibility", "situation", "skill", "statement", "wealth", "application", "city", "county", "depth", "estate", 
"foundation", "grandmother", "heart", "perspective", "photo", "recipe", "studio", "topic", "collection", "depression", "imagination", "passion", "percentage", "resource", "setting", "ad", "agency", 
"college", "connection", "criticism", "debt", "description", "memory", "patience", "secretary", "solution", "administration", "aspect", "attitude", "director", "personality", "psychology", 
"recommendation", "response", "selection", "storage", "version", "alcohol", "argument", "complaint", "contract", "emphasis", "highway", "loss", "membership", "possession", "preparation", "steak", 
"union", "agreement", "cancer", "currency", "employment", "engineering", "entry", "interaction", "mixture", "preference", "region", "republic", "tradition", "virus", "actor", "classroom", "delivery", 
"device", "difficulty", "drama", "election", "engine", "football", "guidance", "hotel", "owner", "priority", "protection", "suggestion", "tension", "variation", "anxiety", "atmosphere", "awareness", 
"bath", "bread", "candidate", "climate", "comparison", "confusion", "construction", "elevator", "emotion", "employee", "employer", "guest", "height", "leadership", "mall", "manager", "operation", 
"recording", "sample", "transportation", "charity", "cousin", "disaster", "editor", "efficiency", "excitement", "extent", "feedback", "guitar", "homework", "leader", "mom", "outcome", "permission", 
"presentation", "promotion", "reflection", "refrigerator", "resolution", "revenue", "session", "singer", "tennis", "basket", "bonus", "cabinet", "childhood", "church", "clothes", "coffee", "dinner", 
"drawing", "hair", "hearing", "initiative", "judgment", "lab", "measurement", "mode", "mud", "orange", "poetry", "police", "possibility", "procedure", "queen", "ratio", "relation", "restaurant", 
"satisfaction", "sector", "signature", "significance", "song", "tooth", "town", "vehicle", "volume", "wife", "accident", "airport", "appointment", "arrival", "assumption", "baseball", "chapter", 
"committee", "conversation", "database", "enthusiasm", "error", "explanation", "farmer", "gate", "girl", "hall", "historian", "hospital", "injury", "instruction", "maintenance", "manufacturer", 
"meal", "perception", "pie", "poem", "presence", "proposal", "reception", "replacement", "revolution", "river", "son", "speech", "tea", "village", "warning", "winner", "worker", "writer", 
"assistance", "breath", "buyer", "chest", "chocolate", "conclusion", "contribution", "cookie", "courage", "dad", "desk", "drawer", "establishment", "examination", "garbage", "grocery", "honey", 
"impression", "improvement", "independence", "insect", "inspection", "inspector", "king", "ladder", "menu", "penalty", "piano", "potato", "profession", "professor", "quantity", "reaction", 
"requirement", "salad", "sister", "supermarket", "tongue", "weakness", "wedding", "affair", "ambition", "analyst", "apple", "assignment", "assistant", "bathroom", "bedroom", "beer", "birthday", 
"celebration", "championship", "cheek", "client", "consequence", "departure", "diamond", "dirt", "ear", "fortune", "friendship", "funeral", "gene", "girlfriend", "hat", "indication", "intention", 
"lady", "midnight", "negotiation", "obligation", "passenger", "pizza", "platform", "poet", "pollution", "recognition", "reputation", "shirt", "sir", "speaker", "stranger", "surgery", "sympathy", 
"tale", "throat", "trainer", "uncle", "youth", "time", "work", "film", "water", "money", "example", "while", "business", "study", "game", "life", "form", "air", "day", "place", "number", "part", 
"field", "fish", "back", "process", "heat", "hand", "experience", "job", "book", "end", "point", "type", "home", "economy", "value", "body", "market", "guide", "interest", "state", "radio", "course", 
"company", "price", "size", "card", "list", "mind", "trade", "line", "care", "group", "risk", "word", "fat", "force", "key", "light", "training", "name", "school", "top", "amount", "level", "order", 
"practice", "research", "sense", "service", "piece", "web", "boss", "sport", "fun", "house", "page", "term", "test", "answer", "sound", "focus", "matter", "kind", "soil", "board", "oil", "picture", 
"access", "garden", "range", "rate", "reason", "future", "site", "demand", "exercise", "image", "case", "cause", "coast", "action", "age", "bad", "boat", "record", "result", "section", "building", 
"mouse", "cash", "class", "nothing", "period", "plan", "store", "tax", "side", "subject", "space", "rule", "stock", "weather", "chance", "figure", "man", "model", "source", "beginning", "earth", 
"program", "chicken", "design", "feature", "head", "material", "purpose", "question", "rock", "salt", "act", "birth", "car", "dog", "object", "scale", "sun", "note", "profit", "rent", "speed", 
"style", "war", "bank", "craft", "half", "inside", "outside", "standard", "bus", "exchange", "eye", "fire", "position", "pressure", "stress", "advantage", "benefit", "box", "frame", "issue", "step", 
"cycle", "face", "item", "metal", "paint", "review", "room", "screen", "structure", "view", "account", "ball", "discipline", "medium", "share", "balance", "bit", "black", "bottom", "choice", "gift", 
"impact", "machine", "shape", "tool", "wind", "address", "average", "career", "culture", "morning", "pot", "sign", "table", "task", "condition", "contact", "credit", "egg", "hope", "ice", "network", 
"north", "square", "attempt", "date", "effect", "link", "post", "star", "voice", "capital", "challenge", "friend", "self", "shot", "brush", "couple", "debate", "exit", "front", "function", "lack", 
"living", "plant", "plastic", "spot", "summer", "taste", "theme", "track", "wing", "brain", "button", "click", "desire", "foot", "gas", "influence", "notice", "rain", "wall", "base", "damage", 
"distance", "feeling", "pair", "savings", "staff", "sugar", "target", "text", "animal", "author", "budget", "discount", "file", "ground", "lesson", "minute", "officer", "phase", "reference", 
"register", "sky", "stage", "stick", "title", "trouble", "bowl", "bridge", "campaign", "character", "club", "edge", "evidence", "fan", "letter", "lock", "maximum", "novel", "option", "pack", "park", 
"plenty", "quarter", "skin", "sort", "weight", "baby", "background", "carry", "dish", "factor", "fruit", "glass", "joint", "master", "muscle", "red", "strength", "traffic", "trip", "vegetable", 
"appeal", "chart", "gear", "ideal", "kitchen", "land", "log", "mother", "net", "party", "principle", "relative", "sale", "season", "signal", "spirit", "street", "tree", "wave", "belt", "bench", 
"commission", "copy", "drop", "minimum", "path", "progress", "project", "sea", "south", "status", "stuff", "ticket", "tour", "angle", "blue", "breakfast", "confidence", "daughter", "degree", "doctor", 
"dot", "dream", "duty", "essay", "father", "fee", "finance", "hour", "juice", "limit", "luck", "milk", "mouth", "peace", "pipe", "seat", "stable", "storm", "substance", "team", "trick", "afternoon", 
"bat", "beach", "blank", "catch", "chain", "consideration", "cream", "crew", "detail", "gold", "interview", "kid", "mark", "match", "mission", "pain", "pleasure", "score", "screw", "sex", "shop", 
"shower", "suit", "tone", "window", "agent", "band", "block", "bone", "calendar", "cap", "coat", "contest", "corner", "court", "cup", "district", "door", "east", "finger", "garage", "guarantee", 
"hole", "hook", "implement", "layer", "lecture", "lie", "manner", "meeting", "nose", "parking", "partner", "profile", "respect", "rice", "routine", "schedule", "swimming", "telephone", "tip", 
"winter", "airline", "bag", "battle", "bed", "bill", "bother", "cake", "code", "curve", "designer", "dimension", "dress", "ease", "emergency", "evening", "extension", "farm", "fight", "gap", "grade", 
"holiday", "horror", "horse", "host", "husband", "loan", "mistake", "mountain", "nail", "noise", "occasion", "package", "patient", "pause", "phrase", "proof", "race", "relief", "sand", "sentence", 
"shoulder", "smoke", "stomach", "string", "tourist", "towel", "vacation", "west", "wheel", "wine", "arm", "aside", "associate", "bet", "blow", "border", "branch", "breast", "brother", "buddy", 
"bunch", "chip", "coach", "cross", "document", "draft", "dust", "expert", "floor", "god", "golf", "habit", "iron", "judge", "knife", "landscape", "league", "mail", "mess", "native", "opening", 
"parent", "pattern", "pin", "pool", "pound", "request", "salary", "shame", "shelter", "shoe", "silver", "tackle", "tank", "trust", "assist", "bake", "bar", "bell", "bike", "blame", "boy", "brick", 
"chair", "closet", "clue", "collar", "comment", "conference", "devil", "diet", "fear", "fuel", "glove", "jacket", "lunch", "monitor", "mortgage", "nurse", "pace", "panic", "peak", "plane", "reward", 
"row", "sandwich", "shock", "spite", "spray", "surprise", "till", "transition", "weekend", "welcome", "yard", "alarm", "bend", "bicycle", "bite", "blind", "bottle", "cable", "candle", "clerk", 
"cloud", "concert", "counter", "flower", "grandfather", "harm", "knee", "lawyer", "leather", "load", "mirror", "neck", "pension", "plate", "purple", "ruin", "ship", "skirt", "slice", "snow", 
"specialist", "stroke", "switch", "trash", "tune", "zone", "anger", "award", "bid", "bitter", "boot", "bug", "camp", "candy", "carpet", "cat", "champion", "channel", "clock", "comfort", "cow", 
"crack", "engineer", "entrance", "fault", "grass", "guy", "hell", "highlight", "incident", "island", "joke", "jury", "leg", "lip", "mate", "motor", "nerve", "passage", "pen", "pride", "priest", 
"prize", "promise", "resident", "resort", "ring", "roof", "rope", "sail", "scheme", "script", "sock", "station", "toe", "tower", "truck", "witness", "a", "you", "it", "can", "will", "if", "one", 
"many", "most", "other", "use", "make", "good", "look", "help", "go", "great", "being", "few", "might", "still", "public", "read", "keep", "start", "give", "human", "local", "general", "she", 
"specific", "long", "play", "feel", "high", "tonight", "put", "common", "set", "change", "simple", "past", "big", "possible", "particular", "today", "major", "personal", "current", "national", "cut", 
"natural", "physical", "show", "try", "check", "second", "call", "move", "pay", "let", "increase", "single", "individual", "turn", "ask", "buy", "guard", "hold", "main", "offer", "potential", 
"professional", "international", "travel", "cook", "alternative", "following", "special", "working", "whole", "dance", "excuse", "cold", "commercial", "low", "purchase", "deal", "primary", "worth", 
"fall", "necessary", "positive", "produce", "search", "present", "spend", "talk", "creative", "tell", "cost", "drive", "green", "support", "glad", "remove", "return", "run", "complex", "due", 
"effective", "middle", "regular", "reserve", "independent", "leave", "original", "reach", "rest", "serve", "watch", "beautiful", "charge", "active", "break", "negative", "safe", "stay", "visit", 
"visual", "affect", "cover", "report", "rise", "walk", "white", "beyond", "junior", "pick", "unique", "anything", "classic", "final", "lift", "mix", "private", "stop", "teach", "western", "concern", 
"familiar", "fly", "official", "broad", "comfortable", "gain", "maybe", "rich", "save", "stand", "young", "fail", "heavy", "hello", "lead", "listen", "valuable", "worry", "handle", "leading", "meet", 
"release", "sell", "finish", "normal", "press", "ride", "secret", "spread", "spring", "tough", "wait", "brown", "deep", "display", "flow", "hit", "objective", "shoot", "touch", "cancel", "chemical", 
"cry", "dump", "extreme", "push", "conflict", "eat", "fill", "formal", "jump", "kick", "opposite", "pass", "pitch", "remote", "total", "treat", "vast", "abuse", "beat", "burn", "deposit", "print", 
"raise", "sleep", "somewhere", "advance", "anywhere", "consist", "dark", "double", "draw", "equal", "fix", "hire", "internal", "join", "kill", "sensitive", "tap", "win", "attack", "claim", "constant", 
"drag", "drink", "guess", "minor", "pull", "raw", "soft", "solid", "wear", "weird", "wonder", "annual", "count", "dead", "doubt", "feed", "forever", "impress", "nobody", "repeat", "round", "sing", 
"slide", "strip", "whereas", "wish", "combine", "command", "dig", "divide", "equivalent", "hang", "hunt", "initial", "march", "mention", "smell", "spiritual", "survey", "tie", "adult", "brief", 
"crazy", "escape", "gather", "hate", "prior", "repair", "rough", "sad", "scratch", "sick", "strike", "employ", "external", "hurt", "illegal", "laugh", "lay", "mobile", "nasty", "ordinary", "respond", 
"royal", "senior", "split", "strain", "struggle", "swim", "train", "upper", "wash", "yellow", "convert", "crash", "dependent", "fold", "funny", "grab", "hide", "miss", "permit", "quote", "recover", 
"resolve", "roll", "sink", "slip", "spare", "suspect", "sweet", "swing", "twist", "upstairs", "usual", "abroad", "brave", "calm", "concentrate", "estimate", "grand", "male", "mine", "prompt", "quiet", 
"refuse", "regret", "reveal", "rush", "shake", "shift", "shine", "steal", "suck", "surround", "anybody", "bear", "brilliant", "dare", "dear", "delay", "drunk", "female", "hurry", "inevitable", 
"invite", "kiss", "neat", "pop", "punch", "quit", "reply", "representative", "resist", "rip", "rub", "silly", "smile", "spell", "stretch", "stupid", "tear", "temporary", "tomorrow", "wake", "wrap", 
"yesterday" ];

const ADJECTIVES = [
"abandoned", "abdominal", "abhorrent", "abiding", "abject", "able", "able-bodied", "abnormal", "abounding", "abrasive", "abrupt", "absent", "absentminded", "absolute", "absorbed", "absorbing", 
"abstracted", "absurd", "abundant", "abusive", "abysmal", "academic", "acceptable", "accepting", "accessible", "accidental", "acclaimed", "accommodating", "accompanying", "accountable", "accurate", 
"accusative", "accused", "accusing", "acerbic", "achievable", "aching", "acid", "acidic", "acknowledged", "acoustic", "acrid", "acrimonious", "acrobatic", "actionable", "active", "actual", "ad", 
"adamant", "adaptable", "adaptive", "addicted", "addictive", "additional", "adept", "adequate", "adhesive", "adjacent", "adjoining", "adjustable", "administrative", "admirable", "admired", "admiring", 
"adopted", "adoptive", "adorable", "adored", "adoring", "adrenalized", "adroit", "adult", "advanced", "advantageous", "adventurous", "adversarial", "advisable", "aerial", "affable", "affected", 
"affectionate", "affirmative", "affordable", "afraid", "afternoon", "ageless", "aggravated", "aggravating", "aggressive", "agitated", "agonizing", "agrarian", "agreeable", "aimless", "airline", 
"airsick", "ajar", "alarmed", "alarming", "alert", "algebraic", "alien", "alienated", "alike", "alive", "all", "all-around", "alleged", "allowable", "all-purpose", "all-too-common", "alluring", 
"allusive", "alone", "aloof", "alterable", "alternating", "alternative", "amazed", "amazing", "ambiguous", "ambitious", "ambulant", "ambulatory", "amiable", "amicable", "amphibian", "amused", 
"amusing", "ancient", "anecdotal", "anemic", "angelic", "angered", "angry", "angular", "animal", "animated", "annoyed", "annoying", "annual", "anonymous", "another", "antagonistic", "anticipated", 
"anticlimactic", "anticorrosive", "antiquated", "antiseptic", "antisocial", "antsy", "anxious", "any", "apathetic", "apologetic", "apologizing", "appalling", "appealing", "appetizing", "applauding", 
"applicable", "applicative", "appreciative", "apprehensive", "approachable", "approaching", "appropriate", "approving", "approximate", "aquatic", "architectural", "ardent", "arduous", "arguable", 
"argumentative", "arid", "aristocratic", "aromatic", "arresting", "arrogant", "artful", "artificial", "artistic", "artless", "ashamed", "aspiring", "assertive", "assignable", "assorted", "assumable", 
"assured", "assuring", "astonished", "astonishing", "astounded", "astounding", "astringent", "astronomical", "astute", "asymmetrical", "athletic", "atomic", "atrocious", "attachable", "attainable", 
"attentive", "attractive", "attributable", "atypical", "audacious", "auspicious", "authentic", "authoritarian", "authoritative", "autobiographic", "autographed", "automatic", "autonomous", 
"available", "avant-garde", "avenging", "average", "avian", "avid", "avoidable", "awake", "awakening", "aware", "away", "awesome", "awful", "awkward", "axiomatic", "babbling", "baby", "background", 
"backhanded", "bacterial", "bad", "bad-tempered", "baffled", "baffling", "bald", "balding", "balmy", "bandaged", "banging", "bankable", "banned", "bantering", "barbaric", "barbarous", "barbequed", 
"barefooted", "barking", "barren", "bashful", "basic", "battered", "batty", "bawling", "beady", "beaming", "bearable", "beautiful", "beckoning", "bedazzled", "bedazzling", "beefy", "beeping", 
"befitting", "befuddled", "beginning", "belching", "believable", "bellicose", "belligerent", "bellowing", "bendable", "beneficial", "benevolent", "benign", "bent", "berserk", "best", "betrayed", 
"better", "better", "better-late-than-never", "bewildered", "bewildering", "bewitched", "bewitching", "biased", "biblical", "big", "big-city", "bigger", "biggest", "big-headed", "bighearted", 
"bigoted", "bilingual", "billable", "billowy", "binary", "binding", "bioactive", "biodegradable", "biographical", "bite-sized", "biting", "bitter", "bizarre", "black", "black-and-blue", "blamable", 
"blameless", "bland", "blank", "blaring", "blasphemous", "blatant", "blazing", "bleached", "bleak", "bleary", "bleary-eyed", "blessed", "blind", "blindfolded", "blinding", "blissful", "blistering", 
"bloated", "blonde", "bloodied", "blood-red", "bloodthirsty", "bloody", "blooming", "blossoming", "blue", "blundering", "blunt", "blurred", "blurry", "blushing", "boastful", "bodacious", "bohemian", 
"boiling", "boisterous", "bold", "bookish", "booming", "boorish", "bordering", "bored", "boring", "born", "bossy", "both", "bothered", "bouncing", "bouncy", "boundless", "bountiful", "boyish", 
"braided", "brainless", "brainy", "brash", "brassy", "brave", "brawny", "brazen", "breakable", "breathable", "breathless", "breathtaking", "breezy", "bribable", "brick", "brief", "bright", 
"bright-eyed", "bright-red", "brilliant", "briny", "brisk", "bristly", "broad", "broken", "broken-hearted", "bronchial", "bronze", "bronzed", "brooding", "brown", "bruised", "brunette", "brutal", 
"brutish", "bubbly", "budget", "built-in", "bulky", "bumpy", "bungling", "buoyant", "bureaucratic", "burly", "burnable", "burning", "bushy", "busiest", "business", "bustling", "busy", "buzzing", 
"cackling", "caged", "cagey", "calculable", "calculated", "calculating", "callous", "calm", "calming", "camouflaged", "cancelled", "cancerous", "candid", "cantankerous", "capable", "capricious", 
"captivated", "captivating", "captive", "carefree", "careful", "careless", "caring", "carnivorous", "carpeted", "carsick", "casual", "catastrophic", "catatonic", "catchable", "caustic", "cautious", 
"cavalier", "cavernous", "ceaseless", "celebrated", "celestial", "centered", "central", "cerebral", "ceremonial", "certain", "certifiable", "certified", "challenged", "challenging", "chance", 
"changeable", "changing", "chanting", "charging", "charismatic", "charitable", "charmed", "charming", "chattering", "chatting", "chatty", "chauvinistic", "cheap", "cheapest", "cheeky", "cheerful", 
"cheering", "cheerless", "cheery", "chemical", "chewable", "chewy", "chic", "chicken", "chief", "childish", "childlike", "chilling", "chilly", "chivalrous", "choice", "choking", "choppy", 
"chronological", "chubby", "chuckling", "chunky", "cinematic", "circling", "circular", "circumstantial", "civil", "civilian", "civilized", "clammy", "clamoring", "clandestine", "clanging", "clapping", 
"clashing", "classic", "classical", "classifiable", "classified", "classy", "clean", "cleanable", "clear", "cleared", "clearheaded", "clever", "climatic", "climbable", "clinging", "clingy", 
"clinical", "cliquish", "clogged", "cloistered", "close", "closeable", "closed", "close-minded", "cloudless", "cloudy", "clownish", "clueless", "clumsy", "cluttered", "coachable", "coarse", 
"cockamamie", "cocky", "codified", "coercive", "cognitive", "coherent", "cohesive", "coincidental", "cold", "coldhearted", "collaborative", "collapsed", "collapsing", "collectable", "collegial", 
"colloquial", "colonial", "colorful", "colorless", "colossal", "combative", "combined", "comfortable", "comforted", "comforting", "comical", "commanding", "commemorative", "commendable", "commercial", 
"committed", "common", "communal", "communicable", "communicative", "communist", "compact", "comparable", "comparative", "compassionate", "compelling", "competent", "competitive", "complacent", 
"complaining", "complete", "completed", "complex", "compliant", "complicated", "complimentary", "compound", "comprehensive", "compulsive", "compulsory", "computer", "computerized", "concealable", 
"concealed", "conceited", "conceivable", "concerned", "concerning", "concerted", "concise", "concurrent", "condemned", "condensed", "condescending", "conditional", "confident", "confidential", 
"confirmable", "confirmed", "conflicted", "conflicting", "conformable", "confounded", "confused", "confusing", "congenial", "congested", "congressional", "congruent", "congruous", "connectable", 
"connected", "connecting", "connective", "conscientious", "conscious", "consecutive", "consensual", "consenting", "conservative", "considerable", "considerate", "consistent", "consoling", 
"conspicuous", "conspiratorial", "constant", "constitutional", "constrictive", "constructive", "consumable", "consummate", "contagious", "containable", "contemplative", "contemporary", "contemptible", 
"contemptuous", "content", "contented", "contentious", "contextual", "continual", "continuing", "continuous", "contoured", "contractual", "contradicting", "contradictory", "contrarian", "contrary", 
"contributive", "contrite", "controllable", "controlling", "controversial", "convenient", "conventional", "conversational", "convinced", "convincing", "convoluted", "convulsive", "cooing", "cooked", 
"cool", "coolest", "cooperative", "coordinated", "copious", "coquettish", "cordial", "corner", "cornered", "corny", "corporate", "corpulent", "correct", "correctable", "corrective", "corresponding", 
"corrosive", "corrupt", "corrupting", "corruptive", "cosmetic", "cosmic", "costly", "cottony", "coughing", "courageous", "courteous", "covert", "coveted", "cowardly", "cowering", "coy", "cozy", 
"crabby", "cracked", "crackling", "crafty", "craggy", "crammed", "cramped", "cranky", "crashing", "crass", "craven", "crawling", "crazy", "creaking", "creaky", "creamy", "creative", "credible", 
"creeping", "creepy", "crestfallen", "criminal", "crippled", "crippling", "crisp", "crispy", "critical", "crooked", "cropped", "cross", "crossed", "crotchety", "crowded", "crucial", "crude", "cruel", 
"crumbling", "crumbly", "crumply", "crunchable", "crunching", "crunchy", "crushable", "crushed", "crusty", "crying", "cryptic", "crystalline", "crystallized", "cuddly", "culpable", "cultural", 
"cultured", "cumbersome", "cumulative", "cunning", "curable", "curative", "curious", "curly", "current", "cursed", "curt", "curved", "curvy", "customary", "cut", "cute", "cutting", "cylindrical", 
"cynical", "daffy", "daft", "daily", "dainty", "damaged", "damaging", "damp", "danceable", "dandy", "dangerous", "dapper", "daring", "dark", "darkened", "dashing", "daughterly", "daunting", 
"dawdling", "day", "dazed", "dazzling", "dead", "deadly", "deadpan", "deaf", "deafening", "dear", "debatable", "debonair", "decadent", "decayed", "decaying", "deceitful", "deceivable", "deceiving", 
"decent", "decentralized", "deceptive", "decimated", "decipherable", "decisive", "declining", "decorative", "decorous", "decreasing", "decrepit", "dedicated", "deep", "deepening", "defeated", 
"defective", "defendable", "defenseless", "defensible", "defensive", "defiant", "deficient", "definable", "definitive", "deformed", "degenerative", "degraded", "dehydrated", "dejected", "delectable", 
"deliberate", "deliberative", "delicate", "delicious", "delighted", "delightful", "delinquent", "delirious", "deliverable", "deluded", "demanding", "demented", "democratic", "demonic", 
"demonstrative", "demure", "deniable", "dense", "dependable", "dependent", "deplorable", "deploring", "depraved", "depressed", "depressing", "depressive", "deprived", "deranged", "derivative", 
"derogative", "derogatory", "descriptive", "deserted", "designer", "desirable", "desirous", "desolate", "despairing", "desperate", "despicable", "despised", "despondent", "destroyed", "destructive", 
"detachable", "detached", "detailed", "detectable", "determined", "detestable", "detrimental", "devastated", "devastating", "devious", "devoted", "devout", "dexterous", "diabolical", "diagonal", 
"didactic", "different", "difficult", "diffuse", "digestive", "digital", "dignified", "digressive", "dilapidated", "diligent", "dim", "diminishing", "diminutive", "dingy", "diplomatic", "dire", 
"direct", "direful", "dirty", "disabled", "disadvantaged", "disadvantageous", "disaffected", "disagreeable", "disappearing", "disappointed", "disappointing", "disapproving", "disarming", "disastrous", 
"discarded", "discernable", "disciplined", "disconnected", "discontented", "discordant", "discouraged", "discouraging", "discourteous", "discredited", "discreet", "discriminating", "discriminatory", 
"discussable", "disdainful", "diseased", "disenchanted", "disgraceful", "disgruntled", "disgusted", "disgusting", "disheartened", "disheartening", "dishonest", "dishonorable", "disillusioned", 
"disinclined", "disingenuous", "disinterested", "disjointed", "dislikeable", "disliked", "disloyal", "dismal", "dismissive", "disobedient", "disorderly", "disorganized", "disparaging", "disparate", 
"dispassionate", "dispensable", "displaced", "displeased", "displeasing", "disposable", "disproportionate", "disproved", "disputable", "disputatious", "disputed", "disreputable", "disrespectful", 
"disruptive", "dissatisfied", "dissimilar", "dissolvable", "dissolving", "dissonant", "dissuasive", "distant", "distasteful", "distinct", "distinctive", "distinguished", "distracted", "distracting", 
"distraught", "distressed", "distressing", "distrustful", "disturbed", "disturbing", "divergent", "diverging", "diverse", "diversified", "divided", "divine", "divisive", "dizzy", "dizzying", "doable", 
"documentary", "dogged", "doggish", "dogmatic", "doleful", "dollish", "domed", "domestic", "dominant", "domineering", "dorsal", "doting", "double", "doubtful", "doubting", "dovish", "dowdy", "down", 
"down-and-out", "downhearted", "downloadable", "downtown", "downward", "dozing", "drab", "drained", "dramatic", "drastic", "dreaded", "dreadful", "dreaming", "dreamy", "dreary", "drenched", "dress", 
"dressy", "dried", "dripping", "drivable", "driven", "droll", "drooping", "droopy", "drowsy", "drunk", "dry", "dual", "dubious", "due", "dulcet", "dull", "duplicitous", "durable", "dusty", "dutiful", 
"dwarfish", "dwindling", "dynamic", "dysfunctional", "each", "eager", "early", "earnest", "ear-piercing", "ear-splitting", "earthshaking", "earthy", "east", "eastern", "easy", "eatable", "eccentric", 
"echoing", "ecological", "economic", "economical", "economy", "ecstatic", "edgy", "editable", "educated", "educational", "eerie", "effective", "effervescent", "efficacious", "efficient", "effortless", 
"effusive", "egalitarian", "egocentric", "egomaniacal", "egotistical", "eight", "eighth", "either", "elaborate", "elastic", "elated", "elderly", "electric", "electrical", "electrifying", "electronic", 
"elegant", "elementary", "elevated", "elfish", "eligible", "elite", "eloquent", "elusive", "emaciated", "embarrassed", "embarrassing", "embattled", "embittered", "emblematic", "emboldened", 
"embroiled", "emergency", "eminent", "emotional", "emotionless", "empirical", "empty", "enamored", "enchanted", "enchanting", "encouraged", "encouraging", "encrusted", "endangered", "endearing", 
"endemic", "endless", "endurable", "enduring", "energetic", "energizing", "enforceable", "engaging", "engrossing", "enhanced", "enigmatic", "enjoyable", "enlarged", "enlightened", "enormous", 
"enough", "enraged", "ensuing", "enterprising", "entertained", "entertaining", "enthralled", "enthused", "enthusiastic", "enticing", "entire", "entranced", "entrepreneurial", "enumerable", "enviable", 
"envious", "environmental", "episodic", "equable", "equal", "equidistant", "equitable", "equivalent", "erasable", "erect", "eroding", "errant", "erratic", "erroneous", "eruptive", "escalating", 
"esoteric", "essential", "established", "estimated", "estranged", "eternal", "ethereal", "ethical", "ethnic", "euphemistic", "euphoric", "evasive", "even", "evenhanded", "evening", "eventful", 
"eventual", "everlasting", "every", "evil", "evocative", "exacerbating", "exact", "exacting", "exaggerated", "exalted", "exasperated", "exasperating", "excellent", "exceptional", "excessive", 
"exchangeable", "excitable", "excited", "exciting", "exclusive", "excruciating", "excusable", "executable", "exemplary", "exhausted", "exhausting", "exhaustive", "exhilarated", "exhilarating", 
"existing", "exotic", "expandable", "expanded", "expanding", "expansive", "expectant", "expected", "expedient", "expeditious", "expendable", "expensive", "experimental", "expert", "expired", 
"expiring", "explainable", "explicit", "exploding", "exploitative", "exploited", "explosive", "exponential", "exposed", "express", "expressionistic", "expressionless", "expressive", "exquisite", 
"extemporaneous", "extendable", "extended", "extension", "extensive", "exterior", "external", "extra", "extra-large", "extraneous", "extraordinary", "extra-small", "extravagant", "extreme", 
"exuberant", "eye-popping", "fabled", "fabulous", "facetious", "facial", "factitious", "factual", "faded", "fading", "failed", "faint", "fainthearted", "fair", "faithful", "faithless", "fallacious", 
"false", "falsified", "faltering", "familiar", "famished", "famous", "fanatical", "fanciful", "fancy", "fantastic", "far", "faraway", "farcical", "far-flung", "farsighted", "fascinated", 
"fascinating", "fascistic", "fashionable", "fast", "fastest", "fastidious", "fast-moving", "fat", "fatal", "fateful", "fatherly", "fathomable", "fathomless", "fatigued", "faulty", "favorable", 
"favorite", "fawning", "feared", "fearful", "fearless", "fearsome", "feathered", "feathery", "feckless", "federal", "feeble", "feebleminded", "feeling", "feigned", "felonious", "female", "feminine", 
"fermented", "ferocious", "fertile", "fervent", "fervid", "festive", "fetching", "fetid", "feudal", "feverish", "few", "fewer", "fictional", "fictitious", "fidgeting", "fidgety", "fiendish", "fierce", 
"fiery", "fifth", "filmy", "filtered", "filthy", "final", "financial", "fine", "finicky", "finite", "fireproof", "firm", "first", "fiscal", "fishy", "fit", "fitted", "fitting", "five", "fixable", 
"fixed", "flabby", "flagrant", "flaky", "flamboyant", "flaming", "flammable", "flashy", "flat", "flattened", "flattered", "flattering", "flavored", "flavorful", "flavorless", "flawed", "flawless", 
"fleeting", "flexible", "flickering", "flimsy", "flippant", "flirtatious", "floating", "flooded", "floppy", "floral", "flowering", "flowery", "fluent", "fluffy", "flushed", "fluttering", "flying", 
"foamy", "focused", "foggy", "folded", "following", "fond", "foolhardy", "foolish", "forbidding", "forceful", "foreboding", "foregoing", "foreign", "forensic", "foreseeable", "forged", "forgetful", 
"forgettable", "forgivable", "forgiving", "forgotten", "forked", "formal", "formative", "former", "formidable", "formless", "formulaic", "forthright", "fortuitous", "fortunate", "forward", "foul", 
"foul-smelling", "four", "fourth", "foxy", "fractional", "fractious", "fragile", "fragmented", "fragrant", "frail", "frank", "frantic", "fraternal", "fraudulent", "frayed", "freakish", "freaky", 
"freckled", "free", "freezing", "frequent", "fresh", "fretful", "fried", "friendly", "frightened", "frightening", "frightful", "frigid", "frilly", "frisky", "frivolous", "front", "frosty", "frothy", 
"frowning", "frozen", "frugal", "fruitful", "fruitless", "fruity", "frumpy", "frustrated", "frustrating", "fulfilled", "fulfilling", "full", "fully-grown", "fumbling", "fuming", "fun", "functional", 
"fundamental", "fun-loving", "funniest", "funny", "furious", "furry", "furthest", "furtive", "fussy", "futile", "future", "futuristic", "fuzzy", "gabby", "gainful", "gallant", "galling", "game", 
"gangly", "gaping", "garbled", "gargantuan", "garish", "garrulous", "gaseous", "gasping", "gaudy", "gaunt", "gauzy", "gawky", "general", "generative", "generic", "generous", "genial", "gentle", 
"genuine", "geographic", "geologic", "geometric", "geriatric", "ghastly", "ghostly", "ghoulish", "giant", "giddy", "gifted", "gigantic", "giggling", "gilded", "giving", "glad", "glamorous", "glaring", 
"glass", "glassy", "gleaming", "glib", "glistening", "glittering", "global", "globular", "gloomy", "glorious", "glossy", "glowing", "gluey", "glum", "gluttonous", "gnarly", "gold", "golden", "good", 
"good-looking", "good-natured", "gooey", "goofy", "gorgeous", "graceful", "gracious", "gradual", "grainy", "grand", "grandiose", "graphic", "grateful", "gratified", "gratifying", "grating", "gratis", 
"gratuitous", "gray", "greasy", "great", "greatest", "greedy", "green", "gregarious", "grey", "grieving", "grim", "grimacing", "grimy", "grinding", "grinning", "gripping", "gritty", "grizzled", 
"groaning", "groggy", "groomed", "groovy", "gross", "grotesque", "grouchy", "growling", "grown-up", "grubby", "grueling", "gruesome", "gruff", "grumbling", "grumpy", "guaranteed", "guarded", 
"guiltless", "guilt-ridden", "guilty", "gullible", "gurgling", "gushing", "gushy", "gusty", "gutsy", "habitable", "habitual", "haggard", "hairless", "hairy", "half", "halfhearted", "hallowed", 
"halting", "handsome", "handy", "hanging", "haphazard", "hapless", "happy", "hard", "hard-to-find", "hardworking", "hardy", "harebrained", "harmful", "harmless", "harmonic", "harmonious", "harried", 
"harsh", "hasty", "hated", "hateful", "haughty", "haunting", "hawkish", "hazardous", "hazy", "head", "heady", "healthy", "heartbreaking", "heartbroken", "heartless", "heartrending", "hearty", 
"heated", "heavenly", "heavy", "hectic", "hefty", "heinous", "helpful", "helpless", "her", "heroic", "hesitant", "hideous", "high", "highest", "highfalutin", "high-functioning", "high-maintenance", 
"high-pitched", "high-risk", "hilarious", "his", "hissing", "historical", "hoarse", "hoggish", "holiday", "holistic", "hollow", "home", "homeless", "homely", "homeopathic", "homey", "homogeneous", 
"honest", "honking", "honorable", "hopeful", "hopeless", "horizontal", "hormonal", "horned", "horrendous", "horrible", "horrid", "horrific", "horrified", "horrifying", "hospitable", "hostile", "hot", 
"hot", "hot-blooded", "hotheaded", "hot-shot", "hot-tempered", "hour-long", "house", "howling", "huffy", "huge", "huggable", "hulking", "human", "humanitarian", "humanlike", "humble", "humdrum", 
"humid", "humiliated", "humiliating", "humming", "humongous", "humorless", "humorous", "hungry", "hurried", "hurt", "hurtful", "hushed", "husky", "hydraulic", "hydrothermal", "hygienic", 
"hyper-active", "hyperbolic", "hypercritical", "hyperirritable", "hypersensitive", "hypertensive", "hypnotic", "hypnotizable", "hypothetical", "hysterical", "icky", "iconoclastic", "icy", "icy-cold", 
"ideal", "idealistic", "identical", "identifiable", "idiosyncratic", "idiotic", "idyllic", "ignorable", "ignorant", "ill", "illegal", "illegible", "illegitimate", "ill-equipped", "ill-fated", 
"ill-humored", "illicit", "ill-informed", "illiterate", "illogical", "illuminating", "illusive", "illustrious", "imaginable", "imaginary", "imaginative", "imitative", "immaculate", "immanent", 
"immature", "immeasurable", "immediate", "immense", "immensurable", "imminent", "immobile", "immodest", "immoral", "immortal", "immovable", "impartial", "impassable", "impassioned", "impatient", 
"impeccable", "impenetrable", "imperative", "imperceptible", "imperceptive", "imperfect", "imperial", "imperialistic", "impermeable", "impersonal", "impertinent", "impervious", "impetuous", "impish", 
"implausible", "implicit", "implosive", "impolite", "imponderable", "important", "imported", "imposing", "impossible", "impoverished", "impractical", "imprecise", "impressionable", "impressive", 
"improbable", "improper", "improvable", "improved", "improving", "imprudent", "impulsive", "impure", "inaccessible", "inaccurate", "inactive", "inadequate", "inadmissible", "inadvertent", 
"inadvisable", "inalienable", "inalterable", "inane", "inanimate", "inapplicable", "inappropriate", "inapt", "inarguable", "inarticulate", "inartistic", "inattentive", "inaudible", "inauspicious", 
"incalculable", "incandescent", "incapable", "incessant", "incidental", "inclusive", "incoherent", "incomparable", "incompatible", "incompetent", "incomplete", "incomprehensible", "inconceivable", 
"inconclusive", "incongruent", "incongruous", "inconsequential", "inconsiderable", "inconsiderate", "inconsistent", "inconsolable", "inconspicuous", "incontrovertible", "inconvenient", "incorrect", 
"incorrigible", "incorruptible", "increasing", "incredible", "incredulous", "incremental", "incurable", "indecent", "indecipherable", "indecisive", "indefensible", "indefinable", "indefinite", 
"indelible", "independent", "indescribable", "indestructible", "indeterminable", "indeterminate", "indicative", "indifferent", "indigenous", "indignant", "indirect", "indiscreet", "indiscriminate", 
"indispensable", "indisputable", "indistinct", "individual", "individualistic", "indivisible", "indomitable", "inductive", "indulgent", "industrial", "industrious", "ineffective", "ineffectual", 
"inefficient", "inelegant", "ineloquent", "inequitable", "inert", "inescapable", "inevitable", "inexact", "inexcusable", "inexhaustible", "inexpedient", "inexpensive", "inexplicable", "inexpressible", 
"inexpressive", "inextricable", "infallible", "infamous", "infantile", "infatuated", "infected", "infectious", "inferable", "inferior", "infernal", "infinite", "infinitesimal", "inflamed", 
"inflammable", "inflammatory", "inflatable", "inflated", "inflexible", "influential", "informal", "informative", "informed", "infrequent", "infuriated", "infuriating", "ingenious", "ingenuous", 
"inglorious", "ingratiating", "inhabitable", "inharmonious", "inherent", "inhibited", "inhospitable", "inhuman", "inhumane", "initial", "injudicious", "injured", "injurious", "innate", "inner", 
"innocent", "innocuous", "innovative", "innumerable", "inoffensive", "inoperable", "inoperative", "inopportune", "inordinate", "inorganic", "inquiring", "inquisitive", "insane", "insatiable", 
"inscrutable", "insecure", "insensible", "insensitive", "inseparable", "inside", "insidious", "insightful", "insignificant", "insincere", "insipid", "insistent", "insolent", "inspirational", 
"inspired", "inspiring", "instant", "instantaneous", "instinctive", "instinctual", "institutional", "instructive", "instrumental", "insubordinate", "insufferable", "insufficient", "insulted", 
"insulting", "insurable", "insurmountable", "intangible", "integral", "intellectual", "intelligent", "intelligible", "intended", "intense", "intensive", "intentional", "interactive", 
"interchangeable", "interdepartmental", "interdependent", "interested", "interesting", "interior", "intermediate", "intermittent", "internal", "international", "interpersonal", "interracial", 
"intestinal", "intimate", "intimidating", "intolerable", "intolerant", "intravenous", "intrepid", "intricate", "intrigued", "intriguing", "intrinsic", "introductory", "introspective", "introverted", 
"intrusive", "intuitive", "invalid", "invaluable", "invasive", "inventive", "invigorating", "invincible", "invisible", "invited", "inviting", "involuntary", "involved", "inward", "irascible", "irate", 
"iridescent", "irksome", "iron", "iron-fisted", "ironic", "irrational", "irreconcilable", "irrefutable", "irregular", "irrelative", "irrelevant", "irremovable", "irreparable", "irreplaceable", 
"irrepressible", "irresistible", "irresponsible", "irretrievably", "irreverent", "irreversible", "irrevocable", "irritable", "irritated", "irritating", "isolated", "itchy", "its", "itty-bitty", 
"jabbering", "jaded", "jagged", "jarring", "jaundiced", "jazzy", "jealous", "jeering", "jerky", "jiggling", "jittery", "jobless", "jocular", "joint", "jolly", "jovial", "joyful", "joyless", "joyous", 
"jubilant", "judgmental", "judicious", "juicy", "jumbled", "jumpy", "junior", "just", "justifiable", "juvenile", "kaput", "keen", "key", "kind", "kindhearted", "kindly", "kinesthetic", "kingly", 
"kitchen", "knavish", "knightly", "knobbed", "knobby", "knotty", "knowable", "knowing", "knowledgeable", "known", "labored", "laborious", "lackadaisical", "lacking", "lacy", "lame", "lamentable", 
"languid", "languishing", "lanky", "larcenous", "large", "larger", "largest", "lascivious", "last", "lasting", "late", "latent", "later", "lateral", "latest", "latter", "laudable", "laughable", 
"laughing", "lavish", "lawful", "lawless", "lax", "lazy", "lead", "leading", "lean", "learnable", "learned", "leased", "least", "leather", "leathery", "lecherous", "leering", "left", "left-handed", 
"legal", "legendary", "legible", "legislative", "legitimate", "lengthy", "lenient", "less", "lesser", "lesser-known", "less-qualified", "lethal", "lethargic", "level", "liable", "libelous", "liberal", 
"licensed", "life", "lifeless", "lifelike", "lifelong", "light", "light-blue", "lighthearted", "likable", "likeable", "likely", "like-minded", "lily-livered", "limber", "limited", "limitless", "limp", 
"limping", "linear", "lined", "lingering", "linguistic", "liquid", "listless", "literal", "literary", "literate", "lithe", "lithographic", "litigious", "little", "livable", "live", "lively", "livid", 
"living", "loathsome", "local", "locatable", "locked", "lofty", "logarithmic", "logical", "logistic", "lonely", "long", "longer", "longest", "longing", "long-term", "long-winded", "loose", "lopsided", 
"loquacious", "lordly", "lost", "loud", "lousy", "loutish", "lovable", "loveable", "lovely", "loving", "low", "low-calorie", "low-carb", "lower", "low-fat", "lowly", "low-maintenance", "low-ranking", 
"low-risk", "loyal", "lucent", "lucid", "lucky", "lucrative", "ludicrous", "lukewarm", "lulling", "luminescent", "luminous", "lumpy", "lurid", "luscious", "lush", "lustrous", "luxurious", "lying", 
"lyrical", "macabre", "Machiavellian", "macho", "mad", "maddening", "magenta", "magic", "magical", "magnanimous", "magnetic", "magnificent", "maiden", "main", "maintainable", "majestic", "major", 
"makeable", "makeshift", "maladjusted", "male", "malevolent", "malicious", "malignant", "malleable", "mammoth", "manageable", "managerial", "mandatory", "maneuverable", "mangy", "maniacal", "manic", 
"manicured", "manipulative", "man-made", "manual", "many", "marbled", "marginal", "marked", "marketable", "married", "marvelous", "masked", "massive", "master", "masterful", "matchless", "material", 
"materialistic", "maternal", "mathematical", "matronly", "matted", "mature", "maximum", "meager", "mean", "meandering", "meaningful", "meaningless", "mean-spirited", "measly", "measurable", 
"meat-eating", "meaty", "mechanical", "medical", "medicinal", "meditative", "medium", "medium-rare", "meek", "melancholy", "mellow", "melodic", "melodious", "melodramatic", "melted", "memorable", 
"menacing", "menial", "mental", "merciful", "merciless", "mercurial", "mere", "merry", "messy", "metabolic", "metallic", "metaphoric", "meteoric", "meticulous", "microscopic", "microwaveable", 
"middle", "middle-class", "midweek", "mighty", "mild", "militant", "militaristic", "military", "milky", "mincing", "mind-bending", "mindful", "mindless", "mini", "miniature", "minimal", "minimum", 
"minor", "minute", "miraculous", "mirthful", "miscellaneous", "mischievous", "miscreant", "miserable", "miserly", "misguided", "misleading", "mission", "mistaken", "mistrustful", "mistrusting", 
"misty", "mixed", "mnemonic", "moaning", "mobile", "mocking", "moderate", "modern", "modest", "modified", "modular", "moist", "moldy", "momentary", "momentous", "monetary", "money-grubbing", 
"monopolistic", "monosyllabic", "monotone", "monotonous", "monstrous", "monumental", "moody", "moral", "moralistic", "morbid", "mordant", "more", "moronic", "morose", "mortal", "mortified", "most", 
"mother", "motherly", "motionless", "motivated", "motivating", "motivational", "motor", "mountain", "mountainous", "mournful", "mouthwatering", "movable", "moved", "moving", "much", "muddled", 
"muddy", "muffled", "muggy", "multicultural", "multifaceted", "multipurpose", "multitalented", "mumbled", "mundane", "municipal", "murky", "muscular", "mushy", "musical", "musky", "musty", "mutative", 
"mute", "muted", "mutinous", "muttering", "mutual", "my", "myopic", "mysterious", "mystic", "mystical", "mystified", "mystifying", "mythical", "naive", "nameless", "narcissistic", "narrow", 
"narrow-minded", "nasal", "nasty", "national", "native", "natural", "naughty", "nauseating", "nauseous", "nautical", "navigable", "navy-blue", "near", "nearby", "nearest", "nearsighted", "neat", 
"nebulous", "necessary", "needless", "needy", "nefarious", "negative", "neglected", "neglectful", "negligent", "negligible", "negotiable", "neighborly", "neither", "nerve-racking", "nervous", 
"neurological", "neurotic", "neutral", "new", "newest", "next", "next-door", "nice", "nifty", "nightmarish", "nimble", "nine", "ninth", "nippy", "no", "noble", "nocturnal", "noiseless", "noisy", 
"nominal", "nonabrasive", "nonaggressive", "nonchalant", "noncommittal", "noncompetitive", "nonconsecutive", "nondescript", "nondestructive", "nonexclusive", "nonnegotiable", "nonproductive", 
"nonrefundable", "nonrenewable", "nonresponsive", "nonrestrictive", "nonreturnable", "nonsensical", "nonspecific", "nonstop", "nontransferable", "nonverbal", "nonviolent", "normal", "north", 
"northeast", "northerly", "northwest", "nostalgic", "nosy", "notable", "noticeable", "notorious", "novel", "noxious", "null", "numb", "numberless", "numbing", "numerable", "numeric", "numerous", 
"nutritional", "nutritious", "nutty", "oafish", "obedient", "obeisant", "obese", "objectionable", "objective", "obligatory", "obliging", "oblique", "oblivious", "oblong", "obnoxious", "obscene", 
"obscure", "observable", "observant", "obsessive", "obsolete", "obstinate", "obstructive", "obtainable", "obtrusive", "obtuse", "obvious", "occasional", "occupational", "occupied", "oceanic", "odd", 
"odd-looking", "odiferous", "odious", "odorless", "odorous", "offbeat", "offensive", "offhanded", "official", "officious", "oily", "okay", "old", "older", "oldest", "old-fashioned", "ominous", 
"omniscient", "omnivorous", "one", "one-hour", "onerous", "one-sided", "only", "opaque", "open", "opened", "openhanded", "openhearted", "opening", "open-minded", "operable", "operatic", "operational", 
"operative", "opinionated", "opportune", "opportunistic", "opposable", "opposed", "opposing", "opposite", "oppressive", "optimal", "optimistic", "optional", "opulent", "oral", "orange", "ordinary", 
"organic", "organizational", "original", "ornamental", "ornate", "ornery", "orphaned", "orthopedic", "ossified", "ostentatious", "other", "otherwise", "our", "outer", "outermost", "outgoing", 
"outlandish", "outraged", "outrageous", "outside", "outspoken", "outstanding", "outward", "oval", "overactive", "overaggressive", "overall", "overambitious", "overassertive", "overbearing", 
"overcast", "overcautious", "overconfident", "overcritical", "overcrowded", "overemotional", "overenthusiastic", "overjoyed", "overoptimistic", "overpowering", "overpriced", "overprotective", 
"overqualified", "overrated", "oversensitive", "oversized", "overt", "overwhelmed", "overwhelming", "overworked", "overwrought", "overzealous", "own", "oxymoronic", "padded", "painful", "painless", 
"painstaking", "palatable", "palatial", "pale", "pallid", "palpable", "paltry", "pampered", "panicky", "panoramic", "paradoxical", "parallel", "paranormal", "parasitic", "parched", "pardonable", 
"parental", "parenthetic", "parking", "parsimonious", "partial", "particular", "partisan", "part-time", "party", "passing", "passionate", "passive", "past", "pastoral", "patched", "patchy", 
"patented", "paternal", "paternalistic", "pathetic", "pathological", "patient", "patriotic", "patronizing", "patterned", "payable", "peaceable", "peaceful", "peculiar", "pedantic", "pedestrian", 
"peerless", "peeved", "peevish", "penetrable", "penetrating", "pensive", "peppery", "perceivable", "perceptible", "perceptive", "perceptual", "peremptory", "perennial", "perfect", "perfumed", 
"perilous", "period", "periodic", "peripheral", "perishable", "perky", "permanent", "permeable", "permissible", "permissive", "pernicious", "perpendicular", "perpetual", "perplexed", "perplexing", 
"persevering", "persistent", "personable", "personal", "persuasive", "pert", "pertinent", "perturbed", "perturbing", "pervasive", "perverse", "pessimistic", "petite", "pettish", "petty", "petulant", 
"pharmaceutical", "phenomenal", "philanthropic", "philosophical", "phobic", "phonemic", "phonetic", "phosphorescent", "photographic", "physical", "physiological", "picturesque", "piercing", 
"pigheaded", "pink", "pious", "piquant", "pitch-dark", "pitch-perfect", "piteous", "pithy", "pitiful", "pitiless", "pivotal", "placid", "plaid", "plain", "plane", "planned", "plastic", "platonic", 
"plausible", "playful", "pleading", "pleasant", "pleased", "pleasing", "pleasurable", "plentiful", "pliable", "plodding", "plopping", "plucky", "plump", "pluralistic", "plus", "plush", "pneumatic", 
"poetic", "poignant", "pointless", "poised", "poisonous", "polished", "polite", "political", "polka-dotted", "polluted", "polyunsaturated", "pompous", "ponderous", "poor", "poorer", "poorest", 
"popping", "popular", "populous", "porous", "portable", "portly", "positive", "possessive", "possible", "post", "posthumous", "postoperative", "potable", "potent", "potential", "powdery", "powerful", 
"powerless", "practical", "pragmatic", "praiseworthy", "precarious", "precious", "precipitous", "precise", "precocious", "preconceived", "predicative", "predictable", "predisposed", "predominant", 
"preeminent", "preemptive", "prefabricated", "preferable", "preferential", "pregnant", "prehistoric", "prejudiced", "prejudicial", "preliminary", "premature", "premeditated", "premium", "prenatal", 
"preoccupied", "preoperative", "preparative", "prepared", "preposterous", "prescriptive", "present", "presentable", "presidential", "pressing", "pressurized", "prestigious", "presumable", 
"presumptive", "presumptuous", "pretend", "pretentious", "pretty", "prevalent", "preventable", "preventative", "preventive", "previous", "priceless", "pricey", "prickly", "prim", "primary", 
"primitive", "primordial", "princely", "principal", "principled", "prior", "prissy", "pristine", "private", "prize", "prized", "proactive", "probabilistic", "probable", "problematic", "procedural", 
"prodigious", "productive", "profane", "professed", "professional", "professorial", "proficient", "profitable", "profound", "profuse", "programmable", "progressive", "prohibitive", "prolific", 
"prominent", "promised", "promising", "prompt", "pronounceable", "pronounced", "proof", "proper", "prophetic", "proportional", "proportionate", "proportioned", "prospective", "prosperous", 
"protective", "prototypical", "proud", "proverbial", "provisional", "provocative", "provoking", "proximal", "proximate", "prudent", "prudential", "prying", "psychedelic", "psychiatric", 
"psychological", "psychosomatic", "psychotic", "public", "puckish", "puffy", "pugnacious", "pumped", "punctual", "pungent", "punishable", "punitive", "puny", "pure", "purified", "puritanical", 
"purple", "purported", "purposeful", "purposeless", "purring", "pushy", "pusillanimous", "putrid", "puzzled", "puzzling", "pyrotechnic", "quackish", "quacky", "quaint", "qualified", "qualitative", 
"quality", "quantifiable", "quantitative", "quarrelsome", "queasy", "queenly", "querulous", "questionable", "quick", "quick-acting", "quick-drying", "quickest", "quick-minded", "quick-paced", 
"quick-tempered", "quick-thinking", "quick-witted", "quiet", "quintessential", "quirky", "quivering", "quizzical", "quotable", "rabid", "racial", "racist", "radiant", "radical", "radioactive", 
"ragged", "raging", "rainbow", "rainy", "rakish", "rambling", "rambunctious", "rampageous", "rampant", "rancid", "rancorous", "random", "rank", "rapid", "rapid-fire", "rapturous", "rare", "rascally", 
"rash", "rasping", "raspy", "rational", "ratty", "ravenous", "raving", "ravishing", "raw", "razor-edged", "reactive", "ready", "real", "realistic", "reasonable", "reassured", "reassuring", "rebel", 
"rebellious", "receding", "recent", "receptive", "recessive", "rechargeable", "reciprocal", "reckless", "reclusive", "recognizable", "recognized", "rectangular", "rectifiable", "recurrent", 
"recyclable", "red", "red-blooded", "reddish", "redeemable", "redolent", "redundant", "referential", "refillable", "reflective", "refractive", "refreshing", "refundable", "refurbished", "refutable", 
"regal", "regional", "regretful", "regrettable", "regular", "reigning", "relatable", "relative", "relaxed", "relaxing", "relentless", "relevant", "reliable", "relieved", "religious", "reluctant", 
"remaining", "remarkable", "remedial", "reminiscent", "remorseful", "remorseless", "remote", "removable", "renegotiable", "renewable", "rented", "repairable", "repaired	3231.", "repeated", 
"repentant", "repetitious", "repetitive", "replaceable", "replicable", "reported", "reprehensible", "representative", "repressive", "reproachful", "reproductive", "republican", "repugnant", 
"repulsive", "reputable", "reputed", "rescued", "resealable", "resentful", "reserved", "resident", "residential", "residual", "resilient", "resolute", "resolvable", "resonant", "resounding", 
"resourceful", "respectable", "respectful", "respective", "responsible", "responsive", "rested", "restful", "restless", "restored", "restrained", "restrictive", "retired", "retroactive", 
"retrogressive", "retrospective", "reusable", "revamped", "revealing", "revengeful", "reverent", "reverential", "reverse", "reversible", "reviewable", "reviled", "revisable", "revised", "revocable", 
"revolting", "revolutionary", "rewarding", "rhetorical", "rhythmic", "rich", "richer", "richest", "ridiculing", "ridiculous", "right", "righteous", "rightful", "right-handed", "rigid", "rigorous", 
"ringing", "riotous", "ripe", "rippling", "risky", "ritualistic", "ritzy", "riveting", "roaring", "roasted", "robotic", "robust", "rocketing", "roguish", "romantic", "roomy", "rosy", "rotating", 
"rotten", "rotting", "rotund", "rough", "round", "roundtable", "rousing", "routine", "rowdy", "royal", "ruddy", "rude", "rudimentary", "rueful", "rugged", "ruined", "ruinous", "rumbling", "rumpled", 
"ruptured", "rural", "rusted", "rustic", "rustling", "rusty", "ruthless", "rutted", "saccharin", "sacred", "sacrificial", "sacrilegious", "sad", "saddened", "safe", "saintly", "salacious", "salient", 
"salt", "salted", "salty", "salvageable", "salvaged", "same", "sanctimonious", "sandy", "sane", "sanguine", "sanitary", "sappy", "sarcastic", "sardonic", "sassy", "satin", "satiny", "satiric", 
"satirical", "satisfactory", "satisfied", "satisfying", "saucy", "savage", "savory", "savvy", "scalding", "scaly", "scandalous", "scant", "scanty", "scarce", "scared", "scarred", "scary", "scathing", 
"scattered", "scenic", "scented", "scheduled", "schematic", "scholarly", "scholastic", "scientific", "scintillating", "scorching", "scornful", "scrabbled", "scraggly", "scrappy", "scratched", 
"scratchy", "scrawny", "screaming", "screeching", "scribbled", "scriptural", "scruffy", "scrumptious", "scrupulous", "sculpted", "sculptural", "scummy", "sea", "sealed", "seamless", "searching", 
"searing", "seasick", "seasonable", "seasonal", "secluded", "second", "secondary", "second-hand", "secret", "secretive", "secular", "secure", "secured", "sedate", "seditious", "seductive", "seedy", 
"seeming", "seemly", "seething", "seismic", "select", "selected", "selective", "self-absorbed", "self-aggrandizing", "self-assured", "self-centered", "self-confident", "self-directed", 
"self-disciplined", "self-effacing", "self-indulgent", "self-interested", "selfish", "selfless", "self-reliant", "self-respect", "self-satisfied", "sellable", "semiconscious", "semiofficial", 
"semiprecious", "semiprofessional", "senior", "sensational", "senseless", "sensible", "sensitive", "sensual", "sensuous", "sentimental", "separate", "sequential", "serendipitous", "serene", "serial", 
"serious", "serrated", "serviceable", "seven", "seventh", "several", "severe", "shabbiest", "shabby", "shaded", "shadowed", "shadowy", "shady", "shaggy", "shaky", "shallow", "shamefaced", "shameful", 
"shameless", "shapeless", "shapely", "sharp", "sharpened", "shattered", "shattering", "sheepish", "sheer", "sheltered", "shifty", "shimmering", "shining", "shiny", "shivering", "shivery", "shocked", 
"shocking", "shoddy", "short", "short-lived", "shortsighted", "short-tempered", "short-term", "showy", "shrewd", "shrieking", "shrill", "shut", "shy", "sick", "sickened", "sickening", "sickly", 
"side-splitting", "signed", "significant", "silent", "silky", "silly", "silver", "silver-tongued", "simian", "similar", "simple", "simpleminded", "simplified", "simplistic", "simultaneous", "sincere", 
"sinful", "single", "single-minded", "singular", "sinister", "sinuous", "sisterly", "six", "sixth", "sizable", "sizzling", "skeptical", "sketchy", "skilled", "skillful", "skimpy", "skin-deep", 
"skinny", "skittish", "sky-blue", "slanderous", "slanted", "slanting", "sleek", "sleeping", "sleepless", "sleepy", "slender", "slick", "slight", "slim", "slimy", "slippery", "sloped", "sloping", 
"sloppy", "slothful", "slow", "slow-moving", "sluggish", "slushy", "sly", "small", "smaller", "smallest", "small-minded", "small-scale", "small-time", "small-town", "smarmy", "smart", "smarter", 
"smartest", "smashing", "smeared", "smelly", "smiling", "smoggy", "smoked", "smoky", "smooth", "smothering", "smudged", "smug", "snapping", "snappish", "snappy", "snarling", "sneaky", "snide", 
"snippy", "snobbish", "snoopy", "snooty", "snoring", "snotty", "snow-white", "snug", "snuggly", "soaked", "soaking", "soaking", "soaring", "sober", "sociable", "social", "socialist", "sociological", 
"soft", "softhearted", "soggy", "solar", "soldierly", "sole", "solemn", "solicitous", "solid", "solitary", "somatic", "somber", "some", "sonic", "sonly", "soothed", "soothing", "sophisticated", 
"sordid", "sore", "sorrowful", "sorry", "soulful", "soulless", "soundless", "sour", "south", "southeasterly", "southern", "southwestern", "spacious", "spare", "sparing", "sparkling", "sparkly", 
"sparse", "spasmodic", "spastic", "spatial", "spattered", "special", "specialist", "specialized", "specific", "speckled", "spectacular", "spectral", "speculative", "speechless", "speedy", 
"spellbinding", "spendthrift", "spherical", "spicy", "spiffy", "spiky", "spinal", "spineless", "spiral", "spiraled", "spirited", "spiritless", "spiritual", "spiteful", "splashing", "splashy", 
"splattered", "splendid", "splintered", "spoiled", "spoken", "spongy", "spontaneous", "spooky", "sporadic", "sporting", "sportsmanly", "spotless", "spotted", "spotty", "springy", "sprite", "spry", 
"spurious", "squalid", "squandered", "square", "squashed", "squashy", "squatting", "squawking", "squealing", "squeamish", "squeezable", "squiggly", "squirming", "squirrelly", "stable", "stackable", 
"stacked", "staggering", "stagnant", "stained", "stale", "stanch", "standard", "standing", "standoffish", "starched", "star-crossed", "stark", "startled", "startling", "starving", "stately", "static", 
"statistical", "statuesque", "status", "statutory", "staunch", "steadfast", "steady", "stealth", "steaming", "steamy", "steel", "steely", "steep", "stereophonic", "stereotyped", "stereotypical", 
"sterile", "stern", "sticky", "stiff", "stifled", "stifling", "stigmatic", "still", "stilled", "stilted", "stimulating", "stinging", "stingy", "stinking", "stinky", "stirring", "stock", "stodgy", 
"stoic", "stony", "stormy", "stout", "straggly", "straight", "straightforward", "stranded", "strange", "strategic", "streaked", "street", "strenuous", "stressful", "stretchy", "strict", "strident", 
"striking", "stringent", "striped", "strong", "stronger", "strongest", "structural", "stubborn", "stubby", "stuck-up", "studied", "studious", "stuffed", "stuffy", "stumbling", "stunned", "stunning", 
"stupendous", "sturdy", "stuttering", "stylish", "stylistic", "suave", "subconscious", "subdued", "subject", "subjective", "sublime", "subliminal", "submissive", "subordinate", "subsequent", 
"subservient", "substantial", "substantiated", "substitute", "subterranean", "subtitled", "subtle", "subversive", "successful", "successive", "succinct", "succulent", "such", "sudden", "suffering", 
"sufficient", "sugary", "suggestive", "suitable", "sulky", "sullen", "sumptuous", "sunny", "super", "superabundant", "superb", "supercilious", "superficial", "superhuman", "superior", "superlative", 
"supernatural", "supersensitive", "supersonic", "superstitious", "supple", "supportive", "supposed", "suppressive", "supreme", "sure", "sure-footed", "surgical", "surly", "surmountable", "surprised", 
"surprising", "surrealistic", "survivable", "susceptible", "suspected", "suspicious", "sustainable", "swaggering", "swanky", "swaying", "sweaty", "sweeping", "sweet", "sweltering", "swift", 
"swimming", "swinish", "swishing", "swollen", "swooping", "syllabic", "syllogistic", "symbiotic", "symbolic", "symmetrical", "sympathetic", "symptomatic", "synergistic", "synonymous", "syntactic", 
"synthetic", "systematic", "taboo", "tacit", "tacky", "tactful", "tactical", "tactless", "tactual", "tainted", "take-charge", "talented", "talkative", "tall", "taller", "tallest", "tame", "tamed", 
"tan", "tangential", "tangible", "tangled", "tangy", "tanned", "tantalizing", "tapered", "tardy", "targeted", "tarnished", "tart", "tasteful", "tasteless", "tasty", "tattered", "taunting", "taut", 
"taxing", "teachable", "tearful", "tearing", "teasing", "technical", "technological", "tectonic", "tedious", "teenage", "teensy", "teeny", "teeny-tiny", "telegraphic", "telekinetic", "telepathic", 
"telephonic", "telescopic", "telling", "temperamental", "temperate", "tempestuous", "temporary", "tempted", "tempting", "ten", "tenable", "tenacious", "tender", "tenderhearted", "ten-minute", "tense", 
"tentative", "tenth", "tenuous", "tepid", "terminal", "terrestrial", "terrible", "terrific", "terrified", "terrifying", "territorial", "terse", "tested", "testy", "tetchy", "textual", "textural", 
"thankful", "thankless", "that", "the", "theatrical", "their", "thematic", "theological", "theoretical", "therapeutic", "thermal", "these", "thick", "thievish", "thin", "thinkable", "third", 
"thirsty", "this", "thorny", "thorough", "those", "thoughtful", "thoughtless", "thrashed", "threatened", "threatening", "three", "thriftless", "thrifty", "thrilled", "thrilling", "throbbing", 
"thumping", "thundering", "thunderous", "ticking", "tickling", "ticklish", "tidal", "tidy", "tight", "tightfisted", "time", "timeless", "timely", "timid", "timorous", "tiny", "tipsy", "tired", 
"tireless", "tiresome", "tiring", "tolerable", "tolerant", "tonal", "tone-deaf", "toneless", "toothsome", "toothy", "top", "topical", "topographical", "tormented", "torpid", "torrential", "torrid", 
"torturous", "total", "touched", "touching", "touchy", "tough", "towering", "toxic", "traditional", "tragic", "trainable", "trained", "training", "traitorous", "tranquil", "transcendent", 
"transcendental", "transformational", "transformative", "transformed", "transient", "transitional", "transitory", "translucent", "transparent", "transplanted", "trapped", "trashed", "trashy", 
"traumatic", "treacherous", "treasonable", "treasonous", "treasured", "treatable", "tremendous", "tremulous", "trenchant", "trendy", "triangular", "tribal", "trick", "tricky", "trim", "tripping", 
"trite", "triumphant", "trivial", "tropical", "troubled", "troublesome", "troubling", "truculent", "true", "trusted", "trustful", "trusting", "trustworthy", "trusty", "truthful", "trying", 
"tumultuous", "tuneful", "tuneless", "turbulent", "twinkling", "twinkly", "twisted", "twitchy", "two", "typical", "tyrannical", "tyrannous", "ubiquitous", "ugly", "ultimate", "ultraconservative", 
"ultrasensitive", "ultrasonic", "ultraviolet", "unabashed", "unabated", "unable", "unacceptable", "unaccompanied", "unaccountable", "unaccustomed", "unacknowledged", "unadorned", "unadulterated", 
"unadventurous", "unadvised", "unaffected", "unaffordable", "unafraid", "unaggressive", "unaided", "unalienable", "unalterable", "unaltered", "unambiguous", "unanimous", "unannounced", "unanswerable", 
"unanticipated", "unapologetic", "unappealing", "unappetizing", "unappreciative", "unapproachable", "unashamed", "unassailable", "unassertive", "unassisted", "unattached", "unattainable", 
"unattractive", "unauthorized", "unavailable", "unavailing", "unavoidable", "unbalanced", "unbearable", "unbeatable", "unbeaten", "unbecoming", "unbelievable", "unbelieving", "unbendable", 
"unbending", "unbiased", "unblemished", "unblinking", "unblushing", "unbounded", "unbreakable", "unbridled", "uncanny", "uncaring", "unceasing", "unceremonious", "uncertain", "unchangeable", 
"unchanging", "uncharacteristic", "uncharitable", "uncharted", "uncivil", "uncivilized", "unclassified", "unclean", "uncluttered", "uncomely", "uncomfortable", "uncommitted", "uncommon", 
"uncommunicative", "uncomplaining", "uncomprehending", "uncompromising", "unconcerned", "unconditional", "unconfirmed", "unconquerable", "unconscionable", "unconscious", "unconstitutional", 
"unconstrained", "unconstructive", "uncontainable", "uncontrollable", "unconventional", "unconvinced", "unconvincing", "uncooked", "uncooperative", "uncoordinated", "uncouth", "uncovered", 
"uncreative", "uncritical", "undamaged", "undated", "undaunted", "undeclared", "undefeated", "undefined", "undemocratic", "undeniable", "undependable", "underdeveloped", "underfunded", "underhanded", 
"underprivileged", "understandable", "understanding", "understated", "understood", "undeserved", "undesirable", "undetected", "undeterred", "undeveloped", "undeviating", "undifferentiated", 
"undignified", "undiminished", "undiplomatic", "undisciplined", "undiscovered", "undisguised", "undisputed", "undistinguished", "undivided", "undoubted", "unearthly", "uneasy", "uneducated", 
"unemotional", "unemployed", "unencumbered", "unending", "unendurable", "unenforceable", "unenthusiastic", "unenviable", "unequal", "unequaled", "unequivocal", "unerring", "uneven", "uneventful", 
"unexceptional", "unexcited", "unexpected", "unexplainable", "unexplored", "unexpressive", "unfailing", "unfair", "unfaithful", "unfaltering", "unfamiliar", "unfashionable", "unfathomable", 
"unfavorable", "unfeeling", "unfettered", "unfilled", "unflagging", "unflappable", "unflattering", "unflinching", "unfocused", "unforeseeable", "unforgettable", "unforgivable", "unforgiving", 
"unfortunate", "unfriendly", "unfulfilled", "ungallant", "ungenerous", "ungentlemanly", "unglamorous", "ungraceful", "ungracious", "ungrateful", "unguarded", "unhandsome", "unhappy", "unharmed", 
"unhealthy", "unheated", "unheeded", "unhelpful", "unhesitating", "unhurried", "uniform", "unilateral", "unimaginable", "unimaginative", "unimpeachable", "unimpeded", "unimpressive", "unincorporated", 
"uninformed", "uninhabitable", "uninhibited", "uninitiated", "uninjured", "uninspired", "uninsurable", "unintelligent", "unintelligible", "unintended", "unintentional", "uninterested", 
"uninterrupted", "uninvited", "unique", "united", "universal", "unjust", "unjustifiable", "unkempt", "unkind", "unknowing", "unknown", "unlawful", "unlicensed", "unlikable", "unlikely", "unlivable", 
"unloved", "unlucky", "unmanageable", "unmanly", "unmanned", "unmarketable", "unmasked", "unmatched", "unmemorable", "unmentionable", "unmerciful", "unmistakable", "unmitigated", "unmodified", 
"unmotivated", "unnatural", "unnecessary", "unnerved", "unnerving", "unnoticeable", "unobserved", "unobtainable", "unobtrusive", "unofficial", "unopened", "unopposed", "unorthodox", "unostentatious", 
"unpalatable", "unpardonable", "unpersuasive", "unperturbed", "unplanned", "unpleasant", "unprecedented", "unpredictable", "unpretentious", "unprincipled", "unproductive", "unprofessional", 
"unprofitable", "unpromising", "unpronounceable", "unprovoked", "unqualified", "unquantifiable", "unquenchable", "unquestionable", "unquestioned", "unquestioning", "unraveled", "unreachable", 
"unreadable", "unrealistic", "unrealized", "unreasonable", "unreceptive", "unrecognizable", "unrecognized", "unredeemable", "unregulated", "unrelenting", "unreliable", "unremarkable", "unremitting", 
"unrepentant", "unrepresentative", "unrepresented", "unreserved", "unrespectable", "unresponsive", "unrestrained", "unripe", "unrivaled", "unromantic", "unruffled", "unruly", "unsafe", 
"unsalvageable", "unsatisfactory", "unsatisfied", "unscheduled", "unscholarly", "unscientific", "unscrupulous", "unseasonable", "unseemly", "unselfish", "unsettled", "unsettling", "unshakable", 
"unshapely", "unsightly", "unsigned", "unsinkable", "unskilled", "unsociable", "unsolicited", "unsolvable", "unsolved", "unsophisticated", "unsound", "unsparing", "unspeakable", "unspoiled", 
"unstable", "unstated", "unsteady", "unstoppable", "unstressed", "unstructured", "unsubstantial", "unsubstantiated", "unsuccessful", "unsuitable", "unsuited", "unsupervised", "unsupported", "unsure", 
"unsurpassable", "unsurpassed", "unsurprising", "unsuspected", "unsuspecting", "unsustainable", "unsympathetic", "unsystematic", "untainted", "untamable", "untamed", "untapped", "untenable", 
"untested", "unthinkable", "unthinking", "untidy", "untimely", "untitled", "untouchable", "untraditional", "untrained", "untried", "untroubled", "untrustworthy", "untruthful", "unused", "unusual", 
"unverified", "unwary", "unwashed", "unwatchable", "unwavering", "unwholesome", "unwieldy", "unwilling", "unwise", "unwitting", "unworkable", "unworldly", "unworthy", "unwritten", "unyielding", 
"upbeat", "upmost", "upper", "uppity", "upright", "uproarious", "upset", "upsetting", "upstairs", "uptight", "up-to-date", "up-to-the-minute", "upward", "urbane", "urgent", "usable", "used", "useful", 
"useless", "usual", "utilitarian", "utopian", "utter", "uttermost", "vacant", "vacillating", "vacuous", "vagabond", "vagrant", "vague", "vain", "valiant", "valid", "valorous", "valuable", "vanishing", 
"vapid", "vaporous", "variable", "varied", "various", "varying", "vast", "vegetable", "vegetarian", "vegetative", "vehement", "velvety", "venal", "venerable", "vengeful", "venomous", "venturesome", 
"venturous", "veracious", "verbal", "verbose", "verdant", "verifiable", "verified", "veritable", "vernacular", "versatile", "versed", "vertical", "very", "vexed", "vexing", "viable", "vibrant", 
"vibrating", "vicarious", "vicious", "victorious", "vigilant", "vigorous", "vile", "villainous", "vindictive", "vinegary", "violent", "violet", "viperous", "viral", "virtual", "virtuous", "virulent", 
"visceral", "viscous", "visible", "visionary", "visual", "vital", "vitriolic", "vivacious", "vivid", "vocal", "vocational", "voiceless", "volatile", "volcanic", "voluminous", "voluntary", 
"voluptuous", "voracious", "vulgar", "vulnerable", "wacky", "wailing", "waiting", "wakeful", "wandering", "wanting", "wanton", "warlike", "warm", "warmest", "warning", "warring", "wary", "waspish", 
"waste", "wasted", "wasteful", "watchful", "waterlogged", "waterproof", "watertight", "watery", "wavering", "wax", "waxen", "weak", "weakened", "weak-willed", "wealthy", "wearisome", "weary", "wee", 
"weedy", "week-long", "weekly", "weightless", "weighty", "weird", "welcoming", "well", "well-adjusted", "well-argued", "well-aware", "well-balanced", "well-behaved", "well-built", "well-conceived", 
"well-considered", "well-crafted", "well-deserved", "well-developed", "well-done", "well-dressed", "well-educated", "well-equipped", "well-established", "well-founded", "well-groomed", "well-heeled", 
"well-honed", "well-informed", "well-intentioned", "well-kempt", "well-known", "well-liked", "well-lit", "well-made", "well-maintained", "well-mannered", "well-meaning", "well-off", "well-placed", 
"well-planned", "well-prepared", "well-qualified", "well-read", "well-received", "well-rounded", "well-spoken", "well-suited", "well-thought-of", "well-thought-out", "well-to-do", "well-traveled", 
"well-used", "well-versed", "well-worn", "well-written", "west", "western", "wet", "what", "wheezing", "which", "whimpering", "whimsical", "whining", "whispering", "whistling", "white", "whole", 
"wholehearted", "wholesale", "wholesome", "whooping", "whopping", "whose", "wicked", "wide", "wide-eyed", "wide-ranging", "widespread", "wiggly", "wild", "willful", "willing", "wily", "windy", 
"winning", "winsome", "winter", "wintery", "wiry", "wise", "wishful", "wispy", "wistful", "withering", "witless", "witty", "wizardly", "wobbly", "woeful", "wolfish", "wonderful", "wondrous", "wonted", 
"wood", "wooden", "wooing", "wool", "woolen", "woozy", "wordless", "wordy", "work", "workable", "working", "work-oriented", "worldly", "worn", "worn", "worn", "worried", "worrisome", "worrying", 
"worse", "worshipful", "worst", "worth", "worthless", "worthwhile", "worthy", "wounding", "wrathful", "wrenching", "wretched", "wriggling", "wriggly", "wrinkled", "wrinkly", "written", "wrong", 
"wrongful", "wry", "yawning", "yearly", "yearning", "yellow", "yelping", "yielding", "young", "younger", "youngest", "youthful", "yummy", "zany", "zealous", "zestful", "zesty", "zippy", "zonked", 
"zoological" ];

/*  Smart contract data entries.
 */

const KEYS_CHORD = [
  '_CL', '_C0', '_C1', '_C2', '_C3', '_C4'
];

const KEYS_ARPEGGIO = [
  '_AL', '_A00', '_A01', '_A02', '_A03', '_A04', '_A05', '_A06', '_A07', '_A08',
  '_A09', '_A10', '_A11', '_A12', '_A13', '_A14', '_A15'
];

const KEYS_RHYTHM = [
  '_RL', '_RS', '_R00', '_R01', '_R02', '_R03', '_R04', '_R05', '_R06', '_R07',
  '_R08', '_R09', '_R10', '_R11', '_R12', '_R13', '_R14', '_R15'
];

const KEYS_SONG = [
  '_SL', '_SN', '_G', '_SP0', '_SP1', '_SB0', '_SB1', '_SB2', '_ST', '_SC0',
  '_SC1', '_SC2', '_SC3', '_SC4', '_SC5', '_SC6', '_SC7', '_SA', '_SI0',
  '_SI1', '_SI2', '_SI3', '_SI4', '_SI5', '_SI00', '_SI01', '_SI02', '_SI03',
  '_SI04', '_SI05', '_SI06', '_SI07', '_SI10', '_SI11', '_SI12', '_SI13',
  '_SI14', '_SI15', '_SI16', '_SI17', '_SI20', '_SI21', '_SI22', '_SI23',
  '_SI24', '_SI25', '_SI26', '_SI27', '_SI30', '_SI31', '_SI32', '_SI33',
  '_SI34', '_SI35', '_SI36', '_SI37', '_SI40', '_SI41', '_SI42', '_SI43',
  '_SI44', '_SI45', '_SI46', '_SI47', '_SI50', '_SI51', '_SI52', '_SI53',
  '_SI54', '_SI55', '_SI56', '_SI57'
];

/*  Chord colors.
 */
const COLORS = {
  major:    0,
  minor:    1,
  neutral:  2,
  weird:    3
};

/*  Volume settings.
 */
const VOL_SILENCE = -10000;
const VOL_MIN     = -60;
const VOL_MAX     = 0;

/*  Network settings.
 */
const CLEF_URL        = 'https://clef.one/';
const CLEF_CACHE_URL  = 'https://cache.clef.one/';
const NODE_URL        = 'https://nodes.wavesnodes.com/';
const LIBRARY         = '3P4m4beJ6p1pMPHqCQMAXEdquUuXJz72CMe';

const FETCH_CONCURRENCY = 4;

const FETCH_TIMEOUT_429 = 100;
const FETCH_TIMEOUT_503 = 500;
const FETCH_TIMEOUT_400 = 1000;

/*  Note skip value.
 */
const NOTE_SKIP = 65535;

/*
 *
 *
 *    GLOBALS
 *
 *
 */

let fetch_mutex = (() => {
  let v = [];

  for (let i = 0; i < FETCH_CONCURRENCY; i++) {
    v.push(Promise.resolve());
  }

  return v;
})();

let fetch_index = 0;

let cache = {
  chords:           {},
  arpeggios:        {},
  rhythms:          {},
  songs_raw:        {},
  songs:            {},
  cached_metadata:  {}
};

let audio_data = {
  volume: VOL_MAX,
  player: null,
  stop:   null,
  id:     null
};

let audio_mutex = Promise.resolve();

/*
 *
 *
 *    NETWORKING UTILITIES
 *
 *
 */

/*  Adjust network options. Set default values if needed.
 */
function adjust_options(options) {
  let v = { ...options };

  if (!('fetch' in v))
    v.fetch           = window.fetch;
  if (!('log' in v))
    v.log             = () => {};
  if (!('clef_url' in v))
    v.clef_url        = CLEF_URL;
  if (!('clef_cache_url' in v))
    v.clef_cache_url  = CLEF_CACHE_URL;
  if (!('node_url' in v))
    v.node_url        = NODE_URL;
  if (!('library' in v))
    v.library         = LIBRARY;

  return v;
}

/*  Synchronized fetch.
 */
function sync_fetch(fetch_upstream, request, opts) {
  return new Promise((resolve, reject) => {
    const index = fetch_index;
    fetch_index = (fetch_index + 1) % fetch_mutex.length;

    fetch_mutex[index] = fetch_mutex[index].then(async () => {
      try {
        resolve(await fetch_upstream(request, opts));
      } catch (error) {
        reject(error);
      }
    });
  });
}

async function fetch_json_request(fetch_, request, request_opts, log_) {
  const response = await sync_fetch(fetch_, request, request_opts);

  if (response.status != 200)
    log_(`Error ${response.status}: ${request}`);

  /*  Too many requests.
   */
  if (response.status == 429)
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        fetch_json_request(fetch_, request, request_opts, log_)
          .catch(reject)
          .then(resolve);
      }, FETCH_TIMEOUT_429);
    });

  /*  Service unavailable.
   */
  if (response.status == 503)
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        fetch_json_request(fetch_, request, request_opts, log_)
          .catch(reject)
          .then(resolve);
      }, FETCH_TIMEOUT_503);
    });

  /*  Bad request.
   *  Waves node may return this when there is too many requests.
   */
  if (response.status == 400)
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        fetch_json_request(fetch_, request, request_opts, log_)
          .catch(reject)
          .then(resolve);
      }, FETCH_TIMEOUT_400);
    });

  if (response.status != 200)
    throw new Error(`Fetch request ${request} failed with status ${response.status}`);

  return await response.json();
}

/*
 *
 *
 *    BLOCKCHAIN UTILITIES
 *
 *
 */

/*  Fetch one smart contract value from the blockchain.
 */
async function fetch_value(key, options) {
  const { fetch, node_url, library, log } = adjust_options(options);

  const data = await fetch_json_request(
    fetch,
    `${node_url}addresses/data/${library}/${key}`,
    { method: 'GET' },
    log);

  return data.value;
}

/*  Fetch multiple smart contract values from the blockchain.
 */
async function fetch_values(keys, options) {
  const { fetch, node_url, library, log } = adjust_options(options);

  const data = await fetch_json_request(
    fetch,
    `${node_url}addresses/data/${library}`,
    { method:   'POST',
      body:     JSON.stringify({ keys: keys }),
      headers: {
        'Content-Type': 'application/json'
      },
      log
    },
    log);

  let values = [];

  for (let i = 0; i < keys.length; i++) {
    for (const x of data) {
      if (x.key === keys[i]) {
        values.push(x.value);
        break;
      }
    }
  }

  return values;
}

/*  Fetch chord data by id.
 */
async function fetch_chord(id, options) {
  if (!(id in cache.chords)) {
    cache.chords[id] = (async () => {
      let keys = [];

      for (let i = 0; i < KEYS_RHYTHM.length; i++) {
        keys.push(`${id}${KEYS_CHORD[i]}`);
      }

      const data = await fetch_values(keys, options);

      let notes = [];

      for (let i = 0; i < 5; i++) {
        const note = data[1 + i];
        if (note === NOTE_SKIP)
          break;
        notes.push(note);
      }

      return {
        id:     id,
        label:  data[0],
        notes:  notes
      };
    })();
  }

  return await cache.chords[id];
}

/*  Fetch arpeggio data by id.
 */
async function fetch_arpeggio(id, options) {
  if (!(id in cache.arpeggios)) {
    cache.arpeggios[id] = (async () => {
      let keys = [];

      for (let i = 0; i < KEYS_ARPEGGIO.length; i++) {
        keys.push(`${id}${KEYS_ARPEGGIO[i]}`);
      }

      const data = await fetch_values(keys, options);

      let arpeggio = [];

      for (let i = 0; i < 16; i++) {
        const index = data[1 + i];
        if (index === NOTE_SKIP)
          break;
        arpeggio.push(index);
      }

      return arpeggio;
    })();
  }

  return await cache.arpeggios[id];
}

/*  Fetch rhythm data by id.
 */
async function fetch_rhythm(id, options) {
  if (!(id in cache.rhythms)) {
    cache.rhythms[id] = (async () => {
      let keys = [];

      for (let i = 0; i < KEYS_RHYTHM.length; i++) {
        keys.push(`${id}${KEYS_RHYTHM[i]}`);
      }

      const data = await fetch_values(keys, options);

      const scale = data[1];

      if (scale < 0.01)
        throw new Error(`Invalid rhythm scale value ${scale}`);

      let notes = [];

      for (let i = 0; i < 16; i++) {
        const note = data[2 + i];
        if (note === NOTE_SKIP)
          break;
        notes.push(note / scale);
      }

      return {
        id:     id,
        label:  data[0],
        notes:  notes
      };
    })();
  }

  return await cache.rhythms[id];
}

/*  Fetch raw song data by id.
 */
async function fetch_raw_song(id, options) {
  if (!(id in cache.songs_raw)) {
    cache.songs_raw[id] = (async () => {
      let keys = [ id ];

      for (let i = 0; i < KEYS_SONG.length; i++) {
        keys.push(`${id}${KEYS_SONG[i]}`);
      }

      const data = await fetch_values(keys, options);

      return {
        id:               id,
        asset_id:         data[0],
        label:            data[1],
        name_index:       data[2],
        generation:       data[3],
        parents:        [ data[4],
                          data[5] ],
        bpm:              data[6],
        bar_size:         data[7],
        beat_size:        data[8],
        tonality:         data[9],
        chords:         [ data[10],
                          data[11],
                          data[12],
                          data[13],
                          data[14],
                          data[15],
                          data[16],
                          data[17] ],
        arpeggio:         data[18],
        instruments:    [ data[19],
                          data[20],
                          data[21],
                          data[22],
                          data[23],
                          data[24] ],
        rhythm: {
          kick:         [ data[25],
                          data[26],
                          data[27],
                          data[28],
                          data[29],
                          data[30],
                          data[31],
                          data[32] ],
          snare:        [ data[33],
                          data[34],
                          data[35],
                          data[36],
                          data[37],
                          data[38],
                          data[39],
                          data[40] ],
          hihat:        [ data[41],
                          data[42],
                          data[43],
                          data[44],
                          data[45],
                          data[46],
                          data[47],
                          data[48] ],
          bass:         [ data[49],
                          data[50],
                          data[51],
                          data[52],
                          data[53],
                          data[54],
                          data[55],
                          data[56] ],
          back:         [ data[57],
                          data[58],
                          data[59],
                          data[60],
                          data[61],
                          data[62],
                          data[63],
                          data[64] ],
          lead:         [ data[65],
                          data[66],
                          data[67],
                          data[68],
                          data[69],
                          data[70],
                          data[71],
                          data[72] ]
        }
      };
    })();
  }

  return await cache.songs_raw[id];
}

/*  Fetch raw song data by asset id.
 */
async function fetch_raw_song_by_asset_id(asset_id, options) {
  if (!(asset_id in cache.songs_raw)) {
    cache.songs_raw[asset_id] = (async () => {
      const id = await fetch_value(asset_id, options);

      return await fetch_raw_song(id, options);
    })();
  }

  return await cache.songs_raw[asset_id];
}

/*  Fetch full song data by asset id.
 */
async function fetch_song_by_asset_id(asset_id, options) {
  if (!(asset_id in cache.songs)) {
    cache.songs[asset_id] = (async () => {
      const song_raw = await fetch_raw_song_by_asset_id(asset_id);

      let song = {
        id:             song_raw.id,
        asset_id:       song_raw.asset_id,
        label:          song_raw.label,
        name_index:     song_raw.name_index,
        generation:     song_raw.generation,
        parents:      [ song_raw.parents[0],
                        song_raw.parents[1] ],
        bpm:            song_raw.bpm,
        bar_size:       song_raw.bar_size,
        beat_size:      song_raw.beat_size,
        tonality:       { key: song_raw.tonality },
        chords:         [],
        arpeggio:       await fetch_arpeggio(song_raw.arpeggio, options),
        instruments:  {
          kick:   song_raw.instruments[0],
          snare:  song_raw.instruments[1],
          hihat:  song_raw.instruments[2],
          bass:   song_raw.instruments[3],
          back:   song_raw.instruments[4],
          lead:   song_raw.instruments[5]
        },
        rhythm: {
          kick:   [], 
          snare:  [],
          hihat:  [],
          bass:   [],
          back:   [],
          lead:   []
        }
      };

      for (let i = 0; i < 8; i++) {
        song.chords.push(await fetch_chord(song_raw.chords[i], options));
        song.rhythm.kick.push(await fetch_rhythm(song_raw.rhythm.kick[i], options));
        song.rhythm.snare.push(await fetch_rhythm(song_raw.rhythm.snare[i], options));
        song.rhythm.hihat.push(await fetch_rhythm(song_raw.rhythm.hihat[i], options));
        song.rhythm.bass.push(await fetch_rhythm(song_raw.rhythm.bass[i], options));
        song.rhythm.back.push(await fetch_rhythm(song_raw.rhythm.back[i], options));
        song.rhythm.lead.push(await fetch_rhythm(song_raw.rhythm.lead[i], options));
      }

      return song;
    })();
  }

  return await cache.songs[asset_id];
}

async function fetch_cached_metadata_by_asset_id(asset_id, options) {
  const { clef_cache_url, fetch } = adjust_options(options);

  if (!(asset_id in cache.cached_metadata)) {
    cache.cached_metadata[asset_id] = (async () => {
      try {
        const response = await fetch(
          `${clef_cache_url}metadata/${asset_id}`,
          { method: 'GET' });

        if (response.status != 200)
          return null;

        return await response.json();
      } catch (error_) {
        return null;
      }
    })();
  }

  return await cache.cached_metadata[asset_id];
}

/*
 *
 *
 *    MUSIC AND AUDIO UTILITIES
 *
 *
 */

function generate_name(seed) {
  let _upper = (s) => {
    let a = s.substring(0, 1).toUpperCase();
    let b = s.substring(1);
    return `${a}${b}`;
  };

  let noun  = _upper(NOUNS[(seed % 65536) % NOUNS.length]);
  let adj   = _upper(ADJECTIVES[Math.floor(seed / 65536) % ADJECTIVES.length]);

  return `${adj} ${noun}`;
}

function beat_to_sec(bpm, beats) {
  return (beats * 60) / bpm;
}

function render_line(bpm, notes, bar, beat_size, beat_count, beats_per_bar, add) {
  if (notes.length === 0)
    return;

  let prev_bar  = 0;
  let offset    = 0;
  let index     = 0;

  for ( let i = 0;
        offset < beat_count;
        i += 2) {
    if (offset <= 0 && i > notes.length)
      break;

    const current_bar = Math.floor(offset / beats_per_bar);
    const duration    = notes[i % notes.length] / beat_size;

    if (current_bar != prev_bar)
      index = 0;

    if (current_bar === bar)
      add({
        bar: current_bar,
        index: index,
        time: beat_to_sec(bpm, offset),
        duration: beat_to_sec(bpm, duration)
      });

    prev_bar = current_bar;
    index++;

    const pause = notes[(i + 1) % notes.length] / beat_size;
    offset += duration + pause;
  }
}

function render_rhythms(bpm, rhythms, beat_size, beat_count, beats_per_bar, add) {
  if (rhythms.length === 0 || beats_per_bar <= 0)
    return;

  for ( let offset = 0, bar = 0;
        offset < beat_count;
        offset += beats_per_bar, bar++)
    render_line(
      bpm, rhythms[bar % rhythms.length].notes, bar,
      beat_size, beat_count, beats_per_bar, add);
}

function render_sheet(song) {
  let sheet = {
    instruments: song.instruments,

    duration: 0,
    kick: [],
    snare: [],
    hihat: [],
    bass: [],
    back: [],
    lead: []
  };

  const beat_count    = Math.floor(song.chords.length * song.bar_size / song.beat_size);
  const beats_per_bar = Math.floor(song.bar_size / song.beat_size);

  sheet.duration = beat_to_sec(song.bpm, beat_count);

  render_rhythms(
    song.bpm,
    song.rhythm.kick,
    song.beat_size,
    beat_count,
    beats_per_bar,
    ({ time, duration }) => {
      if (sheet.kick.length > 0 && duration <= 0)
        return;
      sheet.kick.push(
        { time: time,
          note: 0,
          duration: duration,
          velocity: 1 });
    });

  render_rhythms(
    song.bpm,
    song.rhythm.snare,
    song.beat_size,
    beat_count,
    beats_per_bar,
    ({ time, duration }) => {
      if (sheet.snare.length > 0 && duration <= 0)
        return;
      sheet.snare.push(
        { time: time,
          note: 0,
          duration: duration,
          velocity: 1 });
    });

  render_rhythms(
    song.bpm,
    song.rhythm.hihat,
    song.beat_size,
    beat_count,
    beats_per_bar,
    ({ time, duration }) => {
      if (sheet.hihat.length > 0 && duration <= 0)
        return;
      sheet.hihat.push(
        { time: time,
          note: 0,
          duration: duration,
          velocity: 1 });
    });

  render_rhythms(
    song.bpm,
    song.rhythm.back,
    song.beat_size,
    beat_count,
    beats_per_bar,
    ({ bar, time, duration }) => {
      if (sheet.back.length > 0 && duration <= 0)
        return;
      const chord = song.chords[bar % song.chords.length];
      for (let i = 2; i < chord.notes.length; i++)
        sheet.back.push(
          { time: time,
            note: song.tonality.key + chord.notes[i],
            duration: duration,
            velocity: 1 });
    });

  render_rhythms(
    song.bpm,
    song.rhythm.bass,
    song.beat_size,
    beat_count,
    beats_per_bar,
    ({ bar, time, duration }) => {
      const chord = song.chords[bar % song.chords.length];
      if (chord.notes.length === 0)
        return;
      if (sheet.bass.length > 0 && duration <= 0)
        return;
      sheet.bass.push(
        { time: time,
          note: song.tonality.key + chord.notes[0],
          duration: duration,
          velocity: 1 });
    });

  render_rhythms(
    song.bpm,
    song.rhythm.lead,
    song.beat_size,
    beat_count,
    beats_per_bar,
    ({ bar, index, time, duration }) => {
      if (sheet.lead.length > 0 && duration <= 0)
        return;
      const chord = song.chords[bar % song.chords.length];
      if (chord.notes.length < 2)
        return;
      let note;
      if (index === 0 || chord.notes.length === 2 || song.arpeggio.length === 0)
        note = song.tonality.key + chord.notes[1];
      else {
        const m0  = song.arpeggio[(index - 1) % song.arpeggio.length];
        const m   = m0 < 0 ? (-m0 - 1) : m0;
        const n   = 2 + (m % (chord.notes.length - 2));
        note = song.tonality.key + chord.notes[n];
        if (m0 < 0)
          note -= 12;
      }
      sheet.lead.push(
        { time: time,
          note: note,
          duration: duration,
          velocity: 1 });
    });

  return sheet;
}

async function audio_init(Tone) {
  if (!('init' in audio_data)) {
    audio_data.init = (async () => {
      Tone.start();
      Tone.Transport.start();
    })();
  }

  await audio_data.init;
}

async function audio_load_urls(name, options) {
  const { fetch, clef_url } = adjust_options(options);

  const urls = await fetch(`${clef_url}samples/${name}/urls.json`);

  if (urls.status != 200)
    throw new Error('Fetch failed');

  return JSON.parse(await urls.text());
}

function audio_new_sampler(Tone, name, options) {
  const { clef_url } = adjust_options(options);

  return new Promise((resolve, reject) => {
    audio_load_urls(name).then(urls => {
      let sampler;

      sampler = new Tone.Sampler({
        urls:     urls,
        baseUrl:  `${clef_url}samples/${name}/`,
        onload: () => {
          resolve(sampler)
        }
      }).toDestination();
    }).catch(error => { reject(error); });
  });
}

function audio_render(Tone, sheet, options) {
  return new Promise((resolve, reject) => {
    audio_mutex = audio_mutex.then(async () => {
      try {
        let buffer = await Tone.Offline(async ({ transport }) => {
          const [
            kick, snare, hihat, bass, back, lead
          ] = await Promise.all([
            audio_new_sampler(Tone, sheet.instruments.kick, options),
            audio_new_sampler(Tone, sheet.instruments.snare, options),
            audio_new_sampler(Tone, sheet.instruments.hihat, options),
            audio_new_sampler(Tone, sheet.instruments.bass, options),
            audio_new_sampler(Tone, sheet.instruments.back, options),
            audio_new_sampler(Tone, sheet.instruments.lead, options)
          ]);

          const _note = (midi) => {
            return Tone.Frequency(48 + midi, 'midi').toNote();
          };

          const render_part = (part_sheet, on_note) => {
            let part = new Tone.Part((time, note) => {
              if (time < sheet.duration + 0.01 && note.duration > 0)
                on_note(time, note);
              }, part_sheet);

            part.loop      = true;
            part.loopStart = 0;
            part.loopEnd   = sheet.duration;

            part.start();
          };

          render_part(sheet.bass, (time, note) => {
            bass.triggerAttackRelease(_note(note.note), note.duration, time, note.velocity);
          });

          render_part(sheet.back, (time, note) => {
            back.triggerAttackRelease(_note(note.note), note.duration, time, note.velocity);
          });

          render_part(sheet.lead, (time, note) => {
            lead.triggerAttackRelease(_note(note.note), note.duration, time, note.velocity);
          });

          render_part(sheet.kick, (time, note) => {
            kick.triggerAttackRelease('A2', note.duration, time, note.velocity);
          });

          render_part(sheet.snare, (time, note) => {
            snare.triggerAttackRelease('A2', note.duration, time, note.velocity);
          });

          render_part(sheet.hihat, (time, note) => {
            hihat.triggerAttackRelease('A2', note.duration, time, note.velocity);
          });

          transport.start();
        }, sheet.duration + 2);

        /*  Tone.js bug
         *  Make sure rendering don't overlap.
         */
        await new Promise((resolve_, reject_) => {
          setTimeout(resolve_, 100);
        });

        resolve(buffer);
      } catch (error) {
        reject(error);
      }
    });
  });
}

/*
 *
 *
 *    USER API
 *
 *
 */

/*  Fetch song name by asset id.
 */
async function get_song_name_by_asset_id(asset_id, options = {}) {
  const metadata = await fetch_cached_metadata_by_asset_id(asset_id, options);

  if (metadata != null) {
    return metadata.name;
  }

  const song_raw = await fetch_raw_song_by_asset_id(asset_id, options);

  if (song_raw.name_index === 0)
    return song_raw.label;

  return generate_name(song_raw.name_index);
}

/*  Fetch song colors by asset id.
 */
async function get_song_colors_by_asset_id(asset_id, options = {}) {
  const metadata = await fetch_cached_metadata_by_asset_id(asset_id, options);

  if (metadata != null) {
    return metadata.colors;
  }

  const song_raw = await fetch_raw_song_by_asset_id(asset_id, options);

  let v = [];

  for (const chord_id of song_raw.chords) {
    const chord = await fetch_chord(chord_id, options);

    const bass = chord.notes[0];
    if (chord.notes.includes(bass + 3))
      v.push(COLORS.minor);
    else if (chord.notes.includes(bass + 4))
      v.push(COLORS.major);
    else if (chord.notes.includes(bass + 7))
      v.push(COLORS.neutral);
    else
      v.push(COLORS.weird);
  }

  return v;
}

/*  Set audio volume.
 */
async function set_volume(volume) {
  if (volume <= 0)
    audio_data.volume = VOL_SILENCE;
  else if (volume >= 1)
    audio_data.volume = VOL_MAX;
  else
    audio_data.volume = VOL_MIN + (VOL_MAX - VOL_MIN) * Math.log2(volume + 1);

  if (audio_data.player) {
    audio_data.player.volume.value = audio_data.volume;
  }
}

/*  Play song by asset id.
 */
async function play_song_by_asset_id(Tone, asset_id, ready, options = {}) {
  await audio_init(Tone);

  const song = await fetch_song_by_asset_id(asset_id, options);

  if (audio_data.id === song.id) {
    audio_data.player.stop();
    audio_data.stop();

    await ready();

    audio_data.player.start();

  } else {
    const sheet   = render_sheet(song);
    const buffer  = await audio_render(Tone, sheet, options);

    if (audio_data.player) {
      audio_data.player.stop();
      audio_data.stop();
    }

    await ready();

    audio_data.player               = new Tone.Player().toDestination();
    audio_data.player.volume.value  = audio_data.volume;
    audio_data.player.buffer        = buffer;
    audio_data.player.start();
    audio_data.id       = song.id;
    audio_data.duration = sheet.duration + 2;
  }

  await new Promise((resolve, reject) => {
    audio_data.stop = resolve;

    const duration_msec = Math.floor(audio_data.duration * 1000);

    setTimeout(resolve, duration_msec);
  });
}

/*  Stop playing.
 */
async function stop() {
  if (audio_data.player) {
    audio_data.player.stop();
    audio_data.stop();
  }
}

module.exports = {
  COLORS:                       COLORS,
  adjust_options:               adjust_options,
  fetch_json_request:           fetch_json_request,
  fetch_value:                  fetch_value,
  fetch_values:                 fetch_values,
  fetch_raw_song:               fetch_raw_song,
  fetch_song_by_asset_id:       fetch_song_by_asset_id,
  render_sheet:                 render_sheet,
  get_song_name_by_asset_id:    get_song_name_by_asset_id,
  get_song_colors_by_asset_id:  get_song_colors_by_asset_id,
  set_volume:                   set_volume,
  play_song_by_asset_id:        play_song_by_asset_id,
  stop:                         stop
};
