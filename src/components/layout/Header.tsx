
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store';
import { toggleSidebar, toggleTheme } from '../../store/slices/uiSlice';
import { bell, search, settings, user } from 'lucide-react';
import { Button } from '../ui/button';

const Header = () => {
  const dispatch = useDispatch();
  const { sidebarCollapsed, theme } = useSelector((state: RootState) => state.ui);

  return (
    <header className="bg-slate-800 border-b border-slate-700 px-6 py-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => dispatch(toggleSidebar())}
            className="text-slate-300 hover:text-white"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </Button>
          
          <div className="relative">
            <search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Search threats, IPs, domains..."
              className="bg-slate-700 text-white pl-10 pr-4 py-2 rounded-lg border border-slate-600 focus:border-red-500 focus:outline-none w-96"
            />
          </div>
        </div>

        <div className="flex items-center space-x-4">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => dispatch(toggleTheme())}
            className="text-slate-300 hover:text-white"
          >
            {theme === 'dark' ? '🌙' : '☀️'}
          </Button>
          
          <Button
            variant="ghost"
            size="sm"
            className="text-slate-300 hover:text-white relative"
          >
            <bell className="w-5 h-5" />
            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
              3
            </span>
          </Button>
          
          <Button
            variant="ghost"
            size="sm"
            className="text-slate-300 hover:text-white"
          >
            <settings className="w-5 h-5" />
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Header;
