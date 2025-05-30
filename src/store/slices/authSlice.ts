
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface AuthState {
  isAuthenticated: boolean;
  user: {
    id: string;
    email: string;
    role: string;
  } | null;
}

const initialState: AuthState = {
  isAuthenticated: true, // For demo purposes
  user: {
    id: '1',
    email: 'admin@cybersec.com',
    role: 'Security Analyst'
  }
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login: (state, action: PayloadAction<{ email: string; role: string }>) => {
      state.isAuthenticated = true;
      state.user = {
        id: '1',
        email: action.payload.email,
        role: action.payload.role
      };
    },
    logout: (state) => {
      state.isAuthenticated = false;
      state.user = null;
    },
  },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
