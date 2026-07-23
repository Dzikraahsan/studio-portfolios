import { useMemo } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";

// UI Components & Providers
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ThemeProvider } from "@/components/ThemeProvider";

// Global Layout & Interactive Components
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ScrollToTop from "@/components/ScrollToTop";
import { ScrollToTopButton } from "@/components/ScrollToTopButton";
import ClickSpark from "@/components/ClickSpark";

// Pages
import Index from "./pages/Index";
import About from "./pages/About";
import Projects from "./pages/Projects";
import Labs from "./pages/LearningJourney";
import Blog from "./pages/Legacy";
import Contact from "./pages/Contact";
import NotFound from "./pages/NotFound";

const createQueryClient = () =>
  new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 1000 * 60 * 5,
        gcTime: 1000 * 60 * 15,
        refetchOnWindowFocus: false,
        retry: 1,
      },
    },
  });

let queryClientInstance: QueryClient | undefined;
const getQueryClient = () => {
  if (!queryClientInstance) {
    queryClientInstance = createQueryClient();
  }
  return queryClientInstance;
};

const AnimatedRoutes = () => {
  const location = useLocation();

  return (
    <>
      <ScrollToTop />
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<Index />} />
          <Route path="/about" element={<About />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/journey" element={<Labs />} />
          <Route path="/legacy" element={<Blog />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </AnimatePresence>
    </>
  );
};

const AppShell = () => {
  return (
    <ClickSpark
      sparkColor="#ffffff"
      sparkSize={10}
      sparkRadius={15}
      sparkCount={8}
      duration={400}
      easing="ease-out"
    >
      <div className="min-h-screen flex flex-col relative overflow-hidden">
        {/* Accessibility Skip Link */}
        <a href="#main-content" className="skip-to-content">
          Skip to main content
        </a>

        {/* Background Layer */}
        <div className="absolute inset-0 -z-10 bg-background" aria-hidden="true" />

        <Navbar />

        {/* Landmark Main Content */}
        <main
          id="main-content"
          tabIndex={-1}
          className="flex-1 focus:outline-none"
        >
          <AnimatedRoutes />
        </main>

        <Footer />

        <ScrollToTopButton />
      </div>
    </ClickSpark>
  );
};

const App = () => {
  const queryClient = useMemo(() => getQueryClient(), []);

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <AppShell />
          </BrowserRouter>
        </TooltipProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
};

export default App;
