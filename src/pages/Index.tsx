import { useState } from "react";
import { Tabs, TabsContent } from "@/components/ui/tabs";
import { Home, User, LogOut, Search, Bell } from "lucide-react";
import HomeScreen from "@/components/HomeScreen";
import ProfileScreen from "@/components/ProfileScreen";
import DiscoverScreen from "@/components/DiscoverScreen";
import NotificationsScreen from "@/components/NotificationsScreen";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";

const Index = () => {
  const [activeTab, setActiveTab] = useState("home");

  const handleLogout = async () => {
    await supabase.auth.signOut();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-950 to-indigo-950 text-white">
      <header className="fixed top-0 left-0 right-0 bg-slate-900/50 backdrop-blur-lg border-b border-white/10 z-10">
        <div className="container mx-auto p-4 flex justify-between items-center">
          <h1 className="text-xl font-bold">arXiv Intelligence</h1>
          <Button variant="ghost" onClick={handleLogout} className="text-gray-400 hover:text-white">
            <LogOut className="h-4 w-4 mr-2" />
            Logout
          </Button>
        </div>
      </header>

      <main className="container mx-auto pt-24 pb-24 px-4">
        <Tabs value={activeTab} className="w-full">
          <TabsContent value="home">
            <HomeScreen />
          </TabsContent>
          <TabsContent value="discover">
            <DiscoverScreen />
          </TabsContent>
          <TabsContent value="notifications">
            <NotificationsScreen />
          </TabsContent>
          <TabsContent value="profile">
            <ProfileScreen />
          </TabsContent>
        </Tabs>
      </main>
      
      <div className="fixed bottom-0 left-0 right-0 bg-white/10 backdrop-blur-xl border-t border-white/20">
        <div className="container mx-auto max-w-md">
            <div className="flex items-center justify-around px-4 py-2">
            <button
                onClick={() => setActiveTab('home')}
                className={`flex flex-col items-center space-y-1 px-3 py-2 rounded-lg transition-all w-full ${
                activeTab === 'home' 
                    ? 'bg-blue-500/20 text-blue-400' 
                    : 'text-gray-400 hover:bg-white/5'
                }`}
            >
                <Home className="h-5 w-5" />
                <span className="text-xs font-medium">Home</span>
            </button>

            <button
                onClick={() => setActiveTab('discover')}
                className={`flex flex-col items-center space-y-1 px-3 py-2 rounded-lg transition-all w-full ${
                activeTab === 'discover'
                    ? 'bg-purple-500/20 text-purple-400'
                    : 'text-gray-400 hover:bg-white/5'
                }`}
            >
                <Search className="h-5 w-5" />
                <span className="text-xs font-medium">Discover</span>
            </button>

            <button
                onClick={() => setActiveTab('notifications')}
                className={`flex flex-col items-center space-y-1 px-3 py-2 rounded-lg transition-all w-full relative ${
                activeTab === 'notifications'
                    ? 'bg-green-500/20 text-green-400'
                    : 'text-gray-400 hover:bg-white/5'
                }`}
            >
                <Bell className="h-5 w-5" />
                <span className="text-xs font-medium">Alerts</span>
            </button>
            
            <button
                onClick={() => setActiveTab('profile')}
                className={`flex flex-col items-center space-y-1 px-3 py-2 rounded-lg transition-all w-full ${
                activeTab === 'profile' 
                    ? 'bg-orange-500/20 text-orange-400' 
                    : 'text-gray-400 hover:bg-white/5'
                }`}
            >
                <User className="h-5 w-5" />
                <span className="text-xs font-medium">Profile</span>
            </button>
            </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
