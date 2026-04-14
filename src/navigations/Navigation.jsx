import React, { Suspense } from 'react'
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { ROUTES } from '../constants/routes';
import Header from '../components/Header';
import Footer from '../components/Footer';
import FloatingMenu from '../components/FloatingMenu';
import ScrollToTop from '../components/ScrollToTop';
import FirstVisitPopup from '../components/FirstVisitPopup';

// Create lazy components for all routes outside the component
const lazyRoutes = ROUTES.map(({ path, loader }) => ({
  path,
  Component: React.lazy(loader)
}));

const AppShell = () => {
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith('/admin');

  return (
    <>
      <ScrollToTop />
      {!isAdminRoute && <FirstVisitPopup />}
      {!isAdminRoute && <Header />}
      {!isAdminRoute && <FloatingMenu />}
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          {lazyRoutes.map(({ path, Component }) => (
            <Route key={path} path={path} element={<Component />} />
          ))}
        </Routes>
      </Suspense>
      {!isAdminRoute && <Footer />}
    </>
  );
};

const Navigation = () => {
  return (
    <BrowserRouter>
      <AppShell />
    </BrowserRouter>
  )
}

export default Navigation
