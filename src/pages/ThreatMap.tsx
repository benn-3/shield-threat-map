
import React, { useState, useEffect } from 'react';
import { Button } from '../components/ui/button';
import { Globe, MapPin, Shield, Filter, RefreshCw } from 'lucide-react';

interface ThreatLocation {
  id: string;
  country: string;
  city: string;
  lat: number;
  lng: number;
  threatCount: number;
  severity: 'high' | 'medium' | 'low';
  lastActivity: string;
}

const ThreatMapPage = () => {
  const [threats, setThreats] = useState<ThreatLocation[]>([]);
  const [loading, setLoading] = useState(false);
  const [selectedSeverity, setSelectedSeverity] = useState('all');

  // Mock threat locations data
  const generateMockThreats = (): ThreatLocation[] => {
    return [
      {
        id: '1',
        country: 'China',
        city: 'Beijing',
        lat: 39.9042,
        lng: 116.4074,
        threatCount: 45,
        severity: 'high',
        lastActivity: new Date().toISOString()
      },
      {
        id: '2',
        country: 'Russia',
        city: 'Moscow',
        lat: 55.7558,
        lng: 37.6176,
        threatCount: 32,
        severity: 'high',
        lastActivity: new Date(Date.now() - 300000).toISOString()
      },
      {
        id: '3',
        country: 'United States',
        city: 'New York',
        lat: 40.7128,
        lng: -74.0060,
        threatCount: 28,
        severity: 'medium',
        lastActivity: new Date(Date.now() - 600000).toISOString()
      },
      {
        id: '4',
        country: 'Brazil',
        city: 'São Paulo',
        lat: -23.5505,
        lng: -46.6333,
        threatCount: 19,
        severity: 'medium',
        lastActivity: new Date(Date.now() - 900000).toISOString()
      },
      {
        id: '5',
        country: 'India',
        city: 'Mumbai',
        lat: 19.0760,
        lng: 72.8777,
        threatCount: 15,
        severity: 'low',
        lastActivity: new Date(Date.now() - 1200000).toISOString()
      },
      {
        id: '6',
        country: 'Germany',
        city: 'Berlin',
        lat: 52.5200,
        lng: 13.4050,
        threatCount: 12,
        severity: 'low',
        lastActivity: new Date(Date.now() - 1500000).toISOString()
      }
    ];
  };

  useEffect(() => {
    const fetchThreats = () => {
      setLoading(true);
      setTimeout(() => {
        setThreats(generateMockThreats());
        setLoading(false);
      }, 1000);
    };

    fetchThreats();
    const interval = setInterval(fetchThreats, 30000);
    return () => clearInterval(interval);
  }, []);

  const filteredThreats = threats.filter(threat => 
    selectedSeverity === 'all' || threat.severity === selectedSeverity
  );

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'high': return 'text-red-400 bg-red-500/20 border-red-500';
      case 'medium': return 'text-yellow-400 bg-yellow-500/20 border-yellow-500';
      case 'low': return 'text-green-400 bg-green-500/20 border-green-500';
      default: return 'text-slate-400 bg-slate-500/20 border-slate-500';
    }
  };

  const totalThreats = threats.reduce((sum, threat) => sum + threat.threatCount, 0);
  const highSeverityThreats = threats.filter(t => t.severity === 'high').length;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white">Global Threat Map</h1>
          <p className="text-slate-400 mt-1">Real-time global cyber threat visualization</p>
        </div>
        <div className="flex space-x-3">
          <Button 
            variant="outline"
            onClick={() => window.location.reload()}
            disabled={loading}
          >
            <RefreshCw className={`w-4 h-4 mr-2 ${loading ? 'animate-spin' : ''}`} />
            Refresh
          </Button>
          <Button className="bg-red-600 hover:bg-red-700">
            <Shield className="w-4 h-4 mr-2" />
            Block All
          </Button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-slate-800 border border-slate-700 rounded-lg p-4">
          <div className="text-center">
            <p className="text-slate-400 text-sm">Total Threats</p>
            <p className="text-white text-2xl font-bold">{totalThreats}</p>
          </div>
        </div>
        <div className="bg-slate-800 border border-slate-700 rounded-lg p-4">
          <div className="text-center">
            <p className="text-slate-400 text-sm">High Risk Locations</p>
            <p className="text-red-400 text-2xl font-bold">{highSeverityThreats}</p>
          </div>
        </div>
        <div className="bg-slate-800 border border-slate-700 rounded-lg p-4">
          <div className="text-center">
            <p className="text-slate-400 text-sm">Countries Affected</p>
            <p className="text-blue-400 text-2xl font-bold">{threats.length}</p>
          </div>
        </div>
        <div className="bg-slate-800 border border-slate-700 rounded-lg p-4">
          <div className="text-center">
            <p className="text-slate-400 text-sm">Active Now</p>
            <p className="text-green-400 text-2xl font-bold">
              {threats.filter(t => new Date(t.lastActivity) > new Date(Date.now() - 600000)).length}
            </p>
          </div>
        </div>
      </div>

      {/* Map Placeholder and Controls */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Map Area */}
        <div className="lg:col-span-2 bg-slate-800 border border-slate-700 rounded-lg p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-white text-lg font-semibold">Threat Visualization</h3>
            <div className="flex items-center space-x-2">
              <Filter className="w-4 h-4 text-slate-400" />
              <select 
                className="bg-slate-700 border border-slate-600 rounded px-3 py-1 text-white text-sm"
                value={selectedSeverity}
                onChange={(e) => setSelectedSeverity(e.target.value)}
              >
                <option value="all">All Severities</option>
                <option value="high">High</option>
                <option value="medium">Medium</option>
                <option value="low">Low</option>
              </select>
            </div>
          </div>
          
          {/* Map Placeholder */}
          <div className="bg-slate-900 rounded-lg p-8 min-h-96 flex items-center justify-center border border-slate-600">
            <div className="text-center">
              <Globe className="w-16 h-16 text-slate-500 mx-auto mb-4" />
              <p className="text-slate-400 mb-2">Interactive Threat Map</p>
              <p className="text-slate-500 text-sm">Real-time global threat visualization would be displayed here</p>
            </div>
          </div>
        </div>

        {/* Threat Locations List */}
        <div className="bg-slate-800 border border-slate-700 rounded-lg p-6">
          <h3 className="text-white text-lg font-semibold mb-4">Threat Locations</h3>
          
          {loading ? (
            <div className="text-slate-400">Loading threat data...</div>
          ) : (
            <div className="space-y-3 max-h-96 overflow-y-auto">
              {filteredThreats.map((threat) => (
                <div key={threat.id} className={`p-3 rounded-lg border ${getSeverityColor(threat.severity)}`}>
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex items-center space-x-2">
                      <MapPin className="w-4 h-4" />
                      <div>
                        <p className="font-medium">{threat.city}</p>
                        <p className="text-sm opacity-75">{threat.country}</p>
                      </div>
                    </div>
                    <span className="text-sm font-bold">{threat.threatCount}</span>
                  </div>
                  
                  <div className="flex items-center justify-between text-xs opacity-75">
                    <span className="capitalize">{threat.severity} risk</span>
                    <span>{new Date(threat.lastActivity).toLocaleTimeString()}</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Legend */}
      <div className="bg-slate-800 border border-slate-700 rounded-lg p-4">
        <h3 className="text-white font-medium mb-3">Threat Severity Legend</h3>
        <div className="flex items-center space-x-6">
          <div className="flex items-center space-x-2">
            <div className="w-4 h-4 bg-red-500 rounded-full"></div>
            <span className="text-slate-300 text-sm">High Risk (Critical threats)</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-4 h-4 bg-yellow-500 rounded-full"></div>
            <span className="text-slate-300 text-sm">Medium Risk (Moderate threats)</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-4 h-4 bg-green-500 rounded-full"></div>
            <span className="text-slate-300 text-sm">Low Risk (Minor threats)</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ThreatMapPage;
