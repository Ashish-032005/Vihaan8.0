import { useState } from "react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { DashboardControls } from "@/components/DashboardControls";
import { SectionHeading } from "@/components/SectionHeading";
import { DashboardPreview } from "@/components/DashboardPreview";
import { UserProfile } from "@/components/UserProfile";
import { DashboardStats } from "@/components/DashboardStats";
import { DeviceList } from "@/components/DeviceList";
import { ProtectionStatus } from "@/components/ProtectionStatus";
import { ActivityMonitor } from "@/components/ActivityMonitor";
import { Button } from "@/components/Button";
import { 
  Activity, 
  Bell, 
  Clock as LucideClock, 
  Download, 
  FileText, 
  RefreshCw, 
  Save, 
  Settings, 
  Shield as LucidShield, 
  Users 
} from "lucide-react";
import { toast } from "@/hooks/use-toast";

const Dashboard = () => {
  const [activeView, setActiveView] = useState("overview");
  const [isRefreshing, setIsRefreshing] = useState(false);

  const handleRefresh = () => {
    setIsRefreshing(true);
    toast({
      title: "Refreshing dashboard",
      description: "Getting the latest data...",
    });
    
    setTimeout(() => {
      setIsRefreshing(false);
      toast({
        title: "Dashboard updated",
        description: "All data is now up to date",
      });
    }, 2000);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1 py-20 px-6 md:px-12 lg:px-24">
        <div className="max-w-7xl mx-auto mt-8">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
            <SectionHeading
              title="CipherGuard Dashboard"
              subtitle="Monitor and protect your child's online activities"
              glowColor="blue"
            />
            
            <div className="flex flex-wrap gap-3">
              <Button 
                variant="outline" 
                size="sm" 
                className="flex items-center"
                onClick={() => {
                  toast({
                    title: "Generate report",
                    description: "Generating detailed activity report...",
                  });
                }}
              >
                <FileText className="h-4 w-4 mr-2" />
                Generate Report
              </Button>
              
              <Button 
                variant="blue" 
                size="sm" 
                className="flex items-center"
                onClick={handleRefresh}
                disabled={isRefreshing}
              >
                <RefreshCw className={`h-4 w-4 mr-2 ${isRefreshing ? 'animate-spin' : ''}`} />
                {isRefreshing ? 'Refreshing...' : 'Refresh Data'}
              </Button>
            </div>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 mb-12">
            <div className="lg:col-span-1 space-y-6">
              <UserProfile />
              <DashboardControls activeView={activeView} setActiveView={setActiveView} />
              <ProtectionStatus isActive={true} />
            </div>
            
            <div className="lg:col-span-3 space-y-6">
              {activeView === "overview" && (
                <>
                  <DashboardStats />
                  <DashboardPreview />
                  <ActivityMonitor />
                </>
              )}
              
              {activeView === "devices" && (
                <DeviceList />
              )}
              
              {activeView === "protect" && (
                <div className="glass-card p-6">
                  <h3 className="text-xl font-bold mb-6 neon-blue-text">Protection Settings</h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    <div className="bg-[#11111D] p-4 rounded-lg border border-[#2A2A3C]">
                      <h4 className="font-medium mb-3 text-cyan-400 flex items-center">
                        <LucidShield className="h-4 w-4 mr-2" />
                        Content Filtering
                      </h4>
                      <div className="space-y-3">
                        <div className="flex justify-between items-center">
                          <span className="text-sm">Block adult content</span>
                          <div className="h-6 w-11 bg-green-900/30 rounded-full relative">
                            <div className="h-5 w-5 bg-green-500 rounded-full absolute top-0.5 right-0.5"></div>
                          </div>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-sm">Block violence</span>
                          <div className="h-6 w-11 bg-green-900/30 rounded-full relative">
                            <div className="h-5 w-5 bg-green-500 rounded-full absolute top-0.5 right-0.5"></div>
                          </div>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-sm">Filter profanity</span>
                          <div className="h-6 w-11 bg-green-900/30 rounded-full relative">
                            <div className="h-5 w-5 bg-green-500 rounded-full absolute top-0.5 right-0.5"></div>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="bg-[#11111D] p-4 rounded-lg border border-[#2A2A3C]">
                      <h4 className="font-medium mb-3 text-cyan-400 flex items-center">
                        <LucideClock className="h-4 w-4 mr-2" />
                        Time Restrictions
                      </h4>
                      <div className="space-y-3">
                        <div className="flex justify-between items-center">
                          <span className="text-sm">School hours blocking</span>
                          <div className="h-6 w-11 bg-green-900/30 rounded-full relative">
                            <div className="h-5 w-5 bg-green-500 rounded-full absolute top-0.5 right-0.5"></div>
                          </div>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-sm">Bedtime restrictions</span>
                          <div className="h-6 w-11 bg-green-900/30 rounded-full relative">
                            <div className="h-5 w-5 bg-green-500 rounded-full absolute top-0.5 right-0.5"></div>
                          </div>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-sm">Weekend limits</span>
                          <div className="h-6 w-11 bg-[#1E1E2C] rounded-full relative">
                            <div className="h-5 w-5 bg-gray-500 rounded-full absolute top-0.5 left-0.5"></div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-[#11111D] p-4 rounded-lg border border-[#2A2A3C] mb-6">
                    <h4 className="font-medium mb-3 text-cyan-400">AI Protection Levels</h4>
                    <div className="space-y-4">
                      <div>
                        <div className="flex justify-between items-center mb-1">
                          <span className="text-sm">Image Analysis</span>
                          <span className="text-xs text-cyan-400">High</span>
                        </div>
                        <div className="w-full bg-[#1E1E2C] rounded-full h-2">
                          <div className="bg-cipher-blue h-2 rounded-full" style={{ width: "90%" }}></div>
                        </div>
                      </div>
                      <div>
                        <div className="flex justify-between items-center mb-1">
                          <span className="text-sm">Text Analysis</span>
                          <span className="text-xs text-cyan-400">Medium</span>
                        </div>
                        <div className="w-full bg-[#1E1E2C] rounded-full h-2">
                          <div className="bg-cipher-blue h-2 rounded-full" style={{ width: "65%" }}></div>
                        </div>
                      </div>
                      <div>
                        <div className="flex justify-between items-center mb-1">
                          <span className="text-sm">Behavioral Analysis</span>
                          <span className="text-xs text-cyan-400">Low</span>
                        </div>
                        <div className="w-full bg-[#1E1E2C] rounded-full h-2">
                          <div className="bg-cipher-blue h-2 rounded-full" style={{ width: "40%" }}></div>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex justify-between">
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => {
                        toast({
                          title: "Reset settings",
                          description: "Are you sure you want to reset all protection settings?",
                        });
                      }}
                    >
                      Reset to Default
                    </Button>
                    <Button 
                      variant="blue" 
                      size="sm"
                      onClick={() => {
                        toast({
                          title: "Settings saved",
                          description: "Your protection settings have been updated",
                        });
                      }}
                    >
                      <Save className="h-4 w-4 mr-2" />
                      Save Settings
                    </Button>
                  </div>
                </div>
              )}
              
              {activeView === "profiles" && (
                <div className="glass-card p-6">
                  <h3 className="text-xl font-bold mb-6 neon-blue-text">Profile Management</h3>
                  
                  <div className="bg-[#11111D] rounded-lg border border-[#2A2A3C] mb-6">
                    <div className="p-4 border-b border-[#2A2A3C]">
                      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                        <div className="flex items-center space-x-4">
                          <div className="h-12 w-12 rounded-full bg-cipher-purple/20 flex items-center justify-center">
                            <span className="text-lg text-white">E</span>
                          </div>
                          <div>
                            <h4 className="font-medium text-white">Emma</h4>
                            <span className="text-sm text-green-400">Protected • Online</span>
                          </div>
                        </div>
                        
                        <div className="flex space-x-2">
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={() => {
                              toast({
                                title: "Edit profile",
                                description: "Opening profile editor...",
                              });
                            }}
                          >
                            Edit
                          </Button>
                          <Button 
                            variant="blue" 
                            size="sm"
                            onClick={() => {
                              toast({
                                title: "View profile",
                                description: "Viewing Emma's full profile and activity",
                              });
                            }}
                          >
                            View
                          </Button>
                        </div>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-3 border-b border-[#2A2A3C]">
                      <div className="p-4 border-b sm:border-b-0 sm:border-r border-[#2A2A3C]">
                        <h5 className="text-sm font-medium text-gray-400 mb-1">Age</h5>
                        <span>12 years</span>
                      </div>
                      <div className="p-4 border-b sm:border-b-0 sm:border-r border-[#2A2A3C]">
                        <h5 className="text-sm font-medium text-gray-400 mb-1">Protection Level</h5>
                        <span className="text-cyan-400">High</span>
                      </div>
                      <div className="p-4">
                        <h5 className="text-sm font-medium text-gray-400 mb-1">Devices</h5>
                        <span>2 devices</span>
                      </div>
                    </div>
                    
                    <div className="p-4">
                      <h5 className="text-sm font-medium text-gray-400 mb-2">Time Usage Today</h5>
                      <div className="w-full bg-[#1E1E2C] rounded-full h-2 mb-1">
                        <div className="bg-cipher-blue h-2 rounded-full" style={{ width: "65%" }}></div>
                      </div>
                      <div className="flex justify-between items-center text-xs">
                        <span>3h 15m used</span>
                        <span>5h daily limit</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex justify-between mb-6">
                    <h4 className="font-medium">Add New Profile</h4>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="text-cyan-400 border-cyan-500/30"
                      onClick={() => {
                        toast({
                          title: "Create profile",
                          description: "Opening profile creation wizard...",
                        });
                      }}
                    >
                      <Users className="h-4 w-4 mr-2" />
                      New Profile
                    </Button>
                  </div>
                  
                  <div className="bg-[#11111D] rounded-lg border border-[#2A2A3C] border-dashed p-6 flex flex-col items-center justify-center text-center">
                    <Users className="h-12 w-12 text-gray-500 mb-2" />
                    <h5 className="font-medium text-gray-400 mb-1">Add another child profile</h5>
                    <p className="text-sm text-gray-500 mb-4">Monitor and protect all your children with CipherGuard</p>
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => {
                        toast({
                          title: "Create profile",
                          description: "Opening profile creation wizard...",
                        });
                      }}
                    >
                      Create New Profile
                    </Button>
                  </div>
                </div>
              )}
              
              {activeView === "reports" && (
                <div className="glass-card p-6">
                  <h3 className="text-xl font-bold mb-6 neon-blue-text">Activity Reports</h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    <div className="bg-[#11111D] p-4 rounded-lg border border-[#2A2A3C]">
                      <h4 className="font-medium mb-3 text-cyan-400">Weekly Summary</h4>
                      <p className="text-sm text-gray-400 mb-4">Overview of activities from the past 7 days</p>
                      <div className="h-36 bg-[#1E1E2C] rounded-lg flex items-center justify-center">
                        <Activity className="h-8 w-8 text-cipher-purple opacity-80" />
                      </div>
                      <div className="mt-4 flex justify-end">
                        <Button variant="outline" size="sm" className="flex items-center">
                          <Download className="h-4 w-4 mr-2" />
                          Download PDF
                        </Button>
                      </div>
                    </div>
                    
                    <div className="bg-[#11111D] p-4 rounded-lg border border-[#2A2A3C]">
                      <h4 className="font-medium mb-3 text-cyan-400">Monthly Analysis</h4>
                      <p className="text-sm text-gray-400 mb-4">Detailed analysis of online behavior patterns</p>
                      <div className="h-36 bg-[#1E1E2C] rounded-lg flex items-center justify-center">
                        <Activity className="h-8 w-8 text-cipher-blue opacity-80" />
                      </div>
                      <div className="mt-4 flex justify-end">
                        <Button variant="outline" size="sm" className="flex items-center">
                          <Download className="h-4 w-4 mr-2" />
                          Download PDF
                        </Button>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-[#11111D] rounded-lg border border-[#2A2A3C] mb-6">
                    <div className="p-4 border-b border-[#2A2A3C]">
                      <h4 className="font-medium text-cyan-400">Custom Reports</h4>
                    </div>
                    
                    <div className="p-4">
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                        <div>
                          <label className="text-sm text-gray-400 block mb-1">Date Range</label>
                          <select className="w-full p-2 bg-[#1E1E2C] rounded-lg border border-[#2A2A3C] text-white text-sm">
                            <option>Last 7 days</option>
                            <option>Last 30 days</option>
                            <option>Last 90 days</option>
                            <option>Custom range</option>
                          </select>
                        </div>
                        
                        <div>
                          <label className="text-sm text-gray-400 block mb-1">Report Type</label>
                          <select className="w-full p-2 bg-[#1E1E2C] rounded-lg border border-[#2A2A3C] text-white text-sm">
                            <option>All activity</option>
                            <option>Websites only</option>
                            <option>Search history</option>
                            <option>Apps usage</option>
                            <option>Alerts & blocks</option>
                          </select>
                        </div>
                        
                        <div>
                          <label className="text-sm text-gray-400 block mb-1">Format</label>
                          <select className="w-full p-2 bg-[#1E1E2C] rounded-lg border border-[#2A2A3C] text-white text-sm">
                            <option>PDF Report</option>
                            <option>CSV Export</option>
                            <option>Excel Spreadsheet</option>
                          </select>
                        </div>
                      </div>
                      
                      <div className="flex justify-end">
                        <Button 
                          variant="blue" 
                          size="sm"
                          onClick={() => {
                            toast({
                              title: "Generating report",
                              description: "Your custom report is being generated...",
                            });
                            
                            setTimeout(() => {
                              toast({
                                title: "Report ready",
                                description: "Your custom report is ready to download",
                              });
                            }, 2000);
                          }}
                        >
                          Generate Report
                        </Button>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-[#11111D] rounded-lg border border-[#2A2A3C]">
                    <div className="p-4 border-b border-[#2A2A3C]">
                      <h4 className="font-medium text-cyan-400">Previous Reports</h4>
                    </div>
                    
                    <div className="p-2">
                      <div className="flex justify-between items-center p-2 hover:bg-[#1E1E2C] rounded transition-colors">
                        <span className="text-sm">Weekly Report - Apr 10, 2025</span>
                        <Button variant="outline" size="sm" className="text-xs h-8">Download</Button>
                      </div>
                      <div className="flex justify-between items-center p-2 hover:bg-[#1E1E2C] rounded transition-colors">
                        <span className="text-sm">Monthly Report - March 2025</span>
                        <Button variant="outline" size="sm" className="text-xs h-8">Download</Button>
                      </div>
                      <div className="flex justify-between items-center p-2 hover:bg-[#1E1E2C] rounded transition-colors">
                        <span className="text-sm">Custom Report - Feb 15-28, 2025</span>
                        <Button variant="outline" size="sm" className="text-xs h-8">Download</Button>
                      </div>
                    </div>
                  </div>
                </div>
              )}
              
              {activeView === "settings" && (
                <div className="glass-card p-6">
                  <h3 className="text-xl font-bold mb-6 neon-blue-text">Settings</h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                    <div className="bg-[#11111D] p-4 rounded-lg border border-[#2A2A3C]">
                      <h4 className="font-medium mb-3 flex items-center text-cyan-400">
                        <Bell className="h-4 w-4 mr-2" />
                        Notifications
                      </h4>
                      <div className="space-y-3">
                        <div className="flex justify-between items-center">
                          <span className="text-sm">Email alerts</span>
                          <div className="h-6 w-11 bg-green-900/30 rounded-full relative cursor-pointer">
                            <div className="h-5 w-5 bg-green-500 rounded-full absolute top-0.5 right-0.5"></div>
                          </div>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-sm">Mobile notifications</span>
                          <div className="h-6 w-11 bg-green-900/30 rounded-full relative cursor-pointer">
                            <div className="h-5 w-5 bg-green-500 rounded-full absolute top-0.5 right-0.5"></div>
                          </div>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-sm">Weekly digest</span>
                          <div className="h-6 w-11 bg-[#1E1E2C] rounded-full relative cursor-pointer">
                            <div className="h-5 w-5 bg-gray-500 rounded-full absolute top-0.5 left-0.5"></div>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="bg-[#11111D] p-4 rounded-lg border border-[#2A2A3C]">
                      <h4 className="font-medium mb-3 flex items-center text-cyan-400">
                        <Settings className="h-4 w-4 mr-2" />
                        Account
                      </h4>
                      <div className="space-y-3">
                        <div className="flex justify-between items-center">
                          <span className="text-sm">Two-factor auth</span>
                          <div className="h-6 w-11 bg-green-900/30 rounded-full relative cursor-pointer">
                            <div className="h-5 w-5 bg-green-500 rounded-full absolute top-0.5 right-0.5"></div>
                          </div>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-sm">Data backups</span>
                          <div className="h-6 w-11 bg-[#1E1E2C] rounded-full relative cursor-pointer">
                            <div className="h-5 w-5 bg-gray-500 rounded-full absolute top-0.5 left-0.5"></div>
                          </div>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-sm">Activity logging</span>
                          <div className="h-6 w-11 bg-green-900/30 rounded-full relative cursor-pointer">
                            <div className="h-5 w-5 bg-green-500 rounded-full absolute top-0.5 right-0.5"></div>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="bg-[#11111D] p-4 rounded-lg border border-[#2A2A3C]">
                      <h4 className="font-medium mb-3 flex items-center text-cyan-400">
                        <Users className="h-4 w-4 mr-2" />
                        Privacy
                      </h4>
                      <div className="space-y-3">
                        <div className="flex justify-between items-center">
                          <span className="text-sm">Data anonymization</span>
                          <div className="h-6 w-11 bg-green-900/30 rounded-full relative cursor-pointer">
                            <div className="h-5 w-5 bg-green-500 rounded-full absolute top-0.5 right-0.5"></div>
                          </div>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-sm">Auto data deletion</span>
                          <div className="h-6 w-11 bg-green-900/30 rounded-full relative cursor-pointer">
                            <div className="h-5 w-5 bg-green-500 rounded-full absolute top-0.5 right-0.5"></div>
                          </div>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-sm">Activity insights</span>
                          <div className="h-6 w-11 bg-green-900/30 rounded-full relative cursor-pointer">
                            <div className="h-5 w-5 bg-green-500 rounded-full absolute top-0.5 right-0.5"></div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-[#11111D] p-4 rounded-lg border border-[#2A2A3C] mb-6">
                    <h4 className="font-medium mb-3 text-cyan-400">General Preferences</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="text-sm text-gray-400 block mb-1">Language</label>
                        <select className="w-full p-2 bg-[#1E1E2C] rounded-lg border border-[#2A2A3C] text-white text-sm">
                          <option>English (US)</option>
                          <option>Spanish</option>
                          <option>French</option>
                          <option>German</option>
                          <option>Chinese (Simplified)</option>
                        </select>
                      </div>
                      
                      <div>
                        <label className="text-sm text-gray-400 block mb-1">Time Zone</label>
                        <select className="w-full p-2 bg-[#1E1E2C] rounded-lg border border-[#2A2A3C] text-white text-sm">
                          <option>Pacific Time (GMT-7)</option>
                          <option>Mountain Time (GMT-6)</option>
                          <option>Central Time (GMT-5)</option>
                          <option>Eastern Time (GMT-4)</option>
                          <option>GMT</option>
                        </select>
                      </div>
                      
                      <div>
                        <label className="text-sm text-gray-400 block mb-1">Theme</label>
                        <select className="w-full p-2 bg-[#1E1E2C] rounded-lg border border-[#2A2A3C] text-white text-sm">
                          <option>Dark (Cybersecurity)</option>
                          <option>Light</option>
                          <option>System Default</option>
                        </select>
                      </div>
                      
                      <div>
                        <label className="text-sm text-gray-400 block mb-1">Data Retention</label>
                        <select className="w-full p-2 bg-[#1E1E2C] rounded-lg border border-[#2A2A3C] text-white text-sm">
                          <option>30 days</option>
                          <option>60 days</option>
                          <option>90 days</option>
                          <option>1 year</option>
                        </select>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex flex-col sm:flex-row justify-between gap-4">
                    <div className="flex gap-2">
                      <Button 
                        variant="danger" 
                        size="sm"
                        onClick={() => {
                          toast({
                            title: "Warning",
                            description: "This will delete all your data. Are you sure?",
                            variant: "destructive"
                          });
                        }}
                      >
                        Delete Account
                      </Button>
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => {
                          toast({
                            title: "Export data",
                            description: "Preparing your data for export...",
                          });
                        }}
                      >
                        Export Data
                      </Button>
                    </div>
                    
                    <Button 
                      variant="blue" 
                      size="sm"
                      onClick={() => {
                        toast({
                          title: "Settings saved",
                          description: "Your settings have been updated successfully",
                        });
                      }}
                    >
                      <Save className="h-4 w-4 mr-2" />
                      Save Changes
                    </Button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Dashboard;
