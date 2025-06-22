
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { 
  Bell, 
  TrendingUp, 
  Building2, 
  Zap, 
  Clock, 
  Settings,
  Filter,
  CheckCircle,
  AlertTriangle
} from 'lucide-react';

const NotificationsScreen = () => {
  const [filter, setFilter] = useState<'all' | 'unread' | 'high-impact'>('all');

  const notifications = [
    {
      id: 1,
      type: 'breakthrough',
      title: 'High-Impact Discovery Alert',
      message: 'New quantum computing breakthrough could revolutionize cryptography',
      sector: 'Quantum Computing',
      companies: ['IBM', 'GOOGL'],
      impact: 9.2,
      timeAgo: '15 min ago',
      isRead: false,
      isHighPriority: true
    },
    {
      id: 2,
      type: 'market',
      title: 'Market Impact Alert',
      message: 'Biotech research breakthrough affects 3 tracked companies',
      sector: 'Biotechnology',
      companies: ['MRNA', 'PFE', 'BNTX'],
      impact: 7.8,
      timeAgo: '1 hour ago',
      isRead: false,
      isHighPriority: false
    },
    {
      id: 3,
      type: 'reminder',
      title: 'Paper Review Reminder',
      message: 'Follow up on "Advanced Neural Architecture Search" paper',
      sector: 'AI & ML',
      companies: [],
      impact: 6.5,
      timeAgo: '2 hours ago',
      isRead: true,
      isHighPriority: false
    },
    {
      id: 4,
      type: 'sector',
      title: 'Sector Update',
      message: '12 new papers published in Energy sector this week',
      sector: 'Energy',
      companies: [],
      impact: 5.2,
      timeAgo: '1 day ago',
      isRead: true,
      isHighPriority: false
    }
  ];

  const notificationSettings = [
    { key: 'breakthrough', label: 'Breakthrough Alerts', enabled: true },
    { key: 'market', label: 'Market Impact', enabled: true },
    { key: 'company', label: 'Company Updates', enabled: false },
    { key: 'reminder', label: 'Paper Reminders', enabled: true },
    { key: 'sector', label: 'Sector Updates', enabled: true }
  ];

  const getNotificationIcon = (type: string, isHighPriority: boolean) => {
    const iconClass = isHighPriority ? 'text-red-400' : 'text-blue-400';
    
    switch (type) {
      case 'breakthrough':
        return <Zap className={`h-4 w-4 ${iconClass}`} />;
      case 'market':
        return <TrendingUp className={`h-4 w-4 ${iconClass}`} />;
      case 'reminder':
        return <Clock className={`h-4 w-4 ${iconClass}`} />;
      case 'sector':
        return <Building2 className={`h-4 w-4 ${iconClass}`} />;
      default:
        return <Bell className={`h-4 w-4 ${iconClass}`} />;
    }
  };

  const filteredNotifications = notifications.filter(notification => {
    if (filter === 'unread') return !notification.isRead;
    if (filter === 'high-impact') return notification.impact >= 8;
    return true;
  });

  return (
    <div className="min-h-screen text-white p-4">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold bg-gradient-to-r from-green-400 to-blue-400 bg-clip-text text-transparent">
            Research Alerts
          </h1>
          <p className="text-gray-400 text-sm">Stay updated on breakthrough discoveries</p>
        </div>
        <Button size="sm" variant="ghost" className="text-gray-400">
          <Settings className="h-4 w-4" />
        </Button>
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-3 gap-3 mb-6">
        <div className="bg-white/5 backdrop-blur-xl rounded-lg p-3 border border-white/10">
          <div className="flex items-center space-x-2 mb-1">
            <Bell className="h-4 w-4 text-blue-400" />
            <span className="text-xs text-gray-400">Total</span>
          </div>
          <div className="text-lg font-bold text-white">{notifications.length}</div>
        </div>
        
        <div className="bg-white/5 backdrop-blur-xl rounded-lg p-3 border border-white/10">
          <div className="flex items-center space-x-2 mb-1">
            <AlertTriangle className="h-4 w-4 text-orange-400" />
            <span className="text-xs text-gray-400">Unread</span>
          </div>
          <div className="text-lg font-bold text-white">
            {notifications.filter(n => !n.isRead).length}
          </div>
        </div>
        
        <div className="bg-white/5 backdrop-blur-xl rounded-lg p-3 border border-white/10">
          <div className="flex items-center space-x-2 mb-1">
            <Zap className="h-4 w-4 text-red-400" />
            <span className="text-xs text-gray-400">High Impact</span>
          </div>
          <div className="text-lg font-bold text-white">
            {notifications.filter(n => n.impact >= 8).length}
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="flex items-center space-x-2 mb-6">
        <Filter className="h-4 w-4 text-gray-400" />
        {[
          { key: 'all', label: 'All' },
          { key: 'unread', label: 'Unread' },
          { key: 'high-impact', label: 'High Impact' }
        ].map((filterOption) => (
          <Button
            key={filterOption.key}
            size="sm"
            variant={filter === filterOption.key ? "default" : "outline"}
            onClick={() => setFilter(filterOption.key as typeof filter)}
            className={`${
              filter === filterOption.key
                ? 'bg-green-500/20 text-green-400 border-green-400/30'
                : 'bg-white/5 text-gray-400 border-white/10'
            }`}
          >
            {filterOption.label}
          </Button>
        ))}
      </div>

      {/* Notifications List */}
      <div className="space-y-3 mb-6">
        {filteredNotifications.map((notification) => (
          <div
            key={notification.id}
            className={`bg-white/5 backdrop-blur-xl rounded-lg p-4 border transition-all cursor-pointer ${
              notification.isRead 
                ? 'border-white/10 hover:border-white/20' 
                : 'border-blue-400/30 hover:border-blue-400/50'
            } ${
              notification.isHighPriority ? 'ring-1 ring-red-400/20' : ''
            }`}
          >
            <div className="flex items-start justify-between mb-2">
              <div className="flex items-start space-x-3 flex-1">
                <div className="mt-1">
                  {getNotificationIcon(notification.type, notification.isHighPriority)}
                </div>
                
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-1">
                    <h3 className="font-medium text-white text-sm">
                      {notification.title}
                    </h3>
                    {notification.isHighPriority && (
                      <Badge className="text-xs bg-red-500/20 text-red-400 border-red-400/30">
                        High Priority
                      </Badge>
                    )}
                  </div>
                  
                  <p className="text-gray-300 text-xs mb-2">
                    {notification.message}
                  </p>
                  
                  <div className="flex items-center space-x-2">
                    <Badge variant="secondary" className="text-xs bg-blue-500/20 text-blue-400">
                      {notification.sector}
                    </Badge>
                    
                    {notification.companies.length > 0 && (
                      <div className="flex space-x-1">
                        {notification.companies.slice(0, 2).map((company, idx) => (
                          <Badge key={idx} variant="outline" className="text-xs text-green-400 border-green-400/30">
                            {company}
                          </Badge>
                        ))}
                        {notification.companies.length > 2 && (
                          <Badge variant="outline" className="text-xs text-gray-400">
                            +{notification.companies.length - 2}
                          </Badge>
                        )}
                      </div>
                    )}
                    
                    {notification.impact > 0 && (
                      <Badge className="text-xs bg-yellow-500/20 text-yellow-400">
                        {notification.impact.toFixed(1)}
                      </Badge>
                    )}
                  </div>
                </div>
              </div>
              
              <div className="flex flex-col items-end space-y-2">
                <span className="text-xs text-gray-400">{notification.timeAgo}</span>
                {!notification.isRead && (
                  <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Notification Settings */}
      <div className="bg-white/5 backdrop-blur-xl rounded-lg p-4 border border-white/10">
        <h3 className="font-semibold text-white mb-3 flex items-center">
          <Settings className="h-4 w-4 mr-2 text-gray-400" />
          Notification Settings
        </h3>
        
        <div className="space-y-3">
          {notificationSettings.map((setting) => (
            <div key={setting.key} className="flex items-center justify-between">
              <span className="text-sm text-gray-300">{setting.label}</span>
              <Switch checked={setting.enabled} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default NotificationsScreen;
