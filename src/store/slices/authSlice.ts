import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { authApi } from '../../services/authApi';

interface AuthState {
  isAuthenticated: boolean;
  user: {
    id: string;
    email: string;
    role: string;
  } | null;
  loading: boolean;
  error: string | null;
}

const initialState: AuthState = {
  isAuthenticated: false,
  user: null,
  loading: true, // Start with loading true to check auth state
  error: null
};

// Async thunk for checking authentication on app load
export const checkAuth = createAsyncThunk(
  'auth/checkAuth',
  async () => {
    const response = await authApi.checkAuth();
    if (response.success && response.user) {
      return response.user;
    }
    throw new Error(response.message);
  }
);

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login: (state, action: PayloadAction<{ id: string; email: string; role: string }>) => {
      state.isAuthenticated = true;
      state.user = action.payload;
      state.error = null;
      state.loading = false;
    },
    logout: (state) => {
      state.isAuthenticated = false;
      state.user = null;
      state.error = null;
      state.loading = false;
      authApi.logout();
    },
    clearError: (state) => {
      state.error = null;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(checkAuth.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(checkAuth.fulfilled, (state, action) => {
        state.loading = false;
        state.isAuthenticated = true;
        state.user = action.payload;
      })
      .addCase(checkAuth.rejected, (state, action) => {
        state.loading = false;
        state.isAuthenticated = false;
        state.user = null;
        state.error = action.error.message || 'Authentication failed';
      });
  },
});

export const { login, logout, clearError, setLoading } = authSlice.actions;
export default authSlice.reducer;
