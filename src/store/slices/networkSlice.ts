
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';

export interface NetworkDevice {
  id: string;
  ip: string;
  name: string;
  mac: string;
  type: 'server' | 'workstation' | 'router' | 'firewall' | 'computer' | 'mobile';
  status: 'online' | 'offline' | 'warning';
  risk: 'high' | 'medium' | 'low';
  lastSeen: string;
  connections: string[];
}

interface NetworkState {
  devices: NetworkDevice[];
  topology: any[];
  loading: boolean;
  error: string | null;
}

const initialState: NetworkState = {
  devices: [],
  topology: [],
  loading: false,
  error: null
};

export const fetchNetworkDevices = createAsyncThunk(
  'network/fetchDevices',
  async () => {
    await new Promise(resolve => setTimeout(resolve, 800));
    
    const mockDevices: NetworkDevice[] = [
      {
        id: '1',
        ip: '192.168.1.1',
        name: 'Main Router',
        mac: '00:1B:44:11:3A:B7',
        type: 'router',
        status: 'online',
        risk: 'low',
        lastSeen: new Date().toISOString(),
        connections: ['2', '3', '4']
      },
      {
        id: '2',
        ip: '192.168.1.10',
        name: 'Web Server',
        mac: '00:1B:44:22:3A:C8',
        type: 'server',
        status: 'online',
        risk: 'medium',
        lastSeen: new Date().toISOString(),
        connections: ['1']
      },
      {
        id: '3',
        ip: '192.168.1.20',
        name: 'DB Server',
        mac: '00:1B:44:33:3A:D9',
        type: 'server',
        status: 'warning',
        risk: 'high',
        lastSeen: new Date(Date.now() - 300000).toISOString(),
        connections: ['1']
      },
      {
        id: '4',
        ip: '192.168.1.100',
        name: 'Admin Workstation',
        mac: '00:1B:44:44:3A:EA',
        type: 'workstation',
        status: 'online',
        risk: 'low',
        lastSeen: new Date().toISOString(),
        connections: ['1']
      }
    ];
    
    return mockDevices;
  }
);

const networkSlice = createSlice({
  name: 'network',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchNetworkDevices.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchNetworkDevices.fulfilled, (state, action) => {
        state.loading = false;
        state.devices = action.payload;
      })
      .addCase(fetchNetworkDevices.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch network devices';
      });
  }
});

export const { clearError } = networkSlice.actions;
export default networkSlice.reducer;
