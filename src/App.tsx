
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
              <Route path="/network" element={<div className="text-white">Network page coming soon...</div>} />
              <Route path="/siem" element={<div className="text-white">SIEM page coming soon...</div>} />
              <Route path="/reports" element={<div className="text-white">Reports page coming soon...</div>} />
              <Route path="/threat-map" element={<div className="text-white">Threat Map page coming soon...</div>} />
              <Route path="/settings" element={<div className="text-white">Settings page coming soon...</div>} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Layout>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  </Provider>
);

export default App;
