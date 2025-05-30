
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '../store';
import { fetchThreats, Threat } from '../store/slices/threatsSlice';
import ThreatFilters from '../components/threats/ThreatFilters';
import ThreatTable from '../components/threats/ThreatTable';
import { Button } from '../components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '../components/ui/dialog';
import { Flag, Shield, X } from 'lucide-react';

const Threats = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { threats, loading } = useSelector((state: RootState) => state.threats);
  const [selectedThreat, setSelectedThreat] = useState<Threat | null>(null);

  useEffect(() => {
    dispatch(fetchThreats());
    
    const interval = setInterval(() => {
      dispatch(fetchThreats());
    }, 30000);

    return () => clearInterval(interval);
  }, [dispatch]);

  const handleThreatClick = (threat: Threat) => {
    setSelectedThreat(threat);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white">Threat Intelligence</h1>
          <p className="text-slate-400 mt-1">Real-time threat monitoring and analysis</p>
        </div>
        <div className="flex space-x-3">
          <Button 
            variant="outline"
            onClick={() => dispatch(fetchThreats())}
            disabled={loading}
          >
            {loading ? 'Refreshing...' : 'Refresh Data'}
          </Button>
          <Button className="bg-red-600 hover:bg-red-700">
            <Shield className="w-4 h-4 mr-2" />
            Block Selected
          </Button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-slate-800 border border-slate-700 rounded-lg p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-slate-400 text-sm">Total Threats</p>
              <p className="text-white text-2xl font-bold">{threats.length}</p>
            </div>
            <Flag className="w-8 h-8 text-red-500" />
          </div>
        </div>
        
        <div className="bg-slate-800 border border-slate-700 rounded-lg p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-slate-400 text-sm">High Severity</p>
              <p className="text-white text-2xl font-bold">
                {threats.filter(t => t.severity === 'high').length}
              </p>
            </div>
            <div className="w-3 h-3 bg-red-500 rounded-full" />
          </div>
        </div>
        
        <div className="bg-slate-800 border border-slate-700 rounded-lg p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-slate-400 text-sm">Medium Severity</p>
              <p className="text-white text-2xl font-bold">
                {threats.filter(t => t.severity === 'medium').length}
              </p>
            </div>
            <div className="w-3 h-3 bg-yellow-500 rounded-full" />
          </div>
        </div>
        
        <div className="bg-slate-800 border border-slate-700 rounded-lg p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-slate-400 text-sm">Low Severity</p>
              <p className="text-white text-2xl font-bold">
                {threats.filter(t => t.severity === 'low').length}
              </p>
            </div>
            <div className="w-3 h-3 bg-green-500 rounded-full" />
          </div>
        </div>
      </div>

      {/* Filters */}
      <ThreatFilters />

      {/* Threats Table */}
      <ThreatTable onThreatClick={handleThreatClick} />

      {/* Threat Detail Modal */}
      <Dialog open={!!selectedThreat} onOpenChange={() => setSelectedThreat(null)}>
        <DialogContent className="bg-slate-800 border-slate-700 text-white max-w-2xl">
          <DialogHeader>
            <DialogTitle className="flex items-center justify-between">
              <span>Threat Details</span>
              <Button 
                variant="ghost" 
                size="sm"
                onClick={() => setSelectedThreat(null)}
              >
                <X className="w-4 h-4" />
              </Button>
            </DialogTitle>
          </DialogHeader>
          
          {selectedThreat && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-slate-400 text-sm">IP Address</label>
                  <p className="text-white font-mono text-lg">{selectedThreat.ip}</p>
                </div>
                <div>
                  <label className="text-slate-400 text-sm">Country</label>
                  <p className="text-white">{selectedThreat.country}</p>
                </div>
                <div>
                  <label className="text-slate-400 text-sm">Threat Type</label>
                  <p className="text-white">{selectedThreat.type}</p>
                </div>
                <div>
                  <label className="text-slate-400 text-sm">Severity</label>
                  <span className={`px-2 py-1 rounded text-sm font-medium ${
                    selectedThreat.severity === 'high' ? 'bg-red-500' :
                    selectedThreat.severity === 'medium' ? 'bg-yellow-500 text-black' : 'bg-green-500'
                  }`}>
                    {selectedThreat.severity.toUpperCase()}
                  </span>
                </div>
                <div>
                  <label className="text-slate-400 text-sm">Source</label>
                  <p className="text-white">{selectedThreat.source}</p>
                </div>
                <div>
                  <label className="text-slate-400 text-sm">Confidence</label>
                  <p className="text-white">{selectedThreat.confidence}%</p>
                </div>
              </div>
              
              <div>
                <label className="text-slate-400 text-sm">Description</label>
                <p className="text-white">{selectedThreat.description}</p>
              </div>
              
              <div>
                <label className="text-slate-400 text-sm">Detection Time</label>
                <p className="text-white">{new Date(selectedThreat.timestamp).toLocaleString()}</p>
              </div>
              
              <div className="flex space-x-3 pt-4">
                <Button className="bg-red-600 hover:bg-red-700">
                  Block IP Address
                </Button>
                <Button variant="outline">
                  Add to Whitelist
                </Button>
                <Button variant="outline">
                  Report False Positive
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Threats;
