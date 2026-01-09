import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import ActivityDetail from "./pages/ActivityDetail";
import NearbyPage from "./pages/NearbyPage";
import TodayPage from "./pages/TodayPage";
import FavoritesPage from "./pages/FavoritesPage";
import ProfilePage from "./pages/ProfilePage";
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminActivities from "./pages/admin/AdminActivities";
import AdminBookings from "./pages/admin/AdminBookings";
import BookingsPage from "./pages/BookingsPage";
import SettingsPage from "./pages/SettingsPage";
import HelpPage from "./pages/HelpPage";
import AdminLogin from "./pages/admin/AdminLogin";
import AdminMessages from "./pages/admin/AdminMessages";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          {/* Mobile App Routes */}
          <Route path="/" element={<Index />} />
          <Route path="/activity/:id" element={<ActivityDetail />} />
          <Route path="/today" element={<TodayPage />} />
          <Route path="/nearby" element={<NearbyPage />} />
          <Route path="/favorites" element={<FavoritesPage />} />
          <Route path="/profile" element={<ProfilePage />} />

          {/* New Profile Pages */}
          <Route path="/bookings" element={<BookingsPage />} />
          <Route path="/settings" element={<SettingsPage />} />
          <Route path="/payment" element={<SettingsPage />} /> {/* Placeholder */}
          <Route path="/notifications" element={<SettingsPage />} /> {/* Placeholder */}
          <Route path="/help" element={<HelpPage />} />

          {/* Admin Panel Routes */}
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/admin/activities" element={<AdminActivities />} />
          <Route path="/admin/bookings" element={<AdminBookings />} />
          <Route path="/admin/messages" element={<AdminMessages />} />
          <Route path="/admin/settings" element={<AdminMessages />} /> {/* Route alias for settings as messages for now */}

          {/* Catch-all */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
