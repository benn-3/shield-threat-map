
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '../store';
import { fetchNetworkDevices } from '../store/slices/networkSlice';
import { Button } from '../components/ui/button';
import { Network, Wifi, WifiOff, Router, Monitor, Smartphone } from 'lucide-react';

const NetworkPage = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { devices, loading } = useSelector((state: RootState) => state.network);

  useEffect(() => {
    dispatch(fetchNetworkDevices());
    
    const interval = setInterval(() => {
      dispatch(fetchNetworkDevices());
    }, 30000);

    return () => clearInterval(interval);
  }, [dispatch]);

  const getDeviceIcon = (type: string) => {
    switch (type) {
      case 'router':
        return <Router className="w-6 h-6" />;
      case 'computer':
        return <Monitor className="w-6 h-6" />;
      case 'mobile':
        return <Smartphone className="w-6 h-6" />;
      default:
        return <Network className="w-6 h-6" />;
    }
  };

  const onlineDevices = devices.filter(device => device.status === 'online').length;
  const offlineDevices = devices.filter(device => device.status === 'offline').length;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white">Network Monitoring</h1>
          <p className="text-slate-400 mt-1">Real-time network device monitoring and analysis</p>
        </div>
        <div className="flex space-x-3">
          <Button 
            variant="outline"
            onClick={() => dispatch(fetchNetworkDevices())}
            disabled={loading}
          >
            {loading ? 'Scanning...' : 'Scan Network'}
          </Button>
          <Button className="bg-blue-600 hover:bg-blue-700">
            <Network className="w-4 h-4 mr-2" />
            Add Device
          </Button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-slate-800 border border-slate-700 rounded-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-slate-400 text-sm">Total Devices</p>
              <p className="text-white text-3xl font-bold">{devices.length}</p>
            </div>
            <Network className="w-10 h-10 text-blue-500" />
          </div>
        </div>
        
        <div className="bg-slate-800 border border-slate-700 rounded-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-slate-400 text-sm">Online</p>
              <p className="text-white text-3xl font-bold">{onlineDevices}</p>
            </div>
            <Wifi className="w-10 h-10 text-green-500" />
          </div>
        </div>
        
        <div className="bg-slate-800 border border-slate-700 rounded-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-slate-400 text-sm">Offline</p>
              <p className="text-white text-3xl font-bold">{offlineDevices}</p>
            </div>
            <WifiOff className="w-10 h-10 text-red-500" />
          </div>
        </div>
      </div>

      {/* Devices Grid */}
      <div className="bg-slate-800 border border-slate-700 rounded-lg p-6">
        <h3 className="text-white text-lg font-semibold mb-4">Network Devices</h3>
        
        {loading ? (
          <div className="text-slate-400">Scanning network...</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {devices.map((device) => (
              <div key={device.id} className="bg-slate-700 rounded-lg p-4 border border-slate-600">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center space-x-3">
                    {getDeviceIcon(device.type)}
                    <div>
                      <p className="text-white font-medium">{device.name}</p>
                      <p className="text-slate-400 text-sm">{device.ip}</p>
                    </div>
                  </div>
                  <div className={`w-3 h-3 rounded-full ${
                    device.status === 'online' ? 'bg-green-500' : 'bg-red-500'
                  }`} />
                </div>
                
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-slate-400">MAC:</span>
                    <span className="text-slate-300 font-mono">{device.mac}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Type:</span>
                    <span className="text-slate-300 capitalize">{device.type}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Last Seen:</span>
                    <span className="text-slate-300">
                      {new Date(device.lastSeen).toLocaleTimeString()}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default NetworkPage;
