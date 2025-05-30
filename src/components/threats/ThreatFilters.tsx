
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../store';
import { setFilters } from '../../store/slices/threatsSlice';
import { Button } from '../ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Filter } from 'lucide-react';

const ThreatFilters = () => {
  const dispatch = useDispatch();
  const { filters } = useSelector((state: RootState) => state.threats);

  return (
    <div className="bg-slate-800 border border-slate-700 rounded-lg p-4">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-2">
          <Filter className="w-5 h-5 text-slate-400" />
          <h3 className="text-white font-medium">Filters</h3>
        </div>
        <Button
          variant="outline"
          size="sm"
          onClick={() => dispatch(setFilters({ severity: 'all', type: 'all', source: 'all' }))}
        >
          Clear All
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <label className="block text-slate-400 text-sm mb-2">Severity</label>
          <Select
            value={filters.severity}
            onValueChange={(value) => dispatch(setFilters({ severity: value }))}
          >
            <SelectTrigger className="bg-slate-700 border-slate-600 text-white">
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="bg-slate-700 border-slate-600">
              <SelectItem value="all">All Severities</SelectItem>
              <SelectItem value="high">High</SelectItem>
              <SelectItem value="medium">Medium</SelectItem>
              <SelectItem value="low">Low</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div>
          <label className="block text-slate-400 text-sm mb-2">Type</label>
          <Select
            value={filters.type}
            onValueChange={(value) => dispatch(setFilters({ type: value }))}
          >
            <SelectTrigger className="bg-slate-700 border-slate-600 text-white">
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="bg-slate-700 border-slate-600">
              <SelectItem value="all">All Types</SelectItem>
              <SelectItem value="malware">Malware</SelectItem>
              <SelectItem value="brute-force">Brute Force</SelectItem>
              <SelectItem value="phishing">Phishing</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div>
          <label className="block text-slate-400 text-sm mb-2">Source</label>
          <Select
            value={filters.source}
            onValueChange={(value) => dispatch(setFilters({ source: value }))}
          >
            <SelectTrigger className="bg-slate-700 border-slate-600 text-white">
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="bg-slate-700 border-slate-600">
              <SelectItem value="all">All Sources</SelectItem>
              <SelectItem value="abuseipdb">AbuseIPDB</SelectItem>
              <SelectItem value="virustotal">VirusTotal</SelectItem>
              <SelectItem value="alienvault">AlienVault OTX</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  );
};

export default ThreatFilters;
