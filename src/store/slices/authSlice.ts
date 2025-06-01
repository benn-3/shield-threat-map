
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
  loading: false,
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
    login: (state, action: PayloadAction<{ email: string; role: string }>) => {
      state.isAuthenticated = true;
      state.user = {
        id: '1', // This will come from your MongoDB backend
        email: action.payload.email,
        role: action.payload.role
      };
      state.error = null;
    },
    logout: (state) => {
      state.isAuthenticated = false;
      state.user = null;
      state.error = null;
      authApi.logout();
    },
    clearError: (state) => {
      state.error = null;
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

export const { login, logout, clearError } = authSlice.actions;
export default authSlice.reducer;
