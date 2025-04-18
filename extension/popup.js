const getFromStorage = (key) => {
  return new Promise((resolve) => {
    chrome.storage.local.get(key, (result) => {
      const token = result[key];
      if (!token) {
        console.log("No JWT token found.");
      } else {
        console.log("Found token:", token);
      }
      resolve(token);
    });
  });
};

const setInStorage = (key, value) => {
  return new Promise((resolve) => {
    chrome.storage.local.set({ [key]: value }, resolve);
  });
};

document.getElementById("saveToken").addEventListener("click", async () => {
  const token = document.getElementById("jwtToken").value;
  console.log("Token entered:", token);

  await setInStorage("token", token);
  alert("Token saved! " + token);

  const storedToken = await getFromStorage("token");
  console.log("Stored token:", storedToken);
});
