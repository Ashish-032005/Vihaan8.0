// content.js

const offensiveWords = [
    "nudes", "hot", "underwear", "young", "lady", "nude", "kutta", "kamina", "bkl", "bhenchod", "madarchod", "mc", "bc",
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

// const API_BASE = "http://localhost:5000/api";

// // --- Text Detection via Model ---
// async function checkTextAndClean(node) {
//   if (node.nodeType === 3) {
//     const text = node.nodeValue.trim();
//     if (text.length > 2) {
//       try {
//         const res = await fetch(`${API_BASE}/check-text`, {
//           method: "POST",
//           headers: { "Content-Type": "application/json" },
//           body: JSON.stringify({ text }),
//         });
//         const data = await res.json();
//         if (data.offensive) {
//           node.parentNode.style.display = "none";
//         }
//       } catch (err) {
//         console.error("Text API error:", err);
//       }
//     }
//   } else {
//     node.childNodes.forEach(checkTextAndClean);
//   }
// }

// // --- Image Detection via Model ---
// async function checkImage(img) {
//   try {
//     const src = img.src;

//     const res = await fetch(`${API_BASE}/check-image`, {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({ src }),
//     });

//     const data = await res.json();
//     if (data.offensive) {
//       img.style.filter = "blur(10px)";
//     }
//   } catch (err) {
//     console.error("Image API error:", err);
//   }
// }

// // Run text + image check on page load
// document.querySelectorAll("*").forEach(checkTextAndClean);
// document.querySelectorAll("img").forEach(checkImage);

// // Mutation Observer for dynamic changes
// const observer = new MutationObserver((mutations) => {
//   mutations.forEach((mutation) => {
//     mutation.addedNodes.forEach((node) => {
//       if (node.nodeType === 1) {
//         node.querySelectorAll("*").forEach(checkTextAndClean);
//         node.querySelectorAll("img").forEach(checkImage);
//       } else {
//         checkTextAndClean(node);
//       }
//     });
//   });
// });

// observer.observe(document.body, { childList: true, subtree: true });
