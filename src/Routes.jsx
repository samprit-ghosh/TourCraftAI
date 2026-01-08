
import { BrowserRouter, Routes as RouterRoutes, Route } from "react-router-dom";

import HomePage from './pages/home-page';
// import AdminDashboard from './pages/admin-dashboard';
import AIDestinationRecommender from './pages/ai-destination-recommender';

// import TourPackageDetails from './pages/tour-package-details';
// import BookingManagement from './pages/booking-management';
import NotFound from './pages/NotFound';
import ErrorBoundary from './components/ErrorBoundary';
import ScrollToTop from './components/ScrollToTop';
import Packagediscovery from './pages/tour-package-discovery/tour-package-discovery';
import TourPackage from './pages/tour-package-details/tour-package-details';
import Navbar from "./components/ui/Navbar";
import Footer from "./components/ui/Footer";

const Routes = () => {
  return (
    <BrowserRouter>
    <Navbar/>
      <ErrorBoundary>
        <ScrollToTop />

        <RouterRoutes>
          {/* Define your route here */}

          <Route path="/" element={<HomePage />} />
          <Route path="/home-page" element={<HomePage />} />
          {/* <Route path="/admin-dashboard" element={<AdminDashboard />} /> */}
          <Route path="/ai-destination-recommender" element={<AIDestinationRecommender />} />
          <Route path="/tour-package-discovery" element={<Packagediscovery />} />
          <Route path="/tour-package-details" element={<TourPackage />} />
          {/* <Route path="/booking-management" element={<BookingManagement />} />  */}
          * <Route path="*" element={<NotFound />} />

        </RouterRoutes>

      </ErrorBoundary>
      <Footer/>
    </BrowserRouter>
  );
};

export default Routes;