
import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';
import { Link, useLocation } from 'react-router-dom';
import { cn } from '../../lib/utils';
import {
  Shield,
  Activity,
  Network,
  Flag,
  File,
  Globe,
  Settings,
  User
} from 'lucide-react';

const Sidebar = () => {
  const location = useLocation();
  const { sidebarCollapsed } = useSelector((state: RootState) => state.ui);

  const navigation = [
    { name: 'Dashboard', href: '/', icon: Shield },
    { name: 'Threats', href: '/threats', icon: Flag },
    { name: 'Network', href: '/network', icon: Network },
    { name: 'SIEM', href: '/siem', icon: Activity },
    { name: 'Reports', href: '/reports', icon: File },
    { name: 'Threat Map', href: '/threat-map', icon: Globe },
    { name: 'Settings', href: '/settings', icon: Settings },
  ];

  return (
    <div className={cn(
      'bg-slate-900 border-r border-slate-700 flex flex-col transition-all duration-300',
      sidebarCollapsed ? 'w-16' : 'w-64'
    )}>
      {/* Logo */}
      <div className="p-6 border-b border-slate-700">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-red-600 rounded-lg flex items-center justify-center">
            <Shield className="w-5 h-5 text-white" />
          </div>
          {!sidebarCollapsed && (
            <div>
              <h1 className="text-white font-bold text-lg">CyberSec</h1>
              <p className="text-slate-400 text-xs">Security Dashboard</p>
            </div>
          )}
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-2">
        {navigation.map((item) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.href;
          
          return (
            <Link
              key={item.name}
              to={item.href}
              className={cn(
                'flex items-center space-x-3 px-3 py-2 rounded-lg transition-colors',
                isActive 
                  ? 'bg-red-600 text-white' 
                  : 'text-slate-400 hover:text-white hover:bg-slate-800'
              )}
            >
              <Icon className="w-5 h-5" />
              {!sidebarCollapsed && <span>{item.name}</span>}
            </Link>
          );
        })}
      </nav>

      {/* User */}
      <div className="p-4 border-t border-slate-700">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-slate-700 rounded-full flex items-center justify-center">
            <User className="w-4 h-4 text-slate-400" />
          </div>
          {!sidebarCollapsed && (
            <div>
              <p className="text-white text-sm font-medium">Admin</p>
              <p className="text-slate-400 text-xs">Security Analyst</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
