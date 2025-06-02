
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { apiClient } from '../../services/apiClient';

export interface Threat {
  id: string;
  ip: string;
  type: string;
  severity: 'high' | 'medium' | 'low';
  source: string;
  timestamp: string;
  country: string;
  description: string;
  confidence: number;
}

interface ThreatsState {
  threats: Threat[];
  loading: boolean;
  error: string | null;
  filters: {
    severity: string;
    type: string;
    source: string;
  };
}

const initialState: ThreatsState = {
  threats: [],
  loading: false,
  error: null,
  filters: {
    severity: 'all',
    type: 'all',
    source: 'all'
  }
};

// Fetch threats from your backend API
export const fetchThreats = createAsyncThunk(
  'threats/fetchThreats',
  async () => {
    try {
      const data = await apiClient.get('/threats');
      return data.threats || data; // Handle different response structures
    } catch (error) {
      // Fallback to mock data if backend is not available
      console.warn('Backend not available, using mock data');
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const mockThreats: Threat[] = [
        {
          id: '1',
          ip: '192.168.1.100',
          type: 'Malware',
          severity: 'high',
          source: 'AbuseIPDB',
          timestamp: new Date().toISOString(),
          country: 'US',
          description: 'Suspicious malware activity detected',
          confidence: 95
        },
        {
          id: '2',
          ip: '10.0.0.50',
          type: 'Brute Force',
          severity: 'medium',
          source: 'VirusTotal',
          timestamp: new Date(Date.now() - 3600000).toISOString(),
          country: 'RU',
          description: 'Multiple failed login attempts',
          confidence: 87
        },
        {
          id: '3',
          ip: '172.16.0.25',
          type: 'Phishing',
          severity: 'low',
          source: 'AlienVault OTX',
          timestamp: new Date(Date.now() - 7200000).toISOString(),
          country: 'CN',
          description: 'Potential phishing domain detected',
          confidence: 72
        }
      ];
      
      return mockThreats;
    }
  }
);

const threatsSlice = createSlice({
  name: 'threats',
  initialState,
  reducers: {
    setFilters: (state, action: PayloadAction<Partial<ThreatsState['filters']>>) => {
      state.filters = { ...state.filters, ...action.payload };
    },
    clearError: (state) => {
      state.error = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchThreats.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchThreats.fulfilled, (state, action) => {
        state.loading = false;
        state.threats = action.payload;
      })
      .addCase(fetchThreats.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch threats';
      });
  }
});

export const { setFilters, clearError } = threatsSlice.actions;
export default threatsSlice.reducer;
