
import { Provider } from 'react-redux';
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { store, RootState, AppDispatch } from './store';
import { checkAuth } from './store/slices/authSlice';
import Layout from './components/layout/Layout';
import Dashboard from './pages/Dashboard';
import Threats from './pages/Threats';
import NetworkPage from './pages/Network';
import SIEMPage from './pages/SIEM';
import ReportsPage from './pages/Reports';
import ThreatMapPage from './pages/ThreatMap';
import SettingsPage from './pages/Settings';
import AuthPage from './pages/Auth';
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const AppContent = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { isAuthenticated, loading } = useSelector((state: RootState) => state.auth);

  useEffect(() => {
    dispatch(checkAuth());
  }, [dispatch]);

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center">
        <div className="text-white text-lg">Loading...</div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <AuthPage />;
  }

  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/threats" element={<Threats />} />
        <Route path="/network" element={<NetworkPage />} />
        <Route path="/siem" element={<SIEMPage />} />
        <Route path="/reports" element={<ReportsPage />} />
        <Route path="/threat-map" element={<ThreatMapPage />} />
        <Route path="/settings" element={<SettingsPage />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Layout>
  );
};

const App = () => (
  <Provider store={store}>
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <AppContent />
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  </Provider>
);

export default App;
