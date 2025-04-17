
import { useState, useEffect } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Lock, Shield, Clock, Activity, Search, Users, Bell, Eye, CheckCircle, XCircle } from "lucide-react";
import { toast } from "@/hooks/use-toast";

export const DashboardPreview = () => {
  const [activeTab, setActiveTab] = useState("parent");
  const [screenTime, setScreenTime] = useState(204); // in minutes
  const [dailyLimit, setDailyLimit] = useState(300); // in minutes
  const [percentUsed, setPercentUsed] = useState(68);
  const [recentSearches, setRecentSearches] = useState([
    "how to do math homework",
    "science project ideas",
    "educational games"
  ]);
  const [alertsHandled, setAlertsHandled] = useState(false);
  const [blockWebsite, setBlockWebsite] = useState("");
  
  useEffect(() => {
    // Calculate percentage used
    const newPercent = Math.floor((screenTime / dailyLimit) * 100);
    setPercentUsed(newPercent);
  }, [screenTime, dailyLimit]);
  
  const formatTime = (minutes) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hours}h ${mins}m`;
  };
  
  const handleAddTime = () => {
    if (screenTime < dailyLimit) {
      setScreenTime(prev => prev + 30);
      toast({
        title: "Screen time added",
        description: "Added 30 minutes of screen time",
      });
    }
  };
  
  const handleReduceTime = () => {
    if (screenTime >= 30) {
      setScreenTime(prev => prev - 30);
      toast({
        title: "Screen time reduced",
        description: "Reduced screen time by 30 minutes",
      });
    }
  };
  
  const handleBlockWebsite = (e) => {
    e.preventDefault();
    if (blockWebsite.trim()) {
      toast({
        title: "Website blocked",
        description: `${blockWebsite} has been added to blocked sites`,
      });
      setBlockWebsite("");
    }
  };
  
  const handleDismissAlerts = () => {
    setAlertsHandled(true);
    toast({
      title: "Alerts handled",
      description: "All alerts have been dismissed",
    });
  };
  
  const handleClearSearches = () => {
    setRecentSearches([]);
    toast({
      title: "Search history cleared",
      description: "Recent searches have been cleared",
    });
  };

  return (
    <div className="bg-[#171723] rounded-xl shadow-lg border border-[#2A2A3C] overflow-hidden relative">
      <div className="scanline"></div>
      
      <Tabs defaultValue="parent" onValueChange={setActiveTab}>
        <div className="bg-[#11111D] px-4 py-3 border-b border-[#2A2A3C]">
          <TabsList className="grid w-full max-w-md grid-cols-2 bg-[#1E1E2C]">
            <TabsTrigger 
              value="parent" 
              className={activeTab === "parent" ? "text-cipher-purple data-[state=active]:bg-[#252536] data-[state=active]:text-white data-[state=active]:shadow-[0_0_10px_rgba(139,92,246,0.5)]" : ""}
            >
              Parent Dashboard
            </TabsTrigger>
            <TabsTrigger 
              value="child" 
              className={activeTab === "child" ? "text-cipher-blue data-[state=active]:bg-[#252536] data-[state=active]:text-white data-[state=active]:shadow-[0_0_10px_rgba(30,174,219,0.5)]" : ""}
            >
              Child View
            </TabsTrigger>
          </TabsList>
        </div>
        
        <TabsContent value="parent" className="p-0">
          <div className="p-4 md:p-6 grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="dashboard-card col-span-3 md:col-span-2">
              <div className="flex justify-between items-center mb-4">
                <h3 className="font-semibold text-white neon-text">Activity Overview</h3>
                <span className="text-xs text-cyan-400">Today</span>
              </div>
              <div className="h-40 bg-[#11111D] rounded-lg flex items-center justify-center">
                <Activity className="h-8 w-8 text-cipher-purple opacity-80" />
              </div>
            </div>
            
            <div className="dashboard-card col-span-3 md:col-span-1">
              <div className="flex justify-between items-center mb-3">
                <h3 className="font-semibold text-white neon-text">Alerts</h3>
                {!alertsHandled && (
                  <button 
                    onClick={handleDismissAlerts}
                    className="text-xs bg-[#11111D] text-cyan-400 px-2 py-1 rounded hover:bg-[#1E1E2C] transition-colors"
                  >
                    Handle All
                  </button>
                )}
              </div>
              <div className="space-y-3">
                {!alertsHandled ? (
                  <>
                    <div className="bg-[#2D1A1A] text-red-400 p-3 rounded-lg text-sm flex items-start border border-red-900/50">
                      <Bell className="h-4 w-4 mr-2 mt-0.5 flex-shrink-0" />
                      <span>Attempted access to blocked site</span>
                    </div>
                    <div className="bg-[#2D2A1A] text-yellow-400 p-3 rounded-lg text-sm flex items-start border border-yellow-900/50">
                      <Clock className="h-4 w-4 mr-2 mt-0.5 flex-shrink-0" />
                      <span>Screen time limit approaching</span>
                    </div>
                  </>
                ) : (
                  <div className="bg-[#11111D] p-4 rounded-lg flex items-center justify-center">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                    <span className="text-green-400 text-sm">All alerts handled</span>
                  </div>
                )}
              </div>
            </div>
            
            <div className="dashboard-card col-span-3 md:col-span-1">
              <div className="flex justify-between items-center mb-3">
                <h3 className="font-semibold text-white neon-text">Recent Searches</h3>
                {recentSearches.length > 0 && (
                  <button 
                    onClick={handleClearSearches}
                    className="text-xs bg-[#11111D] text-cyan-400 px-2 py-1 rounded hover:bg-[#1E1E2C] transition-colors"
                  >
                    Clear
                  </button>
                )}
              </div>
              <div className="space-y-2">
                {recentSearches.length > 0 ? (
                  recentSearches.map((search, index) => (
                    <div key={index} className="flex items-center p-2 bg-[#11111D] rounded-lg border border-[#2A2A3C]/50">
                      <Search className="h-4 w-4 text-cyan-400 mr-2" />
                      <span className="text-sm truncate">{search}</span>
                    </div>
                  ))
                ) : (
                  <div className="bg-[#11111D] p-4 rounded-lg flex items-center justify-center">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                    <span className="text-green-400 text-sm">No recent searches</span>
                  </div>
                )}
              </div>
            </div>
            
            <div className="dashboard-card col-span-3 md:col-span-1">
              <h3 className="font-semibold mb-3 text-white neon-text">Time Management</h3>
              <div className="space-y-2">
                <div className="bg-[#11111D] p-3 rounded-lg border border-[#2A2A3C]/50">
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-sm font-medium text-white">Today's usage</span>
                    <span className="text-xs text-cyan-400">{formatTime(screenTime)}</span>
                  </div>
                  <div className="w-full bg-[#0D0D14] rounded-full h-2 mb-2">
                    <div 
                      className="bg-cipher-blue h-2 rounded-full" 
                      style={{ width: `${percentUsed}%` }}
                    ></div>
                  </div>
                  <div className="flex justify-between">
                    <button 
                      onClick={handleReduceTime} 
                      className="text-xs bg-[#1E1E2C] text-red-400 px-2 py-1 rounded hover:bg-[#252536] transition-colors"
                    >
                      -30m
                    </button>
                    <button 
                      onClick={handleAddTime} 
                      className="text-xs bg-[#1E1E2C] text-green-400 px-2 py-1 rounded hover:bg-[#252536] transition-colors"
                    >
                      +30m
                    </button>
                  </div>
                </div>
                <div className="bg-[#11111D] p-3 rounded-lg border border-[#2A2A3C]/50">
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-sm font-medium text-white">Daily limit</span>
                    <span className="text-xs text-white">{formatTime(dailyLimit)}</span>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="dashboard-card col-span-3 md:col-span-1">
              <h3 className="font-semibold mb-3 text-white neon-text">Website Categories</h3>
              <div className="space-y-2">
                <div className="flex justify-between items-center p-2 bg-[#11231D] rounded-lg border border-green-900/50">
                  <span className="text-sm text-white">Education</span>
                  <span className="text-xs bg-green-900/50 text-green-400 py-0.5 px-2 rounded-full">Allowed</span>
                </div>
                <div className="flex justify-between items-center p-2 bg-[#2D1A1A] rounded-lg border border-red-900/50">
                  <span className="text-sm text-white">Gaming</span>
                  <span className="text-xs bg-red-900/50 text-red-400 py-0.5 px-2 rounded-full">Blocked</span>
                </div>
                <div className="flex justify-between items-center p-2 bg-[#2D2A1A] rounded-lg border border-yellow-900/50">
                  <span className="text-sm text-white">Social Media</span>
                  <span className="text-xs bg-yellow-900/50 text-yellow-400 py-0.5 px-2 rounded-full">Limited</span>
                </div>
              </div>
            </div>
            
            <div className="dashboard-card col-span-3">
              <h3 className="font-semibold mb-3 text-white neon-text">Block Website</h3>
              <form onSubmit={handleBlockWebsite} className="flex items-center gap-2">
                <input 
                  type="text" 
                  value={blockWebsite}
                  onChange={(e) => setBlockWebsite(e.target.value)}
                  placeholder="Enter website URL to block" 
                  className="flex-1 bg-[#11111D] border border-[#2A2A3C] rounded p-2 text-white focus:outline-none focus:border-cipher-purple/50 focus:ring-1 focus:ring-cipher-purple/50"
                />
                <button 
                  type="submit"
                  className="bg-red-900/50 text-red-400 px-3 py-2 rounded hover:bg-red-800/50 transition-colors"
                >
                  Block Site
                </button>
              </form>
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="child" className="p-0">
          <div className="p-4 md:p-6 flex flex-col items-center">
            <div className="max-w-md w-full">
              <div className="flex items-center justify-center flex-col mb-6">
                <Shield className="h-12 w-12 text-cipher-blue mb-2 animate-pulse" />
                <h3 className="text-lg font-semibold text-white neon-blue-text">CipherGuard is protecting you</h3>
                <p className="text-sm text-center text-gray-400">We're making sure you stay safe online</p>
              </div>
              
              <div className="dashboard-card mb-4 border border-cyan-900/30">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <Clock className="h-5 w-5 text-cipher-blue mr-3" />
                    <div>
                      <h4 className="font-medium text-white">Screen Time</h4>
                      <p className="text-xs text-gray-400">{formatTime(dailyLimit - screenTime)} remaining today</p>
                    </div>
                  </div>
                  <div className="bg-[#11111D] rounded-full h-8 w-8 flex items-center justify-center">
                    <span className="text-xs font-medium text-cyan-400">{percentUsed}%</span>
                  </div>
                </div>
              </div>
              
              <div className="dashboard-card border border-cyan-900/30">
                <div className="flex items-center mb-3">
                  <Eye className="h-5 w-5 text-cipher-blue mr-3" />
                  <h4 className="font-medium text-white">Protected from:</h4>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <div className="bg-[#11111D] p-2 rounded-lg flex items-center text-sm border border-[#2A2A3C]/50">
                    <Lock className="h-4 w-4 text-cyan-400 mr-2" />
                    <span className="text-gray-300">Harmful content</span>
                  </div>
                  <div className="bg-[#11111D] p-2 rounded-lg flex items-center text-sm border border-[#2A2A3C]/50">
                    <Users className="h-4 w-4 text-cyan-400 mr-2" />
                    <span className="text-gray-300">Cyberbullying</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};
