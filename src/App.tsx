
import { Provider } from 'react-redux';
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { store } from './store';
import Layout from './components/layout/Layout';
import Dashboard from './pages/Dashboard';
import Threats from './pages/Threats';
import NetworkPage from './pages/Network';
import SIEMPage from './pages/SIEM';
import ReportsPage from './pages/Reports';
import ThreatMapPage from './pages/ThreatMap';
import SettingsPage from './pages/Settings';
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <Provider store={store}>
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
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
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  </Provider>
);

export default App;
