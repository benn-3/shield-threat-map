
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../store';
import { toggleSidebar, toggleTheme } from '../../store/slices/uiSlice';
import { logout } from '../../store/slices/authSlice';
import { Bell, Search, Settings, User } from 'lucide-react';
import { Button } from '../ui/button';

const Header = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state: RootState) => state.auth);
  const { theme, sidebarCollapsed } = useSelector((state: RootState) => state.ui);

  return (
    <header className="bg-slate-900 border-b border-slate-700 px-6 py-4 flex items-center justify-between">
      <div className="flex items-center space-x-4">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => dispatch(toggleSidebar())}
          className="text-slate-400 hover:text-white"
        >
          <div className="w-5 h-5 flex flex-col justify-center space-y-1">
            <div className="w-full h-0.5 bg-current"></div>
            <div className="w-full h-0.5 bg-current"></div>
            <div className="w-full h-0.5 bg-current"></div>
          </div>
        </Button>
        
        <div className="relative">
          <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Search threats, IPs, domains..."
            className="bg-slate-800 border border-slate-600 rounded-lg pl-10 pr-4 py-2 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-red-500 w-80"
          />
        </div>
      </div>

      <div className="flex items-center space-x-4">
        <Button
          variant="ghost"
          size="sm"
          className="text-slate-400 hover:text-white relative"
        >
          <Bell className="w-5 h-5" />
          <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full text-xs"></span>
        </Button>

        <Button
          variant="ghost"
          size="sm"
          onClick={() => dispatch(toggleTheme())}
          className="text-slate-400 hover:text-white"
        >
          <Settings className="w-5 h-5" />
        </Button>

        <div className="flex items-center space-x-2 text-white">
          <div className="w-8 h-8 bg-slate-700 rounded-full flex items-center justify-center">
            <User className="w-4 h-4" />
          </div>
          <span className="text-sm">{user?.email}</span>
        </div>
      </div>
    </header>
  );
};

export default Header;
