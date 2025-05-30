
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../store';
import { toggleSidebar } from '../../store/slices/uiSlice';
import { 
  shield, 
  activity, 
  network, 
  flag, 
  file, 
  globe, 
  settings,
  user
} from 'lucide-react';
import { cn } from '../../lib/utils';

const Sidebar = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const { sidebarCollapsed } = useSelector((state: RootState) => state.ui);
  const { user } = useSelector((state: RootState) => state.auth);

  const menuItems = [
    { icon: activity, label: 'Dashboard', path: '/' },
    { icon: flag, label: 'Threats', path: '/threats' },
    { icon: network, label: 'Network', path: '/network' },
    { icon: shield, label: 'SIEM', path: '/siem' },
    { icon: file, label: 'Reports', path: '/reports' },
    { icon: globe, label: 'Threat Map', path: '/threat-map' },
    { icon: settings, label: 'Settings', path: '/settings' }
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <div className={cn(
      "bg-slate-900 border-r border-slate-700 transition-all duration-300 flex flex-col",
      sidebarCollapsed ? "w-16" : "w-64"
    )}>
      {/* Header */}
      <div className="p-4 border-b border-slate-700">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-gradient-to-r from-red-500 to-orange-500 rounded-lg flex items-center justify-center">
            <shield className="w-5 h-5 text-white" />
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
      <nav className="flex-1 p-4">
        <ul className="space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon;
            return (
              <li key={item.path}>
                <Link
                  to={item.path}
                  className={cn(
                    "flex items-center space-x-3 px-3 py-2 rounded-lg transition-colors",
                    isActive(item.path)
                      ? "bg-red-500/20 text-red-400 border border-red-500/30"
                      : "text-slate-300 hover:bg-slate-800 hover:text-white"
                  )}
                >
                  <Icon className="w-5 h-5" />
                  {!sidebarCollapsed && (
                    <span className="font-medium">{item.label}</span>
                  )}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* User Profile */}
      <div className="p-4 border-t border-slate-700">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-slate-700 rounded-full flex items-center justify-center">
            <user className="w-4 h-4 text-slate-300" />
          </div>
          {!sidebarCollapsed && user && (
            <div className="flex-1 min-w-0">
              <p className="text-white text-sm font-medium truncate">{user.email}</p>
              <p className="text-slate-400 text-xs truncate">{user.role}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
