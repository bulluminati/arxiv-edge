
import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Search, Bell, User, BookOpen, TrendingUp } from 'lucide-react';
import HomeScreen from '@/components/HomeScreen';
import DiscoverScreen from '@/components/DiscoverScreen';
import NotificationsScreen from '@/components/NotificationsScreen';
import ProfileScreen from '@/components/ProfileScreen';
import NavigationBar from '@/components/NavigationBar';

const Index = () => {
  const [activeTab, setActiveTab] = useState('home');

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-950 to-indigo-950">
      <NavigationBar />
      
      <div className="pb-20"> {/* Space for bottom navigation */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="h-full">
          <TabsContent value="home" className="m-0 h-full">
            <HomeScreen />
          </TabsContent>
          
          <TabsContent value="discover" className="m-0 h-full">
            <DiscoverScreen />
          </TabsContent>
          
          <TabsContent value="notifications" className="m-0 h-full">
            <NotificationsScreen />
          </TabsContent>
          
          <TabsContent value="profile" className="m-0 h-full">
            <ProfileScreen />
          </TabsContent>
        </Tabs>
      </div>

      {/* Bottom Navigation */}
      <div className="fixed bottom-0 left-0 right-0 bg-white/10 backdrop-blur-xl border-t border-white/20">
        <div className="flex items-center justify-around px-4 py-3">
          <button
            onClick={() => setActiveTab('home')}
            className={`flex flex-col items-center space-y-1 px-3 py-2 rounded-lg transition-all ${
              activeTab === 'home' 
                ? 'bg-blue-500/20 text-blue-400' 
                : 'text-gray-400 hover:text-white'
            }`}
          >
            <BookOpen className="h-5 w-5" />
            <span className="text-xs font-medium">Papers</span>
          </button>
          
          <button
            onClick={() => setActiveTab('discover')}
            className={`flex flex-col items-center space-y-1 px-3 py-2 rounded-lg transition-all ${
              activeTab === 'discover' 
                ? 'bg-purple-500/20 text-purple-400' 
                : 'text-gray-400 hover:text-white'
            }`}
          >
            <Search className="h-5 w-5" />
            <span className="text-xs font-medium">Discover</span>
          </button>
          
          <button
            onClick={() => setActiveTab('notifications')}
            className={`flex flex-col items-center space-y-1 px-3 py-2 rounded-lg transition-all relative ${
              activeTab === 'notifications' 
                ? 'bg-green-500/20 text-green-400' 
                : 'text-gray-400 hover:text-white'
            }`}
          >
            <Bell className="h-5 w-5" />
            <span className="text-xs font-medium">Alerts</span>
            <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></div>
          </button>
          
          <button
            onClick={() => setActiveTab('profile')}
            className={`flex flex-col items-center space-y-1 px-3 py-2 rounded-lg transition-all ${
              activeTab === 'profile' 
                ? 'bg-orange-500/20 text-orange-400' 
                : 'text-gray-400 hover:text-white'
            }`}
          >
            <User className="h-5 w-5" />
            <span className="text-xs font-medium">Profile</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Index;
