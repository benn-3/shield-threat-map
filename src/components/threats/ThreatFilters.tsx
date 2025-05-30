
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store';
import { setFilters } from '../../store/slices/threatsSlice';
import { Button } from '../ui/button';
import { filter } from 'lucide-react';

const ThreatFilters = () => {
  const dispatch = useDispatch();
  const { filters } = useSelector((state: RootState) => state.threats);

  const handleFilterChange = (key: string, value: string) => {
    dispatch(setFilters({ [key]: value }));
  };

  return (
    <div className="bg-slate-800 border border-slate-700 rounded-lg p-4">
      <div className="flex items-center space-x-4">
        <div className="flex items-center space-x-2">
          <filter className="w-4 h-4 text-slate-400" />
          <span className="text-slate-300 font-medium">Filters:</span>
        </div>
        
        <select 
          value={filters.severity}
          onChange={(e) => handleFilterChange('severity', e.target.value)}
          className="bg-slate-700 text-white border border-slate-600 rounded px-3 py-1 text-sm"
        >
          <option value="all">All Severities</option>
          <option value="high">High</option>
          <option value="medium">Medium</option>
          <option value="low">Low</option>
        </select>

        <select 
          value={filters.type}
          onChange={(e) => handleFilterChange('type', e.target.value)}
          className="bg-slate-700 text-white border border-slate-600 rounded px-3 py-1 text-sm"
        >
          <option value="all">All Types</option>
          <option value="Malware">Malware</option>
          <option value="Phishing">Phishing</option>
          <option value="Brute Force">Brute Force</option>
          <option value="DDoS">DDoS</option>
        </select>

        <select 
          value={filters.source}
          onChange={(e) => handleFilterChange('source', e.target.value)}
          className="bg-slate-700 text-white border border-slate-600 rounded px-3 py-1 text-sm"
        >
          <option value="all">All Sources</option>
          <option value="AbuseIPDB">AbuseIPDB</option>
          <option value="VirusTotal">VirusTotal</option>
          <option value="AlienVault OTX">AlienVault OTX</option>
        </select>

        <Button 
          variant="outline" 
          size="sm"
          onClick={() => dispatch(setFilters({ severity: 'all', type: 'all', source: 'all' }))}
        >
          Clear Filters
        </Button>
      </div>
    </div>
  );
};

export default ThreatFilters;
