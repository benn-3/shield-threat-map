
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store';
import { toggleTheme } from '../store/slices/uiSlice';
import { Button } from '../components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { Settings as SettingsIcon, User, Bell, Shield, Database, Wifi, Save } from 'lucide-react';

const SettingsPage = () => {
  const dispatch = useDispatch();
  const { theme } = useSelector((state: RootState) => state.ui);
  const { user } = useSelector((state: RootState) => state.auth);
  
  const [notifications, setNotifications] = useState({
    emailAlerts: true,
    pushNotifications: true,
    threatAlerts: true,
    systemUpdates: false
  });

  const [apiSettings, setApiSettings] = useState({
    abuseipdb: '',
    virustotal: '',
    alienvault: '',
    refreshInterval: '30'
  });

  const handleSaveSettings = () => {
    // In a real app, this would save to backend
    console.log('Settings saved:', { notifications, apiSettings });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white">Settings</h1>
          <p className="text-slate-400 mt-1">Configure your security dashboard preferences</p>
        </div>
        <Button onClick={handleSaveSettings} className="bg-green-600 hover:bg-green-700">
          <Save className="w-4 h-4 mr-2" />
          Save Changes
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* User Profile */}
        <div className="bg-slate-800 border border-slate-700 rounded-lg p-6">
          <div className="flex items-center space-x-3 mb-4">
            <User className="w-5 h-5 text-blue-400" />
            <h3 className="text-white text-lg font-semibold">User Profile</h3>
          </div>
          
          <div className="space-y-4">
            <div>
              <label className="block text-slate-400 text-sm mb-2">Email</label>
              <input
                type="email"
                value={user?.email || 'admin@cybersec.com'}
                className="w-full bg-slate-700 border border-slate-600 rounded-lg px-3 py-2 text-white"
                readOnly
              />
            </div>
            <div>
              <label className="block text-slate-400 text-sm mb-2">Role</label>
              <input
                type="text"
                value="Security Analyst"
                className="w-full bg-slate-700 border border-slate-600 rounded-lg px-3 py-2 text-white"
                readOnly
              />
            </div>
            <div>
              <label className="block text-slate-400 text-sm mb-2">Department</label>
              <input
                type="text"
                value="Cybersecurity"
                className="w-full bg-slate-700 border border-slate-600 rounded-lg px-3 py-2 text-white"
              />
            </div>
          </div>
        </div>

        {/* Appearance */}
        <div className="bg-slate-800 border border-slate-700 rounded-lg p-6">
          <div className="flex items-center space-x-3 mb-4">
            <SettingsIcon className="w-5 h-5 text-purple-400" />
            <h3 className="text-white text-lg font-semibold">Appearance</h3>
          </div>
          
          <div className="space-y-4">
            <div>
              <label className="block text-slate-400 text-sm mb-2">Theme</label>
              <Select value={theme} onValueChange={() => dispatch(toggleTheme())}>
                <SelectTrigger className="bg-slate-700 border-slate-600 text-white">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-slate-700 border-slate-600">
                  <SelectItem value="dark">Dark</SelectItem>
                  <SelectItem value="light">Light</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <label className="block text-slate-400 text-sm mb-2">Language</label>
              <Select defaultValue="en">
                <SelectTrigger className="bg-slate-700 border-slate-600 text-white">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-slate-700 border-slate-600">
                  <SelectItem value="en">English</SelectItem>
                  <SelectItem value="es">Spanish</SelectItem>
                  <SelectItem value="fr">French</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <label className="block text-slate-400 text-sm mb-2">Timezone</label>
              <Select defaultValue="utc">
                <SelectTrigger className="bg-slate-700 border-slate-600 text-white">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-slate-700 border-slate-600">
                  <SelectItem value="utc">UTC</SelectItem>
                  <SelectItem value="pst">PST</SelectItem>
                  <SelectItem value="est">EST</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        {/* Notifications */}
        <div className="bg-slate-800 border border-slate-700 rounded-lg p-6">
          <div className="flex items-center space-x-3 mb-4">
            <Bell className="w-5 h-5 text-yellow-400" />
            <h3 className="text-white text-lg font-semibold">Notifications</h3>
          </div>
          
          <div className="space-y-4">
            {Object.entries(notifications).map(([key, value]) => (
              <div key={key} className="flex items-center justify-between">
                <label className="text-slate-300 capitalize">
                  {key.replace(/([A-Z])/g, ' $1').trim()}
                </label>
                <button
                  onClick={() => setNotifications(prev => ({ ...prev, [key]: !value }))}
                  className={`w-12 h-6 rounded-full p-1 transition-colors ${
                    value ? 'bg-green-600' : 'bg-slate-600'
                  }`}
                >
                  <div
                    className={`w-4 h-4 bg-white rounded-full transition-transform ${
                      value ? 'translate-x-6' : 'translate-x-0'
                    }`}
                  />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* API Configuration */}
        <div className="bg-slate-800 border border-slate-700 rounded-lg p-6">
          <div className="flex items-center space-x-3 mb-4">
            <Database className="w-5 h-5 text-green-400" />
            <h3 className="text-white text-lg font-semibold">API Configuration</h3>
          </div>
          
          <div className="space-y-4">
            <div>
              <label className="block text-slate-400 text-sm mb-2">AbuseIPDB API Key</label>
              <input
                type="password"
                value={apiSettings.abuseipdb}
                onChange={(e) => setApiSettings(prev => ({ ...prev, abuseipdb: e.target.value }))}
                placeholder="Enter API key..."
                className="w-full bg-slate-700 border border-slate-600 rounded-lg px-3 py-2 text-white"
              />
            </div>
            <div>
              <label className="block text-slate-400 text-sm mb-2">VirusTotal API Key</label>
              <input
                type="password"
                value={apiSettings.virustotal}
                onChange={(e) => setApiSettings(prev => ({ ...prev, virustotal: e.target.value }))}
                placeholder="Enter API key..."
                className="w-full bg-slate-700 border border-slate-600 rounded-lg px-3 py-2 text-white"
              />
            </div>
            <div>
              <label className="block text-slate-400 text-sm mb-2">AlienVault OTX API Key</label>
              <input
                type="password"
                value={apiSettings.alienvault}
                onChange={(e) => setApiSettings(prev => ({ ...prev, alienvault: e.target.value }))}
                placeholder="Enter API key..."
                className="w-full bg-slate-700 border border-slate-600 rounded-lg px-3 py-2 text-white"
              />
            </div>
            <div>
              <label className="block text-slate-400 text-sm mb-2">Refresh Interval (seconds)</label>
              <Select 
                value={apiSettings.refreshInterval} 
                onValueChange={(value) => setApiSettings(prev => ({ ...prev, refreshInterval: value }))}
              >
                <SelectTrigger className="bg-slate-700 border-slate-600 text-white">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-slate-700 border-slate-600">
                  <SelectItem value="15">15 seconds</SelectItem>
                  <SelectItem value="30">30 seconds</SelectItem>
                  <SelectItem value="60">1 minute</SelectItem>
                  <SelectItem value="300">5 minutes</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        {/* Security Settings */}
        <div className="bg-slate-800 border border-slate-700 rounded-lg p-6 lg:col-span-2">
          <div className="flex items-center space-x-3 mb-4">
            <Shield className="w-5 h-5 text-red-400" />
            <h3 className="text-white text-lg font-semibold">Security Settings</h3>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <label className="block text-slate-400 text-sm mb-2">Session Timeout</label>
                <Select defaultValue="30">
                  <SelectTrigger className="bg-slate-700 border-slate-600 text-white">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-slate-700 border-slate-600">
                    <SelectItem value="15">15 minutes</SelectItem>
                    <SelectItem value="30">30 minutes</SelectItem>
                    <SelectItem value="60">1 hour</SelectItem>
                    <SelectItem value="240">4 hours</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label className="block text-slate-400 text-sm mb-2">Two-Factor Authentication</label>
                <Button variant="outline" className="w-full">
                  Enable 2FA
                </Button>
              </div>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="block text-slate-400 text-sm mb-2">IP Whitelist</label>
                <textarea
                  className="w-full bg-slate-700 border border-slate-600 rounded-lg px-3 py-2 text-white h-20"
                  placeholder="Enter IP addresses (one per line)"
                />
              </div>
              <div>
                <Button variant="outline" className="w-full text-red-400 border-red-400">
                  Change Password
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;
