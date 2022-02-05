import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { TokenContextProvider } from './contexts/TokenContext';
import { AppRouter } from './AppRouter';
import { Header } from './components/header/Header';
import { Dashboard } from './pages/dashBoard/Dashboard';
import { AdminCategory } from './pages/dashboardCategories/AdminCategory';

export const DashboardRouter = () => {
  return (
    <Router>
      <TokenContextProvider>
        <Header />
        <Routes>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/dashboard/adminCategory" element={<AdminCategory />} />
          <Route
            path="/dashboard/adminExperience"
            element={<AdminCategory />}
          />
          <Route path="*" element={<AppRouter />} />
        </Routes>
      </TokenContextProvider>
    </Router>
  );
};
