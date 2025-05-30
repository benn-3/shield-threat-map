
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface UIState {
  theme: 'dark' | 'light';
  sidebarCollapsed: boolean;
  loading: boolean;
}

const initialState: UIState = {
  theme: 'dark',
  sidebarCollapsed: false,
  loading: false
};

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    toggleTheme: (state) => {
      state.theme = state.theme === 'dark' ? 'light' : 'dark';
    },
    toggleSidebar: (state) => {
      state.sidebarCollapsed = !state.sidebarCollapsed;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    }
  }
});

export const { toggleTheme, toggleSidebar, setLoading } = uiSlice.actions;
export default uiSlice.reducer;
