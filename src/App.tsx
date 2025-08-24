import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import SafeReportApp from "./components/SafeReportApp";
import { ApplicationTracker } from "./components/ApplicationTracker";
import PeriodAid from "./components/PeriodAid";
import PeriodAidAdmin from "./components/PeriodAidAdmin";
import PeriodAidDashboard from "./components/PeriodAidDashboard";
import IpfsEncryptor from "./pages/IpfsEncryptor";
import IpfsDecryptor from "./pages/IpfsDecryptor";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/periodaid" element={<PeriodAid />} />
          <Route path="/periodaid/admin" element={<PeriodAidAdmin />} />
          <Route path="/periodaid/dashboard" element={<PeriodAidDashboard />} />
          <Route path="/tools/ipfs" element={<IpfsEncryptor />} />
          <Route path="/tools/ipfs-decrypt" element={<IpfsDecryptor />} />
          <Route path="/safereport" element={<SafeReportApp />} />
          <Route path="/track" element={<ApplicationTracker />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
