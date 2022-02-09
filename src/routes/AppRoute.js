import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { TokenContextProvider } from '../contexts/TokenContext';
import { UserContextProvider } from '../contexts/UserContext';
import { Header } from '../components/header/Header';
import { PublicRoute } from './PublicRoute';

export const AppRoute = () => {
  return (
    <Router>
      <TokenContextProvider>
        <UserContextProvider>
          <Header />
          <Routes>
            <Route path="/*" element={<PublicRoute />} />
          </Routes>
        </UserContextProvider>
      </TokenContextProvider>
    </Router>
  );
};
