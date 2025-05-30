
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '../store';
import { fetchThreats } from '../store/slices/threatsSlice';
import { fetchNetworkDevices } from '../store/slices/networkSlice';
import MetricCard from '../components/dashboard/MetricCard';
import ThreatChart from '../components/dashboard/ThreatChart';
import ActivityTimeline from '../components/dashboard/ActivityTimeline';
import { shield, activity, network, flag, zap, alert-triangle } from 'lucide-react';
import { Button } from '../components/ui/button';

const Dashboard = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { threats, loading: threatsLoading } = useSelector((state: RootState) => state.threats);
  const { devices, loading: networkLoading } = useSelector((state: RootState) => state.network);

  useEffect(() => {
    dispatch(fetchThreats());
    dispatch(fetchNetworkDevices());
    
    // Set up real-time polling
    const interval = setInterval(() => {
      dispatch(fetchThreats());
      dispatch(fetchNetworkDevices());
    }, 30000); // Poll every 30 seconds

    return () => clearInterval(interval);
  }, [dispatch]);

  const highSeverityThreats = threats.filter(threat => threat.severity === 'high').length;
  const onlineDevices = devices.filter(device => device.status === 'online').length;
  const offlineDevices = devices.filter(device => device.status === 'offline').length;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white">Security Dashboard</h1>
          <p className="text-slate-400 mt-1">Real-time threat intelligence and network monitoring</p>
        </div>
        <div className="flex space-x-3">
          <Button 
            variant="outline" 
            className="border-red-500 text-red-400 hover:bg-red-500/10"
          >
            <alert-triangle className="w-4 h-4 mr-2" />
            Emergency Response
          </Button>
          <Button className="bg-red-600 hover:bg-red-700">
            <shield className="w-4 h-4 mr-2" />
            Block Threat
          </Button>
        </div>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <MetricCard
          title="Active Threats"
          value={threats.length}
          change="+12% from yesterday"
          changeType="negative"
          icon={<flag className="w-8 h-8" />}
        />
        <MetricCard
          title="High Severity"
          value={highSeverityThreats}
          change="+5% from yesterday"
          changeType="negative"
          icon={<alert-triangle className="w-8 h-8" />}
        />
        <MetricCard
          title="Network Devices"
          value={devices.length}
          change="No change"
          changeType="neutral"
          icon={<network className="w-8 h-8" />}
        />
        <MetricCard
          title="Online Status"
          value={`${onlineDevices}/${devices.length}`}
          change="-2 devices offline"
          changeType="negative"
          icon={<activity className="w-8 h-8" />}
        />
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ThreatChart />
        <ActivityTimeline />
      </div>

      {/* Recent Threats */}
      <div className="bg-slate-800 border border-slate-700 rounded-lg p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-white text-lg font-semibold">Recent Threats</h3>
          <Button variant="outline" size="sm">View All</Button>
        </div>
        
        {threatsLoading ? (
          <div className="text-slate-400">Loading threats...</div>
        ) : (
          <div className="space-y-3">
            {threats.slice(0, 5).map((threat) => (
              <div key={threat.id} className="flex items-center justify-between p-3 bg-slate-700 rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className={`w-3 h-3 rounded-full ${
                    threat.severity === 'high' ? 'bg-red-500' :
                    threat.severity === 'medium' ? 'bg-yellow-500' : 'bg-green-500'
                  }`} />
                  <div>
                    <p className="text-white font-medium">{threat.ip}</p>
                    <p className="text-slate-400 text-sm">{threat.type} • {threat.source}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-slate-300 text-sm">{threat.country}</p>
                  <p className="text-slate-400 text-xs">
                    {new Date(threat.timestamp).toLocaleTimeString()}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
