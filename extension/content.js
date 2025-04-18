const offensiveWords = [
  "nudes", "hot", "underwear", "young", "lady", "nude", "kutta", "kamina", "bkl",
  "bhenchod", "madarchod", "mc", "bc", "chutiya", "gandu", "randi", "harami",
  "saala", "gaand", "fuck", "fucker", "shit", "bastard", "bloody", "suar",
  "kutti", "jhant", "lund", "gaand", "chod", "chodu", "lavda"
];

// Text Detection & Removal
function cleanText(node) {
  if (node.nodeType === 3) {
    const regex = new RegExp(offensiveWords.join("|"), "gi");
    if (regex.test(node.nodeValue)) {
      node.parentNode.style.display = "none";
    }
  } else {
    node.childNodes.forEach(cleanText);
  }
}

// Image Detection & Blurring
function blurOffensiveImages() {
  document.querySelectorAll("img").forEach((img) => {
    const altText = img.alt.toLowerCase();
    if (offensiveWords.some(word => altText.includes(word))) {
      img.classList.add("blurred-safe");
    }
  });
}

// Use JWT Token for API call
// function makeApiCallWithJWT() {
//   chrome.storage.local.get("jwtToken", ({ jwtToken }) => {
//     if (!jwtToken) return;

//     fetch("https://api.example.com/protected", {
//       headers: {
//         Authorization: `Bearer ${jwtToken}`
//       }
//     })
//     .then(res => res.json())
//     .then(data => {
//       console.log("API response:", data);
//     })
//     .catch(err => console.error("API error:", err));
//   });
// }

// Initial actions
cleanText(document.body);
blurOffensiveImages();
makeApiCallWithJWT();

// Observe dynamic content
const observer = new MutationObserver((mutations) => {
  mutations.forEach((mutation) => {
    mutation.addedNodes.forEach((node) => {
      cleanText(node);
      if (node.nodeType === 1) blurOffensiveImages();
    });
  });
});
observer.observe(document.body, { childList: true, subtree: true });
