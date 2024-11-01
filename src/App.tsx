import React, { Suspense } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './store/store.ts';
import Header from './components/layout/Header.tsx';
import Footer from './components/layout/Footer.tsx';
import { Toaster } from './components/ui/toaster.tsx';
import ProtectedRoute from './components/auth/ProtectedRoute.tsx';

// Lazy load components
const Login = React.lazy(() => import('./pages/Login.tsx'));
const ForgotPassword = React.lazy(() => import('./pages/ForgotPassword.tsx'));
const ValidateOTP = React.lazy(() => import('./pages/ValidateOTP.tsx'));
const ResetPassword = React.lazy(() => import('./pages/ResetPassword.tsx'));
const Stats = React.lazy(() => import('./pages/Stats.tsx'));
const Settings = React.lazy(() => import('./pages/Settings.tsx'));
const Home = React.lazy(() => import('./pages/Home.tsx'));

const LoadingSpinner = () => (
  <div className="flex items-center justify-center w-full h-screen">
    <div className="text-center">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#EFB207]"></div>
      <p className="mt-4 text-[#EFB207]">Carregando...</p>
    </div>
  </div>
);

const App = () => {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <div className="min-h-screen flex flex-col bg-black text-white">
          <Header />
          <main className="flex-grow container mx-auto px-4 py-8">
            <Suspense fallback={<LoadingSpinner />}>
              <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/login" element={<Login />} />
                <Route path="/forgot-password" element={<ForgotPassword />} />
                <Route path="/validate-otp" element={<ValidateOTP />} />
                <Route path="/reset-password" element={<ResetPassword />} />
                <Route 
                  path="/home" 
                  element={
                    <ProtectedRoute>
                      <Home />
                    </ProtectedRoute>
                  } 
                />
                <Route 
                  path="/stats" 
                  element={
                    <ProtectedRoute>
                      <Stats />
                    </ProtectedRoute>
                  } 
                />
                <Route 
                  path="/settings" 
                  element={
                    <ProtectedRoute>
                      <Settings />
                    </ProtectedRoute>
                  } 
                />
                <Route path="*" element={<Navigate to="/" replace />} />
              </Routes>
            </Suspense>
          </main>
          <Footer />
          <Toaster />
        </div>
      </BrowserRouter>
    </Provider>
  );
};

export default App;