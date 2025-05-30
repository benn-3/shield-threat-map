
import React, { useState, useEffect } from 'react';
import { Button } from '../components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { File, Download, Calendar, Filter, RefreshCw } from 'lucide-react';

interface Report {
  id: string;
  name: string;
  type: 'security' | 'network' | 'compliance' | 'threat';
  status: 'completed' | 'pending' | 'failed';
  createdAt: string;
  size: string;
  description: string;
}

const ReportsPage = () => {
  const [reports, setReports] = useState<Report[]>([]);
  const [loading, setLoading] = useState(false);
  const [typeFilter, setTypeFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');

  // Mock reports data
  const generateMockReports = (): Report[] => {
    return [
      {
        id: '1',
        name: 'Weekly Security Assessment',
        type: 'security',
        status: 'completed',
        createdAt: new Date().toISOString(),
        size: '2.4 MB',
        description: 'Comprehensive security assessment for the past week'
      },
      {
        id: '2',
        name: 'Network Traffic Analysis',
        type: 'network',
        status: 'completed',
        createdAt: new Date(Date.now() - 86400000).toISOString(),
        size: '1.8 MB',
        description: 'Detailed analysis of network traffic patterns'
      },
      {
        id: '3',
        name: 'Compliance Audit Report',
        type: 'compliance',
        status: 'pending',
        createdAt: new Date(Date.now() - 172800000).toISOString(),
        size: '-',
        description: 'SOC 2 compliance audit results'
      },
      {
        id: '4',
        name: 'Threat Intelligence Summary',
        type: 'threat',
        status: 'completed',
        createdAt: new Date(Date.now() - 259200000).toISOString(),
        size: '3.1 MB',
        description: 'Monthly threat intelligence summary and recommendations'
      },
      {
        id: '5',
        name: 'Vulnerability Scan Results',
        type: 'security',
        status: 'failed',
        createdAt: new Date(Date.now() - 345600000).toISOString(),
        size: '-',
        description: 'Automated vulnerability scan of all systems'
      }
    ];
  };

  useEffect(() => {
    const fetchReports = () => {
      setLoading(true);
      setTimeout(() => {
        setReports(generateMockReports());
        setLoading(false);
      }, 1000);
    };

    fetchReports();
  }, []);

  const filteredReports = reports.filter(report => {
    const typeMatch = typeFilter === 'all' || report.type === typeFilter;
    const statusMatch = statusFilter === 'all' || report.status === statusFilter;
    return typeMatch && statusMatch;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'text-green-400 bg-green-500/20';
      case 'pending': return 'text-yellow-400 bg-yellow-500/20';
      case 'failed': return 'text-red-400 bg-red-500/20';
      default: return 'text-slate-400 bg-slate-500/20';
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'security': return 'text-red-400 bg-red-500/20';
      case 'network': return 'text-blue-400 bg-blue-500/20';
      case 'compliance': return 'text-purple-400 bg-purple-500/20';
      case 'threat': return 'text-orange-400 bg-orange-500/20';
      default: return 'text-slate-400 bg-slate-500/20';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white">Security Reports</h1>
          <p className="text-slate-400 mt-1">Generate and download security reports</p>
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
          <Button className="bg-green-600 hover:bg-green-700">
            <File className="w-4 h-4 mr-2" />
            Generate Report
          </Button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-slate-800 border border-slate-700 rounded-lg p-4">
          <div className="text-center">
            <p className="text-slate-400 text-sm">Total Reports</p>
            <p className="text-white text-2xl font-bold">{reports.length}</p>
          </div>
        </div>
        <div className="bg-slate-800 border border-slate-700 rounded-lg p-4">
          <div className="text-center">
            <p className="text-slate-400 text-sm">Completed</p>
            <p className="text-green-400 text-2xl font-bold">
              {reports.filter(r => r.status === 'completed').length}
            </p>
          </div>
        </div>
        <div className="bg-slate-800 border border-slate-700 rounded-lg p-4">
          <div className="text-center">
            <p className="text-slate-400 text-sm">Pending</p>
            <p className="text-yellow-400 text-2xl font-bold">
              {reports.filter(r => r.status === 'pending').length}
            </p>
          </div>
        </div>
        <div className="bg-slate-800 border border-slate-700 rounded-lg p-4">
          <div className="text-center">
            <p className="text-slate-400 text-sm">Failed</p>
            <p className="text-red-400 text-2xl font-bold">
              {reports.filter(r => r.status === 'failed').length}
            </p>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-slate-800 border border-slate-700 rounded-lg p-4">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-2">
            <Filter className="w-5 h-5 text-slate-400" />
            <h3 className="text-white font-medium">Filters</h3>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-slate-400 text-sm mb-2">Report Type</label>
            <Select value={typeFilter} onValueChange={setTypeFilter}>
              <SelectTrigger className="bg-slate-700 border-slate-600 text-white">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-slate-700 border-slate-600">
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="security">Security</SelectItem>
                <SelectItem value="network">Network</SelectItem>
                <SelectItem value="compliance">Compliance</SelectItem>
                <SelectItem value="threat">Threat</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <label className="block text-slate-400 text-sm mb-2">Status</label>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="bg-slate-700 border-slate-600 text-white">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-slate-700 border-slate-600">
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="completed">Completed</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="failed">Failed</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      {/* Reports List */}
      <div className="bg-slate-800 border border-slate-700 rounded-lg p-6">
        <h3 className="text-white text-lg font-semibold mb-4">Available Reports</h3>
        
        {loading ? (
          <div className="text-slate-400">Loading reports...</div>
        ) : (
          <div className="space-y-4">
            {filteredReports.map((report) => (
              <div key={report.id} className="bg-slate-700 rounded-lg p-4 border border-slate-600">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      <File className="w-5 h-5 text-slate-400" />
                      <span className="text-white font-medium">{report.name}</span>
                      <span className={`px-2 py-1 rounded text-xs font-medium ${getTypeColor(report.type)}`}>
                        {report.type.toUpperCase()}
                      </span>
                      <span className={`px-2 py-1 rounded text-xs font-medium ${getStatusColor(report.status)}`}>
                        {report.status.toUpperCase()}
                      </span>
                    </div>
                    <p className="text-slate-300 mb-2">{report.description}</p>
                    <div className="flex items-center space-x-4 text-sm text-slate-400">
                      <span className="flex items-center">
                        <Calendar className="w-4 h-4 mr-1" />
                        {new Date(report.createdAt).toLocaleDateString()}
                      </span>
                      <span>Size: {report.size}</span>
                    </div>
                  </div>
                  <div className="ml-4">
                    {report.status === 'completed' && (
                      <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
                        <Download className="w-4 h-4 mr-2" />
                        Download
                      </Button>
                    )}
                    {report.status === 'pending' && (
                      <Button size="sm" variant="outline" disabled>
                        Processing...
                      </Button>
                    )}
                    {report.status === 'failed' && (
                      <Button size="sm" variant="outline" className="text-red-400 border-red-400">
                        Retry
                      </Button>
                    )}
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

export default ReportsPage;
