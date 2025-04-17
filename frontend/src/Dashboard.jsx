import React, { useState, useEffect } from 'react';
import './App.css'
const Dashboard = () => {
  // Initial state with visited URLs and time spent
  const [visitedUrls, setVisitedUrls] = useState([
    { url: 'www.example1.com', timeSpent: 5, timeCap: null },
    { url: 'www.example2.com', timeSpent: 10, timeCap: null }
  ]);

  const handleTimeCapChange = (index, value) => {
    // Update the time cap for a specific URL
    const newVisitedUrls = [...visitedUrls];
    newVisitedUrls[index].timeCap = value;
    setVisitedUrls(newVisitedUrls);
  };

  const updateTimeSpent = () => {
    // Increment time spent for each URL and check if it exceeds the time cap
    const newVisitedUrls = visitedUrls.map((entry) => {
      if (entry.timeCap && entry.timeSpent >= entry.timeCap) {
        alert(`Time limit exceeded for ${entry.url}. Closing the website...`);
        // Logic to close the website (can be done using the Chrome extension API)
        // chrome.tabs.query({ url: entry.url }, (tabs) => {
        //     tabs.forEach((tab) => {
        //         chrome.tabs.remove(tab.id);
        //     });
        // });
      } else {
        entry.timeSpent += 1; // Simulate time passing (this can be based on actual time spent)
      }
      return entry;
    });
    setVisitedUrls(newVisitedUrls);
  };

  useEffect(() => {
    // Update every minute (or any interval you prefer)
    const interval = setInterval(updateTimeSpent, 60000); // 1 minute interval
    return () => clearInterval(interval); // Clear interval when the component unmounts
  }, [visitedUrls]);

  return (
    <div id="dashboard">
      <h2>Parent Dashboard</h2>
      <table>
        <thead>
          <tr>
            <th>URL</th>
            <th>Time Spent (mins)</th>
            <th>Set Time Cap</th>
          </tr>
        </thead>
        <tbody>
          {visitedUrls.map((entry, index) => (
            <tr key={index}>
              <td>{entry.url}</td>
              <td>{entry.timeSpent} mins</td>
              <td>
                <input
                  type="number"
                  value={entry.timeCap || ''}
                  onChange={(e) => handleTimeCapChange(index, parseInt(e.target.value))}
                  placeholder="Set cap in mins"
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Dashboard;
