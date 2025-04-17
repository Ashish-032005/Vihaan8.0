
import { Activity, Calendar, Clock, Search, AlertTriangle, ExternalLink, ArrowDownCircle, CheckCircle, XCircle } from "lucide-react";
import { useState } from "react";
import { toast } from "@/hooks/use-toast";

export const ActivityMonitor = () => {
  const [timeFrame, setTimeFrame] = useState("today");
  const [activityType, setActivityType] = useState("all");
  const [activities, setActivities] = useState([
    { 
      id: 1, 
      type: "search", 
      content: "homework help science",  
      time: "10:32 AM", 
      status: "safe",
      device: "Laptop",
    },
    { 
      id: 2, 
      type: "website", 
      content: "wikipedia.org/Solar_System",  
      time: "10:45 AM", 
      status: "safe",
      device: "Laptop", 
    },
    { 
      id: 3, 
      type: "app", 
      content: "Minecraft", 
      time: "11:20 AM", 
      status: "limited",
      device: "Tablet", 
    },
    { 
      id: 4, 
      type: "alert", 
      content: "Attempted access to blocked site", 
      time: "01:15 PM", 
      status: "blocked",
      device: "Phone", 
    },
    { 
      id: 5, 
      type: "download", 
      content: "science_project.pdf", 
      time: "02:30 PM", 
      status: "safe",
      device: "Laptop", 
    }
  ]);
  
  const getActivityIcon = (type: string) => {
    switch (type) {
      case "search": return Search;
      case "website": return ExternalLink;
      case "app": return Activity;
      case "alert": return AlertTriangle;
      case "download": return ArrowDownCircle;
      default: return Activity;
    }
  };
  
  const getStatusBadge = (status: string) => {
    switch (status) {
      case "safe":
        return <span className="text-xs bg-green-900/20 text-green-400 px-2 py-0.5 rounded-full flex items-center"><CheckCircle className="h-3 w-3 mr-1" /> Safe</span>;
      case "limited":
        return <span className="text-xs bg-yellow-900/20 text-yellow-400 px-2 py-0.5 rounded-full flex items-center"><Clock className="h-3 w-3 mr-1" /> Limited</span>;
      case "blocked":
        return <span className="text-xs bg-red-900/20 text-red-400 px-2 py-0.5 rounded-full flex items-center"><XCircle className="h-3 w-3 mr-1" /> Blocked</span>;
      default:
        return <span className="text-xs bg-gray-900/20 text-gray-400 px-2 py-0.5 rounded-full">Unknown</span>;
    }
  };
  
  const filteredActivities = activities.filter(activity => {
    if (activityType === "all") return true;
    return activity.type === activityType;
  });
  
  const exportReport = () => {
    toast({
      title: "Export Report",
      description: "Activity report has been exported to PDF",
    });
  };
  
  const clearHistory = () => {
    toast({
      title: "Confirm action",
      description: "Are you sure you want to clear activity history?",
    });
  };

  return (
    <div className="glass-card p-6">
      <h3 className="text-xl font-bold mb-6 neon-blue-text">Activity Monitor</h3>
      
      <div className="mb-6 flex flex-wrap gap-4 justify-between items-center">
        <div className="flex items-center space-x-3">
          <select 
            value={timeFrame}
            onChange={(e) => setTimeFrame(e.target.value)}
            className="p-2 bg-[#11111D] rounded-lg border border-[#2A2A3C] text-white text-sm"
          >
            <option value="today">Today</option>
            <option value="yesterday">Yesterday</option>
            <option value="week">Last 7 days</option>
            <option value="month">Last 30 days</option>
          </select>
          
          <select 
            value={activityType}
            onChange={(e) => setActivityType(e.target.value)}
            className="p-2 bg-[#11111D] rounded-lg border border-[#2A2A3C] text-white text-sm"
          >
            <option value="all">All Activities</option>
            <option value="search">Searches</option>
            <option value="website">Websites</option>
            <option value="app">Apps</option>
            <option value="alert">Alerts</option>
            <option value="download">Downloads</option>
          </select>
        </div>
        
        <div className="flex space-x-3">
          <button
            onClick={exportReport}
            className="text-xs bg-[#1E1E2C] text-cyan-400 px-3 py-1.5 rounded hover:bg-[#252536] transition-colors flex items-center"
          >
            <Calendar className="h-3.5 w-3.5 mr-1.5" />
            Export
          </button>
          
          <button
            onClick={clearHistory}
            className="text-xs bg-[#1E1E2C] text-red-400 px-3 py-1.5 rounded hover:bg-[#252536] transition-colors"
          >
            Clear History
          </button>
        </div>
      </div>
      
      <div className="bg-[#11111D] rounded-lg border border-[#2A2A3C] overflow-hidden">
        <div className="grid grid-cols-12 p-3 border-b border-[#2A2A3C] bg-[#1E1E2C] text-xs font-medium text-gray-400">
          <div className="col-span-5 sm:col-span-6">Activity</div>
          <div className="col-span-3 sm:col-span-2">Time</div>
          <div className="col-span-2 hidden sm:block">Device</div>
          <div className="col-span-4 sm:col-span-2">Status</div>
        </div>
        
        <div className="max-h-[380px] overflow-y-auto">
          {filteredActivities.length > 0 ? (
            filteredActivities.map(activity => {
              const ActivityIcon = getActivityIcon(activity.type);
              
              return (
                <div 
                  key={activity.id}
                  className="grid grid-cols-12 p-3 border-b border-[#2A2A3C] last:border-0 hover:bg-[#1E1E2C]/50 transition-colors"
                >
                  <div className="col-span-5 sm:col-span-6 flex items-center">
                    <div className={`h-8 w-8 rounded flex items-center justify-center mr-3 ${
                      activity.status === "safe" ? "bg-green-900/10 text-green-400" :
                      activity.status === "limited" ? "bg-yellow-900/10 text-yellow-400" :
                      "bg-red-900/10 text-red-400"
                    }`}>
                      <ActivityIcon className="h-4 w-4" />
                    </div>
                    <span className="text-sm truncate">{activity.content}</span>
                  </div>
                  
                  <div className="col-span-3 sm:col-span-2 flex items-center text-xs text-gray-400">
                    <Clock className="h-3 w-3 mr-1.5 flex-shrink-0" />
                    {activity.time}
                  </div>
                  
                  <div className="col-span-2 hidden sm:flex items-center text-xs text-gray-400">
                    {activity.device}
                  </div>
                  
                  <div className="col-span-4 sm:col-span-2 flex items-center justify-end sm:justify-start">
                    {getStatusBadge(activity.status)}
                  </div>
                </div>
              );
            })
          ) : (
            <div className="p-6 text-center text-gray-400">
              No activities found for the selected filters
            </div>
          )}
        </div>
      </div>
      
      <div className="mt-4 text-center">
        <button 
          className="text-cipher-blue hover:text-cipher-blue-light transition-colors text-sm"
          onClick={() => {
            toast({
              title: "Loading",
              description: "Loading more activities...",
            });
          }}
        >
          Load more activities
        </button>
      </div>
    </div>
  );
};
