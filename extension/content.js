// content.js

const offensiveWords = [
    "kutta", "kamina", "bkl", "bhenchod", "madarchod", "mc", "bc",
    "chutiya", "gandu", "randi", "harami", "saala", "gaand", 
    "fuck", "fucker", "shit", "bastard", "bloody", "suar", 
    "kutti", "jhant", "lund", "gaand", "chod", "chodu", "lavda"
  ];
  

// --- Text Detection & Removal ---
function cleanText(node) {
  if (node.nodeType === 3) { // text node
    const regex = new RegExp(offensiveWords.join("|"), "gi");
    if (regex.test(node.nodeValue)) {
      node.parentNode.style.display = "none"; // hide whole element
    }
  } else {
    node.childNodes.forEach(cleanText);
  }
}

// --- Image Detection & Blurring (basic based on alt text) ---
function blurOffensiveImages() {
  document.querySelectorAll("img").forEach((img) => {
    const altText = img.alt.toLowerCase();
    if (offensiveWords.some(word => altText.includes(word))) {
      img.classList.add("blurred-safe");
    }
  });
}

// Initial run
cleanText(document.body);
blurOffensiveImages();

// Mutation Observer for dynamic pages
const observer = new MutationObserver((mutations) => {
  mutations.forEach((mutation) => {
    mutation.addedNodes.forEach((node) => {
      cleanText(node);
      if (node.nodeType === 1) blurOffensiveImages();
    });
  });
});

observer.observe(document.body, { childList: true, subtree: true });
