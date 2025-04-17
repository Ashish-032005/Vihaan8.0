// Called from extension to send current URL
export const monitorUrl = async (req, res) => {
    const { domain, category = "general", timeSpent = 5 } = req.body;
  
    const monitored = req.child.monitoredUrls.find(url => url.domain === domain);
  
    if (monitored) {
      monitored.timeSpent += timeSpent;
    } else {
      req.child.monitoredUrls.push({ domain, category, timeSpent });
    }
  
    await req.child.save();
    res.status(200).json({ message: "URL updated" });
  };
  
// Called from extension when incognito detected without permission
export const alertIncognito = async (req, res) => {
    const { url } = req.body;
  
    // Optional: avoid duplicates by checking last entry or timestamp logic
    req.child.incognitoAlerts.push({
      url,
      timestamp: new Date()
    });
  
    await req.child.save();
  
    console.log("Incognito usage alert from:", req.child.name, "URL:", url);
  
    res.status(200).json({ message: "Incognito alert stored" });
  };
  
  