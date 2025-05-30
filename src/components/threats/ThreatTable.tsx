
import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';
import { Threat } from '../../store/slices/threatsSlice';
import { cn } from '../../lib/utils';

interface ThreatTableProps {
  onThreatClick: (threat: Threat) => void;
}

const ThreatTable: React.FC<ThreatTableProps> = ({ onThreatClick }) => {
  const { threats, filters, loading } = useSelector((state: RootState) => state.threats);

  const filteredThreats = threats.filter(threat => {
    const severityMatch = filters.severity === 'all' || threat.severity === filters.severity;
    const typeMatch = filters.type === 'all' || threat.type === filters.type;
    const sourceMatch = filters.source === 'all' || threat.source === filters.source;
    return severityMatch && typeMatch && sourceMatch;
  });

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'high': return 'bg-red-500 text-white';
      case 'medium': return 'bg-yellow-500 text-black';
      case 'low': return 'bg-green-500 text-white';
      default: return 'bg-slate-500 text-white';
    }
  };

  if (loading) {
    return (
      <div className="bg-slate-800 border border-slate-700 rounded-lg p-6">
        <div className="animate-pulse space-y-4">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="h-16 bg-slate-700 rounded-lg" />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="bg-slate-800 border border-slate-700 rounded-lg overflow-hidden">
      <table className="w-full">
        <thead className="bg-slate-700">
          <tr>
            <th className="text-left p-4 text-slate-300 font-medium">IP Address</th>
            <th className="text-left p-4 text-slate-300 font-medium">Type</th>
            <th className="text-left p-4 text-slate-300 font-medium">Severity</th>
            <th className="text-left p-4 text-slate-300 font-medium">Source</th>
            <th className="text-left p-4 text-slate-300 font-medium">Country</th>
            <th className="text-left p-4 text-slate-300 font-medium">Confidence</th>
            <th className="text-left p-4 text-slate-300 font-medium">Time</th>
          </tr>
        </thead>
        <tbody>
          {filteredThreats.map((threat) => (
            <tr 
              key={threat.id}
              onClick={() => onThreatClick(threat)}
              className="border-t border-slate-600 hover:bg-slate-700 cursor-pointer transition-colors"
            >
              <td className="p-4 text-white font-mono">{threat.ip}</td>
              <td className="p-4 text-slate-300">{threat.type}</td>
              <td className="p-4">
                <span className={cn(
                  "px-2 py-1 rounded-full text-xs font-medium",
                  getSeverityColor(threat.severity)
                )}>
                  {threat.severity.toUpperCase()}
                </span>
              </td>
              <td className="p-4 text-slate-300">{threat.source}</td>
              <td className="p-4 text-slate-300">{threat.country}</td>
              <td className="p-4">
                <div className="flex items-center space-x-2">
                  <div className="w-16 bg-slate-600 rounded-full h-2">
                    <div 
                      className="bg-blue-500 h-2 rounded-full" 
                      style={{ width: `${threat.confidence}%` }}
                    />
                  </div>
                  <span className="text-slate-300 text-sm">{threat.confidence}%</span>
                </div>
              </td>
              <td className="p-4 text-slate-400 text-sm">
                {new Date(threat.timestamp).toLocaleString()}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      
      {filteredThreats.length === 0 && (
        <div className="p-8 text-center text-slate-400">
          No threats found matching the current filters.
        </div>
      )}
    </div>
  );
};

export default ThreatTable;
