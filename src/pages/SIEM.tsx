
import React, { useState, useEffect } from 'react';
import { Button } from '../components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { Activity, AlertTriangle, Filter, Search, RefreshCw } from 'lucide-react';

interface SIEMEvent {
  id: string;
  timestamp: string;
  severity: 'critical' | 'high' | 'medium' | 'low' | 'info';
  source: string;
  event: string;
  description: string;
  sourceIp?: string;
  destinationIp?: string;
}

const SIEMPage = () => {
  const [events, setEvents] = useState<SIEMEvent[]>([]);
  const [loading, setLoading] = useState(false);
  const [severityFilter, setSeverityFilter] = useState('all');
  const [sourceFilter, setSourceFilter] = useState('all');

  // Mock SIEM events
  const generateMockEvents = (): SIEMEvent[] => {
    const mockEvents: SIEMEvent[] = [
      {
        id: '1',
        timestamp: new Date().toISOString(),
        severity: 'critical',
        source: 'Firewall',
        event: 'INTRUSION_ATTEMPT',
        description: 'Multiple failed login attempts detected',
        sourceIp: '192.168.1.100',
        destinationIp: '10.0.0.5'
      },
      {
        id: '2',
        timestamp: new Date(Date.now() - 60000).toISOString(),
        severity: 'high',
        source: 'IDS',
        event: 'MALWARE_DETECTED',
        description: 'Suspicious file execution detected',
        sourceIp: '172.16.0.25'
      },
      {
        id: '3',
        timestamp: new Date(Date.now() - 120000).toISOString(),
        severity: 'medium',
        source: 'Web Gateway',
        event: 'BLOCKED_URL',
        description: 'Access to malicious URL blocked',
        sourceIp: '192.168.1.50'
      },
      {
        id: '4',
        timestamp: new Date(Date.now() - 180000).toISOString(),
        severity: 'low',
        source: 'Antivirus',
        event: 'QUARANTINE',
        description: 'File quarantined successfully',
        sourceIp: '10.0.0.15'
      },
      {
        id: '5',
        timestamp: new Date(Date.now() - 240000).toISOString(),
        severity: 'info',
        source: 'System',
        event: 'USER_LOGIN',
        description: 'User logged in successfully',
        sourceIp: '192.168.1.75'
      }
    ];
    return mockEvents;
  };

  useEffect(() => {
    const fetchEvents = () => {
      setLoading(true);
      setTimeout(() => {
        setEvents(generateMockEvents());
        setLoading(false);
      }, 1000);
    };

    fetchEvents();
    const interval = setInterval(fetchEvents, 30000);
    return () => clearInterval(interval);
  }, []);

  const filteredEvents = events.filter(event => {
    const severityMatch = severityFilter === 'all' || event.severity === severityFilter;
    const sourceMatch = sourceFilter === 'all' || event.source === sourceFilter;
    return severityMatch && sourceMatch;
  });

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'critical': return 'text-red-400 bg-red-500/20';
      case 'high': return 'text-orange-400 bg-orange-500/20';
      case 'medium': return 'text-yellow-400 bg-yellow-500/20';
      case 'low': return 'text-blue-400 bg-blue-500/20';
      case 'info': return 'text-green-400 bg-green-500/20';
      default: return 'text-slate-400 bg-slate-500/20';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white">SIEM Dashboard</h1>
          <p className="text-slate-400 mt-1">Security Information and Event Management</p>
        </div>
        <div className="flex space-x-3">
          <Button 
            variant="outline"
            onClick={() => window.location.reload()}
            disabled={loading}
          >
            <RefreshCw className={`w-4 h-4 mr-2 ${loading ? 'animate-spin' : ''}`} />
            {loading ? 'Refreshing...' : 'Refresh'}
          </Button>
          <Button className="bg-purple-600 hover:bg-purple-700">
            <Activity className="w-4 h-4 mr-2" />
            Real-time Mode
          </Button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        {['critical', 'high', 'medium', 'low', 'info'].map((severity) => (
          <div key={severity} className="bg-slate-800 border border-slate-700 rounded-lg p-4">
            <div className="text-center">
              <p className="text-slate-400 text-sm capitalize">{severity}</p>
              <p className={`text-2xl font-bold ${getSeverityColor(severity).split(' ')[0]}`}>
                {events.filter(e => e.severity === severity).length}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Filters */}
      <div className="bg-slate-800 border border-slate-700 rounded-lg p-4">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-2">
            <Filter className="w-5 h-5 text-slate-400" />
            <h3 className="text-white font-medium">Filters</h3>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-slate-400 text-sm mb-2">Severity</label>
            <Select value={severityFilter} onValueChange={setSeverityFilter}>
              <SelectTrigger className="bg-slate-700 border-slate-600 text-white">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-slate-700 border-slate-600">
                <SelectItem value="all">All Severities</SelectItem>
                <SelectItem value="critical">Critical</SelectItem>
                <SelectItem value="high">High</SelectItem>
                <SelectItem value="medium">Medium</SelectItem>
                <SelectItem value="low">Low</SelectItem>
                <SelectItem value="info">Info</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <label className="block text-slate-400 text-sm mb-2">Source</label>
            <Select value={sourceFilter} onValueChange={setSourceFilter}>
              <SelectTrigger className="bg-slate-700 border-slate-600 text-white">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-slate-700 border-slate-600">
                <SelectItem value="all">All Sources</SelectItem>
                <SelectItem value="Firewall">Firewall</SelectItem>
                <SelectItem value="IDS">IDS</SelectItem>
                <SelectItem value="Web Gateway">Web Gateway</SelectItem>
                <SelectItem value="Antivirus">Antivirus</SelectItem>
                <SelectItem value="System">System</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <label className="block text-slate-400 text-sm mb-2">Search</label>
            <div className="relative">
              <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                placeholder="Search events..."
                className="bg-slate-700 border border-slate-600 rounded-lg pl-10 pr-4 py-2 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-purple-500 w-full"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Events List */}
      <div className="bg-slate-800 border border-slate-700 rounded-lg p-6">
        <h3 className="text-white text-lg font-semibold mb-4">Security Events</h3>
        
        {loading ? (
          <div className="text-slate-400">Loading events...</div>
        ) : (
          <div className="space-y-3">
            {filteredEvents.map((event) => (
              <div key={event.id} className="bg-slate-700 rounded-lg p-4 border border-slate-600">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      <span className={`px-2 py-1 rounded text-xs font-medium ${getSeverityColor(event.severity)}`}>
                        {event.severity.toUpperCase()}
                      </span>
                      <span className="text-slate-300 font-medium">{event.event}</span>
                      <span className="text-slate-400 text-sm">{event.source}</span>
                    </div>
                    <p className="text-slate-300 mb-2">{event.description}</p>
                    <div className="flex items-center space-x-4 text-sm text-slate-400">
                      <span>{new Date(event.timestamp).toLocaleString()}</span>
                      {event.sourceIp && <span>Source: {event.sourceIp}</span>}
                      {event.destinationIp && <span>Dest: {event.destinationIp}</span>}
                    </div>
                  </div>
                  <AlertTriangle className="w-5 h-5 text-red-400 ml-4" />
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default SIEMPage;
