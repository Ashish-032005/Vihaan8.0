const offensiveWords = [
  "aand",
  "aandu",
  "balatkar",
  "balatkari",
  "behen chod",
  "beti chod",
  "bhadva",
  "bhadve",
  "bhandve",
  "bhangi",
  "bhootni ke",
  "bhosad",
  "bhosadi ke",
  "boobe",
  "chakke",
  "chinaal",
  "chinki",
  "chod",
  "chodu",
  "chodu bhagat",
  "chooche",
  "choochi",
  "choope",
  "choot",
  "choot ke baal",
  "chootia",
  "chootiya",
  "chuche",
  "chuchi",
  "chudaap",
  "chudai khanaa",
  "chudam chudai",
  "chude",
  "chut",
  "chut ka chuha",
  "chut ka churan",
  "chut ka mail",
  "chut ke baal",
  "chut ke dhakkan",
  "chut maarli",
  "chutad",
  "chutadd",
  "chutan",
  "chutia",
  "chutiya",
  "gaand",
  "gaandfat",
  "gaandmasti",
  "gaandufad",
  "gandfattu",
  "gandu",
  "gashti",
  "gasti",
  "ghassa",
  "ghasti",
  "gucchi",
  "gucchu",
  "harami",
  "haramzade",
  "hawas",
  "hawas ke pujari",
  "hijda",
  "hijra",
  "jhant",
  "jhant chaatu",
  "jhant ka keeda",
  "jhant ke baal",
  "jhant ke pissu",
  "jhantu",
  "kamine",
  "kaminey",
  "kanjar",
  "kutta",
  "kutta kamina",
  "kutte ki aulad",
  "kutte ki jat",
  "kuttiya",
  "loda",
  "lodu",
  "lund",
  "lund choos",
  "lund ka bakkal",
  "lund khajoor",
  "lundtopi",
  "lundure",
  "maa ki chut",
  "maal",
  "madar chod",
  "madarchod",
  "madhavchod",
  "mooh mein le",
  "mutth",
  "mutthal",
  "najayaz",
  "najayaz aulaad",
  "najayaz paidaish",
  "paki",
  "pataka",
  "patakha",
  "raand",
  "randaap",
  "randi",
  "randi rona",
  "saala",
  "saala kutta",
  "saali kutti",
  "saali randi",
  "suar",
  "suar ke lund",
  "suar ki aulad",
  "tatte",
  "tatti",
  "teri maa ka bhosada",
  "teri maa ka boba chusu",
  "teri maa ki behenchod",
  "teri maa ki chut",
  "tharak",
  "tharki",
  "tu chuda",
  "2g1c",
  "2 girls 1 cup",
  "acrotomophilia",
  "alabama hot pocket",
  "alaskan pipeline",
  "anal",
  "anilingus",
  "anus",
  "apeshit",
  "arsehole",
  "ass",
  "asshole",
  "assmunch",
  "auto erotic",
  "autoerotic",
  "babeland",
  "baby batter",
  "baby juice",
  "ball gag",
  "ball gravy",
  "ball kicking",
  "ball licking",
  "ball sack",
  "ball sucking",
  "bangbros",
  "bangbus",
  "bareback",
  "barely legal",
  "barenaked",
  "bastard",
  "bastardo",
  "bastinado",
  "bbw",
  "bdsm",
  "beaner",
  "beaners",
  "beaver cleaver",
  "beaver lips",
  "beastiality",
  "bestiality",
  "big black",
  "big breasts",
  "big knockers",
  "big tits",
  "bimbos",
  "birdlock",
  "bitch",
  "bitches",
  "black cock",
  "blonde action",
  "blonde on blonde action",
  "blowjob",
  "blow job",
  "blow your load",
  "blue waffle",
  "blumpkin",
  "bollocks",
  "bondage",
  "boner",
  "boob",
  "boobs",
  "booty call",
  "brown showers",
  "brunette action",
  "bukkake",
  "bulldyke",
  "bullet vibe",
  "bullshit",
  "bung hole",
  "bunghole",
  "busty",
  "butt",
  "buttcheeks",
  "butthole",
  "camel toe",
  "camgirl",
  "camslut",
  "camwhore",
  "carpet muncher",
  "carpetmuncher",
  "chocolate rosebuds",
  "cialis",
  "circlejerk",
  "cleveland steamer",
  "clit",
  "clitoris",
  "clover clamps",
  "clusterfuck",
  "cock",
  "cocks",
  "coprolagnia",
  "coprophilia",
  "cornhole",
  "coon",
  "coons",
  "creampie",
  "cum",
  "cumming",
  "cumshot",
  "cumshots",
  "cunnilingus",
  "cunt",
  "darkie",
  "date rape",
  "daterape",
  "deep throat",
  "deepthroat",
  "dendrophilia",
  "dick",
  "dildo",
  "dingleberry",
  "dingleberries",
  "dirty pillows",
  "dirty sanchez",
  "doggie style",
  "doggiestyle",
  "doggy style",
  "doggystyle",
  "dog style",
  "dolcett",
  "domination",
  "dominatrix",
  "dommes",
  "donkey punch",
  "double dong",
  "double penetration",
  "dp action",
  "dry hump",
  "dvda",
  "eat my ass",
  "ecchi",
  "ejaculation",
  "erotic",
  "erotism",
  "escort",
  "eunuch",
  "fag",
  "faggot",
  "fecal",
  "felch",
  "fellatio",
  "feltch",
  "female squirting",
  "femdom",
  "figging",
  "fingerbang",
  "fingering",
  "fisting",
  "foot fetish",
  "footjob",
  "frotting",
  "fuck",
  "fuck buttons",
  "fuckin",
  "fucking",
  "fucktards",
  "fudge packer",
  "fudgepacker",
  "futanari",
  "gangbang",
  "gang bang",
  "gay sex",
  "genitals",
  "giant cock",
  "girl on",
  "girl on top",
  "girls gone wild",
  "goatcx",
  "goatse",
  "god damn",
  "gokkun",
  "golden shower",
  "goodpoop",
  "goo girl",
  "goregasm",
  "grope",
  "group sex",
  "g-spot",
  "guro",
  "hand job",
  "handjob",
  "hard core",
  "hardcore",
  "hentai",
  "homoerotic",
  "honkey",
  "hooker",
  "horny",
  "hot carl",
  "hot chick",
  "how to kill",
  "how to murder",
  "huge fat",
  "humping",
  "incest",
  "intercourse",
  "jack off",
  "jail bait",
  "jailbait",
  "jelly donut",
  "jerk off",
  "jigaboo",
  "jiggaboo",
  "jiggerboo",
  "jizz",
  "juggs",
  "kike",
  "kinbaku",
  "kinkster",
  "kinky",
  "knobbing",
  "leather restraint",
  "leather straight jacket",
  "lemon party",
  "livesex",
  "lolita",
  "lovemaking",
  "make me come",
  "male squirting",
  "masturbate",
  "masturbating",
  "masturbation",
  "menage a trois",
  "milf",
  "missionary position",
  "mong",
  "motherfucker",
  "mound of venus",
  "mr hands",
  "muff diver",
  "muffdiving",
  "nambla",
  "nawashi",
  "negro",
  "neonazi",
  "nigga",
  "nigger",
  "nig nog",
  "nimphomania",
  "nipple",
  "nipples",
  "nsfw",
  "nsfw images",
  "nude",
  "nudity",
  "nutten",
  "nympho",
  "nymphomania",
  "octopussy",
  "omorashi",
  "one cup two girls",
  "one guy one jar",
  "orgasm",
  "orgy",
  "paedophile",
  "paki",
  "panties",
  "panty",
  "pedobear",
  "pedophile",
  "pegging",
  "penis",
  "phone sex",
  "piece of shit",
  "pikey",
  "pissing",
  "piss pig",
  "pisspig",
  "playboy",
  "pleasure chest",
  "pole smoker",
  "ponyplay",
  "poof",
  "poon",
  "poontang",
  "punany",
  "poop chute",
  "poopchute",
  "porn",
  "porno",
  "pornography",
  "prince albert piercing",
  "pthc",
  "pubes",
  "pussy",
  "queaf",
  "queef",
  "quim",
  "raghead",
  "raging boner",
  "rape",
  "raping",
  "rapist",
  "rectum",
  "reverse cowgirl",
  "rimjob",
  "rimming",
  "rosy palm",
  "rosy palm and her 5 sisters",
  "rusty trombone",
  "sadism",
  "santorum",
  "scat",
  "schlong",
  "scissoring",
  "semen",
  "sex",
  "sexcam",
  "sexo",
  "sexy",
  "sexual",
  "sexually",
  "sexuality",
  "shaved beaver",
  "shaved pussy",
  "shemale",
  "shibari",
  "shit",
  "shitblimp",
  "shitty",
  "shota",
  "shrimping",
  "skeet",
  "slanteye",
  "slut",
  "s&m",
  "smut",
  "snatch",
  "snowballing",
  "sodomize",
  "sodomy",
  "spastic",
  "spic",
  "splooge",
  "splooge moose",
  "spooge",
  "spread legs",
  "spunk",
  "strap on",
  "strapon",
  "strappado",
  "strip club",
  "style doggy",
  "suck",
  "sucks",
  "suicide girls",
  "sultry women",
  "swastika",
  "swinger",
  "tainted love",
  "taste my",
  "tea bagging",
  "threesome",
  "throating",
  "thumbzilla",
  "tied up",
  "tight white",
  "tit",
  "tits",
  "titties",
  "titty",
  "tongue in a",
  "topless",
  "tosser",
  "towelhead",
  "tranny",
  "tribadism",
  "tub girl",
  "tubgirl",
  "tushy",
  "twat",
  "twink",
  "twinkie",
  "two girls one cup",
  "undressing",
  "upskirt",
  "urethra play",
  "urophilia",
  "vagina",
  "venus mound",
  "viagra",
  "vibrator",
  "violet wand",
  "vorarephilia",
  "voyeur",
  "voyeurweb",
  "voyuer",
  "vulva",
  "wank",
  "wetback",
  "wet dream",
  "white power",
  "whore",
  "worldsex",
  "wrapping men",
  "wrinkled starfish",
  "xx",
  "xxx",
  "yaoi",
  "yellow showers",
  "yiffy",
  "zoophilia",
];


// --- Text Detection & Removal ---
const NSFW_THRESHOLD = 0.3;


// Traverse DOM + shadow DOM
function traverseDOM(node, callback) {
  callback(node);
  if (node.shadowRoot) {
    node.shadowRoot.childNodes.forEach(child => traverseDOM(child, callback));
  }
  node.childNodes.forEach(child => traverseDOM(child, callback));
}


// Clean offensive text nodes
function cleanText(node) {
  if (node.nodeType === 3) {
    const regex = new RegExp(`\\b(${offensiveWords.join("|")})\\b`, "gi");
    if (regex.test(node.nodeValue)) {
      const censoredText = node.nodeValue.replace(regex, "****");
      const newTextNode = document.createTextNode(censoredText);
      node.parentNode.replaceChild(newTextNode, node);
    }
  } else {
    node.childNodes.forEach(cleanText);
  }
}
cleanText(document.body);
function blurOffensiveImages() {
  document.querySelectorAll("img").forEach((img) => {
    const altText = img.alt.toLowerCase();
    if (offensiveWords.some((word) => altText.includes(word))) {
      img.classList.add("blurred-safe");
    }
  });
}

// Initial run
blurOffensiveImages();


// // Mutation Observer for dynamic pages
// const observer = new MutationObserver((mutations) => {
//   mutations.forEach((mutation) => {
//     mutation.addedNodes.forEach((node) => {
//       cleanText(node);
//       if (node.nodeType === 1) blurOffensiveImages();
//     });
//   });
// });

observer.observe(document.body, { childList: true, subtree: true });

const NSFW_THRESHOLD = 0.3; // adjust this based on model behavior

  async function classifyImage(img) {
    try {
      // Create canvas
      const canvas = document.createElement("canvas");
      canvas.width = img.naturalWidth;
      canvas.height = img.naturalHeight;
      console.log("width height")
      const ctx = canvas.getContext("2d");
      ctx.drawImage(img, 0, 0);
      console.log(ctx)
      // Convert canvas to blob
      const blob = await new Promise(resolve =>
        canvas.toBlob(resolve, "image/jpeg")
      );
      console.log("yea after blob")
      if (!blob) throw new Error("Failed to convert image to blob");

      // Prepare FormData
      const formData = new FormData();
      formData.append("file", blob, "image.jpg");
      console.log("after formData")
      // Send request to model
      const response = await fetch("https://84b3-34-105-2-146.ngrok-free.app/classify/", {
        method: "POST",
        body: formData,
      });
      console.log("response generated")
      const data = await response.json();

      const nsfwScore = data.labels?.nsfw ?? 0;
      if (nsfwScore >= NSFW_THRESHOLD) {
        img.classList.add("blurred-safe");
      }
      console.log("score generated")
    } catch (err) {
      console.error("Image NSFW check failed:", err);
    }
  }


// Handle each node
function handleNode(node) {
  cleanText(node);
  blurOffensiveImages(node);


  if (node.tagName === "IMG") {
    if (node.complete && node.naturalWidth !== 0) {
      classifyImage(node);
    } else {
      node.addEventListener("load", () => classifyImage(node));
    }
  }
}


// Check all images and text
function scanAllContent() {
  traverseDOM(document.body, handleNode);
}


// Initial run
scanAllContent();


// Observe for changes
const observer = new MutationObserver((mutations) => {
  for (const mutation of mutations) {
    for (const node of mutation.addedNodes) {
      if (node.nodeType === 1) {
        traverseDOM(node, handleNode);
      }
    }
  }
});


observer.observe(document.body, {
  childList: true,
  subtree: true
});
