import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import WelcomeScreen from "./components/onboarding/WelcomeScreen";
import LanguageSelection from "./components/onboarding/LanguageSelection";
import WelcomeMessage from "./components/onboarding/WelcomeMessage";
import FeatureShowcase from "./components/onboarding/FeatureShowcase";
import EmailCollection from "./components/onboarding/EmailCollection";
import Confirmation from "./components/onboarding/Confirmation";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/onboarding" element={<WelcomeScreen />} />
          <Route path="/language" element={<LanguageSelection />} />
          <Route path="/welcome" element={<WelcomeMessage />} />
          <Route path="/features" element={<FeatureShowcase />} />
          <Route path="/email" element={<EmailCollection />} />
          <Route path="/confirmation" element={<Confirmation />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
