// Helper to promisify chrome.storage.local.get
const getFromStorage = (key) => {
    return new Promise((resolve) => {
      chrome.storage.local.get(key, (result) => resolve(result[key]));
    });
  };
  // Helper to promisify chrome.storage.local.set
  const setInStorage = (key, value) => {
    return new Promise((resolve) => {
      chrome.storage.local.set({ [key]: value }, resolve);
    });
  };
  
  document.getElementById("saveToken").addEventListener("click", async () => {
    const token = document.getElementById("jwtToken").value;
    console.log("Token entered:", token);

  
    await setInStorage("token"+ token);
    alert("Token saved!",token);
  
    const storedToken = await getFromStorage("token");
    console.log("Stored token:", storedToken);
  });
  