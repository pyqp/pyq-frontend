import { createBrowserRouter, Navigate, Outlet } from 'react-router-dom';
import { AuthProvider }  from '../context/AuthContext';
import ProtectedRoute    from '../components/Protectedroute';

// ── Public pages ──────────────────────────────────────────────────────────────
import Layout         from '../pages/Layout';
import About          from '../pages/About';
import Pricing        from '../pages/Pricing';
import NotFound       from '../pages/NotFound';
import MockTest       from '../pages/Mocktest';
import FreePYQs       from '../pages/Freepyqs';
import AllExams       from '../pages/AllExams';
import ScrollToTop    from '../pages/Scrolltotop';
import Blog           from '../pages/Blog';
import HowItWorks     from '../pages/Howitworks';
import HelpCenter     from '../pages/Helpcenter';
import FAQs           from '../pages/Faqs';
import ContactUs      from '../pages/Contactus';
import RefundPolicy   from '../pages/Refundpolicy';
import TermsOfService from '../pages/Termsofservice';
import PrivacyPolicy  from '../pages/Privacypolicy';
import Careers        from '../pages/Careers';

// ── Auth pages ────────────────────────────────────────────────────────────────
import Login          from '../features/auth/Login';
import Register       from '../features/auth/Register';
import ForgetPassword from '../features/auth/ForgetPassword';
import ResetPassword  from '../features/auth/ResetPassword';

// ── Protected pages ───────────────────────────────────────────────────────────
import Dashboard  from '../features/dashboard/Dashboard';
import TestPage   from '../pages/Testpage';
import TestResult from '../pages/Testresult';
import Results    from '../pages/Results';
import Profile from '../pages/Profile';   
import MockTestDetail  from '../pages/Mocktestdetail';
import AdminPanel      from '../pages/AdminPanel';
import Leaderboard     from '../pages/Leaderboard';

const AuthRoot = () => (
  <AuthProvider>
    <ScrollToTop />
    <Outlet />
  </AuthProvider>
);

export const router = createBrowserRouter([
  {
    element: <AuthRoot />,
    children: [

      // ── Public ─────────────────────────────────────────────────────────────
      { path: '/',             element: <Layout /> },
      { path: '/about',        element: <Layout><About /></Layout> },
      { path: '/pricing',      element: <Layout><Pricing /></Layout> },
      { path: '/mock-tests',   element: <Layout><MockTest /></Layout> },
      { path: '/mock-tests/:id',  element: <Layout><MockTestDetail /></Layout> },
      { path: '/free-pyqs',    element: <Layout><FreePYQs /></Layout> },
      { path: '/all-exams',    element: <Layout><AllExams /></Layout> },
      { path: '/blog',         element: <Layout><Blog /></Layout> },
      { path: '/how-it-works', element: <Layout><HowItWorks /></Layout> },
      { path: '/help',         element: <Layout><HelpCenter /></Layout> },
      { path: '/faq',          element: <Layout><FAQs /></Layout> },
      { path: '/contact',      element: <Layout><ContactUs /></Layout> },
      { path: '/refund',       element: <Layout><RefundPolicy /></Layout> },
      { path: '/terms',        element: <Layout><TermsOfService /></Layout> },
      { path: '/privacy',      element: <Layout><PrivacyPolicy /></Layout> },
      { path: '/careers',      element: <Layout><Careers /></Layout> },

      // ── Auth ───────────────────────────────────────────────────────────────
      { path: '/login',           element: <Login /> },
      { path: '/signup',          element: <Register /> },
      { path: '/register',        element: <Navigate to="/signup" replace /> },
      { path: '/forgot-password', element: <ForgetPassword /> },
      { path: '/reset-password/:token',      element: <ResetPassword /> },

      // ── Protected ──────────────────────────────────────────────────────────
      { path: '/dashboard',
        element: <ProtectedRoute><Dashboard /></ProtectedRoute> },

      // Full-screen exam — NO Layout (no navbar/footer during test)
      { path: '/mock-tests/:id/attempt',
        element: <ProtectedRoute><TestPage /></ProtectedRoute> },

      // Result detail — no Layout (full focus)
      { path: '/results/:id',
        element: <ProtectedRoute><TestResult /></ProtectedRoute> },

      // Results list — wrapped in Layout for nav
      { path: '/results',
        element: <ProtectedRoute><Layout><Results /></Layout></ProtectedRoute> },

      { path: '/profile',
        element: <ProtectedRoute><Layout><Profile /></Layout></ProtectedRoute> },

      { path: '/admin',
        element: <ProtectedRoute adminOnly><AdminPanel /></ProtectedRoute> },

      { path: '/mock-tests/:id/leaderboard',
        element: <Leaderboard /> },

      { path: '*', element: <Layout><NotFound /></Layout> },
    ],
  },
]);