import React, { Suspense, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { store } from './store/store';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import { Toaster } from '@/components/ui';
import ProtectedRoute from './components/auth/ProtectedRoute';
import { initializeConfigs } from './utils/colorConfig';

// Lazy loaded components
const Login = React.lazy(() => import('./pages/Login'));
const Register = React.lazy(() => import('./pages/Register'));
const ForgotPassword = React.lazy(() => import('./pages/ForgotPassword'));
const ValidateOTP = React.lazy(() => import('./pages/ValidateOTP'));
const ResetPassword = React.lazy(() => import('./pages/ResetPassword'));
const Stats = React.lazy(() => import('./pages/Stats'));
const Settings = React.lazy(() => import('./pages/Settings'));
const Profile = React.lazy(() => import('./pages/Profile'));
const Home = React.lazy(() => import('./pages/Home'));
const Plans = React.lazy(() => import('./pages/Plans'));
const Checkout = React.lazy(() => import('./pages/Checkout'));
const AdminPlansList = React.lazy(() => import('./pages/admin/PlansList'));
const AdminPlanForm = React.lazy(() => import('./pages/admin/PlanForm'));
const AuthCallback = React.lazy(() => import('./pages/AuthCallback'));

const queryClient = new QueryClient();

const LoadingSpinner = () => (
  <div className="flex items-center justify-center w-full h-screen">
    <div className="text-center">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#EFB207]"></div>
      <p className="mt-4 text-[#EFB207]">Carregando...</p>
    </div>
  </div>
);

const AuthLayout = () => (
  <div className="min-h-screen flex flex-col bg-white">
    <main className="flex-grow container mx-auto px-4 py-8">
      <Suspense fallback={<LoadingSpinner />}>
        <Routes>
          <Route index element={<Login />} />
          <Route path="login" element={<Login />} />
          <Route path="auth/:code" element={<AuthCallback />} />
          <Route path="register" element={<Register />} />
          <Route path="forgot-password" element={<ForgotPassword />} />
          <Route path="validate-otp" element={<ValidateOTP />} />
          <Route path="reset-password" element={<ResetPassword />} />
        </Routes>
      </Suspense>
    </main>
  </div>
);

const MainLayout = () => (
  <div className="min-h-screen flex flex-col bg-white">
    <Header />
    <main className="flex-grow container mx-auto px-4 py-8">
      <Suspense fallback={<LoadingSpinner />}>
        <Routes>
          <Route index element={<ProtectedRoute><Home /></ProtectedRoute>} />
          <Route path="stats" element={<ProtectedRoute><Stats /></ProtectedRoute>} />
          <Route path="settings" element={<ProtectedRoute><Settings /></ProtectedRoute>} />
          <Route path="profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
          <Route path="plans" element={<ProtectedRoute><Plans /></ProtectedRoute>} />
          <Route path="checkout" element={<ProtectedRoute><Checkout /></ProtectedRoute>} />
          <Route path="admin/plans" element={<ProtectedRoute><AdminPlansList /></ProtectedRoute>} />
          <Route path="admin/plans/new" element={<ProtectedRoute><AdminPlanForm /></ProtectedRoute>} />
          <Route path="admin/plans/:id" element={<ProtectedRoute><AdminPlanForm /></ProtectedRoute>} />
        </Routes>
      </Suspense>
    </main>
    <Footer />
  </div>
);

const App = () => {
  const isPreview = window.location.hostname.includes('preview--');
  const basename = isPreview ? '/preview/' : '/';

  useEffect(() => {
    initializeConfigs();
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <Provider store={store}>
        <BrowserRouter basename={basename}>
          <Routes>
            <Route path="/*" element={<AuthLayout />} />
            <Route path="/app/*" element={<MainLayout />} />
          </Routes>
          <Toaster />
        </BrowserRouter>
      </Provider>
    </QueryClientProvider>
  );
};

export default App;